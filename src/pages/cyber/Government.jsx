// src/pages/cyber/Government.jsx
// Government Services Hub — KRA, NTSA, HELB, SHA, NSSF, eCitizen, Immigration, CRB

import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const SERVICES = [
  {
    id: "kra",
    emoji: "🏛️",
    name: "KRA Services",
    desc: "PIN registration, tax returns, VAT, iTax assistance",
    items: ["KRA PIN Registration", "PIN Retrieval", "Tax Returns", "Nil Returns", "VAT Registration", "Tax Compliance Certificate"],
    price: "From KES 500",
  },
  {
    id: "ntsa",
    emoji: "🚗",
    name: "NTSA Services",
    desc: "Driving license, logbook, vehicle inspection",
    items: ["Smart DL Renewal", "Driving License Application", "Logbook Transfer", "Vehicle Search", "Vehicle Inspection Booking"],
    price: "From KES 300",
  },
  {
    id: "helb",
    emoji: "🎓",
    name: "HELB Services",
    desc: "Loan applications, status checks, appeals",
    items: ["First Time Application", "Subsequent Application", "Loan Appeal", "Loan Status", "Compliance Certificate"],
    price: "From KES 400",
  },
  {
    id: "sha",
    emoji: "🏥",
    name: "SHA Services",
    desc: "Registration, employer setup, contributions",
    items: ["Registration", "Employer Registration", "Dependants Update", "Contributions", "Benefit Verification"],
    price: "From KES 350",
  },
  {
    id: "nssf",
    emoji: "💼",
    name: "NSSF Services",
    desc: "Registration, contributions, employer services",
    items: ["Registration", "Contributions", "Employer Services", "Statements"],
    price: "From KES 300",
  },
  {
    id: "ecitizen",
    emoji: "📋",
    name: "eCitizen Services",
    desc: "Passport, birth certificate, business registration",
    items: ["Passport", "Good Conduct", "Birth Certificate", "Marriage Certificate", "Business Registration"],
    price: "From KES 500",
  },
  {
    id: "immigration",
    emoji: "✈️",
    name: "Immigration Services",
    desc: "Passport, visa, work permit, travel documents",
    items: ["Passport", "Visa", "Work Permit", "Alien Card", "Travel Documents"],
    price: "From KES 1000",
  },
  {
    id: "crb",
    emoji: "📊",
    name: "CRB Services",
    desc: "Credit clearance, credit report, credit status",
    items: ["Clearance", "Credit Report", "Credit Status"],
    price: "From KES 200",
  },
];

export default function Government() {
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
          background: "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
          padding: "68px 20px 56px",
          textAlign: "center",
        }}>
          <div className="cy-fade" style={{ maxWidth: 720, margin: "0 auto" }}>
            <h1 style={{ fontSize: "clamp(28px,6vw,46px)", fontWeight: 900, color: "#fff", marginBottom: 14, letterSpacing: "-1px" }}>
              Government Services
            </h1>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 26 }}>
              Get help with KRA, NTSA, HELB, SHA, NSSF, eCitizen, Immigration, and CRB services. Professional assistance from start to finish.
            </p>
            <Link to="/cyber" style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 26px",
              background: "#fff", color: "#1e40af", borderRadius: 12, fontWeight: 800,
              fontSize: 14.5, textDecoration: "none",
            }}>
              ← Back to Cyber
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 20px" }}>
          <h2 style={{ fontWeight: 900, fontSize: 24, marginBottom: 20, color: "#111827" }}>All Government Services</h2>
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
                <div style={{ fontWeight: 800, fontSize: 14, color: "#16a34a", marginTop: 12 }}>{s.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding: "48px 20px", textAlign: "center", background: "#f9fafb" }}>
          <h3 style={{ fontWeight: 900, fontSize: 22, marginBottom: 10, color: "#111827" }}>Need help with a government service?</h3>
          <p style={{ color: "#6b7280", fontSize: 14.5, marginBottom: 20 }}>
            Chat with our team on WhatsApp to discuss your specific needs.
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
