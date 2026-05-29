// src/pages/Home.jsx
import { Link }  from "react-router-dom";
import Navbar    from "../components/Navbar";
import Footer    from "../components/Footer";

const BUNDLES = "https://bundles.webertech.co.ke";
const WA      = "https://wa.me/254722508904";

const SERVICES = [
  { emoji:"⚡", label:"Bundles",     desc:"Safaricom data, minutes & SMS — instant via M-PESA", href:BUNDLES,        ext:true,  color:"#16a34a", bg:"#dcfce7" },
  { emoji:"💻", label:"Dev",         desc:"Websites, apps & custom systems",                     to:"/dev",           ext:false, color:"#0891b2", bg:"#cffafe" },
  { emoji:"🖨",  label:"Cyber",       desc:"Printing, scanning & internet access",                to:"/cyber",         ext:false, color:"#dc2626", bg:"#fee2e2" },
  { emoji:"🎓", label:"Academy",     desc:"Learn digital skills & earn certificates",             to:"/academy",       ext:false, color:"#d97706", bg:"#fef3c7" },
  { emoji:"📱", label:"Electronics", desc:"Gadgets, phones & accessories",                       to:"/electronics",   ext:false, color:"#7c3aed", bg:"#ede9fe" },
  { emoji:"🔥", label:"Hustle",      desc:"Side hustles & reseller opportunities",                to:"/hustle",        ext:false, color:"#ea580c", bg:"#ffedd5" },
];

const STEPS = [
  { n:"01", t:"Visit Bundles Site",   d:"Go to bundles.webertech.co.ke and pick your bundle." },
  { n:"02", t:"Enter Your Numbers",   d:"Receiving number and M-PESA payment number." },
  { n:"03", t:"M-PESA STK Push",      d:"Enter your PIN on the prompt on your phone." },
  { n:"04", t:"Instant Delivery",     d:"Bundle delivered in under 10 seconds. Done!" },
];

const TESTIMONIALS = [
  { name:"Amina H.",  loc:"Mombasa", text:"Delivery ni ya haraka sana! WeberTech ndiyo bora Kenya." },
  { name:"Brian M.",  loc:"Nairobi", text:"Best platform for bundles. Fair prices, always available." },
  { name:"John K.",   loc:"Kisumu",  text:"I buy for my whole family. The service is excellent." },
  { name:"Fatuma A.", loc:"Malindi", text:"Academy courses zimesaidia sana. Asante WeberTech!" },
];

export default function Home() {
  return (
    <>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Segoe UI',system-ui,sans-serif}
        @keyframes blob{0%,100%{transform:scale(1)}50%{transform:scale(1.07)}}
        .svc{display:block;border:1.5px solid #e5e7eb;border-radius:16px;padding:24px 20px;background:#fff;text-decoration:none;transition:transform .2s,box-shadow .2s,border-color .2s}
        .svc:hover{transform:translateY(-5px);box-shadow:0 14px 40px rgba(0,0,0,0.09);border-color:#86efac}
        .step{background:#fff;border:1.5px solid #e5e7eb;border-radius:16px;padding:26px 22px;transition:border-color .2s}
        .step:hover{border-color:#86efac}
        .tcard{background:#fff;border:1.5px solid #e5e7eb;border-radius:16px;padding:22px 20px}
        .tag{display:inline-flex;align-items:center;gap:6px;background:#dcfce7;color:#15803d;padding:5px 14px;border-radius:99px;font-size:12.5px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;margin-bottom:14px}
      `}</style>

      <Navbar />
      <div style={{ paddingTop:64 }}>

        {/* HERO */}
        <section style={{ minHeight:"92vh", background:"linear-gradient(135deg,#0f172a 0%,#14532d 45%,#15803d 100%)", display:"flex", alignItems:"center", padding:"80px 20px 60px", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-100, right:-100, width:400, height:400, borderRadius:"50%", background:"rgba(74,222,128,0.07)", animation:"blob 6s ease-in-out infinite" }} />
          <div style={{ position:"absolute", bottom:-60, left:-60, width:300, height:300, borderRadius:"50%", background:"rgba(74,222,128,0.05)", animation:"blob 8s ease-in-out infinite 2s" }} />

          <div style={{ maxWidth:1100, margin:"0 auto", position:"relative", zIndex:1, width:"100%" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(74,222,128,0.15)", border:"1px solid rgba(74,222,128,0.3)", borderRadius:99, padding:"6px 16px", fontSize:13, fontWeight:600, color:"#4ade80", marginBottom:24 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"#4ade80", display:"inline-block" }} />
              Kenya's Fastest Digital Services
            </div>
            <h1 style={{ fontSize:"clamp(32px,6vw,60px)", fontWeight:900, color:"#fff", lineHeight:1.08, letterSpacing:"-1.5px", marginBottom:20, maxWidth:680 }}>
              Bundles. Dev.<br /><span style={{ color:"#4ade80" }}>Everything Digital.</span>
            </h1>
            <p style={{ fontSize:"clamp(15px,2vw,18px)", color:"rgba(255,255,255,0.72)", lineHeight:1.7, maxWidth:520, marginBottom:36 }}>
              Buy Safaricom bundles in seconds, build your business online, access cyber services, join the academy & more — all in one Kenyan platform.
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:14, marginBottom:52 }}>
              <a href={BUNDLES} target="_blank" rel="noreferrer"
                style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"14px 28px", background:"#16a34a", borderRadius:12, fontWeight:700, fontSize:15.5, color:"#fff", textDecoration:"none", boxShadow:"0 8px 24px rgba(22,163,74,0.4)" }}>
                ⚡ Buy Bundles Now
              </a>
              <a href={WA} target="_blank" rel="noreferrer"
                style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"14px 24px", background:"rgba(255,255,255,0.1)", border:"1.5px solid rgba(255,255,255,0.25)", borderRadius:12, fontWeight:700, fontSize:15.5, color:"#fff", textDecoration:"none" }}>
                💬 Chat with Us
              </a>
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:24 }}>
              {[["10s","Bundle Delivery"],["99%","Success Rate"],["24/7","AI Support"],["100%","M-PESA Secure"]].map(([v,l])=>(
                <div key={l}>
                  <div style={{ fontSize:24, fontWeight:900, color:"#4ade80" }}>{v}</div>
                  <div style={{ fontSize:12, color:"rgba(255,255,255,0.6)", marginTop:2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section style={{ padding:"72px 20px", background:"#f9fafb" }}>
          <div style={{ maxWidth:1200, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:48 }}>
              <div className="tag">⚡ Our Services</div>
              <h2 style={{ fontSize:"clamp(26px,4vw,40px)", fontWeight:800, letterSpacing:"-0.5px", marginBottom:10 }}>Everything You Need in One Place</h2>
              <p style={{ color:"#6b7280", fontSize:16, maxWidth:480, margin:"0 auto" }}>Digital services for every Kenyan — affordable, instant, reliable.</p>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:18 }}>
              {SERVICES.map(s => {
                const inner = (
                  <>
                    <div style={{ width:50, height:50, borderRadius:14, background:s.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, marginBottom:14 }}>{s.emoji}</div>
                    <h3 style={{ fontWeight:700, fontSize:16, marginBottom:6, color:"#111827" }}>{s.label}</h3>
                    <p style={{ color:"#6b7280", fontSize:13.5, lineHeight:1.55, marginBottom:14 }}>{s.desc}</p>
                    <span style={{ fontSize:13, fontWeight:600, color:s.color }}>Explore →</span>
                  </>
                );
                return s.ext
                  ? <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="svc">{inner}</a>
                  : <Link key={s.label} to={s.to} className="svc">{inner}</Link>;
              })}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section style={{ padding:"72px 20px", background:"#fff" }}>
          <div style={{ maxWidth:1100, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:48 }}>
              <div className="tag">✅ How It Works</div>
              <h2 style={{ fontSize:"clamp(24px,4vw,38px)", fontWeight:800, letterSpacing:"-0.5px" }}>Buy a Bundle in 4 Simple Steps</h2>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:20 }}>
              {STEPS.map(s => (
                <div key={s.n} className="step">
                  <div style={{ fontSize:40, fontWeight:900, color:"#dcfce7", lineHeight:1, marginBottom:14 }}>{s.n}</div>
                  <h3 style={{ fontWeight:700, fontSize:16, marginBottom:8 }}>{s.t}</h3>
                  <p style={{ color:"#6b7280", fontSize:14, lineHeight:1.6 }}>{s.d}</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign:"center", marginTop:40 }}>
              <a href={BUNDLES} target="_blank" rel="noreferrer"
                style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"14px 32px", background:"linear-gradient(135deg,#15803d,#16a34a)", borderRadius:12, fontWeight:700, fontSize:15.5, color:"#fff", textDecoration:"none", boxShadow:"0 8px 24px rgba(22,163,74,0.3)" }}>
                ⚡ Start Buying Bundles →
              </a>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section style={{ padding:"72px 20px", background:"#f9fafb" }}>
          <div style={{ maxWidth:1100, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:48 }}>
              <div className="tag">⭐ Reviews</div>
              <h2 style={{ fontSize:"clamp(24px,4vw,38px)", fontWeight:800, letterSpacing:"-0.5px" }}>Trusted by Thousands of Kenyans</h2>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:18 }}>
              {TESTIMONIALS.map(t => (
                <div key={t.name} className="tcard">
                  <div style={{ fontSize:18, marginBottom:10 }}>⭐⭐⭐⭐⭐</div>
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

        {/* CTA */}
        <section style={{ padding:"72px 20px", background:"linear-gradient(135deg,#0f172a,#14532d,#15803d)" }}>
          <div style={{ maxWidth:680, margin:"0 auto", textAlign:"center" }}>
            <div style={{ fontSize:52, marginBottom:16 }}>📱</div>
            <h2 style={{ fontSize:"clamp(26px,5vw,44px)", fontWeight:900, color:"#fff", letterSpacing:"-1px", marginBottom:14 }}>Ready to Get Connected?</h2>
            <p style={{ color:"rgba(255,255,255,0.72)", fontSize:16, lineHeight:1.7, marginBottom:36 }}>Join thousands of Kenyans who trust WeberTech for fast, affordable digital services.</p>
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
