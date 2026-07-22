# WeberPay Core + Cyber Phase 1 — Setup Guide

This build is **additive only**. Nothing existing was removed or rewritten:
- `api/stkpush.js`, `api/callback.js` (Bundles' M-PESA flow) — untouched, still works exactly as before.
- `api/chat.js` — untouched.
- Every existing page/component — untouched.
- The **only** edit to an existing file is `src/App.jsx`, where 3 import lines and the single
  `/cyber` route were extended into 3 routes (`/cyber`, `/cyber/legal-documents`,
  `/cyber/legal-documents/:slug`) pointing at the new pages instead of the old "Coming Soon" placeholder.
  `src/pages/Cyber.jsx` (the old placeholder) is still in the repo, just no longer routed to.

## 1. New files added

```
api/_lib/firebaseAdmin.js          shared Firebase Admin init (new endpoints only)
api/_lib/orders.js                 provider-agnostic order helpers
api/payments/order-status.js       GET  — poll any order's status
api/payments/nestlink-run-prompt.js POST — trigger NestLink M-PESA STK push
api/payments/nestlink-webhook.js   POST — NestLink payment confirmation
api/payments/intasend-checkout.js  POST — create IntaSend hosted checkout
api/payments/intasend-webhook.js   POST — IntaSend payment confirmation (IPN)

src/payments/                      WeberPay Core (reusable by every future module)
src/pages/cyber/                   Cyber sub-app (Home, Legal Documents Hub, Document detail)
```

## 2. Environment variables to add in Vercel

Go to Vercel Dashboard → your project → Settings → Environment Variables and add:

| Variable | Where to get it | Notes |
|---|---|---|
| `NESTLINK_API_KEY` | NestLink Dashboard → Links → your link → API key | **Rotate the one you shared in chat** before going live — treat it as exposed since it was pasted in plaintext here |
| `NESTLINK_BASE_URL` | optional | defaults to `https://api.nestlink.co.ke` |
| `INTASEND_PUBLISHABLE_KEY` | IntaSend Dashboard → API keys | starts with `ISPubKey_` |
| `INTASEND_SECRET_KEY` | IntaSend Dashboard → API keys | starts with `ISSecretKey_` — reserved for later use, not currently required by the checkout-link flow but keep it set |
| `INTASEND_LIVE` | `"true"` for production, omit/`"false"` for sandbox testing |
| `INTASEND_WEBHOOK_CHALLENGE` | optional, set in IntaSend dashboard webhook config too, if you want signature checking |
| `APP_BASE_URL` | e.g. `https://webertech.co.ke` | used to build the IntaSend redirect URL |

Your existing `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` are reused as-is — no new Firebase Admin credentials needed.

## 3. Register webhook URLs

- **NestLink**: in your link's settings, set the webhook/callback URL to:
  `https://webertech.co.ke/api/payments/nestlink-webhook`
- **IntaSend**: Dashboard → Settings → Webhooks (IPN URL):
  `https://webertech.co.ke/api/payments/intasend-webhook`

## 4. Firestore — new collections (created automatically on first write)

`orders`, `payments`, `downloads`, `services`, `products`

No existing collections (`transactions`, `users`, `cyber_notify`, etc.) are touched.

### Suggested Firestore rules addition (merge into your existing rules — don't replace them)

```
match /orders/{orderId} {
  allow read: if true;   // orderId is an unguessable token; used only for status polling
  allow write: if false; // orders are only written by the trusted backend (Admin SDK bypasses rules anyway)
}
match /products/{productId} {
  allow read: if resource.data.status == "active";
  allow write: if false; // manage products via Admin SDK / future admin UI
}
```

## 5. What's live vs. what's next

**Live now:**
- WeberPay Core: NestLink (M-PESA STK) + IntaSend (M-PESA or Card, customer's choice) checkout, both fully wired to real order creation, webhook confirmation, and realtime status in the UI.
- Safaricom-direct shows as "Coming Soon" in the payment method picker — the existing Daraja Bundles flow is untouched and separate.
- Cyber Home (`/cyber`) and Legal Documents Hub (`/cyber/legal-documents/:slug`) — 12 seeded documents, real checkout flow end-to-end.

**Known gap to close before real money moves through it:**
- No actual document files are uploaded yet (`downloadFile` is empty in the seed). Orders and payments work correctly, but until files are uploaded to Firebase Storage and linked on each product, fulfillment of *paid document downloads* needs to be manual (WhatsApp the file) — flag this to whoever manages content.
- No admin UI yet to manage `products`/orders — Phase 2 per your original blueprint.

**Not built yet (later phases, as originally planned):** Government Services, Business Services, Professional Writing, Printing, AI tools, Admin Dashboard extensions.
