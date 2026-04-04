const BASE_URL = process.env.BOXNOW_API_URL;
export async function getBoxNowToken() {
  const res = await fetch(`${BASE_URL}/api/v1/auth-sessions`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ grant_type: 'client_credentials', client_id: process.env.BOXNOW_CLIENT_ID, client_secret: process.env.BOXNOW_CLIENT_SECRET }) });
  if (!res.ok) throw new Error(`BoxNow auth failed: ${res.status}`);
  return (await res.json()).access_token;
}
export async function findClosestBoxNowLocker({ city, street, postalCode, region = 'el-GR' }) {
  const token = await getBoxNowToken();
  const res = await fetch(`${BASE_URL}/api/v2/delivery-requests:checkAddressDelivery`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ city, street, postalCode, region, compartmentSize: 0 }) });
  if (!res.ok) throw new Error(`BoxNow locker lookup failed: ${res.status}`);
  return res.json();
}
