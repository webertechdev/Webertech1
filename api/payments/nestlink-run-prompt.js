// ─────────────────────────────────────────────────────────────────
//  WeberTech — api/payments/nestlink-run-prompt.js
//  POST /api/payments/nestlink-run-prompt
// ─────────────────────────────────────────────────────────────────

// 1. Helper to guarantee JSON response even on crash
const sendJson = (res, status, data) => {
  res.setHeader("Content-Type", "application/json");
  res.status(status).json(data);
};

module.exports = async function handler(req, res) {
  // 2. Set CORS headers immediately
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();

  try {
    // 3. Import dependencies inside handler to catch init errors
    const { db } = require("../_lib/firebaseAdmin");
    const { generateOrderId, createPendingOrder, attachProviderRef, markOrderFailed } = require("../_lib/orders");

    if (req.method !== "POST") {
      return sendJson(res, 405, { error: "Method not allowed" });
    }

    const {
      phone, amount, productId, productSlug, productTitle,
      type, customerId, customerName, customerEmail,
    } = req.body || {};

    // 4. Input Validation
    if (!phone || !amount || !productId || !productTitle) {
      return sendJson(res, 400, { error: "Missing required fields: phone, amount, productId, or productTitle" });
    }

    const isValidPhone = (p) => /^(\+254|254|0)?7\d{8}$/.test(p.replace(/\s+/g, ""));
    if (!isValidPhone(phone)) {
      return sendJson(res, 400, { error: "Invalid Kenyan phone number format (07... or 2547...)" });
    }

    const formatPhone = (p) => {
      const cleaned = p.replace(/\s+/g, "").replace(/[^0-9+]/g, "");
      if (cleaned.startsWith("+254")) return cleaned.slice(1);
      if (cleaned.startsWith("254")) return cleaned;
      if (cleaned.startsWith("0")) return "254" + cleaned.slice(1);
      return "254" + cleaned;
    };

    const parsedAmount = Number(amount);
    if (!parsedAmount || parsedAmount < 1) {
      return sendJson(res, 400, { error: "Invalid amount" });
    }

    // 5. Config Check
    if (!process.env.NESTLINK_API_KEY) {
      console.error("[WeberPay] NESTLINK_API_KEY is missing in environment variables");
      return sendJson(res, 500, { error: "NestLink is not configured on the server. Please add NESTLINK_API_KEY to Vercel." });
    }

    const orderId = generateOrderId();
    const payerPhone = formatPhone(phone);
    const NESTLINK_BASE = process.env.NESTLINK_BASE_URL || "https://api.nestlink.co.ke";

    console.log(`[WeberPay] Initiating ${orderId} | Phone: ${payerPhone} | Amount: ${parsedAmount}`);

    // 6. Create Order in Firestore
    try {
      await createPendingOrder({
        orderId, customerId, customerName, customerEmail,
        customerPhone: phone, productId, productSlug, productTitle,
        type: type || "document", amount: parsedAmount, paymentMethod: "nestlink",
      });
    } catch (dbErr) {
      console.error("[WeberPay] Firestore Error:", dbErr);
      return sendJson(res, 500, { error: "Failed to create order record. Please check Firebase credentials." });
    }

    // 7. Trigger NestLink Prompt
    try {
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

      const text = await nlRes.text();
      let nlData;
      try {
        nlData = JSON.parse(text);
      } catch (parseErr) {
        console.error("[WeberPay] NestLink non-JSON response:", text);
        await markOrderFailed(orderId, "NestLink returned invalid response format");
        return sendJson(res, 502, { error: "NestLink API returned an invalid response. Please try again." });
      }

      if (!nlRes.ok || nlData.status !== true) {
        const errMsg = nlData.msg || "NestLink STK push failed";
        console.warn("[WeberPay] NestLink Error:", nlData);
        await markOrderFailed(orderId, errMsg);
        return sendJson(res, 400, { error: errMsg, orderId });
      }

      // 8. Success - Attach Provider Data
      await attachProviderRef(orderId, {
        merchantRequestId: nlData.data?.MerchantRequestID || null,
        checkoutRequestId: nlData.data?.CheckoutRequestID || null,
        confirmationLink: nlData.data?.ConfirmationLink || null,
        ld_id: nlData.data?.ld_id || null,
      });

      console.log(`[WeberPay] Success: STK Push sent for ${orderId}`);
      return sendJson(res, 200, {
        success: true,
        orderId,
        message: nlData.msg || "STK push sent. Enter your M-PESA PIN to complete payment.",
      });

    } catch (fetchErr) {
      console.error("[WeberPay] Fetch Error:", fetchErr);
      await markOrderFailed(orderId, "Connection to NestLink failed");
      return sendJson(res, 503, { error: "Could not connect to NestLink. Please check your internet or try again." });
    }

  } catch (globalErr) {
    console.error("[WeberPay] CRITICAL SERVER ERROR:", globalErr);
    return sendJson(res, 500, { 
      error: "A critical server error occurred. Please contact support.",
      details: globalErr.message 
    });
  }
};
