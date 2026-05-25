// ─────────────────────────────────────────────────────────────────
//  WeberTech — src/pages/Home.jsx
//  Full homepage: Hero + Services + How It Works + Testimonials + CTA
// ─────────────────────────────────────────────────────────────────
import { Link } from "react-router-dom";
import Navbar  from "../components/Navbar";
import Footer  from "../components/Footer";
import {
  FaBolt, FaShieldAlt, FaHeadset, FaWifi, FaPhone, FaSms,
  FaLaptop, FaPrint, FaGraduationCap, FaShoppingBag, FaFire,
  FaStar, FaCheckCircle, FaArrowRight, FaWhatsapp, FaMobileAlt
} from "react-icons/fa";

const WHATSAPP = "https://wa.me/254722508904";

const services = [
  { icon:<FaWifi />,         label:"Data Bundles",     desc:"From KES 19 — instant Safaricom data", to:"/bundles",     color:"#16a34a", bg:"#dcfce7" },
  { icon:<FaPhone />,        label:"Minutes Bundles",  desc:"Talk more for less — from KES 20",     to:"/bundles",     color:"#2563eb", bg:"#dbeafe" },
  { icon:<FaSms />,          label:"SMS Bundles",      desc:"200 SMS for just KES 9",               to:"/bundles",     color:"#7c3aed", bg:"#ede9fe" },
  { icon:<FaLaptop />,       label:"Dev Services",     desc:"Websites, apps & custom systems",      to:"/dev",         color:"#0891b2", bg:"#cffafe" },
  { icon:<FaPrint />,        label:"Cyber Services",   desc:"Printing, scanning & more",            to:"/cyber",       color:"#dc2626", bg:"#fee2e2" },
  { icon:<FaGraduationCap />,label:"Academy",          desc:"Learn digital skills & earn",          to:"/academy",     color:"#d97706", bg:"#fef3c7" },
  { icon:<FaShoppingBag />,  label:"Electronics",      desc:"Quality gadgets & accessories",        to:"/electronics", color:"#9333ea", bg:"#f3e8ff" },
  { icon:<FaFire />,         label:"Hustle",           desc:"Side hustle opportunities",            to:"/hustle",      color:"#ea580c", bg:"#ffedd5" },
];

const steps = [
  { n:"01", title:"Choose a Bundle",   desc:"Pick data, minutes, or SMS from our affordable packages." },
  { n:"02", title:"Enter Numbers",     desc:"Your receiving number and the M-PESA number to pay with." },
  { n:"03", title:"M-PESA STK Push",   desc:"Enter your PIN on the prompt that appears on your phone." },
  { n:"04", title:"Instant Delivery",  desc:"Bundle delivered within 10 seconds. No delays, no stress." },
];

const testimonials = [
  { name:"Amina H.",      loc:"Mombasa",   stars:5, text:"Nimekuwa nikiamini WeberTech kwa miaka. Delivery ni ya haraka sana — sekunde kumi!" },
  { name:"Brian M.",      loc:"Nairobi",   stars:5, text:"Best platform for bundles in Kenya. Prices are fair and the support team is always available." },
  { name:"John K.",       loc:"Kisumu",    stars:5, text:"I buy for my whole family. The 'buy for other number' feature is exactly what I needed." },
  { name:"Fatuma A.",     loc:"Malindi",   stars:5, text:"Academy courses zimesaidia sana. Sasa naweza kutengeneza websites za customers wangu." },
];

export default function Home() {
  return (
    <>
      <style>{`
        .home-hero {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a 0%, #14532d 45%, #15803d 100%);
          display: flex; align-items: center;
          position: relative; overflow: hidden;
          padding: 100px 20px 60px;
        }
        .hero-blob {
          position: absolute; border-radius: 50%;
          background: rgba(74,222,128,0.08);
          animation: blobPulse 6s ease-in-out infinite;
        }
        @keyframes blobPulse {
          0%,100% { transform: scale(1) rotate(0deg); }
          50%      { transform: scale(1.1) rotate(5deg); }
        }
        .home-section { padding: 72px 20px; }
        .section-tag {
          display: inline-flex; align-items: center; gap: 6px;
          background: #dcfce7; color: #15803d;
          padding: 5px 14px; border-radius: 99px;
          font-size: 12.5px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.5px;
          margin-bottom: 16px;
        }
        .service-card {
          border: 1.5px solid #e5e7eb; border-radius: 16px;
          padding: 24px 20px; background: #fff;
          transition: all .22s ease; cursor: pointer;
          text-decoration: none; display: block;
        }
        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.1);
          border-color: #86efac;
        }
        .step-card {
          background: #fff; border: 1.5px solid #e5e7eb;
          border-radius: 16px; padding: 28px 22px;
          position: relative; transition: all .2s;
        }
        .step-card:hover { border-color: #86efac; box-shadow: 0 8px 30px rgba(22,163,74,0.1); }
        .testimonial-card {
          background: #fff; border: 1.5px solid #e5e7eb;
          border-radius: 16px; padding: 24px 20px;
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-in { animation: fadeSlideUp .6s ease both; }
      `}</style>

      <Navbar />

      {/* ── HERO ── */}
      <section className="home-hero">
        <div className="hero-blob" style={{ width:500, height:500, top:-100, right:-150 }} />
        <div className="hero-blob" style={{ width:300, height:300, bottom:-50, left:-80, animationDelay:"2s" }} />

        <div style={{ maxWidth:1100, margin:"0 auto", position:"relative", zIndex:1 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:40, alignItems:"center" }}>
            <div>
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(74,222,128,0.15)", border:"1px solid rgba(74,222,128,0.3)", borderRadius:99, padding:"6px 16px", fontSize:13, fontWeight:600, color:"#4ade80", marginBottom:24 }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:"#4ade80", display:"inline-block", animation:"blobPulse 1.5s ease-in-out infinite" }} />
                Kenya's Fastest Digital Services
              </div>

              <h1 style={{ fontSize:"clamp(32px,6vw,58px)", fontWeight:900, color:"#fff", lineHeight:1.1, letterSpacing:"-1.5px", marginBottom:20 }}>
                Bundles. Hosting.<br />
                <span style={{ color:"#4ade80" }}>Everything Digital.</span>
              </h1>

              <p style={{ fontSize:"clamp(15px,2vw,18px)", color:"rgba(255,255,255,0.75)", lineHeight:1.7, maxWidth:520, marginBottom:36 }}>
                Buy Safaricom data, minutes & SMS bundles in seconds via M-PESA. Plus web hosting, dev services, academy, electronics & more — all in one platform.
              </p>

              <div style={{ display:"flex", flexWrap:"wrap", gap:14 }}>
                <Link to="/bundles" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"14px 28px", background:"#16a34a", borderRadius:12, fontWeight:700, fontSize:15.5, color:"#fff", textDecoration:"none", boxShadow:"0 8px 24px rgba(22,163,74,0.4)", transition:"transform .15s" }}
                  onMouseOver={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseOut={e=>e.currentTarget.style.transform="none"}>
                  <FaBolt /> Buy Bundles Now
                </Link>
                <a href={WHATSAPP} target="_blank" rel="noreferrer"
                  style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"14px 24px", background:"rgba(255,255,255,0.1)", border:"1.5px solid rgba(255,255,255,0.25)", borderRadius:12, fontWeight:700, fontSize:15.5, color:"#fff", textDecoration:"none" }}>
                  <FaWhatsapp style={{ color:"#4ade80" }} /> Chat with Us
                </a>
              </div>

              {/* Trust badges */}
              <div style={{ display:"flex", flexWrap:"wrap", gap:20, marginTop:40 }}>
                {[["10s","Avg Delivery"],["99%","Uptime"],["24/7","Support"],["100%","M-PESA Secure"]].map(([v,l])=>(
                  <div key={l} style={{ textAlign:"center" }}>
                    <div style={{ fontSize:22, fontWeight:900, color:"#4ade80" }}>{v}</div>
                    <div style={{ fontSize:11.5, color:"rgba(255,255,255,0.6)", marginTop:2 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero card */}
            <div style={{ display:"none" /* hidden on mobile, shown via media */ }}>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="home-section" style={{ background:"#f9fafb" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div className="section-tag"><FaBolt /> Our Services</div>
            <h2 style={{ fontSize:"clamp(26px,4vw,40px)", fontWeight:800, letterSpacing:"-0.5px" }}>Everything You Need in One Place</h2>
            <p style={{ color:"#6b7280", marginTop:10, fontSize:16, maxWidth:500, margin:"10px auto 0" }}>Digital services for every Kenyan — affordable, instant, and reliable.</p>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:18 }}>
            {services.map((s) => (
              <Link key={s.label} to={s.to} className="service-card">
                <div style={{ width:48, height:48, borderRadius:13, background:s.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, color:s.color, marginBottom:14 }}>{s.icon}</div>
                <h3 style={{ fontWeight:700, fontSize:16, marginBottom:6 }}>{s.label}</h3>
                <p style={{ color:"#6b7280", fontSize:13.5, lineHeight:1.5 }}>{s.desc}</p>
                <div style={{ display:"flex", alignItems:"center", gap:5, marginTop:14, color:s.color, fontSize:13, fontWeight:600 }}>
                  Explore <FaArrowRight style={{ fontSize:11 }} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="home-section" style={{ background:"#fff" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div className="section-tag"><FaCheckCircle /> How It Works</div>
            <h2 style={{ fontSize:"clamp(24px,4vw,38px)", fontWeight:800, letterSpacing:"-0.5px" }}>Buy a Bundle in 4 Simple Steps</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:20 }}>
            {steps.map((s,i) => (
              <div key={s.n} className="step-card">
                <div style={{ fontSize:42, fontWeight:900, color:"#dcfce7", lineHeight:1, marginBottom:14, fontVariantNumeric:"tabular-nums" }}>{s.n}</div>
                <h3 style={{ fontWeight:700, fontSize:16, marginBottom:8 }}>{s.title}</h3>
                <p style={{ color:"#6b7280", fontSize:14, lineHeight:1.6 }}>{s.desc}</p>
                {i < steps.length-1 && (
                  <div style={{ position:"absolute", top:"50%", right:-12, transform:"translateY(-50%)", fontSize:18, color:"#d1d5db", display:"none" }}>→</div>
                )}
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:40 }}>
            <Link to="/bundles" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"14px 32px", background:"linear-gradient(135deg,#15803d,#16a34a)", borderRadius:12, fontWeight:700, fontSize:15.5, color:"#fff", textDecoration:"none", boxShadow:"0 8px 24px rgba(22,163,74,0.3)" }}>
              Start Buying Now <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="home-section" style={{ background:"#f9fafb" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div className="section-tag"><FaStar /> Reviews</div>
            <h2 style={{ fontSize:"clamp(24px,4vw,38px)", fontWeight:800, letterSpacing:"-0.5px" }}>Trusted by Thousands of Kenyans</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:18 }}>
            {testimonials.map((t) => (
              <div key={t.name} className="testimonial-card">
                <div style={{ display:"flex", gap:3, marginBottom:12 }}>
                  {[...Array(t.stars)].map((_,i)=><FaStar key={i} style={{ color:"#f59e0b", fontSize:13 }} />)}
                </div>
                <p style={{ color:"#374151", fontSize:14, lineHeight:1.7, marginBottom:14 }}>"{t.text}"</p>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:36, height:36, borderRadius:"50%", background:"linear-gradient(135deg,#15803d,#4ade80)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, color:"#fff", fontSize:14 }}>
                    {t.name[0]}
                  </div>
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

      {/* ── FINAL CTA ── */}
      <section style={{ padding:"72px 20px", background:"linear-gradient(135deg,#0f172a,#14532d,#15803d)" }}>
        <div style={{ maxWidth:700, margin:"0 auto", textAlign:"center" }}>
          <div style={{ width:64, height:64, borderRadius:18, background:"rgba(74,222,128,0.15)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", fontSize:28 }}>
            <FaMobileAlt style={{ color:"#4ade80" }} />
          </div>
          <h2 style={{ fontSize:"clamp(26px,5vw,42px)", fontWeight:900, color:"#fff", letterSpacing:"-1px", marginBottom:14 }}>
            Ready to Get Connected?
          </h2>
          <p style={{ color:"rgba(255,255,255,0.75)", fontSize:16, lineHeight:1.7, marginBottom:36 }}>
            Join thousands of Kenyans who trust WeberTech for fast, affordable digital services.
          </p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:14, justifyContent:"center" }}>
            <Link to="/bundles" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"14px 28px", background:"#16a34a", borderRadius:12, fontWeight:700, fontSize:15.5, color:"#fff", textDecoration:"none", boxShadow:"0 8px 24px rgba(22,163,74,0.4)" }}>
              <FaBolt /> Buy Bundles
            </Link>
            <a href={WHATSAPP} target="_blank" rel="noreferrer"
              style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"14px 24px", background:"rgba(255,255,255,0.1)", border:"1.5px solid rgba(255,255,255,0.2)", borderRadius:12, fontWeight:700, fontSize:15.5, color:"#fff", textDecoration:"none" }}>
              <FaWhatsapp style={{ color:"#4ade80" }} /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
