import { fallbackProducts } from './products';
import { MongoClient } from 'mongodb';

let client;
async function getDb() {
  if (!client) client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  return client.db('allcity');
}

export async function getProducts() {
  try {
    if (!process.env.MONGODB_URI) return fallbackProducts;
    const db = await getDb();
    const doc = await db.collection('store').findOne({ _id: 'products' });
    if (!doc || !Array.isArray(doc.data) || doc.data.length === 0) return fallbackProducts;
    return doc.data;
  } catch { return fallbackProducts; }
}

export async function saveProducts(products) {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI not set.');
  const db = await getDb();
  await db.collection('store').updateOne(
    { _id: 'products' },
    { $set: { data: products } },
    { upsert: true }
  );
}
