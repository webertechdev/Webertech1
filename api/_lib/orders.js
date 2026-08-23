// ─────────────────────────────────────────────────────────────────
//  WeberTech — api/_lib/orders.js
//  Provider-agnostic order helpers for WeberPay Core.
//  Every payment method (NestLink, IntaSend, future Safaricom-direct)
//  creates/updates orders through these same functions so the shape
//  in Firestore never diverges between providers.
// ─────────────────────────────────────────────────────────────────
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { getDb } from "./firebaseAdmin.js";

// WT-<epoch>-<6 random alnum> — used as BOTH the Firestore doc id
// and the provider's local_id / api_ref, so a webhook can look the
// order up directly with zero extra query.
export function generateOrderId() {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `WT-${Date.now()}-${rand}`;
}

function serverTimestamp() {
  return FieldValue.serverTimestamp();
}

function amountAsNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

async function creditReferralCommission(db, order) {
  const buyerId = order.customerId;
  const amount = amountAsNumber(order.amount);
  if (!buyerId || !amount) return null;

  const userSnap = await db.collection("users").doc(buyerId).get();
  if (!userSnap.exists) return null;
  const user = userSnap.data() || {};
  const referrerId = user.referredById || user.referrerId || null;
  if (!referrerId || referrerId === buyerId) return null;

  const commissionAmount = Math.round(amount * 0.10 * 100) / 100;
  if (!commissionAmount) return null;

  const earningRef = db.collection("referralEarnings").doc(`${order.orderId}_${buyerId}`);
  try {
    await earningRef.create({
      orderId: order.orderId,
      referrerId,
      referredUserId: buyerId,
      orderAmount: amount,
      commissionRate: 0.10,
      commissionAmount,
      currency: order.currency || "KES",
      status: "credited",
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    // The deterministic ID makes repeated webhook delivery safe.
    if (error?.code === 6 || error?.code === "already-exists") return null;
    throw error;
  }

  await db.collection("referrals").doc(referrerId).set({
    userId: referrerId,
    totalEarnings: FieldValue.increment(commissionAmount),
    updatedAt: serverTimestamp(),
  }, { merge: true });

  return { referrerId, commissionAmount };
}

export async function createPendingOrder({
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
  const db = getDb();
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
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return orderRef;
}

export async function attachProviderRef(orderId, providerRef) {
  const db = getDb();
  await db.collection("orders").doc(orderId).update({
    providerRef,
    updatedAt: serverTimestamp(),
  });
}

export async function markOrderFailed(orderId, reason = "") {
  const db = getDb();
  await db.collection("orders").doc(orderId).update({
    status: "failed",
    failReason: reason,
    updatedAt: serverTimestamp(),
  });
}

// Called only from webhooks (provider-confirmed payment). Idempotent —
// safe to call more than once for the same orderId (e.g. manual
// "triggerWebhook" resend from NestLink).
export async function markOrderPaid(orderId, { mpesaRef = "", rawPayload = {}, method } = {}) {
  const db = getDb();
  const orderRef = db.collection("orders").doc(orderId);
  const snap = await orderRef.get();
  if (!snap.exists) return null;
  const order = snap.data();

  if (order.status === "paid") return order; // already processed, no duplicate side-effects

  await orderRef.update({
    status: "paid",
    mpesaRef,
    updatedAt: serverTimestamp(),
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
    createdAt: serverTimestamp(),
  });

  // Product delivery / fulfillment branch
  if (order.type === "document") {
    await db.collection("downloads").add({
      orderId,
      customerId: order.customerId,
      productId: order.productId,
      productSlug: order.productSlug,
      downloadCount: 0,
      expiresAt: Timestamp.fromDate(
        new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // 30-day link validity
      ),
      createdAt: serverTimestamp(),
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
      createdAt: serverTimestamp(),
    });
  }

  try {
    await creditReferralCommission(db, order);
  } catch (error) {
    // Referral accounting must not block confirmed payment fulfillment.
    console.warn("Referral commission could not be credited:", error?.message || error);
  }

  return { ...order, status: "paid" };
}
