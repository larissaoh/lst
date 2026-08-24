import { getEntitlement, clean } from '../lib/entitlements.mjs';

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });
}

export default async function handler(request) {
  if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
  let input;
  try { input = await request.json(); }
  catch { return json({ error: 'The guide request was invalid.' }, 400); }
  const entitlement = await getEntitlement({ guideId: clean(input.guideId, 100), ownerToken: clean(input.ownerToken, 200) });
  return json({ entitlement });
}
