// src/payments/services/orderStatus.js
// Payment-specific status checks for WeberPay.
// The rest of the platform uses manual refreshes; payment status is the
// one intentional bounded retry loop because NestLink confirms payment
// asynchronously through its webhook.

export function normalizePaymentStatus(value) {
  const status = String(value || "pending").toLowerCase().replace(/[\s_-]+/g, "");
  if (["paid", "completed", "complete", "success", "successful"].includes(status)) return "paid";
  if (["cancelled", "canceled", "usercancelled"].includes(status)) return "cancelled";
  if (["failed", "fail", "declined", "rejected", "error"].includes(status)) return "failed";
  return "pending";
}

export function friendlyPaymentMessage(data = {}) {
  const code = String(data.resultCode ?? data.result_code ?? "").toUpperCase();
  if (code === "1") return "Payment was declined because the M-PESA account has insufficient balance.";
  if (code === "1032") return "Payment was cancelled on the phone. No charge was completed.";
  if (code === "1037") return "M-PESA did not respond in time. You can try the payment again.";
  if (code === "2001") return "The M-PESA PIN was incorrect. Please try again with the correct PIN.";
  if (code === "GV50113") return "The payment details could not be verified. Please check the phone number and try again.";
  return data.message || data.failReason || data.error || "Payment could not be completed.";
}

export async function fetchOrderStatusOnce(orderId) {
  if (!orderId) throw new Error("Payment order is missing");

  const res = await fetch(`/api/payments/order-status?orderId=${encodeURIComponent(orderId)}`, {
    headers: { Accept: "application/json" },
  });
  const text = await res.text();

  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error("The payment server returned an invalid response. Please try again.");
  }

  if (!res.ok) {
    throw new Error(data.error || "Could not fetch payment status");
  }

  return data;
}

/**
 * Poll only the current payment order, with a hard stop after five minutes.
 * Returns a cleanup function. The UI also exposes fetchOrderStatusOnce as a
 * manual "Check payment status" action.
 */
export function pollOrderStatus(orderId, onUpdate, intervalMs = 7000) {
  let stopped = false;
  let timer = null;
  let attempts = 0;
  const maxAttempts = 75;

  const schedule = () => {
    if (!stopped) timer = window.setTimeout(tick, intervalMs);
  };

  const tick = async () => {
    if (stopped) return;
    attempts += 1;

    try {
      const data = await fetchOrderStatusOnce(orderId);
      if (stopped) return;
      const normalized = { ...data, status: normalizePaymentStatus(data.status) };
      onUpdate(normalized);

      if (normalized.status === "pending" && attempts < maxAttempts) {
        schedule();
      } else if (normalized.status === "pending" && attempts >= maxAttempts) {
        onUpdate({
          ...normalized,
          timedOut: true,
          message: "Payment is still pending. Tap Check payment status after completing the M-PESA prompt.",
        });
      }
    } catch (error) {
      if (stopped) return;
      if (attempts < maxAttempts) {
        schedule();
      } else {
        onUpdate({
          status: "unknown",
          error: error.message || "Unable to check payment status",
          timedOut: true,
        });
      }
    }
  };

  tick();
  return () => {
    stopped = true;
    if (timer) window.clearTimeout(timer);
  };
}
