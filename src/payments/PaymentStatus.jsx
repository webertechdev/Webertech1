// src/payments/PaymentStatus.jsx
export default function PaymentStatus({
  step,
  method,
  message,
  checkoutUrl,
  product,
  checking,
  timedOut,
  onRefresh,
  onRetry,
  onClose,
}) {
  if (step === "starting") {
    return (
      <Centered>
        <Spinner />
        <h3 style={h3}>Starting payment…</h3>
        <p style={p}>Connecting to WeberPay securely. Please wait.</p>
      </Centered>
    );
  }

  if (step === "awaiting" && method === "intasend" && checkoutUrl) {
    return (
      <Centered>
        <div style={{ fontSize: 40, marginBottom: 10 }}>💳</div>
        <h3 style={h3}>Complete your payment</h3>
        <p style={p}>Open IntaSend’s secure checkout and choose M-PESA or card.</p>
        <a
          href={checkoutUrl}
          target="_blank"
          rel="noreferrer"
          style={primaryBtn}
        >
          Open Secure Checkout →
        </a>
        <StatusActions checking={checking} timedOut={timedOut} onRefresh={onRefresh} />
        <p style={{ ...p, marginTop: 10, fontSize: 12.5 }}>{message}</p>
      </Centered>
    );
  }

  if (step === "awaiting") {
    return (
      <Centered>
        <div style={{ fontSize: 42, marginBottom: 10 }}>📲</div>
        <h3 style={h3}>Check your phone</h3>
        <p style={p}>
          We have sent an <strong>M-PESA STK prompt</strong> to your phone for <strong>{product?.title}</strong>.
        </p>
        <div style={instructionBox}>
          <strong style={{ color: "#166534" }}>What to do now</strong>
          <ol style={{ textAlign: "left", margin: "8px 0 0", paddingLeft: 20, color: "#166534", fontSize: 13, lineHeight: 1.7 }}>
            <li>Unlock your phone and open the M-PESA prompt.</li>
            <li>Confirm the amount and enter your M-PESA PIN.</li>
            <li>Keep this window open, then tap Check payment status.</li>
          </ol>
        </div>
        <StatusActions checking={checking} timedOut={timedOut} onRefresh={onRefresh} />
        <p style={{ ...p, marginTop: 10, fontSize: 12.5 }}>{message}</p>
        <button onClick={onRetry} style={secondaryBtn}>Use a different number</button>
      </Centered>
    );
  }

  if (step === "paid") {
    return (
      <Centered>
        <div style={{ fontSize: 46, marginBottom: 10 }}>🎉</div>
        <h3 style={h3}>Payment successful!</h3>
        <p style={p}>{product?.title} is unlocked. Check your dashboard for the download.</p>
        <button onClick={onClose} style={primaryBtn}>Done</button>
      </Centered>
    );
  }

  if (step === "failed") {
    return (
      <Centered>
        <div style={{ fontSize: 46, marginBottom: 10 }}>⚠️</div>
        <h3 style={h3}>Payment didn’t go through</h3>
        <p style={p}>{message || "Something went wrong. Please try again."}</p>
        <button onClick={onRetry} style={primaryBtn}>Try Again</button>
      </Centered>
    );
  }

  return null;
}

function StatusActions({ checking, timedOut, onRefresh }) {
  return (
    <div style={{ marginTop: 16 }}>
      <button onClick={onRefresh} disabled={checking} style={{ ...primaryBtn, opacity: checking ? 0.65 : 1 }}>
        {checking ? "Checking payment…" : "Check payment status"}
      </button>
      <p style={{ ...p, marginTop: 8, fontSize: 11.5 }}>
        {timedOut
          ? "The automatic check window ended. You can safely check again after completing the prompt."
          : "WeberPay will check briefly in the background, and you can also check manually."}
      </p>
    </div>
  );
}

const h3 = { fontWeight: 800, fontSize: 18, margin: "0 0 8px" };
const p = { color: "#6b7280", fontSize: 13.5, lineHeight: 1.6, maxWidth: 320, margin: "0 auto" };
const primaryBtn = {
  display: "inline-block",
  marginTop: 14,
  padding: "12px 24px",
  background: "#16a34a",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  fontWeight: 800,
  fontSize: 14.5,
  textDecoration: "none",
  cursor: "pointer",
  fontFamily: "inherit",
};
const secondaryBtn = {
  marginTop: 12,
  padding: "9px 16px",
  background: "#fff",
  color: "#166534",
  border: "1px solid #bbf7d0",
  borderRadius: 9,
  fontWeight: 700,
  fontSize: 12.5,
  cursor: "pointer",
  fontFamily: "inherit",
};
const instructionBox = {
  width: "100%",
  boxSizing: "border-box",
  marginTop: 16,
  padding: "12px 14px",
  borderRadius: 10,
  background: "#f0fdf4",
  border: "1px solid #bbf7d0",
  textAlign: "left",
};

function Centered({ children }) {
  return <div style={{ textAlign: "center", padding: "20px 10px" }}>{children}</div>;
}

function Spinner({ small }) {
  const size = small ? 20 : 36;
  return (
    <>
      <div style={{
        width: size,
        height: size,
        border: "3px solid #e5e7eb",
        borderTopColor: "#16a34a",
        borderRadius: "50%",
        margin: small ? "10px auto 0" : "0 auto 14px",
        animation: "wtpspin .8s linear infinite",
      }} />
      <style>{`@keyframes wtpspin{to{transform:rotate(360deg)}}`}</style>
    </>
  );
}
