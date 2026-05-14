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
        Find a BoxNow Locker \u2192
      </a>
    </div>
  );
}

function CheckoutForm({ cart }) {
  const t = useT();
  const stripe = useStripe();
  const elements = useElements();
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', postalCode: '', country: 'GR' });
  const [deliveryMethod, setDeliveryMethod] = useState('courier');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

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

      // Save order
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          postalCode: form.postalCode,
          deliveryMethod,
          boxnowAddress: deliveryMethod === 'boxnow' ? `${form.address}, ${form.city} ${form.postalCode}` : null,
          items: cart,
          total,
        }),
      });

      setSuccess(true);
    } catch (err) { setError(err.message); } finally { setProcessing(false); }
  }

  if (success) return (
    <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
      <span className="font-display text-[80px] text-[#FF2200] leading-none">\u2713</span>
      <h2 className="font-display text-4xl text-[#F0EDE8]">{t('checkout.confirmed')}</h2>
      <p className="font-mono text-xs text-[#F0EDE8]/50 max-w-sm">{t('checkout.confirmedNote')}</p>
      {deliveryMethod === 'boxnow' && (
        <p className="font-mono text-xs text-[#FF2200]/80 max-w-sm">
          We will contact you at {form.email} with your BoxNow locker details.
        </p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-10 lg:gap-20">
      <div className="flex flex-col gap-8">
        <fieldset>
          <legend className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/40 mb-4">{t('checkout.contact')}</legend>
          <div className="flex flex-col gap-3">
            {[['name', t('checkout.fullName')], ['email', t('checkout.email'), 'email'], ['phone', t('checkout.phone')]].map(([name, placeholder, type='text']) => (
              <input key={name} name={name} type={type} placeholder={placeholder} value={form[name]} onChange={e => setForm({...form, [name]: e.target.value})} required className="bg-[#111] border border-[#333] text-[#F0EDE8] font-mono text-xs px-4 py-3 outline-none focus:border-[#FF2200] transition-colors placeholder-[#F0EDE8]/20 w-full" />
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/40 mb-4">{t('checkout.deliveryMethod')}</legend>
          <div className="flex flex-col gap-2">
            {[['courier', t('checkout.homeDelivery')], ['boxnow', t('checkout.boxnowDelivery')]].map(([value, label]) => (
              <button key={value} type="button" onClick={() => setDeliveryMethod(value)} className={`font-mono text-xs text-left px-4 py-3 border transition-colors ${deliveryMethod === value ? 'border-[#FF2200] text-[#F0EDE8]' : 'border-[#333] text-[#F0EDE8]/50'}`}>
                <span className={`mr-3 ${deliveryMethod === value ? 'text-[#FF2200]' : 'text-[#333]'}`}>\u25cf</span>{label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/40 mb-4">
            {deliveryMethod === 'boxnow' ? t('checkout.addressForLocker') : t('checkout.shippingAddress')}
          </legend>
          <div className="flex flex-col gap-3">
            {[['address', t('checkout.street')], ['city', t('checkout.city')], ['postalCode', t('checkout.postalCode')]].map(([name, placeholder]) => (
              <input key={name} name={name} type="text" placeholder={placeholder} value={form[name]} onChange={e => setForm({...form, [name]: e.target.value})} required className="bg-[#111] border border-[#333] text-[#F0EDE8] font-mono text-xs px-4 py-3 outline-none focus:border-[#FF2200] transition-colors placeholder-[#F0EDE8]/20 w-full" />
            ))}
          </div>
          {deliveryMethod === 'boxnow' && <BoxNowNote lang="en" />}
        </fieldset>
      </div>

      <div className="flex flex-col gap-8">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/40 mb-4">{t('checkout.orderSummary')}</p>
          <div className="border border-[#1a1a1a]">
            {cart.map((item, i) => (
              <div key={i} className="flex justify-between items-center px-4 py-3 border-b border-[#1a1a1a] last:border-b-0">
                <div><span className="font-mono text-xs text-[#F0EDE8]/70">{item.name}</span><br/><span className="font-mono text-[11px] text-[#F0EDE8]/30">{item.size} \u00d7 {item.qty}</span></div>
                <span className="font-mono text-xs text-[#F0EDE8]/60">\u20ac{(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between items-center px-4 py-4 bg-[#111]">
              <span className="font-mono text-xs uppercase tracking-widest text-[#F0EDE8]/40">{t('checkout.total')}</span>
              <span className="font-mono text-lg text-[#F0EDE8]">\u20ac{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/40 mb-4">{t('checkout.cardDetails')}</p>
          <div className="border border-[#333] px-4 py-4 focus-within:border-[#FF2200] transition-colors"><CardElement options={CARD_OPTIONS} /></div>
          <p className="font-mono text-[11px] text-[#F0EDE8]/20 mt-2">{t('checkout.stripeNote')}</p>
        </div>

        {error && <p className="font-mono text-xs text-[#FF2200]">{error}</p>}
        <button type="submit" disabled={processing || !stripe} className="w-full font-mono text-xs uppercase tracking-widest bg-[#F0EDE8] text-[#080808] py-4 hover:bg-[#FF2200] transition-colors duration-200 disabled:opacity-40">
          {processing ? t('checkout.processing') : `${t('checkout.pay')} \u20ac${total.toFixed(2)}`}
        </button>
      </div>
    </form>
  );
}

export default function CheckoutPage() {
  const t = useT();
  return (
    <div className="pt-16">
      <div className="px-6 pt-16 pb-10 border-b border-[#1a1a1a] max-w-[1400px] mx-auto">
        <h1 className="font-display text-6xl md:text-8xl text-[#F0EDE8] tracking-tight leading-none">{t('checkout.title')}</h1>
      </div>
      <div className="px-6 py-14 max-w-[1400px] mx-auto">
        <Elements stripe={stripePromise}><CheckoutForm cart={DEMO_CART} /></Elements>
      </div>
    </div>
  );
}
