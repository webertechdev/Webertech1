// src/pages/cyber/LegalDocuments.jsx
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { CATEGORIES } from "./data/legalDocumentsSeed";

const slugify = (value = "") => String(value)
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

const normalizeDocument = (record, id) => {
  const category = String(record.category || record.division || "cyber").toLowerCase();
  const isCyberDocument = category.includes("cyber") || category.includes("legal") || record.type === "legal-document" || record.division === "cyber";
  return {
    id: id || record.id || slugify(record.title),
    ...record,
    slug: record.slug || id || slugify(record.title),
    category,
    type: record.type || (isCyberDocument ? "legal-document" : "service"),
    published: record.published !== false,
  };
};

function belongsToCategory(document, categoryFilter) {
  if (categoryFilter === "all") return true;
  const haystack = [
    document.category,
    document.subcategory,
    document.documentCategory,
    document.title,
    document.description,
  ].filter(Boolean).join(" ").toLowerCase();

  if (categoryFilter === "legal") return document.type === "legal-document" || haystack.includes("legal") || haystack.includes("business") || haystack.includes("cyber");
  if (categoryFilter === "vehicle") return /vehicle|car|motorcycle|transport|sale agreement/.test(haystack);
  return haystack.includes(categoryFilter);
}

async function loadCatalog() {
  const liveProducts = [];

  // Firestore products are the single source of truth. The public API is
  // preferred so published products remain discoverable without exposing
  // private admin collections to customers.
  try {
    const response = await fetch("/api/public-products");
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || "Published catalog unavailable");
    return (payload.products || [])
      .map(item => normalizeDocument(item, item.id))
      .filter(document => document.published);
  } catch (error) {
    console.warn("Published product API unavailable; trying live Firestore reads", error);
  }

  try {
    const snapshot = await getDocs(collection(db, "products"));
    snapshot.docs.forEach(item => {
      const normalized = normalizeDocument(item.data(), item.id);
      if (normalized.published) liveProducts.push(normalized);
    });
  } catch (error) {
    console.warn("Live product catalog unavailable", error);
  }

  return liveProducts;
}

export default function LegalDocuments() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category") || "all";
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const fetchDocs = async () => {
      setLoading(true);
      setError("");
      try {
        const allDocuments = await loadCatalog();
        if (active) setDocuments(allDocuments.filter(document => belongsToCategory(document, categoryFilter)));
      } catch (loadError) {
        console.error("Failed to fetch documents:", loadError);
        if (active) {
          setDocuments([]);
          setError("The live catalog is temporarily unavailable. Click Refresh or try again shortly.");
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchDocs();
    return () => { active = false; };
  }, [categoryFilter]);

  return (
    <>
      <style>{`
        .ld-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }
        .ld-card { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 16px; overflow: hidden; transition: transform .2s, box-shadow .2s; text-decoration: none; color: inherit; display: flex; flex-direction: column; }
        .ld-card:hover { transform: translateY(-4px); box-shadow: 0 12px 30px rgba(0,0,0,0.08); }
        .ld-content { padding: 20px; flex-grow: 1; }
        .ld-footer { padding: 16px 20px; background: #f9fafb; border-top: 1.5px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center; gap: 12px; }
        .ld-category-btn { padding: 8px 16px; border-radius: 99px; border: 1.5px solid #e5e7eb; background: #fff; color: #4b5563; font-weight: 600; font-size: 14px; text-decoration: none; transition: all .2s; white-space: nowrap; }
        .ld-category-btn.active { background: #16a34a; border-color: #16a34a; color: #fff; }
      `}</style>

      <Navbar />
      <div style={{ paddingTop: 100, paddingBottom: 80, background: "#f9fafb", minHeight: "80vh" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ marginBottom: 40 }}>
            <h1 style={{ fontSize: 36, fontWeight: 900, color: "#111827", marginBottom: 12 }}>Legal & Business Documents</h1>
            <p style={{ fontSize: 18, color: "#6b7280" }}>Professional, ready-to-use templates for every need in Kenya.</p>
          </div>

          <div style={{ display: "flex", gap: 12, marginBottom: 40, overflowX: "auto", paddingBottom: 8 }}>
            {CATEGORIES.map(category => (
              <Link
                key={category.id}
                to={`/cyber/legal-documents?category=${category.id}`}
                className={`ld-category-btn ${categoryFilter === category.id ? "active" : ""}`}
              >
                {category.emoji} {category.label}
              </Link>
            ))}
          </div>

          {error && <div style={{ marginBottom: 20, padding: 14, borderRadius: 12, background: "#fff7ed", color: "#9a3412", border: "1px solid #fed7aa" }}>{error}</div>}

          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ width: 40, height: 40, border: "3px solid #e5e7eb", borderTopColor: "#16a34a", borderRadius: "50%", margin: "0 auto 12px", animation: "spin .8s linear infinite" }} />
              <p style={{ color: "#9ca3af" }}>Loading documents...</p>
            </div>
          ) : (
            <div className="ld-grid">
              {documents.map(document => (
                <Link key={document.id} to={`/cyber/legal-documents/${document.slug || document.id}`} className="ld-card">
                  <div className="ld-content">
                    <div style={{ fontSize: 32, marginBottom: 16 }}>{document.icon || "📄"}</div>
                    <h3 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 8 }}>{document.title}</h3>
                    <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6, marginBottom: 14 }}>{document.description || "Ready-to-use WeberTech digital document."}</p>
                    {document.fileUrl ? <span style={{ color: "#16a34a", fontSize: 12, fontWeight: 800 }}>◉ Watermarked preview available</span> : <span style={{ color: "#9ca3af", fontSize: 12 }}>Preview coming soon</span>}
                  </div>
                  <div className="ld-footer">
                    <div style={{ fontWeight: 800, color: "#111827" }}>KES {Number(document.price || 0).toLocaleString()}</div>
                    <div style={{ color: "#16a34a", fontWeight: 700, fontSize: 14 }}>View & Buy →</div>
                  </div>
                </Link>
              ))}
              {documents.length === 0 && (
                <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px 0", background: "#fff", borderRadius: 16, border: "1.5px solid #e5e7eb" }}>
                  <p style={{ color: "#9ca3af" }}>No documents found in this category.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
