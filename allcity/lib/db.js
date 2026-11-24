import { MongoClient } from 'mongodb';

// Cache connection across hot reloads in dev and across invocations in prod
const globalWithMongo = global;

export async function getDb() {
  if (!globalWithMongo._mongoClientPromise) {
    const client = new MongoClient(process.env.MONGODB_URI);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  const client = await globalWithMongo._mongoClientPromise;
  return client.db('allcity');
}
