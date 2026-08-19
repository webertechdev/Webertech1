// src/payments/services/intasend.js
// Talks only to our own /api/payments/* endpoints — provider secrets
// never reach the browser.

export async function startIntaSendPayment({ amount, email, phone, firstName, lastName, product, customer }) {
  const res = await fetch("/api/payments/intasend-checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
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

  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error("The IntaSend server returned an invalid response. Please try again.");
  }

  if (!res.ok) throw new Error(data.error || "IntaSend checkout failed to start");
  return data;
}
