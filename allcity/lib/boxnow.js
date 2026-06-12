import { createHmac, timingSafeEqual } from 'crypto';

const BASE_URL = process.env.BOXNOW_API_URL;

export async function getBoxNowToken() {
  const res = await fetch(`${BASE_URL}/api/v1/auth-sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: process.env.BOXNOW_CLIENT_ID,
      client_secret: process.env.BOXNOW_CLIENT_SECRET,
    }),
  });
  if (!res.ok) throw new Error(`BoxNow auth failed: ${res.status}`);
  return (await res.json()).access_token;
}

export async function findClosestBoxNowLocker({ city, street, postalCode, region = 'el-GR' }) {
  const token = await getBoxNowToken();
  const res = await fetch(`${BASE_URL}/api/v2/delivery-requests:checkAddressDelivery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ city, street, postalCode, region, compartmentSize: 0 }),
  });
  if (!res.ok) throw new Error(`BoxNow locker lookup failed: ${res.status}`);
  return res.json();
}

export async function createDeliveryRequest({ orderId, recipientName, recipientEmail, recipientPhone, lockerId, parcelsCount = 1 }) {
  const token = await getBoxNowToken();
  const res = await fetch(`${BASE_URL}/api/v2/delivery-requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      partnerId: String(process.env.BOXNOW_PARTNER_ID),
      deliveries: [{
        externalOrderId: String(orderId),
        recipientName,
        recipientEmail,
        recipientPhone,
        lockerId: Number(lockerId),
        warehouseId: Number(process.env.BOXNOW_WAREHOUSE_ID || 2),
        parcelsCount,
        codAmount: 0,
      }],
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`BoxNow delivery creation failed: ${res.status} ${body}`);
  }
  const data = await res.json();
  return data.deliveries?.[0] ?? data;
}

export function verifyWebhookSignature(rawBody, signature) {
  if (!process.env.BOXNOW_WEBHOOK_SECRET || !signature) return false;
  const expected = createHmac('sha256', process.env.BOXNOW_WEBHOOK_SECRET)
    .update(rawBody)
    .digest('hex');
  try {
    return timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(signature, 'hex'));
  } catch {
    return false;
  }
}
