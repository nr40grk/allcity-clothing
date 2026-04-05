import { NextResponse } from 'next/server';
import { addSubscriber } from '@/lib/subscribers';
import { resend, FROM_EMAIL } from '@/lib/resend';
import { WelcomeEmail } from '@/emails/WelcomeEmail';
import { createElement } from 'react';

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email.' }, { status: 400 });
    }

    const result = await addSubscriber(email);

    if (!result.ok && result.reason === 'already_subscribed') {
      return NextResponse.json({ ok: false, message: 'Already subscribed.' });
    }

    // Send welcome email
    if (process.env.RESEND_API_KEY) {
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
