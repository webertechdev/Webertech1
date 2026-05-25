// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { FaMobileAlt, FaWhatsapp, FaEnvelope, FaGithub, FaHeart } from "react-icons/fa";

const WHATSAPP = "https://wa.me/254722508904";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background:"#0f172a", color:"rgba(255,255,255,0.6)", padding:"48px 20px 28px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:36, marginBottom:40 }}>

          {/* Brand */}
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
              <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#15803d,#16a34a)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <FaMobileAlt style={{ color:"#fff", fontSize:17 }} />
              </div>
              <span style={{ fontWeight:800, fontSize:18, color:"#fff" }}>Weber<span style={{ color:"#4ade80" }}>Tech</span></span>
            </div>
            <p style={{ fontSize:13.5, lineHeight:1.7, maxWidth:220 }}>
              Kenya's fastest digital services platform. Bundles, hosting, dev services & more — all via M-PESA.
            </p>
            <div style={{ display:"flex", gap:12, marginTop:16 }}>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" style={{ width:36, height:36, borderRadius:9, background:"rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center", color:"#4ade80", fontSize:17, textDecoration:"none" }}><FaWhatsapp /></a>
              <a href="mailto:support@webertech.co.ke" style={{ width:36, height:36, borderRadius:9, background:"rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center", color:"#60a5fa", fontSize:16, textDecoration:"none" }}><FaEnvelope /></a>
              <a href="https://github.com/webertechdev/Webertech1" target="_blank" rel="noreferrer" style={{ width:36, height:36, borderRadius:9, background:"rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center", color:"rgba(255,255,255,0.6)", fontSize:16, textDecoration:"none" }}><FaGithub /></a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color:"#fff", fontWeight:700, fontSize:14, marginBottom:14, textTransform:"uppercase", letterSpacing:"0.6px" }}>Services</h4>
            {[["Safaricom Bundles","/bundles"],["Web Hosting","/bundles"],["Developer Services","/dev"],["Cyber Services","/cyber"],["Electronics","/electronics"]].map(([l,t])=>(
              <Link key={l} to={t} style={{ display:"block", color:"rgba(255,255,255,0.6)", textDecoration:"none", fontSize:13.5, marginBottom:8, transition:"color .15s" }}
                onMouseOver={e=>e.target.style.color="#4ade80"} onMouseOut={e=>e.target.style.color="rgba(255,255,255,0.6)"}>{l}</Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 style={{ color:"#fff", fontWeight:700, fontSize:14, marginBottom:14, textTransform:"uppercase", letterSpacing:"0.6px" }}>Company</h4>
            {[["Academy","/academy"],["Hustle","/hustle"],["Dashboard","/dashboard"],["Track Order","/bundles"]].map(([l,t])=>(
              <Link key={l} to={t} style={{ display:"block", color:"rgba(255,255,255,0.6)", textDecoration:"none", fontSize:13.5, marginBottom:8, transition:"color .15s" }}
                onMouseOver={e=>e.target.style.color="#4ade80"} onMouseOut={e=>e.target.style.color="rgba(255,255,255,0.6)"}>{l}</Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color:"#fff", fontWeight:700, fontSize:14, marginBottom:14, textTransform:"uppercase", letterSpacing:"0.6px" }}>Contact</h4>
            <p style={{ fontSize:13.5, marginBottom:8 }}>📧 support@webertech.co.ke</p>
            <p style={{ fontSize:13.5, marginBottom:8 }}>📞 +254 722 508 904</p>
            <p style={{ fontSize:13.5, marginBottom:16 }}>📍 Mombasa, Kenya</p>
            <a href={WHATSAPP} target="_blank" rel="noreferrer"
              style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"9px 16px", background:"#25d366", borderRadius:9, color:"#fff", fontWeight:700, fontSize:13, textDecoration:"none" }}>
              <FaWhatsapp style={{ fontSize:15 }} /> WhatsApp Us
            </a>
          </div>
        </div>

        <div style={{ borderTop:"1px solid rgba(255,255,255,0.08)", paddingTop:22, display:"flex", flexWrap:"wrap", gap:12, alignItems:"center", justifyContent:"space-between" }}>
          <p style={{ fontSize:12.5 }}>© {year} WeberTech. All rights reserved. · webertech.co.ke</p>
          <p style={{ fontSize:12.5, display:"flex", alignItems:"center", gap:5 }}>
            Made with <FaHeart style={{ color:"#ef4444", fontSize:11 }} /> in Kenya
          </p>
        </div>
      </div>
    </footer>
  );
}
