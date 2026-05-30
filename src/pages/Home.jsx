// src/pages/Home.jsx
// Full-screen carousel hero — fills viewport on load, no scrolling needed
// Services rotate automatically every 3.5s with smooth transitions
// Logo from /public/logo-webertech.png
// All services equally weighted

import { useState, useEffect, useRef, useCallback } from "react";
import { Link }   from "react-router-dom";
import Navbar     from "../components/Navbar";
import Footer     from "../components/Footer";

const BUNDLES = "https://bundles.webertech.co.ke";
const WA      = "https://wa.me/254722508904";

// ── Services (all equal weight — no bundle dominance) ───────────
const SERVICES = [
  {
    id:      "bundles",
    emoji:   "📡",
    label:   "Bundles",
    tagline: "Instant Safaricom Bundles via M-PESA",
    gradient:"linear-gradient(135deg,#064e3b,#065f46,#059669)",
    accent:  "#34d399",
    href:    BUNDLES,
    ext:     true,
    items: [
      "Safaricom Data Bundles — from KES 19",
      "Safaricom Minutes Bundles — from KES 20",
      "Safaricom SMS Bundles — from KES 9",
      "Discounted Safaricom Airtime",
      "Buy for yourself or any Safaricom number",
      "Instant delivery in under 10 seconds",
    ],
  },
  {
    id:      "cyber",
    emoji:   "🖥️",
    label:   "Cyber Services",
    tagline: "Government Services & Printing",
    gradient:"linear-gradient(135deg,#450a0a,#991b1b,#dc2626)",
    accent:  "#fca5a5",
    to:      "/cyber",
    ext:     false,
    items: [
      "KRA, HELB, NTSA, eCitizen Services",
      "Colour & B&W Printing",
      "Document Scanning & PDF Creation",
      "Lamination & Binding",
      "Passport Photo Printing",
      "Fast Internet Access",
    ],
  },
  {
    id:      "hustle",
    emoji:   "🔥",
    label:   "Hustle KE",
    tagline: "Start. Grow. Earn. Repeat.",
    gradient:"linear-gradient(135deg,#431407,#9a3412,#ea580c)",
    accent:  "#fdba74",
    to:      "/hustle",
    ext:     false,
    items: [
      "Bundle Reseller Program",
      "AGPO Registration Assistance",
      "CV Writing & Business Plans",
      "Affiliate Commissions",
      "Digital Product Sales",
      "Weekly M-PESA Payouts",
    ],
  },
  {
    id:      "academy",
    emoji:   "🎓",
    label:   "Academy",
    tagline: "Learn Digital Skills & Earn",
    gradient:"linear-gradient(135deg,#451a03,#92400e,#d97706)",
    accent:  "#fde68a",
    to:      "/academy",
    ext:     false,
    items: [
      "Web Development & App Building",
      "Forex & Crypto Trading Signals",
      "Graphic Design & Branding",
      "Digital Marketing & Social Media",
      "Certificate of Completion",
      "Earn While You Learn",
    ],
  },
  {
    id:      "electronics",
    emoji:   "📺",
    label:   "Electronics",
    tagline: "TVs, Phones, Appliances & More",
    gradient:"linear-gradient(135deg,#1e1b4b,#3730a3,#6366f1)",
    accent:  "#a5b4fc",
    to:      "/electronics",
    ext:     false,
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
    id:      "dev",
    emoji:   "💼",
    label:   "Dev Services",
    tagline: "Websites, Apps & Custom Systems",
    gradient:"linear-gradient(135deg,#0c4a6e,#0369a1,#0ea5e9)",
    accent:  "#7dd3fc",
    to:      "/dev",
    ext:     false,
    items: [
      "Business Websites & Portfolios",
      "E-commerce & Online Stores",
      "Mobile Apps (Android & iOS)",
      "Custom Management Systems",
      "Branding & UI/UX Design",
      "Affordable Kenyan Pricing",
    ],
  },
];

const FAQS = [
  { q:"How do I buy Safaricom bundles?",        a:"Visit bundles.webertech.co.ke, pick your bundle, enter your number, pay via M-PESA STK Push — bundle delivered in under 10 seconds." },
  { q:"Can I buy bundles for another number?",  a:"Yes! Select 'Buy for other number' on the bundles page and enter any Safaricom number. Perfect for family and friends." },
  { q:"What services does WeberTech offer?",    a:"WeberTech offers Safaricom Bundles, Dev Services, Cyber/eCitizen services, Academy training, Electronics, and Hustle KE opportunities — all from Mombasa, Kenya." },
  { q:"How do I contact support?",              a:"WhatsApp us on +254 722 508 904 or email support@webertech.co.ke. Our AI chat is also available 24/7 — click the green tab on the right side of this page." },
  { q:"Are bundle payments secure?",            a:"100% secure. All payments go through Safaricom's official M-PESA STK Push. We never store your PIN." },
  { q:"What is Hustle KE?",                     a:"Hustle KE is our reseller & affiliate program. Earn commissions on bundles, get help with AGPO registration, business plans, and weekly M-PESA payouts." },
];

// ── Full-screen Carousel ────────────────────────────────────────
function HeroCarousel() {
  const [curr,      setCurr]      = useState(0);
  const [prev,      setPrev]      = useState(null);
  const [animDir,   setAnimDir]   = useState("next"); // "next" | "prev"
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback((idx, dir = "next") => {
    if (isAnimating || idx === curr) return;
    setIsAnimating(true);
    setAnimDir(dir);
    setPrev(curr);
    setCurr(idx);
    setTimeout(() => { setPrev(null); setIsAnimating(false); }, 500);
  }, [curr, isAnimating]);

  const next = useCallback(() => goTo((curr + 1) % SERVICES.length, "next"), [curr, goTo]);
  const back  = useCallback(() => goTo((curr - 1 + SERVICES.length) % SERVICES.length, "prev"), [curr, goTo]);

  // Auto-rotate
  useEffect(() => {
    timerRef.current = setInterval(next, 3800);
    return () => clearInterval(timerRef.current);
  }, [next]);

  // Pause on hover
  const pause  = () => clearInterval(timerRef.current);
  const resume = () => { timerRef.current = setInterval(next, 3800); };

  const s    = SERVICES[curr];
  const pSvc = prev !== null ? SERVICES[prev] : null;

  const CardLink = ({ children, style }) =>
    s.ext
      ? <a href={s.href} target="_blank" rel="noreferrer" style={style}>{children}</a>
      : <Link to={s.to} style={style}>{children}</Link>;

  return (
    <>
      <style>{`
        @keyframes slideInNext  { from{opacity:0;transform:translateX(60px)}  to{opacity:1;transform:translateX(0)} }
        @keyframes slideInPrev  { from{opacity:0;transform:translateX(-60px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideOutNext { from{opacity:1;transform:translateX(0)}  to{opacity:0;transform:translateX(-60px)} }
        @keyframes slideOutPrev { from{opacity:1;transform:translateX(0)}  to{opacity:0;transform:translateX(60px)}  }
        @keyframes itemIn { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }

        .hc-card-in-next  { animation: slideInNext  .5s cubic-bezier(.22,1,.36,1) both; }
        .hc-card-in-prev  { animation: slideInPrev  .5s cubic-bezier(.22,1,.36,1) both; }
        .hc-card-out-next { animation: slideOutNext .4s ease both; }
        .hc-card-out-prev { animation: slideOutPrev .4s ease both; }

        .hc-item { animation: itemIn .4s ease both; }
        .hc-item:nth-child(1){animation-delay:.05s}
        .hc-item:nth-child(2){animation-delay:.1s}
        .hc-item:nth-child(3){animation-delay:.15s}
        .hc-item:nth-child(4){animation-delay:.2s}
        .hc-item:nth-child(5){animation-delay:.25s}
        .hc-item:nth-child(6){animation-delay:.3s}

        .hc-dot { transition: all .3s ease; cursor: pointer; border: none; }
        .hc-dot:hover { transform: scale(1.3); }

        .hc-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 40px; height: 40px; border-radius: 50%;
          background: rgba(255,255,255,0.15); border: 1.5px solid rgba(255,255,255,0.3);
          color: #fff; font-size: 18px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all .2s; z-index: 10;
          backdrop-filter: blur(8px);
        }
        .hc-arrow:hover { background: rgba(255,255,255,0.25); transform: translateY(-50%) scale(1.1); }
        .hc-arrow-left  { left: -20px; }
        .hc-arrow-right { right: -20px; }

        .hc-svc-pill {
          padding: 5px 14px; border-radius: 99px; font-size: 12px; font-weight: 700;
          cursor: pointer; transition: all .2s; border: 1.5px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.65);
          font-family: inherit;
        }
        .hc-svc-pill:hover   { background: rgba(255,255,255,0.15); color: #fff; }
        .hc-svc-pill.active  { background: rgba(255,255,255,0.2);  color: #fff; border-color: rgba(255,255,255,0.4); }

        @media(max-width:640px) {
          .hc-arrow { display: none !important; }
        }
      `}</style>

      <div
        style={{ position:"relative", width:"100%", maxWidth:580 }}
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        {/* Arrow left */}
        <button className="hc-arrow hc-arrow-left" onClick={back}>‹</button>

        {/* Card area */}
        <div style={{ position:"relative", overflow:"hidden", borderRadius:24 }}>
          {/* Outgoing card */}
          {pSvc && (
            <div
              key={`out-${pSvc.id}`}
              className={animDir==="next" ? "hc-card-out-next" : "hc-card-out-prev"}
              style={{ position:"absolute", inset:0, background:pSvc.gradient, borderRadius:24, padding:"36px 32px", pointerEvents:"none" }}
            />
          )}

          {/* Current card */}
          <CardLink style={{ textDecoration:"none", display:"block" }}>
            <div
              key={`in-${s.id}`}
              className={isAnimating ? (animDir==="next" ? "hc-card-in-next" : "hc-card-in-prev") : ""}
              style={{ background:s.gradient, borderRadius:24, padding:"36px 32px", boxShadow:"0 24px 64px rgba(0,0,0,0.4)", cursor:"pointer", minHeight:360 }}
            >
              {/* Top row */}
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:20 }}>
                <div style={{ fontSize:64, lineHeight:1 }}>{s.emoji}</div>
                <div style={{ background:"rgba(255,255,255,0.15)", borderRadius:99, padding:"5px 14px", fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.9)" }}>
                  {curr + 1} / {SERVICES.length}
                </div>
              </div>

              <h2 style={{ color:"#fff", fontWeight:900, fontSize:"clamp(22px,4vw,32px)", letterSpacing:"-0.5px", marginBottom:6 }}>
                {s.label}
              </h2>
              <p style={{ color:"rgba(255,255,255,0.75)", fontSize:14, marginBottom:24, fontWeight:500 }}>
                {s.tagline}
              </p>

              {/* Items */}
              <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
                {s.items.map((item, i) => (
                  <div key={i} className="hc-item" style={{ display:"flex", alignItems:"center", gap:10, color:"rgba(255,255,255,0.9)", fontSize:13.5 }}>
                    <div style={{ width:20, height:20, borderRadius:"50%", background:"rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, flexShrink:0, color:s.accent }}>✓</div>
                    {item}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div style={{ marginTop:26, display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.18)", border:`1.5px solid ${s.accent}44`, borderRadius:99, padding:"9px 20px", color:"#fff", fontWeight:700, fontSize:13.5 }}>
                Explore {s.label} →
              </div>
            </div>
          </CardLink>
        </div>

        {/* Arrow right */}
        <button className="hc-arrow hc-arrow-right" onClick={next}>›</button>

        {/* Dot indicators */}
        <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:20 }}>
          {SERVICES.map((sv, i) => (
            <button key={i} className={`hc-dot ${i===curr?"active":""}`}
              onClick={() => goTo(i, i > curr ? "next" : "prev")}
              style={{ width:i===curr?28:8, height:8, borderRadius:99, background:i===curr?sv.accent:"rgba(255,255,255,0.25)", padding:0 }}
            />
          ))}
        </div>

        {/* Service pills */}
        <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:6, marginTop:14 }}>
          {SERVICES.map((sv, i) => (
            <button key={i}
              className={`hc-svc-pill ${i===curr?"active":""}`}
              onClick={() => goTo(i, i > curr ? "next" : "prev")}
              style={{ background:i===curr?`${sv.accent}22`:"rgba(255,255,255,0.08)", borderColor:i===curr?`${sv.accent}55`:"rgba(255,255,255,0.15)", color:i===curr?sv.accent:"rgba(255,255,255,0.6)" }}>
              {sv.emoji} {sv.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

// ── FAQ Accordion ───────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
      {FAQS.map((faq, i) => (
        <div key={i} style={{ background:"#fff", border:`1.5px solid ${open===i?"#86efac":"#e5e7eb"}`, borderRadius:14, overflow:"hidden", transition:"border-color .2s" }}>
          <button onClick={() => setOpen(open===i?null:i)}
            style={{ width:"100%", padding:"16px 20px", textAlign:"left", background:"none", border:"none", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", fontWeight:700, fontSize:15, color:"#111827", fontFamily:"inherit", gap:12 }}>
            <span>{faq.q}</span>
            <span style={{ fontSize:22, color:"#16a34a", transform:open===i?"rotate(45deg)":"none", transition:"transform .22s", flexShrink:0 }}>+</span>
          </button>
          {open===i && (
            <div style={{ padding:"0 20px 16px", color:"#6b7280", fontSize:14, lineHeight:1.7, borderTop:"1px solid #f3f4f6", paddingTop:12 }}>
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Main ────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <style>{`
        *  { box-sizing:border-box; margin:0; padding:0; }
        body { font-family:'Segoe UI',system-ui,sans-serif; background:#f9fafb; }
        @keyframes blob { 0%,100%{transform:scale(1) rotate(0deg)} 50%{transform:scale(1.06) rotate(3deg)} }

        .home-hero {
          min-height: calc(100vh - 62px);
          background: linear-gradient(135deg,#020617 0%,#0f172a 30%,#14532d 65%,#166534 85%,#15803d 100%);
          display: flex; align-items: center;
          padding: 40px 20px;
          position: relative; overflow: hidden;
        }

        .hero-inner {
          max-width: 1280px; margin: 0 auto; width: 100%;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 56px; align-items: center;
        }

        .section-tag {
          display: inline-flex; align-items: center; gap:6px;
          background:#dcfce7; color:#15803d;
          padding:5px 14px; border-radius:99px;
          font-size:12.5px; font-weight:700;
          text-transform:uppercase; letter-spacing:.5px; margin-bottom:16px;
        }

        .svc-card {
          border:1.5px solid #e5e7eb; border-radius:18px;
          padding:22px 18px; background:#fff; text-decoration:none;
          display:block; transition:all .22s;
        }
        .svc-card:hover {
          transform:translateY(-5px);
          box-shadow:0 16px 48px rgba(0,0,0,0.1);
          border-color:#86efac;
        }

        @media(max-width:900px) {
          .hero-inner { grid-template-columns:1fr !important; }
          .hero-text { order:2; text-align:center; }
          .hero-carousel { order:1; }
          .hero-ctas { justify-content:center !important; }
          .hero-stats { justify-content:center !important; }
        }
        @media(max-width:640px) {
          .svc-grid { grid-template-columns:repeat(2,1fr) !important; }
          .home-hero { padding:28px 16px; }
        }
        @media(max-width:420px) {
          .svc-grid { grid-template-columns:1fr !important; }
        }
      `}</style>

      <Navbar />

      {/* ══ HERO — fills viewport ══ */}
      <section className="home-hero" style={{ paddingTop:82 }}>
        {/* Decorative blobs */}
        <div style={{ position:"absolute", top:-140, right:-140, width:520, height:520, borderRadius:"50%", background:"rgba(74,222,128,0.06)", animation:"blob 7s ease-in-out infinite", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:-100, left:-100, width:400, height:400, borderRadius:"50%", background:"rgba(74,222,128,0.04)", animation:"blob 9s ease-in-out infinite 3s", pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:"35%", left:"38%", width:220, height:220, borderRadius:"50%", background:"rgba(74,222,128,0.03)", animation:"blob 6s ease-in-out infinite 1s", pointerEvents:"none" }} />

        <div className="hero-inner">
          {/* ── Left: text + CTAs ── */}
          <div className="hero-text">
            {/* Logo */}
            <div style={{ marginBottom:24 }}>
              <img src="/logo-webertech.png" alt="WeberTech"
                style={{ height:52, width:"auto", filter:"brightness(0) invert(1)" }}
                onError={e => e.target.style.display="none"} />
            </div>

            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(74,222,128,0.15)", border:"1px solid rgba(74,222,128,0.3)", borderRadius:99, padding:"6px 16px", fontSize:13, fontWeight:600, color:"#4ade80", marginBottom:22 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"#4ade80", display:"inline-block", animation:"blob 1.5s ease-in-out infinite" }} />
              Kenya's One-Stop Digital Hub
            </div>

            <h1 style={{ fontSize:"clamp(30px,4.5vw,52px)", fontWeight:900, color:"#fff", lineHeight:1.1, letterSpacing:"-1.5px", marginBottom:16 }}>
              WeberTech Solutions KE
            </h1>
            <p style={{ fontSize:"clamp(15px,1.8vw,18px)", color:"rgba(255,255,255,0.8)", marginBottom:8, fontWeight:700, color:"#4ade80" }}>
              Your One-Stop Hub for Digital Services
            </p>
            <p style={{ fontSize:"clamp(13px,1.5vw,16px)", color:"rgba(255,255,255,0.65)", lineHeight:1.75, maxWidth:460, marginBottom:32 }}>
              Bundles · Dev · Cyber · Academy · Electronics · Hustle KE — everything digital in one Kenyan platform.
            </p>

            {/* CTA buttons */}
            <div className="hero-ctas" style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:36 }}>
              {[
                { label:"🔥 Explore Hustle KE",   href:"/hustle",      ext:false, primary:true  },
                { label:"📺 Shop Electronics",     href:"/electronics", ext:false, primary:false },
                { label:"⚡ Buy Bundles",           href:BUNDLES,        ext:true,  primary:false },
                { label:"🎓 Join Academy",         href:"/academy",     ext:false, primary:false },
              ].map(btn => {
                const st = {
                  display:"inline-flex", alignItems:"center", gap:7, textDecoration:"none",
                  padding:btn.primary?"13px 22px":"10px 18px",
                  background:btn.primary?"#16a34a":"rgba(255,255,255,0.1)",
                  border:`1.5px solid ${btn.primary?"#16a34a":"rgba(255,255,255,0.25)"}`,
                  borderRadius:10, fontWeight:700,
                  fontSize:btn.primary?15:13.5,
                  color:"#fff",
                  boxShadow:btn.primary?"0 8px 24px rgba(22,163,74,0.4)":"none",
                };
                return btn.ext
                  ? <a key={btn.label} href={btn.href} target="_blank" rel="noreferrer" style={st}>{btn.label}</a>
                  : <Link key={btn.label} to={btn.href} style={st}>{btn.label}</Link>;
              })}
            </div>

            {/* Stats */}
            <div className="hero-stats" style={{ display:"flex", flexWrap:"wrap", gap:24 }}>
              {[
                ["⚡","10s","Bundle Delivery"],
                ["✅","99%","Success Rate"],
                ["🤖","24/7","AI Support"],
                ["🔒","100%","M-PESA Secure"],
              ].map(([ic,v,l]) => (
                <div key={l}>
                  <div style={{ fontSize:20, fontWeight:900, color:"#4ade80", display:"flex", alignItems:"center", gap:5 }}>
                    <span>{ic}</span>{v}
                  </div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.5)", marginTop:2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: animated carousel ── */}
          <div className="hero-carousel" style={{ display:"flex", justifyContent:"center" }}>
            <HeroCarousel />
          </div>
        </div>
      </section>

      {/* ══ SERVICES GRID ══ */}
      <section style={{ padding:"72px 20px", background:"#f9fafb" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div className="section-tag">🌐 Our Services & Products</div>
            <h2 style={{ fontSize:"clamp(24px,4vw,40px)", fontWeight:800, letterSpacing:"-0.5px", marginBottom:12 }}>
              Everything You Need in One Place
            </h2>
            <p style={{ color:"#6b7280", fontSize:16, maxWidth:520, margin:"0 auto" }}>
              Digital services for every Kenyan — affordable, instant, and reliable.
            </p>
          </div>

          <div className="svc-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
            {SERVICES.map(s => {
              const inner = (
                <div className="svc-card">
                  <div style={{ width:52, height:52, borderRadius:14, background:s.gradient, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, marginBottom:14 }}>
                    {s.emoji}
                  </div>
                  <h3 style={{ fontWeight:800, fontSize:17, marginBottom:6, color:"#111827" }}>{s.label}</h3>
                  <p style={{ color:"#6b7280", fontSize:13, lineHeight:1.5, marginBottom:14 }}>{s.tagline}</p>
                  <div style={{ display:"flex", flexDirection:"column", gap:5, marginBottom:16 }}>
                    {s.items.slice(0,3).map((item,i) => (
                      <div key={i} style={{ display:"flex", alignItems:"center", gap:7, fontSize:12.5, color:"#374151" }}>
                        <span style={{ fontSize:9, fontWeight:900, color:s.accent||"#16a34a", flexShrink:0 }}>●</span> {item}
                      </div>
                    ))}
                    {s.items.length > 3 && (
                      <p style={{ fontSize:12, color:"#9ca3af", marginTop:2 }}>+{s.items.length-3} more</p>
                    )}
                  </div>
                  <span style={{ fontSize:13, fontWeight:700, color:s.accent||"#16a34a", display:"flex", alignItems:"center", gap:5 }}>
                    Explore {s.label} →
                  </span>
                </div>
              );
              return s.ext
                ? <a key={s.id} href={s.href} target="_blank" rel="noreferrer" style={{ textDecoration:"none", display:"block" }}>{inner}</a>
                : <Link key={s.id} to={s.to} style={{ textDecoration:"none", display:"block" }}>{inner}</Link>;
            })}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section style={{ padding:"72px 20px", background:"#fff" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div className="section-tag">✅ How Bundles Work</div>
            <h2 style={{ fontSize:"clamp(22px,4vw,36px)", fontWeight:800, letterSpacing:"-0.5px" }}>Buy a Bundle in 4 Simple Steps</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))", gap:20 }}>
            {[
              { n:"01", t:"Visit Bundles",     d:"Go to bundles.webertech.co.ke and pick your data, minutes or SMS bundle." },
              { n:"02", t:"Enter Numbers",      d:"Enter the receiving Safaricom number and your M-PESA payment number." },
              { n:"03", t:"M-PESA STK Push",   d:"Enter your PIN on the M-PESA prompt that appears on your phone." },
              { n:"04", t:"Instant Delivery",   d:"Bundle delivered in under 10 seconds. Done — no queues, no stress." },
            ].map(s => (
              <div key={s.n}
                style={{ background:"#fff", border:"1.5px solid #e5e7eb", borderRadius:16, padding:"24px 20px", transition:"border-color .2s" }}
                onMouseOver={e=>e.currentTarget.style.borderColor="#86efac"}
                onMouseOut={e=>e.currentTarget.style.borderColor="#e5e7eb"}>
                <div style={{ fontSize:36, fontWeight:900, color:"#dcfce7", lineHeight:1, marginBottom:12 }}>{s.n}</div>
                <h3 style={{ fontWeight:700, fontSize:15.5, marginBottom:8 }}>{s.t}</h3>
                <p style={{ color:"#6b7280", fontSize:13.5, lineHeight:1.6 }}>{s.d}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:36 }}>
            <a href={BUNDLES} target="_blank" rel="noreferrer"
              style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"13px 30px", background:"linear-gradient(135deg,#15803d,#16a34a)", borderRadius:12, fontWeight:700, fontSize:15, color:"#fff", textDecoration:"none", boxShadow:"0 8px 24px rgba(22,163,74,0.3)" }}>
              ⚡ Buy Bundles Now →
            </a>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section style={{ padding:"72px 20px", background:"#f9fafb" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div className="section-tag">⭐ Reviews</div>
            <h2 style={{ fontSize:"clamp(22px,4vw,36px)", fontWeight:800, letterSpacing:"-0.5px" }}>Trusted by Thousands of Kenyans</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))", gap:18 }}>
            {[
              { name:"Amina H.",  loc:"Mombasa", text:"WeberTech bundle delivery ni ya haraka sana — chini ya sekunde kumi! Ndiyo bora Kenya." },
              { name:"Brian M.",  loc:"Nairobi",  text:"Best digital platform in Kenya. Every service I need is right here — fair prices, always reliable." },
              { name:"John K.",   loc:"Kisumu",   text:"WeberTech Dev wamenitengenezea website nzuri sana. Bei nafuu, kazi bora." },
              { name:"Fatuma A.", loc:"Malindi",  text:"Academy courses zimesaidia pakubwa. Sasa naweza kutengeneza websites na kupata pesa." },
            ].map(t => (
              <div key={t.name} style={{ background:"#fff", border:"1.5px solid #e5e7eb", borderRadius:16, padding:"20px 18px" }}>
                <div style={{ fontSize:15, marginBottom:10 }}>⭐⭐⭐⭐⭐</div>
                <p style={{ color:"#374151", fontSize:13.5, lineHeight:1.7, marginBottom:14 }}>"{t.text}"</p>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:34, height:34, borderRadius:"50%", background:"linear-gradient(135deg,#15803d,#4ade80)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, color:"#fff", fontSize:14 }}>{t.name[0]}</div>
                  <div>
                    <p style={{ fontWeight:700, fontSize:13.5 }}>{t.name}</p>
                    <p style={{ fontSize:11.5, color:"#9ca3af" }}>{t.loc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQS ══ */}
      <section style={{ padding:"72px 20px", background:"#fff" }}>
        <div style={{ maxWidth:780, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div className="section-tag">❓ FAQs</div>
            <h2 style={{ fontSize:"clamp(22px,4vw,36px)", fontWeight:800, letterSpacing:"-0.5px", marginBottom:12 }}>Frequently Asked Questions</h2>
            <p style={{ color:"#6b7280", fontSize:15 }}>Can't find your answer? Chat with our AI or WhatsApp us directly.</p>
          </div>
          <FAQ />
          <div style={{ textAlign:"center", marginTop:30 }}>
            <a href={WA} target="_blank" rel="noreferrer"
              style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"12px 24px", background:"#25d366", borderRadius:11, fontWeight:700, fontSize:15, color:"#fff", textDecoration:"none" }}>
              💬 Still have questions? WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section style={{ padding:"72px 20px", background:"linear-gradient(135deg,#020617,#0f172a,#14532d,#15803d)" }}>
        <div style={{ maxWidth:680, margin:"0 auto", textAlign:"center" }}>
          <img src="/logo-webertech.png" alt="WeberTech"
            style={{ height:56, width:"auto", margin:"0 auto 20px", display:"block", filter:"brightness(0) invert(1)" }}
            onError={e=>e.target.style.display="none"} />
          <h2 style={{ fontSize:"clamp(24px,5vw,42px)", fontWeight:900, color:"#fff", letterSpacing:"-1px", marginBottom:14 }}>
            Ready to Join the WeberTech Ecosystem?
          </h2>
          <p style={{ color:"rgba(255,255,255,0.7)", fontSize:15.5, lineHeight:1.75, marginBottom:36 }}>
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

      <Footer />
    </>
  );
}
