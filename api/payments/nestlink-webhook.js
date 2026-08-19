// ─────────────────────────────────────────────────────────────────
//  WeberTech — api/payments/nestlink-webhook.js
//  POST /api/payments/nestlink-webhook
// ─────────────────────────────────────────────────────────────────

import { markOrderPaid, markOrderFailed } from "../_lib/orders.js";

const sendJson = (res, status, data) => {
  res.setHeader("Content-Type", "application/json");
  res.status(status).json(data);
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();

  try {
    if (req.method !== "POST") {
      return sendJson(res, 405, { error: "Method not allowed" });
    }

    const body = req.body || {};
    const { api_key, local_id, paid, result_code, result } = body;

    if (!local_id) {
      console.warn("[NestLink Webhook] Missing local_id:", body);
      return sendJson(res, 200, { received: true, note: "missing local_id" });
    }

    // Authenticity check
    if (process.env.NESTLINK_API_KEY && api_key && api_key !== process.env.NESTLINK_API_KEY) {
      console.warn(`[NestLink Webhook] Auth mismatch for order: ${local_id}`);
      return sendJson(res, 200, { received: true, note: "auth mismatch" });
    }

    if (paid === true && result_code === 0) {
      await markOrderPaid(local_id, {
        mpesaRef: result?.ref_code || result?.mpesa_ref || "",
        rawPayload: body,
        method: "nestlink",
      });
      console.log(`[NestLink Webhook] ✅ Confirmed: ${local_id}`);
    } else {
      const failReason = result?.msg || `NestLink result_code ${result_code}`;
      await markOrderFailed(local_id, failReason);
      console.log(`[NestLink Webhook] ❌ Failed: ${local_id} | Reason: ${failReason}`);
    }

    return sendJson(res, 200, { received: true });

  } catch (err) {
    console.error("[NestLink Webhook] CRITICAL ERROR:", err);
    // Always 200 to NestLink to prevent retry loops
    return sendJson(res, 200, { received: true, error: err.message });
  }
};
