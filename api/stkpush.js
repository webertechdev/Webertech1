// ─────────────────────────────────────────────────────────────────
//  WeberTech — api/stkpush.js
//  Vercel Serverless Function — Safaricom Daraja STK Push
//  Till Number (Buy Goods) configuration
//  Place at: /api/stkpush.js in your project root
//
//  Env vars needed in Vercel Dashboard:
//    MPESA_CONSUMER_KEY
//    MPESA_CONSUMER_SECRET
//    MPESA_SHORTCODE        ← Your Till Number
//    MPESA_PASSKEY
//    MPESA_CALLBACK_URL     ← e.g. https://webertech.co.ke/api/callback
//    FIREBASE_PROJECT_ID
//    FIREBASE_CLIENT_EMAIL
//    FIREBASE_PRIVATE_KEY
// ─────────────────────────────────────────────────────────────────

const admin = require("firebase-admin");

// ── Init Firebase Admin (once) ──────────────────────────────────
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId:   process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey:  process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}
const db = admin.firestore();

// ── Generate Daraja OAuth token ──────────────────────────────────
async function getDarajaToken() {
  const credentials = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
  ).toString("base64");

  const res = await fetch(
    "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    { headers: { Authorization: `Basic ${credentials}` } }
  );
  if (!res.ok) throw new Error(`Daraja auth failed: ${res.status}`);
  const data = await res.json();
  return data.access_token;
}

// ── Generate STK Push password ───────────────────────────────────
function getPassword(timestamp) {
  const raw = `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`;
  return Buffer.from(raw).toString("base64");
}

// ── Format phone to 254XXXXXXXXX ────────────────────────────────
function formatPhone(phone) {
  const cleaned = phone.replace(/\s+/g, "").replace(/[^0-9+]/g, "");
  if (cleaned.startsWith("+254")) return cleaned.slice(1);
  if (cleaned.startsWith("254"))  return cleaned;
  if (cleaned.startsWith("0"))    return "254" + cleaned.slice(1);
  return "254" + cleaned;
}

// ── Validate Kenyan phone ────────────────────────────────────────
function isValidPhone(phone) {
  return /^(\+254|254|0)?7\d{8}$/.test(phone.replace(/\s+/g,""));
}

// ── Main handler ─────────────────────────────────────────────────
module.exports = async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin",  "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST")    return res.status(405).json({ error: "Method not allowed" });

  const { receivingNumber, mpesaNumber, amount, bundle, bundleType, userId, validity } = req.body;

  // ── Validate ──
  if (!receivingNumber || !mpesaNumber || !amount || !bundle) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  if (!isValidPhone(receivingNumber)) {
    return res.status(400).json({ error: "Invalid receiving number" });
  }
  if (!isValidPhone(mpesaNumber)) {
    return res.status(400).json({ error: "Invalid M-PESA number" });
  }
  const parsedAmount = parseInt(amount);
  if (isNaN(parsedAmount) || parsedAmount < 1) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  try {
    // ── Get Daraja token ──
    const token     = await getDarajaToken();
    const timestamp = new Date().toISOString().replace(/[^0-9]/g,"").slice(0,14);
    const password  = getPassword(timestamp);
    const payerPhone = formatPhone(mpesaNumber);

    // ── STK Push payload ── (Till Number uses TransactionType: CustomerBuyGoodsOnline)
    const payload = {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password:          password,
      Timestamp:         timestamp,
      TransactionType:   "CustomerBuyGoodsOnline",  // ← Till Number type
      Amount:            parsedAmount,
      PartyA:            payerPhone,
      PartyB:            process.env.MPESA_SHORTCODE,
      PhoneNumber:       payerPhone,
      CallBackURL:       process.env.MPESA_CALLBACK_URL,
      AccountReference:  "WeberTech",
      TransactionDesc:   `${bundle} bundle for ${receivingNumber}`,
    };

    // ── Send STK Push ──
    const stkRes = await fetch(
      "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        method:  "POST",
        headers: {
          Authorization:  `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const stkData = await stkRes.json();

    if (!stkRes.ok || stkData.ResponseCode !== "0") {
      const errMsg = stkData.errorMessage || stkData.ResponseDescription || "STK Push failed";
      console.error("STK Push error:", stkData);
      return res.status(400).json({ error: errMsg });
    }

    // ── Save pending transaction to Firestore ──
    const checkoutRequestId = stkData.CheckoutRequestID;
    const now = new Date();

    const txnData = {
      mpesaTxn:         null,                         // filled by callback
      checkoutRequestId,
      wtRef:            `WT-${now.getFullYear()}-${Date.now().toString().slice(-6)}`,
      status:           "Processing",
      bundle,
      bundleType:       bundleType || "Data",
      amount:           `KES ${parsedAmount}`,
      receivingNumber:  receivingNumber.replace(/\s+/g,""),
      paymentNumber:    mpesaNumber.replace(/\s+/g,""),
      userId:           userId || null,
      validity:         validity || "",
      date:             now.toISOString().split("T")[0],
      time:             now.toLocaleTimeString("en-KE",{ hour:"2-digit", minute:"2-digit" }),
      createdAt:        admin.firestore.FieldValue.serverTimestamp(),
    };

    // Save by checkoutRequestId initially (callback will update with mpesaTxn)
    await db.collection("transactions").doc(checkoutRequestId).set(txnData);

    // ── If userId, fetch and attach user name ──
    if (userId) {
      const userSnap = await db.collection("users").doc(userId).get();
      if (userSnap.exists) {
        const u = userSnap.data();
        await db.collection("transactions").doc(checkoutRequestId).update({
          firstName: u.firstName || "",
          lastName:  u.lastName  || "",
          email:     u.email     || "",
        });
      }
    }

    return res.status(200).json({
      success:          true,
      checkoutRequestId,
      message:          "STK Push sent. Enter your M-PESA PIN to complete payment.",
    });

  } catch (err) {
    console.error("stkpush error:", err);
    return res.status(500).json({
      error: "Failed to initiate payment. Please try again.",
    });
  }
};
