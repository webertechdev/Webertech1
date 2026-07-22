// ─────────────────────────────────────────────────────────────────
//  WeberTech — api/payments/intasend-webhook.js
//  POST /api/payments/intasend-webhook
//  Register THIS URL in your IntaSend dashboard under
//  Settings → Webhooks (IPN URL):
//    https://webertech.co.ke/api/payments/intasend-webhook
//
//  IntaSend sends invoice/payment status updates including your
//  api_ref (which we set to our orderId at checkout creation time),
//  plus a "challenge" string you configure in the dashboard to
//  verify the request is genuinely from IntaSend.
// ─────────────────────────────────────────────────────────────────
const { markOrderPaid, markOrderFailed } = require("../_lib/orders");

const PAID_STATES = ["COMPLETE", "COMPLETED", "PAID"];
const FAILED_STATES = ["FAILED", "CANCELLED", "CANCELED"];

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const body = req.body || {};

    if (process.env.INTASEND_WEBHOOK_CHALLENGE && body.challenge &&
        body.challenge !== process.env.INTASEND_WEBHOOK_CHALLENGE) {
      console.warn("IntaSend webhook challenge mismatch");
      return res.status(200).json({ received: true });
    }

    const orderId = body.api_ref || body.invoice?.api_ref;
    const state = (body.state || body.invoice?.state || body.status || "").toUpperCase();
    const mpesaRef = body.mpesa_reference || body.invoice?.mpesa_reference || body.provider_ref || "";

    if (!orderId) {
      console.warn("IntaSend webhook missing api_ref/orderId:", JSON.stringify(body));
      return res.status(200).json({ received: true });
    }

    if (PAID_STATES.includes(state)) {
      await markOrderPaid(orderId, { mpesaRef, rawPayload: body, method: "intasend" });
      console.log(`✅ IntaSend payment confirmed for order ${orderId}`);
    } else if (FAILED_STATES.includes(state)) {
      await markOrderFailed(orderId, `IntaSend state: ${state}`);
      console.log(`❌ IntaSend payment failed for order ${orderId}`);
    } else {
      console.log(`ℹ️ IntaSend webhook for ${orderId} in intermediate state: ${state}`);
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error("intasend-webhook error:", err);
    return res.status(200).json({ received: true });
  }
};
