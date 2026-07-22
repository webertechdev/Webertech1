// ─────────────────────────────────────────────────────────────────
//  WeberTech — api/payments/intasend-checkout.js
//  POST /api/payments/intasend-checkout
//  Creates an IntaSend hosted Checkout Link. The customer is sent to
//  IntaSend's page where THEY choose M-PESA STK push or Card —
//  matching the "customer picks the method" requirement without us
//  needing two separate IntaSend integrations.
//
//  Env vars needed in Vercel:
//    INTASEND_PUBLISHABLE_KEY   ← starts with ISPubKey_
//    INTASEND_SECRET_KEY        ← starts with ISSecretKey_ (server only)
//    INTASEND_LIVE              ← "true" for production, unset/"false" for sandbox
//    APP_BASE_URL                ← e.g. https://webertech.co.ke (for redirect_url)
// ─────────────────────────────────────────────────────────────────
const { generateOrderId, createPendingOrder, attachProviderRef, markOrderFailed } = require("../_lib/orders");

function baseUrl() {
  return process.env.INTASEND_LIVE === "true"
    ? "https://payment.intasend.com"
    : "https://sandbox.intasend.com";
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const {
    amount, email, phone, firstName, lastName,
    productId, productSlug, productTitle, type,
    customerId, customerName,
  } = req.body || {};

  if (!amount || !email || !productId || !productTitle) {
    return res.status(400).json({ error: "amount, email, productId and productTitle are required" });
  }
  const parsedAmount = Number(amount);
  if (!parsedAmount || parsedAmount < 1) {
    return res.status(400).json({ error: "Invalid amount" });
  }
  if (!process.env.INTASEND_PUBLISHABLE_KEY) {
    return res.status(500).json({ error: "IntaSend is not configured on the server yet" });
  }

  const orderId = generateOrderId();

  try {
    await createPendingOrder({
      orderId,
      customerId,
      customerName: customerName || `${firstName || ""} ${lastName || ""}`.trim(),
      customerEmail: email,
      customerPhone: phone || "",
      productId,
      productSlug,
      productTitle,
      type: type || "document",
      amount: parsedAmount,
      paymentMethod: "intasend",
    });

    const redirectUrl = `${process.env.APP_BASE_URL || ""}/payment/complete?orderId=${orderId}`;

    const isRes = await fetch(`${baseUrl()}/api/v1/checkout/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        public_key: process.env.INTASEND_PUBLISHABLE_KEY,
        amount: parsedAmount,
        currency: "KES",
        email,
        phone_number: phone || undefined,
        first_name: firstName || "WeberTech",
        last_name: lastName || "Customer",
        api_ref: orderId,
        redirect_url: redirectUrl,
        method: ["M-PESA", "CARD-PAYMENT"], // customer chooses on IntaSend's page
      }),
    });

    const isData = await isRes.json();

    if (!isRes.ok || !isData.url) {
      const errMsg = isData?.detail || isData?.error || "IntaSend checkout creation failed";
      await markOrderFailed(orderId, errMsg);
      return res.status(400).json({ error: errMsg, orderId });
    }

    await attachProviderRef(orderId, {
      checkoutId: isData.id || null,
      checkoutUrl: isData.url,
    });

    return res.status(200).json({
      success: true,
      orderId,
      checkoutUrl: isData.url,
    });
  } catch (err) {
    console.error("intasend-checkout error:", err);
    await markOrderFailed(orderId, "Server error creating IntaSend checkout").catch(() => {});
    return res.status(500).json({ error: "Failed to initiate IntaSend payment. Please try again." });
  }
};
