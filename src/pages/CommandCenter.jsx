// src/pages/CommandCenter.jsx
// WeberTech Command Center — Total Platform Control & Real-time Monitoring
// Wire every module: Cyber, Academy, Electronics, Bundles, Dev, Hustle

import { useState, useEffect, useRef } from "react";
import { collection, getDocs, doc, updateDoc, query, orderBy, onSnapshot, where, serverTimestamp, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast, Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MODULES = [
  { id: "cyber", icon: "🔐", name: "Cyber Division", color: "#dc2626" },
  { id: "academy", icon: "🎓", name: "Academy", color: "#2563eb" },
  { id: "electronics", icon: "📱", name: "Electronics", color: "#7c3aed" },
  { id: "bundles", icon: "⚡", name: "Bundles", color: "#f59e0b" },
  { id: "dev", icon: "💻", name: "Dev Services", color: "#10b981" },
  { id: "hustle", icon: "🤑", name: "Hustle KE", color: "#ec4899" },
];

export default function CommandCenter() {
  const [activeModule, setActiveModule] = useState("cyber");
  const [stats, setStats] = useState({});
  const [realtimeData, setRealtimeData] = useState({});
  const [orders, setOrders] = useState([]);
  const [chats, setChats] = useState([]);
  const [systemHealth, setSystemHealth] = useState("🟢 Healthy");
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [bulkAction, setBulkAction] = useState("");

  // Real-time Firestore listeners for all modules
  useEffect(() => {
    const loadRealtimeData = async () => {
      setLoading(true);
      try {
        // Orders
        const ordersQ = query(collection(db, "orders"), orderBy("createdAt", "desc"));
        const unsubOrders = onSnapshot(ordersQ, (snap) => {
          const allOrders = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          setOrders(allOrders);
          
          // Calculate stats by module
          const moduleStats = {};
          MODULES.forEach(m => {
            const moduleOrders = allOrders.filter(o => o.type === m.id || o.productSlug?.includes(m.id));
            moduleStats[m.id] = {
              totalOrders: moduleOrders.length,
              paidOrders: moduleOrders.filter(o => o.status === "paid").length,
              revenue: moduleOrders.filter(o => o.status === "paid").reduce((sum, o) => sum + (o.amount || 0), 0),
              pendingOrders: moduleOrders.filter(o => o.status === "pending").length,
            };
          });
          setStats(moduleStats);
        });

        // Chats
        const chatsQ = query(collection(db, "chats"), orderBy("updatedAt", "desc"));
        const unsubChats = onSnapshot(chatsQ, (snap) => {
          setChats(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        });

        setSystemHealth("🟢 All Systems Operational");
        setLoading(false);

        return () => {
          unsubOrders();
          unsubChats();
        };
      } catch (err) {
        console.error("Real-time sync error:", err);
        setSystemHealth("🔴 Connection Issue");
        setLoading(false);
      }
    };

    loadRealtimeData();
  }, []);

  const handleBulkAction = async () => {
    if (!bulkAction || !selectedOrder) return;
    try {
      await updateDoc(doc(db, "orders", selectedOrder.id), {
        status: bulkAction,
        updatedAt: serverTimestamp(),
      });
      toast.success(`Order marked as ${bulkAction}`);
      setBulkAction("");
      setSelectedOrder(null);
    } catch (err) {
      toast.error("Failed to update order");
    }
  };

  const generateDailyReport = async () => {
    try {
      const report = {
        date: new Date().toISOString(),
        totalOrders: orders.length,
        totalRevenue: orders.filter(o => o.status === "paid").reduce((sum, o) => sum + (o.amount || 0), 0),
        activeChats: chats.filter(c => c.status === "active").length,
        moduleBreakdown: stats,
        systemHealth,
      };

      await addDoc(collection(db, "reports"), {
        ...report,
        createdAt: serverTimestamp(),
      });

      toast.success("Daily report generated!");
    } catch (err) {
      toast.error("Failed to generate report");
    }
  };

  const currentModule = MODULES.find(m => m.id === activeModule);
  const moduleStats = stats[activeModule] || {};

  return (
    <>
      <style>{`
        body { font-family: 'Segoe UI', system-ui, sans-serif; background: #0f172a; }
        .cmd-container { padding-top: 64px; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); min-height: 100vh; }
        .cmd-header { background: linear-gradient(135deg, #1e293b, #334155); padding: 32px 20px; border-bottom: 2px solid #16a34a; }
        .cmd-title { color: #fff; font-size: 32px; font-weight: 900; margin: 0; }
        .cmd-subtitle { color: rgba(255,255,255,0.6); font-size: 14px; margin-top: 4px; }
        .cmd-layout { display: grid; grid-template-columns: 280px 1fr; gap: 24px; max-width: 1400px; margin: 0 auto; padding: 24px 20px; }
        .cmd-sidebar { background: rgba(30,41,59,0.8); border: 1px solid rgba(22,163,74,0.2); border-radius: 16px; padding: 20px; height: fit-content; position: sticky; top: 80px; }
        .cmd-module-btn { width: 100%; padding: 14px 16px; border: none; border-radius: 12px; background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.7); cursor: pointer; font-size: 14px; font-weight: 600; text-align: left; margin-bottom: 8px; transition: all .2s; display: flex; align-items: center; gap: 10px; }
        .cmd-module-btn:hover { background: rgba(22,163,74,0.15); color: #4ade80; }
        .cmd-module-btn.active { background: #16a34a; color: #fff; box-shadow: 0 4px 12px rgba(22,163,74,0.4); }
        .cmd-main { display: flex; flex-direction: column; gap: 24px; }
        .cmd-card { background: rgba(30,41,59,0.6); border: 1px solid rgba(22,163,74,0.2); border-radius: 16px; padding: 24px; }
        .cmd-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }
        .cmd-stat-box { background: rgba(22,163,74,0.1); border: 1px solid rgba(22,163,74,0.3); border-radius: 12px; padding: 20px; text-align: center; }
        .cmd-stat-value { font-size: 28px; font-weight: 900; color: #4ade80; }
        .cmd-stat-label { font-size: 12px; color: rgba(255,255,255,0.6); margin-top: 6px; text-transform: uppercase; letter-spacing: 0.5px; }
        .cmd-table { width: 100%; border-collapse: collapse; }
        .cmd-table th { padding: 12px; text-align: left; font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.5); text-transform: uppercase; border-bottom: 1px solid rgba(22,163,74,0.2); }
        .cmd-table td { padding: 14px 12px; border-bottom: 1px solid rgba(22,163,74,0.1); color: rgba(255,255,255,0.8); }
        .cmd-table tr:hover { background: rgba(22,163,74,0.05); }
        .cmd-badge { display: inline-block; padding: 4px 12px; border-radius: 99px; font-size: 11px; font-weight: 700; }
        .cmd-badge-paid { background: rgba(34,197,94,0.2); color: #4ade80; }
        .cmd-badge-pending { background: rgba(251,146,60,0.2); color: #fb923c; }
        .cmd-badge-failed { background: rgba(239,68,68,0.2); color: #ef4444; }
        .cmd-btn { background: #16a34a; color: #fff; border: none; border-radius: 10px; padding: 12px 24px; font-weight: 700; cursor: pointer; transition: all .2s; }
        .cmd-btn:hover { background: #15803d; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(22,163,74,0.4); }
        .cmd-btn-danger { background: #dc2626; }
        .cmd-btn-danger:hover { background: #b91c1c; }
        .cmd-health { font-size: 24px; margin-right: 8px; }
        @media (max-width: 1024px) { .cmd-layout { grid-template-columns: 1fr; } .cmd-sidebar { position: static; } }
      `}</style>

      <Toaster position="top-center" />
      <Navbar />

      <div className="cmd-container">
        <div className="cmd-header">
          <h1 className="cmd-title">⚡ WeberTech Command Center</h1>
          <p className="cmd-subtitle">Total Platform Control • Real-time Monitoring • Instant Updates</p>
          <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 12 }}>
            <span className="cmd-health">{systemHealth}</span>
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>Last sync: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>

        <div className="cmd-layout">
          {/* Sidebar - Module Selector */}
          <aside className="cmd-sidebar">
            <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", marginBottom: 12 }}>Modules</p>
            {MODULES.map(m => (
              <button
                key={m.id}
                className={`cmd-module-btn ${activeModule === m.id ? "active" : ""}`}
                onClick={() => setActiveModule(m.id)}
              >
                <span style={{ fontSize: 18 }}>{m.icon}</span>
                <div>
                  <div style={{ fontWeight: 700 }}>{m.name}</div>
                  <div style={{ fontSize: 11, opacity: 0.7 }}>{stats[m.id]?.totalOrders || 0} orders</div>
                </div>
              </button>
            ))}
            <button onClick={generateDailyReport} className="cmd-btn" style={{ width: "100%", marginTop: 16 }}>
              📊 Generate Report
            </button>
          </aside>

          {/* Main Content */}
          <main className="cmd-main">
            {/* Module Stats */}
            <div className="cmd-card">
              <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 16 }}>
                {currentModule?.name} — Real-time Dashboard
              </h2>
              <div className="cmd-stats">
                <div className="cmd-stat-box">
                  <div className="cmd-stat-value">{moduleStats.totalOrders || 0}</div>
                  <div className="cmd-stat-label">Total Orders</div>
                </div>
                <div className="cmd-stat-box">
                  <div className="cmd-stat-value" style={{ color: "#4ade80" }}>KES {(moduleStats.revenue || 0).toLocaleString()}</div>
                  <div className="cmd-stat-label">Revenue</div>
                </div>
                <div className="cmd-stat-box">
                  <div className="cmd-stat-value" style={{ color: "#fb923c" }}>{moduleStats.pendingOrders || 0}</div>
                  <div className="cmd-stat-label">Pending</div>
                </div>
                <div className="cmd-stat-box">
                  <div className="cmd-stat-value" style={{ color: "#4ade80" }}>{moduleStats.paidOrders || 0}</div>
                  <div className="cmd-stat-label">Completed</div>
                </div>
              </div>
            </div>

            {/* Orders Table */}
            <div className="cmd-card">
              <h3 style={{ color: "#fff", fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Recent Orders</h3>
              <div style={{ overflowX: "auto" }}>
                <table className="cmd-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Product</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Customer</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 10).map(o => (
                      <tr key={o.id}>
                        <td style={{ fontFamily: "monospace", fontSize: 12 }}>{o.orderId}</td>
                        <td>{o.productTitle}</td>
                        <td>KES {o.amount?.toLocaleString()}</td>
                        <td>
                          <span className={`cmd-badge cmd-badge-${o.status}`}>
                            {o.status.toUpperCase()}
                          </span>
                        </td>
                        <td>{o.customerName || o.customerEmail}</td>
                        <td>
                          <button
                            onClick={() => setSelectedOrder(o)}
                            style={{ background: "rgba(22,163,74,0.2)", color: "#4ade80", border: "none", borderRadius: 6, padding: "6px 12px", cursor: "pointer", fontSize: 12, fontWeight: 700 }}
                          >
                            Manage
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Order Management */}
            {selectedOrder && (
              <div className="cmd-card" style={{ background: "rgba(22,163,74,0.1)", borderColor: "rgba(22,163,74,0.4)" }}>
                <h3 style={{ color: "#4ade80", marginBottom: 16 }}>Manage Order: {selectedOrder.orderId}</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700 }}>Update Status</label>
                    <select
                      value={bulkAction}
                      onChange={e => setBulkAction(e.target.value)}
                      style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(22,163,74,0.3)", background: "rgba(30,41,59,0.8)", color: "#fff", marginTop: 8 }}
                    >
                      <option value="">Select status...</option>
                      <option value="paid">Mark as Paid</option>
                      <option value="pending">Mark as Pending</option>
                      <option value="failed">Mark as Failed</option>
                    </select>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                    <button onClick={handleBulkAction} className="cmd-btn">Apply</button>
                    <button onClick={() => setSelectedOrder(null)} className="cmd-btn cmd-btn-danger">Cancel</button>
                  </div>
                </div>
              </div>
            )}

            {/* Active Chats */}
            <div className="cmd-card">
              <h3 style={{ color: "#fff", fontSize: 16, fontWeight: 700, marginBottom: 16 }}>💬 Active Support Chats ({chats.length})</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 12 }}>
                {chats.slice(0, 6).map(c => (
                  <div key={c.id} style={{ background: "rgba(22,163,74,0.1)", border: "1px solid rgba(22,163,74,0.2)", borderRadius: 12, padding: 16 }}>
                    <div style={{ color: "#4ade80", fontWeight: 700, marginBottom: 8 }}>{c.customerName || "Anonymous"}</div>
                    <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginBottom: 8, lineHeight: 1.5 }}>{c.lastMessage?.substring(0, 60)}...</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
                      {c.adminTakeover ? "🔴 Admin Controlling" : "🟢 AI Responding"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
}
