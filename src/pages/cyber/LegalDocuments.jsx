// src/pages/cyber/LegalDocuments.jsx
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { CATEGORIES } from "./data/legalDocumentsSeed";
import { useLegalDocuments } from "./data/useProducts";

export default function LegalDocuments() {
  const { products, loading } = useLegalDocuments();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === "all" || p.subcategory === activeCategory;
      const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, search]);

  return (
    <>
      <style>{`
        .ld-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:18px}
        .ld-card{background:#fff;border:1.5px solid #e5e7eb;border-radius:16px;overflow:hidden;text-decoration:none;color:inherit;display:block;transition:transform .15s,box-shadow .15s}
        .ld-card:hover{transform:translateY(-3px);box-shadow:0 14px 30px rgba(0,0,0,0.08)}
        .ld-chip{padding:8px 15px;border-radius:99px;font-size:13px;font-weight:700;border:1.5px solid #e5e7eb;background:#fff;color:#374151;cursor:pointer;white-space:nowrap}
        .ld-chip.active{background:#111827;color:#fff;border-color:#111827}
      `}</style>
      <Navbar />
      <div style={{ paddingTop: 64, minHeight: "80vh" }}>
        <div style={{ background: "#0f172a", padding: "44px 20px 32px", textAlign: "center" }}>
          <Link to="/cyber" style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>← Cyber Home</Link>
          <h1 style={{ color: "#fff", fontSize: "clamp(24px,5vw,36px)", fontWeight: 900, margin: "10px 0 8px" }}>
            Legal Documents Hub
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14.5 }}>
            Ready-made legal & business documents — pay and download instantly.
          </p>
        </div>

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 20px" }}>
          <input
            type="text" placeholder="🔍 Search documents (e.g. car sale, rental...)"
            value={search} onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%", padding: "13px 16px", border: "1.5px solid #e5e7eb",
              borderRadius: 12, fontSize: 14.5, marginBottom: 18, boxSizing: "border-box", fontFamily: "inherit",
            }}
          />

          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 22 }}>
            <button
              className={`ld-chip ${activeCategory === "all" ? "active" : ""}`}
              onClick={() => setSearchParams({})}
            >
              All
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                className={`ld-chip ${activeCategory === c.id ? "active" : ""}`}
                onClick={() => setSearchParams({ category: c.id })}
              >
                {c.emoji} {c.label}
              </button>
            ))}
          </div>

          {loading && <p style={{ color: "#9ca3af", fontSize: 13.5 }}>Loading documents…</p>}

          {!loading && filtered.length === 0 && (
            <p style={{ color: "#9ca3af", fontSize: 13.5 }}>No documents found. Try a different search or category.</p>
          )}

          <div className="ld-grid">
            {filtered.map((p) => (
              <Link key={p.slug} to={`/cyber/legal-documents/${p.slug}`} className="ld-card">
                <div style={{ background: "#f9fafb", padding: "28px 0", textAlign: "center", fontSize: 40 }}>
                  {p.image}
                </div>
                <div style={{ padding: 16 }}>
                  <div style={{ fontWeight: 800, fontSize: 14.5, color: "#111827", marginBottom: 6 }}>{p.title}</div>
                  <div style={{ fontSize: 12.5, color: "#6b7280", lineHeight: 1.5, marginBottom: 10, height: 36, overflow: "hidden" }}>
                    {p.description}
                  </div>
                  <div style={{ fontWeight: 900, fontSize: 16, color: "#16a34a" }}>KES {p.price.toLocaleString()}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
