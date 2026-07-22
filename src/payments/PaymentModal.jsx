// src/payments/PaymentModal.jsx
// The ONE component every product/service page needs:
//
//   import PaymentModal from "../../payments/PaymentModal";
//   <PaymentModal
//     open={open}
//     onClose={() => setOpen(false)}
//     product={{ id, slug, title, price, type: "document" }}
//     customer={{ uid, name, email }}   // optional, from your auth state
//   />

import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Checkout from "./Checkout";
import PaymentStatus from "./PaymentStatus";
import { usePayment } from "./hooks/usePayment";

export default function PaymentModal({ open, onClose, product, customer }) {
  const { state, pay, reset } = usePayment();

  useEffect(() => {
    if (!open) reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  const submitting = state.step === "starting" || state.step === "awaiting";

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(15,23,42,0.55)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 9999, padding: 16,
      }}
    >
      <Toaster position="top-center" />
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: 18, padding: "26px 24px",
          width: "100%", maxWidth: 420, maxHeight: "90vh", overflowY: "auto",
          boxShadow: "0 30px 70px rgba(0,0,0,0.3)", position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 14, right: 14, width: 30, height: 30,
            borderRadius: "50%", border: "none", background: "#f3f4f6",
            cursor: "pointer", fontSize: 16, color: "#6b7280",
          }}
        >
          ✕
        </button>

        <h2 style={{ fontWeight: 900, fontSize: 19, marginBottom: 18, paddingRight: 24 }}>
          {state.step === "idle" ? "Checkout" : "WeberPay"}
        </h2>

        {state.step === "idle" ? (
          <Checkout
            product={product}
            submitting={submitting}
            onPay={(details) => pay({ ...details, product, customer })}
          />
        ) : (
          <PaymentStatus
            step={state.step}
            method={state.method}
            message={state.message}
            checkoutUrl={state.checkoutUrl}
            product={product}
            onRetry={reset}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}
