// src/pages/cyber/CyberHome.jsx
// WeberTech Cyber — portal homepage. Links out to Legal Documents Hub
// (live) and other divisions which are still "Coming Soon" until
// built in later phases (Government, Business, Printing, Writing…).

import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { CATEGORIES } from "./data/legalDocumentsSeed";

const WA = "https://wa.me/254722508904";

const DIVISIONS = [
  { emoji: "📄", label: "Legal Documents Hub", desc: "Buy ready-made legal & business documents", to: "/cyber/legal-documents", live: true },
  { emoji: "🏛️", label: "Government Services", desc: "KRA, NTSA, HELB, SHA, eCitizen assistance", to: "/cyber", live: false },
  { emoji: "🏢", label: "Business Services", desc: "Registration, AGPO, compliance, tenders", to: "/cyber", live: false },
  { emoji: "✍️", label: "Professional Writing", desc: "CVs, cover letters, proposals, reports", to: "/cyber", live: false },
  { emoji: "🖨️", label: "Printing Centre", desc: "Colour, B&W, scanning, lamination, binding", to: "/cyber", live: false },
  { emoji: "🤖", label: "AI Document Tools", desc: "AI CV builder, proposal & contract generator", to: "/cyber", live: false },
];

export default function CyberHome() {
  return (
    <>
      <style>{`
        @keyframes cyfade{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        .cy-fade{animation:cyfade .5s ease both}
        .cy-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px}
        .cy-card{background:#fff;border:1.5px solid #e5e7eb;border-radius:16px;padding:22px;text-decoration:none;color:inherit;transition:transform .15s,box-shadow .15s;display:block}
        .cy-card:hover{transform:translateY(-3px);box-shadow:0 14px 30px rgba(0,0,0,0.08)}
      `}</style>
      <Navbar />
      <div style={{ paddingTop: 64 }}>
        {/* Hero */}
        <div style={{
          background: "linear-gradient(135deg,#0f172a,#450a0a,#dc2626)",
          padding: "68px 20px 56px", textAlign: "center",
        }}>
          <div className="cy-fade" style={{ maxWidth: 720, margin: "0 auto" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 99, padding: "5px 14px", fontSize: 12.5, fontWeight: 700,
              color: "rgba(255,255,255,0.85)", marginBottom: 16,
            }}>
              🖨️ WeberTech Cyber
            </div>
            <h1 style={{ fontSize: "clamp(28px,6vw,46px)", fontWeight: 900, color: "#fff", marginBottom: 14, letterSpacing: "-1px" }}>
              Documents, Government Services &amp; Printing — All in One Place
            </h1>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 26 }}>
              Buy ready-made legal documents instantly, or get help with government services, business registration and printing.
            </p>
            <Link to="/cyber/legal-documents" style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 26px",
              background: "#fff", color: "#991b1b", borderRadius: 12, fontWeight: 800,
              fontSize: 14.5, textDecoration: "none",
            }}>
              📄 Browse Legal Documents →
            </Link>
          </div>
        </div>

        {/* Divisions */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 20px" }}>
          <h2 style={{ fontWeight: 900, fontSize: 24, marginBottom: 20, color: "#111827" }}>Cyber Divisions</h2>
          <div className="cy-grid">
            {DIVISIONS.map((d) => (
              <Link key={d.label} to={d.to} className="cy-card">
                <div style={{ fontSize: 30, marginBottom: 10 }}>{d.emoji}</div>
                <div style={{ fontWeight: 800, fontSize: 15.5, color: "#111827", marginBottom: 6, display: "flex", alignItems: "center", gap: 8 }}>
                  {d.label}
                  {!d.live && <span style={{ fontSize: 10.5, fontWeight: 700, color: "#9ca3af", background: "#f3f4f6", padding: "2px 8px", borderRadius: 99 }}>SOON</span>}
                </div>
                <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>{d.desc}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Legal document categories preview */}
        <div style={{ background: "#f9fafb", padding: "48px 20px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <h2 style={{ fontWeight: 900, fontSize: 22, marginBottom: 20, color: "#111827" }}>Document Categories</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {CATEGORIES.map((c) => (
                <Link key={c.id} to={`/cyber/legal-documents?category=${c.id}`}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 16px",
                    background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 99,
                    fontSize: 13.5, fontWeight: 700, color: "#374151", textDecoration: "none",
                  }}>
                  <span>{c.emoji}</span> {c.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding: "48px 20px", textAlign: "center" }}>
          <p style={{ color: "#6b7280", fontSize: 14.5, marginBottom: 14 }}>
            Need a document or service not listed here?
          </p>
          <a href={WA} target="_blank" rel="noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px",
            background: "#25d366", color: "#fff", borderRadius: 11, fontWeight: 700,
            fontSize: 14, textDecoration: "none",
          }}>
            💬 Chat with us on WhatsApp
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
