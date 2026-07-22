// src/pages/cyber/Writing.jsx
// Professional Writing Services — CV, Cover Letters, Proposals, Reports, Editing

import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const SERVICES = [
  {
    id: "cv",
    emoji: "📄",
    name: "CV Writing",
    desc: "Professional, ATS-optimized CV that gets interviews",
    items: ["CV Writing from Scratch", "CV Rewrite & Optimization", "ATS Optimization", "LinkedIn Profile Optimization"],
    price: "From KES 1500",
  },
  {
    id: "cover",
    emoji: "✉️",
    name: "Cover Letters",
    desc: "Compelling cover letters tailored to job descriptions",
    items: ["Cover Letter Writing", "Job-Specific Tailoring", "Multiple Versions", "Email Cover Letter"],
    price: "From KES 800",
  },
  {
    id: "proposals",
    emoji: "📋",
    name: "Business Proposals",
    desc: "Professional proposals for clients and projects",
    items: ["Proposal Writing", "Project Proposal", "Bid Proposal", "Service Proposal"],
    price: "From KES 2500",
  },
  {
    id: "reports",
    emoji: "📊",
    name: "Report Writing",
    desc: "Professional reports, research papers, white papers",
    items: ["Business Report", "Research Report", "White Paper", "Technical Report"],
    price: "From KES 3000",
  },
  {
    id: "editing",
    emoji: "✏️",
    name: "Editing & Proofreading",
    desc: "Professional editing, proofreading, and formatting",
    items: ["Proofreading", "Copy Editing", "Content Editing", "Formatting & Layout"],
    price: "From KES 1000",
  },
  {
    id: "grant",
    emoji: "🎯",
    name: "Grant Writing",
    desc: "Compelling grant proposals for funding",
    items: ["Grant Proposal Writing", "Funding Application", "Project Narrative", "Budget Justification"],
    price: "From KES 4000",
  },
  {
    id: "business-plan",
    emoji: "📈",
    name: "Business Plans",
    desc: "Comprehensive business plans for startups and growth",
    items: ["Business Plan Writing", "Financial Projections", "Market Analysis", "Executive Summary"],
    price: "From KES 3500",
  },
  {
    id: "assignments",
    emoji: "🎓",
    name: "Academic Writing",
    desc: "Essays, assignments, thesis support, research editing",
    items: ["Essay Writing", "Assignment Help", "Thesis Support", "Research Editing"],
    price: "From KES 1500",
  },
];

export default function Writing() {
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
          background: "linear-gradient(135deg,#0f172a,#1e3a8a,#3b82f6)",
          padding: "68px 20px 56px",
          textAlign: "center",
        }}>
          <div className="cy-fade" style={{ maxWidth: 720, margin: "0 auto" }}>
            <h1 style={{ fontSize: "clamp(28px,6vw,46px)", fontWeight: 900, color: "#fff", marginBottom: 14, letterSpacing: "-1px" }}>
              Professional Writing Services
            </h1>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 26 }}>
              Expert writers for CVs, cover letters, proposals, reports, and more. Get noticed with professional writing.
            </p>
            <Link to="/cyber" style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 26px",
              background: "#fff", color: "#1e3a8a", borderRadius: 12, fontWeight: 800,
              fontSize: 14.5, textDecoration: "none",
            }}>
              ← Back to Cyber
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 20px" }}>
          <h2 style={{ fontWeight: 900, fontSize: 24, marginBottom: 20, color: "#111827" }}>Writing Services</h2>
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
                <div style={{ fontWeight: 800, fontSize: 14, color: "#3b82f6", marginTop: 12 }}>{s.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding: "48px 20px", textAlign: "center", background: "#f9fafb" }}>
          <h3 style={{ fontWeight: 900, fontSize: 22, marginBottom: 10, color: "#111827" }}>Ready to make an impact with your writing?</h3>
          <p style={{ color: "#6b7280", fontSize: 14.5, marginBottom: 20 }}>
            Our professional writers are ready to help you succeed.
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
