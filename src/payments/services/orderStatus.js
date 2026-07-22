// src/payments/services/orderStatus.js
// Realtime status via Firestore onSnapshot (instant, webhook-driven).
// Falls back to polling our own /api/payments/order-status endpoint
// if the realtime listener errors out (e.g. rules/network issue).

import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";

export function listenToOrder(orderId, onUpdate, onError) {
  const ref = doc(db, "orders", orderId);
  return onSnapshot(
    ref,
    (snap) => {
      if (!snap.exists()) return;
      const d = snap.data();
      onUpdate({
        status: d.status,
        paymentMethod: d.paymentMethod,
        amount: d.amount,
        productTitle: d.productTitle,
        failReason: d.failReason || null,
      });
    },
    (err) => {
      console.warn("orders onSnapshot failed, falling back to polling:", err);
      onError?.(err);
    }
  );
}

export async function fetchOrderStatusOnce(orderId) {
  const res = await fetch(`/api/payments/order-status?orderId=${encodeURIComponent(orderId)}`);
  if (!res.ok) throw new Error("Could not fetch order status");
  return res.json();
}

export function pollOrderStatus(orderId, onUpdate, intervalMs = 3000) {
  let stopped = false;
  const tick = async () => {
    if (stopped) return;
    try {
      const data = await fetchOrderStatusOnce(orderId);
      onUpdate(data);
      if (data.status === "pending") setTimeout(tick, intervalMs);
    } catch {
      setTimeout(tick, intervalMs);
    }
  };
  tick();
  return () => { stopped = true; };
}
