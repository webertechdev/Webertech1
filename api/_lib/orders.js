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

export function isDocumentOrderType(value) {
  return ["document", "legal-document", "service-document"].includes(String(value || "").toLowerCase());
}

function normalizeOrderType(value) {
  return isDocumentOrderType(value) ? "document" : (value || "document");
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
    type: normalizeOrderType(type),
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

async function writePaymentLedger(db, order, { status, mpesaRef = "", resultCode = null, failReason = "" } = {}) {
  if (!order?.orderId) return;
  const record = {
    orderId: order.orderId,
    customerId: order.customerId || null,
    customerName: order.customerName || "",
    customerEmail: order.customerEmail || "",
    customerPhone: order.customerPhone || "",
    productId: order.productId || "",
    productSlug: order.productSlug || "",
    productTitle: order.productTitle || "",
    type: order.type || "",
    method: order.paymentMethod || "",
    status,
    amount: amountAsNumber(order.amount),
    currency: order.currency || "KES",
    mpesaRef,
    resultCode,
    failReason,
    updatedAt: serverTimestamp(),
  };

  // Keep both ledgers synchronized. `payments` is the canonical current flow;
  // `transactions` preserves compatibility with the legacy dashboard/data.
  await db.collection("payments").doc(order.orderId).set({ ...record, createdAt: order.createdAt || serverTimestamp() }, { merge: true });
  await db.collection("transactions").doc(order.orderId).set({ ...record, transactionId: order.orderId, createdAt: order.createdAt || serverTimestamp() }, { merge: true });
}

async function writeCheckoutExperienceRecords(db, order, { status, failReason = "", resultCode = null } = {}) {
  if (!order?.orderId) return;
  const normalizedStatus = String(status || "pending").toLowerCase();
  const title = order.productTitle || order.productSlug || "WeberTech service";
  const customerName = order.customerName || "there";
  const isPaid = normalizedStatus === "paid";
  const outcomeLabel = isPaid ? "Purchase confirmed" : normalizedStatus === "cancelled" ? "Payment cancelled" : "Payment not completed";
  const customerMessage = isPaid
    ? `Hi ${customerName}, your purchase of ${title} is confirmed. Thank you for choosing WeberTech. Your service or download is now available from your dashboard. Need help? Reach us through AI Support or online chat.`
    : normalizedStatus === "cancelled"
      ? `Hi ${customerName}, your payment for ${title} was cancelled and no charge was completed. You can try again whenever you are ready, or reach us through AI Support or online chat for help.`
      : `Hi ${customerName}, your payment for ${title} could not be completed${failReason ? `: ${failReason}` : "."} You can retry safely or reach us through AI Support or online chat for help.`;
  const actionUrl = isPaid ? "/dashboard" : `/cyber/legal-documents/${order.productSlug || ""}`;
  const shared = {
    orderId: order.orderId,
    customerId: order.customerId || null,
    customerName,
    customerEmail: order.customerEmail || "",
    customerPhone: order.customerPhone || "",
    productId: order.productId || "",
    productSlug: order.productSlug || "",
    productTitle: title,
    service: title,
    outcome: normalizedStatus,
    status: "new",
    resultCode,
    failReason,
    actionUrl,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  if (order.customerId) {
    await db.collection("notifications").doc(`purchase_${order.orderId}_${normalizedStatus}`).set({
      ...shared,
      userId: order.customerId,
      type: "purchase",
      title: outcomeLabel,
      message: customerMessage,
      read: false,
      priority: isPaid ? "normal" : "high",
      timestamp: serverTimestamp(),
    }, { merge: true });
  }

  await db.collection("purchase_requests").doc(`${order.orderId}_${normalizedStatus}`).set({
    ...shared,
    requestType: "purchase_followup",
    title: outcomeLabel,
    message: `${customerMessage} Customer contact: ${order.customerEmail || "no email"} · ${order.customerPhone || "no phone"}.`,
    priority: isPaid ? "normal" : "high",
    adminUnread: true,
    source: "checkout",
  }, { merge: true });
}

export async function markOrderFailed(orderId, reason = "", options = {}) {
  const db = getDb();
  const orderRef = db.collection("orders").doc(orderId);
  const snap = await orderRef.get();
  if (!snap.exists) return null;
  const order = snap.data();
  if (["paid", "completed"].includes(String(order.status || "").toLowerCase())) return { ...order, orderId, status: "paid" };
  const failReason = reason || "Payment could not be completed.";
  await orderRef.update({
    status: "failed",
    failReason,
    resultCode: options.resultCode ?? null,
    updatedAt: serverTimestamp(),
  });
  await writePaymentLedger(db, { ...order, orderId }, { status: "failed", resultCode: options.resultCode ?? null, failReason });
  await writeCheckoutExperienceRecords(db, { ...order, orderId }, { status: "failed", resultCode: options.resultCode ?? null, failReason });
  return { ...order, orderId, status: "failed", failReason };
}

export async function markOrderCancelled(orderId, reason = "Payment was cancelled.", options = {}) {
  const db = getDb();
  const orderRef = db.collection("orders").doc(orderId);
  const snap = await orderRef.get();
  if (!snap.exists) return null;
  const order = snap.data();
  if (["paid", "completed"].includes(String(order.status || "").toLowerCase())) return { ...order, orderId, status: "paid" };
  await orderRef.update({
    status: "cancelled",
    failReason: reason,
    resultCode: options.resultCode ?? 1032,
    updatedAt: serverTimestamp(),
  });
  await writePaymentLedger(db, { ...order, orderId }, { status: "cancelled", resultCode: options.resultCode ?? 1032, failReason: reason });
  await writeCheckoutExperienceRecords(db, { ...order, orderId }, { status: "cancelled", resultCode: options.resultCode ?? 1032, failReason: reason });
  return { ...order, orderId, status: "cancelled", failReason: reason };
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

  if (["paid", "completed", "complete"].includes(String(order.status || "").toLowerCase())) {
    // Backfill both dashboard ledgers without repeating fulfillment or referrals.
    const confirmedRef = mpesaRef || order.mpesaRef || "";
    if (confirmedRef && confirmedRef !== order.mpesaRef) {
      await orderRef.update({ mpesaRef: confirmedRef, updatedAt: serverTimestamp() });
    }
    await writePaymentLedger(db, { ...order, orderId, paymentMethod: method || order.paymentMethod, mpesaRef: confirmedRef }, { status: "paid", mpesaRef: confirmedRef });
    await writeCheckoutExperienceRecords(db, { ...order, orderId, mpesaRef: confirmedRef }, { status: "paid" });
    return { ...order, orderId, status: "paid", mpesaRef: confirmedRef };
  }

  await orderRef.update({
    status: "paid",
    mpesaRef,
    updatedAt: serverTimestamp(),
  });

  await writePaymentLedger(db, { ...order, paymentMethod: method || order.paymentMethod }, { status: "paid", mpesaRef });
  await db.collection("payments").doc(orderId).set({ rawPayload }, { merge: true });
  await writeCheckoutExperienceRecords(db, { ...order, mpesaRef }, { status: "paid" });

  // Product delivery / fulfillment branch
  if (isDocumentOrderType(order.type)) {
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
