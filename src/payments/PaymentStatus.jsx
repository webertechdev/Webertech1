// src/payments/PaymentStatus.jsx
export default function PaymentStatus({ step, method, message, checkoutUrl, product, onRetry, onClose }) {
  if (step === "starting") {
    return (
      <Centered>
        <Spinner />
        <h3 style={h3}>Starting payment…</h3>
        <p style={p}>Setting things up, one moment.</p>
      </Centered>
    );
  }

  if (step === "awaiting" && method === "intasend" && checkoutUrl) {
    return (
      <Centered>
        <div style={{ fontSize: 40, marginBottom: 10 }}>💳</div>
        <h3 style={h3}>Complete your payment</h3>
        <p style={p}>We'll open IntaSend's secure page where you can pay by M-PESA or card.</p>
        <a
          href={checkoutUrl} target="_blank" rel="noreferrer"
          style={{
            display: "inline-block", marginTop: 14, padding: "12px 24px",
            background: "#16a34a", color: "#fff", borderRadius: 10,
            fontWeight: 800, fontSize: 14.5, textDecoration: "none",
          }}
        >
          Open Secure Checkout →
        </a>
        <p style={{ ...p, marginTop: 16, fontSize: 12.5 }}>Waiting for payment confirmation…</p>
        <Spinner small />
      </Centered>
    );
  }

  if (step === "awaiting") {
    return (
      <Centered>
        <Spinner />
        <h3 style={h3}>Check your phone</h3>
        <p style={p}>Enter your M-PESA PIN on the prompt to complete payment for <strong>{product?.title}</strong>.</p>
      </Centered>
    );
  }

  if (step === "paid") {
    return (
      <Centered>
        <div style={{ fontSize: 46, marginBottom: 10 }}>🎉</div>
        <h3 style={h3}>Payment successful!</h3>
        <p style={p}>{product?.title} is unlocked. Check your dashboard for the download / order status.</p>
        <button onClick={onClose} style={btn}>Done</button>
      </Centered>
    );
  }

  if (step === "failed") {
    return (
      <Centered>
        <div style={{ fontSize: 46, marginBottom: 10 }}>⚠️</div>
        <h3 style={h3}>Payment didn't go through</h3>
        <p style={p}>{message || "Something went wrong. Please try again."}</p>
        <button onClick={onRetry} style={btn}>Try Again</button>
      </Centered>
    );
  }

  return null;
}

const h3 = { fontWeight: 800, fontSize: 18, margin: "0 0 8px" };
const p = { color: "#6b7280", fontSize: 13.5, lineHeight: 1.6, maxWidth: 320, margin: "0 auto" };
const btn = {
  marginTop: 16, padding: "11px 24px", background: "#16a34a", color: "#fff",
  border: "none", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit",
};

function Centered({ children }) {
  return <div style={{ textAlign: "center", padding: "20px 10px" }}>{children}</div>;
}

function Spinner({ small }) {
  const size = small ? 20 : 36;
  return (
    <>
      <div style={{
        width: size, height: size, border: "3px solid #e5e7eb", borderTopColor: "#16a34a",
        borderRadius: "50%", margin: small ? "10px auto 0" : "0 auto 14px",
        animation: "wtpspin .8s linear infinite",
      }} />
      <style>{`@keyframes wtpspin{to{transform:rotate(360deg)}}`}</style>
    </>
  );
}
