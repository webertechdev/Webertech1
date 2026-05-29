// src/components/Footer.jsx
import { Link } from "react-router-dom";

const BUNDLES  = "https://bundles.webertech.co.ke";
const WA       = "https://wa.me/254722508904";
const YEAR     = new Date().getFullYear();

export default function Footer() {
  return (
    <footer style={{ background:"#0f172a", color:"rgba(255,255,255,0.55)", padding:"52px 20px 28px", fontFamily:"'Segoe UI',system-ui,sans-serif" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:40, marginBottom:48 }}>

          {/* Brand */}
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
              <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#15803d,#16a34a)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ color:"#fff", fontWeight:900, fontSize:17 }}>W</span>
              </div>
              <span style={{ fontWeight:800, fontSize:18, color:"#fff" }}>Weber<span style={{ color:"#4ade80" }}>Tech</span></span>
            </div>
            <p style={{ fontSize:13.5, lineHeight:1.7, maxWidth:220, marginBottom:20 }}>
              Kenya's digital services platform. Bundles, dev, cyber, academy & more — all in one place.
            </p>
            <a href={WA} target="_blank" rel="noreferrer"
              style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"9px 16px", background:"#25d366", borderRadius:9, color:"#fff", fontWeight:700, fontSize:13, textDecoration:"none" }}>
              💬 WhatsApp Us
            </a>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color:"#fff", fontWeight:700, fontSize:13, marginBottom:16, textTransform:"uppercase", letterSpacing:"0.6px" }}>Services</h4>
            <a href={BUNDLES} target="_blank" rel="noreferrer" style={{ display:"block", color:"rgba(255,255,255,0.6)", textDecoration:"none", fontSize:13.5, marginBottom:10 }}>⚡ Safaricom Bundles</a>
            {[["Dev Services","/dev"],["Cyber Services","/cyber"],["Electronics","/electronics"],["Academy","/academy"],["Hustle","/hustle"]].map(([l,t])=>(
              <Link key={t} to={t} style={{ display:"block", color:"rgba(255,255,255,0.6)", textDecoration:"none", fontSize:13.5, marginBottom:10 }}>{l}</Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 style={{ color:"#fff", fontWeight:700, fontSize:13, marginBottom:16, textTransform:"uppercase", letterSpacing:"0.6px" }}>Company</h4>
            {[["Home","/"],["Dashboard","/dashboard"]].map(([l,t])=>(
              <Link key={t} to={t} style={{ display:"block", color:"rgba(255,255,255,0.6)", textDecoration:"none", fontSize:13.5, marginBottom:10 }}>{l}</Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color:"#fff", fontWeight:700, fontSize:13, marginBottom:16, textTransform:"uppercase", letterSpacing:"0.6px" }}>Contact</h4>
            <p style={{ fontSize:13.5, marginBottom:10 }}>✉ support@webertech.co.ke</p>
            <p style={{ fontSize:13.5, marginBottom:10 }}>📞 +254 722 508 904</p>
            <p style={{ fontSize:13.5, marginBottom:10 }}>📍 Mombasa, Kenya</p>
          </div>
        </div>

        <div style={{ borderTop:"1px solid rgba(255,255,255,0.08)", paddingTop:22, display:"flex", flexWrap:"wrap", gap:12, alignItems:"center", justifyContent:"space-between" }}>
          <p style={{ fontSize:12.5 }}>© {YEAR} WeberTech. All rights reserved.</p>
          <p style={{ fontSize:12.5 }}>Made with ❤ in Kenya 🇰🇪</p>
        </div>
      </div>
    </footer>
  );
}
