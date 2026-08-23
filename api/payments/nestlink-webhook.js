// ─────────────────────────────────────────────────────────────────
//  WeberTech — api/payments/nestlink-webhook.js
//  POST /api/payments/nestlink-webhook
// ─────────────────────────────────────────────────────────────────

import { markOrderPaid, markOrderFailed, markOrderCancelled } from "../_lib/orders.js";

function resultCodeNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : value;
}

function friendlyNestLinkMessage(code, fallback = "Payment could not be completed.") {
  const normalized = String(code ?? "").toUpperCase();
  if (normalized === "1") return "Payment was declined because the M-PESA account has insufficient balance.";
  if (normalized === "1032") return "Payment was cancelled on the phone. No charge was completed.";
  if (normalized === "1037") return "M-PESA did not respond in time. You can try the payment again.";
  if (normalized === "2001") return "The M-PESA PIN was incorrect. Please try again with the correct PIN.";
  if (normalized === "GV50113") return "The payment details could not be verified. Please check the phone number and try again.";
  return fallback;
}

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
    const code = resultCodeNumber(result_code ?? result?.result_code);

    if (!local_id) {
      console.warn("[NestLink Webhook] Missing local_id:", body);
      return sendJson(res, 200, { received: true, note: "missing local_id" });
    }

    // Authenticity check
    if (process.env.NESTLINK_API_KEY && api_key && api_key !== process.env.NESTLINK_API_KEY) {
      console.warn(`[NestLink Webhook] Auth mismatch for order: ${local_id}`);
      return sendJson(res, 200, { received: true, note: "auth mismatch" });
    }

    if ((paid === true || String(paid).toLowerCase() === "true") && String(code) === "0") {
      await markOrderPaid(local_id, {
        mpesaRef: result?.ref_code || result?.mpesa_ref || "",
        rawPayload: body,
        method: "nestlink",
      });
      console.log(`[NestLink Webhook] ✅ Confirmed: ${local_id}`);
    } else {
      const failReason = friendlyNestLinkMessage(code, result?.msg || "Payment was declined by M-PESA.");
      const options = { resultCode: code };
      if (String(code) === "1032") await markOrderCancelled(local_id, failReason, options);
      else await markOrderFailed(local_id, failReason, options);
      console.log(`[NestLink Webhook] ❌ ${local_id} | Code: ${code} | Reason: ${failReason}`);
    }

    return sendJson(res, 200, { received: true });

  } catch (err) {
    console.error("[NestLink Webhook] CRITICAL ERROR:", err);
    // Always 200 to NestLink to prevent retry loops
    return sendJson(res, 200, { received: true, error: err.message });
  }
};
