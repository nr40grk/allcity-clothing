import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { rateLimit, getClientIP } from '@/lib/rate-limit';
export async function POST(req) {
  const ip = getClientIP(req);
  const limit = rateLimit(`payment-intent:${ip}`, { max: 10, windowSeconds: 60 });
  if (!limit.allowed) return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  try {
    const { amount, currency = 'eur' } = await req.json();
    if (!amount || typeof amount !== 'number' || amount < 50 || amount > 1000000) return NextResponse.json({ error: 'Invalid amount.' }, { status: 400 });
    const paymentIntent = await stripe.paymentIntents.create({ amount, currency, automatic_payment_methods: { enabled: true } });
    return NextResponse.json({ clientSecret: paymentIntent.client_secret, paymentIntentId: paymentIntent.id });
  } catch (err) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}
