// src/pages/DashboardEnhanced.jsx
// Customer Dashboard — Phase 1 Complete
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
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [services, setServices] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [profile, setProfile] = useState({});

  // Load user auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fu) => {
      if (!fu) return setUser(null);
      try {
        const snap = await getDoc(doc(db, "users", fu.uid));
        const data = snap.exists() ? snap.data() : {};
        setUser({ uid: fu.uid, email: fu.email, ...data });
        setProfile(data || {});
      } catch {
        setUser({ uid: fu.uid, email: fu.email });
      }
    });
    return () => unsub();
  }, []);

  // Load dashboard data
  useEffect(() => {
    if (!user?.uid) return;
    const loadData = async () => {
      setLoading(true);
      try {
        const [ordersSnap, downloadsSnap, servicesSnap, invoicesSnap, ticketsSnap] = await Promise.all([
          getDocs(query(collection(db, "orders"), where("customerId", "==", user.uid), orderBy("createdAt", "desc"))),
          getDocs(query(collection(db, "downloads"), where("customerId", "==", user.uid), orderBy("createdAt", "desc"))),
          getDocs(query(collection(db, "services"), where("customerId", "==", user.uid), orderBy("createdAt", "desc"))),
          getDocs(query(collection(db, "invoices"), where("customerId", "==", user.uid), orderBy("createdAt", "desc"))),
          getDocs(query(collection(db, "supportTickets"), where("customerId", "==", user.uid), orderBy("createdAt", "desc"))),
        ]);
        setOrders(ordersSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        setDownloads(downloadsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        setServices(servicesSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        setInvoices(invoicesSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        setTickets(ticketsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        toast.error("Failed to load dashboard data");
      }
      setLoading(false);
    };
    loadData();
  }, [user?.uid]);

  if (!user) {
    return (
      <>
        <Navbar />
        <div style={{ paddingTop: 120, textAlign: "center", minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div>
            <h2 style={{ fontWeight: 900, fontSize: 24, marginBottom: 10 }}>Sign in to your account</h2>
            <p style={{ color: "#6b7280", marginBottom: 20 }}>Access your orders, downloads, and services.</p>
            <a href="/dashboard" style={{ display: "inline-block", padding: "12px 24px", background: "#16a34a", color: "#fff", borderRadius: 10, fontWeight: 700, textDecoration: "none" }}>
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
        @keyframes fadeu { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .dash-tab { display: flex; align-items: center; gap: 8px; padding: 11px 14px; border: none; border-radius: 10px; cursor: pointer; font-size: 13.5px; font-weight: 600; background: none; color: #6b7280; transition: all .15s; text-align: left; margin-bottom: 4px; font-family: inherit; width: 100%; }
        .dash-tab:hover { background: #f9fafb; color: #111827; }
        .dash-tab.on { background: #dcfce7; color: #15803d; }
        .dash-card { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 16px; padding: 22px; animation: fadeu .3s ease both; }
        .dash-stat { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 14px; padding: 20px; }
        .dash-row:hover { background: #fafafa; }
        .dash-tbl { width: 100%; border-collapse: collapse; font-size: 13.5px; }
        .dash-tbl th { padding: 10px 14px; text-align: left; font-size: 11.5px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: .4px; border-bottom: 2px solid #f3f4f6; white-space: nowrap; }
        .dash-tbl td { padding: 12px 14px; border-bottom: 1px solid #f9fafb; vertical-align: middle; }
        .dash-badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 99px; font-size: 11.5px; font-weight: 700; }
        .badge-paid { background: #dcfce7; color: #15803d; }
        .badge-pending { background: #fef3c7; color: #92400e; }
        .badge-failed { background: #fee2e2; color: #dc2626; }
        .badge-new { background: #dbeafe; color: #1e40af; }
        .badge-completed { background: #dcfce7; color: #15803d; }
        @media (max-width: 768px) { .dash-layout { grid-template-columns: 1fr !important; } }
      `}</style>

      <Toaster position="top-center" />
      <Navbar />

      <div style={{ paddingTop: 64, background: "#f9fafb", minHeight: "100vh" }}>

        {/* Header */}
        <div style={{ background: "linear-gradient(135deg,#0f172a,#1e3a8a,#16a34a)", padding: "32px 20px 28px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.15)", borderRadius: 99, padding: "4px 14px", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.85)", marginBottom: 10 }}>
              👤 My Dashboard
            </div>
            <h1 style={{ color: "#fff", fontWeight: 900, fontSize: "clamp(22px,4vw,32px)", letterSpacing: "-0.5px", marginBottom: 6 }}>
              Welcome back, {profile.firstName || user.email.split("@")[0]}!
            </h1>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13.5 }}>
              Manage your orders, downloads, services, and account settings.
            </p>
          </div>
        </div>

        {/* Main Layout */}
        <div className="dash-layout" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 24, maxWidth: 1280, margin: "0 auto", padding: "24px 20px" }}>

          {/* Sidebar */}
          <aside style={{ background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 16, padding: 20, height: "fit-content", position: "sticky", top: 80 }}>
            <p style={{ fontSize: 11.5, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 10 }}>Menu</p>
            {tabs.map(t => (
              <button key={t.id} className={`dash-tab ${tab === t.id ? "on" : ""}`} onClick={() => setTab(t.id)}>
                {t.icon} {t.label}
              </button>
            ))}
            <button onClick={() => signOut(auth)} style={{ width: "100%", marginTop: 16, padding: "11px 14px", border: "1.5px solid #fee2e2", borderRadius: 10, background: "none", color: "#dc2626", fontWeight: 700, fontSize: 13.5, cursor: "pointer", fontFamily: "inherit" }}>
              🚪 Sign Out
            </button>
          </aside>

          {/* Main Content */}
          <main>

            {/* OVERVIEW */}
            {tab === "overview" && (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(155px,1fr))", gap: 16, marginBottom: 24 }}>
                  {stats.map(s => (
                    <div key={s.label} className="dash-stat">
                      <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
                      <div style={{ fontSize: 12, color: "#6b7280", marginTop: 3 }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="dash-card">
                  <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Recent Orders</h3>
                  {loading ? <Spinner /> : orders.length === 0 ? (
                    <p style={{ textAlign: "center", color: "#9ca3af", padding: "28px 0" }}>No orders yet.</p>
                  ) : (
                    <div style={{ overflowX: "auto" }}>
                      <table className="dash-tbl">
                        <thead><tr><th>Order ID</th><th>Product</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
                        <tbody>
                          {orders.slice(0, 5).map(o => (
                            <tr key={o.id} className="dash-row">
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
                <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>All Orders</h3>
                {loading ? <Spinner /> : orders.length === 0 ? (
                  <p style={{ textAlign: "center", color: "#9ca3af", padding: "28px 0" }}>No orders yet.</p>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table className="dash-tbl">
                      <thead><tr><th>Order ID</th><th>Product</th><th>Type</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
                      <tbody>
                        {orders.map(o => (
                          <tr key={o.id} className="dash-row">
                            <td style={{ fontWeight: 700, fontFamily: "monospace", fontSize: 12 }}>{o.orderId}</td>
                            <td>{o.productTitle}</td>
                            <td style={{ fontSize: 12, color: "#6b7280" }}>{o.type}</td>
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
                <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>My Downloads</h3>
                {loading ? <Spinner /> : downloads.length === 0 ? (
                  <p style={{ textAlign: "center", color: "#9ca3af", padding: "28px 0" }}>No downloads yet. Purchase a document to get started.</p>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table className="dash-tbl">
                      <thead><tr><th>Product</th><th>Downloads</th><th>Expires</th><th>Action</th></tr></thead>
                      <tbody>
                        {downloads.map(d => (
                          <tr key={d.id} className="dash-row">
                            <td style={{ fontWeight: 700 }}>{d.productSlug}</td>
                            <td>{d.downloadCount} / ∞</td>
                            <td style={{ color: "#9ca3af", fontSize: 12.5 }}>{d.expiresAt?.toDate?.().toLocaleDateString?.() || "—"}</td>
                            <td><a href="#" style={{ color: "#16a34a", fontWeight: 700, textDecoration: "none" }}>Download →</a></td>
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
                <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>My Services</h3>
                {loading ? <Spinner /> : services.length === 0 ? (
                  <p style={{ textAlign: "center", color: "#9ca3af", padding: "28px 0" }}>No active services. Browse our services to get started.</p>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table className="dash-tbl">
                      <thead><tr><th>Service</th><th>Status</th><th>Assigned To</th><th>Created</th></tr></thead>
                      <tbody>
                        {services.map(s => (
                          <tr key={s.id} className="dash-row">
                            <td style={{ fontWeight: 700 }}>{s.productSlug}</td>
                            <td><span className={`dash-badge badge-${s.status}`}>{s.status.toUpperCase()}</span></td>
                            <td style={{ color: "#9ca3af" }}>{s.assignedStaff ? "✓ Assigned" : "—"}</td>
                            <td style={{ color: "#9ca3af", fontSize: 12.5 }}>{s.createdAt?.toDate?.().toLocaleDateString?.() || "—"}</td>
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
                <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Invoices</h3>
                {loading ? <Spinner /> : invoices.length === 0 ? (
                  <p style={{ textAlign: "center", color: "#9ca3af", padding: "28px 0" }}>No invoices yet.</p>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table className="dash-tbl">
                      <thead><tr><th>Invoice #</th><th>Amount</th><th>Status</th><th>Issued</th><th>Action</th></tr></thead>
                      <tbody>
                        {invoices.map(inv => (
                          <tr key={inv.id} className="dash-row">
                            <td style={{ fontWeight: 700 }}>{inv.invoiceNumber}</td>
                            <td style={{ fontWeight: 700 }}>KES {inv.total?.toLocaleString()}</td>
                            <td><span className={`dash-badge badge-${inv.status}`}>{inv.status.toUpperCase()}</span></td>
                            <td style={{ color: "#9ca3af", fontSize: 12.5 }}>{inv.issuedAt?.toDate?.().toLocaleDateString?.() || "—"}</td>
                            <td><a href="#" style={{ color: "#16a34a", fontWeight: 700, textDecoration: "none" }}>View →</a></td>
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
                <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Support Tickets</h3>
                {loading ? <Spinner /> : tickets.length === 0 ? (
                  <p style={{ textAlign: "center", color: "#9ca3af", padding: "28px 0" }}>No support tickets yet. Need help? <a href="#" style={{ color: "#16a34a", fontWeight: 700 }}>Create a ticket</a>.</p>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table className="dash-tbl">
                      <thead><tr><th>Subject</th><th>Category</th><th>Status</th><th>Created</th></tr></thead>
                      <tbody>
                        {tickets.map(t => (
                          <tr key={t.id} className="dash-row">
                            <td style={{ fontWeight: 700 }}>{t.subject}</td>
                            <td style={{ fontSize: 12, color: "#6b7280" }}>{t.category}</td>
                            <td><span className={`dash-badge badge-${t.status}`}>{t.status.toUpperCase()}</span></td>
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
                <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 20 }}>Account Settings</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 20 }}>
                  <div>
                    <label style={{ fontSize: 12.5, fontWeight: 700, color: "#6b7280", display: "block", marginBottom: 6 }}>First Name</label>
                    <input type="text" value={profile.firstName || ""} disabled style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e5e7eb", borderRadius: 10, fontSize: 14, outline: "none", fontFamily: "inherit", background: "#f9fafb" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 12.5, fontWeight: 700, color: "#6b7280", display: "block", marginBottom: 6 }}>Last Name</label>
                    <input type="text" value={profile.lastName || ""} disabled style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e5e7eb", borderRadius: 10, fontSize: 14, outline: "none", fontFamily: "inherit", background: "#f9fafb" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 12.5, fontWeight: 700, color: "#6b7280", display: "block", marginBottom: 6 }}>Email</label>
                    <input type="email" value={user.email || ""} disabled style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e5e7eb", borderRadius: 10, fontSize: 14, outline: "none", fontFamily: "inherit", background: "#f9fafb" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 12.5, fontWeight: 700, color: "#6b7280", display: "block", marginBottom: 6 }}>Phone</label>
                    <input type="tel" value={profile.phone || ""} disabled style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e5e7eb", borderRadius: 10, fontSize: 14, outline: "none", fontFamily: "inherit", background: "#f9fafb" }} />
                  </div>
                </div>
                <p style={{ fontSize: 12.5, color: "#9ca3af", marginTop: 16 }}>
                  To update your profile, please contact support or use the edit feature (coming soon).
                </p>
              </div>
            )}

          </main>
        </div>
      </div>

      <Footer />
    </>
  );
}

function Spinner() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div style={{ width: 36, height: 36, border: "3px solid #e5e7eb", borderTopColor: "#16a34a", borderRadius: "50%", animation: "spin .8s linear infinite" }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
