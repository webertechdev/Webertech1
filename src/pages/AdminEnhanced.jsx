// src/pages/AdminEnhanced.jsx
// Admin Dashboard — Phase 1 Complete
// Tabs: Overview | Orders | Payments | Customers | Products | Analytics | Settings

import { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc, orderBy, query, where } from "firebase/firestore";
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
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Load all data
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

  // Calculate stats
  const paidOrders = orders.filter(o => o.status === "paid");
  const totalRevenue = paidOrders.reduce((sum, o) => sum + (o.amount || 0), 0);
  const avgOrderValue = paidOrders.length > 0 ? (totalRevenue / paidOrders.length).toFixed(0) : 0;
  const pendingOrders = orders.filter(o => o.status === "pending").length;
  const failedOrders = orders.filter(o => o.status === "failed").length;

  // Filter data
  const filteredOrders = orders
    .filter(o => filter === "All" || o.status === filter)
    .filter(o => !search || o.productTitle?.toLowerCase().includes(search.toLowerCase()) || o.orderId?.includes(search));

  const filteredCustomers = customers.filter(c => !search || c.email?.toLowerCase().includes(search.toLowerCase()) || c.firstName?.toLowerCase().includes(search.toLowerCase()));

  const filteredProducts = products.filter(p => !search || p.title?.toLowerCase().includes(search.toLowerCase()) || p.slug?.includes(search));

  // Export CSV
  const exportCSV = () => {
    const rows = [
      ["Order ID", "Product", "Amount", "Status", "Payment Method", "Date"],
      ...orders.map(o => [o.orderId, o.productTitle, o.amount, o.status, o.paymentMethod, o.createdAt?.toDate?.().toLocaleDateString?.() || ""]),
    ];
    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `webertech-orders-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const BADGE = {
    paid: <span className="badge-paid">✅ Paid</span>,
    pending: <span className="badge-pending">⏳ Pending</span>,
    failed: <span className="badge-failed">❌ Failed</span>,
    active: <span className="badge-completed">✓ Active</span>,
    inactive: <span className="badge-failed">✗ Inactive</span>,
  };

  return (
    <>
      <style>{`
        body { font-family: 'Segoe UI', system-ui, sans-serif; }
        @keyframes fadeu { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .adm-tab { display: flex; align-items: center; gap: 8px; padding: 11px 14px; border: none; border-radius: 10px; cursor: pointer; font-size: 13.5px; font-weight: 600; background: none; color: #6b7280; transition: all .15s; text-align: left; margin-bottom: 4px; font-family: inherit; width: 100%; }
        .adm-tab:hover { background: #f9fafb; color: #111827; }
        .adm-tab.on { background: #fef3c7; color: #92400e; }
        .adm-card { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 16px; padding: 22px; animation: fadeu .3s ease both; }
        .adm-stat { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 14px; padding: 20px; }
        .adm-row:hover { background: #fafafa; }
        .adm-tbl { width: 100%; border-collapse: collapse; font-size: 13.5px; }
        .adm-tbl th { padding: 10px 14px; text-align: left; font-size: 11.5px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: .4px; border-bottom: 2px solid #f3f4f6; white-space: nowrap; }
        .adm-tbl td { padding: 12px 14px; border-bottom: 1px solid #f9fafb; vertical-align: middle; }
        .badge-paid { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 99px; font-size: 11.5px; font-weight: 700; background: #dcfce7; color: #15803d; }
        .badge-pending { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 99px; font-size: 11.5px; font-weight: 700; background: #fef3c7; color: #92400e; }
        .badge-failed { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 99px; font-size: 11.5px; font-weight: 700; background: #fee2e2; color: #dc2626; }
        .badge-completed { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 99px; font-size: 11.5px; font-weight: 700; background: #dcfce7; color: #15803d; }
        .btn-primary { background: #16a34a; color: #fff; border: none; border-radius: 10px; padding: 9px 16px; font-weight: 700; cursor: pointer; font-size: 13.5px; font-family: inherit; display: inline-flex; align-items: center; gap: 6px; }
        .btn-primary:hover { background: #15803d; }
        @media (max-width: 768px) { .adm-layout { grid-template-columns: 1fr !important; } }
      `}</style>

      <Toaster position="top-center" />
      <Navbar />

      <div style={{ paddingTop: 64, background: "#f9fafb", minHeight: "100vh" }}>

        {/* Header */}
        <div style={{ background: "linear-gradient(135deg,#0f172a,#92400e,#d97706)", padding: "32px 20px 28px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.15)", borderRadius: 99, padding: "4px 14px", fontSize: 12, fontWeight: 700, color: "#fef3c7", marginBottom: 10 }}>
              ⚙ Admin Panel
            </div>
            <h1 style={{ color: "#fff", fontWeight: 900, fontSize: "clamp(22px,4vw,32px)", letterSpacing: "-0.5px" }}>
              WeberTech Admin — Phase 1
            </h1>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13.5, marginTop: 4 }}>
              Orders, payments, customers, products & analytics
            </p>
          </div>
        </div>

        {/* Layout */}
        <div className="adm-layout" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 24, maxWidth: 1280, margin: "0 auto", padding: "24px 20px" }}>

          {/* Sidebar */}
          <aside style={{ background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 16, padding: 20, height: "fit-content", position: "sticky", top: 80 }}>
            <p style={{ fontSize: 11.5, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 10 }}>Menu</p>
            {[
              { id: "overview", icon: "📊", label: "Overview" },
              { id: "orders", icon: "📋", label: "Orders" },
              { id: "payments", icon: "💰", label: "Payments" },
              { id: "customers", icon: "👥", label: "Customers" },
              { id: "products", icon: "📦", label: "Products" },
              { id: "analytics", icon: "📈", label: "Analytics" },
              { id: "settings", icon: "⚙️", label: "Settings" },
            ].map(t => (
              <button key={t.id} className={`adm-tab ${tab === t.id ? "on" : ""}`} onClick={() => setTab(t.id)}>
                {t.icon} {t.label}
              </button>
            ))}
          </aside>

          {/* Main */}
          <main>

            {/* OVERVIEW */}
            {tab === "overview" && (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(155px,1fr))", gap: 16, marginBottom: 24 }}>
                  {[
                    { icon: "💰", label: "Total Revenue", value: `KES ${totalRevenue.toLocaleString()}`, color: "#16a34a", bg: "#dcfce7" },
                    { icon: "📋", label: "Total Orders", value: orders.length, color: "#2563eb", bg: "#dbeafe" },
                    { icon: "✅", label: "Paid Orders", value: paidOrders.length, color: "#16a34a", bg: "#dcfce7" },
                    { icon: "⏳", label: "Pending", value: pendingOrders, color: "#d97706", bg: "#fef3c7" },
                    { icon: "❌", label: "Failed", value: failedOrders, color: "#dc2626", bg: "#fee2e2" },
                    { icon: "👥", label: "Customers", value: customers.length, color: "#7c3aed", bg: "#ede9fe" },
                  ].map(s => (
                    <div key={s.label} className="adm-stat">
                      <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
                      <div style={{ fontSize: 12, color: "#6b7280", marginTop: 3 }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="adm-card">
                  <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Recent Orders</h3>
                  {loading ? <Spinner /> : (
                    <div style={{ overflowX: "auto" }}>
                      <table className="adm-tbl">
                        <thead><tr><th>Order ID</th><th>Product</th><th>Amount</th><th>Status</th><th>Method</th><th>Date</th></tr></thead>
                        <tbody>
                          {orders.slice(0, 5).map(o => (
                            <tr key={o.id} className="adm-row">
                              <td style={{ fontWeight: 700, fontFamily: "monospace", fontSize: 12 }}>{o.orderId}</td>
                              <td>{o.productTitle}</td>
                              <td style={{ fontWeight: 700 }}>KES {o.amount?.toLocaleString()}</td>
                              <td>{BADGE[o.status] || BADGE.pending}</td>
                              <td style={{ fontSize: 12, color: "#6b7280" }}>{o.paymentMethod}</td>
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
              <div className="adm-card">
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 20 }}>
                  <h3 style={{ fontWeight: 700, fontSize: 16 }}>All Orders ({orders.length})</h3>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                    <input style={{ padding: "9px 14px", border: "1.5px solid #e5e7eb", borderRadius: 10, fontSize: 14, outline: "none", fontFamily: "inherit", width: 210 }} placeholder="Search order, product…" value={search} onChange={e => setSearch(e.target.value)} />
                    {["All", "paid", "pending", "failed"].map(f => (
                      <button key={f} onClick={() => setFilter(f)} style={{ padding: "7px 14px", borderRadius: 8, border: `2px solid ${filter === f ? "#d97706" : "#e5e7eb"}`, background: filter === f ? "#fef3c7" : "#fff", color: filter === f ? "#92400e" : "#6b7280", fontWeight: 700, fontSize: 12.5, cursor: "pointer", fontFamily: "inherit" }}>
                        {f}
                      </button>
                    ))}
                    <button className="btn-primary" onClick={exportCSV}>⬇ CSV</button>
                  </div>
                </div>
                {loading ? <Spinner /> : (
                  <div style={{ overflowX: "auto" }}>
                    <table className="adm-tbl">
                      <thead><tr><th>Order ID</th><th>Product</th><th>Amount</th><th>Status</th><th>Method</th><th>Customer</th><th>Date</th></tr></thead>
                      <tbody>
                        {filteredOrders.map(o => (
                          <tr key={o.id} className="adm-row">
                            <td style={{ fontWeight: 700, fontFamily: "monospace", fontSize: 12 }}>{o.orderId}</td>
                            <td>{o.productTitle}</td>
                            <td style={{ fontWeight: 700 }}>KES {o.amount?.toLocaleString()}</td>
                            <td>{BADGE[o.status] || BADGE.pending}</td>
                            <td style={{ fontSize: 12, color: "#6b7280" }}>{o.paymentMethod}</td>
                            <td style={{ fontSize: 12, color: "#6b7280" }}>{o.customerName || o.customerEmail}</td>
                            <td style={{ color: "#9ca3af", fontSize: 12.5 }}>{o.createdAt?.toDate?.().toLocaleDateString?.() || "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {filteredOrders.length === 0 && <p style={{ textAlign: "center", color: "#9ca3af", padding: "28px 0" }}>No orders found.</p>}
                  </div>
                )}
              </div>
            )}

            {/* PAYMENTS */}
            {tab === "payments" && (
              <div className="adm-card">
                <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>All Payments ({payments.length})</h3>
                {loading ? <Spinner /> : (
                  <div style={{ overflowX: "auto" }}>
                    <table className="adm-tbl">
                      <thead><tr><th>Order ID</th><th>Amount</th><th>Method</th><th>Phone</th><th>M-PESA Ref</th><th>Date</th></tr></thead>
                      <tbody>
                        {payments.map(p => (
                          <tr key={p.id} className="adm-row">
                            <td style={{ fontWeight: 700, fontFamily: "monospace", fontSize: 12 }}>{p.orderId}</td>
                            <td style={{ fontWeight: 700 }}>KES {p.amount?.toLocaleString()}</td>
                            <td style={{ fontSize: 12, color: "#6b7280" }}>{p.method}</td>
                            <td style={{ fontFamily: "monospace", fontSize: 12 }}>{p.phone}</td>
                            <td style={{ fontFamily: "monospace", fontSize: 12 }}>{p.mpesaRef || "—"}</td>
                            <td style={{ color: "#9ca3af", fontSize: 12.5 }}>{p.createdAt?.toDate?.().toLocaleDateString?.() || "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {payments.length === 0 && <p style={{ textAlign: "center", color: "#9ca3af", padding: "28px 0" }}>No payments yet.</p>}
                  </div>
                )}
              </div>
            )}

            {/* CUSTOMERS */}
            {tab === "customers" && (
              <div className="adm-card">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
                  <h3 style={{ fontWeight: 700, fontSize: 16 }}>All Customers ({customers.length})</h3>
                  <input style={{ padding: "9px 14px", border: "1.5px solid #e5e7eb", borderRadius: 10, fontSize: 14, outline: "none", fontFamily: "inherit", width: 240 }} placeholder="Search name, email…" value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                {loading ? <Spinner /> : (
                  <div style={{ overflowX: "auto" }}>
                    <table className="adm-tbl">
                      <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Joined</th></tr></thead>
                      <tbody>
                        {filteredCustomers.map(c => (
                          <tr key={c.id} className="adm-row">
                            <td style={{ fontWeight: 700 }}>{c.firstName} {c.lastName}</td>
                            <td style={{ fontSize: 13 }}>{c.email}</td>
                            <td style={{ fontSize: 12, color: "#6b7280" }}>{c.phone || "—"}</td>
                            <td><span style={{ fontSize: 11.5, fontWeight: 700, background: c.isAdmin ? "#fef3c7" : "#f3f4f6", color: c.isAdmin ? "#92400e" : "#6b7280", padding: "3px 10px", borderRadius: 99 }}>{c.isAdmin ? "Admin" : "Customer"}</span></td>
                            <td style={{ color: "#9ca3af", fontSize: 12.5 }}>{c.createdAt?.toDate?.().toLocaleDateString?.() || "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {filteredCustomers.length === 0 && <p style={{ textAlign: "center", color: "#9ca3af", padding: "28px 0" }}>No customers found.</p>}
                  </div>
                )}
              </div>
            )}

            {/* PRODUCTS */}
            {tab === "products" && (
              <div className="adm-card">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
                  <h3 style={{ fontWeight: 700, fontSize: 16 }}>All Products ({products.length})</h3>
                  <input style={{ padding: "9px 14px", border: "1.5px solid #e5e7eb", borderRadius: 10, fontSize: 14, outline: "none", fontFamily: "inherit", width: 240 }} placeholder="Search title, slug…" value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                {loading ? <Spinner /> : (
                  <div style={{ overflowX: "auto" }}>
                    <table className="adm-tbl">
                      <thead><tr><th>Title</th><th>Category</th><th>Price</th><th>Type</th><th>Status</th></tr></thead>
                      <tbody>
                        {filteredProducts.map(p => (
                          <tr key={p.id} className="adm-row">
                            <td style={{ fontWeight: 700 }}>{p.title}</td>
                            <td style={{ fontSize: 12, color: "#6b7280" }}>{p.category}</td>
                            <td style={{ fontWeight: 700 }}>KES {p.price?.toLocaleString()}</td>
                            <td style={{ fontSize: 12, color: "#6b7280" }}>{p.type}</td>
                            <td>{BADGE[p.status] || BADGE.inactive}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {filteredProducts.length === 0 && <p style={{ textAlign: "center", color: "#9ca3af", padding: "28px 0" }}>No products found.</p>}
                  </div>
                )}
              </div>
            )}

            {/* ANALYTICS */}
            {tab === "analytics" && (
              <div className="adm-card">
                <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 20 }}>Analytics & Insights</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
                  <div style={{ background: "#f9fafb", padding: 16, borderRadius: 12 }}>
                    <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 8 }}>Average Order Value</div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: "#16a34a" }}>KES {avgOrderValue.toLocaleString()}</div>
                  </div>
                  <div style={{ background: "#f9fafb", padding: 16, borderRadius: 12 }}>
                    <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 8 }}>Conversion Rate</div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: "#2563eb" }}>{orders.length > 0 ? ((paidOrders.length / orders.length) * 100).toFixed(1) : 0}%</div>
                  </div>
                  <div style={{ background: "#f9fafb", padding: 16, borderRadius: 12 }}>
                    <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 8 }}>Top Payment Method</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#7c3aed" }}>
                      {payments.length > 0
                        ? Object.entries(payments.reduce((acc, p) => ({ ...acc, [p.method]: (acc[p.method] || 0) + 1 }), {})).sort((a, b) => b[1] - a[1])[0]?.[0] || "—"
                        : "—"}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SETTINGS */}
            {tab === "settings" && (
              <div className="adm-card">
                <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 20 }}>Admin Settings</h3>
                <div style={{ background: "#f9fafb", padding: 16, borderRadius: 12, marginBottom: 16 }}>
                  <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 10 }}>
                    <strong>Firestore Collections:</strong> orders, payments, downloads, services, products, invoices, refunds, subscriptions, coupons, notifications, supportTickets
                  </p>
                  <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 10 }}>
                    <strong>Payment Methods:</strong> NestLink (M-PESA), IntaSend (M-PESA/Card), Safaricom (Coming Soon)
                  </p>
                  <p style={{ fontSize: 14, color: "#6b7280" }}>
                    <strong>Next Steps:</strong> Upload product files to Firebase Storage, configure webhook URLs, enable Firestore backups.
                  </p>
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

function Spinner() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div style={{ width: 36, height: 36, border: "3px solid #e5e7eb", borderTopColor: "#16a34a", borderRadius: "50%", animation: "spin .8s linear infinite" }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
