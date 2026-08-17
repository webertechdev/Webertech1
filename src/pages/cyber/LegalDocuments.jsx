// src/pages/cyber/LegalDocuments.jsx
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { CATEGORIES, legalDocuments as seedDocs } from "./data/legalDocumentsSeed";

export default function LegalDocuments() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category") || "all";
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        setLoading(true);
        // Combine seed data with Firestore documents
        const snap = await getDocs(collection(db, "cyber_documents"));
        const firestoreDocs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        
        const allDocs = [...seedDocs, ...firestoreDocs];
        
        if (categoryFilter === "all") {
          setDocuments(allDocs);
        } else {
          setDocuments(allDocs.filter(d => d.category?.toLowerCase() === categoryFilter.toLowerCase()));
        }
      } catch (err) {
        console.error("Failed to fetch documents:", err);
        setDocuments(seedDocs); // Fallback to seed data
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();
  }, [categoryFilter]);

  return (
    <>
      <style>{`
        .ld-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }
        .ld-card { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 16px; overflow: hidden; transition: transform .2s, box-shadow .2s; text-decoration: none; color: inherit; display: flex; flex-direction: column; }
        .ld-card:hover { transform: translateY(-4px); box-shadow: 0 12px 30px rgba(0,0,0,0.08); }
        .ld-content { padding: 20px; flex-grow: 1; }
        .ld-footer { padding: 16px 20px; background: #f9fafb; border-top: 1.5px solid #e5e7eb; display: flex; justifyContent: space-between; alignItems: center; }
        .ld-category-btn { padding: 8px 16px; border-radius: 99px; border: 1.5px solid #e5e7eb; background: #fff; color: #4b5563; font-weight: 600; font-size: 14px; text-decoration: none; transition: all .2s; }
        .ld-category-btn.active { background: #16a34a; border-color: #16a34a; color: #fff; }
      `}</style>

      <Navbar />
      
      <div style={{ paddingTop: 100, paddingBottom: 80, background: "#f9fafb", minHeight: "80vh" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          
          <div style={{ marginBottom: 40 }}>
            <h1 style={{ fontSize: 36, fontWeight: 900, color: "#111827", marginBottom: 12 }}>Legal & Business Documents</h1>
            <p style={{ fontSize: 18, color: "#6b7280" }}>Professional, ready-to-use templates for every need in Kenya.</p>
          </div>

          {/* Categories */}
          <div style={{ display: "flex", gap: 12, marginBottom: 40, overflowX: "auto", paddingBottom: 8 }}>
            {CATEGORIES.map(cat => (
              <Link 
                key={cat.id} 
                to={`/cyber/legal-documents?category=${cat.id}`}
                className={`ld-category-btn ${categoryFilter === cat.id ? "active" : ""}`}
              >
                {cat.icon} {cat.name}
              </Link>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ width: 40, height: 40, border: "3px solid #e5e7eb", borderTopColor: "#16a34a", borderRadius: "50%", margin: "0 auto 12px", animation: "spin .8s linear infinite" }} />
              <p style={{ color: "#9ca3af" }}>Loading documents...</p>
            </div>
          ) : (
            <div className="ld-grid">
              {documents.map(doc => (
                <Link key={doc.id} to={`/cyber/legal-documents/${doc.id}`} className="ld-card">
                  <div className="ld-content">
                    <div style={{ fontSize: 32, marginBottom: 16 }}>{doc.icon || "📄"}</div>
                    <h3 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 8 }}>{doc.title}</h3>
                    <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6, marginBottom: 0 }}>{doc.description}</p>
                  </div>
                  <div className="ld-footer">
                    <div style={{ fontWeight: 800, color: "#111827" }}>KES {doc.price}</div>
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
