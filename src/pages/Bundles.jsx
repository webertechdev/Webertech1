import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import {
  FaMobileAlt, FaBolt, FaLock, FaHeadset,
  FaBars, FaTimes, FaUser, FaSignOutAlt,
  FaGoogle, FaWhatsapp, FaEnvelope, FaPhone,
  FaCheckCircle, FaClock, FaSearch
} from "react-icons/fa";

// ─── Bundle Data ───────────────────────────────────────────────
const dataBundles = [
  { size: "1GB",    time: "1hr",    price: 19  },
  { size: "1.5GB",  time: "3hr",    price: 49  },
  { size: "2GB",    time: "24hr",   price: 99  },
  { size: "6GB",    time: "7 Days", price: 349 },
  { size: "1.2GB",  time: "30 Days",price: 250 },
  { size: "2.5GB",  time: "30 Days",price: 300 },
  { size: "5.5GB",  time: "30 Days",price: 500 },
  { size: "10GB",   time: "30 Days",price: 1000},
];

const minutesBundles = [
  { size: "50 Mins",  time: "3hr",    price: 20  },
  { size: "100 Mins", time: "24hr",   price: 50  },
  { size: "200 Mins", time: "7 Days", price: 100 },
  { size: "500 Mins", time: "30 Days",price: 250 },
];

const smsBundles = [
  { size: "200 SMS",  time: "24hr",   price: 9  },
  { size: "500 SMS",  time: "7 Days", price: 20 },
  { size: "1000 SMS", time: "30 Days",price: 30 },
  { size: "2000 SMS", time: "30 Days",price: 50 },
];

const mockTransactions = [
  { id: "TXN_WT_0001", status: "Completed", bundle: "2GB Data", amount: "KES 99",  date: "2026-05-12", number: "0712 345 678" },
  { id: "TXN_WT_0002", status: "Processing", bundle: "100 Mins", amount: "KES 50", date: "2026-05-11", number: "0798 765 432" },
];

const faqs = [
  {
    q: "How long does it take to receive my bundle?",
    a: "Bundles are delivered instantly. You'll receive an M-PESA confirmation SMS within 10 seconds of payment.",
  },
  {
    q: "What if I don't receive my bundle?",
    a: "Contact us immediately via WhatsApp +254722508904 with your transaction ID. We resolve 99% of issues in under 5 minutes.",
  },
  {
    q: "Can I buy bundles for another number?",
    a: "Yes! Just enter the recipient's Safaricom number in the 'Receiving Number' field. The bundle will be sent directly to them.",
  },
  {
    q: "Is my payment secure?",
    a: "Absolutely. All payments go through Safaricom's official M-PESA STK Push — we never store your M-PESA PIN.",
  },
];

const WHATSAPP_NUMBER = "254722508904";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

// ─── Styles (inline CSS variables + keyframes injected once) ───
const GlobalStyle = () => (
  <style>{`
    :root {
      --primary: #16a34a;
      --primary-dark: #15803d;
      --primary-light: #dcfce7;
      --accent: #f59e0b;
      --text: #111827;
      --muted: #6b7280;
      --bg: #f9fafb;
      --white: #ffffff;
      --border: #e5e7eb;
      --radius: 14px;
      --shadow: 0 4px 24px rgba(0,0,0,0.07);
      --shadow-md: 0 8px 32px rgba(0,0,0,0.12);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', system-ui, sans-serif; background: var(--bg); color: var(--text); }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(18px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse-ring {
      0%, 100% { transform: scale(1); opacity: 0.4; }
      50%       { transform: scale(1.12); opacity: 0.15; }
    }
    .fade-up { animation: fadeUp 0.45s ease both; }
    .card-hover {
      transition: transform 0.22s ease, box-shadow 0.22s ease;
      cursor: pointer;
    }
    .card-hover:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-md);
    }
    .btn-primary {
      background: var(--primary);
      color: #fff;
      border: none;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.18s ease, transform 0.12s ease;
    }
    .btn-primary:hover:not(:disabled) { background: var(--primary-dark); transform: translateY(-1px); }
    .btn-primary:disabled { background: #9ca3af; cursor: not-allowed; }
    .btn-outline {
      background: transparent;
      border: 2px solid var(--primary);
      color: var(--primary);
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.18s ease;
    }
    .btn-outline:hover { background: var(--primary); color: #fff; }
    .input-field {
      width: 100%;
      padding: 14px 16px;
      border: 1.5px solid var(--border);
      border-radius: 10px;
      font-size: 15px;
      outline: none;
      transition: border-color 0.18s;
      background: #fff;
    }
    .input-field:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(22,163,74,0.1); }
    .badge {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 99px;
      font-size: 12px;
      font-weight: 600;
    }
    .badge-green  { background: #dcfce7; color: #15803d; }
    .badge-yellow { background: #fef9c3; color: #a16207; }
  `}</style>
);

// ─── Reusable Components ───────────────────────────────────────

function NumberInputs({ receivingNumber, setReceivingNumber, mpesaNumber, setMpesaNumber, label }) {
  return (
    <div style={{ maxWidth: 480, margin: "0 auto 32px", display: "flex", flexDirection: "column", gap: 12 }}>
      <input
        className="input-field"
        type="tel"
        placeholder={`Receiving Number (${label}) — 07XX XXX XXX`}
        value={receivingNumber}
        onChange={(e) => setReceivingNumber(e.target.value)}
      />
      <input
        className="input-field"
        type="tel"
        placeholder="M-PESA Payment Number — 07XX XXX XXX"
        value={mpesaNumber}
        onChange={(e) => setMpesaNumber(e.target.value)}
      />
    </div>
  );
}

function BundleCard({ bundle, type, onBuy, loading }) {
  const colorMap = { Data: "#16a34a", Minutes: "#2563eb", SMS: "#7c3aed" };
  const color = colorMap[type] || "#16a34a";

  return (
    <div
      className="card-hover fade-up"
      style={{
        background: "#fff",
        borderRadius: "var(--radius)",
        boxShadow: "var(--shadow)",
        padding: "24px 20px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        border: "1.5px solid var(--border)",
      }}
    >
      <div style={{ fontSize: 28, fontWeight: 800, color }}>{bundle.size}</div>
      <div style={{ fontSize: 13, color: "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
        <FaClock style={{ fontSize: 11 }} /> {bundle.time}
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", margin: "4px 0" }}>
        KES {bundle.price}
      </div>
      <button
        className="btn-primary"
        style={{ padding: "10px 0", marginTop: 8, fontSize: 14 }}
        onClick={() => onBuy(bundle.size, bundle.price, type)}
        disabled={loading}
      >
        {loading ? "Processing…" : "Buy Now"}
      </button>
    </div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 36 }}>
      <h1 style={{ fontSize: "clamp(24px, 5vw, 36px)", fontWeight: 800, color: "var(--text)" }}>{title}</h1>
      {subtitle && <p style={{ marginTop: 8, color: "var(--muted)", fontSize: 15 }}>{subtitle}</p>}
    </div>
  );
}

// ─── Auth Modal ────────────────────────────────────────────────
function AuthModal({ onClose, onLogin, onSignup, onGoogleSignIn }) {
  const [tab, setTab] = useState("login");

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)",
      zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16
    }}>
      <div className="fade-up" style={{
        background: "#fff", borderRadius: 18, width: "100%", maxWidth: 420,
        padding: "36px 32px", position: "relative", boxShadow: "var(--shadow-md)"
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16,
          background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "var(--muted)"
        }}>
          <FaTimes />
        </button>

        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 20 }}>
          {tab === "login" ? "Welcome Back 👋" : tab === "signup" ? "Create Account" : "Reset Password"}
        </h2>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          <button
            className={tab === "login" ? "btn-primary" : "btn-outline"}
            style={{ flex: 1, padding: "10px 0", fontSize: 14 }}
            onClick={() => setTab("login")}
          >Login</button>
          <button
            className={tab === "signup" ? "btn-primary" : "btn-outline"}
            style={{ flex: 1, padding: "10px 0", fontSize: 14 }}
            onClick={() => setTab("signup")}
          >Sign Up</button>
        </div>

        {tab === "login" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input className="input-field" type="email" placeholder="Email Address" />
            <input className="input-field" type="password" placeholder="Password" />
            <button className="btn-primary" style={{ padding: "13px 0", fontSize: 15 }} onClick={onLogin}>Login</button>
            <button onClick={onGoogleSignIn} style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              padding: "12px 0", border: "1.5px solid var(--border)", borderRadius: 10,
              background: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 14
            }}>
              <FaGoogle style={{ color: "#ea4335" }} /> Continue with Google
            </button>
            <button onClick={() => setTab("forgot")} style={{
              background: "none", border: "none", color: "var(--primary)", cursor: "pointer", fontSize: 13, marginTop: 4
            }}>Forgot Password?</button>
          </div>
        )}

        {tab === "signup" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", gap: 10 }}>
              <input className="input-field" type="text" placeholder="First Name" />
              <input className="input-field" type="text" placeholder="Last Name" />
            </div>
            <input className="input-field" type="email" placeholder="Email Address" />
            <input className="input-field" type="tel" placeholder="Phone Number (07XX XXX XXX)" />
            <input className="input-field" type="password" placeholder="Password" />
            <button className="btn-primary" style={{ padding: "13px 0", fontSize: 15 }} onClick={onSignup}>Create Account</button>
            <button onClick={onGoogleSignIn} style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              padding: "12px 0", border: "1.5px solid var(--border)", borderRadius: 10,
              background: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 14
            }}>
              <FaGoogle style={{ color: "#ea4335" }} /> Sign up with Google
            </button>
          </div>
        )}

        {tab === "forgot" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <p style={{ color: "var(--muted)", fontSize: 14 }}>
              Enter your email and we'll send you a reset link.
            </p>
            <input className="input-field" type="email" placeholder="Email Address" />
            <button className="btn-primary" style={{ padding: "13px 0", fontSize: 15 }}>Send Reset Link</button>
            <button onClick={() => setTab("login")} style={{
              background: "none", border: "none", color: "var(--primary)", cursor: "pointer", fontSize: 13
            }}>← Back to Login</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Google Extra Info Modal ───────────────────────────────────
function GoogleModal({ onClose, onComplete }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)",
      zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16
    }}>
      <div className="fade-up" style={{
        background: "#fff", borderRadius: 18, width: "100%", maxWidth: 400,
        padding: "36px 32px", position: "relative", boxShadow: "var(--shadow-md)"
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16,
          background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "var(--muted)"
        }}>
          <FaTimes />
        </button>
        <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>One Last Step 🎉</h2>
        <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 20 }}>
          Add your Safaricom number to complete setup.
        </p>
        <input className="input-field" type="tel" placeholder="Phone Number (07XX XXX XXX)" style={{ marginBottom: 14 }} />
        <button className="btn-primary" style={{ width: "100%", padding: "13px 0", fontSize: 15 }} onClick={onComplete}>
          Verify &amp; Continue
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────
export default function Bundles() {
  const [receivingNumber, setReceivingNumber] = useState("");
  const [mpesaNumber, setMpesaNumber]         = useState("");
  const [loading, setLoading]                 = useState(false);
  const [activeTab, setActiveTab]             = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen]   = useState(false);
  const [authModalOpen, setAuthModalOpen]     = useState(false);
  const [googleModalOpen, setGoogleModalOpen] = useState(false);
  const [user, setUser]                       = useState(null);
  const [txnId, setTxnId]                     = useState("");
  const [txnResult, setTxnResult]             = useState(null);
  const [openFaq, setOpenFaq]                 = useState(null);

  // ── Helpers ──
  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning";
    if (h < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const validateNumbers = () => {
    const pattern = /^(\+254|254|0)?7\d{8}$/;
    if (!pattern.test(receivingNumber)) {
      toast.error("Enter a valid receiving number: 07XXXXXXXX"); return false;
    }
    if (!pattern.test(mpesaNumber)) {
      toast.error("Enter a valid M-PESA number: 07XXXXXXXX"); return false;
    }
    return true;
  };

  const initiateStkPush = (bundle, price, type) => {
    if (!validateNumbers()) return;
    if (!user) { toast.error("Please login first"); setAuthModalOpen(true); return; }
    setLoading(true);
    const tid = toast.loading(`Sending KES ${price} STK Push to ${mpesaNumber}…`);
    setTimeout(() => {
      toast.dismiss(tid);
      toast.success(`✅ ${bundle} ${type} sent to ${receivingNumber}!`);
      setLoading(false);
      setReceivingNumber("");
      setMpesaNumber("");
    }, 3000);
  };

  const handleLogin = () => {
    setUser({ name: "Bingwa" });
    setAuthModalOpen(false);
    toast.success(`${getGreeting()}, Bingwa! 👋`);
  };

  const handleSignup = () => {
    setUser({ name: "Bingwa" });
    setAuthModalOpen(false);
    toast.success("Account created! Welcome, Bingwa 🎉");
  };

  const handleGoogleSignIn = () => {
    setAuthModalOpen(false);
    setGoogleModalOpen(true);
  };

  const completeGoogleSignup = () => {
    setUser({ name: "Bingwa" });
    setGoogleModalOpen(false);
    toast.success("Google Sign Up complete! Welcome 🎉");
  };

  const logout = () => { setUser(null); toast.success("Logged out successfully"); };

  const trackOrder = () => {
    const txn = mockTransactions.find((t) => t.id.toLowerCase() === txnId.trim().toLowerCase());
    setTxnResult(txn || { error: "Transaction not found. Check the ID and try again." });
  };

  const navLinks = [
    { label: "Home",        tab: "home"        },
    { label: "Buy Data",    tab: "buy-data"    },
    { label: "Buy Minutes", tab: "buy-minutes" },
    { label: "Buy SMS",     tab: "buy-sms"     },
    { label: "Track Order", tab: "track-order" },
    { label: "Support",     tab: "support"     },
  ];

  // ── Nav ──
  const navStyle = {
    background: "#fff",
    boxShadow: "0 1px 0 var(--border)",
    position: "fixed",
    top: 0, left: 0, right: 0,
    zIndex: 50,
    height: 64,
  };

  return (
    <>
      <GlobalStyle />
      <Toaster position="top-center" toastOptions={{ style: { fontWeight: 600, fontSize: 14 } }} />

      {/* ── NAV ── */}
      <nav style={navStyle}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: "0 20px",
          height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between"
        }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <FaMobileAlt style={{ color: "#fff", fontSize: 18 }} />
            </div>
            <span style={{ fontWeight: 800, fontSize: 18, color: "var(--text)", letterSpacing: "-0.3px" }}>
              Weber<span style={{ color: "var(--primary)" }}>Tech</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="desktop-nav">
            {navLinks.map((l) => (
              <button
                key={l.tab}
                onClick={() => setActiveTab(l.tab)}
                style={{
                  background: activeTab === l.tab ? "var(--primary-light)" : "none",
                  border: "none",
                  color: activeTab === l.tab ? "var(--primary)" : "var(--muted)",
                  fontWeight: activeTab === l.tab ? 700 : 500,
                  padding: "7px 13px",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: 13.5,
                  transition: "all 0.15s",
                }}
              >{l.label}</button>
            ))}
            {user ? (
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: 8 }}>
                <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>
                  <FaUser style={{ marginRight: 4 }} />{getGreeting()}, {user.name}
                </span>
                <button
                  className="btn-outline"
                  style={{ padding: "6px 14px", fontSize: 13, display: "flex", alignItems: "center", gap: 5 }}
                  onClick={logout}
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            ) : (
              <button
                className="btn-primary"
                style={{ padding: "8px 18px", fontSize: 13.5, marginLeft: 8 }}
                onClick={() => setAuthModalOpen(true)}
              >
                <FaUser style={{ marginRight: 6 }} />Login
              </button>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "var(--text)" }}
            className="mobile-only"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div style={{
            background: "#fff", borderTop: "1px solid var(--border)",
            padding: "12px 20px 20px",
          }}>
            {navLinks.map((l) => (
              <button
                key={l.tab}
                onClick={() => { setActiveTab(l.tab); setMobileMenuOpen(false); }}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  padding: "11px 12px", background: "none", border: "none",
                  color: activeTab === l.tab ? "var(--primary)" : "var(--text)",
                  fontWeight: activeTab === l.tab ? 700 : 500,
                  fontSize: 15, cursor: "pointer", borderRadius: 8,
                }}
              >{l.label}</button>
            ))}
            <div style={{ borderTop: "1px solid var(--border)", marginTop: 12, paddingTop: 12 }}>
              {user ? (
                <button
                  className="btn-outline"
                  style={{ width: "100%", padding: "11px 0", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                >
                  <FaSignOutAlt /> Logout
                </button>
              ) : (
                <button
                  className="btn-primary"
                  style={{ width: "100%", padding: "11px 0", fontSize: 14 }}
                  onClick={() => { setAuthModalOpen(true); setMobileMenuOpen(false); }}
                >
                  Login / Sign Up
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* ── Modals ── */}
      {authModalOpen && (
        <AuthModal
          onClose={() => setAuthModalOpen(false)}
          onLogin={handleLogin}
          onSignup={handleSignup}
          onGoogleSignIn={handleGoogleSignIn}
        />
      )}
      {googleModalOpen && (
        <GoogleModal
          onClose={() => setGoogleModalOpen(false)}
          onComplete={completeGoogleSignup}
        />
      )}

      {/* ── Page Content ── */}
      <div style={{ paddingTop: 64 }}>

        {/* ══ HOME ══ */}
        {activeTab === "home" && (
          <>
            {/* Hero */}
            <div style={{
              background: "linear-gradient(135deg, #15803d 0%, #16a34a 50%, #4ade80 100%)",
              color: "#fff",
              padding: "72px 20px 80px",
              position: "relative",
              overflow: "hidden",
            }}>
              {/* Decorative circles */}
              <div style={{
                position: "absolute", top: -60, right: -60,
                width: 300, height: 300, borderRadius: "50%",
                background: "rgba(255,255,255,0.07)",
                animation: "pulse-ring 4s ease-in-out infinite",
              }} />
              <div style={{
                position: "absolute", bottom: -80, left: -40,
                width: 250, height: 250, borderRadius: "50%",
                background: "rgba(255,255,255,0.05)",
                animation: "pulse-ring 5s ease-in-out infinite 1s",
              }} />

              <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
                <div style={{ maxWidth: 600 }}>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    background: "rgba(255,255,255,0.18)", borderRadius: 99,
                    padding: "5px 14px", fontSize: 13, fontWeight: 600, marginBottom: 20
                  }}>
                    <FaBolt /> Instant Delivery — No Delays
                  </div>
                  <h1 style={{ fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-1px" }}>
                    Safaricom Bundles,<br />Delivered in Seconds.
                  </h1>
                  <p style={{ marginTop: 16, fontSize: 17, opacity: 0.88, lineHeight: 1.6 }}>
                    Data, Minutes & SMS bundles via M-PESA STK Push. No queues, no stress — just instant connectivity.
                  </p>
                  <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 12 }}>
                    {[
                      { label: "Buy Data",    tab: "buy-data",    bg: "#fff", color: "var(--primary)" },
                      { label: "Buy Minutes", tab: "buy-minutes", bg: "rgba(255,255,255,0.15)", color: "#fff" },
                      { label: "Buy SMS",     tab: "buy-sms",     bg: "rgba(255,255,255,0.15)", color: "#fff" },
                    ].map((btn) => (
                      <button
                        key={btn.tab}
                        onClick={() => setActiveTab(btn.tab)}
                        style={{
                          background: btn.bg, color: btn.color,
                          border: "2px solid rgba(255,255,255,0.4)",
                          borderRadius: 10, padding: "12px 24px",
                          fontWeight: 700, fontSize: 15, cursor: "pointer",
                          transition: "transform 0.15s",
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                        onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                      >{btn.label}</button>
                    ))}
                  </div>
                </div>

                {/* Stats strip */}
                <div style={{
                  marginTop: 56,
                  display: "flex", flexWrap: "wrap", gap: 24,
                }}>
                  {[
                    { value: "10s",  label: "Avg Delivery" },
                    { value: "99%",  label: "Success Rate" },
                    { value: "24/7", label: "Support" },
                    { value: "100%", label: "M-PESA Secure" },
                  ].map((s) => (
                    <div key={s.label} style={{ background: "rgba(255,255,255,0.15)", borderRadius: 12, padding: "14px 24px", minWidth: 110 }}>
                      <div style={{ fontSize: 26, fontWeight: 800 }}>{s.value}</div>
                      <div style={{ fontSize: 12, opacity: 0.8 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Features */}
            <div style={{ background: "#fff", padding: "64px 20px" }}>
              <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <SectionHeader title="Why Choose WeberTech?" subtitle="Fast, secure, and reliable digital services for every Kenyan" />
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
                  {[
                    { icon: <FaBolt />, title: "Instant Delivery", desc: "Bundles arrive within 10 seconds of M-PESA payment confirmation.", color: "#16a34a" },
                    { icon: <FaLock />, title: "Secure Payments", desc: "Official Safaricom M-PESA STK Push. We never see your PIN.", color: "#2563eb" },
                    { icon: <FaHeadset />, title: "24/7 Support", desc: "WhatsApp support available around the clock. Average response: 2 min.", color: "#7c3aed" },
                  ].map((f) => (
                    <div
                      key={f.title}
                      className="card-hover"
                      style={{
                        border: "1.5px solid var(--border)", borderRadius: "var(--radius)",
                        padding: "28px 24px", display: "flex", flexDirection: "column", gap: 12
                      }}
                    >
                      <div style={{
                        width: 48, height: 48, borderRadius: 12,
                        background: f.color + "18", display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 20, color: f.color
                      }}>{f.icon}</div>
                      <h3 style={{ fontWeight: 700, fontSize: 17 }}>{f.title}</h3>
                      <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
                    </div>
                  ))}
                </div>

                {/* CTA Banner */}
                <div style={{
                  marginTop: 48,
                  background: "linear-gradient(135deg, #15803d, #16a34a)",
                  borderRadius: 18, padding: "36px 32px",
                  display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20
                }}>
                  <div>
                    <h3 style={{ color: "#fff", fontSize: 22, fontWeight: 800 }}>Need help? We're on WhatsApp 24/7</h3>
                    <p style={{ color: "rgba(255,255,255,0.8)", marginTop: 6 }}>+254 722 508 904 — Response in under 2 minutes</p>
                  </div>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      background: "#fff", color: "var(--primary)",
                      padding: "12px 26px", borderRadius: 10,
                      fontWeight: 700, fontSize: 15, textDecoration: "none",
                      display: "flex", alignItems: "center", gap: 8,
                    }}
                  >
                    <FaWhatsapp style={{ fontSize: 18 }} /> Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ══ BUY DATA ══ */}
        {activeTab === "buy-data" && (
          <div style={{ padding: "48px 20px", minHeight: "100vh", background: "var(--bg)" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <SectionHeader title="Data Bundles" subtitle="Instant Safaricom data — from 1 hour to 30 days" />
              <NumberInputs
                receivingNumber={receivingNumber} setReceivingNumber={setReceivingNumber}
                mpesaNumber={mpesaNumber} setMpesaNumber={setMpesaNumber}
                label="Data Bundle"
              />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 18 }}>
                {dataBundles.map((b) => (
                  <BundleCard key={b.size + b.time} bundle={b} type="Data" onBuy={initiateStkPush} loading={loading} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ BUY MINUTES ══ */}
        {activeTab === "buy-minutes" && (
          <div style={{ padding: "48px 20px", minHeight: "100vh", background: "var(--bg)" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <SectionHeader title="Minutes Bundles" subtitle="Ongea bila stress — minutes delivered in seconds" />
              <NumberInputs
                receivingNumber={receivingNumber} setReceivingNumber={setReceivingNumber}
                mpesaNumber={mpesaNumber} setMpesaNumber={setMpesaNumber}
                label="Minutes Bundle"
              />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 18 }}>
                {minutesBundles.map((b) => (
                  <BundleCard key={b.size} bundle={b} type="Minutes" onBuy={initiateStkPush} loading={loading} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ BUY SMS ══ */}
        {activeTab === "buy-sms" && (
          <div style={{ padding: "48px 20px", minHeight: "100vh", background: "var(--bg)" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <SectionHeader title="SMS Bundles" subtitle="SMS mob — chat na wote kwa bei nafuu" />
              <NumberInputs
                receivingNumber={receivingNumber} setReceivingNumber={setReceivingNumber}
                mpesaNumber={mpesaNumber} setMpesaNumber={setMpesaNumber}
                label="SMS Bundle"
              />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 18 }}>
                {smsBundles.map((b) => (
                  <BundleCard key={b.size} bundle={b} type="SMS" onBuy={initiateStkPush} loading={loading} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ TRACK ORDER ══ */}
        {activeTab === "track-order" && (
          <div style={{ padding: "48px 20px", minHeight: "100vh", background: "var(--bg)" }}>
            <div style={{ maxWidth: 700, margin: "0 auto" }}>
              <SectionHeader title="Track Your Order" subtitle="Enter your transaction ID to check status" />

              {/* Search box */}
              <div style={{
                background: "#fff", borderRadius: "var(--radius)",
                padding: 24, boxShadow: "var(--shadow)", marginBottom: 28,
                display: "flex", gap: 12, flexWrap: "wrap"
              }}>
                <input
                  className="input-field"
                  style={{ flex: 1, minWidth: 200 }}
                  type="text"
                  placeholder="e.g. TXN_WT_0001"
                  value={txnId}
                  onChange={(e) => setTxnId(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && trackOrder()}
                />
                <button
                  className="btn-primary"
                  style={{ padding: "14px 24px", display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}
                  onClick={trackOrder}
                >
                  <FaSearch /> Track
                </button>
              </div>

              {/* Result */}
              {txnResult && (
                <div className="fade-up" style={{
                  background: "#fff", borderRadius: "var(--radius)",
                  padding: 24, boxShadow: "var(--shadow)", marginBottom: 28,
                  border: txnResult.error ? "1.5px solid #fca5a5" : "1.5px solid #86efac"
                }}>
                  {txnResult.error ? (
                    <p style={{ color: "#dc2626", fontWeight: 600 }}>❌ {txnResult.error}</p>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontWeight: 700, fontSize: 16 }}>{txnResult.id}</span>
                        <span className={`badge ${txnResult.status === "Completed" ? "badge-green" : "badge-yellow"}`}>
                          {txnResult.status}
                        </span>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 14, color: "var(--muted)" }}>
                        <span>Bundle: <strong style={{ color: "var(--text)" }}>{txnResult.bundle}</strong></span>
                        <span>Amount: <strong style={{ color: "var(--text)" }}>{txnResult.amount}</strong></span>
                        <span>Number: <strong style={{ color: "var(--text)" }}>{txnResult.number}</strong></span>
                        <span>Date: <strong style={{ color: "var(--text)" }}>{txnResult.date}</strong></span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Recent transactions */}
              <h2 style={{ fontWeight: 700, fontSize: 18, marginBottom: 14 }}>Recent Transactions</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {mockTransactions.map((t) => (
                  <div
                    key={t.id}
                    className="card-hover"
                    style={{
                      background: "#fff", borderRadius: "var(--radius)",
                      padding: "16px 20px", boxShadow: "var(--shadow)",
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                    }}
                  >
                    <div>
                      <p style={{ fontWeight: 700 }}>{t.id}</p>
                      <p style={{ fontSize: 13, color: "var(--muted)" }}>{t.bundle} · {t.date}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontWeight: 700 }}>{t.amount}</p>
                      <span className={`badge ${t.status === "Completed" ? "badge-green" : "badge-yellow"}`}>
                        {t.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ SUPPORT ══ */}
        {activeTab === "support" && (
          <div style={{ padding: "48px 20px", minHeight: "100vh", background: "var(--bg)" }}>
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
              <SectionHeader title="Support Center" subtitle="We're here to help — 24/7" />

              {/* Contact cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 48 }}>
                {[
                  { icon: <FaEnvelope />, label: "Email", value: "support@webertech.co.ke", href: "mailto:support@webertech.co.ke", color: "#2563eb" },
                  { icon: <FaPhone />,    label: "Phone", value: "+254 722 508 904",         href: "tel:+254722508904",            color: "#16a34a" },
                  { icon: <FaWhatsapp />, label: "WhatsApp", value: "+254 722 508 904",      href: WHATSAPP_LINK,                  color: "#25d366" },
                ].map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                    className="card-hover"
                    style={{
                      background: "#fff", borderRadius: "var(--radius)",
                      padding: "24px 20px", textAlign: "center",
                      textDecoration: "none", boxShadow: "var(--shadow)",
                      border: "1.5px solid var(--border)",
                      display: "flex", flexDirection: "column", alignItems: "center", gap: 10
                    }}
                  >
                    <div style={{
                      width: 48, height: 48, borderRadius: 12,
                      background: c.color + "18", display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: 20, color: c.color
                    }}>{c.icon}</div>
                    <p style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{c.label}</p>
                    <p style={{ color: c.color, fontSize: 13, fontWeight: 600 }}>{c.value}</p>
                  </a>
                ))}
              </div>

              {/* FAQ */}
              <h2 style={{ fontWeight: 800, fontSize: 22, marginBottom: 18 }}>Frequently Asked Questions</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    style={{
                      background: "#fff", borderRadius: "var(--radius)",
                      boxShadow: "var(--shadow)", border: "1.5px solid var(--border)", overflow: "hidden"
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      style={{
                        width: "100%", padding: "18px 22px", textAlign: "left",
                        background: "none", border: "none", cursor: "pointer",
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        fontWeight: 600, fontSize: 15, color: "var(--text)"
                      }}
                    >
                      {faq.q}
                      <span style={{
                        fontSize: 18, color: "var(--primary)",
                        transform: openFaq === i ? "rotate(45deg)" : "none",
                        transition: "transform 0.2s"
                      }}>+</span>
                    </button>
                    {openFaq === i && (
                      <div className="fade-up" style={{ padding: "0 22px 18px", color: "var(--muted)", fontSize: 14, lineHeight: 1.7 }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <div style={{
                marginTop: 40, background: "#25d366", borderRadius: "var(--radius)",
                padding: "28px 28px", display: "flex", flexWrap: "wrap",
                alignItems: "center", justifyContent: "space-between", gap: 16
              }}>
                <div>
                  <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 18 }}>Still need help?</h3>
                  <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, marginTop: 4 }}>
                    Chat with us on WhatsApp — we reply in under 2 minutes.
                  </p>
                </div>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: "#fff", color: "#25d366",
                    padding: "11px 22px", borderRadius: 10,
                    fontWeight: 700, fontSize: 14, textDecoration: "none",
                    display: "flex", alignItems: "center", gap: 8
                  }}
                >
                  <FaWhatsapp style={{ fontSize: 18 }} /> Open WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ── Footer ── */}
        <footer style={{
          background: "#111827", color: "rgba(255,255,255,0.6)",
          padding: "28px 20px", textAlign: "center", fontSize: 13
        }}>
          <p style={{ fontWeight: 700, color: "#fff", fontSize: 15, marginBottom: 6 }}>
            Weber<span style={{ color: "#4ade80" }}>Tech</span>
          </p>
          <p>© {new Date().getFullYear()} WeberTech. All rights reserved. · support@webertech.co.ke · +254 722 508 904</p>
        </footer>
      </div>

      {/* Responsive helper */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-only { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-only { display: none !important; }
        }
      `}</style>
    </>
  );
}
