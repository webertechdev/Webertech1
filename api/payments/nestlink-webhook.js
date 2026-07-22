// ─────────────────────────────────────────────────────────────────
//  WeberTech — api/payments/nestlink-webhook.js
//  POST /api/payments/nestlink-webhook
//  Register THIS URL as the callback/webhook URL on your NestLink
//  payment link (Links → your link → Webhook / Callback URL):
//    https://webertech.co.ke/api/payments/nestlink-webhook
//
//  NestLink sends: { api_key, local_id, paid, result_code, result:{...} }
//  We match api_key against NESTLINK_API_KEY to confirm authenticity,
//  then use local_id as our Firestore orders/{orderId} doc id.
// ─────────────────────────────────────────────────────────────────
const { markOrderPaid, markOrderFailed } = require("../_lib/orders");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const body = req.body || {};
    const { api_key, local_id, paid, result_code, result } = body;

    if (!local_id) {
      console.warn("NestLink webhook missing local_id:", JSON.stringify(body));
      return res.status(200).json({ received: true }); // ack anyway, nothing to process
    }

    // Verify this webhook really came from our own NestLink link
    if (process.env.NESTLINK_API_KEY && api_key && api_key !== process.env.NESTLINK_API_KEY) {
      console.warn("NestLink webhook api_key mismatch for order:", local_id);
      return res.status(200).json({ received: true }); // still 200 so NestLink doesn't retry forever
    }

    if (paid === true && result_code === 0) {
      await markOrderPaid(local_id, {
        mpesaRef: result?.ref_code || result?.mpesa_ref || "",
        rawPayload: body,
        method: "nestlink",
      });
      console.log(`✅ NestLink payment confirmed for order ${local_id}`);
    } else {
      await markOrderFailed(local_id, result?.msg || `NestLink result_code ${result_code}`);
      console.log(`❌ NestLink payment failed for order ${local_id}`);
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error("nestlink-webhook error:", err);
    // Still 200 — we don't want NestLink hammering retries on our bug
    return res.status(200).json({ received: true });
  }
};
