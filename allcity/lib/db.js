import { MongoClient } from 'mongodb';

// Cache connection across hot reloads in dev and across invocations in prod
const globalWithMongo = global;
if (!globalWithMongo._mongoClientPromise) {
  const client = new MongoClient(process.env.MONGODB_URI);
  globalWithMongo._mongoClientPromise = client.connect();
}
const clientPromise = globalWithMongo._mongoClientPromise;

export async function getDb() {
  const client = await clientPromise;
  return client.db('allcity');
}
