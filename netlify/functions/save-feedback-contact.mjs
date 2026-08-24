const EXPECTED_PRICE_CENTS = (() => {
  const value = Number.parseInt(process.env.GUIDE_PRICE_CENTS || '500', 10);
  return Number.isInteger(value) && value > 0 ? value : 500;
})();
const EXPECTED_CURRENCY = (() => {
  const value = String(process.env.GUIDE_CURRENCY || 'usd').toLowerCase();
  return /^[a-z]{3}$/.test(value) ? value : 'usd';
})();

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store'
    }
  });
}

function clean(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function stripeRequest(url, secretKey, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      authorization: `Bearer ${secretKey}`,
      ...(options.headers || {})
    }
  });
}

export default async function handler(request) {
  if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return json({ error: 'Payments are not configured.' }, 503);

  let input;
  try {
    input = await request.json();
  } catch {
    return json({ error: 'The feedback request was invalid.' }, 400);
  }

  const sessionId = clean(input.sessionId, 200);
  const guideId = clean(input.guideId, 100);
  const name = clean(input.name, 100);
  const email = clean(input.email, 200).toLowerCase();
  const consent = input.consent === true;

  if (!/^cs_(?:test_|live_)?[a-zA-Z0-9]+$/.test(sessionId) || !guideId) {
    return json({ error: 'The paid guide reference was invalid.' }, 400);
  }
  if (!consent || !validEmail(email)) {
    return json({ error: 'Valid email and explicit feedback permission are required.' }, 400);
  }

  let sessionResponse;
  try {
    sessionResponse = await stripeRequest(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`, secretKey);
  } catch {
    return json({ error: 'Stripe could not be reached.' }, 502);
  }

  const session = await sessionResponse.json().catch(() => ({}));
  const validPayment = sessionResponse.ok && session.status === 'complete' && session.payment_status === 'paid' &&
    session.amount_total === EXPECTED_PRICE_CENTS && session.currency === EXPECTED_CURRENCY &&
    session.client_reference_id === guideId && session?.metadata?.guide_id === guideId &&
    session?.metadata?.product === 'guest_guide';

  if (!validPayment) return json({ error: 'A completed payment for this guide could not be confirmed.' }, 402);

  const params = new URLSearchParams();
  params.set('metadata[feedback_opt_in]', 'yes');
  params.set('metadata[feedback_name]', name || 'Not provided');
  params.set('metadata[feedback_email]', email);

  const updateResponses = [];
  updateResponses.push(stripeRequest(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`, secretKey, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: params
  }));

  if (typeof session.payment_intent === 'string' && session.payment_intent.startsWith('pi_')) {
    updateResponses.push(stripeRequest(`https://api.stripe.com/v1/payment_intents/${encodeURIComponent(session.payment_intent)}`, secretKey, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: params
    }));
  }

  let responses;
  try {
    responses = await Promise.all(updateResponses);
  } catch {
    return json({ error: 'Stripe could not save the feedback contact.' }, 502);
  }

  if (responses.some((response) => !response.ok)) {
    return json({ error: 'Stripe did not accept the feedback contact update.' }, 502);
  }

  return json({ saved: true });
}
