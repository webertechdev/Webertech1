// src/payments/Checkout.jsx
import { useState } from "react";
import { toast } from "react-hot-toast";
import PaymentMethods from "./PaymentMethods";

const inp = {
  width: "100%", padding: "11px 14px", border: "1.5px solid #e5e7eb",
  borderRadius: 10, fontSize: 14.5, outline: "none", fontFamily: "inherit",
  boxSizing: "border-box",
};

export default function Checkout({ product, onPay, submitting }) {
  const [method, setMethod] = useState(null);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const isValidPhone = (p) => /^(\+254|254|0)?7\d{8}$/.test(p.replace(/\s+/g, ""));

  const handleSubmit = () => {
    if (!method) return toast.error("Choose a payment method");
    if (method === "nestlink" && !isValidPhone(phone)) return toast.error("Enter a valid M-PESA number");
    if (method === "intasend" && !email.includes("@")) return toast.error("Enter a valid email");
    onPay({ method, phone, email, firstName, lastName });
  };

  return (
    <div>
      <div style={{
        background: "#f9fafb", borderRadius: 12, padding: "14px 16px", marginBottom: 18,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div>
          <div style={{ fontSize: 13, color: "#6b7280" }}>You're buying</div>
          <div style={{ fontWeight: 800, fontSize: 15.5, color: "#111827" }}>{product.title}</div>
        </div>
        <div style={{ fontWeight: 900, fontSize: 20, color: "#16a34a" }}>
          KES {product.price?.toLocaleString()}
        </div>
      </div>

      <div style={{ fontWeight: 700, fontSize: 13.5, color: "#374151", marginBottom: 10 }}>
        Choose payment method
      </div>
      <PaymentMethods selected={method} onSelect={setMethod} />

      {method === "nestlink" && (
        <div style={{ marginTop: 16 }}>
          <label style={{ fontSize: 12.5, fontWeight: 600, color: "#6b7280" }}>M-PESA Phone Number</label>
          <input style={{ ...inp, marginTop: 6 }} type="tel" placeholder="07XX XXX XXX"
            value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
      )}

      {method === "intasend" && (
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
          <div>
            <label style={{ fontSize: 12.5, fontWeight: 600, color: "#6b7280" }}>Email Address</label>
            <input style={{ ...inp, marginTop: 6 }} type="email" placeholder="you@example.com"
              value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <input style={inp} type="text" placeholder="First Name"
              value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input style={inp} type="text" placeholder="Last Name"
              value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: 12.5, fontWeight: 600, color: "#6b7280" }}>Phone (optional, for M-PESA)</label>
            <input style={{ ...inp, marginTop: 6 }} type="tel" placeholder="07XX XXX XXX"
              value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={submitting || !method}
        style={{
          width: "100%", marginTop: 20, padding: "14px 0",
          background: submitting || !method ? "#9ca3af" : "#16a34a",
          color: "#fff", border: "none", borderRadius: 12,
          fontWeight: 800, fontSize: 15.5, cursor: submitting || !method ? "not-allowed" : "pointer",
          fontFamily: "inherit",
        }}
      >
        {submitting ? "Processing…" : `Pay KES ${product.price?.toLocaleString()}`}
      </button>
      <p style={{ textAlign: "center", fontSize: 11.5, color: "#9ca3af", marginTop: 10 }}>
        Secured checkout · Powered by WeberPay
      </p>
    </div>
  );
}
