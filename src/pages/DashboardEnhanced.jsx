// src/pages/DashboardEnhanced.jsx
// Customer Dashboard with Manual Refresh Buttons
// Tabs: Overview | Orders | Downloads | Services | Invoices | Support | Settings

import { useState, useEffect } from "react";
import { collection, getDocs, doc, getDoc, query, where, orderBy } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { toast, Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DashboardEnhanced({ user: initialUser }) {
  const [user, setUser] = useState(initialUser || null);
  const [tab, setTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [services, setServices] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [profile, setProfile] = useState({});
  const [lastRefresh, setLastRefresh] = useState(null);

  // Load user auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fu) => {
      if (!fu) return setUser(null);
      try {
        const snap = await getDoc(doc(db, "users", fu.uid));
        const data = snap.exists() ? snap.data() : {};
        setUser({ uid: fu.uid, email: fu.email, ...data });
        setProfile(data || {});
      } catch (err) {
        console.error("User fetch error:", err);
        setUser({ uid: fu.uid, email: fu.email });
      }
    });
    return () => unsub();
  }, []);

  // Manual data refresh function
  const refreshData = async () => {
    if (!user?.uid) return;
    setLoading(true);
    try {
      const [ordersSnap, downloadsSnap, servicesSnap, invoicesSnap, ticketsSnap] = await Promise.all([
        getDocs(query(collection(db, "orders"), where("customerId", "==", user.uid), orderBy("createdAt", "desc"))).catch(() => ({ docs: [] })),
        getDocs(query(collection(db, "downloads"), where("customerId", "==", user.uid), orderBy("createdAt", "desc"))).catch(() => ({ docs: [] })),
        getDocs(query(collection(db, "services"), where("customerId", "==", user.uid), orderBy("createdAt", "desc"))).catch(() => ({ docs: [] })),
        getDocs(query(collection(db, "invoices"), where("customerId", "==", user.uid), orderBy("createdAt", "desc"))).catch(() => ({ docs: [] })),
        getDocs(query(collection(db, "supportTickets"), where("customerId", "==", user.uid), orderBy("createdAt", "desc"))).catch(() => ({ docs: [] })),
      ]);
      setOrders(ordersSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setDownloads(downloadsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setServices(servicesSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setInvoices(invoicesSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setTickets(ticketsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLastRefresh(new Date().toLocaleTimeString());
      toast.success("Data refreshed successfully!");
    } catch (err) {
      console.error("Data refresh error:", err);
      toast.error("Failed to refresh data. Please try again.");
    }
    setLoading(false);
  };

  // Load data on component mount
  useEffect(() => {
    if (user?.uid) {
      refreshData();
    }
  }, [user?.uid]);

  if (!user) {
    return (
      <>
        <Navbar />
        <div style={{ paddingTop: 120, textAlign: "center", minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div>
            <h2 style={{ fontWeight: 900, fontSize: 24, marginBottom: 10 }}>Sign in to your account</h2>
            <p style={{ color: "#6b7280", marginBottom: 20 }}>Access your orders, downloads, and services.</p>
            <a href="/auth/login" style={{ display: "inline-block", padding: "12px 24px", background: "#16a34a", color: "#fff", borderRadius: 10, fontWeight: 700, textDecoration: "none" }}>
              Sign In / Sign Up
            </a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const stats = [
    { icon: "📋", label: "Total Orders", value: orders.length, color: "#2563eb", bg: "#dbeafe" },
    { icon: "⬇️", label: "Downloads", value: downloads.length, color: "#16a34a", bg: "#dcfce7" },
    { icon: "⚙️", label: "Active Services", value: services.filter(s => s.status !== "completed").length, color: "#d97706", bg: "#fef3c7" },
    { icon: "🎟️", label: "Invoices", value: invoices.length, color: "#7c3aed", bg: "#ede9fe" },
  ];

  const tabs = [
    { id: "overview", icon: "📊", label: "Overview" },
    { id: "orders", icon: "📋", label: "Orders" },
    { id: "downloads", icon: "⬇️", label: "Downloads" },
    { id: "services", icon: "⚙️", label: "Services" },
    { id: "invoices", icon: "🎟️", label: "Invoices" },
    { id: "support", icon: "💬", label: "Support" },
    { id: "settings", icon: "⚙️", label: "Settings" },
  ];

  return (
    <>
      <style>{`
        body { font-family: 'Segoe UI', system-ui, sans-serif; }
        .dash-container { padding-top: 64px; background: #f9fafb; min-height: 100vh; }
        .dash-header { background: linear-gradient(135deg, #0f172a, #16a34a); padding: 32px 20px; color: #fff; }
        .dash-title { font-size: 28px; font-weight: 900; margin: 0 0 8px; }
        .dash-subtitle { color: rgba(255,255,255,0.8); font-size: 14px; margin: 0; }
        .dash-refresh { display: inline-flex; align-items: center; gap: 8px; margin-top: 16px; padding: 10px 16px; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); border-radius: 8px; color: #fff; font-size: 12px; }
        .dash-refresh-btn { background: rgba(255,255,255,0.2); border: none; padding: 8px 14px; border-radius: 6px; color: #fff; font-weight: 700; cursor: pointer; transition: all .2s; }
        .dash-refresh-btn:hover { background: rgba(255,255,255,0.3); }
        .dash-refresh-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .dash-layout { display: grid; grid-template-columns: 220px 1fr; gap: 24px; max-width: 1280px; margin: 0 auto; padding: 24px 20px; }
        .dash-sidebar { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 16px; padding: 20px; height: fit-content; position: sticky; top: 80px; }
        .dash-tab { display: flex; align-items: center; gap: 8px; padding: 11px 14px; border: none; border-radius: 10px; cursor: pointer; font-size: 13.5px; font-weight: 600; background: none; color: #6b7280; transition: all .15s; text-align: left; margin-bottom: 4px; font-family: inherit; width: 100%; }
        .dash-tab:hover { background: #f9fafb; color: #111827; }
        .dash-tab.on { background: #16a34a; color: #fff; }
        .dash-card { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 16px; padding: 22px; }
        .dash-stat { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 14px; padding: 20px; }
        .dash-stat-value { font-size: 22px; font-weight: 800; }
        .dash-stat-label { font-size: 12px; color: #6b7280; margin-top: 3px; }
        .dash-tbl { width: 100%; border-collapse: collapse; font-size: 13.5px; }
        .dash-tbl th { padding: 10px 14px; text-align: left; font-size: 11.5px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: .4px; border-bottom: 2px solid #f3f4f6; }
        .dash-tbl td { padding: 12px 14px; border-bottom: 1px solid #f9fafb; vertical-align: middle; }
        .dash-tbl tr:hover { background: #fafafa; }
        .dash-badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 99px; font-size: 11.5px; font-weight: 700; }
        .badge-paid { background: #dcfce7; color: #15803d; }
        .badge-pending { background: #fef3c7; color: #92400e; }
        .badge-active { background: #dcfce7; color: #15803d; }
        @media (max-width: 768px) { .dash-layout { grid-template-columns: 1fr; } }
      `}</style>

      <Toaster position="top-center" />
      <Navbar />

      <div className="dash-container">
        {/* Header */}
        <div className="dash-header">
          <h1 className="dash-title">👤 My Dashboard</h1>
          <p className="dash-subtitle">Welcome back, {user.firstName || "Customer"}! Manage your orders, downloads, services, and account settings.</p>
          <div className="dash-refresh">
            <span>Last refresh: {lastRefresh || "Never"}</span>
            <button className="dash-refresh-btn" onClick={refreshData} disabled={loading}>
              {loading ? "⟳ Refreshing..." : "🔄 Refresh Now"}
            </button>
          </div>
        </div>

        {/* Layout */}
        <div className="dash-layout">
          {/* Sidebar */}
          <aside className="dash-sidebar">
            <p style={{ fontSize: 11.5, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 10 }}>Menu</p>
            {tabs.map(t => (
              <button key={t.id} className={`dash-tab ${tab === t.id ? "on" : ""}`} onClick={() => setTab(t.id)}>
                {t.icon} {t.label}
              </button>
            ))}
            <button onClick={() => signOut(auth)} className="dash-tab" style={{ marginTop: 16, color: "#dc2626" }}>
              🚪 Sign Out
            </button>
          </aside>

          {/* Main */}
          <main>
            {/* OVERVIEW */}
            {tab === "overview" && (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(155px,1fr))", gap: 16, marginBottom: 24 }}>
                  {stats.map(s => (
                    <div key={s.label} className="dash-stat" style={{ background: s.bg }}>
                      <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
                      <div className="dash-stat-label">{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="dash-card">
                  <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Recent Orders</h3>
                  {orders.length === 0 ? (
                    <p style={{ color: "#9ca3af", textAlign: "center", padding: "20px 0" }}>No orders yet.</p>
                  ) : (
                    <div style={{ overflowX: "auto" }}>
                      <table className="dash-tbl">
                        <thead><tr><th>Order ID</th><th>Product</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
                        <tbody>
                          {orders.slice(0, 5).map(o => (
                            <tr key={o.id}>
                              <td style={{ fontWeight: 700, fontFamily: "monospace", fontSize: 12 }}>{o.orderId}</td>
                              <td>{o.productTitle}</td>
                              <td style={{ fontWeight: 700 }}>KES {o.amount?.toLocaleString()}</td>
                              <td><span className={`dash-badge badge-${o.status}`}>{o.status.toUpperCase()}</span></td>
                              <td style={{ color: "#9ca3af", fontSize: 12.5 }}>{o.createdAt?.toDate?.().toLocaleDateString?.() || "—"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* ORDERS */}
            {tab === "orders" && (
              <div className="dash-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <h3 style={{ fontWeight: 700, fontSize: 16, margin: 0 }}>All Orders ({orders.length})</h3>
                  <button className="dash-refresh-btn" onClick={refreshData} disabled={loading}>
                    {loading ? "⟳" : "🔄"}
                  </button>
                </div>
                {orders.length === 0 ? (
                  <p style={{ color: "#9ca3af", textAlign: "center", padding: "20px 0" }}>No orders found.</p>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table className="dash-tbl">
                      <thead><tr><th>Order ID</th><th>Product</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
                      <tbody>
                        {orders.map(o => (
                          <tr key={o.id}>
                            <td style={{ fontWeight: 700, fontFamily: "monospace", fontSize: 12 }}>{o.orderId}</td>
                            <td>{o.productTitle}</td>
                            <td style={{ fontWeight: 700 }}>KES {o.amount?.toLocaleString()}</td>
                            <td><span className={`dash-badge badge-${o.status}`}>{o.status.toUpperCase()}</span></td>
                            <td style={{ color: "#9ca3af", fontSize: 12.5 }}>{o.createdAt?.toDate?.().toLocaleDateString?.() || "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* DOWNLOADS */}
            {tab === "downloads" && (
              <div className="dash-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <h3 style={{ fontWeight: 700, fontSize: 16, margin: 0 }}>My Downloads ({downloads.length})</h3>
                  <button className="dash-refresh-btn" onClick={refreshData} disabled={loading}>
                    {loading ? "⟳" : "🔄"}
                  </button>
                </div>
                {downloads.length === 0 ? (
                  <p style={{ color: "#9ca3af", textAlign: "center", padding: "20px 0" }}>No downloads yet.</p>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table className="dash-tbl">
                      <thead><tr><th>File</th><th>Downloaded</th><th>Action</th></tr></thead>
                      <tbody>
                        {downloads.map(d => (
                          <tr key={d.id}>
                            <td>{d.fileName}</td>
                            <td style={{ color: "#9ca3af", fontSize: 12.5 }}>{d.downloadedAt?.toDate?.().toLocaleDateString?.() || "—"}</td>
                            <td><a href={d.fileUrl} target="_blank" rel="noreferrer" style={{ color: "#16a34a", fontWeight: 700, textDecoration: "none" }}>Download</a></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* SERVICES */}
            {tab === "services" && (
              <div className="dash-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <h3 style={{ fontWeight: 700, fontSize: 16, margin: 0 }}>Active Services ({services.length})</h3>
                  <button className="dash-refresh-btn" onClick={refreshData} disabled={loading}>
                    {loading ? "⟳" : "🔄"}
                  </button>
                </div>
                {services.length === 0 ? (
                  <p style={{ color: "#9ca3af", textAlign: "center", padding: "20px 0" }}>No active services.</p>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table className="dash-tbl">
                      <thead><tr><th>Service</th><th>Status</th><th>Expires</th></tr></thead>
                      <tbody>
                        {services.map(s => (
                          <tr key={s.id}>
                            <td>{s.serviceName}</td>
                            <td><span className="dash-badge badge-active">{s.status?.toUpperCase()}</span></td>
                            <td style={{ color: "#9ca3af", fontSize: 12.5 }}>{s.expiresAt?.toDate?.().toLocaleDateString?.() || "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* INVOICES */}
            {tab === "invoices" && (
              <div className="dash-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <h3 style={{ fontWeight: 700, fontSize: 16, margin: 0 }}>Invoices ({invoices.length})</h3>
                  <button className="dash-refresh-btn" onClick={refreshData} disabled={loading}>
                    {loading ? "⟳" : "🔄"}
                  </button>
                </div>
                {invoices.length === 0 ? (
                  <p style={{ color: "#9ca3af", textAlign: "center", padding: "20px 0" }}>No invoices yet.</p>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table className="dash-tbl">
                      <thead><tr><th>Invoice #</th><th>Amount</th><th>Date</th><th>Action</th></tr></thead>
                      <tbody>
                        {invoices.map(inv => (
                          <tr key={inv.id}>
                            <td style={{ fontWeight: 700, fontFamily: "monospace", fontSize: 12 }}>{inv.invoiceNumber}</td>
                            <td>KES {inv.amount?.toLocaleString()}</td>
                            <td style={{ color: "#9ca3af", fontSize: 12.5 }}>{inv.createdAt?.toDate?.().toLocaleDateString?.() || "—"}</td>
                            <td><a href={inv.pdfUrl} target="_blank" rel="noreferrer" style={{ color: "#16a34a", fontWeight: 700, textDecoration: "none" }}>View PDF</a></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* SUPPORT */}
            {tab === "support" && (
              <div className="dash-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <h3 style={{ fontWeight: 700, fontSize: 16, margin: 0 }}>Support Tickets ({tickets.length})</h3>
                  <button className="dash-refresh-btn" onClick={refreshData} disabled={loading}>
                    {loading ? "⟳" : "🔄"}
                  </button>
                </div>
                {tickets.length === 0 ? (
                  <p style={{ color: "#9ca3af", textAlign: "center", padding: "20px 0" }}>No support tickets yet.</p>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table className="dash-tbl">
                      <thead><tr><th>Ticket #</th><th>Subject</th><th>Status</th><th>Date</th></tr></thead>
                      <tbody>
                        {tickets.map(t => (
                          <tr key={t.id}>
                            <td style={{ fontWeight: 700, fontFamily: "monospace", fontSize: 12 }}>{t.ticketNumber}</td>
                            <td>{t.subject}</td>
                            <td><span className="dash-badge badge-active">{t.status?.toUpperCase()}</span></td>
                            <td style={{ color: "#9ca3af", fontSize: 12.5 }}>{t.createdAt?.toDate?.().toLocaleDateString?.() || "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* SETTINGS */}
            {tab === "settings" && (
              <div className="dash-card">
                <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Account Settings</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#6b7280", marginBottom: 6 }}>First Name</label>
                    <input type="text" value={profile.firstName || ""} disabled style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1.5px solid #e5e7eb", background: "#f9fafb" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#6b7280", marginBottom: 6 }}>Last Name</label>
                    <input type="text" value={profile.lastName || ""} disabled style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1.5px solid #e5e7eb", background: "#f9fafb" }} />
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#6b7280", marginBottom: 6 }}>Email</label>
                    <input type="email" value={user.email || ""} disabled style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1.5px solid #e5e7eb", background: "#f9fafb" }} />
                  </div>
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
