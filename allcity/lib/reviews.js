import { getDb } from './db';

export async function getReviews(onlyPublished = true) {
  try {
    if (!process.env.MONGODB_URI) return [];
    const db = await getDb();
    const query = onlyPublished ? { published: true } : {};
    return await db.collection('reviews').find(query).sort({ createdAt: -1 }).toArray();
  } catch { return []; }
}

export async function getReviewById(id) {
  try {
    if (!process.env.MONGODB_URI) return null;
    const db = await getDb();
    return await db.collection('reviews').findOne({ id });
  } catch { return null; }
}

export async function saveReview(review) {
  if (!process.env.MONGODB_URI) return { ...review, id: 'local', createdAt: new Date().toISOString() };
  const db = await getDb();
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const full = { ...review, id, _id: id, createdAt: new Date().toISOString(), published: review.published ?? true };
  await db.collection('reviews').insertOne(full);
  return full;
}

export async function updateReview(id, updates) {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI not set.');
  const db = await getDb();
  const result = await db.collection('reviews').findOneAndUpdate(
    { id },
    { $set: updates },
    { returnDocument: 'after' }
  );
  if (!result) throw new Error('Review not found');
  return result;
}

export async function deleteReview(id) {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI not set.');
  const db = await getDb();
  await db.collection('reviews').deleteOne({ id });
}
