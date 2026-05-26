// src/pages/ComingSoon.jsx
// Shared coming-soon component — used by Academy, Electronics, Cyber, Dev, Hustle
// Each page imports this and passes its own config

import { useState }    from "react";
import { Link }        from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db }          from "../config/firebase";
import { toast, Toaster } from "react-hot-toast";
import Navbar          from "../components/Navbar";
import Footer          from "../components/Footer";

const WHATSAPP = "https://wa.me/254722508904";

export default function ComingSoon({
  emoji,
  title,
  subtitle,
  description,
  firestoreCollection,
  fields = ["name", "email"],
  buttonLabel = "Notify Me",
  accentColor = "#16a34a",
  accentBg    = "#dcfce7",
  gradient    = "linear-gradient(135deg,#0f172a,#14532d,#15803d)",
  features    = [],
}) {
  const [form,      setForm]      = useState({ name:"", email:"", phone:"" });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const submit = async () => {
    if (fields.includes("email") && !form.email.includes("@")) {
      toast.error("Enter a valid email address"); return;
    }
    if (fields.includes("phone") && !/^(\+254|0)?7\d{8}$/.test(form.phone.replace(/\s/g,""))) {
      toast.error("Enter a valid Safaricom number"); return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, firestoreCollection), {
        ...form, page: title, createdAt: serverTimestamp(),
      });
      setSubmitted(true);
      toast.success("You're on the list! 🎉");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const inputStyle = {
    width:"100%", padding:"12px 15px", border:"1.5px solid #e5e7eb",
    borderRadius:10, fontSize:15, outline:"none", fontFamily:"inherit",
    boxSizing:"border-box",
  };

  return (
    <>
      <style>{`
        @keyframes cs-blob { 0%,100%{transform:scale(1)}50%{transform:scale(1.07)} }
        @keyframes cs-spin  { to{transform:rotate(360deg)} }
        @keyframes cs-fadeu { from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)} }
        .cs-fade { animation:cs-fadeu .5s ease both; }
      `}</style>

      <Toaster position="top-center" />
      <Navbar />

      <div style={{ paddingTop:64, minHeight:"100vh", display:"flex", flexDirection:"column" }}>
        {/* Hero */}
        <div style={{ background:gradient, padding:"72px 20px 64px", position:"relative", overflow:"hidden", flex:1, display:"flex", alignItems:"center" }}>
          <div style={{ position:"absolute", top:-80,  right:-80,  width:340, height:340, borderRadius:"50%", background:"rgba(255,255,255,0.05)", animation:"cs-blob 5s ease-in-out infinite" }} />
          <div style={{ position:"absolute", bottom:-60, left:-60, width:260, height:260, borderRadius:"50%", background:"rgba(255,255,255,0.04)", animation:"cs-blob 7s ease-in-out infinite 2s" }} />

          <div style={{ maxWidth:1000, margin:"0 auto", width:"100%", position:"relative", zIndex:1 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 400px", gap:60, alignItems:"center" }}>

              {/* Left side */}
              <div className="cs-fade">
                <Link to="/" style={{ display:"inline-flex", alignItems:"center", gap:6, color:"rgba(255,255,255,0.6)", fontSize:13, fontWeight:600, textDecoration:"none", marginBottom:28 }}>
                  ← Back to Home
                </Link>

                <div style={{ fontSize:52, marginBottom:16 }}>{emoji}</div>

                <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:99, padding:"5px 14px", fontSize:12.5, fontWeight:700, color:"rgba(255,255,255,0.85)", marginBottom:16 }}>
                  🚀 Coming Soon
                </div>

                <h1 style={{ fontSize:"clamp(28px,6vw,52px)", fontWeight:900, color:"#fff", lineHeight:1.1, letterSpacing:"-1px", marginBottom:14 }}>{title}</h1>
                <p style={{ fontSize:16, color:"rgba(255,255,255,0.7)", lineHeight:1.7, maxWidth:480, marginBottom:24 }}>{description}</p>

                {features.length > 0 && (
                  <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:28 }}>
                    {features.map(f => (
                      <div key={f} style={{ display:"flex", alignItems:"center", gap:10, color:"rgba(255,255,255,0.85)", fontSize:14.5 }}>
                        <span style={{ color:"#4ade80" }}>✓</span> {f}
                      </div>
                    ))}
                  </div>
                )}

                <a href={WHATSAPP} target="_blank" rel="noreferrer"
                  style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"12px 22px", background:"rgba(255,255,255,0.12)", border:"1.5px solid rgba(255,255,255,0.2)", borderRadius:11, color:"#fff", fontWeight:700, fontSize:14, textDecoration:"none" }}>
                  💬 Chat on WhatsApp
                </a>
              </div>

              {/* Right — signup card */}
              <div style={{ background:"#fff", borderRadius:20, padding:"32px 28px", boxShadow:"0 24px 64px rgba(0,0,0,0.2)" }}>
                {submitted ? (
                  <div style={{ textAlign:"center", padding:"20px 0" }}>
                    <div style={{ fontSize:52, marginBottom:14 }}>🎉</div>
                    <h3 style={{ fontWeight:800, fontSize:20, marginBottom:10 }}>You're on the list!</h3>
                    <p style={{ color:"#6b7280", fontSize:14.5, lineHeight:1.6, marginBottom:24 }}>
                      We'll notify you as soon as <strong>{title}</strong> launches.
                    </p>
                    <Link to="/" style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"11px 20px", background:accentColor, borderRadius:10, color:"#fff", fontWeight:700, fontSize:14, textDecoration:"none" }}>
                      🏠 Back to Home
                    </Link>
                  </div>
                ) : (
                  <>
                    <div style={{ textAlign:"center", marginBottom:22 }}>
                      <div style={{ width:48, height:48, borderRadius:14, background:accentBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, margin:"0 auto 12px" }}>
                        🔔
                      </div>
                      <h3 style={{ fontWeight:800, fontSize:18, marginBottom:6 }}>{buttonLabel}</h3>
                      <p style={{ color:"#6b7280", fontSize:13.5 }}>{subtitle}</p>
                    </div>

                    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                      {fields.includes("name") && (
                        <input style={inputStyle} type="text" placeholder="Your Name" value={form.name} onChange={set("name")} />
                      )}
                      {fields.includes("email") && (
                        <input style={inputStyle} type="email" placeholder="Email Address" value={form.email} onChange={set("email")} />
                      )}
                      {fields.includes("phone") && (
                        <input style={inputStyle} type="tel" placeholder="Phone Number (07XX XXX XXX)" value={form.phone} onChange={set("phone")} />
                      )}

                      <button onClick={submit} disabled={loading}
                        style={{ padding:"13px 0", background:loading?"#9ca3af":accentColor, color:"#fff", border:"none", borderRadius:11, fontWeight:700, fontSize:15, cursor:loading?"not-allowed":"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginTop:4, fontFamily:"inherit" }}>
                        {loading
                          ? <span style={{ display:"inline-block", animation:"cs-spin .7s linear infinite" }}>⟳</span>
                          : <>{buttonLabel}</>}
                      </button>
                    </div>

                    <p style={{ textAlign:"center", fontSize:12, color:"#9ca3af", marginTop:14 }}>
                      No spam — only launch updates.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        @media (max-width:768px) {
          div[style*="grid-template-columns: 1fr 400px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
