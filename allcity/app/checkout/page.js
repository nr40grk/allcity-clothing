'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// Load Stripe outside render to avoid re-instantiation
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// ── Card element options ───────────────────────────────────────────
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#F0EDE8',
      fontFamily: '"IBM Plex Mono", monospace',
      fontSize: '13px',
      letterSpacing: '0.05em',
      '::placeholder': { color: '#F0EDE8' + '33' },
    },
    invalid: { color: '#FF2200' },
  },
};

// ── Checkout form ─────────────────────────────────────────────────
function CheckoutForm({ cart }) {
  const stripe = useStripe();
  const elements = useElements();

  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    address: '', city: '', postalCode: '', country: 'GR',
  });
  const [deliveryMethod, setDeliveryMethod] = useState('courier'); // 'courier' | 'boxnow'
  const [boxnowLocker, setBoxnowLocker] = useState(null);
  const [lockerLoading, setLockerLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Find nearest BoxNow locker when address is filled
  async function findLocker() {
    if (!form.city || !form.postalCode) {
      setError('Enter city and postal code first.');
      return;
    }
    setLockerLoading(true);
    setError('');
    try {
      const res = await fetch('/api/boxnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'findLocker',
          city: form.city,
          street: form.address,
          postalCode: form.postalCode,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setBoxnowLocker(data);
    } catch (e) {
      setError(e.message || 'Could not find a nearby locker.');
    } finally {
      setLockerLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);
    setError('');

    try {
      // 1. Create PaymentIntent server-side
      const intentRes = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Math.round(total * 100), currency: 'eur' }),
      });
      const { clientSecret, error: intentError } = await intentRes.json();
      if (intentError) throw new Error(intentError);

      // 2. Confirm card payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name: form.name, email: form.email },
        },
      });
      if (stripeError) throw new Error(stripeError.message);

      // 3. If BoxNow selected, create delivery request
      if (deliveryMethod === 'boxnow' && boxnowLocker) {
        await fetch('/api/boxnow', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'createDelivery',
            orderNumber: paymentIntent.id,
            invoiceValue: total.toFixed(2),
            customer: { name: form.name, email: form.email, phone: form.phone },
            destinationLocationId: boxnowLocker.id,
            items: cart.map((item) => ({
              name: item.name,
              value: item.price.toFixed(2),
              weight: 500,
              compartmentSize: 1,
            })),
          }),
        });
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
        <span className="font-display text-[80px] text-[#FF2200] leading-none">✓</span>
        <h2 className="font-display text-4xl text-[#F0EDE8]">Order Confirmed</h2>
        <p className="font-mono text-xs text-[#F0EDE8]/50 max-w-sm">
          Thank you for your order. We will ship within 2 business days. Check your email for confirmation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-10 lg:gap-20">

      {/* Left — contact + delivery */}
      <div className="flex flex-col gap-8">

        {/* Contact info */}
        <fieldset>
          <legend className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/40 mb-4">
            Contact
          </legend>
          <div className="flex flex-col gap-3">
            {[
              { name: 'name', placeholder: 'Full name' },
              { name: 'email', placeholder: 'Email', type: 'email' },
              { name: 'phone', placeholder: 'Phone (e.g. +30 69...)' },
            ].map(({ name, placeholder, type = 'text' }) => (
              <input
                key={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={form[name]}
                onChange={handleChange}
                required
                className="bg-[#111] border border-[#333] text-[#F0EDE8] font-mono text-xs px-4 py-3 outline-none focus:border-[#FF2200] transition-colors placeholder-[#F0EDE8]/20 w-full"
              />
            ))}
          </div>
        </fieldset>

        {/* Delivery method */}
        <fieldset>
          <legend className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/40 mb-4">
            Delivery Method
          </legend>
          <div className="flex flex-col gap-2">
            {[
              { value: 'courier', label: 'Home / Address delivery' },
              { value: 'boxnow', label: 'BoxNow Locker (Greece only)' },
            ].map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setDeliveryMethod(value)}
                className={`font-mono text-xs text-left px-4 py-3 border transition-colors ${
                  deliveryMethod === value
                    ? 'border-[#FF2200] text-[#F0EDE8]'
                    : 'border-[#333] text-[#F0EDE8]/50 hover:border-[#F0EDE8]/30'
                }`}
              >
                <span className={`mr-3 ${deliveryMethod === value ? 'text-[#FF2200]' : 'text-[#333]'}`}>●</span>
                {label}
              </button>
            ))}
          </div>
        </fieldset>

        {/* Shipping address */}
        <fieldset>
          <legend className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/40 mb-4">
            {deliveryMethod === 'boxnow' ? 'Your Address (to find nearest locker)' : 'Shipping Address'}
          </legend>
          <div className="flex flex-col gap-3">
            {[
              { name: 'address', placeholder: 'Street address' },
              { name: 'city', placeholder: 'City' },
              { name: 'postalCode', placeholder: 'Postal code' },
            ].map(({ name, placeholder }) => (
              <input
                key={name}
                name={name}
                type="text"
                placeholder={placeholder}
                value={form[name]}
                onChange={handleChange}
                required
                className="bg-[#111] border border-[#333] text-[#F0EDE8] font-mono text-xs px-4 py-3 outline-none focus:border-[#FF2200] transition-colors placeholder-[#F0EDE8]/20 w-full"
              />
            ))}
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              className="bg-[#111] border border-[#333] text-[#F0EDE8]/70 font-mono text-xs px-4 py-3 outline-none focus:border-[#FF2200] transition-colors"
            >
              <option value="GR">Greece (EUR €)</option>
              <option value="CY">Cyprus</option>
              <option value="BG">Bulgaria</option>
              <option value="OTHER">International</option>
            </select>
          </div>

          {/* BoxNow locker finder */}
          {deliveryMethod === 'boxnow' && (
            <div className="mt-4">
              <button
                type="button"
                onClick={findLocker}
                disabled={lockerLoading}
                className="font-mono text-xs uppercase tracking-widest border border-[#333] text-[#F0EDE8]/60 px-5 py-3 hover:border-[#FF2200] hover:text-[#FF2200] transition-colors disabled:opacity-40"
              >
                {lockerLoading ? 'Searching...' : 'Find Nearest Locker →'}
              </button>

              {boxnowLocker && (
                <div className="mt-4 border border-[#FF2200]/30 bg-[#FF2200]/5 p-4 font-mono text-xs text-[#F0EDE8]/70 flex flex-col gap-1">
                  <p className="text-[#FF2200] uppercase tracking-widest text-[11px]">Selected Locker</p>
                  <p>{boxnowLocker.name}</p>
                  <p className="text-[#F0EDE8]/40">{boxnowLocker.addressLine1}, {boxnowLocker.postalCode}</p>
                  {boxnowLocker.note && (
                    <p className="text-[#F0EDE8]/30 text-[11px] mt-1">Note: {boxnowLocker.note}</p>
                  )}
                </div>
              )}
            </div>
          )}
        </fieldset>
      </div>

      {/* Right — order summary + payment */}
      <div className="flex flex-col gap-8">

        {/* Order summary */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/40 mb-4">
            Order Summary
          </p>
          <div className="border border-[#1a1a1a]">
            {cart.map((item, i) => (
              <div key={i} className="flex justify-between items-center px-4 py-3 border-b border-[#1a1a1a] last:border-b-0">
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-xs text-[#F0EDE8]/70">{item.name}</span>
                  <span className="font-mono text-[11px] text-[#F0EDE8]/30">{item.size} × {item.qty}</span>
                </div>
                <span className="font-mono text-xs text-[#F0EDE8]/60">
                  €{(item.price * item.qty).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="flex justify-between items-center px-4 py-4 bg-[#111]">
              <span className="font-mono text-xs uppercase tracking-widest text-[#F0EDE8]/40">Total</span>
              <span className="font-mono text-lg text-[#F0EDE8]">€{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Card */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/40 mb-4">
            Card Details
          </p>
          <div className="border border-[#333] px-4 py-4 focus-within:border-[#FF2200] transition-colors">
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </div>
          <p className="font-mono text-[11px] text-[#F0EDE8]/20 mt-2">
            Secured by Stripe. We never store card data.
          </p>
        </div>

        {error && (
          <p className="font-mono text-xs text-[#FF2200]">{error}</p>
        )}

        <button
          type="submit"
          disabled={processing || !stripe}
          className="w-full font-mono text-xs uppercase tracking-widest bg-[#F0EDE8] text-[#080808] py-4 hover:bg-[#FF2200] transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {processing ? 'Processing...' : `Pay €${total.toFixed(2)}`}
        </button>

      </div>
    </form>
  );
}

// ── Demo cart (replace with real state management later) ──────────
const DEMO_CART = [
  { name: 'ALLCITY CORE JACKET', size: 'M', qty: 1, price: 120 },
];

// ── Page ──────────────────────────────────────────────────────────
export default function CheckoutPage() {
  return (
    <div className="pt-14">
      <div className="px-6 pt-16 pb-10 border-b border-[#1a1a1a] max-w-[1400px] mx-auto">
        <h1 className="font-display text-6xl md:text-8xl text-[#F0EDE8] tracking-tight leading-none">
          Checkout
        </h1>
      </div>

      <div className="px-6 py-14 max-w-[1400px] mx-auto">
        <Elements stripe={stripePromise}>
          <CheckoutForm cart={DEMO_CART} />
        </Elements>
      </div>
    </div>
  );
}
