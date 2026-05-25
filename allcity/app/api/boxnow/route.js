import { NextResponse } from 'next/server';
import { findClosestBoxNowLocker } from '@/lib/boxnow';
import { rateLimit, getClientIP } from '@/lib/rate-limit';
export async function POST(req) {
  const ip = getClientIP(req);
  const limit = rateLimit(`boxnow:${ip}`, { max: 10, windowSeconds: 60 });
  if (!limit.allowed) return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  try {
    const body = await req.json();
    if (body.action === 'findLocker') {
      const locker = await findClosestBoxNowLocker({ city: body.city, street: body.street, postalCode: body.postalCode });
      return NextResponse.json(locker);
    }
    return NextResponse.json({ error: 'Unknown action.' }, { status: 400 });
  } catch (err) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}
