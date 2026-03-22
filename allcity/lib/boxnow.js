/**
 * BoxNow API utility — server-side only
 * Docs: https://www.boxnow.gr/en/partner-api
 */

const BASE_URL = process.env.BOXNOW_API_URL;

// ── Auth ─────────────────────────────────────────────────────────────────────
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
  const data = await res.json();
  return data.access_token;
}

// ── Create delivery request ───────────────────────────────────────────────────
export async function createBoxNowDelivery({
  orderNumber,
  invoiceValue,
  paymentMode = 'prepaid',
  amountToBeCollected = '0.00',
  customer, // { name, email, phone }
  destinationLocationId,
  items,    // [{ id, name, value, weight, compartmentSize }]
}) {
  const token = await getBoxNowToken();

  const res = await fetch(`${BASE_URL}/api/v1/delivery-requests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      orderNumber: String(orderNumber),
      invoiceValue: String(invoiceValue),
      paymentMode,
      amountToBeCollected: String(amountToBeCollected),
      origin: {
        contactNumber: '+30XXXXXXXXXX', // replace with store phone
        contactEmail: process.env.NEXT_PUBLIC_STORE_EMAIL,
        contactName: 'ALLCITY',
        locationId: process.env.BOXNOW_ORIGIN_LOCATION_ID,
      },
      destination: {
        contactNumber: customer.phone,
        contactEmail: customer.email,
        contactName: customer.name,
        locationId: String(destinationLocationId),
      },
      items: items.map((item, i) => ({
        id: String(i + 1),
        name: item.name,
        value: String(item.value),
        weight: item.weight || 0,
        compartmentSize: item.compartmentSize || 1,
      })),
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`BoxNow delivery failed: ${res.status} – ${JSON.stringify(err)}`);
  }

  return res.json(); // { id, parcels: [{ id }] }
}

// ── Find closest locker by address ───────────────────────────────────────────
export async function findClosestBoxNowLocker({ city, street, postalCode, region = 'el-GR' }) {
  const token = await getBoxNowToken();

  const res = await fetch(`${BASE_URL}/api/v2/delivery-requests:checkAddressDelivery`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ city, street, postalCode, region, compartmentSize: 0 }),
  });

  if (!res.ok) throw new Error(`BoxNow locker lookup failed: ${res.status}`);
  return res.json(); // { id, name, addressLine1, ... }
}
