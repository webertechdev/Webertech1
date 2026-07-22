// src/payments/services/intasend.js
// Talks only to our own /api/payments/* endpoints — the IntaSend
// secret key never reaches the browser. Only the publishable key
// concept applies, and even that is used server-side here for
// simplicity/consistency with the NestLink flow.

export async function startIntaSendPayment({ amount, email, phone, firstName, lastName, product, customer }) {
  const res = await fetch("/api/payments/intasend-checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount,
      email,
      phone,
      firstName,
      lastName,
      productId: product.id,
      productSlug: product.slug,
      productTitle: product.title,
      type: product.type,
      customerId: customer?.uid || null,
      customerName: customer?.name || "",
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "IntaSend checkout failed to start");
  return data; // { success, orderId, checkoutUrl }
}
