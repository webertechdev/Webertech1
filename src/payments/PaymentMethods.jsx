// src/payments/PaymentMethods.jsx
// Customer picks how they want to pay. Safaricom-direct stays
// "Coming Soon" here — the existing Daraja flow in api/stkpush.js
// / api/callback.js is untouched and remains dedicated to Bundles.

const METHODS = [
  {
    id: "nestlink",
    label: "NestLink",
    desc: "M-PESA STK push to your phone",
    emoji: "📲",
    available: true,
  },
  {
    id: "intasend",
    label: "IntaSend",
    desc: "M-PESA or Card — choose on next screen",
    emoji: "💳",
    available: true,
  },
  {
    id: "safaricom",
    label: "Safaricom M-PESA",
    desc: "Direct Daraja checkout",
    emoji: "🟢",
    available: false,
  },
];

export default function PaymentMethods({ selected, onSelect }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {METHODS.map((m) => {
        const isSelected = selected === m.id;
        return (
          <button
            key={m.id}
            type="button"
            disabled={!m.available}
            onClick={() => m.available && onSelect(m.id)}
            style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "13px 16px", borderRadius: 12,
              border: isSelected ? "2px solid #16a34a" : "1.5px solid #e5e7eb",
              background: isSelected ? "#f0fdf4" : m.available ? "#fff" : "#f9fafb",
              cursor: m.available ? "pointer" : "not-allowed",
              opacity: m.available ? 1 : 0.55,
              textAlign: "left", fontFamily: "inherit", width: "100%",
            }}
          >
            <span style={{ fontSize: 22 }}>{m.emoji}</span>
            <span style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14.5, color: "#111827" }}>
                {m.label} {!m.available && <span style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginLeft: 6 }}>COMING SOON</span>}
              </div>
              <div style={{ fontSize: 12.5, color: "#6b7280" }}>{m.desc}</div>
            </span>
            {isSelected && <span style={{ color: "#16a34a", fontWeight: 900 }}>✓</span>}
          </button>
        );
      })}
    </div>
  );
}
