// ─────────────────────────────────────────────────────────────────
//  WeberTech — api/_lib/orders.js
//  Provider-agnostic order helpers for WeberPay Core.
//  Every payment method (NestLink, IntaSend, future Safaricom-direct)
//  creates/updates orders through these same functions so the shape
//  in Firestore never diverges between providers.
// ─────────────────────────────────────────────────────────────────
const { admin, db } = require("./firebaseAdmin");

// WT-<epoch>-<6 random alnum> — used as BOTH the Firestore doc id
// and the provider's local_id / api_ref, so a webhook can look the
// order up directly with zero extra query.
function generateOrderId() {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `WT-${Date.now()}-${rand}`;
}

async function createPendingOrder({
  orderId,
  customerId = null,
  customerName = "",
  customerEmail = "",
  customerPhone = "",
  productId,
  productSlug = "",
  productTitle,
  type = "document", // "document" | "service" | "electronics" | "course" | "bundle" | "hosting" | "domain"
  amount,
  currency = "KES",
  paymentMethod, // "nestlink" | "intasend" | "safaricom"
}) {
  const orderRef = db.collection("orders").doc(orderId);
  await orderRef.set({
    orderId,
    customerId,
    customerName,
    customerEmail,
    customerPhone,
    productId,
    productSlug,
    productTitle,
    type,
    amount,
    currency,
    paymentMethod,
    status: "pending", // pending | paid | failed | cancelled
    providerRef: {},
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  return orderRef;
}

async function attachProviderRef(orderId, providerRef) {
  await db.collection("orders").doc(orderId).update({
    providerRef,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
}

async function markOrderFailed(orderId, reason = "") {
  await db.collection("orders").doc(orderId).update({
    status: "failed",
    failReason: reason,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
}

// Called only from webhooks (provider-confirmed payment). Idempotent —
// safe to call more than once for the same orderId (e.g. manual
// "triggerWebhook" resend from NestLink).
async function markOrderPaid(orderId, { mpesaRef = "", rawPayload = {}, method } = {}) {
  const orderRef = db.collection("orders").doc(orderId);
  const snap = await orderRef.get();
  if (!snap.exists) return null;
  const order = snap.data();

  if (order.status === "paid") return order; // already processed, no duplicate side-effects

  await orderRef.update({
    status: "paid",
    mpesaRef,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  await db.collection("payments").add({
    orderId,
    method: method || order.paymentMethod,
    status: "paid",
    amount: order.amount,
    currency: order.currency,
    phone: order.customerPhone,
    mpesaRef,
    rawPayload,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  // Product delivery / fulfillment branch
  if (order.type === "document") {
    await db.collection("downloads").add({
      orderId,
      customerId: order.customerId,
      productId: order.productId,
      productSlug: order.productSlug,
      downloadCount: 0,
      expiresAt: admin.firestore.Timestamp.fromDate(
        new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // 30-day link validity
      ),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  } else if (order.type === "service") {
    await db.collection("services").add({
      orderId,
      customerId: order.customerId,
      productId: order.productId,
      productSlug: order.productSlug,
      status: "new", // new -> assigned -> in_progress -> completed
      assignedStaff: null,
      notes: "",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  return { ...order, status: "paid" };
}

module.exports = {
  generateOrderId,
  createPendingOrder,
  attachProviderRef,
  markOrderFailed,
  markOrderPaid,
};
