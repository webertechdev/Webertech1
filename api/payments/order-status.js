// ─────────────────────────────────────────────────────────────────
//  WeberTech — api/payments/order-status.js
//  GET /api/payments/order-status?orderId=WT-...
//  Provider-agnostic: works for NestLink, IntaSend, and (later)
//  Safaricom-direct orders, because every webhook writes to the
//  same "orders" collection shape.
// ─────────────────────────────────────────────────────────────────
const { db } = require("../_lib/firebaseAdmin");

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const { orderId } = req.query;
  if (!orderId) return res.status(400).json({ error: "orderId is required" });

  try {
    const snap = await db.collection("orders").doc(orderId).get();
    if (!snap.exists) return res.status(404).json({ error: "Order not found" });

    const order = snap.data();
    return res.status(200).json({
      orderId,
      status: order.status,
      paymentMethod: order.paymentMethod,
      amount: order.amount,
      productTitle: order.productTitle,
      type: order.type,
      failReason: order.failReason || null,
    });
  } catch (err) {
    console.error("order-status error:", err);
    return res.status(500).json({ error: "Failed to fetch order status" });
  }
};
