import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import {
  FaMobileAlt, FaBolt, FaLock, FaHeadset,
  FaBars, FaTimes, FaUser, FaSignOutAlt,
  FaGoogle, FaWhatsapp, FaEnvelope, FaPhone,
  FaClock, FaSearch, FaCheckCircle, FaStar,
  FaShieldAlt, FaGift
} from "react-icons/fa";

// ─── Constants ─────────────────────────────────────────────────
const WHATSAPP_NUMBER = "254722508904";
const WHATSAPP_LINK   = `https://wa.me/${WHATSAPP_NUMBER}`;

// ─── Bundle Data ───────────────────────────────────────────────
const dataBundles = [
  { size: "1GB",   time: "1hr",     price: 19   },
  { size: "1.5GB", time: "3hr",     price: 49   },
  { size: "2GB",   time: "24hr",    price: 99   },
  { size: "6GB",   time: "7 Days",  price: 349  },
  { size: "1.2GB", time: "30 Days", price: 250  },
  { size: "2.5GB", time: "30 Days", price: 300  },
  { size: "5.5GB", time: "30 Days", price: 500  },
  { size: "10GB",  time: "30 Days", price: 1000 },
];
const minutesBundles = [
  { size: "50 Mins",  time: "3hr",     price: 20  },
  { size: "100 Mins", time: "24hr",    price: 50  },
  { size: "200 Mins", time: "7 Days",  price: 100 },
  { size: "500 Mins", time: "30 Days", price: 250 },
];
const smsBundles = [
  { size: "200 SMS",  time: "24hr",    price: 9  },
  { size: "500 SMS",  time: "7 Days",  price: 20 },
  { size: "1000 SMS", time: "30 Days", price: 30 },
  { size: "2000 SMS", time: "30 Days", price: 50 },
];

// ─── Mock Transactions (keyed by M-PESA TXN code) ─────────────
const mockTransactions = {
  "RGH4K9X2L1": {
    mpesaTxn:        "RGH4K9X2L1",
    wtRef:           "WT-2026-0001",
    status:          "Completed",
    bundle:          "2GB Data",
    bundleType:      "Data",
    amount:          "KES 99",
    date:            "2026-05-12",
    time:            "10:34 AM",
    receivingNumber: "0712 345 678",
    paymentNumber:   "0722 508 904",
    firstName:       "Brian",
    lastName:        "Mwangi",
    email:           "brian@email.com",
    validity:        "24 Hours",
  },
  "QJZ7P3M8W5": {
    mpesaTxn:        "QJZ7P3M8W5",
    wtRef:           "WT-2026-0002",
    status:          "Processing",
    bundle:          "100 Mins",
    bundleType:      "Minutes",
    amount:          "KES 50",
    date:            "2026-05-11",
    time:            "03:12 PM",
    receivingNumber: "0798 765 432",
    paymentNumber:   "0798 765 432",
    firstName:       "Amina",
    lastName:        "Hassan",
    email:           "amina@email.com",
    validity:        "24 Hours",
  },
  "FNB2T6Y9C4": {
    mpesaTxn:        "FNB2T6Y9C4",
    wtRef:           "WT-2026-0003",
    status:          "Completed",
    bundle:          "500 SMS",
    bundleType:      "SMS",
    amount:          "KES 20",
    date:            "2026-05-10",
    time:            "08:55 AM",
    receivingNumber: "0700 111 222",
    paymentNumber:   "0700 111 222",
    firstName:       "John",
    lastName:        "Kamau",
    email:           "john@email.com",
    validity:        "7 Days",
  },
};

const faqs = [
  { q: "How long does it take to receive my bundle?",
    a: "Bundles are delivered instantly. You'll receive an M-PESA confirmation SMS within 10 seconds of payment." },
  { q: "What if I don't receive my bundle?",
    a: "Contact us via WhatsApp +254722508904 with your M-PESA TXN code. We resolve 99% of issues in under 5 minutes." },
  { q: "Can I buy bundles for another number?",
    a: "Yes! Select 'Buy for other number' when purchasing and enter the recipient's Safaricom number." },
  { q: "Is my payment secure?",
    a: "Absolutely. All payments go through Safaricom's official M-PESA STK Push — we never store your PIN." },
];

// ─── Global Styles ─────────────────────────────────────────────
const GlobalStyle = () => (
  <style>{`
    :root {
      --primary:       #16a34a;
      --primary-dark:  #15803d;
      --primary-light: #dcfce7;
      --text:          #111827;
      --muted:         #6b7280;
      --bg:            #f9fafb;
      --border:        #e5e7eb;
      --radius:        14px;
      --shadow:        0 4px 24px rgba(0,0,0,0.07);
      --shadow-md:     0 8px 36px rgba(0,0,0,0.13);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', system-ui, sans-serif; background: var(--bg); color: var(--text); }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulseRing {
      0%,100% { transform: scale(1);    opacity: 0.35; }
      50%      { transform: scale(1.1); opacity: 0.12; }
    }
    @keyframes confettiFall {
      0%   { transform: translateY(-10px) rotate(0deg);   opacity: 1; }
      100% { transform: translateY(70px)  rotate(360deg); opacity: 0; }
    }
    @keyframes successPop {
      0%   { transform: scale(0.75); opacity: 0; }
      70%  { transform: scale(1.04); }
      100% { transform: scale(1);    opacity: 1; }
    }
    @keyframes slideInRight {
      from { transform: translateX(110%); opacity: 0; }
      to   { transform: translateX(0);    opacity: 1; }
    }
    @keyframes slideOutRight {
      from { transform: translateX(0);    opacity: 1; }
      to   { transform: translateX(110%); opacity: 0; }
    }

    .fade-up    { animation: fadeUp 0.4s ease both; }
    .success-pop { animation: successPop 0.5s cubic-bezier(.175,.885,.32,1.275) both; }

    .card-hover { transition: transform 0.2s ease, box-shadow 0.2s ease; cursor: pointer; }
    .card-hover:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }

    .btn-primary {
      background: var(--primary); color: #fff; border: none;
      border-radius: 10px; font-weight: 700; cursor: pointer;
      transition: background 0.16s, transform 0.12s;
    }
    .btn-primary:hover:not(:disabled) { background: var(--primary-dark); transform: translateY(-1px); }
    .btn-primary:disabled { background: #9ca3af; cursor: not-allowed; }

    .btn-outline {
      background: transparent; border: 2px solid var(--primary);
      color: var(--primary); border-radius: 10px; font-weight: 700;
      cursor: pointer; transition: all 0.16s;
    }
    .btn-outline:hover { background: var(--primary); color: #fff; }

    .input-field {
      width: 100%; padding: 13px 15px;
      border: 1.5px solid var(--border); border-radius: 10px;
      font-size: 15px; outline: none; background: #fff;
      transition: border-color 0.16s, box-shadow 0.16s;
    }
    .input-field:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(22,163,74,0.12); }
    .input-field[readonly] { background: #f9fafb; color: var(--muted); }

    .badge { display: inline-block; padding: 3px 11px; border-radius: 99px; font-size: 12px; font-weight: 700; }
    .badge-green  { background: #dcfce7; color: #15803d; }
    .badge-yellow { background: #fef9c3; color: #a16207; }

    .radio-opt {
      display: flex; align-items: center; gap: 10px;
      padding: 13px 16px; border-radius: 12px; border: 2px solid var(--border);
      cursor: pointer; transition: all 0.16s; font-weight: 600; font-size: 15px;
      user-select: none;
    }
    .radio-opt.active { border-color: var(--primary); background: var(--primary-light); color: var(--primary); }
    .radio-opt input { accent-color: var(--primary); width: 17px; height: 17px; cursor: pointer; }

    .web-notif {
      position: fixed; top: 76px; right: 20px; width: 350px;
      background: #fff; border-radius: 18px;
      box-shadow: 0 16px 48px rgba(0,0,0,0.18); border: 1.5px solid var(--border);
      z-index: 200; overflow: hidden;
    }
    .web-notif.in  { animation: slideInRight 0.42s cubic-bezier(.175,.885,.32,1.275) both; }
    .web-notif.out { animation: slideOutRight 0.3s ease both; }

    .confetti { position: absolute; width: 8px; height: 8px; border-radius: 2px; animation: confettiFall 1s ease both; }

    @media (max-width: 768px) {
      .desktop-nav { display: none !important; }
      .mobile-toggle { display: block !important; }
      .web-notif { width: calc(100vw - 32px); right: 16px; }
    }
    @media (min-width: 769px) {
      .mobile-toggle { display: none !important; }
    }
  `}</style>
);

// ─── Web Notification ──────────────────────────────────────────
function WebNotification({ txn, onClose }) {
  const [out, setOut] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => { setOut(true); setTimeout(onClose, 320); }, 9000);
    return () => clearTimeout(t);
  }, [onClose]);

  const close = () => { setOut(true); setTimeout(onClose, 320); };
  const done  = txn.status === "Completed";
  const colors = ["#16a34a","#f59e0b","#3b82f6","#ec4899","#8b5cf6","#06b6d4","#f97316"];

  return (
    <div className={`web-notif ${out ? "out" : "in"}`}>
      {done && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 56, overflow: "hidden", pointerEvents: "none" }}>
          {colors.map((c, i) => (
            <div key={i} className="confetti" style={{ background: c, left: `${8 + i * 13}%`, top: 0, animationDelay: `${i * 0.07}s` }} />
          ))}
        </div>
      )}

      {/* Notif header */}
      <div style={{
        background: done ? "linear-gradient(135deg,#15803d,#16a34a)" : "linear-gradient(135deg,#d97706,#f59e0b)",
        padding: "15px 16px", display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.22)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {done ? <FaCheckCircle style={{ color: "#fff", fontSize: 17 }} /> : <FaClock style={{ color: "#fff", fontSize: 16 }} />}
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 13.5 }}>
              {done ? "🎉 Bundle Delivered!" : "⏳ Order Processing"}
            </div>
            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 11 }}>WeberTech · Just now</div>
          </div>
        </div>
        <button onClick={close} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.8)", cursor: "pointer", fontSize: 16 }}>
          <FaTimes />
        </button>
      </div>

      {/* Notif body */}
      <div style={{ padding: "16px 18px 20px" }}>
        {done ? (
          <>
            <div style={{ background: "linear-gradient(135deg,#f0fdf4,#dcfce7)", border: "1.5px solid #86efac", borderRadius: 12, padding: "13px 15px", marginBottom: 13 }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>🏆</div>
              <p style={{ fontWeight: 800, color: "#15803d", fontSize: 14.5, lineHeight: 1.4 }}>
                Congratulations, {txn.firstName}!
              </p>
              <p style={{ color: "#166534", fontSize: 13, marginTop: 5, lineHeight: 1.55 }}>
                Your <strong>{txn.bundle}</strong> bundle is now active on{" "}
                <strong>{txn.receivingNumber}</strong>. Stay connected! 🚀
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {[
                ["📦", "Bundle",       `${txn.bundle} · ${txn.validity}`],
                ["💰", "Paid",         txn.amount],
                ["📱", "Delivered To", txn.receivingNumber],
                ["💳", "Paid From",    txn.paymentNumber],
                ["🔖", "M-PESA Code",  txn.mpesaTxn],
                ["🕐", "Date & Time",  `${txn.date} · ${txn.time}`],
              ].map(([ic, lb, vl]) => (
                <div key={lb} style={{ display: "flex", gap: 7, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 13, lineHeight: 1.1 }}>{ic}</span>
                  <span style={{ fontSize: 11.5, color: "var(--muted)", minWidth: 82 }}>{lb}</span>
                  <span style={{ fontSize: 11.5, fontWeight: 700, color: "var(--text)", flex: 1 }}>{vl}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 13, padding: "9px 13px", background: "#f0fdf4", borderRadius: 9, display: "flex", alignItems: "center", gap: 7 }}>
              <FaStar style={{ color: "#f59e0b", fontSize: 13 }} />
              <span style={{ fontSize: 12, color: "#15803d", fontWeight: 600 }}>
                Thank you for choosing WeberTech! 💚
              </span>
            </div>
          </>
        ) : (
          <>
            <div style={{ background: "#fffbeb", border: "1.5px solid #fcd34d", borderRadius: 12, padding: "13px 15px", marginBottom: 11 }}>
              <p style={{ fontWeight: 700, color: "#92400e", fontSize: 14 }}>Hi {txn.firstName}, processing your order 🔄</p>
              <p style={{ color: "#78350f", fontSize: 13, marginTop: 4, lineHeight: 1.5 }}>
                <strong>{txn.bundle}</strong> for <strong>{txn.receivingNumber}</strong> is on its way.
                TXN: <strong>{txn.mpesaTxn}</strong>
              </p>
            </div>
            <p style={{ fontSize: 12, color: "var(--muted)" }}>
              If not received in 2 minutes, contact us on WhatsApp with your TXN code.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Purchase Modal ────────────────────────────────────────────
function PurchaseModal({ bundle, type, user, onClose, onConfirm }) {
  const [mode, setMode]               = useState("mine");
  const [receivingNumber, setRN]      = useState(user?.phone || "");
  const [mpesaNumber, setMPN]         = useState(user?.phone || "");

  useEffect(() => {
    if (mode === "mine") setRN(user?.phone || "");
    else setRN("");
  }, [mode, user]);

  const confirm = () => {
    const p = /^(\+254|254|0)?7\d{8}$/;
    if (!p.test(receivingNumber)) { toast.error("Enter valid receiving number: 07XXXXXXXX"); return; }
    if (!p.test(mpesaNumber))     { toast.error("Enter valid M-PESA number: 07XXXXXXXX");   return; }
    onConfirm({ receivingNumber, mpesaNumber });
  };

  const typeColor = { Data: "#16a34a", Minutes: "#2563eb", SMS: "#7c3aed" }[type] || "#16a34a";
  const typeEmoji = { Data: "📡", Minutes: "📞", SMS: "💬" }[type] || "📦";

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div className="fade-up" style={{ background: "#fff", borderRadius: 20, width: "100%", maxWidth: 440, padding: "30px 26px", position: "relative", boxShadow: "var(--shadow-md)" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "var(--muted)" }}><FaTimes /></button>

        {/* Bundle info */}
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <div style={{ width: 54, height: 54, borderRadius: 16, background: typeColor + "18", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px", fontSize: 26 }}>
            {typeEmoji}
          </div>
          <h2 style={{ fontWeight: 800, fontSize: 19 }}>Purchase {bundle.size} {type}</h2>
          <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 4 }}>
            Valid {bundle.time} · <strong style={{ color: typeColor }}>KES {bundle.price}</strong>
          </p>
        </div>

        {/* Buy for my / other */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          <div className={`radio-opt ${mode === "mine" ? "active" : ""}`} onClick={() => setMode("mine")}>
            <input type="radio" readOnly checked={mode === "mine"} />
            Buy for my number
            {user?.phone && <span style={{ fontSize: 12, marginLeft: "auto", color: "var(--muted)", fontWeight: 500 }}>{user.phone}</span>}
          </div>
          <div className={`radio-opt ${mode === "other" ? "active" : ""}`} onClick={() => setMode("other")}>
            <input type="radio" readOnly checked={mode === "other"} />
            Buy for other number
          </div>
        </div>

        {/* Receiving number */}
        <div style={{ marginBottom: 13 }}>
          <label style={{ fontSize: 12.5, fontWeight: 700, color: "var(--muted)", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.4px" }}>
            Number to receive offer
          </label>
          <input
            className="input-field"
            type="tel"
            placeholder="07XX XXX XXX"
            value={receivingNumber}
            onChange={(e) => setRN(e.target.value)}
            readOnly={mode === "mine" && !!user}
          />
        </div>

        {/* M-PESA number */}
        <div style={{ marginBottom: 22 }}>
          <label style={{ fontSize: 12.5, fontWeight: 700, color: "var(--muted)", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.4px" }}>
            Number to make payment (M-PESA)
          </label>
          <input
            className="input-field"
            type="tel"
            placeholder="07XX XXX XXX"
            value={mpesaNumber}
            onChange={(e) => setMPN(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-outline" style={{ flex: 1, padding: "13px 0", fontSize: 15 }} onClick={onClose}>Cancel</button>
          <button className="btn-primary" style={{ flex: 2, padding: "13px 0", fontSize: 15 }} onClick={confirm}>
            Purchase — KES {bundle.price}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Auth Modal ────────────────────────────────────────────────
function AuthModal({ onClose, onLogin, onSignup, onGoogleSignIn }) {
  const [tab, setTab]   = useState("login");
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", password: "" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div className="fade-up" style={{ background: "#fff", borderRadius: 20, width: "100%", maxWidth: 420, padding: "34px 28px", position: "relative", boxShadow: "var(--shadow-md)" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "var(--muted)" }}><FaTimes /></button>

        <h2 style={{ fontSize: 21, fontWeight: 800, marginBottom: 20 }}>
          {tab === "login" ? "Welcome Back 👋" : tab === "signup" ? "Create Account" : "Reset Password"}
        </h2>

        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {["login","signup"].map((t) => (
            <button key={t} className={tab === t ? "btn-primary" : "btn-outline"}
              style={{ flex: 1, padding: "10px 0", fontSize: 14 }}
              onClick={() => setTab(t)}>{t === "login" ? "Login" : "Sign Up"}</button>
          ))}
        </div>

        {tab === "login" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input className="input-field" type="email"    placeholder="Email Address" />
            <input className="input-field" type="password" placeholder="Password" />
            <button className="btn-primary" style={{ padding: "13px 0", fontSize: 15 }}
              onClick={() => onLogin({ firstName: "Bingwa", phone: "0722508904" })}>Login</button>
            <button onClick={onGoogleSignIn} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 0", border: "1.5px solid var(--border)", borderRadius: 10, background: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>
              <FaGoogle style={{ color: "#ea4335" }} /> Continue with Google
            </button>
            <button onClick={() => setTab("forgot")} style={{ background: "none", border: "none", color: "var(--primary)", cursor: "pointer", fontSize: 13 }}>
              Forgot Password?
            </button>
          </div>
        )}

        {tab === "signup" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", gap: 10 }}>
              <input className="input-field" type="text"  placeholder="First Name"  value={form.firstName} onChange={set("firstName")} />
              <input className="input-field" type="text"  placeholder="Last Name"   value={form.lastName}  onChange={set("lastName")}  />
            </div>
            <input className="input-field" type="email"    placeholder="Email Address"                value={form.email}    onChange={set("email")}    />
            <input className="input-field" type="tel"      placeholder="Safaricom Number (07XX XXX XXX)" value={form.phone}  onChange={set("phone")}    />
            <input className="input-field" type="password" placeholder="Password"                     value={form.password} onChange={set("password")} />
            <p style={{ fontSize: 12, color: "var(--muted)", marginTop: -4 }}>
              📌 Your number will be pre-filled when buying bundles.
            </p>
            <button className="btn-primary" style={{ padding: "13px 0", fontSize: 15 }}
              onClick={() => onSignup({ firstName: form.firstName || "Bingwa", phone: form.phone || "0722508904", email: form.email })}>
              Create Account
            </button>
            <button onClick={onGoogleSignIn} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 0", border: "1.5px solid var(--border)", borderRadius: 10, background: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>
              <FaGoogle style={{ color: "#ea4335" }} /> Sign up with Google
            </button>
          </div>
        )}

        {tab === "forgot" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <p style={{ color: "var(--muted)", fontSize: 14 }}>Enter your email and we'll send you a reset link.</p>
            <input className="input-field" type="email" placeholder="Email Address" />
            <button className="btn-primary" style={{ padding: "13px 0", fontSize: 15 }}>Send Reset Link</button>
            <button onClick={() => setTab("login")} style={{ background: "none", border: "none", color: "var(--primary)", cursor: "pointer", fontSize: 13 }}>← Back to Login</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Google Modal ──────────────────────────────────────────────
function GoogleModal({ onClose, onComplete }) {
  const [phone, setPhone] = useState("");
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div className="fade-up" style={{ background: "#fff", borderRadius: 20, width: "100%", maxWidth: 400, padding: "34px 28px", position: "relative", boxShadow: "var(--shadow-md)" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "var(--muted)" }}><FaTimes /></button>
        <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>One Last Step 🎉</h2>
        <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 20 }}>Add your Safaricom number so bundles auto-fill when you buy.</p>
        <input className="input-field" type="tel" placeholder="07XX XXX XXX" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ marginBottom: 14 }} />
        <button className="btn-primary" style={{ width: "100%", padding: "13px 0", fontSize: 15 }}
          onClick={() => onComplete({ firstName: "Bingwa", phone: phone || "0722508904" })}>
          Verify &amp; Continue
        </button>
      </div>
    </div>
  );
}

// ─── Reusables ─────────────────────────────────────────────────
function SectionHeader({ title, subtitle }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 34 }}>
      <h1 style={{ fontSize: "clamp(22px,5vw,34px)", fontWeight: 800 }}>{title}</h1>
      {subtitle && <p style={{ marginTop: 8, color: "var(--muted)", fontSize: 15 }}>{subtitle}</p>}
    </div>
  );
}

function BundleCard({ bundle, type, onSelect }) {
  const color = { Data: "#16a34a", Minutes: "#2563eb", SMS: "#7c3aed" }[type] || "#16a34a";
  return (
    <div className="card-hover" style={{ background: "#fff", borderRadius: "var(--radius)", boxShadow: "var(--shadow)", padding: "22px 18px", textAlign: "center", border: "1.5px solid var(--border)", display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ fontSize: 25, fontWeight: 800, color }}>{bundle.size}</div>
      <div style={{ fontSize: 12.5, color: "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
        <FaClock style={{ fontSize: 10 }} /> {bundle.time}
      </div>
      <div style={{ fontSize: 19, fontWeight: 800, margin: "3px 0" }}>KES {bundle.price}</div>
      <button className="btn-primary" style={{ padding: "10px 0", fontSize: 14, marginTop: 6 }} onClick={() => onSelect(bundle)}>
        Buy Now
      </button>
    </div>
  );
}

// ─── Main Export ───────────────────────────────────────────────
export default function Bundles() {
  const [activeTab, setActiveTab]           = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen]   = useState(false);
  const [googleModalOpen, setGoogleModalOpen] = useState(false);
  const [user, setUser]                     = useState(null);
  const [openFaq, setOpenFaq]               = useState(null);
  const [purchaseModal, setPurchaseModal]   = useState(null);
  const [txnId, setTxnId]                   = useState("");
  const [txnResult, setTxnResult]           = useState(null);
  const [notification, setNotification]     = useState(null);

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning";
    if (h < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Auth
  const handleLogin    = (u) => { setUser(u); setAuthModalOpen(false); toast.success(`${getGreeting()}, ${u.firstName}! 👋`); };
  const handleSignup   = (u) => { setUser(u); setAuthModalOpen(false); toast.success(`Welcome, ${u.firstName}! 🎉`); };
  const handleGoogle   = () => { setAuthModalOpen(false); setGoogleModalOpen(true); };
  const completeGoogle = (u) => { setUser(u); setGoogleModalOpen(false); toast.success("Google Sign Up complete! 🎉"); };
  const logout         = () => { setUser(null); toast.success("Logged out"); };

  // Purchase
  const openPurchase = (bundle, type) => {
    if (!user) { toast.error("Please login first"); setAuthModalOpen(true); return; }
    setPurchaseModal({ bundle, type });
  };
  const confirmPurchase = ({ receivingNumber, mpesaNumber }) => {
    const { bundle, type } = purchaseModal;
    setPurchaseModal(null);
    const tid = toast.loading(`Sending STK Push to ${mpesaNumber}…`);
    setTimeout(() => {
      toast.dismiss(tid);
      toast.success(`✅ ${bundle.size} ${type} sent to ${receivingNumber}!`);
    }, 3000);
  };

  // Track
  const trackOrder = () => {
    const key = txnId.trim().toUpperCase();
    const txn = mockTransactions[key];
    if (!txn) {
      setTxnResult({ error: "Transaction not found. Please check your M-PESA TXN code and try again." });
      setNotification(null);
    } else {
      setTxnResult(txn);
      setNotification(txn);
    }
  };

  const navLinks = [
    { label: "Home",        tab: "home"        },
    { label: "Buy Data",    tab: "buy-data"    },
    { label: "Buy Minutes", tab: "buy-minutes" },
    { label: "Buy SMS",     tab: "buy-sms"     },
    { label: "Track Order", tab: "track-order" },
    { label: "Support",     tab: "support"     },
  ];

  return (
    <>
      <GlobalStyle />
      <Toaster position="top-center" toastOptions={{ style: { fontWeight: 600, fontSize: 14 } }} />

      {notification && <WebNotification txn={notification} onClose={() => setNotification(null)} />}

      {purchaseModal && (
        <PurchaseModal
          bundle={purchaseModal.bundle} type={purchaseModal.type}
          user={user} onClose={() => setPurchaseModal(null)} onConfirm={confirmPurchase}
        />
      )}
      {authModalOpen && <AuthModal onClose={() => setAuthModalOpen(false)} onLogin={handleLogin} onSignup={handleSignup} onGoogleSignIn={handleGoogle} />}
      {googleModalOpen && <GoogleModal onClose={() => setGoogleModalOpen(false)} onComplete={completeGoogle} />}

      {/* ── NAV ── */}
      <nav style={{ background: "#fff", boxShadow: "0 1px 0 var(--border)", position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, height: 64 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FaMobileAlt style={{ color: "#fff", fontSize: 18 }} />
            </div>
            <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.3px" }}>
              Weber<span style={{ color: "var(--primary)" }}>Tech</span>
            </span>
          </div>

          {/* Desktop nav */}
          <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="desktop-nav">
            {navLinks.map((l) => (
              <button key={l.tab} onClick={() => setActiveTab(l.tab)} style={{
                background: activeTab === l.tab ? "var(--primary-light)" : "none",
                border: "none",
                color: activeTab === l.tab ? "var(--primary)" : "var(--muted)",
                fontWeight: activeTab === l.tab ? 700 : 500,
                padding: "7px 12px", borderRadius: 8, cursor: "pointer", fontSize: 13.5, transition: "all 0.15s"
              }}>{l.label}</button>
            ))}
            {user ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--muted)" }}>
                  <FaUser style={{ marginRight: 4 }} />{getGreeting()}, {user.firstName}
                </span>
                <button className="btn-outline" style={{ padding: "6px 13px", fontSize: 13, display: "flex", alignItems: "center", gap: 5 }} onClick={logout}>
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            ) : (
              <button className="btn-primary" style={{ padding: "8px 17px", fontSize: 13.5, marginLeft: 8 }} onClick={() => setAuthModalOpen(true)}>
                <FaUser style={{ marginRight: 6 }} />Login
              </button>
            )}
          </div>

          {/* Hamburger */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer" }}
            className="mobile-toggle">
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div style={{ background: "#fff", borderTop: "1px solid var(--border)", padding: "12px 20px 18px" }}>
            {navLinks.map((l) => (
              <button key={l.tab} onClick={() => { setActiveTab(l.tab); setMobileMenuOpen(false); }} style={{
                display: "block", width: "100%", textAlign: "left", padding: "11px 12px",
                background: "none", border: "none",
                color: activeTab === l.tab ? "var(--primary)" : "var(--text)",
                fontWeight: activeTab === l.tab ? 700 : 500, fontSize: 15, cursor: "pointer", borderRadius: 8
              }}>{l.label}</button>
            ))}
            <div style={{ borderTop: "1px solid var(--border)", marginTop: 10, paddingTop: 12 }}>
              {user ? (
                <button className="btn-outline" style={{ width: "100%", padding: "11px 0", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                  onClick={() => { logout(); setMobileMenuOpen(false); }}>
                  <FaSignOutAlt /> Logout
                </button>
              ) : (
                <button className="btn-primary" style={{ width: "100%", padding: "11px 0", fontSize: 14 }}
                  onClick={() => { setAuthModalOpen(true); setMobileMenuOpen(false); }}>
                  Login / Sign Up
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* ── PAGES ── */}
      <div style={{ paddingTop: 64 }}>

        {/* ══ HOME ══ */}
        {activeTab === "home" && (
          <>
            <div style={{ background: "linear-gradient(135deg,#15803d 0%,#16a34a 55%,#4ade80 100%)", color: "#fff", padding: "72px 20px 80px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -60, right: -60, width: 280, height: 280, borderRadius: "50%", background: "rgba(255,255,255,0.07)", animation: "pulseRing 4s ease-in-out infinite" }} />
              <div style={{ position: "absolute", bottom: -80, left: -40, width: 230, height: 230, borderRadius: "50%", background: "rgba(255,255,255,0.05)", animation: "pulseRing 5s ease-in-out infinite 1s" }} />
              <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
                <div style={{ maxWidth: 600 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.18)", borderRadius: 99, padding: "5px 14px", fontSize: 13, fontWeight: 600, marginBottom: 20 }}>
                    <FaBolt /> Instant Delivery — No Delays
                  </div>
                  <h1 style={{ fontSize: "clamp(30px,6vw,50px)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-1px" }}>
                    Safaricom Bundles,<br />Delivered in Seconds.
                  </h1>
                  <p style={{ marginTop: 16, fontSize: 17, opacity: 0.88, lineHeight: 1.6 }}>
                    Data, Minutes & SMS via M-PESA STK Push. Instant. Secure. Reliable.
                  </p>
                  <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 12 }}>
                    {[
                      { label: "Buy Data",    tab: "buy-data",    solid: true  },
                      { label: "Buy Minutes", tab: "buy-minutes", solid: false },
                      { label: "Buy SMS",     tab: "buy-sms",     solid: false },
                    ].map((btn) => (
                      <button key={btn.tab} onClick={() => setActiveTab(btn.tab)} style={{
                        background: btn.solid ? "#fff" : "rgba(255,255,255,0.15)",
                        color: btn.solid ? "var(--primary)" : "#fff",
                        border: "2px solid rgba(255,255,255,0.4)", borderRadius: 10,
                        padding: "12px 22px", fontWeight: 700, fontSize: 15, cursor: "pointer",
                        transition: "transform 0.15s"
                      }}>{btn.label}</button>
                    ))}
                  </div>
                </div>
                <div style={{ marginTop: 52, display: "flex", flexWrap: "wrap", gap: 18 }}>
                  {[["10s","Avg Delivery"],["99%","Success Rate"],["24/7","Support"],["100%","M-PESA Secure"]].map(([v,l]) => (
                    <div key={l} style={{ background: "rgba(255,255,255,0.15)", borderRadius: 12, padding: "13px 22px" }}>
                      <div style={{ fontSize: 22, fontWeight: 800 }}>{v}</div>
                      <div style={{ fontSize: 12, opacity: 0.8 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ background: "#fff", padding: "60px 20px" }}>
              <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <SectionHeader title="Why Choose WeberTech?" subtitle="Fast, secure, and reliable digital services for every Kenyan" />
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(245px,1fr))", gap: 20 }}>
                  {[
                    { icon: <FaBolt />,      title: "Instant Delivery", desc: "Bundles arrive within 10 seconds of M-PESA confirmation.", color: "#16a34a" },
                    { icon: <FaShieldAlt />, title: "Secure Payments",  desc: "Official Safaricom M-PESA STK Push. We never see your PIN.", color: "#2563eb" },
                    { icon: <FaHeadset />,   title: "24/7 Support",     desc: "WhatsApp support around the clock. Average reply: 2 min.",  color: "#7c3aed" },
                  ].map((f) => (
                    <div key={f.title} className="card-hover" style={{ border: "1.5px solid var(--border)", borderRadius: "var(--radius)", padding: "24px 20px" }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: f.color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, color: f.color, marginBottom: 12 }}>{f.icon}</div>
                      <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{f.title}</h3>
                      <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 42, background: "linear-gradient(135deg,#15803d,#16a34a)", borderRadius: 18, padding: "30px 26px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                  <div>
                    <h3 style={{ color: "#fff", fontSize: 19, fontWeight: 800 }}>Need help? We're on WhatsApp 24/7</h3>
                    <p style={{ color: "rgba(255,255,255,0.8)", marginTop: 5 }}>+254 722 508 904 — Reply in under 2 minutes</p>
                  </div>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" style={{ background: "#fff", color: "var(--primary)", padding: "12px 22px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
                    <FaWhatsapp style={{ fontSize: 18 }} /> Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ══ BUNDLE PAGES ══ */}
        {["buy-data","buy-minutes","buy-sms"].includes(activeTab) && (() => {
          const cfg = {
            "buy-data":    { title: "Data Bundles",    sub: "Tap any bundle to purchase instantly",         bundles: dataBundles,    type: "Data"    },
            "buy-minutes": { title: "Minutes Bundles", sub: "Ongea bila stress — tap to purchase",          bundles: minutesBundles, type: "Minutes" },
            "buy-sms":     { title: "SMS Bundles",     sub: "SMS mob — chat na wote kwa bei nafuu",         bundles: smsBundles,     type: "SMS"     },
          }[activeTab];
          return (
            <div style={{ padding: "46px 20px", minHeight: "100vh", background: "var(--bg)" }}>
              <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <SectionHeader title={cfg.title} subtitle={cfg.sub} />
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px,1fr))", gap: 16 }}>
                  {cfg.bundles.map((b) => (
                    <BundleCard key={b.size + b.time} bundle={b} type={cfg.type} onSelect={(b) => openPurchase(b, cfg.type)} />
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {/* ══ TRACK ORDER ══ */}
        {activeTab === "track-order" && (
          <div style={{ padding: "46px 20px", minHeight: "100vh", background: "var(--bg)" }}>
            <div style={{ maxWidth: 700, margin: "0 auto" }}>
              <SectionHeader title="Track Your Order" subtitle="Enter your M-PESA TXN code to check status" />

              {/* Search */}
              <div style={{ background: "#fff", borderRadius: "var(--radius)", padding: 20, boxShadow: "var(--shadow)", marginBottom: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <input className="input-field" style={{ flex: 1, minWidth: 180 }} type="text"
                  placeholder="M-PESA TXN Code (e.g. RGH4K9X2L1)"
                  value={txnId} onChange={(e) => setTxnId(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && trackOrder()} />
                <button className="btn-primary" style={{ padding: "13px 20px", display: "flex", alignItems: "center", gap: 7, fontSize: 14 }} onClick={trackOrder}>
                  <FaSearch /> Track
                </button>
              </div>

              {/* Error */}
              {txnResult?.error && (
                <div className="fade-up" style={{ background: "#fff", border: "1.5px solid #fca5a5", borderRadius: "var(--radius)", padding: 20, marginBottom: 22, display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 22 }}>❌</span>
                  <div>
                    <p style={{ fontWeight: 700, color: "#dc2626" }}>Not Found</p>
                    <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 3 }}>{txnResult.error}</p>
                  </div>
                </div>
              )}

              {/* Result card */}
              {txnResult && !txnResult.error && (
                <div className="success-pop" style={{ background: "#fff", borderRadius: "var(--radius)", boxShadow: "var(--shadow-md)", marginBottom: 28, overflow: "hidden", border: `2px solid ${txnResult.status === "Completed" ? "#86efac" : "#fcd34d"}` }}>
                  {/* Card header */}
                  <div style={{
                    background: txnResult.status === "Completed" ? "linear-gradient(135deg,#15803d,#16a34a)" : "linear-gradient(135deg,#d97706,#f59e0b)",
                    padding: "20px 22px", display: "flex", alignItems: "center", gap: 14
                  }}>
                    <div style={{ width: 46, height: 46, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
                      {txnResult.status === "Completed" ? "🎉" : "⏳"}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>
                        {txnResult.status === "Completed" ? `Congratulations, ${txnResult.firstName}!` : `Hi ${txnResult.firstName}, processing…`}
                      </div>
                      <div style={{ color: "rgba(255,255,255,0.78)", fontSize: 13, marginTop: 2 }}>WeberTech Ref: {txnResult.wtRef}</div>
                    </div>
                    <span className={`badge ${txnResult.status === "Completed" ? "badge-green" : "badge-yellow"}`} style={{ fontSize: 13 }}>
                      {txnResult.status}
                    </span>
                  </div>

                  {/* Congrats banner */}
                  {txnResult.status === "Completed" && (
                    <div style={{ background: "linear-gradient(135deg,#f0fdf4,#dcfce7)", padding: "14px 22px", borderBottom: "1px solid #bbf7d0", display: "flex", alignItems: "center", gap: 10 }}>
                      <FaGift style={{ color: "#16a34a", fontSize: 18 }} />
                      <p style={{ color: "#15803d", fontSize: 14, fontWeight: 600, lineHeight: 1.5 }}>
                        Your <strong>{txnResult.bundle}</strong> ({txnResult.validity}) has been delivered to{" "}
                        <strong>{txnResult.receivingNumber}</strong>. Enjoy! 🚀
                      </p>
                    </div>
                  )}

                  {/* Details */}
                  <div style={{ padding: "20px 22px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      {[
                        ["📦","Bundle",           `${txnResult.bundle}`],
                        ["⏰","Validity",           txnResult.validity],
                        ["💰","Amount Paid",        txnResult.amount],
                        ["📅","Date & Time",        `${txnResult.date} · ${txnResult.time}`],
                        ["📱","Delivered To",       txnResult.receivingNumber],
                        ["💳","Payment Number",     txnResult.paymentNumber],
                        ["🔖","M-PESA TXN Code",    txnResult.mpesaTxn],
                        ["👤","Account Name",       `${txnResult.firstName} ${txnResult.lastName}`],
                      ].map(([ic,lb,vl]) => (
                        <div key={lb} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                          <span style={{ fontSize: 11, color: "var(--muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.4px" }}>{ic} {lb}</span>
                          <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{vl}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid var(--border)", display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 13, color: "var(--muted)" }}>Issue with this order?</span>
                      <a href={`${WHATSAPP_LINK}?text=Hi WeberTech, I need help with order ${txnResult.mpesaTxn}`}
                        target="_blank" rel="noreferrer"
                        style={{ display: "flex", alignItems: "center", gap: 6, color: "#25d366", fontWeight: 700, fontSize: 13, textDecoration: "none" }}>
                        <FaWhatsapp style={{ fontSize: 16 }} /> Chat Support
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Demo hint */}
              <div style={{ background: "#fff", borderRadius: "var(--radius)", padding: "14px 18px", boxShadow: "var(--shadow)", marginBottom: 22 }}>
                <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 8 }}>🧪 <strong>Demo TXN codes to try:</strong></p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {Object.keys(mockTransactions).map((code) => (
                    <button key={code} onClick={() => setTxnId(code)}
                      style={{ background: "var(--primary-light)", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 13, fontWeight: 700, color: "var(--primary)", cursor: "pointer" }}>
                      {code}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent transactions */}
              <h2 style={{ fontWeight: 800, fontSize: 18, marginBottom: 13 }}>Recent Transactions</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {Object.values(mockTransactions).map((t) => (
                  <div key={t.mpesaTxn} className="card-hover"
                    onClick={() => { setTxnId(t.mpesaTxn); setTxnResult(t); setNotification(t); }}
                    style={{ background: "#fff", borderRadius: "var(--radius)", padding: "15px 20px", boxShadow: "var(--shadow)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 14 }}>{t.mpesaTxn}</p>
                      <p style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 2 }}>{t.bundle} · {t.receivingNumber} · {t.date}</p>
                      <p style={{ fontSize: 12, color: "var(--muted)" }}>{t.firstName} {t.lastName}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontWeight: 800, fontSize: 15 }}>{t.amount}</p>
                      <span className={`badge ${t.status === "Completed" ? "badge-green" : "badge-yellow"}`}>{t.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ SUPPORT ══ */}
        {activeTab === "support" && (
          <div style={{ padding: "46px 20px", minHeight: "100vh", background: "var(--bg)" }}>
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
              <SectionHeader title="Support Center" subtitle="We're here to help — 24/7" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(195px,1fr))", gap: 14, marginBottom: 40 }}>
                {[
                  { icon: <FaEnvelope />, label: "Email",    value: "support@webertech.co.ke", href: "mailto:support@webertech.co.ke", color: "#2563eb" },
                  { icon: <FaPhone />,    label: "Phone",    value: "+254 722 508 904",         href: "tel:+254722508904",             color: "#16a34a" },
                  { icon: <FaWhatsapp />, label: "WhatsApp", value: "+254 722 508 904",         href: WHATSAPP_LINK,                   color: "#25d366" },
                ].map((c) => (
                  <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className="card-hover"
                    style={{ background: "#fff", borderRadius: "var(--radius)", padding: "20px 16px", textAlign: "center", textDecoration: "none", boxShadow: "var(--shadow)", border: "1.5px solid var(--border)", display: "flex", flexDirection: "column", alignItems: "center", gap: 9 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: c.color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, color: c.color }}>{c.icon}</div>
                    <p style={{ fontWeight: 700, fontSize: 14 }}>{c.label}</p>
                    <p style={{ color: c.color, fontSize: 13, fontWeight: 600 }}>{c.value}</p>
                  </a>
                ))}
              </div>

              <h2 style={{ fontWeight: 800, fontSize: 21, marginBottom: 14 }}>Frequently Asked Questions</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
                {faqs.map((faq, i) => (
                  <div key={i} style={{ background: "#fff", borderRadius: "var(--radius)", boxShadow: "var(--shadow)", border: "1.5px solid var(--border)", overflow: "hidden" }}>
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      style={{ width: "100%", padding: "16px 20px", textAlign: "left", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: 600, fontSize: 15 }}>
                      {faq.q}
                      <span style={{ fontSize: 18, color: "var(--primary)", transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
                    </button>
                    {openFaq === i && (
                      <div className="fade-up" style={{ padding: "0 20px 15px", color: "var(--muted)", fontSize: 14, lineHeight: 1.7 }}>{faq.a}</div>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ background: "#25d366", borderRadius: "var(--radius)", padding: "24px 22px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
                <div>
                  <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 17 }}>Still need help?</h3>
                  <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, marginTop: 4 }}>Chat with us on WhatsApp — we reply in under 2 minutes.</p>
                </div>
                <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer"
                  style={{ background: "#fff", color: "#25d366", padding: "10px 20px", borderRadius: 10, fontWeight: 700, fontSize: 14, textDecoration: "none", display: "flex", alignItems: "center", gap: 7 }}>
                  <FaWhatsapp style={{ fontSize: 17 }} /> Open WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer style={{ background: "#111827", color: "rgba(255,255,255,0.55)", padding: "24px 20px", textAlign: "center", fontSize: 13 }}>
          <p style={{ fontWeight: 800, color: "#fff", fontSize: 15, marginBottom: 5 }}>
            Weber<span style={{ color: "#4ade80" }}>Tech</span>
          </p>
          <p>© {new Date().getFullYear()} WeberTech. All rights reserved. · support@webertech.co.ke · +254 722 508 904</p>
        </footer>
      </div>
    </>
  );
}
