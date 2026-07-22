// src/payments/services/nestlink.js
// Talks only to our own /api/payments/* endpoints — never to
// api.nestlink.co.ke directly, so the Api-Secret key never reaches
// the browser.

export async function startNestLinkPayment({ phone, amount, product, customer }) {
  const res = await fetch("/api/payments/nestlink-run-prompt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      phone,
      amount,
      productId: product.id,
      productSlug: product.slug,
      productTitle: product.title,
      type: product.type,
      customerId: customer?.uid || null,
      customerName: customer?.name || "",
      customerEmail: customer?.email || "",
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "NestLink payment failed to start");
  return data; // { success, orderId, message }
}
