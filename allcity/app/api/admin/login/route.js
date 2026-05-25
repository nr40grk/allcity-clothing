import { NextResponse } from 'next/server';
import { createAdminToken } from '@/lib/auth';
import { rateLimit, getClientIP } from '@/lib/rate-limit';

export async function POST(req) {
  const ip = getClientIP(req);
  const limit = rateLimit(`admin-login:${ip}`, { max: 5, windowSeconds: 60 });
  if (!limit.allowed) {
    return NextResponse.json({ error: 'Too many attempts. Try again in a minute.' }, { status: 429 });
  }

  try {
    const { password } = await req.json();
    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Invalid password.' }, { status: 401 });
    }
    const token = createAdminToken();
    return NextResponse.json({ token });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
