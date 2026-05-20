import { getDb } from './db';

export async function getSubscribers() {
  try {
    if (!process.env.MONGODB_URI) return [];
    const db = await getDb();
    return await db.collection('subscribers').find({}).toArray();
  } catch { return []; }
}

export async function addSubscriber(email) {
  if (!process.env.MONGODB_URI) return { ok: false, reason: 'no_db' };
  const normalized = email.toLowerCase().trim();
  const db = await getDb();
  const existing = await db.collection('subscribers').findOne({ email: normalized });
  if (existing) return { ok: false, reason: 'already_subscribed' };
  const newSubscriber = { id: Date.now().toString(), email: normalized, subscribedAt: new Date().toISOString(), active: true };
  await db.collection('subscribers').insertOne({ _id: newSubscriber.id, ...newSubscriber });
  return { ok: true, subscriber: newSubscriber };
}

export async function removeSubscriber(email) {
  if (!process.env.MONGODB_URI) return;
  const normalized = email.toLowerCase().trim();
  const db = await getDb();
  await db.collection('subscribers').updateOne(
    { email: normalized },
    { $set: { active: false, unsubscribedAt: new Date().toISOString() } }
  );
}
