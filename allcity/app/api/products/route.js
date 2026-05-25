import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/kv';
import { rateLimit, getClientIP } from '@/lib/rate-limit';
export async function GET(req) {
  const ip = getClientIP(req);
  const limit = rateLimit(`products:${ip}`, { max: 60, windowSeconds: 60 });
  if (!limit.allowed) return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  const products = await getProducts();
  return NextResponse.json(products);
}
