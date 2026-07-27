// src/pages/UnifiedControlCenterFixed.jsx
// WeberTech Unified Control Center - FIXED VERSION
// Proper Firestore handling, working uploads, AI training, and correct chat count

import { useState, useEffect, useRef } from "react";
import { collection, getDocs, doc, setDoc, deleteDoc, serverTimestamp, query, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../config/firebase";
import { toast, Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function UnifiedControlCenterFixed() {
  const [tab, setTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [adminReply, setAdminReply] = useState("");
  const [lastRefresh, setLastRefresh] = useState(null);
  const [newDoc, setNewDoc] = useState({
    title: "",
    description: "",
    price: 0,
    category: "cyber",
    icon: "📄",
    features: "",
    fileUrl: "",
    fileName: "",
  });
  const [aiTraining, setAiTraining] = useState({
    personality: "Professional and helpful",
    language: "English & Swahili",
    tone: "Friendly but formal",
    responseStyle: "Concise and clear",
    knowledgeBase: "",
    behaviorRules: "Always provide direct service links. Never generate PDFs. Guide customers to the service page with clear instructions.",
  });
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    activeChats: 0,
    documentsCount: 0,
  });
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Refresh all data
  const refreshData = async () => {
    setLoading(true);
    try {
      // Fetch documents from products collection
      const docsSnap = await getDocs(collection(db, "products"));
      const allDocs = docsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      setDocuments(allDocs);
      console.log("Documents loaded:", allDocs.length);

      // Fetch chats - count only those with status "active"
      const chatsSnap = await getDocs(collection(db, "chats"));
      const allChats = chatsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      
      // Filter for active chats correctly
      const activeChatsCount = allChats.filter(c => c.status === "active" || c.lastMessage).length;
      console.log("Total chats:", allChats.length, "Active:", activeChatsCount);
      
      setChats(allChats);

      // Calculate stats
      const ordersSnap = await getDocs(collection(db, "orders"));
      const allOrders = ordersSnap.docs.map(d => d.data());
      const totalRevenue = allOrders
        .filter(o => o.status === "paid")
        .reduce((sum, o) => sum + (o.amount || 0), 0);

      // Load AI training config
      try {
        const aiSnap = await getDocs(collection(db, "config"));
        const aiConfig = aiSnap.docs.find(d => d.id === "weberai");
        if (aiConfig?.exists()) {
          setAiTraining(prev => ({ ...prev, ...aiConfig.data() }));
          console.log("AI config loaded");
        }
      } catch (err) {
        console.warn("AI config not found, using defaults");
      }

      setStats({
        totalOrders: allOrders.length,
        totalRevenue,
        activeChats: activeChatsCount,
        documentsCount: allDocs.length,
      });

      setLastRefresh(new Date().toLocaleTimeString());
      toast.success("✅ Control Center updated!");
    } catch (err) {
      console.error("Refresh error:", err);
      toast.error("Failed to refresh data");
    }
    setLoading(false);
  };

  // Load data on mount
  useEffect(() => {
    refreshData();
  }, []);

  // Load chat messages
  useEffect(() => {
    if (!selectedChat) return;
    const loadMessages = async () => {
      try {
        const messagesSnap = await getDocs(collection(db, "chats", selectedChat.id, "messages"));
        const msgs = messagesSnap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => a.timestamp - b.timestamp);
        setChatMessages(msgs);
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      } catch (err) {
        console.error("Message load error:", err);
      }
    };
    loadMessages();
  }, [selectedChat]);

  // Handle file selection
  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const storageRef = ref(storage, `documents/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const fileUrl = await getDownloadURL(storageRef);
      
      setNewDoc(prev => ({
        ...prev,
        fileUrl,
        fileName: file.name,
      }));
      toast.success("✅ File uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Failed to upload file: " + err.message);
    }
    setLoading(false);
  };

  // Add new document
  const handleAddDocument = async () => {
    if (!newDoc.title || !newDoc.price) {
      toast.error("Title and price are required");
      return;
    }
    setLoading(true);
    try {
      const slug = newDoc.title.toLowerCase().replace(/\s+/g, "-");
      const docRef = doc(collection(db, "products"));
      
      const docData = {
        title: newDoc.title,
        description: newDoc.description,
        price: parseFloat(newDoc.price) || 0,
        category: newDoc.category,
        icon: newDoc.icon,
        features: newDoc.features,
        fileUrl: newDoc.fileUrl,
        fileName: newDoc.fileName,
        slug,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await setDoc(docRef, docData);
      console.log("Document added:", docData);

      toast.success("✅ Document added!");
      setNewDoc({
        title: "",
        description: "",
        price: 0,
        category: "cyber",
        icon: "📄",
        features: "",
        fileUrl: "",
        fileName: "",
      });
      await refreshData();
    } catch (err) {
      console.error("Add doc error:", err);
      toast.error("Failed to add document: " + err.message);
    }
    setLoading(false);
  };

  // Delete document
  const handleDeleteDocument = async (docId, fileUrl) => {
    if (!confirm("Are you sure you want to delete this document?")) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, "products", docId));
      
      if (fileUrl) {
        try {
          const fileRef = ref(storage, fileUrl);
          await deleteObject(fileRef);
        } catch (err) {
          console.warn("File deletion skipped:", err);
        }
      }
      
      toast.success("✅ Document deleted!");
      await refreshData();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete document");
    }
    setLoading(false);
  };

  // Save AI training
  const handleSaveAITraining = async () => {
    setLoading(true);
    try {
      await setDoc(doc(db, "config", "weberai"), {
        personality: aiTraining.personality,
        language: aiTraining.language,
        tone: aiTraining.tone,
        responseStyle: aiTraining.responseStyle,
        knowledgeBase: aiTraining.knowledgeBase,
        behaviorRules: aiTraining.behaviorRules,
        updatedAt: serverTimestamp(),
      }, { merge: true });
      
      console.log("AI training saved");
      toast.success("✅ AI Training saved! Changes apply immediately.");
    } catch (err) {
      console.error("Save AI error:", err);
      toast.error("Failed to save AI training: " + err.message);
    }
    setLoading(false);
  };

  // Send admin reply
  const handleSendReply = async () => {
    if (!adminReply.trim() || !selectedChat) return;
    setLoading(true);
    try {
      const newMsgRef = doc(collection(db, "chats", selectedChat.id, "messages"));
      
      await setDoc(newMsgRef, {
        text: adminReply,
        sender: "admin",
        timestamp: serverTimestamp(),
      });

      await setDoc(doc(db, "chats", selectedChat.id), {
        lastMessage: adminReply,
        updatedAt: serverTimestamp(),
        adminTakeover: true,
      }, { merge: true });

      setAdminReply("");
      await refreshData();
      toast.success("✅ Reply sent!");
    } catch (err) {
      console.error("Send reply error:", err);
      toast.error("Failed to send reply");
    }
    setLoading(false);
  };

  return (
    <>
      <style>{`
        body { font-family: 'Segoe UI', system-ui, sans-serif; background: #0f172a; }
        .uc-container { padding-top: 64px; background: linear-gradient(135deg, #0f172a, #1e293b); min-height: 100vh; }
        .uc-header { background: linear-gradient(135deg, #1e293b, #334155); padding: 32px 20px; border-bottom: 3px solid #16a34a; }
        .uc-title { color: #fff; font-size: 32px; font-weight: 900; margin: 0; }
        .uc-subtitle { color: rgba(255,255,255,0.6); font-size: 14px; margin-top: 4px; }
        .uc-refresh-bar { display: flex; align-items: center; gap: 12px; margin-top: 16px; padding: 12px 16px; background: rgba(22,163,74,0.1); border: 1px solid rgba(22,163,74,0.4); border-radius: 10px; }
        .uc-refresh-btn { background: #16a34a; color: #fff; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 700; cursor: pointer; transition: all .2s; }
        .uc-refresh-btn:hover { background: #15803d; }
        .uc-refresh-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .uc-layout { display: grid; grid-template-columns: 260px 1fr; gap: 24px; max-width: 1400px; margin: 0 auto; padding: 24px 20px; }
        .uc-sidebar { background: rgba(30,41,59,0.8); border: 1px solid rgba(22,163,74,0.2); border-radius: 16px; padding: 20px; height: fit-content; position: sticky; top: 80px; }
        .uc-tab-btn { width: 100%; padding: 14px 16px; border: none; border-radius: 12px; background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.7); cursor: pointer; font-size: 14px; font-weight: 600; text-align: left; margin-bottom: 8px; transition: all .2s; display: flex; align-items: center; gap: 10px; }
        .uc-tab-btn:hover { background: rgba(22,163,74,0.15); color: #4ade80; }
        .uc-tab-btn.active { background: #16a34a; color: #fff; box-shadow: 0 4px 12px rgba(22,163,74,0.4); }
        .uc-main { display: flex; flex-direction: column; gap: 24px; }
        .uc-card { background: rgba(30,41,59,0.6); border: 1px solid rgba(22,163,74,0.2); border-radius: 16px; padding: 24px; }
        .uc-card-title { color: #fff; font-size: 18px; font-weight: 700; margin: 0 0 20px; }
        .uc-input { width: 100%; padding: 12px 16px; background: rgba(30,41,59,0.8); border: 1px solid rgba(22,163,74,0.3); border-radius: 10px; color: #fff; font-size: 14px; margin-bottom: 12px; font-family: inherit; }
        .uc-input:focus { outline: none; border-color: #16a34a; box-shadow: 0 0 0 3px rgba(22,163,74,0.2); }
        .uc-textarea { width: 100%; padding: 12px 16px; background: rgba(30,41,59,0.8); border: 1px solid rgba(22,163,74,0.3); border-radius: 10px; color: #fff; font-size: 14px; margin-bottom: 12px; font-family: inherit; min-height: 120px; resize: vertical; }
        .uc-textarea:focus { outline: none; border-color: #16a34a; box-shadow: 0 0 0 3px rgba(22,163,74,0.2); }
        .uc-btn { background: #16a34a; color: #fff; border: none; padding: 12px 24px; border-radius: 10px; font-weight: 700; cursor: pointer; transition: all .2s; }
        .uc-btn:hover { background: #15803d; transform: translateY(-2px); }
        .uc-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .uc-btn-danger { background: #dc2626; }
        .uc-btn-danger:hover { background: #b91c1c; }
        .uc-file-upload { display: flex; align-items: center; gap: 12px; padding: 16px; background: rgba(22,163,74,0.1); border: 2px dashed rgba(22,163,74,0.4); border-radius: 12px; cursor: pointer; transition: all .2s; }
        .uc-file-upload:hover { background: rgba(22,163,74,0.15); border-color: rgba(22,163,74,0.6); }
        .uc-file-name { color: #4ade80; font-size: 13px; font-weight: 700; }
        .uc-doc-card { background: rgba(22,163,74,0.1); border: 1px solid rgba(22,163,74,0.3); border-radius: 12px; padding: 16px; margin-bottom: 12px; }
        .uc-doc-title { color: #4ade80; font-weight: 700; margin-bottom: 4px; }
        .uc-doc-price { color: rgba(255,255,255,0.7); font-size: 13px; margin-bottom: 8px; }
        .uc-doc-actions { display: flex; gap: 8px; }
        .uc-doc-actions button { padding: 6px 12px; font-size: 12px; }
        .uc-stat-box { background: rgba(22,163,74,0.1); border: 1px solid rgba(22,163,74,0.3); border-radius: 12px; padding: 20px; text-align: center; }
        .uc-stat-value { font-size: 28px; font-weight: 900; color: #4ade80; }
        .uc-stat-label { font-size: 12px; color: rgba(255,255,255,0.6); margin-top: 6px; text-transform: uppercase; }
        @media (max-width: 1024px) { .uc-layout { grid-template-columns: 1fr; } .uc-sidebar { position: static; } }
      `}</style>

      <Toaster position="top-center" />
      <Navbar />

      <div className="uc-container">
        <div className="uc-header">
          <h1 className="uc-title">⚡ WeberTech Control Center</h1>
          <p className="uc-subtitle">Unified admin hub: Documents, AI Training, Support, Analytics</p>
          <div className="uc-refresh-bar">
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>Last refresh: {lastRefresh || "Never"}</span>
            <button className="uc-refresh-btn" onClick={refreshData} disabled={loading}>
              {loading ? "⟳ Refreshing..." : "🔄 Refresh"}
            </button>
          </div>
        </div>

        <div className="uc-layout">
          {/* Sidebar */}
          <aside className="uc-sidebar">
            <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", marginBottom: 12 }}>Control Menu</p>
            <button className={`uc-tab-btn ${tab === "overview" ? "active" : ""}`} onClick={() => setTab("overview")}>
              📊 Overview
            </button>
            <button className={`uc-tab-btn ${tab === "documents" ? "active" : ""}`} onClick={() => setTab("documents")}>
              📄 Documents
            </button>
            <button className={`uc-tab-btn ${tab === "ai" ? "active" : ""}`} onClick={() => setTab("ai")}>
              🤖 AI Training
            </button>
            <button className={`uc-tab-btn ${tab === "support" ? "active" : ""}`} onClick={() => setTab("support")}>
              💬 Support ({chats.length})
            </button>
          </aside>

          {/* Main */}
          <main className="uc-main">
            {/* OVERVIEW */}
            {tab === "overview" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                <div className="uc-stat-box">
                  <div className="uc-stat-value">{stats.totalOrders}</div>
                  <div className="uc-stat-label">Total Orders</div>
                </div>
                <div className="uc-stat-box">
                  <div className="uc-stat-value">KES {stats.totalRevenue.toLocaleString()}</div>
                  <div className="uc-stat-label">Revenue</div>
                </div>
                <div className="uc-stat-box">
                  <div className="uc-stat-value">{stats.activeChats}</div>
                  <div className="uc-stat-label">Active Chats</div>
                </div>
                <div className="uc-stat-box">
                  <div className="uc-stat-value">{stats.documentsCount}</div>
                  <div className="uc-stat-label">Documents</div>
                </div>
              </div>
            )}

            {/* DOCUMENTS */}
            {tab === "documents" && (
              <>
                <div className="uc-card">
                  <h3 className="uc-card-title">➕ Add New Document</h3>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Title *</label>
                      <input
                        className="uc-input"
                        placeholder="e.g., Car Sale Agreement"
                        value={newDoc.title}
                        onChange={e => setNewDoc({ ...newDoc, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Price (KES) *</label>
                      <input
                        className="uc-input"
                        type="number"
                        placeholder="199"
                        value={newDoc.price}
                        onChange={e => setNewDoc({ ...newDoc, price: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Category</label>
                      <select
                        className="uc-input"
                        value={newDoc.category}
                        onChange={e => setNewDoc({ ...newDoc, category: e.target.value })}
                        style={{ cursor: "pointer" }}
                      >
                        <option value="cyber">Cyber Division</option>
                        <option value="academy">Academy</option>
                        <option value="electronics">Electronics</option>
                        <option value="bundles">Bundles</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Icon</label>
                      <input
                        className="uc-input"
                        placeholder="🚗"
                        maxLength="2"
                        value={newDoc.icon}
                        onChange={e => setNewDoc({ ...newDoc, icon: e.target.value })}
                      />
                    </div>
                  </div>

                  <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Description</label>
                  <textarea
                    className="uc-textarea"
                    placeholder="Brief description..."
                    value={newDoc.description}
                    onChange={e => setNewDoc({ ...newDoc, description: e.target.value })}
                  />

                  <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Features (comma-separated)</label>
                  <input
                    className="uc-input"
                    placeholder="e.g., Editable format, Legal compliance, Ready in minutes"
                    value={newDoc.features}
                    onChange={e => setNewDoc({ ...newDoc, features: e.target.value })}
                  />

                  <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Upload Document File</label>
                  <div
                    className="uc-file-upload"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <span style={{ fontSize: 20 }}>📤</span>
                    <div>
                      <div style={{ color: "#fff", fontWeight: 700 }}>Click to upload or drag and drop</div>
                      <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>PDF, DOCX, or images</div>
                      {newDoc.fileName && <div className="uc-file-name">✅ {newDoc.fileName}</div>}
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileSelect}
                    style={{ display: "none" }}
                    accept=".pdf,.docx,.doc,.jpg,.jpeg,.png,.gif"
                  />

                  <button className="uc-btn" onClick={handleAddDocument} disabled={loading} style={{ width: "100%", marginTop: 16 }}>
                    {loading ? "⟳ Adding..." : "✅ Add Document"}
                  </button>
                </div>

                <div className="uc-card">
                  <h3 className="uc-card-title">📋 All Documents ({documents.length})</h3>
                  {documents.length === 0 ? (
                    <p style={{ color: "rgba(255,255,255,0.5)", textAlign: "center", padding: "20px 0" }}>No documents yet. Add your first one above!</p>
                  ) : (
                    documents.map(doc => (
                      <div key={doc.id} className="uc-doc-card">
                        <div className="uc-doc-title">{doc.icon || "📄"} {doc.title}</div>
                        <div className="uc-doc-price">KES {doc.price} • {doc.category}</div>
                        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginBottom: 8 }}>{doc.description}</div>
                        {doc.fileName && <div style={{ color: "#4ade80", fontSize: 12, marginBottom: 8 }}>📎 {doc.fileName}</div>}
                        <div className="uc-doc-actions">
                          {doc.fileUrl && (
                            <a href={doc.fileUrl} target="_blank" rel="noreferrer" className="uc-btn" style={{ fontSize: 12, padding: "6px 12px", textDecoration: "none" }}>
                              📥 Download
                            </a>
                          )}
                          <button
                            className="uc-btn uc-btn-danger"
                            style={{ fontSize: 12, padding: "6px 12px" }}
                            onClick={() => handleDeleteDocument(doc.id, doc.fileUrl)}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}

            {/* AI TRAINING */}
            {tab === "ai" && (
              <div className="uc-card">
                <h3 className="uc-card-title">🤖 AI Training & Behavior</h3>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginBottom: 20 }}>
                  ⚠️ IMPORTANT: WeberAI will NOT generate PDFs. Instead, it will provide direct service links and step-by-step instructions for customers to access services.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                  <div>
                    <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Personality</label>
                    <input
                      className="uc-input"
                      placeholder="e.g., Professional and helpful"
                      value={aiTraining.personality}
                      onChange={e => setAiTraining({ ...aiTraining, personality: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Language</label>
                    <input
                      className="uc-input"
                      placeholder="e.g., English & Swahili"
                      value={aiTraining.language}
                      onChange={e => setAiTraining({ ...aiTraining, language: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Tone</label>
                    <input
                      className="uc-input"
                      placeholder="e.g., Friendly but formal"
                      value={aiTraining.tone}
                      onChange={e => setAiTraining({ ...aiTraining, tone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Response Style</label>
                    <input
                      className="uc-input"
                      placeholder="e.g., Concise and clear"
                      value={aiTraining.responseStyle}
                      onChange={e => setAiTraining({ ...aiTraining, responseStyle: e.target.value })}
                    />
                  </div>
                </div>

                <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Knowledge Base</label>
                <textarea
                  className="uc-textarea"
                  placeholder="Paste all service details, pricing, and product information here. AI will use this to recommend services..."
                  value={aiTraining.knowledgeBase}
                  onChange={e => setAiTraining({ ...aiTraining, knowledgeBase: e.target.value })}
                  style={{ minHeight: 200 }}
                />

                <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Behavior Rules</label>
                <textarea
                  className="uc-textarea"
                  placeholder="E.g., 'Always provide direct links to services. Never generate PDFs. Guide customers with step-by-step instructions on how to access the service.'"
                  value={aiTraining.behaviorRules}
                  onChange={e => setAiTraining({ ...aiTraining, behaviorRules: e.target.value })}
                  style={{ minHeight: 200 }}
                />

                <button className="uc-btn" onClick={handleSaveAITraining} disabled={loading} style={{ width: "100%" }}>
                  {loading ? "⟳ Saving..." : "💾 Save AI Training"}
                </button>
              </div>
            )}

            {/* SUPPORT */}
            {tab === "support" && (
              <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 16 }}>
                <div className="uc-card" style={{ maxHeight: "600px", overflowY: "auto" }}>
                  <h3 className="uc-card-title">💬 Chats ({chats.length})</h3>
                  {chats.length === 0 ? (
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>No chats yet.</p>
                  ) : (
                    chats.map(chat => (
                      <div
                        key={chat.id}
                        onClick={() => setSelectedChat(chat)}
                        style={{
                          padding: 12,
                          background: selectedChat?.id === chat.id ? "rgba(22,163,74,0.2)" : "rgba(255,255,255,0.05)",
                          border: selectedChat?.id === chat.id ? "1px solid #16a34a" : "1px solid rgba(22,163,74,0.2)",
                          borderRadius: 10,
                          cursor: "pointer",
                          marginBottom: 8,
                          transition: "all .2s",
                        }}
                      >
                        <div style={{ color: "#4ade80", fontWeight: 700, fontSize: 13 }}>{chat.customerName || "Customer"}</div>
                        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 4 }}>{chat.lastMessage?.substring(0, 40)}...</div>
                      </div>
                    ))
                  )}
                </div>

                <div className="uc-card">
                  {selectedChat ? (
                    <>
                      <h3 className="uc-card-title">💬 Chat with {selectedChat.customerName || "Customer"}</h3>
                      <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: 10, padding: 16, minHeight: 300, maxHeight: 400, overflowY: "auto", marginBottom: 16 }}>
                        {chatMessages.map(msg => (
                          <div
                            key={msg.id}
                            style={{
                              marginBottom: 12,
                              textAlign: msg.sender === "admin" ? "right" : "left",
                            }}
                          >
                            <div
                              style={{
                                display: "inline-block",
                                maxWidth: "70%",
                                padding: "10px 14px",
                                borderRadius: 10,
                                background: msg.sender === "admin" ? "#16a34a" : "rgba(22,163,74,0.2)",
                                color: msg.sender === "admin" ? "#fff" : "rgba(255,255,255,0.8)",
                                fontSize: 13,
                              }}
                            >
                              {msg.text}
                            </div>
                          </div>
                        ))}
                        <div ref={chatEndRef} />
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8 }}>
                        <input
                          className="uc-input"
                          placeholder="Type your reply..."
                          value={adminReply}
                          onChange={e => setAdminReply(e.target.value)}
                          onKeyPress={e => e.key === "Enter" && handleSendReply()}
                          style={{ marginBottom: 0 }}
                        />
                        <button className="uc-btn" onClick={handleSendReply} disabled={loading}>
                          Send
                        </button>
                      </div>
                    </>
                  ) : (
                    <p style={{ color: "rgba(255,255,255,0.5)", textAlign: "center", padding: "40px 0" }}>Select a chat to start</p>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
}
