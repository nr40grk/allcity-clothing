import { NextResponse } from 'next/server';
import { addSubscriber } from '@/lib/subscribers';
import { getResend, FROM_EMAIL } from '@/lib/resend';
import { WelcomeEmail } from '@/emails/WelcomeEmail';
import { createElement } from 'react';
import { rateLimit, getClientIP } from '@/lib/rate-limit';

export async function POST(req) {
  const ip = getClientIP(req);
  const limit = rateLimit(`subscribe:${ip}`, { max: 5, windowSeconds: 60 });
  if (!limit.allowed) return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  try {
    const { email } = await req.json();
    if (!email || typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@\.]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email.' }, { status: 400 });
    }

    const result = await addSubscriber(email);

    if (!result.ok && result.reason === 'already_subscribed') {
      return NextResponse.json({ ok: false, message: 'Already subscribed.' });
    }

    // Send welcome email only if Resend is configured
    const resend = getResend();
    if (resend) {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: 'Welcome to ALLCITY — Hood Controlling.',
        react: createElement(WelcomeEmail, { email }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[Subscribe]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
