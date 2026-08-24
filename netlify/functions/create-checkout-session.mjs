import { createOwnerToken, getEntitlement, validGuideId, clean } from '../lib/entitlements.mjs';

const PRICE_CENTS = (() => {
  const value = Number.parseInt(process.env.GUIDE_PRICE_CENTS || '500', 10);
  return Number.isInteger(value) && value > 0 ? value : 500;
})();
const CURRENCY = (() => {
  const value = String(process.env.GUIDE_CURRENCY || 'usd').toLowerCase();
  return /^[a-z]{3}$/.test(value) ? value : 'usd';
})();

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });
}

export default async function handler(request) {
  if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return json({ error: 'Payments are not configured yet. Add STRIPE_SECRET_KEY in Netlify environment variables.' }, 503);

  let input;
  try { input = await request.json(); }
  catch { return json({ error: 'The checkout request was not valid JSON.' }, 400); }

  const guideId = clean(input.guideId, 100);
  const suppliedOwnerToken = clean(input.ownerToken, 200);
  if (!validGuideId(guideId)) return json({ error: 'This guide does not have a valid checkout ID.' }, 400);

  const current = await getEntitlement({ guideId, ownerToken: suppliedOwnerToken });
  if (current.managed && !current.ownerVerified) {
    return json({ error: 'Open the original saved guide package before purchasing an update.' }, 403);
  }
  const purchaseKind = current.managed ? 'paid_update' : 'initial';
  const ownerToken = current.managed ? suppliedOwnerToken : createOwnerToken();

  const requestOrigin = new URL(request.url).origin;
  const builderUrl = clean(process.env.BUILDER_URL || process.env.URL || requestOrigin, 500).replace(/\/$/, '');
  if (!/^https?:\/\//i.test(builderUrl)) return json({ error: 'BUILDER_URL is not configured correctly.' }, 503);

  const params = new URLSearchParams();
  params.set('mode', 'payment');
  params.set('payment_method_types[0]', 'card');
  params.set('client_reference_id', guideId);
  params.set('line_items[0][quantity]', '1');
  params.set('line_items[0][price_data][currency]', CURRENCY);
  params.set('line_items[0][price_data][unit_amount]', String(PRICE_CENTS));
  params.set('line_items[0][price_data][product_data][name]', purchaseKind === 'paid_update' ? 'Updated Guest Guide' : 'Guest Guide');
  params.set('line_items[0][price_data][product_data][description]', 'Includes this guide download and one updated download within 30 days. No subscription.');
  params.set('success_url', `${builderUrl}/builder.html?payment=success&session_id={CHECKOUT_SESSION_ID}`);
  params.set('cancel_url', `${builderUrl}/builder.html?payment=cancelled`);
  params.set('metadata[product]', 'guest_guide');
  params.set('metadata[guide_id]', guideId);
  params.set('metadata[purchase_kind]', purchaseKind);
  params.set('metadata[owner_token]', ownerToken);
  params.set('payment_intent_data[metadata][product]', 'guest_guide');
  params.set('payment_intent_data[metadata][guide_id]', guideId);
  params.set('payment_intent_data[metadata][purchase_kind]', purchaseKind);
  params.set('custom_text[submit][message]', 'After payment, you will return to the builder and your guide package will download.');

  let stripeResponse;
  try {
    stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: { authorization: `Bearer ${secretKey}`, 'content-type': 'application/x-www-form-urlencoded' },
      body: params
    });
  } catch {
    return json({ error: 'Stripe could not be reached. Try again.' }, 502);
  }

  const stripePayload = await stripeResponse.json().catch(() => ({}));
  if (!stripeResponse.ok || !stripePayload.url) return json({ error: stripePayload?.error?.message || 'Stripe could not create a checkout session.' }, 502);
  return json({ url: stripePayload.url });
}
