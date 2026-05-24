'use client';
import { useState, useEffect, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useT } from '@/components/LanguageProvider';
import { getCart, clearCart, updateCartQty, removeFromCart } from '@/lib/cart';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
// 2-digit prefixes covering all major island groups
const ISLAND_PC2 = ['70','71','72','73','74','81','82','83','84','85','49','28','29'];
// Specific 3-digit prefixes for smaller/Saronic islands
const ISLAND_PC3 = ['185','188','189','311','370','374','640','680'];

const APPEARANCE = {
  theme: 'night',
  variables: {
    colorPrimary: '#FF2200',
    colorBackground: '#111111',
    colorText: '#F0EDE8',
    colorDanger: '#FF2200',
    fontFamily: '"IBM Plex Mono", monospace',
    borderRadius: '0px',
    spacingUnit: '4px',
  },
  rules: {
    '.Input': { border: '1px solid #333', boxShadow: 'none' },
    '.Input:focus': { border: '1px solid #FF2200', boxShadow: 'none' },
    '.Label': { color: 'rgba(240,237,232,0.4)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em' },
  },
};

function boxnowShippingFee(postalCode) {
  const c = (postalCode || '').replace(/\s/g, '');
  if (c.length >= 3 && ISLAND_PC3.includes(c.slice(0, 3))) return 4.00;
  if (c.length >= 2 && ISLAND_PC2.includes(c.slice(0, 2))) return 4.00;
  return 3.00;
}

function BoxNowWidget({ onLockerSelect, selected, onOpen, onClose }) {
  const callbackRef = useRef(null);
  callbackRef.current = onLockerSelect;
  const closeRef = useRef(null);
  closeRef.current = onClose;

  useEffect(() => {
    window._bn_map_widget_config = {
      parentElement: '#boxnow-widget-mount',
      type: 'popup',
      buttonSelector: '.bn-open-widget',
      afterSelect: (s) => {
        callbackRef.current?.({
          id: s.boxnowLockerId || '',
          name: s.name || s.boxnowLockerAddressLine1 || '', // gitleaks:allow
          address: s.boxnowLockerAddressLine1 || '', // gitleaks:allow
          postalCode: s.boxnowLockerPostalCode || '',
        });
        closeRef.current?.();
      },
    };
    if (!document.querySelector('script[data-boxnow]')) {
      const el = document.createElement('script');
      el.src = 'https://widget-cdn.boxnow.gr/map-widget/client/v5.js';
      el.async = true; el.defer = true; el.dataset.boxnow = '1';
      document.head.appendChild(el);
    }
  }, []);

  return (
    <div className="mt-4 border border-[#FF2200]/30 bg-[#FF2200]/5 p-4 font-mono text-xs flex flex-col gap-3 min-w-0 overflow-x-hidden">
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
      <button type="button" onClick={onOpen} className="bn-open-widget font-mono text-[11px] uppercase tracking-widest text-[#FF2200] hover:underline text-left">
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
  const [boxnowOpen, setBoxnowOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shippingFee = boxnowShippingFee(form.postalCode);
  const total = subtotal + shippingFee;

  const inputClass = "bg-[#111] border border-[#333] text-[#F0EDE8] font-mono text-xs px-4 py-3 outline-none focus:border-[#FF2200] transition-colors placeholder-[#F0EDE8]/20 w-full";
  const field = (key) => ({ value: form[key], onChange: e => setForm({ ...form, [key]: e.target.value }) });

  async function handleSubmit(e) {
    e.preventDefault();
    if (!locker?.id) { setError('Please choose a BoxNow locker before paying.'); return; }
    if (!stripe || !elements) { setError('Payment not ready — refresh the page or contact us at info@allcityclothing.com'); return; }
    setProcessing(true); setError('');
    try {
      const { error: submitError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${typeof window !== 'undefined' ? window.location.origin : ''}/checkout?success=true`,
          payment_method_data: { billing_details: { name: form.name, email: form.email } },
        },
        redirect: 'if_required',
      });
      if (submitError) throw new Error(submitError.message);
      if (!paymentIntent || paymentIntent.status !== 'succeeded') {
        throw new Error('Payment was not completed. Please try again.');
      }

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
    <div className="flex flex-col items-center justify-center py-16 md:py-24 gap-4 md:gap-6 text-center px-4">
      <span className="font-display text-[60px] md:text-[80px] text-[#FF2200] leading-none">✓</span>
      <h2 className="font-display text-3xl md:text-4xl text-[#F0EDE8]">{t('checkout.confirmed')}</h2>
      <p className="font-mono text-xs text-[#F0EDE8]/50 max-w-sm">{t('checkout.confirmedNote')}</p>
      <p className="font-mono text-xs text-[#FF2200]/80 max-w-sm">Your order will be delivered to the <strong>{locker?.name}</strong> BoxNow locker. We will notify you when it is ready for pickup.</p>
    </div>
  );

  return (
    <>
      {boxnowOpen && (
        <div
          className="fixed inset-0 bg-black"
          style={{ zIndex: 99999 }}
          onClick={() => setBoxnowOpen(false)}
          aria-hidden="true"
        />
      )}
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6 md:gap-10 lg:gap-20 min-w-0">
      <div className="flex flex-col gap-8 min-w-0">

        {/* Contact */}
        <div className="min-w-0">
          <p className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/40 mb-4">{t('checkout.contact')}</p>
          <div className="flex flex-col gap-3">
            <input type="text" placeholder={t('checkout.fullName')} required autoComplete="name" className={inputClass} {...field('name')} />
            <input type="email" placeholder={t('checkout.email')} required autoComplete="email" className={inputClass} {...field('email')} />
            <input type="tel" placeholder={t('checkout.phone')} required autoComplete="tel" pattern="[+]?[0-9\s\-()]{7,20}" title="Enter a valid phone number" className={inputClass} {...field('phone')} />
          </div>
        </div>

        {/* Address */}
        <div className="min-w-0">
          <p className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/40 mb-4">{t('checkout.addressForLocker')}</p>
          <div className="flex flex-col gap-3">
            <input type="text" placeholder={t('checkout.street')} required autoComplete="street-address" className={inputClass} {...field('address')} />
            <input type="text" placeholder={t('checkout.city')} required autoComplete="address-level2" className={inputClass} {...field('city')} />
            <input type="text" placeholder={t('checkout.postalCode')} required autoComplete="postal-code" inputMode="numeric" pattern="[0-9]{4,10}" title="Enter a valid postal code" className={inputClass} {...field('postalCode')} />
          </div>
          <BoxNowWidget onLockerSelect={setLocker} selected={locker} onOpen={() => setBoxnowOpen(true)} onClose={() => setBoxnowOpen(false)} />
        </div>

      </div>

      <div className="flex flex-col gap-8 min-w-0">
        <div className="min-w-0">
          <p className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/40 mb-4">{t('checkout.orderSummary')}</p>
          <div className="border border-[#1a1a1a] min-w-0">
            {cart.map((item, i) => (
              <div key={i} className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-3 border-b border-[#1a1a1a] last:border-b-0">
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
            <div className="flex justify-between items-center px-4 py-3 border-b border-[#1a1a1a]">
              <span className="font-mono text-xs text-[#F0EDE8]/40">Subtotal</span>
              <span className="font-mono text-xs text-[#F0EDE8]/60">€{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center px-4 py-3 border-b border-[#1a1a1a]">
              <span className="font-mono text-xs text-[#F0EDE8]/40">BoxNow Shipping</span>
              <span className="font-mono text-xs text-[#F0EDE8]/60">€{shippingFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center px-4 py-4 bg-[#111]">
              <span className="font-mono text-xs uppercase tracking-widest text-[#F0EDE8]/40">{t('checkout.total')}</span>
              <span className="font-mono text-lg text-[#F0EDE8]">€{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="min-w-0">
          <p className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/40 mb-4">Payment</p>
          {!locker?.id ? (
            <div className="border border-[#F0EDE8]/10 bg-[#111] px-4 py-5 font-mono text-xs text-[#F0EDE8]/30">
              Choose a BoxNow locker to unlock payment options.
            </div>
          ) : !stripe ? (
            <div className="border border-[#FF2200]/40 bg-[#FF2200]/5 px-4 py-4 font-mono text-xs text-[#FF2200]/70">
              Payment not configured — Stripe key missing. Set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in Vercel and redeploy.
            </div>
          ) : (
            <div className="border border-[#333] p-3 md:p-4 focus-within:border-[#FF2200] transition-colors overflow-x-hidden min-w-0">
              <PaymentElement options={{ layout: 'tabs' }} />
            </div>
          )}
          {locker?.id && <p className="font-mono text-[11px] text-[#F0EDE8]/20 mt-2">{t('checkout.stripeNote')}</p>}
        </div>

        {error && <p className="font-mono text-xs text-[#FF2200]">{error}</p>}
        <button type="submit" disabled={processing || !stripe || !locker?.id} className="w-full font-mono text-xs uppercase tracking-widest bg-[#F0EDE8] text-[#080808] py-4 hover:bg-[#FF2200] transition-colors duration-200 disabled:opacity-40">
          {processing ? t('checkout.processing') : locker?.id ? `${t('checkout.pay')} €${total.toFixed(2)}` : 'Choose a Locker First'}
        </button>
      </div>
    </form>
    </>
  );
}

export default function CheckoutPage() {
  const t = useT();
  const [cart, setCart] = useState([]);
  const [options, setOptions] = useState(null);

  useEffect(() => { setCart(getCart()); }, []);

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0) + 3.00;

  useEffect(() => {
    async function createIntent() {
      const amount = Math.round(total * 100);
      if (amount < 50) return;
      try {
        const res = await fetch('/api/create-payment-intent', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount, currency: 'eur' }) });
        const data = await res.json();
        if (data.clientSecret) setOptions({ clientSecret: data.clientSecret, appearance: APPEARANCE });
      } catch (e) { console.error('Payment intent failed:', e); }
    }
    if (cart.length > 0) createIntent();
  }, [total, cart.length]);

  function handleUpdateQty(productId, size, qty) {
    updateCartQty(productId, size, qty);
    setCart(getCart());
  }

  function handleRemove(productId, size) {
    removeFromCart(productId, size);
    setCart(getCart());
  }

  if (cart.length === 0) return (
    <div className="pt-20 overflow-x-hidden w-full max-w-full">
      <div className="px-4 md:px-6 pt-12 md:pt-16 pb-8 md:pb-10 border-b border-[#1a1a1a] max-w-[1400px] mx-auto w-full">
        <h1 className="font-display text-4xl md:text-6xl lg:text-8xl text-[#F0EDE8] tracking-tight leading-none">{t('checkout.title')}</h1>
      </div>
      <div className="px-4 md:px-6 py-16 md:py-24 max-w-[1400px] mx-auto w-full flex flex-col items-center gap-6">
        <p className="font-mono text-sm text-[#F0EDE8]/40 uppercase tracking-widest">Your cart is empty</p>
        <a href="/products" className="font-mono text-xs uppercase tracking-widest text-[#FF2200] hover:underline">Continue Shopping →</a>
      </div>
    </div>
  );

  return (
    <div className="pt-20 overflow-x-hidden w-full max-w-full">
      <div className="px-4 md:px-6 pt-12 md:pt-16 pb-8 md:pb-10 border-b border-[#1a1a1a] max-w-[1400px] mx-auto w-full">
        <h1 className="font-display text-4xl md:text-6xl lg:text-8xl text-[#F0EDE8] tracking-tight leading-none">{t('checkout.title')}</h1>
      </div>
      <div className="px-4 md:px-6 py-8 md:py-14 max-w-[1400px] mx-auto w-full">
        {options ? (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm cart={cart} onUpdateQty={handleUpdateQty} onRemove={handleRemove} onSuccess={() => setCart([])} />
          </Elements>
        ) : (
          <p className="font-mono text-xs text-[#F0EDE8]/30">Loading payment options...</p>
        )}
      </div>
    </div>
  );
}
