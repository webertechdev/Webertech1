// ─────────────────────────────────────────────────────────────────
//  WeberTech — Coming Soon Pages
//  Academy / Electronics / Cyber / Dev / Hustle / NotFound
//  Each saves waitlist/notify to Firestore
//  Export each as default from its own file — copy/split as needed
//  OR import from here directly
// ─────────────────────────────────────────────────────────────────

import { useState } from "react";
import { Link }     from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db }       from "../config/firebase";
import { toast, Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FaGraduationCap, FaShoppingBag, FaPrint, FaLaptop,
  FaFire, FaArrowLeft, FaWhatsapp, FaBell, FaSpinner,
  FaCheckCircle, FaHome
} from "react-icons/fa";

const WHATSAPP = "https://wa.me/254722508904";

// ── Shared ComingSoon component ──────────────────────────────────
function ComingSoon({
  icon, title, subtitle, description, collection: col,
  fields = ["email"], buttonLabel = "Notify Me",
  accentColor = "#16a34a", accentBg = "#dcfce7",
  gradient = "linear-gradient(135deg,#0f172a,#14532d,#15803d)",
  features = [],
}) {
  const [form, setForm]     = useState({ name:"", email:"", phone:"" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const submit = async () => {
    if (fields.includes("email") && !form.email.includes("@")) { toast.error("Enter a valid email"); return; }
    if (fields.includes("phone") && !/^(\+254|0)?7\d{8}$/.test(form.phone)) { toast.error("Enter a valid phone number"); return; }
    setLoading(true);
    try {
      await addDoc(collection(db, col), {
        ...form,
        createdAt: serverTimestamp(),
        page: title,
      });
      setSubmitted(true);
      toast.success("You're on the list! We'll notify you 🎉");
    } catch { toast.error("Something went wrong. Try again."); }
    setLoading(false);
  };

  return (
    <>
      <Toaster position="top-center" />
      <Navbar />
      <div style={{ paddingTop:64, minHeight:"100vh", display:"flex", flexDirection:"column" }}>

        {/* Hero */}
        <div style={{ background:gradient, padding:"72px 20px 64px", position:"relative", overflow:"hidden", flex:1, display:"flex", alignItems:"center" }}>
          {/* Decorative blobs */}
          <div style={{ position:"absolute", top:-80, right:-80, width:340, height:340, borderRadius:"50%", background:"rgba(255,255,255,0.05)", animation:"pulse 5s ease-in-out infinite" }} />
          <div style={{ position:"absolute", bottom:-60, left:-60, width:260, height:260, borderRadius:"50%", background:"rgba(255,255,255,0.04)", animation:"pulse 7s ease-in-out infinite 2s" }} />

          <div style={{ maxWidth:1000, margin:"0 auto", width:"100%", position:"relative", zIndex:1 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 400px", gap:60, alignItems:"center" }}>

              {/* Left */}
              <div>
                <Link to="/" style={{ display:"inline-flex", alignItems:"center", gap:6, color:"rgba(255,255,255,0.6)", fontSize:13, fontWeight:600, textDecoration:"none", marginBottom:28 }}>
                  <FaArrowLeft style={{ fontSize:11 }} /> Back to Home
                </Link>

                <div style={{ width:64, height:64, borderRadius:18, background:"rgba(255,255,255,0.12)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, color:"#fff", marginBottom:20 }}>
                  {icon}
                </div>

                <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:99, padding:"5px 14px", fontSize:12.5, fontWeight:700, color:"rgba(255,255,255,0.85)", marginBottom:18 }}>
                  🚀 Coming Soon
                </div>

                <h1 style={{ fontSize:"clamp(30px,6vw,52px)", fontWeight:900, color:"#fff", lineHeight:1.1, letterSpacing:"-1px", marginBottom:16 }}>
                  {title}
                </h1>
                <p style={{ fontSize:17, color:"rgba(255,255,255,0.7)", lineHeight:1.7, marginBottom:20, maxWidth:480 }}>
                  {description}
                </p>

                {features.length > 0 && (
                  <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:28 }}>
                    {features.map(f => (
                      <div key={f} style={{ display:"flex", alignItems:"center", gap:10, color:"rgba(255,255,255,0.85)", fontSize:14.5 }}>
                        <FaCheckCircle style={{ color:"#4ade80", flexShrink:0 }} /> {f}
                      </div>
                    ))}
                  </div>
                )}

                <a href={WHATSAPP} target="_blank" rel="noreferrer"
                  style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"12px 22px", background:"rgba(255,255,255,0.12)", border:"1.5px solid rgba(255,255,255,0.2)", borderRadius:11, color:"#fff", fontWeight:700, fontSize:14, textDecoration:"none" }}>
                  <FaWhatsapp style={{ color:"#4ade80" }} /> Chat with Us on WhatsApp
                </a>
              </div>

              {/* Signup card */}
              <div style={{ background:"#fff", borderRadius:20, padding:"32px 28px", boxShadow:"0 24px 64px rgba(0,0,0,0.2)" }}>
                {submitted ? (
                  <div style={{ textAlign:"center", padding:"20px 0" }}>
                    <div style={{ fontSize:56, marginBottom:16 }}>🎉</div>
                    <h3 style={{ fontWeight:800, fontSize:20, marginBottom:10 }}>You're on the list!</h3>
                    <p style={{ color:"#6b7280", fontSize:14.5, lineHeight:1.6, marginBottom:24 }}>
                      We'll notify you as soon as <strong>{title}</strong> launches. Keep an eye on your inbox!
                    </p>
                    <Link to="/" style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"11px 20px", background:accentColor, borderRadius:10, color:"#fff", fontWeight:700, fontSize:14, textDecoration:"none" }}>
                      <FaHome /> Back to Home
                    </Link>
                  </div>
                ) : (
                  <>
                    <div style={{ textAlign:"center", marginBottom:22 }}>
                      <div style={{ width:48, height:48, borderRadius:14, background:accentBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, color:accentColor, margin:"0 auto 12px" }}>
                        <FaBell />
                      </div>
                      <h3 style={{ fontWeight:800, fontSize:19, marginBottom:6 }}>{buttonLabel}</h3>
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

                      <button
                        onClick={submit}
                        disabled={loading}
                        style={{ padding:"13px 0", background:loading?"#9ca3af":accentColor, color:"#fff", border:"none", borderRadius:11, fontWeight:700, fontSize:15, cursor:loading?"not-allowed":"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, transition:"all .15s", marginTop:4 }}>
                        {loading ? <FaSpinner style={{ animation:"spin .7s linear infinite" }} /> : <><FaBell /> {buttonLabel}</>}
                      </button>
                    </div>

                    <p style={{ textAlign:"center", fontSize:12, color:"#9ca3af", marginTop:14 }}>
                      No spam. We'll only contact you when it launches.
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
        @keyframes pulse { 0%,100%{transform:scale(1)}50%{transform:scale(1.06)} }
        @keyframes spin   { to{transform:rotate(360deg)} }
        @media (max-width:768px) {
          .cs-grid { grid-template-columns:1fr !important; }
        }
      `}</style>
    </>
  );
}

const inputStyle = {
  width:"100%", padding:"12px 15px", border:"1.5px solid #e5e7eb",
  borderRadius:10, fontSize:15, outline:"none", fontFamily:"inherit",
  transition:"border-color .15s",
};

// ── ACADEMY ─────────────────────────────────────────────────────
export function Academy() {
  return (
    <ComingSoon
      icon={<FaGraduationCap />}
      title="WeberTech Academy"
      subtitle="Be first to enroll when we launch."
      description="Master digital skills — web development, graphic design, digital marketing, and more. Earn certificates, get real projects, and build your freelance career."
      collection="academy_waitlist"
      fields={["name","email","phone"]}
      buttonLabel="Join Waitlist"
      accentColor="#d97706"
      accentBg="#fef3c7"
      gradient="linear-gradient(135deg,#0f172a,#451a03,#92400e)"
      features={[
        "Web development & app building",
        "Graphic design & branding",
        "Digital marketing & social media",
        "Earn while you learn — paid projects",
        "Certificate of completion",
      ]}
    />
  );
}

// ── ELECTRONICS ──────────────────────────────────────────────────
export function Electronics() {
  return (
    <ComingSoon
      icon={<FaShoppingBag />}
      title="WeberTech Electronics"
      subtitle="Get notified when our store goes live."
      description="Quality smartphones, accessories, gadgets and more — delivered across Kenya. Affordable prices, genuine products, and M-PESA payments."
      collection="electronics_notify"
      fields={["name","email","phone"]}
      buttonLabel="Notify Me"
      accentColor="#7c3aed"
      accentBg="#ede9fe"
      gradient="linear-gradient(135deg,#0f172a,#2e1065,#7c3aed)"
      features={[
        "Smartphones & tablets",
        "Accessories & cables",
        "Genuine products only",
        "M-PESA payments accepted",
        "Delivery across Kenya",
      ]}
    />
  );
}

// ── CYBER ────────────────────────────────────────────────────────
export function Cyber() {
  return (
    <ComingSoon
      icon={<FaPrint />}
      title="WeberTech Cyber"
      subtitle="Be first to know when we open."
      description="Professional printing, scanning, photocopying, internet access, and digital services — all under one roof at WeberTech Cyber."
      collection="cyber_notify"
      fields={["name","email"]}
      buttonLabel="Notify Me"
      accentColor="#dc2626"
      accentBg="#fee2e2"
      gradient="linear-gradient(135deg,#0f172a,#450a0a,#dc2626)"
      features={[
        "Colour & B&W printing",
        "Document scanning & PDF",
        "Fast internet access",
        "Lamination & binding",
        "Passport photo printing",
      ]}
    />
  );
}

// ── DEV ──────────────────────────────────────────────────────────
export function Dev() {
  return (
    <ComingSoon
      icon={<FaLaptop />}
      title="WeberTech Dev"
      subtitle="Tell us what you need built."
      description="Custom websites, web apps, mobile apps, e-commerce stores, and business systems — built by WeberTech's development team at affordable Kenyan rates."
      collection="dev_inquiries"
      fields={["name","email","phone"]}
      buttonLabel="Request a Quote"
      accentColor="#0891b2"
      accentBg="#cffafe"
      gradient="linear-gradient(135deg,#0f172a,#0c4a6e,#0891b2)"
      features={[
        "Business websites & portfolios",
        "E-commerce & online stores",
        "Mobile apps (Android & iOS)",
        "Custom management systems",
        "Affordable Kenyan pricing",
      ]}
    />
  );
}

// ── HUSTLE ───────────────────────────────────────────────────────
export function Hustle() {
  return (
    <ComingSoon
      icon={<FaFire />}
      title="WeberTech Hustle"
      subtitle="Join Kenya's digital hustle community."
      description="Side hustles, reseller opportunities, affiliate programs, and digital income streams — curated by WeberTech to help Kenyans earn online."
      collection="hustle_waitlist"
      fields={["name","email","phone"]}
      buttonLabel="Join the Hustle"
      accentColor="#ea580c"
      accentBg="#ffedd5"
      gradient="linear-gradient(135deg,#0f172a,#431407,#ea580c)"
      features={[
        "Bundle reseller program",
        "Affiliate commissions",
        "Digital product sales",
        "Online gig opportunities",
        "Weekly payouts via M-PESA",
      ]}
    />
  );
}

// ── NOT FOUND ────────────────────────────────────────────────────
export function NotFound() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop:64, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#f9fafb", padding:"80px 20px" }}>
        <div style={{ textAlign:"center", maxWidth:480 }}>
          <div style={{ fontSize:80, marginBottom:16 }}>🔍</div>
          <h1 style={{ fontSize:"clamp(28px,6vw,52px)", fontWeight:900, color:"#111827", letterSpacing:"-1px", marginBottom:12 }}>
            404
          </h1>
          <h2 style={{ fontSize:22, fontWeight:700, marginBottom:12 }}>Page Not Found</h2>
          <p style={{ color:"#6b7280", fontSize:15.5, lineHeight:1.7, marginBottom:32 }}>
            Hmm, this page doesn't exist. You might have mistyped the URL or the page was moved.
          </p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <Link to="/" style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"13px 24px", background:"linear-gradient(135deg,#15803d,#16a34a)", borderRadius:11, color:"#fff", fontWeight:700, fontSize:15, textDecoration:"none" }}>
              <FaHome /> Go Home
            </Link>
            <Link to="/bundles" style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"13px 22px", border:"2px solid #e5e7eb", borderRadius:11, color:"#374151", fontWeight:700, fontSize:15, textDecoration:"none", background:"#fff" }}>
              Buy Bundles
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// Default export for direct import
export default { Academy, Electronics, Cyber, Dev, Hustle, NotFound };
