function getPriceCents() {
  const value = Number.parseInt(process.env.GUIDE_PRICE_CENTS || '500', 10);
  return Number.isInteger(value) && value > 0 ? value : 500;
}

function getCurrency() {
  const value = String(process.env.GUIDE_CURRENCY || 'usd').toLowerCase();
  return /^[a-z]{3}$/.test(value) ? value : 'usd';
}

export default async function handler(request) {
  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed.' }), {
      status: 405,
      headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' }
    });
  }
  return new Response(JSON.stringify({ cents: getPriceCents(), currency: getCurrency() }), {
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'public, max-age=300' }
  });
}
