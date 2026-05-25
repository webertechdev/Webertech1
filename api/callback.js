// ─────────────────────────────────────────────────────────────────
//  WeberTech — api/callback.js
//  M-PESA Daraja STK Push Callback Handler
//  Safaricom calls this URL after payment success/failure
//  Place at: /api/callback.js
//
//  Register this URL in Daraja portal as your Callback URL:
//  https://webertech.co.ke/api/callback
// ─────────────────────────────────────────────────────────────────

const admin = require("firebase-admin");

// Firebase Admin init (once)
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

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body;
    const stk  = body?.Body?.stkCallback;

    if (!stk) {
      console.error("Invalid callback body:", JSON.stringify(body));
      return res.status(400).json({ ResultCode: 1, ResultDesc: "Invalid payload" });
    }

    const {
      MerchantRequestID,
      CheckoutRequestID,
      ResultCode,
      ResultDesc,
      CallbackMetadata,
    } = stk;

    // ── Find existing transaction by CheckoutRequestID ──
    const txnRef = db.collection("transactions").doc(CheckoutRequestID);
    const txnSnap = await txnRef.get();

    if (!txnSnap.exists) {
      console.warn("Transaction not found for:", CheckoutRequestID);
      // Still acknowledge Safaricom
      return res.status(200).json({ ResultCode: 0, ResultDesc: "Accepted" });
    }

    if (ResultCode === 0) {
      // ── PAYMENT SUCCESSFUL ──
      const meta = {};
      CallbackMetadata?.Item?.forEach(item => {
        meta[item.Name] = item.Value;
      });

      const mpesaTxn = meta["MpesaReceiptNumber"] || CheckoutRequestID;

      // Update transaction with real M-PESA receipt
      await txnRef.update({
        mpesaTxn,
        status:    "Completed",
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        mpesaRaw:  meta,
      });

      // Also create a doc keyed by mpesaTxn for easy lookup by user
      const existingData = txnSnap.data();
      await db.collection("transactions").doc(mpesaTxn).set({
        ...existingData,
        mpesaTxn,
        status:    "Completed",
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log(`✅ Payment SUCCESS: ${mpesaTxn} for ${existingData.receivingNumber}`);

    } else {
      // ── PAYMENT FAILED / CANCELLED ──
      await txnRef.update({
        status:     "Failed",
        failReason: ResultDesc,
        updatedAt:  admin.firestore.FieldValue.serverTimestamp(),
      });
      console.log(`❌ Payment FAILED: ${CheckoutRequestID} — ${ResultDesc}`);
    }

    // Always acknowledge Safaricom with 200
    return res.status(200).json({ ResultCode: 0, ResultDesc: "Accepted" });

  } catch (err) {
    console.error("Callback processing error:", err);
    // Still return 200 so Safaricom doesn't retry endlessly
    return res.status(200).json({ ResultCode: 0, ResultDesc: "Accepted" });
  }
};
