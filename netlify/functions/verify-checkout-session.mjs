import { recordPurchase, clean } from '../lib/entitlements.mjs';

const EXPECTED_PRICE_CENTS = (() => { const value = Number.parseInt(process.env.GUIDE_PRICE_CENTS || '500', 10); return Number.isInteger(value) && value > 0 ? value : 500; })();
const EXPECTED_CURRENCY = (() => { const value = String(process.env.GUIDE_CURRENCY || 'usd').toLowerCase(); return /^[a-z]{3}$/.test(value) ? value : 'usd'; })();

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });
}

export default async function handler(request) {
  if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return json({ error: 'Payments are not configured.' }, 503);

  let input;
  try { input = await request.json(); }
  catch { return json({ error: 'The payment verification request was invalid.' }, 400); }

  const sessionId = clean(input.sessionId, 200);
  const guideId = clean(input.guideId, 100);
  if (!/^cs_(?:test_|live_)?[a-zA-Z0-9]+$/.test(sessionId) || !guideId) return json({ error: 'The payment reference was invalid.' }, 400);

  let stripeResponse;
  try { stripeResponse = await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`, { headers: { authorization: `Bearer ${secretKey}` } }); }
  catch { return json({ error: 'Stripe could not be reached to verify the payment.' }, 502); }

  const session = await stripeResponse.json().catch(() => ({}));
  if (!stripeResponse.ok) return json({ error: session?.error?.message || 'The payment could not be verified.' }, 502);

  const correctGuide = session.client_reference_id === guideId && session?.metadata?.guide_id === guideId;
  const correctProduct = session?.metadata?.product === 'guest_guide';
  const correctAmount = session.amount_total === EXPECTED_PRICE_CENTS && session.currency === EXPECTED_CURRENCY;
  const paid = session.status === 'complete' && session.payment_status === 'paid' && correctGuide && correctProduct && correctAmount;
  if (!paid) return json({ paid: false, error: 'Payment has not completed for this guide.' }, 402);

  const ownerToken = clean(session?.metadata?.owner_token, 200);
  const entitlement = await recordPurchase({
    guideId,
    ownerToken,
    sessionId: session.id,
    kind: session?.metadata?.purchase_kind,
    paidAt: new Date().toISOString(),
    customerEmail: session?.customer_details?.email || session?.customer_email || ''
  });
  return json({ paid: true, ownerToken, entitlement });
}
