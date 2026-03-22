import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req) {
  try {
    const { amount, currency = 'eur' } = await req.json();

    if (!amount || amount < 50) {
      return NextResponse.json({ error: 'Invalid amount.' }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,       // in cents — e.g. €12.00 = 1200
      currency,
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('[Stripe] create-payment-intent error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
