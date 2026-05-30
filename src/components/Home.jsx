// src/pages/Home.jsx
// Full landing page:
// - Animated services carousel (auto-rotating, no scroll needed)
// - All services balanced — bundles not over-advertised
// - FAQs section
// - What's offered per service listed clearly
// - Uses public/ logo assets

import { useState, useEffect, useRef } from "react";
import { Link }   from "react-router-dom";
import Navbar     from "../components/Navbar";
import Footer     from "../components/Footer";

const BUNDLES = "https://bundles.webertech.co.ke";
const WA      = "https://wa.me/254722508904";

// ── Services data ───────────────────────────────────────────────
const SERVICES = [
  {
    emoji: "📡",
    label: "Bundles",
    tagline: "Instant Safaricom Bundles via M-PESA",
    color: "#16a34a",
    bg: "linear-gradient(135deg,#15803d,#16a34a,#4ade80)",
    href: BUNDLES,
    ext: true,
    items: [
      "Safaricom Data Bundles — from KES 19",
      "Safaricom Minutes Bundles — from KES 20",
      "Safaricom SMS Bundles — from KES 9",
      "Discounted Safaricom Airtime",
      "Buy for yourself or any number",
      "Instant delivery in under 10 seconds",
    ],
  },
  {
    emoji: "💻",
    label: "Dev Services",
    tagline: "Professional Digital Solutions",
    color: "#0891b2",
    bg: "linear-gradient(135deg,#0c4a6e,#0891b2,#22d3ee)",
    to: "/dev",
    ext: false,
    items: [
      "Business Websites & Portfolios",
      "E-commerce & Online Stores",
      "Mobile Apps (Android & iOS)",
      "Custom Management Systems",
      "Branding & UI/UX Design",
      "Affordable Kenyan Pricing",
    ],
  },
  {
    emoji: "🖨",
    label: "Cyber Services",
    tagline: "KRA, HELB, eCitizen & More",
    color: "#dc2626",
    bg: "linear-gradient(135deg,#450a0a,#dc2626,#f87171)",
    to: "/cyber",
    ext: false,
    items: [
      "KRA, HELB, NTSA, eCitizen Services",
      "Colour & B&W Printing",
      "Document Scanning & PDF",
      "Fast Internet Access",
      "Lamination & Binding",
      "Passport Photo Printing",
    ],
  },
  {
    emoji: "🎓",
    label: "Academy",
    tagline: "Learn Digital Skills & Earn",
    color: "#d97706",
    bg: "linear-gradient(135deg,#451a03,#92400e,#f59e0b)",
    to: "/academy",
    ext: false,
    items: [
      "Web Development & App Building",
      "Forex & Crypto Trading Signals",
      "Graphic Design & Branding",
      "Digital Marketing & Social Media",
      "CV Writing & Business Plans",
      "Certificate of Completion",
    ],
  },
  {
    emoji: "📱",
    label: "Electronics",
    tagline: "Quality Gadgets & Appliances",
    color: "#7c3aed",
    bg: "linear-gradient(135deg,#2e1065,#7c3aed,#a78bfa)",
    to: "/electronics",
    ext: false,
    items: [
      "Smartphones & Tablets",
      "TVs, Fridges & Woofers",
      "Accessories & Cables",
      "Electrical Fittings",
      "Genuine Products Only",
      "Delivery Across Kenya",
    ],
  },
  {
    emoji: "🔥",
    label: "Hustle KE",
    tagline: "Start. Grow. Earn. Repeat.",
    color: "#ea580c",
    bg: "linear-gradient(135deg,#431407,#ea580c,#fb923c)",
    to: "/hustle",
    ext: false,
    items: [
      "Bundle Reseller Program",
      "AGPO Registration Assistance",
      "Affiliate Commissions",
      "Business Plan Writing",
      "Digital Product Sales",
      "Weekly M-PESA Payouts",
    ],
  },
];

const FAQS = [
  { q: "How do I buy Safaricom bundles?", a: "Visit bundles.webertech.co.ke, choose your bundle, enter your number, pay via M-PESA STK Push and receive your bundle in under 10 seconds." },
  { q: "Can I buy a bundle for another number?", a: "Yes! On the bundles page, select 'Buy for other number' and enter the recipient's Safaricom number. Perfect for gifting bundles to family and friends." },
  { q: "What services does WeberTech offer?", a: "WeberTech offers Safaricom Bundles, Web Dev Services, Cyber Services (printing, eCitizen, KRA), Academy training, Electronics, and Hustle opportunities — all from Mombasa, Kenya." },
  { q: "How do I contact WeberTech support?", a: "WhatsApp us on +254 722 508 904 or email support@webertech.co.ke. Our AI chat is also available 24/7 on this page — click the green tab on the right." },
  { q: "Are payments secure?", a: "All bundle payments go through Safaricom's official M-PESA STK Push. We never store your M-PESA PIN. 100% secure." },
  { q: "How does the Academy work?", a: "Join our waitlist at webertech.co.ke/academy. We offer courses in web development, trading, design, and digital marketing with real certificates upon completion." },
  { q: "Do you deliver Electronics across Kenya?", a: "Yes, we deliver electronics across Kenya. Join the notify list at webertech.co.ke/electronics to be first when the store launches." },
  { q: "What is Hustle KE?", a: "Hustle KE is our reseller and affiliate program. Earn commissions selling bundles, help with AGPO registration, business plans, and more — with weekly M-PESA payouts." },
];

// ── Animated carousel card ──────────────────────────────────────
function ServiceCarousel() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const goTo = (idx) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setCurrent(idx); setAnimating(false); }, 300);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % SERVICES.length);
    }, 3500);
    return () => clearInterval(timerRef.current);
  }, []);

  const s = SERVICES[current];

  const CardLink = ({ children, style, className }) =>
    s.ext
      ? <a href={s.href} target="_blank" rel="noreferrer" style={style} className={className}>{children}</a>
      : <Link to={s.to} style={style} className={className}>{children}</Link>;

  return (
    <div style={{ width:"100%", maxWidth:520 }}>
      {/* Main card */}
      <CardLink style={{ textDecoration:"none", display:"block" }}>
        <div style={{
          background: s.bg,
          borderRadius: 24,
          padding: "36px 32px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          opacity: animating ? 0 : 1,
          transform: animating ? "translateY(10px) scale(0.98)" : "translateY(0) scale(1)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          cursor: "pointer",
          minHeight: 320,
        }}>
          <div style={{ fontSize: 64, marginBottom: 14, lineHeight: 1 }}>{s.emoji}</div>
          <h2 style={{ color:"#fff", fontWeight:900, fontSize:"clamp(24px,4vw,36px)", letterSpacing:"-0.5px", marginBottom:8 }}>
            {s.label}
          </h2>
          <p style={{ color:"rgba(255,255,255,0.85)", fontSize:15, marginBottom:22, fontWeight:500 }}>
            {s.tagline}
          </p>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {s.items.map((item, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10, color:"rgba(255,255,255,0.9)", fontSize:13.5 }}>
                <span style={{ width:18, height:18, borderRadius:"50%", background:"rgba(255,255,255,0.25)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, flexShrink:0 }}>✓</span>
                {item}
              </div>
            ))}
          </div>
          <div style={{ marginTop:24, display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.2)", border:"1.5px solid rgba(255,255,255,0.4)", borderRadius:99, padding:"8px 18px", color:"#fff", fontWeight:700, fontSize:13.5 }}>
            Explore {s.label} →
          </div>
        </div>
      </CardLink>

      {/* Dot indicators */}
      <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:18 }}>
        {SERVICES.map((sv, i) => (
          <button key={i} onClick={() => goTo(i)}
            style={{ width: i===current?28:8, height:8, borderRadius:99, border:"none", cursor:"pointer", transition:"all 0.3s ease", background: i===current ? SERVICES[i].color : "rgba(255,255,255,0.3)", padding:0 }}
          />
        ))}
      </div>

      {/* Service name pills */}
      <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:8, marginTop:14 }}>
        {SERVICES.map((sv, i) => (
          <button key={i} onClick={() => goTo(i)}
            style={{ padding:"5px 14px", borderRadius:99, border:`2px solid ${i===current?sv.color:"rgba(255,255,255,0.2)"}`, background: i===current?"rgba(255,255,255,0.15)":"transparent", color: i===current?"#fff":"rgba(255,255,255,0.6)", fontSize:12.5, fontWeight:700, cursor:"pointer", transition:"all 0.2s", fontFamily:"inherit" }}>
            {sv.emoji} {sv.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Service grid card ───────────────────────────────────────────
function ServiceGridCard({ s }) {
  const inner = (
    <div style={{ border:"1.5px solid #e5e7eb", borderRadius:18, padding:"24px 20px", background:"#fff", transition:"all 0.22s", cursor:"pointer", height:"100%" }}
      onMouseOver={e=>{ e.currentTarget.style.transform="translateY(-5px)"; e.currentTarget.style.boxShadow="0 16px 48px rgba(0,0,0,0.1)"; e.currentTarget.style.borderColor="#86efac"; }}
      onMouseOut={e=>{  e.currentTarget.style.transform="none";             e.currentTarget.style.boxShadow="none";                           e.currentTarget.style.borderColor="#e5e7eb"; }}>
      <div style={{ width:52, height:52, borderRadius:14, background: s.bg.includes("gradient") ? s.bg : `linear-gradient(135deg,${s.color}33,${s.color}22)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, marginBottom:14 }}>
        {s.emoji}
      </div>
      <h3 style={{ fontWeight:800, fontSize:17, marginBottom:6, color:"#111827" }}>{s.label}</h3>
      <p style={{ color:"#6b7280", fontSize:13, lineHeight:1.5, marginBottom:14 }}>{s.tagline}</p>
      <div style={{ display:"flex", flexDirection:"column", gap:5, marginBottom:16 }}>
        {s.items.slice(0,3).map((item,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:7, fontSize:12.5, color:"#374151" }}>
            <span style={{ color:s.color, fontSize:10, fontWeight:900 }}>●</span> {item}
          </div>
        ))}
        {s.items.length > 3 && <p style={{ fontSize:12, color:"#9ca3af", marginTop:2 }}>+{s.items.length-3} more</p>}
      </div>
      <span style={{ fontSize:13, fontWeight:700, color:s.color, display:"flex", alignItems:"center", gap:5 }}>
        Explore {s.label} <span style={{ fontSize:16 }}>→</span>
      </span>
    </div>
  );

  return s.ext
    ? <a href={s.href} target="_blank" rel="noreferrer" style={{ textDecoration:"none", display:"block" }}>{inner}</a>
    : <Link to={s.to} style={{ textDecoration:"none", display:"block" }}>{inner}</Link>;
}

// ── FAQ accordion ───────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
      {FAQS.map((faq, i) => (
        <div key={i} style={{ background:"#fff", border:"1.5px solid #e5e7eb", borderRadius:14, overflow:"hidden", transition:"border-color 0.2s", borderColor: open===i?"#86efac":"#e5e7eb" }}>
          <button onClick={() => setOpen(open===i?null:i)}
            style={{ width:"100%", padding:"16px 20px", textAlign:"left", background:"none", border:"none", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", fontWeight:700, fontSize:15, color:"#111827", fontFamily:"inherit" }}>
            {faq.q}
            <span style={{ fontSize:20, color:"#16a34a", transform:open===i?"rotate(45deg)":"none", transition:"transform 0.22s", flexShrink:0, marginLeft:12 }}>+</span>
          </button>
          {open === i && (
            <div style={{ padding:"0 20px 16px", color:"#6b7280", fontSize:14, lineHeight:1.7, borderTop:"1px solid #f3f4f6", paddingTop:12 }}>
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Main page ───────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Segoe UI',system-ui,sans-serif;background:#f9fafb}
        @keyframes blob{0%,100%{transform:scale(1) rotate(0deg)}50%{transform:scale(1.06) rotate(3deg)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        .section-tag{display:inline-flex;align-items:center;gap:6px;background:#dcfce7;color:#15803d;padding:5px 14px;border-radius:99px;font-size:12.5px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;margin-bottom:16px}
        @media(max-width:768px){
          .hero-grid{grid-template-columns:1fr!important}
          .carousel-col{order:-1}
          .services-grid{grid-template-columns:repeat(2,1fr)!important}
        }
        @media(max-width:480px){
          .services-grid{grid-template-columns:1fr!important}
        }
      `}</style>

      <Navbar />

      <div style={{ paddingTop:64 }}>

        {/* ══ HERO ══ */}
        <section style={{ minHeight:"calc(100vh - 64px)", background:"linear-gradient(135deg,#0f172a 0%,#14532d 40%,#166534 70%,#15803d 100%)", padding:"48px 20px 40px", position:"relative", overflow:"hidden", display:"flex", alignItems:"center" }}>
          {/* Background blobs */}
          <div style={{ position:"absolute", top:-120, right:-120, width:500, height:500, borderRadius:"50%", background:"rgba(74,222,128,0.06)", animation:"blob 7s ease-in-out infinite" }} />
          <div style={{ position:"absolute", bottom:-80, left:-80, width:380, height:380, borderRadius:"50%", background:"rgba(74,222,128,0.04)", animation:"blob 9s ease-in-out infinite 3s" }} />
          <div style={{ position:"absolute", top:"40%", left:"35%", width:200, height:200, borderRadius:"50%", background:"rgba(74,222,128,0.03)", animation:"blob 6s ease-in-out infinite 1s" }} />

          <div style={{ maxWidth:1200, margin:"0 auto", width:"100%", position:"relative", zIndex:1 }}>
            <div className="hero-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:48, alignItems:"center" }}>

              {/* Left — text */}
              <div>
                {/* Logo */}
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:28 }}>
                  <img src="/logo-webertech.png" alt="WeberTech" style={{ height:48, width:"auto" }}
                    onError={e => { e.target.style.display="none"; }} />
                </div>

                <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(74,222,128,0.15)", border:"1px solid rgba(74,222,128,0.3)", borderRadius:99, padding:"6px 16px", fontSize:13, fontWeight:600, color:"#4ade80", marginBottom:22 }}>
                  <span style={{ width:7, height:7, borderRadius:"50%", background:"#4ade80", display:"inline-block", animation:"blob 1.5s ease-in-out infinite" }} />
                  Your One-Stop Hub for Digital Services
                </div>

                <h1 style={{ fontSize:"clamp(32px,5vw,56px)", fontWeight:900, color:"#fff", lineHeight:1.08, letterSpacing:"-1.5px", marginBottom:16 }}>
                  Start. Grow.<br />
                  <span style={{ color:"#4ade80" }}>Earn. Repeat.</span>
                </h1>

                <p style={{ fontSize:"clamp(14px,1.8vw,17px)", color:"rgba(255,255,255,0.72)", lineHeight:1.75, maxWidth:480, marginBottom:32 }}>
                  WeberTech is Kenya's digital services ecosystem — bundles, dev, cyber, academy, electronics & hustle opportunities. Everything digital, all in one place.
                </p>

                {/* CTA buttons */}
                <div style={{ display:"flex", flexWrap:"wrap", gap:12, marginBottom:40 }}>
                  {[
                    { label:"🔥 Explore Hustle KE",     href:"/hustle",     ext:false, primary:true  },
                    { label:"📱 Shop Electronics",       href:"/electronics",ext:false, primary:false },
                    { label:"⚡ Buy Bundles",             href:BUNDLES,       ext:true,  primary:false },
                    { label:"🎓 Join Academy",           href:"/academy",    ext:false, primary:false },
                  ].map(btn => {
                    const style = {
                      display:"inline-flex", alignItems:"center", gap:7,
                      padding: btn.primary ? "13px 24px" : "11px 20px",
                      background: btn.primary ? "#16a34a" : "rgba(255,255,255,0.1)",
                      border: `1.5px solid ${btn.primary ? "#16a34a" : "rgba(255,255,255,0.25)"}`,
                      borderRadius:11, fontWeight:700,
                      fontSize: btn.primary ? 15 : 13.5,
                      color:"#fff", textDecoration:"none",
                      boxShadow: btn.primary ? "0 8px 24px rgba(22,163,74,0.4)" : "none",
                      transition:"all 0.15s",
                    };
                    return btn.ext
                      ? <a key={btn.label} href={btn.href} target="_blank" rel="noreferrer" style={style}>{btn.label}</a>
                      : <Link key={btn.label} to={btn.href} style={style}>{btn.label}</Link>;
                  })}
                </div>

                {/* Stats row */}
                <div style={{ display:"flex", flexWrap:"wrap", gap:28 }}>
                  {[
                    ["⚡","10s","Bundle Delivery"],
                    ["✅","99%","Success Rate"],
                    ["🤖","24/7","AI Support"],
                    ["🔒","100%","M-PESA Secure"],
                  ].map(([ic,v,l])=>(
                    <div key={l}>
                      <div style={{ fontSize:20, fontWeight:900, color:"#4ade80", display:"flex", alignItems:"center", gap:6 }}>
                        <span>{ic}</span>{v}
                      </div>
                      <div style={{ fontSize:11.5, color:"rgba(255,255,255,0.55)", marginTop:2 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — animated carousel */}
              <div className="carousel-col" style={{ display:"flex", justifyContent:"center" }}>
                <ServiceCarousel />
              </div>
            </div>
          </div>
        </section>

        {/* ══ ALL SERVICES GRID ══ */}
        <section style={{ padding:"72px 20px", background:"#f9fafb" }}>
          <div style={{ maxWidth:1200, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:48 }}>
              <div className="section-tag">🌐 Our Services & Products</div>
              <h2 style={{ fontSize:"clamp(26px,4vw,42px)", fontWeight:800, letterSpacing:"-0.5px", marginBottom:12 }}>Everything You Need in One Place</h2>
              <p style={{ color:"#6b7280", fontSize:16, maxWidth:520, margin:"0 auto" }}>Digital services for every Kenyan — affordable, instant, and reliable.</p>
            </div>
            <div className="services-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
              {SERVICES.map(s => <ServiceGridCard key={s.label} s={s} />)}
            </div>
          </div>
        </section>

        {/* ══ HOW IT WORKS ══ */}
        <section style={{ padding:"72px 20px", background:"#fff" }}>
          <div style={{ maxWidth:1100, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:48 }}>
              <div className="section-tag">✅ How It Works</div>
              <h2 style={{ fontSize:"clamp(24px,4vw,38px)", fontWeight:800, letterSpacing:"-0.5px" }}>Buy Bundles in 4 Simple Steps</h2>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:20 }}>
              {[
                { n:"01", t:"Visit Bundles Site",  d:"Go to bundles.webertech.co.ke and pick your bundle — data, minutes or SMS." },
                { n:"02", t:"Enter Your Numbers",  d:"Enter the receiving number and your M-PESA payment number." },
                { n:"03", t:"M-PESA STK Push",     d:"Confirm payment by entering your PIN on the prompt on your phone." },
                { n:"04", t:"Instant Delivery",    d:"Bundle delivered in under 10 seconds. No queues, no stress." },
              ].map(s => (
                <div key={s.n} style={{ background:"#fff", border:"1.5px solid #e5e7eb", borderRadius:16, padding:"26px 22px", transition:"border-color 0.2s" }}
                  onMouseOver={e=>e.currentTarget.style.borderColor="#86efac"}
                  onMouseOut={e=>e.currentTarget.style.borderColor="#e5e7eb"}>
                  <div style={{ fontSize:38, fontWeight:900, color:"#dcfce7", lineHeight:1, marginBottom:14 }}>{s.n}</div>
                  <h3 style={{ fontWeight:700, fontSize:16, marginBottom:8 }}>{s.t}</h3>
                  <p style={{ color:"#6b7280", fontSize:14, lineHeight:1.6 }}>{s.d}</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign:"center", marginTop:36 }}>
              <a href={BUNDLES} target="_blank" rel="noreferrer"
                style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"14px 32px", background:"linear-gradient(135deg,#15803d,#16a34a)", borderRadius:12, fontWeight:700, fontSize:15.5, color:"#fff", textDecoration:"none", boxShadow:"0 8px 24px rgba(22,163,74,0.3)" }}>
                ⚡ Start Buying Bundles →
              </a>
            </div>
          </div>
        </section>

        {/* ══ TESTIMONIALS ══ */}
        <section style={{ padding:"72px 20px", background:"#f9fafb" }}>
          <div style={{ maxWidth:1100, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:48 }}>
              <div className="section-tag">⭐ Reviews</div>
              <h2 style={{ fontSize:"clamp(24px,4vw,38px)", fontWeight:800, letterSpacing:"-0.5px" }}>Trusted by Thousands of Kenyans</h2>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:18 }}>
              {[
                { name:"Amina H.",  loc:"Mombasa", text:"WeberTech bundle delivery ni ya haraka sana — sekunde kumi! Ndiyo bora Kenya." },
                { name:"Brian M.",  loc:"Nairobi",  text:"Best platform for digital services in Kenya. Fair prices, always reliable." },
                { name:"John K.",   loc:"Kisumu",   text:"Nimetengeneza website yangu kwa WeberTech Dev. Wanafanya kazi nzuri sana." },
                { name:"Fatuma A.", loc:"Malindi",  text:"Academy courses zimesaidia. Sasa naweza kutengeneza websites kwa customers." },
              ].map(t => (
                <div key={t.name} style={{ background:"#fff", border:"1.5px solid #e5e7eb", borderRadius:16, padding:"22px 20px" }}>
                  <div style={{ fontSize:16, marginBottom:10 }}>⭐⭐⭐⭐⭐</div>
                  <p style={{ color:"#374151", fontSize:14, lineHeight:1.7, marginBottom:14 }}>"{t.text}"</p>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <div style={{ width:36, height:36, borderRadius:"50%", background:"linear-gradient(135deg,#15803d,#4ade80)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, color:"#fff", fontSize:14 }}>{t.name[0]}</div>
                    <div>
                      <p style={{ fontWeight:700, fontSize:14 }}>{t.name}</p>
                      <p style={{ fontSize:12, color:"#9ca3af" }}>{t.loc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FAQS ══ */}
        <section style={{ padding:"72px 20px", background:"#fff" }}>
          <div style={{ maxWidth:800, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:48 }}>
              <div className="section-tag">❓ FAQs</div>
              <h2 style={{ fontSize:"clamp(24px,4vw,38px)", fontWeight:800, letterSpacing:"-0.5px", marginBottom:12 }}>Frequently Asked Questions</h2>
              <p style={{ color:"#6b7280", fontSize:15 }}>Can't find your answer? Chat with our AI or WhatsApp us.</p>
            </div>
            <FAQ />
            <div style={{ textAlign:"center", marginTop:32 }}>
              <a href={WA} target="_blank" rel="noreferrer"
                style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"12px 24px", background:"#25d366", borderRadius:11, fontWeight:700, fontSize:15, color:"#fff", textDecoration:"none" }}>
                💬 Still have questions? WhatsApp Us
              </a>
            </div>
          </div>
        </section>

        {/* ══ FINAL CTA ══ */}
        <section style={{ padding:"72px 20px", background:"linear-gradient(135deg,#0f172a,#14532d,#15803d)" }}>
          <div style={{ maxWidth:700, margin:"0 auto", textAlign:"center" }}>
            <img src="/logo-webertech.png" alt="WeberTech" style={{ height:56, width:"auto", margin:"0 auto 20px", display:"block" }}
              onError={e=>e.target.style.display="none"} />
            <h2 style={{ fontSize:"clamp(26px,5vw,44px)", fontWeight:900, color:"#fff", letterSpacing:"-1px", marginBottom:14 }}>
              Ready to Join the WeberTech Ecosystem?
            </h2>
            <p style={{ color:"rgba(255,255,255,0.72)", fontSize:16, lineHeight:1.7, marginBottom:36 }}>
              Thousands of Kenyans trust WeberTech for fast, affordable digital services. Start today.
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:14, justifyContent:"center" }}>
              <a href={BUNDLES} target="_blank" rel="noreferrer"
                style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"14px 28px", background:"#16a34a", borderRadius:12, fontWeight:700, fontSize:15.5, color:"#fff", textDecoration:"none", boxShadow:"0 8px 24px rgba(22,163,74,0.4)" }}>
                ⚡ Buy Bundles
              </a>
              <a href={WA} target="_blank" rel="noreferrer"
                style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"14px 24px", background:"rgba(255,255,255,0.1)", border:"1.5px solid rgba(255,255,255,0.2)", borderRadius:12, fontWeight:700, fontSize:15.5, color:"#fff", textDecoration:"none" }}>
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
