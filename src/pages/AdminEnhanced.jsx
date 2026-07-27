// src/pages/AdminEnhanced.jsx
// Admin Dashboard — WeberTech Control Center
// Tabs: Overview | Orders | Payments | Customers | Products | AI Training | Live Chats | Analytics | Settings

import { useState, useEffect, useRef } from "react";
import { collection, getDocs, doc, updateDoc, orderBy, query, where, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast, Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AdminEnhanced() {
  const [tab, setTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [activeChats, setActiveChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [adminReply, setAdminReply] = useState("");
  const [aiKnowledge, setAiKnowledge] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  
  const chatEndRef = useRef(null);

  // Load all static data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [ordersSnap, paymentsSnap, customersSnap, productsSnap, transactionsSnap] = await Promise.all([
          getDocs(query(collection(db, "orders"), orderBy("createdAt", "desc"))),
          getDocs(query(collection(db, "payments"), orderBy("createdAt", "desc"))),
          getDocs(query(collection(db, "users"), orderBy("createdAt", "desc"))),
          getDocs(query(collection(db, "products"), orderBy("createdAt", "desc"))),
          getDocs(query(collection(db, "transactions"), orderBy("createdAt", "desc"))),
        ]);
        setOrders(ordersSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        setPayments(paymentsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        setCustomers(customersSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        setProducts(productsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        setTransactions(transactionsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        toast.error("Failed to load admin data");
      }
      setLoading(false);
    };
    loadData();
  }, []);

  // Real-time Chat Monitoring
  useEffect(() => {
    const q = query(collection(db, "chats"), orderBy("updatedAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setActiveChats(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  // Load specific chat messages
  useEffect(() => {
    if (!selectedChat) return;
    const q = query(collection(db, "chats", selectedChat.id, "messages"), orderBy("timestamp", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      setChatMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });
    return () => unsub();
  }, [selectedChat]);

  const sendAdminReply = async () => {
    if (!adminReply.trim() || !selectedChat) return;
    try {
      await addDoc(collection(db, "chats", selectedChat.id, "messages"), {
        text: adminReply,
        sender: "admin",
        timestamp: serverTimestamp(),
      });
      await updateDoc(doc(db, "chats", selectedChat.id), {
        lastMessage: adminReply,
        updatedAt: serverTimestamp(),
        adminTakeover: true
      });
      setAdminReply("");
    } catch (err) {
      toast.error("Failed to send reply");
    }
  };

  const updateAiKnowledge = async () => {
    try {
      await updateDoc(doc(db, "config", "weberai"), {
        knowledgeBase: aiKnowledge,
        updatedAt: serverTimestamp()
      });
      toast.success("WeberAI Knowledge Base Updated!");
    } catch (err) {
      toast.error("Failed to update AI knowledge");
    }
  };

  // Calculate stats
  const paidOrders = orders.filter(o => o.status === "paid");
  const totalRevenue = paidOrders.reduce((sum, o) => sum + (o.amount || 0), 0);
  const pendingOrders = orders.filter(o => o.status === "pending").length;
  const failedOrders = orders.filter(o => o.status === "failed").length;

  const BADGE = {
    paid: <span className="badge-paid">✅ Paid</span>,
    pending: <span className="badge-pending">⏳ Pending</span>,
    failed: <span className="badge-failed">❌ Failed</span>,
  };

  return (
    <>
      <style>{`
        body { font-family: 'Segoe UI', system-ui, sans-serif; }
        .adm-tab { display: flex; align-items: center; gap: 8px; padding: 11px 14px; border: none; border-radius: 10px; cursor: pointer; font-size: 13.5px; font-weight: 600; background: none; color: #6b7280; transition: all .15s; text-align: left; margin-bottom: 4px; font-family: inherit; width: 100%; }
        .adm-tab:hover { background: #f9fafb; color: #111827; }
        .adm-tab.on { background: #16a34a; color: #fff; }
        .adm-card { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 16px; padding: 22px; }
        .adm-stat { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 14px; padding: 20px; }
        .adm-tbl { width: 100%; border-collapse: collapse; font-size: 13.5px; }
        .adm-tbl th { padding: 10px 14px; text-align: left; font-size: 11.5px; font-weight: 700; color: #6b7280; text-transform: uppercase; border-bottom: 2px solid #f3f4f6; }
        .adm-tbl td { padding: 12px 14px; border-bottom: 1px solid #f9fafb; }
        .badge-paid { padding: 3px 10px; border-radius: 99px; font-size: 11.5px; font-weight: 700; background: #dcfce7; color: #15803d; }
        .badge-pending { padding: 3px 10px; border-radius: 99px; font-size: 11.5px; font-weight: 700; background: #fef3c7; color: #92400e; }
        .badge-failed { padding: 3px 10px; border-radius: 99px; font-size: 11.5px; font-weight: 700; background: #fee2e2; color: #dc2626; }
        .chat-list-item { padding: 12px; border-radius: 10px; cursor: pointer; border-bottom: 1px solid #f3f4f6; transition: all .2s; }
        .chat-list-item:hover { background: #f9fafb; }
        .chat-list-item.active { background: #f0fdf4; border-left: 4px solid #16a34a; }
        .msg-bubble { max-width: 80%; padding: 10px 14px; border-radius: 14px; font-size: 14px; line-height: 1.5; margin-bottom: 8px; }
        .msg-user { background: #f3f4f6; color: #1f2937; align-self: flex-start; }
        .msg-ai { background: #dcfce7; color: #166534; align-self: flex-end; }
        .msg-admin { background: #16a34a; color: #fff; align-self: flex-end; }
      `}</style>

      <Toaster position="top-center" />
      <Navbar />

      <div style={{ paddingTop: 64, background: "#f9fafb", minHeight: "100vh" }}>
        <div style={{ background: "#0f172a", padding: "32px 20px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <h1 style={{ color: "#fff", fontWeight: 900, fontSize: 32 }}>WeberTech Control Center</h1>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>Platform-wide monitoring, AI training, and support takeover</p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 24, maxWidth: 1280, margin: "0 auto", padding: "24px 20px" }}>
          <aside style={{ background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 16, padding: 20, height: "fit-content" }}>
            {[
              { id: "overview", icon: "📊", label: "Overview" },
              { id: "chats", icon: "💬", label: "Live Chats" },
              { id: "ai", icon: "🤖", label: "AI Training" },
              { id: "orders", icon: "📋", label: "All Orders" },
              { id: "payments", icon: "💰", label: "Payments" },
              { id: "customers", icon: "👥", label: "Customers" },
              { id: "products", icon: "📦", label: "Products" },
              { id: "settings", icon: "⚙️", label: "Settings" },
            ].map(t => (
              <button key={t.id} className={`adm-tab ${tab === t.id ? "on" : ""}`} onClick={() => setTab(t.id)}>
                {t.icon} {t.label}
              </button>
            ))}
          </aside>

          <main>
            {tab === "overview" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
                <div className="adm-stat">
                  <div style={{ fontSize: 12, color: "#6b7280" }}>Total Revenue</div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: "#16a34a" }}>KES {totalRevenue.toLocaleString()}</div>
                </div>
                <div className="adm-stat">
                  <div style={{ fontSize: 12, color: "#6b7280" }}>Active Chats</div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: "#2563eb" }}>{activeChats.length}</div>
                </div>
                <div className="adm-stat">
                  <div style={{ fontSize: 12, color: "#6b7280" }}>Pending Orders</div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: "#d97706" }}>{pendingOrders}</div>
                </div>
              </div>
            )}

            {tab === "chats" && (
              <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 20, background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 16, height: 600 }}>
                <div style={{ borderRight: "1.5px solid #f3f4f6", overflowY: "auto" }}>
                  <div style={{ padding: 16, fontWeight: 700, borderBottom: "1.5px solid #f3f4f6" }}>Active Sessions</div>
                  {activeChats.map(c => (
                    <div key={c.id} className={`chat-list-item ${selectedChat?.id === c.id ? "active" : ""}`} onClick={() => setSelectedChat(c)}>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{c.customerName || "Anonymous"}</div>
                      <div style={{ fontSize: 12, color: "#6b7280", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.lastMessage}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {selectedChat ? (
                    <>
                      <div style={{ padding: 16, borderBottom: "1.5px solid #f3f4f6", display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontWeight: 700 }}>Chat with {selectedChat.customerName}</span>
                        <span style={{ fontSize: 12, color: "#16a34a" }}>{selectedChat.adminTakeover ? "● Admin Controlled" : "● AI Responding"}</span>
                      </div>
                      <div style={{ flex: 1, padding: 20, overflowY: "auto", display: "flex", flexDirection: "column" }}>
                        {chatMessages.map(m => (
                          <div key={m.id} className={`msg-bubble msg-${m.sender}`}>
                            {m.text}
                          </div>
                        ))}
                        <div ref={chatEndRef} />
                      </div>
                      <div style={{ padding: 16, borderTop: "1.5px solid #f3f4f6", display: "flex", gap: 10 }}>
                        <input style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: "1.5px solid #e5e7eb", outline: "none" }} placeholder="Type admin reply..." value={adminReply} onChange={e => setAdminReply(e.target.value)} onKeyPress={e => e.key === "Enter" && sendAdminReply()} />
                        <button onClick={sendAdminReply} style={{ background: "#16a34a", color: "#fff", border: "none", borderRadius: 10, padding: "0 20px", fontWeight: 700 }}>Send</button>
                      </div>
                    </>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#9ca3af" }}>Select a chat to start monitoring</div>
                  )}
                </div>
              </div>
            )}

            {tab === "ai" && (
              <div className="adm-card">
                <h3 style={{ fontWeight: 700, marginBottom: 16 }}>WeberAI Training Hub</h3>
                <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 20 }}>Update the core knowledge base WeberAI uses to answer customer queries.</p>
                <textarea style={{ width: "100%", height: 300, padding: 16, borderRadius: 12, border: "1.5px solid #e5e7eb", outline: "none", fontFamily: "monospace", fontSize: 13 }} placeholder="Enter new service details, pricing, or instructions..." value={aiKnowledge} onChange={e => setAiKnowledge(e.target.value)} />
                <button onClick={updateAiKnowledge} style={{ marginTop: 16, background: "#16a34a", color: "#fff", border: "none", borderRadius: 10, padding: "12px 24px", fontWeight: 700, cursor: "pointer" }}>Update AI Knowledge</button>
              </div>
            )}

            {tab === "orders" && (
              <div className="adm-card">
                <h3 style={{ fontWeight: 700, marginBottom: 16 }}>All Orders ({orders.length})</h3>
                <div style={{ overflowX: "auto" }}>
                  <table className="adm-tbl">
                    <thead><tr><th>Order ID</th><th>Product</th><th>Amount</th><th>Status</th><th>Customer</th><th>Date</th></tr></thead>
                    <tbody>
                      {orders.map(o => (
                        <tr key={o.id}>
                          <td style={{ fontWeight: 700, fontFamily: "monospace", fontSize: 12 }}>{o.orderId}</td>
                          <td>{o.productTitle}</td>
                          <td>KES {o.amount?.toLocaleString()}</td>
                          <td>{BADGE[o.status] || BADGE.pending}</td>
                          <td>{o.customerName || o.customerEmail}</td>
                          <td>{o.createdAt?.toDate?.().toLocaleDateString() || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {tab === "products" && (
              <div className="adm-card">
                <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Product Catalog ({products.length})</h3>
                <div style={{ overflowX: "auto" }}>
                  <table className="adm-tbl">
                    <thead><tr><th>Slug</th><th>Title</th><th>Price</th><th>Type</th><th>Status</th></tr></thead>
                    <tbody>
                      {products.map(p => (
                        <tr key={p.id}>
                          <td style={{ fontWeight: 700, fontFamily: "monospace", fontSize: 12 }}>{p.slug}</td>
                          <td>{p.title}</td>
                          <td>KES {p.price?.toLocaleString()}</td>
                          <td>{p.type}</td>
                          <td><span className="badge-paid">Active</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
