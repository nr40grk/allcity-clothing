'use client';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useT } from '@/components/LanguageProvider';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
const CARD_OPTIONS = { style: { base: { color: '#F0EDE8', fontFamily: '"IBM Plex Mono", monospace', fontSize: '13px', '::placeholder': { color: 'rgba(240,237,232,0.2)' } }, invalid: { color: '#FF2200' } } };
const DEMO_CART = [{ name: 'ALLCITY CORE JACKET', size: 'M', qty: 1, price: 120 }];

function BoxNowNote({ lang }) {
  return (
    <div className="mt-4 border border-[#FF2200]/30 bg-[#FF2200]/5 p-4 font-mono text-xs text-[#F0EDE8]/70 flex flex-col gap-3">
      <p className="text-[#FF2200] uppercase tracking-widest text-[11px]">BoxNow Delivery</p>
      <p className="text-[#F0EDE8]/60 leading-relaxed">
        {lang === 'el'
          ? 'Αφού ολοκληρωθεί η παραγγελία σου, θα επικοινωνήσουμε μαζί σου για τις λεπτομέρειες παράδοσης στο BoxNow locker.'
          : 'After your order is placed, we will contact you with further details about your BoxNow locker delivery.'}
      </p>
      <a
        href="https://boxnow.gr/locator"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1 text-[#FF2200] hover:underline uppercase tracking-widest text-[11px]"
      >
        Find a BoxNow Locker →
      </a>
    </div>
  );
}

function CheckoutForm({ cart }) {
  const t = useT();
  const stripe = useStripe();
  const elements = useElements();
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', postalCode: '' });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const inputClass = "bg-[#111] border border-[#333] text-[#F0EDE8] font-mono text-xs px-4 py-3 outline-none focus:border-[#FF2200] transition-colors placeholder-[#F0EDE8]/20 w-full";
  const field = (key) => ({ value: form[key], onChange: e => setForm({ ...form, [key]: e.target.value }) });

  async function handleSubmit(e) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true); setError('');
    try {
      const intentRes = await fetch('/api/create-payment-intent', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount: Math.round(total * 100), currency: 'eur' }) });
      const { clientSecret, error: intentError } = await intentRes.json();
      if (intentError) throw new Error(intentError);
      const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, { payment_method: { card: elements.getElement(CardElement), billing_details: { name: form.name, email: form.email } } });
      if (stripeError) throw new Error(stripeError.message);

      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, deliveryMethod: 'boxnow', boxnowAddress: `${form.address}, ${form.city} ${form.postalCode}`, items: cart, total }),
      });

      setSuccess(true);
    } catch (err) { setError(err.message); } finally { setProcessing(false); }
  }

  if (success) return (
    <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
      <span className="font-display text-[80px] text-[#FF2200] leading-none">✓</span>
      <h2 className="font-display text-4xl text-[#F0EDE8]">{t('checkout.confirmed')}</h2>
      <p className="font-mono text-xs text-[#F0EDE8]/50 max-w-sm">{t('checkout.confirmedNote')}</p>
      <p className="font-mono text-xs text-[#FF2200]/80 max-w-sm">We will contact you at {form.email} with your BoxNow locker details.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-10 lg:gap-20">
      <div className="flex flex-col gap-8">

        {/* Contact */}
        <fieldset>
          <legend className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/40 mb-4">{t('checkout.contact')}</legend>
          <div className="flex flex-col gap-3">
            <input type="text" placeholder={t('checkout.fullName')} required autoComplete="name" className={inputClass} {...field('name')} />
            <input type="email" placeholder={t('checkout.email')} required autoComplete="email" className={inputClass} {...field('email')} />
            <input type="tel" placeholder={t('checkout.phone')} required autoComplete="tel" pattern="[+]?[0-9\s\-()]{7,20}" title="Enter a valid phone number" className={inputClass} {...field('phone')} />
          </div>
        </fieldset>

        {/* Address */}
        <fieldset>
          <legend className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/40 mb-4">{t('checkout.addressForLocker')}</legend>
          <div className="flex flex-col gap-3">
            <input type="text" placeholder={t('checkout.street')} required autoComplete="street-address" className={inputClass} {...field('address')} />
            <input type="text" placeholder={t('checkout.city')} required autoComplete="address-level2" className={inputClass} {...field('city')} />
            <input type="text" placeholder={t('checkout.postalCode')} required autoComplete="postal-code" inputMode="numeric" pattern="[0-9]{4,10}" title="Enter a valid postal code" className={inputClass} {...field('postalCode')} />
          </div>
          <BoxNowNote lang="en" />
        </fieldset>

      </div>

      <div className="flex flex-col gap-8">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/40 mb-4">{t('checkout.orderSummary')}</p>
          <div className="border border-[#1a1a1a]">
            {cart.map((item, i) => (
              <div key={i} className="flex justify-between items-center px-4 py-3 border-b border-[#1a1a1a] last:border-b-0">
                <div><span className="font-mono text-xs text-[#F0EDE8]/70">{item.name}</span><br/><span className="font-mono text-[11px] text-[#F0EDE8]/30">{item.size} × {item.qty}</span></div>
                <span className="font-mono text-xs text-[#F0EDE8]/60">€{(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between items-center px-4 py-4 bg-[#111]">
              <span className="font-mono text-xs uppercase tracking-widest text-[#F0EDE8]/40">{t('checkout.total')}</span>
              <span className="font-mono text-lg text-[#F0EDE8]">€{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/40 mb-4">{t('checkout.cardDetails')}</p>
          {!stripe ? (
            <div className="border border-[#FF2200]/40 bg-[#FF2200]/5 px-4 py-4 font-mono text-xs text-[#FF2200]/70">
              Payment not configured — Stripe key missing. Set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in Vercel and redeploy.
            </div>
          ) : (
            <div className="border border-[#333] px-4 py-4 focus-within:border-[#FF2200] transition-colors">
              <CardElement options={CARD_OPTIONS} />
            </div>
          )}
          <p className="font-mono text-[11px] text-[#F0EDE8]/20 mt-2">{t('checkout.stripeNote')}</p>
        </div>

        {error && <p className="font-mono text-xs text-[#FF2200]">{error}</p>}
        <button type="submit" disabled={processing || !stripe} className="w-full font-mono text-xs uppercase tracking-widest bg-[#F0EDE8] text-[#080808] py-4 hover:bg-[#FF2200] transition-colors duration-200 disabled:opacity-40">
          {processing ? t('checkout.processing') : `${t('checkout.pay')} €${total.toFixed(2)}`}
        </button>
      </div>
    </form>
  );
}

export default function CheckoutPage() {
  const t = useT();
  return (
    <div className="pt-20">
      <div className="px-6 pt-16 pb-10 border-b border-[#1a1a1a] max-w-[1400px] mx-auto">
        <h1 className="font-display text-6xl md:text-8xl text-[#F0EDE8] tracking-tight leading-none">{t('checkout.title')}</h1>
      </div>
      <div className="px-6 py-14 max-w-[1400px] mx-auto">
        <Elements stripe={stripePromise}><CheckoutForm cart={DEMO_CART} /></Elements>
      </div>
    </div>
  );
}
