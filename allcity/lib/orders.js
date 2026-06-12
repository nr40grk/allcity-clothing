import { getDb } from './db';

export async function getOrders() {
  try {
    if (!process.env.MONGODB_URI) return [];
    const db = await getDb();
    return await db.collection('orders').find({}).sort({ createdAt: -1 }).toArray();
  } catch { return []; }
}

export async function saveOrder(order) {
  if (!process.env.MONGODB_URI) return { ...order, id: 'local', createdAt: new Date().toISOString(), status: 'pending' };
  const db = await getDb();
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const full = { ...order, _id: id, id, createdAt: new Date().toISOString(), status: 'pending' };
  await db.collection('orders').insertOne(full);
  return full;
}

export async function updateOrderStatus(id, status) {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI not set.');
  const db = await getDb();
  const result = await db.collection('orders').findOneAndUpdate(
    { id },
    { $set: { status } },
    { returnDocument: 'after' }
  );
  if (!result) throw new Error('Order not found');
  return result;
}

export async function updateOrderBoxNow(id, { deliveryId, trackingNumber, voucherUrl }) {
  if (!process.env.MONGODB_URI) return;
  const db = await getDb();
  await db.collection('orders').updateOne(
    { id },
    { $set: { boxnowDeliveryId: deliveryId, boxnowTrackingNumber: trackingNumber, boxnowVoucherUrl: voucherUrl } }
  );
}
