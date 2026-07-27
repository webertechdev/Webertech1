// src/pages/AdminControlCenter.jsx
// WeberTech Admin Control Center v2
// Features: Document Management, Enhanced AI Training, Chat Monitoring, Analytics

import { useState, useEffect, useRef } from "react";
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc, serverTimestamp, query, orderBy } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast, Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AdminControlCenter() {
  const [tab, setTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [adminReply, setAdminReply] = useState("");
  const [lastRefresh, setLastRefresh] = useState(null);
  const [editingDoc, setEditingDoc] = useState(null);
  const [newDoc, setNewDoc] = useState({ title: "", description: "", price: 0, category: "cyber", slug: "" });
  const [aiTraining, setAiTraining] = useState({
    personality: "Professional and helpful",
    language: "English & Swahili",
    tone: "Friendly but formal",
    responseStyle: "Concise and clear",
    knowledgeBase: "",
    behaviorRules: "",
  });
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    activeChats: 0,
    documentsCount: 0,
  });
  const chatEndRef = useRef(null);

  // Refresh all data
  const refreshData = async () => {
    setLoading(true);
    try {
      // Fetch documents
      const docsSnap = await getDocs(collection(db, "products")).catch(() => ({ docs: [] }));
      const allDocs = docsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      setDocuments(allDocs);

      // Fetch chats
      const chatsSnap = await getDocs(collection(db, "chats")).catch(() => ({ docs: [] }));
      const allChats = chatsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      setChats(allChats);

      // Calculate stats
      const ordersSnap = await getDocs(collection(db, "orders")).catch(() => ({ docs: [] }));
      const allOrders = ordersSnap.docs.map(d => d.data());
      const totalRevenue = allOrders
        .filter(o => o.status === "paid")
        .reduce((sum, o) => sum + (o.amount || 0), 0);

      setStats({
        totalOrders: allOrders.length,
        totalRevenue,
        activeChats: allChats.filter(c => c.status === "active").length,
        documentsCount: allDocs.length,
      });

      setLastRefresh(new Date().toLocaleTimeString());
      toast.success("✅ Admin data refreshed!");
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
        const messagesSnap = await getDocs(
          query(collection(db, "chats", selectedChat.id, "messages"), orderBy("timestamp", "asc"))
        ).catch(() => ({ docs: [] }));
        setChatMessages(messagesSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      } catch (err) {
        console.error("Message load error:", err);
      }
    };
    loadMessages();
  }, [selectedChat]);

  // Add new document
  const handleAddDocument = async () => {
    if (!newDoc.title || !newDoc.price) {
      toast.error("Title and price are required");
      return;
    }
    setLoading(true);
    try {
      const slug = newDoc.title.toLowerCase().replace(/\s+/g, "-");
      await addDoc(collection(db, "products"), {
        ...newDoc,
        slug,
        category: newDoc.category,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      toast.success("✅ Document added!");
      setNewDoc({ title: "", description: "", price: 0, category: "cyber", slug: "" });
      refreshData();
    } catch (err) {
      toast.error("Failed to add document");
    }
    setLoading(false);
  };

  // Delete document
  const handleDeleteDocument = async (docId) => {
    if (!confirm("Are you sure you want to delete this document?")) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, "products", docId));
      toast.success("✅ Document deleted!");
      refreshData();
    } catch (err) {
      toast.error("Failed to delete document");
    }
    setLoading(false);
  };

  // Update AI training
  const handleSaveAITraining = async () => {
    setLoading(true);
    try {
      await updateDoc(doc(db, "config", "weberai"), {
        ...aiTraining,
        updatedAt: serverTimestamp(),
      });
      toast.success("✅ AI Training updated!");
    } catch (err) {
      toast.error("Failed to update AI training");
    }
    setLoading(false);
  };

  // Send admin reply
  const handleSendReply = async () => {
    if (!adminReply.trim() || !selectedChat) return;
    setLoading(true);
    try {
      await addDoc(collection(db, "chats", selectedChat.id, "messages"), {
        text: adminReply,
        sender: "admin",
        timestamp: serverTimestamp(),
      });
      await updateDoc(doc(db, "chats", selectedChat.id), {
        lastMessage: adminReply,
        updatedAt: serverTimestamp(),
        adminTakeover: true,
      });
      setAdminReply("");
      await refreshData();
      toast.success("✅ Reply sent!");
    } catch (err) {
      toast.error("Failed to send reply");
    }
    setLoading(false);
  };

  return (
    <>
      <style>{`
        body { font-family: 'Segoe UI', system-ui, sans-serif; background: #0f172a; }
        .adm-container { padding-top: 64px; background: linear-gradient(135deg, #0f172a, #1e293b); min-height: 100vh; }
        .adm-header { background: linear-gradient(135deg, #1e293b, #334155); padding: 32px 20px; border-bottom: 2px solid #16a34a; }
        .adm-title { color: #fff; font-size: 32px; font-weight: 900; margin: 0; }
        .adm-subtitle { color: rgba(255,255,255,0.6); font-size: 14px; margin-top: 4px; }
        .adm-refresh-bar { display: flex; align-items: center; gap: 12px; margin-top: 16px; padding: 12px 16px; background: rgba(255,255,255,0.08); border: 1px solid rgba(22,163,74,0.3); border-radius: 10px; }
        .adm-refresh-btn { background: #16a34a; color: #fff; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 700; cursor: pointer; transition: all .2s; }
        .adm-refresh-btn:hover { background: #15803d; }
        .adm-refresh-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .adm-layout { display: grid; grid-template-columns: 280px 1fr; gap: 24px; max-width: 1400px; margin: 0 auto; padding: 24px 20px; }
        .adm-sidebar { background: rgba(30,41,59,0.8); border: 1px solid rgba(22,163,74,0.2); border-radius: 16px; padding: 20px; height: fit-content; position: sticky; top: 80px; }
        .adm-tab-btn { width: 100%; padding: 14px 16px; border: none; border-radius: 12px; background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.7); cursor: pointer; font-size: 14px; font-weight: 600; text-align: left; margin-bottom: 8px; transition: all .2s; display: flex; align-items: center; gap: 10px; }
        .adm-tab-btn:hover { background: rgba(22,163,74,0.15); color: #4ade80; }
        .adm-tab-btn.active { background: #16a34a; color: #fff; box-shadow: 0 4px 12px rgba(22,163,74,0.4); }
        .adm-main { display: flex; flex-direction: column; gap: 24px; }
        .adm-card { background: rgba(30,41,59,0.6); border: 1px solid rgba(22,163,74,0.2); border-radius: 16px; padding: 24px; }
        .adm-card-title { color: #fff; font-size: 18px; font-weight: 700; margin: 0 0 20px; }
        .adm-input { width: 100%; padding: 12px 16px; background: rgba(30,41,59,0.8); border: 1px solid rgba(22,163,74,0.3); border-radius: 10px; color: #fff; font-size: 14px; margin-bottom: 12px; font-family: inherit; }
        .adm-input:focus { outline: none; border-color: #16a34a; box-shadow: 0 0 0 3px rgba(22,163,74,0.2); }
        .adm-textarea { width: 100%; padding: 12px 16px; background: rgba(30,41,59,0.8); border: 1px solid rgba(22,163,74,0.3); border-radius: 10px; color: #fff; font-size: 14px; margin-bottom: 12px; font-family: inherit; min-height: 120px; resize: vertical; }
        .adm-textarea:focus { outline: none; border-color: #16a34a; box-shadow: 0 0 0 3px rgba(22,163,74,0.2); }
        .adm-btn { background: #16a34a; color: #fff; border: none; padding: 12px 24px; border-radius: 10px; font-weight: 700; cursor: pointer; transition: all .2s; }
        .adm-btn:hover { background: #15803d; transform: translateY(-2px); }
        .adm-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .adm-btn-danger { background: #dc2626; }
        .adm-btn-danger:hover { background: #b91c1c; }
        .adm-table { width: 100%; border-collapse: collapse; }
        .adm-table th { padding: 12px; text-align: left; font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.5); text-transform: uppercase; border-bottom: 1px solid rgba(22,163,74,0.2); }
        .adm-table td { padding: 14px 12px; border-bottom: 1px solid rgba(22,163,74,0.1); color: rgba(255,255,255,0.8); }
        .adm-table tr:hover { background: rgba(22,163,74,0.05); }
        .adm-stat-box { background: rgba(22,163,74,0.1); border: 1px solid rgba(22,163,74,0.3); border-radius: 12px; padding: 20px; text-align: center; }
        .adm-stat-value { font-size: 28px; font-weight: 900; color: #4ade80; }
        .adm-stat-label { font-size: 12px; color: rgba(255,255,255,0.6); margin-top: 6px; text-transform: uppercase; }
        .adm-doc-card { background: rgba(22,163,74,0.1); border: 1px solid rgba(22,163,74,0.3); border-radius: 12px; padding: 16px; margin-bottom: 12px; }
        .adm-doc-title { color: #4ade80; font-weight: 700; margin-bottom: 4px; }
        .adm-doc-price { color: rgba(255,255,255,0.7); font-size: 13px; margin-bottom: 8px; }
        .adm-doc-actions { display: flex; gap: 8px; }
        .adm-doc-actions button { padding: 6px 12px; font-size: 12px; }
        @media (max-width: 1024px) { .adm-layout { grid-template-columns: 1fr; } .adm-sidebar { position: static; } }
      `}</style>

      <Toaster position="top-center" />
      <Navbar />

      <div className="adm-container">
        <div className="adm-header">
          <h1 className="adm-title">⚡ Admin Control Center v2</h1>
          <p className="adm-subtitle">Manage Documents, Train AI, Monitor Support</p>
          <div className="adm-refresh-bar">
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>Last refresh: {lastRefresh || "Never"}</span>
            <button className="adm-refresh-btn" onClick={refreshData} disabled={loading}>
              {loading ? "⟳ Refreshing..." : "🔄 Refresh"}
            </button>
          </div>
        </div>

        <div className="adm-layout">
          {/* Sidebar */}
          <aside className="adm-sidebar">
            <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", marginBottom: 12 }}>Admin Menu</p>
            <button className={`adm-tab-btn ${tab === "overview" ? "active" : ""}`} onClick={() => setTab("overview")}>
              📊 Overview
            </button>
            <button className={`adm-tab-btn ${tab === "documents" ? "active" : ""}`} onClick={() => setTab("documents")}>
              📄 Manage Documents
            </button>
            <button className={`adm-tab-btn ${tab === "ai-training" ? "active" : ""}`} onClick={() => setTab("ai-training")}>
              🤖 AI Training
            </button>
            <button className={`adm-tab-btn ${tab === "chats" ? "active" : ""}`} onClick={() => setTab("chats")}>
              💬 Support Chats
            </button>
          </aside>

          {/* Main */}
          <main className="adm-main">
            {/* OVERVIEW */}
            {tab === "overview" && (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                  <div className="adm-stat-box">
                    <div className="adm-stat-value">{stats.totalOrders}</div>
                    <div className="adm-stat-label">Total Orders</div>
                  </div>
                  <div className="adm-stat-box">
                    <div className="adm-stat-value">KES {stats.totalRevenue.toLocaleString()}</div>
                    <div className="adm-stat-label">Total Revenue</div>
                  </div>
                  <div className="adm-stat-box">
                    <div className="adm-stat-value">{stats.activeChats}</div>
                    <div className="adm-stat-label">Active Chats</div>
                  </div>
                  <div className="adm-stat-box">
                    <div className="adm-stat-value">{stats.documentsCount}</div>
                    <div className="adm-stat-label">Documents</div>
                  </div>
                </div>
              </>
            )}

            {/* DOCUMENT MANAGEMENT */}
            {tab === "documents" && (
              <>
                <div className="adm-card">
                  <h3 className="adm-card-title">➕ Add New Document</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Document Title</label>
                      <input
                        className="adm-input"
                        placeholder="e.g., Car Sale Agreement"
                        value={newDoc.title}
                        onChange={e => setNewDoc({ ...newDoc, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Price (KES)</label>
                      <input
                        className="adm-input"
                        type="number"
                        placeholder="199"
                        value={newDoc.price}
                        onChange={e => setNewDoc({ ...newDoc, price: parseFloat(e.target.value) })}
                      />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Category</label>
                      <select
                        className="adm-input"
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
                      <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Icon/Emoji</label>
                      <input
                        className="adm-input"
                        placeholder="🚗"
                        maxLength="2"
                        value={newDoc.icon || ""}
                        onChange={e => setNewDoc({ ...newDoc, icon: e.target.value })}
                      />
                    </div>
                  </div>
                  <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Description</label>
                  <textarea
                    className="adm-textarea"
                    placeholder="Brief description of the document..."
                    value={newDoc.description}
                    onChange={e => setNewDoc({ ...newDoc, description: e.target.value })}
                  />
                  <button className="adm-btn" onClick={handleAddDocument} disabled={loading} style={{ width: "100%" }}>
                    ✅ Add Document
                  </button>
                </div>

                <div className="adm-card">
                  <h3 className="adm-card-title">📋 All Documents ({documents.length})</h3>
                  {documents.length === 0 ? (
                    <p style={{ color: "rgba(255,255,255,0.5)", textAlign: "center", padding: "20px 0" }}>No documents yet.</p>
                  ) : (
                    documents.map(doc => (
                      <div key={doc.id} className="adm-doc-card">
                        <div className="adm-doc-title">{doc.icon || "📄"} {doc.title}</div>
                        <div className="adm-doc-price">KES {doc.price} • {doc.category}</div>
                        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginBottom: 8 }}>{doc.description}</div>
                        <div className="adm-doc-actions">
                          <button className="adm-btn" style={{ fontSize: 12, padding: "6px 12px" }}>✏️ Edit</button>
                          <button
                            className="adm-btn adm-btn-danger"
                            style={{ fontSize: 12, padding: "6px 12px" }}
                            onClick={() => handleDeleteDocument(doc.id)}
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
            {tab === "ai-training" && (
              <div className="adm-card">
                <h3 className="adm-card-title">🤖 AI Training & Behavior Control</h3>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginBottom: 20 }}>
                  Configure how WeberAI responds to customers. Changes apply immediately.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                  <div>
                    <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Personality</label>
                    <input
                      className="adm-input"
                      placeholder="e.g., Professional and helpful"
                      value={aiTraining.personality}
                      onChange={e => setAiTraining({ ...aiTraining, personality: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Language</label>
                    <input
                      className="adm-input"
                      placeholder="e.g., English & Swahili"
                      value={aiTraining.language}
                      onChange={e => setAiTraining({ ...aiTraining, language: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Tone</label>
                    <input
                      className="adm-input"
                      placeholder="e.g., Friendly but formal"
                      value={aiTraining.tone}
                      onChange={e => setAiTraining({ ...aiTraining, tone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Response Style</label>
                    <input
                      className="adm-input"
                      placeholder="e.g., Concise and clear"
                      value={aiTraining.responseStyle}
                      onChange={e => setAiTraining({ ...aiTraining, responseStyle: e.target.value })}
                    />
                  </div>
                </div>

                <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Knowledge Base (Services & Products)</label>
                <textarea
                  className="adm-textarea"
                  placeholder="Paste all service details, pricing, and product information here. AI will use this to answer customer queries."
                  value={aiTraining.knowledgeBase}
                  onChange={e => setAiTraining({ ...aiTraining, knowledgeBase: e.target.value })}
                  style={{ minHeight: 200 }}
                />

                <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Behavior Rules (How to Handle Queries)</label>
                <textarea
                  className="adm-textarea"
                  placeholder="Example: 'Always ask for phone number before providing services. Recommend bundles when customer asks for airtime. Be empathetic about payment issues.'"
                  value={aiTraining.behaviorRules}
                  onChange={e => setAiTraining({ ...aiTraining, behaviorRules: e.target.value })}
                  style={{ minHeight: 200 }}
                />

                <button className="adm-btn" onClick={handleSaveAITraining} disabled={loading} style={{ width: "100%" }}>
                  💾 Save AI Training
                </button>
              </div>
            )}

            {/* SUPPORT CHATS */}
            {tab === "chats" && (
              <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 16 }}>
                <div className="adm-card" style={{ maxHeight: "600px", overflowY: "auto" }}>
                  <h3 className="adm-card-title">💬 Active Chats</h3>
                  {chats.length === 0 ? (
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>No active chats.</p>
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

                <div className="adm-card">
                  {selectedChat ? (
                    <>
                      <h3 className="adm-card-title">💬 Chat with {selectedChat.customerName || "Customer"}</h3>
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
                          className="adm-input"
                          placeholder="Type your reply..."
                          value={adminReply}
                          onChange={e => setAdminReply(e.target.value)}
                          onKeyPress={e => e.key === "Enter" && handleSendReply()}
                          style={{ marginBottom: 0 }}
                        />
                        <button className="adm-btn" onClick={handleSendReply} disabled={loading}>
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
