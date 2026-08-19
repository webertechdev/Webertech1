// src/payments/services/orderStatus.js
// Payment-specific status checks for WeberPay.
// The rest of the platform uses manual refreshes; payment status is the
// one intentional bounded retry loop because NestLink confirms payment
// asynchronously through its webhook.

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
export function pollOrderStatus(orderId, onUpdate, intervalMs = 4000) {
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
      onUpdate(data);

      if (data.status === "pending" && attempts < maxAttempts) {
        schedule();
      } else if (data.status === "pending" && attempts >= maxAttempts) {
        onUpdate({
          ...data,
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
