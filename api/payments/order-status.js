// ─────────────────────────────────────────────────────────────────
//  WeberTech — api/payments/order-status.js
//  GET /api/payments/order-status?orderId=WT-...
// ─────────────────────────────────────────────────────────────────

import { getDb } from "../_lib/firebaseAdmin.js";

const sendJson = (res, status, data) => {
  res.setHeader("Content-Type", "application/json");
  res.status(status).json(data);
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();

  try {
    const db = getDb();

    if (req.method !== "GET") {
      return sendJson(res, 405, { error: "Method not allowed" });
    }

    const { orderId } = req.query;
    if (!orderId) {
      return sendJson(res, 400, { error: "orderId is required" });
    }

    const snap = await db.collection("orders").doc(orderId).get();
    if (!snap.exists) {
      return sendJson(res, 404, { error: "Order not found" });
    }

    const order = snap.data();
    return sendJson(res, 200, {
      orderId,
      status: order.status,
      paymentMethod: order.paymentMethod,
      amount: order.amount,
      productTitle: order.productTitle,
      type: order.type,
      failReason: order.failReason || null,
    });

  } catch (err) {
    console.error("[WeberPay] Order Status Error:", err);
    return sendJson(res, 500, { 
      error: "Failed to fetch order status",
      details: err.message 
    });
  }
};
