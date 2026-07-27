// src/pages/cyber/CyberHomeEnhanced.jsx
// Enhanced Cyber Homepage with Professional Hero Carousel

import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HeroCarousel from "../../components/hero/HeroCarousel";
import { cyberSlides } from "../../components/hero/slides/cyberSlides";
import { CATEGORIES } from "./data/legalDocumentsSeed";

const WA = "https://wa.me/254722508904";

const DIVISIONS = [
  { emoji: "📄", label: "Legal Documents Hub", desc: "Buy ready-made legal & business documents", to: "/cyber/legal-documents", live: true },
  { emoji: "🏛️", label: "Government Services", desc: "KRA, NTSA, HELB, SHA, eCitizen assistance", to: "/cyber/government", live: true },
  { emoji: "🏢", label: "Business Services", desc: "Registration, AGPO, compliance, tenders", to: "/cyber/business", live: true },
  { emoji: "✍️", label: "Professional Writing", desc: "CVs, cover letters, proposals, reports", to: "/cyber/writing", live: true },
  { emoji: "🖨️", label: "Printing Centre", desc: "Colour, B&W, scanning, lamination, binding", to: "/cyber/printing", live: true },
  { emoji: "🤖", label: "AI Document Tools", desc: "AI CV builder, proposal & contract generator", to: "/cyber", live: false },
];

export default function CyberHomeEnhanced() {
  return (
    <>
      <style>{`
        @keyframes cyfade{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        .cy-fade{animation:cyfade .5s ease both}
        .cy-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px}
        .cy-card{background:#fff;border:1.5px solid #e5e7eb;border-radius:16px;padding:22px;text-decoration:none;color:inherit;transition:transform .15s,box-shadow .15s;display:block}
        .cy-card:hover{transform:translateY(-3px);box-shadow:0 14px 30px rgba(0,0,0,0.08)}
        .cy-card.coming-soon{opacity:0.6;cursor:not-allowed}
        .cy-card.coming-soon:hover{transform:none;box-shadow:none}
        .cy-badge{display:inline-flex;align-items:center;gap:4px;background:#16a34a;color:#fff;padding:4px 10px;border-radius:6px;font-size:11px;font-weight:700;margin-top:8px}
      `}</style>

      <Navbar />
      
      {/* Hero Carousel */}
      <div style={{ marginTop: 62 }}>
        <HeroCarousel slides={cyberSlides} autoPlayInterval={7000} />
      </div>

      {/* Main Content */}
      <div style={{ paddingTop: 60, paddingBottom: 80, background: "#f9fafb" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          {/* Section: Divisions */}
          <div style={{ marginBottom: 60 }}>
            <div className="cy-fade" style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 32, fontWeight: 900, color: "#111827", marginBottom: 8 }}>Our Services</h2>
              <p style={{ fontSize: 16, color: "#6b7280" }}>Everything you need in one platform</p>
            </div>
            
            <div className="cy-grid">
              {DIVISIONS.map((div, idx) => (
                <Link
                  key={idx}
                  to={div.to}
                  className={`cy-card ${!div.live ? "coming-soon" : ""}`}
                  style={{ pointerEvents: !div.live ? "none" : "auto" }}
                >
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{div.emoji}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: "#111827", marginBottom: 6 }}>
                    {div.label}
                  </h3>
                  <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.5 }}>{div.desc}</p>
                  {!div.live && <div className="cy-badge">Coming Soon</div>}
                </Link>
              ))}
            </div>
          </div>

          {/* Section: Document Categories */}
          <div style={{ marginBottom: 60 }}>
            <div className="cy-fade" style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 32, fontWeight: 900, color: "#111827", marginBottom: 8 }}>Popular Documents</h2>
              <p style={{ fontSize: 16, color: "#6b7280" }}>Browse our most popular legal templates</p>
            </div>
            
            <div className="cy-grid">
              {CATEGORIES.slice(0, 6).map((cat, idx) => (
                <Link
                  key={idx}
                  to={`/cyber/legal-documents?category=${cat.slug}`}
                  className="cy-card"
                >
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{cat.emoji}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: "#111827", marginBottom: 6 }}>
                    {cat.name}
                  </h3>
                  <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.5 }}>{cat.description}</p>
                  <div style={{ fontSize: 12, color: "#16a34a", fontWeight: 700, marginTop: 12 }}>
                    {cat.count} documents →
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div style={{
            background: "linear-gradient(135deg,#16a34a,#15803d)",
            borderRadius: 20,
            padding: 40,
            textAlign: "center",
            color: "#fff",
          }}>
            <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 12 }}>Need Help?</h2>
            <p style={{ fontSize: 16, marginBottom: 24, opacity: 0.9 }}>
              Our support team is ready to assist you with any questions or requests.
            </p>
            <a
              href={WA}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-block",
                padding: "14px 32px",
                background: "#fff",
                color: "#16a34a",
                borderRadius: 12,
                fontWeight: 800,
                textDecoration: "none",
                transition: "transform .15s",
              }}
              onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.target.style.transform = "none"}
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
