import { NextResponse } from 'next/server';
import { getSubscribers } from '@/lib/subscribers';
import { getResend, FROM_EMAIL } from '@/lib/resend';
import { NewsletterEmail } from '@/emails/NewsletterEmail';
import { createElement } from 'react';

function isAuthorized(req) {
  return req.headers.get('x-admin-token') === process.env.ADMIN_PASSWORD;
}

export async function GET(req) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const subscribers = await getSubscribers();
  return NextResponse.json(subscribers);
}

export async function POST(req) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { subject, bodyText, ctaText, ctaUrl } = await req.json();
  if (!subject || !bodyText) {
    return NextResponse.json({ error: 'Subject and body required.' }, { status: 400 });
  }

  const resend = getResend();
  if (!resend) {
    return NextResponse.json({ error: 'RESEND_API_KEY not configured.' }, { status: 500 });
  }

  const subscribers = await getSubscribers();
  const active = subscribers.filter(s => s.active !== false);
  if (active.length === 0) {
    return NextResponse.json({ ok: false, message: 'No active subscribers.' });
  }

  const results = { sent: 0, failed: 0 };
  const batchSize = 50;

  for (let i = 0; i < active.length; i += batchSize) {
    const batch = active.slice(i, i + batchSize);
    try {
      const emails = batch.map(subscriber => ({
        from: FROM_EMAIL,
        to: subscriber.email,
        subject: `${subject} · ALLCITY`,
        react: createElement(NewsletterEmail, {
          subject, bodyText, ctaText, ctaUrl,
          subscriberEmail: subscriber.email,
        }),
      }));
      await resend.batch.send(emails);
      results.sent += batch.length;
    } catch (err) {
      console.error('[Newsletter batch error]', err);
      results.failed += batch.length;
    }
  }

  return NextResponse.json({ ok: true, ...results });
}
