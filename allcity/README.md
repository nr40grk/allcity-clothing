# ALLCITY — Clothing Store

Street apparel e-commerce. Built with Next.js 14, Stripe, and BoxNow.

---

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS**
- **Stripe** — payment processing
- **BoxNow** — locker delivery (Greece)
- **IBM Plex Mono + Bebas Neue** — Google Fonts

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Then fill in:

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys) → Publishable key |
| `STRIPE_SECRET_KEY` | Same page → Secret key |
| `BOXNOW_CLIENT_ID` | After registering at sales@boxnow.gr |
| `BOXNOW_CLIENT_SECRET` | Same |
| `BOXNOW_API_URL` | `https://api-stage.boxnow.gr` for testing, `https://api-production.boxnow.gr` for live |
| `BOXNOW_ORIGIN_LOCATION_ID` | Your store's registered pickup location ID from BoxNow |

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
app/
  page.js                         → Home
  products/page.js                → All products
  products/[slug]/page.js         → Product detail
  checkout/page.js                → Checkout (Stripe + BoxNow)
  shipping/page.js                → Shipping & Payment info
  api/
    create-payment-intent/route.js → Stripe PaymentIntent creation
    boxnow/route.js                → BoxNow proxy (locker finder + delivery creation)

components/
  Navbar.js
  Footer.js
  ProductCard.js

lib/
  products.js     → Demo product data (replace with real DB/CMS later)
  stripe.js       → Stripe server-side instance
  boxnow.js       → BoxNow API utility functions
```

---

## Going Live Checklist

- [ ] Replace demo products in `lib/products.js` with real product data (or connect to a CMS/DB)
- [ ] Switch `BOXNOW_API_URL` to production URL
- [ ] Switch Stripe keys to live keys (`pk_live_...` / `sk_live_...`)
- [ ] Add proper cart state (localStorage, Context, or Zustand)
- [ ] Add order confirmation emails (Resend or SendGrid)
- [ ] Add real product images (replace `via.placeholder.com` URLs)
- [ ] Deploy to Vercel: `vercel deploy`

---

## BoxNow Flow

1. Customer selects **BoxNow Locker** delivery at checkout
2. Enters their address → clicks "Find Nearest Locker"
3. App calls `/api/boxnow` → `findClosestBoxNowLocker` → returns nearest APM
4. On payment success → app calls `/api/boxnow` → `createBoxNowDelivery` with the locker ID
5. BoxNow notifies customer when parcel is ready for pickup

---

## Stripe Flow

1. Customer fills card details in the Stripe Elements card input
2. Frontend calls `/api/create-payment-intent` with the amount
3. Stripe returns a `clientSecret`
4. Frontend calls `stripe.confirmCardPayment(clientSecret, { payment_method: { card } })`
5. On success → triggers BoxNow delivery creation

---

Built for ALLCITY. © 2026.
