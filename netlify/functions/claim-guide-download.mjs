import { claimDownload, clean } from '../lib/entitlements.mjs';

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });
}

export default async function handler(request) {
  if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
  let input;
  try { input = await request.json(); }
  catch { return json({ error: 'The download request was invalid.' }, 400); }
  try {
    const result = await claimDownload({ guideId: clean(input.guideId, 100), ownerToken: clean(input.ownerToken, 200), claimId: clean(input.claimId, 100) });
    return json(result);
  } catch (error) {
    const status = error.code === 'payment_required' ? 402 : error.code === 'ownership_required' ? 403 : 409;
    return json({ allowed: false, code: error.code || 'claim_failed', error: error.message || 'The download could not be claimed.' }, status);
  }
}
