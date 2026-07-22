// ─────────────────────────────────────────────────────────────────
//  WeberTech — api/payments/nestlink-run-prompt.js
//  POST /api/payments/nestlink-run-prompt
//  Creates a pending WeberPay order, then triggers a NestLink
//  M-PESA STK push. NESTLINK_API_KEY lives ONLY here (server-side
//  Vercel env var) — it is never sent to the browser.
//
//  Env vars needed in Vercel:
//    NESTLINK_API_KEY   ← Api-Secret header value from NestLink dashboard
//    NESTLINK_BASE_URL  ← optional, defaults to https://api.nestlink.co.ke
// ─────────────────────────────────────────────────────────────────
const { db } = require("../_lib/firebaseAdmin");
const { generateOrderId, createPendingOrder, attachProviderRef, markOrderFailed } = require("../_lib/orders");

const NESTLINK_BASE = process.env.NESTLINK_BASE_URL || "https://api.nestlink.co.ke";

function isValidPhone(phone) {
  return /^(\+254|254|0)?7\d{8}$/.test(phone.replace(/\s+/g, ""));
}
function formatPhone(phone) {
  const cleaned = phone.replace(/\s+/g, "").replace(/[^0-9+]/g, "");
  if (cleaned.startsWith("+254")) return cleaned.slice(1);
  if (cleaned.startsWith("254")) return cleaned;
  if (cleaned.startsWith("0")) return "254" + cleaned.slice(1);
  return "254" + cleaned;
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const {
    phone, amount, productId, productSlug, productTitle,
    type, customerId, customerName, customerEmail,
  } = req.body || {};

  if (!phone || !amount || !productId || !productTitle) {
    return res.status(400).json({ error: "phone, amount, productId and productTitle are required" });
  }
  if (!isValidPhone(phone)) {
    return res.status(400).json({ error: "Invalid Kenyan phone number" });
  }
  const parsedAmount = Number(amount);
  if (!parsedAmount || parsedAmount < 1) {
    return res.status(400).json({ error: "Invalid amount" });
  }
  if (!process.env.NESTLINK_API_KEY) {
    return res.status(500).json({ error: "NestLink is not configured on the server yet" });
  }

  const orderId = generateOrderId();

  try {
    await createPendingOrder({
      orderId,
      customerId,
      customerName,
      customerEmail,
      customerPhone: phone,
      productId,
      productSlug,
      productTitle,
      type: type || "document",
      amount: parsedAmount,
      paymentMethod: "nestlink",
    });

    const payerPhone = formatPhone(phone);

    const nlRes = await fetch(`${NESTLINK_BASE}/runPrompt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Secret": process.env.NESTLINK_API_KEY,
      },
      body: JSON.stringify({
        phone: payerPhone,
        amount: parsedAmount,
        local_id: orderId,
        transaction_desc: `${productTitle} — WeberTech`,
      }),
    });

    const nlData = await nlRes.json();

    if (!nlRes.ok || nlData.status !== true) {
      const errMsg = nlData.msg || "NestLink STK push failed";
      await markOrderFailed(orderId, errMsg);
      return res.status(400).json({ error: errMsg, orderId });
    }

    await attachProviderRef(orderId, {
      merchantRequestId: nlData.data?.MerchantRequestID || null,
      checkoutRequestId: nlData.data?.CheckoutRequestID || null,
      confirmationLink: nlData.data?.ConfirmationLink || null,
    });

    return res.status(200).json({
      success: true,
      orderId,
      message: nlData.msg || "STK push sent. Enter your M-PESA PIN to complete payment.",
    });
  } catch (err) {
    console.error("nestlink-run-prompt error:", err);
    await markOrderFailed(orderId, "Server error initiating NestLink payment").catch(() => {});
    return res.status(500).json({ error: "Failed to initiate NestLink payment. Please try again." });
  }
};
