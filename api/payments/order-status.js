// ─────────────────────────────────────────────────────────────────
//  WeberTech — api/payments/order-status.js
//  GET /api/payments/order-status?orderId=WT-...
// ─────────────────────────────────────────────────────────────────

import { getDb } from "../_lib/firebaseAdmin.js";
import { markOrderPaid, markOrderFailed, markOrderCancelled } from "../_lib/orders.js";

const sendJson = (res, status, data) => {
  res.setHeader("Content-Type", "application/json");
  res.status(status).json(data);
};

function codeOf(payload = {}) {
  return payload.result_code ?? payload.resultCode ?? payload.result?.result_code ?? payload.data?.result?.result_code ?? null;
}

function friendlyMessage(code, fallback = "Payment could not be completed.") {
  const normalized = String(code ?? "").toUpperCase();
  if (normalized === "1") return "Payment was declined because the M-PESA account has insufficient balance.";
  if (normalized === "1032") return "Payment was cancelled on the phone. No charge was completed.";
  if (normalized === "1037") return "M-PESA did not respond in time. You can try the payment again.";
  if (normalized === "2001") return "The M-PESA PIN was incorrect. Please try again with the correct PIN.";
  if (normalized === "GV50113") return "The payment details could not be verified. Please check the phone number and try again.";
  return fallback;
}

function statusFromOrder(order = {}) {
  const status = String(order.status || "pending").toLowerCase();
  if (status === "paid" || status === "completed" || status === "complete") return "paid";
  if (status === "cancelled" || status === "canceled") return "cancelled";
  if (status === "failed" || status === "declined") return "failed";
  return "pending";
}

async function readJson(response) {
  const text = await response.text();
  try { return text ? JSON.parse(text) : {}; } catch { return {}; }
}

async function reconcileNestLink(order, orderId) {
  const providerRef = order.providerRef || {};
  const ldId = providerRef.ld_id || providerRef.ldId;
  if (!ldId || !process.env.NESTLINK_API_KEY) return null;

  const baseUrl = process.env.NESTLINK_BASE_URL || "https://api.nestlink.co.ke";
  const url = new URL(`${baseUrl.replace(/\/$/, "")}/paymentStatus`);
  url.searchParams.set("ld_id", ldId);
  url.searchParams.set("local_id", orderId);

  const response = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json", "Api-Secret": process.env.NESTLINK_API_KEY },
  });
  const payload = await readJson(response);
  if (!response.ok) {
    const error = new Error(payload.msg || payload.error || "NestLink status could not be checked.");
    error.statusCode = response.status;
    throw error;
  }

  const data = payload.data || {};
  const result = data.result || payload.result || {};
  const code = codeOf(payload);
  const paid = data.paid === true || payload.paid === true || String(data.paid).toLowerCase() === "true" || String(payload.paid).toLowerCase() === "true";
  const resultCode = Number(code);
  const hasNumericCode = Number.isFinite(resultCode);
  const codeText = String(code ?? "").toUpperCase();
  const terminalProviderFailure = (hasNumericCode && resultCode !== 0) || codeText === "GV50113";
  const ref = result.mpesa_ref || result.ref_code || result.mpesaRef || "";

  if (paid && (!hasNumericCode || resultCode === 0)) {
    await markOrderPaid(orderId, { mpesaRef: ref, rawPayload: payload, method: "nestlink" });
    return { status: "paid", message: "Payment confirmed successfully.", mpesaRef: ref, resultCode: 0 };
  }

  if (terminalProviderFailure) {
    const message = friendlyMessage(codeText, result.msg || payload.msg || "Payment was declined by M-PESA.");
    if (codeText === "1032") await markOrderCancelled(orderId, message, { resultCode: codeText });
    else await markOrderFailed(orderId, message, { resultCode: codeText });
    return { status: codeText === "1032" ? "cancelled" : "failed", message, failReason: message, resultCode: codeText };
  }

  return { status: "pending", message: "M-PESA prompt is still awaiting confirmation. Please complete it on your phone." };
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();

  try {
    const db = getDb();
    if (req.method !== "GET") return sendJson(res, 405, { error: "Method not allowed" });

    const { orderId } = req.query;
    if (!orderId) return sendJson(res, 400, { error: "orderId is required" });

    const snap = await db.collection("orders").doc(orderId).get();
    if (!snap.exists) return sendJson(res, 404, { error: "Order not found" });

    const order = snap.data();
    const existingStatus = statusFromOrder(order);
    if (existingStatus !== "pending") {
      const message = order.failReason || (existingStatus === "paid" ? "Payment confirmed successfully." : "Payment was not completed.");
      return sendJson(res, 200, {
        orderId,
        status: existingStatus,
        paymentMethod: order.paymentMethod,
        amount: order.amount,
        productTitle: order.productTitle,
        type: order.type,
        failReason: existingStatus === "paid" ? null : message,
        message,
        resultCode: order.resultCode ?? null,
        mpesaRef: order.mpesaRef || "",
      });
    }

    let reconciled = null;
    if (order.paymentMethod === "nestlink") {
      try { reconciled = await reconcileNestLink(order, orderId); }
      catch (error) {
        // Keep the order pending during a temporary provider/network error.
        return sendJson(res, 200, {
          orderId,
          status: "pending",
          paymentMethod: order.paymentMethod,
          amount: order.amount,
          productTitle: order.productTitle,
          type: order.type,
          message: "We are still checking M-PESA confirmation. Please keep the prompt open or try again shortly.",
          providerError: error.message,
        });
      }
    }

    return sendJson(res, 200, {
      orderId,
      status: reconciled?.status || "pending",
      paymentMethod: order.paymentMethod,
      amount: order.amount,
      productTitle: order.productTitle,
      type: order.type,
      failReason: reconciled?.failReason || null,
      message: reconciled?.message || "M-PESA prompt is still awaiting confirmation. Please complete it on your phone.",
      resultCode: reconciled?.resultCode ?? null,
      mpesaRef: reconciled?.mpesaRef || "",
    });
  } catch (err) {
    console.error("[WeberPay] Order Status Error:", err);
    return sendJson(res, 500, { error: "Failed to fetch payment status" });
  }
};

export { friendlyMessage };
