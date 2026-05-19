'use client';
import { useState, useEffect, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useT } from '@/components/LanguageProvider';
import { getCart, clearCart, updateCartQty, removeFromCart } from '@/lib/cart';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
const CARD_OPTIONS = { style: { base: { color: '#F0EDE8', fontFamily: '"IBM Plex Mono", monospace', fontSize: '13px', '::placeholder': { color: 'rgba(240,237,232,0.2)' } }, invalid: { color: '#FF2200' } } };

function BoxNowWidget({ onLockerSelect, selected }) {
  const callbackRef = useRef(null);
  callbackRef.current = onLockerSelect;

  useEffect(() => {
    window._bn_map_widget_config = {
      parentElement: '#boxnow-widget-mount',
      type: 'popup',
      buttonSelector: '.bn-open-widget',
      afterSelect: (s) => callbackRef.current?.({
        id: s.boxnowLockerId || '',
        name: s.name || s.boxnowLockerAddressLine1 || '', // gitleaks:allow
        address: s.boxnowLockerAddressLine1 || '', // gitleaks:allow
        postalCode: s.boxnowLockerPostalCode || '',
      }),
    };
    if (!document.querySelector('script[data-boxnow]')) {
      const el = document.createElement('script');
      el.src = 'https://widget-cdn.boxnow.gr/map-widget/client/v5.js';
      el.async = true; el.defer = true; el.dataset.boxnow = '1';
      document.head.appendChild(el);
    }
  }, []);

  return (
    <div className="mt-4 border border-[#FF2200]/30 bg-[#FF2200]/5 p-4 font-mono text-xs flex flex-col gap-3">
      <p className="text-[#FF2200] uppercase tracking-widest text-[11px]">BoxNow Delivery</p>
      <div id="boxnow-widget-mount" />
      {selected?.name ? (
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[#F0EDE8]/80 text-xs">{selected.name}</p>
            {selected.address && <p className="text-[#F0EDE8]/40 text-[11px] mt-0.5">{selected.address}</p>}
          </div>
          <button type="button" onClick={() => callbackRef.current?.(null)}
            className="text-[#F0EDE8]/20 hover:text-[#FF2200] transition-colors text-sm leading-none flex-shrink-0">×</button>
        </div>
      ) : (
        <p className="text-[#F0EDE8]/40 text-[11px]">No locker selected yet.</p>
      )}
      <button type="button" className="bn-open-widget font-mono text-[11px] uppercase tracking-widest text-[#FF2200] hover:underline text-left">
        {selected?.name ? '↺ Change Locker' : '+ Choose BoxNow Locker'}
      </button>
    </div>
  );
}

function CheckoutForm({ cart, onUpdateQty, onRemove, onSuccess }) {
  const t = useT();
  const stripe = useStripe();
  const elements = useElements();
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', postalCode: '' });
  const [locker, setLocker] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const inputClass = "bg-[#111] border border-[#333] text-[#F0EDE8] font-mono text-xs px-4 py-3 outline-none focus:border-[#FF2200] transition-colors placeholder-[#F0EDE8]/20 w-full";
  const field = (key) => ({ value: form[key], onChange: e => setForm({ ...form, [key]: e.target.value }) });

  async function handleSubmit(e) {
    e.preventDefault();
    if (!locker?.id) { setError('Please choose a BoxNow locker before paying.'); return; }
    if (!stripe || !elements) { setError('Payment not ready — refresh the page or contact us at info@allcityclothing.com'); return; }
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
        body: JSON.stringify({ ...form, deliveryMethod: 'boxnow', boxnowLockerId: locker?.id, boxnowLockerName: locker?.name, boxnowLockerAddress: locker?.address, items: cart, total }),
      });

      clearCart();
      setSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err) { setError(err.message); } finally { setProcessing(false); }
  }

  if (success) return (
    <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
      <span className="font-display text-[80px] text-[#FF2200] leading-none">✓</span>
      <h2 className="font-display text-4xl text-[#F0EDE8]">{t('checkout.confirmed')}</h2>
      <p className="font-mono text-xs text-[#F0EDE8]/50 max-w-sm">{t('checkout.confirmedNote')}</p>
      <p className="font-mono text-xs text-[#FF2200]/80 max-w-sm">Your order will be delivered to the <strong>{locker?.name}</strong> BoxNow locker. We'll notify you when it's ready for pickup.</p>
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
          <BoxNowWidget onLockerSelect={setLocker} selected={locker} />
        </fieldset>

      </div>

      <div className="flex flex-col gap-8">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/40 mb-4">{t('checkout.orderSummary')}</p>
          <div className="border border-[#1a1a1a]">
            {cart.map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-[#1a1a1a] last:border-b-0">
                <div className="flex-1 min-w-0">
                  <span className="font-mono text-xs text-[#F0EDE8]/70 block truncate">{item.name}</span>
                  <span className="font-mono text-[11px] text-[#F0EDE8]/30">{item.size}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => onUpdateQty(item.productId, item.size, item.qty - 1)}
                    disabled={item.qty <= 1}
                    className="font-mono text-sm text-[#F0EDE8]/40 hover:text-[#F0EDE8] disabled:opacity-20 disabled:cursor-not-allowed leading-none w-5 text-center"
                    aria-label="Decrease quantity"
                  >−</button>
                  <span className="font-mono text-xs text-[#F0EDE8]/70 w-4 text-center">{item.qty}</span>
                  <button
                    type="button"
                    onClick={() => onUpdateQty(item.productId, item.size, item.qty + 1)}
                    className="font-mono text-sm text-[#F0EDE8]/40 hover:text-[#F0EDE8] leading-none w-5 text-center"
                    aria-label="Increase quantity"
                  >+</button>
                </div>
                <span className="font-mono text-xs text-[#F0EDE8]/60 flex-shrink-0 w-16 text-right">€{(item.price * item.qty).toFixed(2)}</span>
                <button
                  type="button"
                  onClick={() => onRemove(item.productId, item.size)}
                  className="flex-shrink-0 font-mono text-[11px] text-[#F0EDE8]/20 hover:text-[#FF2200] transition-colors leading-none"
                  aria-label="Remove item"
                >×</button>
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
  const [cart, setCart] = useState([]);

  useEffect(() => { setCart(getCart()); }, []);

  function handleUpdateQty(productId, size, qty) {
    updateCartQty(productId, size, qty);
    setCart(getCart());
  }

  function handleRemove(productId, size) {
    removeFromCart(productId, size);
    setCart(getCart());
  }

  if (cart.length === 0) return (
    <div className="pt-20">
      <div className="px-6 pt-16 pb-10 border-b border-[#1a1a1a] max-w-[1400px] mx-auto">
        <h1 className="font-display text-6xl md:text-8xl text-[#F0EDE8] tracking-tight leading-none">{t('checkout.title')}</h1>
      </div>
      <div className="px-6 py-24 max-w-[1400px] mx-auto flex flex-col items-center gap-6">
        <p className="font-mono text-sm text-[#F0EDE8]/40 uppercase tracking-widest">Your cart is empty</p>
        <a href="/products" className="font-mono text-xs uppercase tracking-widest text-[#FF2200] hover:underline">Continue Shopping →</a>
      </div>
    </div>
  );

  return (
    <div className="pt-20">
      <div className="px-6 pt-16 pb-10 border-b border-[#1a1a1a] max-w-[1400px] mx-auto">
        <h1 className="font-display text-6xl md:text-8xl text-[#F0EDE8] tracking-tight leading-none">{t('checkout.title')}</h1>
      </div>
      <div className="px-6 py-14 max-w-[1400px] mx-auto">
        <Elements stripe={stripePromise}><CheckoutForm cart={cart} onUpdateQty={handleUpdateQty} onRemove={handleRemove} onSuccess={() => setCart([])} /></Elements>
      </div>
    </div>
  );
}
