import { createHmac, timingSafeEqual } from 'node:crypto';
import { recordPurchase, clean } from '../lib/entitlements.mjs';

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });
}

function verifySignature(rawBody, signatureHeader, secret) {
  const parts = String(signatureHeader || '').split(',').map((part) => part.split('='));
  const timestamp = parts.find(([key]) => key === 't')?.[1];
  const signatures = parts.filter(([key]) => key === 'v1').map(([, value]) => value);
  if (!timestamp || !signatures.length) return false;
  const age = Math.abs(Math.floor(Date.now() / 1000) - Number(timestamp));
  if (!Number.isFinite(age) || age > 300) return false;
  const expected = createHmac('sha256', secret).update(`${timestamp}.${rawBody}`, 'utf8').digest('hex');
  return signatures.some((candidate) => {
    try {
      const left = Buffer.from(expected, 'hex');
      const right = Buffer.from(candidate, 'hex');
      return left.length === right.length && timingSafeEqual(left, right);
    } catch { return false; }
  });
}

export default async function handler(request) {
  if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return json({ error: 'Stripe webhook is not configured.' }, 503);
  const rawBody = await request.text();
  if (!verifySignature(rawBody, request.headers.get('stripe-signature'), secret)) return json({ error: 'Invalid Stripe signature.' }, 400);

  let event;
  try { event = JSON.parse(rawBody); }
  catch { return json({ error: 'Invalid webhook JSON.' }, 400); }
  if (!['checkout.session.completed', 'checkout.session.async_payment_succeeded'].includes(event.type)) return json({ received: true });

  const session = event?.data?.object || {};
  if (session.payment_status !== 'paid' || session?.metadata?.product !== 'guest_guide') return json({ received: true });
  await recordPurchase({
    guideId: clean(session?.metadata?.guide_id, 100),
    ownerToken: clean(session?.metadata?.owner_token, 200),
    sessionId: clean(session.id, 200),
    kind: session?.metadata?.purchase_kind,
    paidAt: new Date(Number(event.created || Math.floor(Date.now() / 1000)) * 1000).toISOString(),
    customerEmail: session?.customer_details?.email || session?.customer_email || ''
  });
  return json({ received: true });
}
