import { NextResponse } from 'next/server';
import { findClosestBoxNowLocker } from '@/lib/boxnow';
export async function POST(req) {
  try {
    const body = await req.json();
    if (body.action === 'findLocker') {
      const locker = await findClosestBoxNowLocker({ city: body.city, street: body.street, postalCode: body.postalCode });
      return NextResponse.json(locker);
    }
    return NextResponse.json({ error: 'Unknown action.' }, { status: 400 });
  } catch (err) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}
