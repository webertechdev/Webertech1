// src/pages/cyber/Printing.jsx
// Printing Centre — Colour, B&W, Scanning, Lamination, Binding, Passport Photos

import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const SERVICES = [
  {
    id: "colour",
    emoji: "🎨",
    name: "Colour Printing",
    desc: "High-quality colour printing for documents, photos, posters",
    items: ["A4 Colour Printing", "A3 Colour Printing", "Poster Printing", "Photo Printing", "Flyer Printing"],
    price: "From KES 10/page",
  },
  {
    id: "bw",
    emoji: "⬛",
    name: "Black & White",
    desc: "Fast, affordable B&W printing for documents",
    items: ["A4 B&W Printing", "A3 B&W Printing", "Document Printing", "Bulk Printing"],
    price: "From KES 3/page",
  },
  {
    id: "scanning",
    emoji: "📸",
    name: "Scanning & PDF",
    desc: "Professional document scanning and PDF conversion",
    items: ["Document Scanning", "PDF Conversion", "Batch Scanning", "High-Resolution Scan"],
    price: "From KES 5/page",
  },
  {
    id: "passport",
    emoji: "📷",
    name: "Passport Photos",
    desc: "Professional passport photo printing",
    items: ["Passport Photos (4x6)", "Visa Photos", "ID Photos", "Professional Headshots"],
    price: "From KES 100",
  },
  {
    id: "lamination",
    emoji: "💎",
    name: "Lamination",
    desc: "Protect documents with professional lamination",
    items: ["A4 Lamination", "A3 Lamination", "ID Card Lamination", "Photo Lamination"],
    price: "From KES 50",
  },
  {
    id: "binding",
    emoji: "📚",
    name: "Binding & Finishing",
    desc: "Professional binding, spiral binding, comb binding",
    items: ["Spiral Binding", "Comb Binding", "Thermal Binding", "Stapling & Punching"],
    price: "From KES 100",
  },
  {
    id: "copying",
    emoji: "📋",
    name: "Photocopying",
    desc: "Fast, accurate photocopying services",
    items: ["A4 Photocopying", "A3 Photocopying", "Colour Copying", "Bulk Copying"],
    price: "From KES 2/copy",
  },
  {
    id: "design",
    emoji: "✏️",
    name: "Design & Editing",
    desc: "Document editing, design, and layout services",
    items: ["Document Editing", "Layout Design", "Poster Design", "Flyer Design"],
    price: "From KES 500",
  },
];

export default function Printing() {
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
          background: "linear-gradient(135deg,#0f172a,#4c0519,#be185d)",
          padding: "68px 20px 56px",
          textAlign: "center",
        }}>
          <div className="cy-fade" style={{ maxWidth: 720, margin: "0 auto" }}>
            <h1 style={{ fontSize: "clamp(28px,6vw,46px)", fontWeight: 900, color: "#fff", marginBottom: 14, letterSpacing: "-1px" }}>
              Printing Centre
            </h1>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 26 }}>
              Professional printing, scanning, lamination, binding, and design services. Fast turnaround, quality guaranteed.
            </p>
            <Link to="/cyber" style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 26px",
              background: "#fff", color: "#4c0519", borderRadius: 12, fontWeight: 800,
              fontSize: 14.5, textDecoration: "none",
            }}>
              ← Back to Cyber
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 20px" }}>
          <h2 style={{ fontWeight: 900, fontSize: 24, marginBottom: 20, color: "#111827" }}>Our Printing Services</h2>
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
                <div style={{ fontWeight: 800, fontSize: 14, color: "#be185d", marginTop: 12 }}>{s.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding: "48px 20px", textAlign: "center", background: "#f9fafb" }}>
          <h3 style={{ fontWeight: 900, fontSize: 22, marginBottom: 10, color: "#111827" }}>Need printing done today?</h3>
          <p style={{ color: "#6b7280", fontSize: 14.5, marginBottom: 20 }}>
            Visit us at WeberTech Cyber or order online with fast delivery.
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
