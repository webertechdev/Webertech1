// src/pages/cyber/LegalDocumentDetail.jsx
import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { auth } from "../../config/firebase";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import DocumentPreview from "../../components/DocumentPreview";
import Checkout from "../../payments/Checkout";
import PaymentStatus from "../../payments/PaymentStatus";
import { usePayment } from "../../payments/hooks/usePayment";
import { toast, Toaster } from "react-hot-toast";

const toFeatures = (value) => {
  if (Array.isArray(value)) return value.filter(Boolean);
  return String(value || "").split(",").map(item => item.trim()).filter(Boolean);
};

const normalize = (record, id) => {
  const resolvedId = id || record.id;
  const sourceUrl = record.fileUrl || record.downloadURL || record.downloadFile || record.documentUrl || record.url || "";
  const { fileUrl, downloadURL, downloadFile, documentUrl, url, ...safeRecord } = record;
  return {
    id: resolvedId,
    ...safeRecord,
    slug: record.slug || resolvedId || String(record.title || "document").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    features: toFeatures(record.features),
    published: record.published !== false,
    previewUrl: record.previewUrl || (sourceUrl ? `/api/document-preview?productId=${encodeURIComponent(resolvedId)}` : ""),
    hasDocument: Boolean(record.hasDocument || sourceUrl),
  };
};

async function findDocument(identifier) {
  // Always prefer a live admin-uploaded product. Seed records are only a
  // fallback and must not hide a matching Firestore document with its real URL.
  try {
    const response = await fetch("/api/public-products");
    const payload = await response.json().catch(() => ({}));
    if (response.ok) {
      const match = (payload.products || []).find(item => item.id === identifier || item.slug === identifier);
      if (match) return normalize(match, match.id);
    }
  } catch (error) {
    console.warn("Published product API unavailable; trying direct reads:", error);
  }

  for (const source of ["products", "cyber_documents"]) {
    try {
      const direct = await getDoc(doc(db, source, identifier));
      if (direct.exists()) return normalize(direct.data(), direct.id);

      const snapshot = await getDocs(collection(db, source));
      const match = snapshot.docs.find(item => {
        const data = item.data();
        return data.slug === identifier || data.id === identifier;
      });
      if (match) return normalize(match.data(), match.id);
    } catch (error) {
      console.warn(`Unable to read ${source}:`, error);
    }
  }

  return null;
}

async function findPaidEntitlement(productId, userId) {
  if (!productId || !userId) return null;
  try {
    const [ordersSnapshot, downloadsSnapshot] = await Promise.all([
      getDocs(collection(db, "orders")),
      getDocs(collection(db, "downloads")),
    ]);
    const paidOrders = ordersSnapshot.docs
      .map(item => ({ id: item.id, ...item.data() }))
      .filter(order => order.customerId === userId
        && String(order.productId) === String(productId)
        && ["paid", "completed", "complete"].includes(String(order.status || "").toLowerCase()))
      .sort((a, b) => (b.updatedAt?.toDate?.()?.getTime?.() || b.createdAt?.toDate?.()?.getTime?.() || 0)
        - (a.updatedAt?.toDate?.()?.getTime?.() || a.createdAt?.toDate?.()?.getTime?.() || 0));
    const order = paidOrders[0];
    if (!order) return null;
    const download = downloadsSnapshot.docs
      .map(item => ({ id: item.id, ...item.data() }))
      .find(item => item.orderId === (order.orderId || order.id) && item.customerId === userId);
    return { orderId: order.orderId || order.id, productId, downloadId: download?.id || null };
  } catch (error) {
    console.warn("Unable to restore paid document entitlement:", error);
    return null;
  }
}

export default function LegalDocumentDetail() {
  const { id } = useParams();
  const [documentData, setDocumentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [entitlement, setEntitlement] = useState(null);
  const { state: paymentState, pay, reset, refreshStatus } = usePayment();
  const product = useMemo(() => documentData ? {
    ...documentData,
    type: documentData.type || "legal-document",
    price: Number(documentData.price || 0),
  } : null, [documentData]);

  useEffect(() => {
    let active = true;
    const fetchDoc = async () => {
      setLoading(true);
      const result = await findDocument(id);
      if (active) {
        setDocumentData(result);
        setLoading(false);
      }
    };
    fetchDoc();
    return () => { active = false; };
  }, [id]);

  useEffect(() => {
    let active = true;
    const restoreEntitlement = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser || !product?.id) return;
      const restored = await findPaidEntitlement(product.id, currentUser.uid);
      if (active && restored) setEntitlement(restored);
    };
    restoreEntitlement();
    return () => { active = false; };
  }, [product?.id]);

  useEffect(() => {
    if (paymentState.checkoutUrl) {
      window.open(paymentState.checkoutUrl, "_blank", "noopener,noreferrer");
    }
  }, [paymentState.checkoutUrl]);

  useEffect(() => {
    if (paymentState.step === "paid" && paymentState.orderId && product?.id) {
      const nextEntitlement = { orderId: paymentState.orderId, productId: product.id };
      setEntitlement(nextEntitlement);
      try { window.localStorage.setItem(`webertech:paid-document:${auth.currentUser?.uid || "guest"}:${product.id}`, JSON.stringify(nextEntitlement)); } catch {}
    }
  }, [paymentState.step, paymentState.orderId, product?.id]);

  useEffect(() => {
    if (paymentState.step !== "paid" || !showPayment) return undefined;
    toast.success("Payment confirmed. Your download is ready.");
    const timer = window.setTimeout(() => setShowPayment(false), 1400);
    return () => window.clearTimeout(timer);
  }, [paymentState.step, showPayment]);

  const handlePay = ({ method, phone, email, firstName, lastName }) => {
    const currentUser = auth.currentUser;
    pay({
      method,
      product,
      phone,
      email,
      firstName,
      lastName,
      customer: currentUser ? {
        uid: currentUser.uid,
        email: currentUser.email || email,
        name: currentUser.displayName || `${firstName || ""} ${lastName || ""}`.trim(),
      } : { email, name: `${firstName || ""} ${lastName || ""}`.trim() },
    });
  };

  const closePayment = () => {
    if (paymentState.step !== "starting" && paymentState.step !== "awaiting") {
      reset();
      setShowPayment(false);
    }
  };

  if (loading) {
    return <><Navbar /><div style={{ paddingTop: 120, textAlign: "center", minHeight: "60vh" }}><div style={{ width: 40, height: 40, border: "3px solid #e5e7eb", borderTopColor: "#16a34a", borderRadius: "50%", margin: "0 auto 12px", animation: "spin .8s linear infinite" }} /><p style={{ color: "#9ca3af" }}>Loading document details...</p></div><Footer /></>;
  }

  if (!product) {
    return <><Navbar /><div style={{ paddingTop: 120, textAlign: "center", minHeight: "60vh" }}><h2 style={{ fontWeight: 900 }}>Document Not Found</h2><p style={{ color: "#6b7280" }}>The document is unavailable or has not been published.</p><Link to="/cyber/legal-documents" style={{ color: "#16a34a", fontWeight: 700 }}>← Back to Hub</Link></div><Footer /></>;
  }

  const previewUrl = product.previewUrl || "";
  const paid = paymentState.step === "paid" || Boolean(entitlement?.orderId);
  const documentOrderId = paymentState.orderId || entitlement?.orderId;
  const downloadUrl = paid && documentOrderId
    ? `/api/document-download?orderId=${encodeURIComponent(documentOrderId)}&productId=${encodeURIComponent(product.id)}`
    : "";
  const busy = paymentState.step === "starting" || paymentState.step === "awaiting";

  return (
    <>
      <Toaster position="top-center" />
      <Navbar />
      <div style={{ paddingTop: 100, paddingBottom: 80, background: "#f9fafb", minHeight: "80vh" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ marginBottom: 24 }}><Link to="/cyber/legal-documents" style={{ color: "#6b7280", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>Cyber / Legal Documents / {product.title}</Link></div>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 400px", gap: 40, alignItems: "start" }}>
            <div>
              <div style={{ background: "#fff", borderRadius: 20, border: "1.5px solid #e5e7eb", padding: 32, marginBottom: 32 }}>
                <div style={{ fontSize: 48, marginBottom: 20 }}>{product.icon || "📄"}</div>
                <h1 style={{ fontSize: 32, fontWeight: 900, color: "#111827", marginBottom: 16 }}>{product.title}</h1>
                <p style={{ fontSize: 18, color: "#4b5563", lineHeight: 1.6, marginBottom: 32 }}>{product.description || "Ready-to-use WeberTech document."}</p>
                {product.features.length > 0 && <><h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>Features</h3><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>{product.features.map((feature, index) => <div key={`${feature}-${index}`} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#4b5563" }}><span style={{ color: "#16a34a" }}>✓</span>{feature}</div>)}</div></>}
                <div><h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>Watermarked Preview</h3><DocumentPreview fileUrl={previewUrl} fileName={product.fileName || `${product.title}.pdf`} title={product.title} description={product.description} features={product.features} watermark /><p style={{ fontSize: 12, color: "#9ca3af", marginTop: 12, textAlign: "center" }}>Preview contains a <b>webertech.co.ke</b> watermark. The original file is available after payment.</p></div>
              </div>
            </div>
            <div style={{ position: "sticky", top: 100 }}>
              <div style={{ background: "#fff", borderRadius: 20, border: "1.5px solid #e5e7eb", padding: 32, boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Price</div>
                <div style={{ fontSize: 42, fontWeight: 900, color: "#111827", marginBottom: 8 }}>KES {product.price.toLocaleString()}</div>
                <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 24 }}>One-time payment for lifetime access</div>
                {paid ? <div style={{ padding: 18, borderRadius: 12, background: "#dcfce7", color: "#166534" }}><strong>Payment confirmed.</strong><p style={{ margin: "8px 0 14px", fontSize: 13 }}>Your original PDF is ready. WeberTech delivers it through a paid order link.</p>{downloadUrl ? <a href={downloadUrl} download={product.fileName || product.title} style={{ display: "block", textAlign: "center", padding: "12px 14px", background: "#16a34a", color: "#fff", borderRadius: 10, textDecoration: "none", fontWeight: 800 }}>⬇ Download original PDF</a> : <p style={{ margin: 0, fontSize: 13 }}>Your download link is being prepared. Refresh this page once.</p>}</div> : <button onClick={() => { setShowPayment(true); toast("🔒 WeberPay initializing", { icon: "💳" }); }} style={{ width: "100%", padding: "16px", background: "#16a34a", color: "#fff", border: "none", borderRadius: 12, fontSize: 18, fontWeight: 800, cursor: "pointer", marginBottom: 16 }}>Buy & Download Now</button>}
                <div style={{ textAlign: "center", fontSize: 12, color: "#9ca3af" }}>Secured by <b>WeberPay</b> · NestLink & IntaSend</div>
                <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1.5px solid #f3f4f6" }}><h4 style={{ fontSize: 14, fontWeight: 800, marginBottom: 12 }}>What's Included:</h4><ul style={{ padding: 0, margin: 0, listStyle: "none", display: "grid", gap: 10 }}><li style={{ fontSize: 13, color: "#4b5563" }}>📎 Original public PDF delivered after payment</li><li style={{ fontSize: 13, color: "#4b5563" }}>📎 Watermarked preview before payment</li><li style={{ fontSize: 13, color: "#4b5563" }}>⚡ Download after payment confirmation</li></ul></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPayment && product && <div style={{ position: "fixed", inset: 0, zIndex: 1200, background: "rgba(15,23,42,.62)", display: "grid", placeItems: "center", padding: 20 }}><div style={{ width: "min(560px, 100%)", maxHeight: "90vh", overflowY: "auto", background: "#fff", borderRadius: 20, padding: 26, position: "relative" }}><button onClick={closePayment} disabled={busy} style={{ position: "absolute", right: 16, top: 12, border: 0, background: "transparent", fontSize: 22, cursor: busy ? "not-allowed" : "pointer", color: "#6b7280" }}>×</button>{busy ? <PaymentStatus {...paymentState} product={product} onRefresh={refreshStatus} onRetry={reset} onClose={closePayment} /> : paymentState.step === "failed" ? <><PaymentStatus {...paymentState} product={product} onRefresh={refreshStatus} onRetry={reset} onClose={closePayment} /><button onClick={reset} style={{ width: "100%", padding: 12, border: 0, borderRadius: 10, background: "#16a34a", color: "#fff", fontWeight: 800 }}>Try again</button></> : <Checkout product={product} onPay={handlePay} submitting={busy} />}</div></div>}
      <Footer />
    </>
  );
}
