// src/pages/NotFound.jsx
import { Link }  from "react-router-dom";
import Navbar    from "../components/Navbar";
import Footer    from "../components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop:64, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#f9fafb", padding:"80px 20px", fontFamily:"'Segoe UI',system-ui,sans-serif" }}>
        <div style={{ textAlign:"center", maxWidth:480 }}>
          <div style={{ fontSize:72, marginBottom:14 }}>🔍</div>
          <h1 style={{ fontSize:"clamp(48px,8vw,72px)", fontWeight:900, color:"#111827", letterSpacing:"-2px", marginBottom:8 }}>404</h1>
          <h2 style={{ fontSize:22, fontWeight:700, marginBottom:12, color:"#374151" }}>Page Not Found</h2>
          <p style={{ color:"#6b7280", fontSize:15.5, lineHeight:1.7, marginBottom:36 }}>
            This page doesn't exist. You might have mistyped the URL, or it may have moved.
          </p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <Link to="/" style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"13px 24px", background:"linear-gradient(135deg,#15803d,#16a34a)", borderRadius:11, color:"#fff", fontWeight:700, fontSize:15, textDecoration:"none" }}>
              🏠 Go Home
            </Link>
            <a href="https://bundles.webertech.co.ke" target="_blank" rel="noreferrer"
              style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"13px 22px", border:"2px solid #e5e7eb", borderRadius:11, color:"#374151", fontWeight:700, fontSize:15, textDecoration:"none", background:"#fff" }}>
              ⚡ Buy Bundles
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
