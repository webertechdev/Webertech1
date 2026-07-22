// src/pages/cyber/Business.jsx
// Business Services Hub — Company Registration, AGPO, Compliance, Tenders

import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const SERVICES = [
  {
    id: "registration",
    emoji: "📝",
    name: "Company Registration",
    desc: "Business name, limited company, NGO, CBO, society",
    items: ["Business Name Search & Registration", "Limited Company Registration", "NGO Registration", "CBO Registration", "Society Registration"],
    price: "From KES 1000",
  },
  {
    id: "agpo",
    emoji: "🏆",
    name: "AGPO Registration",
    desc: "Affirmative Action Group membership & compliance",
    items: ["AGPO Registration", "Membership Renewal", "Compliance Certification", "Directory Listing"],
    price: "From KES 800",
  },
  {
    id: "tax",
    emoji: "📊",
    name: "Tax Compliance",
    desc: "KRA compliance, tax planning, returns filing",
    items: ["Tax Compliance Certificate", "Business Tax Planning", "Annual Returns Filing", "Tax Audit Preparation"],
    price: "From KES 1500",
  },
  {
    id: "tenders",
    emoji: "🎯",
    name: "Tender Assistance",
    desc: "Bid preparation, documentation, submission",
    items: ["Tender Search & Identification", "Bid Preparation", "Documentation", "Submission Support"],
    price: "From KES 2000",
  },
  {
    id: "plans",
    emoji: "📋",
    name: "Business Plans",
    desc: "Professional business plan writing & strategy",
    items: ["Business Plan Writing", "Financial Projections", "Market Analysis", "Executive Summary"],
    price: "From KES 3000",
  },
  {
    id: "profiles",
    emoji: "🏢",
    name: "Company Profiles",
    desc: "Professional company profile & branding documents",
    items: ["Company Profile Design", "Branding Guidelines", "Letterhead & Stationery", "Presentation Deck"],
    price: "From KES 2500",
  },
  {
    id: "kebs",
    emoji: "✓",
    name: "KEBS Registration",
    desc: "Kenya Bureau of Standards certification",
    items: ["KEBS Registration", "Quality Certification", "Compliance Audit", "Renewal Support"],
    price: "From KES 2000",
  },
  {
    id: "nca",
    emoji: "📡",
    name: "NCA Registration",
    desc: "Communications Authority licensing & compliance",
    items: ["NCA License Application", "Compliance Reporting", "Renewal Support"],
    price: "From KES 1500",
  },
];

export default function Business() {
  return (
    <>
      <style>{`
        @keyframes cyfade { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .cy-fade { animation: cyfade .5s ease both; }
        .cy-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 18px; }
        .cy-card { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 16px; padding: 22px; text-decoration: none; color: inherit; transition: transform .15s, box-shadow .15s; display: block; }
        .cy-card:hover { transform: translateY(-3px); box-shadow: 0 14px 30px rgba(0,0,0,0.08); }
      `}</style>
      <Navbar />
      <div style={{ paddingTop: 64 }}>
        {/* Hero */}
        <div style={{
          background: "linear-gradient(135deg,#0f172a,#7c2d12,#ea580c)",
          padding: "68px 20px 56px",
          textAlign: "center",
        }}>
          <div className="cy-fade" style={{ maxWidth: 720, margin: "0 auto" }}>
            <h1 style={{ fontSize: "clamp(28px,6vw,46px)", fontWeight: 900, color: "#fff", marginBottom: 14, letterSpacing: "-1px" }}>
              Business Services
            </h1>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 26 }}>
              Company registration, AGPO membership, tax compliance, tender assistance, and professional business documents.
            </p>
            <Link to="/cyber" style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 26px",
              background: "#fff", color: "#7c2d12", borderRadius: 12, fontWeight: 800,
              fontSize: 14.5, textDecoration: "none",
            }}>
              ← Back to Cyber
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 20px" }}>
          <h2 style={{ fontWeight: 900, fontSize: 24, marginBottom: 20, color: "#111827" }}>All Business Services</h2>
          <div className="cy-grid">
            {SERVICES.map((s) => (
              <div key={s.id} className="cy-card">
                <div style={{ fontSize: 40, marginBottom: 12 }}>{s.emoji}</div>
                <div style={{ fontWeight: 800, fontSize: 16.5, color: "#111827", marginBottom: 6 }}>{s.name}</div>
                <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, marginBottom: 12 }}>{s.desc}</div>
                <div style={{ fontSize: 12.5, color: "#9ca3af", marginBottom: 12 }}>
                  {s.items.slice(0, 3).map((item, i) => (
                    <div key={i}>• {item}</div>
                  ))}
                  {s.items.length > 3 && <div style={{ marginTop: 4, color: "#6b7280" }}>+ {s.items.length - 3} more</div>}
                </div>
                <div style={{ fontWeight: 800, fontSize: 14, color: "#ea580c", marginTop: 12 }}>{s.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding: "48px 20px", textAlign: "center", background: "#f9fafb" }}>
          <h3 style={{ fontWeight: 900, fontSize: 22, marginBottom: 10, color: "#111827" }}>Ready to grow your business?</h3>
          <p style={{ color: "#6b7280", fontSize: 14.5, marginBottom: 20 }}>
            Our team can help you navigate business registration, compliance, and growth.
          </p>
          <a href="https://wa.me/254722508904" target="_blank" rel="noreferrer" style={{
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
