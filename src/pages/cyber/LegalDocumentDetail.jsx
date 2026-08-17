// src/pages/cyber/LegalDocumentDetail.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import DocumentPreview from "../../components/DocumentPreview";
import { legalDocuments as seedDocs } from "./data/legalDocumentsSeed";
import { toast, Toaster } from "react-hot-toast";

export default function LegalDocumentDetail() {
  const { id } = useParams();
  const [documentData, setDocumentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        setLoading(true);
        // Check seed data first
        const seed = seedDocs.find(d => d.id === id);
        if (seed) {
          setDocumentData(seed);
        } else {
          // Check Firestore
          const snap = await getDoc(doc(db, "cyber_documents", id));
          if (snap.exists()) {
            setDocumentData({ id: snap.id, ...snap.data() });
          }
        }
      } catch (err) {
        console.error("Failed to fetch document detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoc();
  }, [id]);

  const handleBuy = () => {
    setShowPayment(true);
    toast("🔒 WeberPay initializing...", { icon: "💳" });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ paddingTop: 120, textAlign: "center", minHeight: "60vh" }}>
          <div style={{ width: 40, height: 40, border: "3px solid #e5e7eb", borderTopColor: "#16a34a", borderRadius: "50%", margin: "0 auto 12px", animation: "spin .8s linear infinite" }} />
          <p style={{ color: "#9ca3af" }}>Loading document details...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!documentData) {
    return (
      <>
        <Navbar />
        <div style={{ paddingTop: 120, textAlign: "center", minHeight: "60vh" }}>
          <h2 style={{ fontWeight: 900 }}>Document Not Found</h2>
          <p style={{ color: "#6b7280" }}>The document you are looking for does not exist or has been removed.</p>
          <Link to="/cyber/legal-documents" style={{ color: "#16a34a", fontWeight: 700 }}>← Back to Hub</Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Toaster position="top-center" />
      <Navbar />
      
      <div style={{ paddingTop: 100, paddingBottom: 80, background: "#f9fafb" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          
          <div style={{ marginBottom: 24 }}>
            <Link to="/cyber/legal-documents" style={{ color: "#6b7280", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
              Cyber / Legal Documents / {documentData.title}
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 40, alignItems: "start" }}>
            
            {/* Left: Preview & Description */}
            <div>
              <div style={{ background: "#fff", borderRadius: 20, border: "1.5px solid #e5e7eb", padding: 32, marginBottom: 32 }}>
                <div style={{ fontSize: 48, marginBottom: 20 }}>{documentData.icon || "📄"}</div>
                <h1 style={{ fontSize: 32, fontWeight: 900, color: "#111827", marginBottom: 16 }}>{documentData.title}</h1>
                <p style={{ fontSize: 18, color: "#4b5563", lineHeight: 1.6, marginBottom: 32 }}>
                  {documentData.description}
                </p>

                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>Features</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
                  {(documentData.features || []).map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#4b5563" }}>
                      <span style={{ color: "#16a34a" }}>✓</span> {f}
                    </div>
                  ))}
                </div>

                {/* Document Preview with Watermark */}
                {(documentData.fileUrl || documentData.downloadURL) && (
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>Document Preview</h3>
                    <DocumentPreview 
                      fileUrl={documentData.fileUrl || documentData.downloadURL} 
                      fileName={documentData.fileName || documentData.title + ".pdf"} 
                      watermark={true}
                    />
                    <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 12, textAlign: "center" }}>
                      Preview contains a <b>webertech.co.ke</b> watermark. Full document available after payment.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Purchase Sidebar */}
            <div style={{ position: "sticky", top: 100 }}>
              <div style={{ background: "#fff", borderRadius: 20, border: "1.5px solid #e5e7eb", padding: 32, boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Price</div>
                <div style={{ fontSize: 42, fontWeight: 900, color: "#111827", marginBottom: 8 }}>
                  KES {documentData.price}
                </div>
                <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 24 }}>One-time payment for lifetime access</div>

                <button 
                  onClick={handleBuy}
                  style={{
                    width: "100%",
                    padding: "16px",
                    background: "#16a34a",
                    color: "#fff",
                    border: "none",
                    borderRadius: 12,
                    fontSize: 18,
                    fontWeight: 800,
                    cursor: "pointer",
                    transition: "transform .1s",
                    marginBottom: 16
                  }}
                  onMouseDown={e => e.target.style.transform = "scale(0.98)"}
                  onMouseUp={e => e.target.style.transform = "scale(1)"}
                >
                  Buy & Download Now
                </button>

                <div style={{ textAlign: "center", fontSize: 12, color: "#9ca3af" }}>
                  Secured by <b>WeberPay</b> • NestLink & IntaSend
                </div>

                <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1.5px solid #f3f4f6" }}>
                  <h4 style={{ fontSize: 14, fontWeight: 800, marginBottom: 12 }}>What's Included:</h4>
                  <ul style={{ padding: 0, margin: 0, listStyle: "none", display: "grid", gap: 10 }}>
                    <li style={{ fontSize: 13, color: "#4b5563", display: "flex", alignItems: "center", gap: 8 }}>
                      📎 1 editable .docx or .pdf file
                    </li>
                    <li style={{ fontSize: 13, color: "#4b5563", display: "flex", alignItems: "center", gap: 8 }}>
                      📎 Instructions for use
                    </li>
                    <li style={{ fontSize: 13, color: "#4b5563", display: "flex", alignItems: "center", gap: 8 }}>
                      ⚡ Instant download after payment
                    </li>
                  </ul>
                </div>
              </div>

              {/* Related Docs Placeholder */}
              <div style={{ marginTop: 24, padding: "0 8px" }}>
                <h4 style={{ fontSize: 14, fontWeight: 800, color: "#111827", marginBottom: 12 }}>Related Documents</h4>
                {seedDocs.filter(d => d.id !== id).slice(0, 2).map(rd => (
                  <Link key={rd.id} to={`/cyber/legal-documents/${rd.id}`} style={{ display: "block", background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 12, padding: 12, marginBottom: 12, textDecoration: "none", color: "inherit" }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <div style={{ fontSize: 20 }}>{rd.icon}</div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700 }}>{rd.title}</div>
                        <div style={{ fontSize: 12, color: "#16a34a", fontWeight: 700 }}>KES {rd.price}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}
