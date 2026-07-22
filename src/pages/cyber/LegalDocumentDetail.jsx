// src/pages/cyber/LegalDocumentDetail.jsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PaymentModal from "../../payments/PaymentModal";
import { useLegalDocuments } from "./data/useProducts";

export default function LegalDocumentDetail() {
  const { slug } = useParams();
  const { products, loading } = useLegalDocuments();
  const [payOpen, setPayOpen] = useState(false);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fu) => {
      if (!fu) return setCustomer(null);
      try {
        const snap = await getDoc(doc(db, "users", fu.uid));
        const data = snap.exists() ? snap.data() : {};
        setCustomer({ uid: fu.uid, email: fu.email, name: data.name || data.firstName || "" });
      } catch {
        setCustomer({ uid: fu.uid, email: fu.email, name: "" });
      }
    });
    return () => unsub();
  }, []);

  const product = products.find((p) => p.slug === slug);
  const related = products.filter((p) => p.slug !== slug && p.subcategory === product?.subcategory).slice(0, 3);

  if (loading && !product) {
    return (
      <>
        <Navbar />
        <div style={{ paddingTop: 120, textAlign: "center", color: "#9ca3af" }}>Loading…</div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div style={{ paddingTop: 120, textAlign: "center" }}>
          <h2 style={{ fontWeight: 900, fontSize: 22, marginBottom: 10 }}>Document not found</h2>
          <Link to="/cyber/legal-documents" style={{ color: "#16a34a", fontWeight: 700, textDecoration: "none" }}>← Back to Legal Documents</Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: 64 }}>
        {/* Breadcrumb + Hero */}
        <div style={{ background: "#0f172a", padding: "36px 20px 30px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>
              <Link to="/cyber" style={{ color: "inherit", textDecoration: "none" }}>Cyber</Link> {" / "}
              <Link to="/cyber/legal-documents" style={{ color: "inherit", textDecoration: "none" }}>Legal Documents</Link> {" / "}
              <span style={{ color: "rgba(255,255,255,0.8)" }}>{product.title}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ fontSize: 44 }}>{product.image}</div>
              <div>
                <h1 style={{ color: "#fff", fontSize: "clamp(22px,4.5vw,32px)", fontWeight: 900, marginBottom: 4 }}>
                  {product.title}
                </h1>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14 }}>Instant download after payment</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px", display: "grid", gridTemplateColumns: "1fr 300px", gap: 32 }}>
          <div>
            <h2 style={sectionTitle}>Description</h2>
            <p style={{ color: "#374151", fontSize: 14.5, lineHeight: 1.8, marginBottom: 26 }}>{product.description}</p>

            <h2 style={sectionTitle}>Features</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 26 }}>
              {(product.features || []).map((f) => (
                <div key={f} style={{ display: "flex", gap: 8, fontSize: 13.5, color: "#374151" }}>
                  <span style={{ color: "#16a34a" }}>✓</span> {f}
                </div>
              ))}
            </div>

            <h2 style={sectionTitle}>What's Included</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 26 }}>
              {(product.includes || []).map((f) => (
                <div key={f} style={{ display: "flex", gap: 8, fontSize: 13.5, color: "#374151" }}>
                  <span style={{ color: "#16a34a" }}>📎</span> {f}
                </div>
              ))}
            </div>

            {related.length > 0 && (
              <>
                <h2 style={sectionTitle}>Related Documents</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {related.map((r) => (
                    <Link key={r.slug} to={`/cyber/legal-documents/${r.slug}`}
                      style={{ fontSize: 13.5, color: "#16a34a", fontWeight: 600, textDecoration: "none" }}>
                      {r.image} {r.title} — KES {r.price.toLocaleString()}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Purchase card */}
          <div>
            <div style={{
              position: "sticky", top: 80, background: "#fff", border: "1.5px solid #e5e7eb",
              borderRadius: 16, padding: 22, boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
            }}>
              <div style={{ fontWeight: 900, fontSize: 26, color: "#16a34a", marginBottom: 4 }}>
                KES {product.price.toLocaleString()}
              </div>
              <div style={{ fontSize: 12.5, color: "#9ca3af", marginBottom: 16 }}>One-time payment</div>
              <button
                onClick={() => setPayOpen(true)}
                style={{
                  width: "100%", padding: "14px 0", background: "#16a34a", color: "#fff",
                  border: "none", borderRadius: 12, fontWeight: 800, fontSize: 15,
                  cursor: "pointer", fontFamily: "inherit",
                }}
              >
                Buy & Download
              </button>
              <p style={{ fontSize: 11.5, color: "#9ca3af", textAlign: "center", marginTop: 10 }}>
                Secured by WeberPay · NestLink or IntaSend
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <PaymentModal
        open={payOpen}
        onClose={() => setPayOpen(false)}
        product={{ id: product.id, slug: product.slug, title: product.title, price: product.price, type: product.type }}
        customer={customer}
      />
    </>
  );
}

const sectionTitle = { fontWeight: 800, fontSize: 16, color: "#111827", marginBottom: 12 };
