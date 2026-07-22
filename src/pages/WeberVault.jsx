// src/pages/WeberVault.jsx
// Weber Vault — Secure document storage for reuse across services
// Store: KRA PIN, ID, Passport, Business Certificate, Driving License, Academic Certificates, CV

import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, query, where, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../config/firebase";
import { toast, Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const DOCUMENT_TYPES = [
  { id: "kra_pin", label: "KRA PIN", icon: "📋" },
  { id: "id", label: "National ID", icon: "🆔" },
  { id: "passport", label: "Passport", icon: "🛂" },
  { id: "business_cert", label: "Business Certificate", icon: "📜" },
  { id: "driving_license", label: "Driving License", icon: "🚗" },
  { id: "academic_cert", label: "Academic Certificate", icon: "🎓" },
  { id: "cv", label: "CV / Resume", icon: "📄" },
  { id: "other", label: "Other Document", icon: "📑" },
];

export default function WeberVault({ user }) {
  const [documents, setDocuments] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [selectedType, setSelectedType] = useState("kra_pin");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;
    loadVaultDocuments();
  }, [user?.uid]);

  const loadVaultDocuments = async () => {
    try {
      const snap = await getDocs(
        query(collection(db, "vault"), where("userId", "==", user.uid))
      );
      setDocuments(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error("Failed to load vault documents:", err);
    }
    setLoading(false);
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // Upload to Firebase Storage
      const storageRef = ref(storage, `vault/${user.uid}/${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      // Save metadata to Firestore
      const docType = DOCUMENT_TYPES.find(t => t.id === selectedType);
      await addDoc(collection(db, "vault"), {
        userId: user.uid,
        type: selectedType,
        typeLabel: docType?.label,
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        downloadURL,
        storagePath: storageRef.fullPath,
        uploadedAt: serverTimestamp(),
      });

      toast.success("Document uploaded successfully!");
      setSelectedType("kra_pin");
      e.target.value = "";
      loadVaultDocuments();
    } catch (err) {
      toast.error(err.message || "Upload failed");
    }
    setUploading(false);
  };

  const handleDelete = async (vaultDoc) => {
    if (!window.confirm(`Delete ${vaultDoc.typeLabel}?`)) return;

    try {
      // Delete from Storage
      const storageRef = ref(storage, vaultDoc.storagePath);
      await deleteObject(storageRef).catch(() => {}); // Ignore if not found

      // Delete from Firestore
      await deleteDoc(doc(db, "vault", vaultDoc.id));

      toast.success("Document deleted");
      loadVaultDocuments();
    } catch (err) {
      toast.error("Failed to delete document");
    }
  };

  const handleDownload = (vaultDoc) => {
    const a = document.createElement("a");
    a.href = vaultDoc.downloadURL;
    a.download = vaultDoc.fileName;
    a.click();
  };

  return (
    <>
      <Navbar />
      <Toaster />
      <div style={{ paddingTop: 100, paddingBottom: 80, background: "#f9fafb", minHeight: "100vh" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 20px" }}>
          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <h1 style={{ fontSize: 32, fontWeight: 900, color: "#111827", marginBottom: 8 }}>🔐 Weber Vault</h1>
            <p style={{ color: "#6b7280", fontSize: 15 }}>
              Store your important documents once. Reuse them across any WeberTech service without uploading again.
            </p>
          </div>

          {/* Upload Section */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e5e7eb", padding: 24, marginBottom: 28 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>Upload Document</h2>
            
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 8, color: "#374151" }}>
                Document Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: 12,
                  border: "1.5px solid #e5e7eb",
                  fontSize: 14,
                  fontFamily: "inherit",
                  outline: "none",
                }}
              >
                {DOCUMENT_TYPES.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.icon} {type.label}
                  </option>
                ))}
              </select>
            </div>

            <label style={{ display: "block", cursor: "pointer" }}>
              <input
                type="file"
                onChange={handleUpload}
                disabled={uploading}
                style={{ display: "none" }}
              />
              <div style={{
                padding: 32,
                border: "2px dashed #16a34a",
                borderRadius: 12,
                textAlign: "center",
                background: "#f0fdf4",
                cursor: "pointer",
                transition: "all .15s",
              }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>📤</div>
                <p style={{ fontWeight: 700, color: "#16a34a", marginBottom: 4 }}>
                  {uploading ? "Uploading..." : "Click to upload"}
                </p>
                <p style={{ fontSize: 13, color: "#9ca3af" }}>PDF, Images, or Documents (Max 10MB)</p>
              </div>
            </label>
          </div>

          {/* Documents Grid */}
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>Your Stored Documents</h2>
            
            {loading ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{ width: 40, height: 40, border: "3px solid #e5e7eb", borderTopColor: "#16a34a", borderRadius: "50%", margin: "0 auto", animation: "spin .8s linear infinite" }} />
                <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
              </div>
            ) : documents.length === 0 ? (
              <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e5e7eb", padding: 40, textAlign: "center" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
                <p style={{ color: "#9ca3af", fontSize: 15 }}>No documents stored yet. Upload one to get started!</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 16 }}>
                {documents.map(vaultDoc => (
                  <div key={vaultDoc.id} style={{ background: "#fff", borderRadius: 14, border: "1.5px solid #e5e7eb", padding: 16, display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>
                      {DOCUMENT_TYPES.find(t => t.id === vaultDoc.type)?.icon}
                    </div>
                    <h3 style={{ fontWeight: 800, fontSize: 14, color: "#111827", marginBottom: 4 }}>
                      {vaultDoc.typeLabel}
                    </h3>
                    <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 12 }}>
                      {vaultDoc.fileName}
                    </p>
                    <p style={{ fontSize: 11, color: "#9ca3af", marginBottom: 12 }}>
                      Uploaded {new Date(vaultDoc.uploadedAt?.toDate?.() || Date.now()).toLocaleDateString()}
                    </p>
                    <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
                      <button
                        onClick={() => handleDownload(vaultDoc)}
                        style={{
                          flex: 1,
                          padding: "10px",
                          borderRadius: 10,
                          border: "1.5px solid #16a34a",
                          background: "#f0fdf4",
                          color: "#16a34a",
                          fontWeight: 700,
                          fontSize: 12,
                          cursor: "pointer",
                          transition: "all .15s",
                        }}
                      >
                        ⬇️ Download
                      </button>
                      <button
                        onClick={() => handleDelete(vaultDoc)}
                        style={{
                          flex: 1,
                          padding: "10px",
                          borderRadius: 10,
                          border: "1.5px solid #fee2e2",
                          background: "#fef2f2",
                          color: "#dc2626",
                          fontWeight: 700,
                          fontSize: 12,
                          cursor: "pointer",
                          transition: "all .15s",
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info Box */}
          <div style={{ background: "#ecfdf5", borderRadius: 14, border: "1.5px solid #a7f3d0", padding: 16, marginTop: 28 }}>
            <p style={{ fontSize: 13, color: "#065f46", lineHeight: 1.6 }}>
              <strong>💡 Tip:</strong> Once you upload documents to Weber Vault, you can quickly reuse them when applying for government services, registering businesses, or requesting professional services. No need to upload the same document multiple times!
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
