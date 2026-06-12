import { NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/boxnow';
import { getDb } from '@/lib/db';

// BoxNow delivery status → our order status
const STATUS_MAP = {
  DELIVERED: 'fulfilled',
  IN_TRANSIT: 'shipped',
  PICKED_UP: 'shipped',
};

export async function POST(req) {
  const rawBody = await req.text();
  const signature = req.headers.get('x-boxnow-signature') || req.headers.get('x-signature') || '';

  if (!verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const externalOrderId = payload.externalOrderId || payload.external_order_id;
  const boxnowStatus = payload.status || payload.deliveryStatus;

  if (externalOrderId && boxnowStatus) {
    try {
      const db = await getDb();
      const newStatus = STATUS_MAP[boxnowStatus];
      const update = { boxnowStatus };
      if (newStatus) update.status = newStatus;
      await db.collection('orders').updateOne({ id: externalOrderId }, { $set: update });
    } catch (e) {
      console.error('BoxNow webhook order update failed:', e.message);
    }
  }

  return NextResponse.json({ ok: true });
}
