// ─────────────────────────────────────────────────────────────────
//  WeberTech — src/pages/Admin.jsx
//  Admin panel: revenue stats + all transactions + all users
//  Access: isAdmin === true in Firestore users/{uid}
//  Protected via AdminRoute in App.jsx
// ─────────────────────────────────────────────────────────────────
import { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc, orderBy, query } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast, Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FaUsers, FaHistory, FaChartBar, FaCog, FaCheckCircle,
  FaClock, FaTimesCircle, FaSpinner, FaWhatsapp, FaSearch,
  FaEdit, FaSave, FaTimes, FaMobileAlt, FaPhone, FaSms,
  FaBolt, FaDownload
} from "react-icons/fa";

const BADGE = {
  Completed:  "badge-green",
  Processing: "badge-yellow",
  Failed:     "badge-red",
};

export default function Admin() {
  const [activeTab, setActiveTab]   = useState("overview");
  const [transactions, setTxns]     = useState([]);
  const [users, setUsers]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [txnSearch, setTxnSearch]   = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [txnFilter, setTxnFilter]   = useState("All");
  const [editTxn, setEditTxn]       = useState(null);
  const [saving, setSaving]         = useState(false);

  // ── Fetch all data ──
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [txSnap, usSnap] = await Promise.all([
          getDocs(query(collection(db, "transactions"), orderBy("createdAt","desc"))),
          getDocs(query(collection(db, "users"), orderBy("createdAt","desc"))),
        ]);
        setTxns(txSnap.docs.map(d => ({ id:d.id, ...d.data() })));
        setUsers(usSnap.docs.map(d => ({ id:d.id, ...d.data() })));
      } catch (e) { toast.error("Failed to load data"); }
      setLoading(false);
    };
    load();
  }, []);

  // ── Stats ──
  const totalRevenue = transactions
    .filter(t => t.status==="Completed")
    .reduce((sum,t) => sum + (parseInt(t.amount?.replace(/\D/g,""))||0), 0);
  const totalOrders     = transactions.length;
  const completedOrders = transactions.filter(t=>t.status==="Completed").length;
  const processingOrders= transactions.filter(t=>t.status==="Processing").length;
  const failedOrders    = transactions.filter(t=>t.status==="Failed").length;
  const totalUsers      = users.length;

  // ── Filtered transactions ──
  const filteredTxns = transactions
    .filter(t => txnFilter==="All" || t.status===txnFilter)
    .filter(t => {
      const s = txnSearch.toLowerCase();
      return !s || [t.mpesaTxn,t.firstName,t.lastName,t.receivingNumber,t.paymentNumber,t.bundle]
        .some(v => v?.toLowerCase().includes(s));
    });

  // ── Filtered users ──
  const filteredUsers = users.filter(u => {
    const s = userSearch.toLowerCase();
    return !s || [u.firstName,u.lastName,u.email,u.phone].some(v=>v?.toLowerCase().includes(s));
  });

  // ── Update transaction status ──
  const saveEditTxn = async () => {
    setSaving(true);
    try {
      await updateDoc(doc(db, "transactions", editTxn.id), { status: editTxn.status });
      setTxns(prev => prev.map(t => t.id===editTxn.id ? { ...t, status:editTxn.status } : t));
      toast.success("Transaction updated ✅");
      setEditTxn(null);
    } catch { toast.error("Failed to update"); }
    setSaving(false);
  };

  // ── Toggle admin flag ──
  const toggleAdmin = async (u) => {
    const newVal = !u.isAdmin;
    try {
      await updateDoc(doc(db, "users", u.id), { isAdmin: newVal });
      setUsers(prev => prev.map(x => x.id===u.id ? { ...x, isAdmin:newVal } : x));
      toast.success(`${u.firstName} is ${newVal?"now an admin":"no longer admin"}`);
    } catch { toast.error("Failed to update user"); }
  };

  // ── CSV Export ──
  const exportCSV = () => {
    const rows = [
      ["TXN Code","Status","Bundle","Amount","Receiving Number","Payment Number","First Name","Last Name","Date"],
      ...transactions.map(t=>[t.mpesaTxn,t.status,t.bundle,t.amount,t.receivingNumber,t.paymentNumber,t.firstName,t.lastName,t.date])
    ];
    const csv = rows.map(r=>r.join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv],{type:"text/csv"}));
    a.download = `webertech-transactions-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const bundleIcon = (type) => ({ Data:<FaMobileAlt/>, Minutes:<FaPhone/>, SMS:<FaSms/> }[type]||<FaBolt/>);

  return (
    <>
      <style>{`
        .admin-layout { display:grid; grid-template-columns:220px 1fr; gap:24px; max-width:1280px; margin:0 auto; padding:24px 20px; }
        .admin-tab { display:flex; align-items:center; gap:10px; width:100%; padding:11px 14px; border:none; border-radius:10px; cursor:pointer; font-size:14px; font-weight:600; background:none; color:#6b7280; transition:all .15s; text-align:left; margin-bottom:4px; }
        .admin-tab:hover  { background:#f9fafb; color:#111827; }
        .admin-tab.active { background:#fef3c7; color:#92400e; }
        .admin-card { background:#fff; border:1.5px solid #e5e7eb; border-radius:16px; padding:22px; }
        .stat-card  { background:#fff; border:1.5px solid #e5e7eb; border-radius:14px; padding:20px; }
        .badge { display:inline-block; padding:3px 10px; border-radius:99px; font-size:11.5px; font-weight:700; }
        .badge-green  { background:#dcfce7; color:#15803d; }
        .badge-yellow { background:#fef3c7; color:#d97706; }
        .badge-red    { background:#fee2e2; color:#dc2626; }
        .badge-blue   { background:#dbeafe; color:#1d4ed8; }
        .input-f { width:100%; padding:10px 14px; border:1.5px solid #e5e7eb; border-radius:10px; font-size:14px; outline:none; font-family:inherit; }
        .input-f:focus { border-color:#d97706; box-shadow:0 0 0 3px rgba(217,119,6,.1); }
        .btn-a { background:#d97706; color:#fff; border:none; border-radius:10px; font-weight:700; cursor:pointer; transition:all .15s; display:inline-flex; align-items:center; gap:7px; padding:9px 16px; font-size:13.5px; }
        .btn-a:hover { background:#b45309; }
        .btn-a:disabled { background:#9ca3af; cursor:not-allowed; }
        @media (max-width:768px) { .admin-layout { grid-template-columns:1fr; } }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);} }
        .fade-up { animation:fadeUp .3s ease both; }
        @keyframes spin{to{transform:rotate(360deg)}}
        .txn-row:hover { background:#fafafa; }
        .overflow-x { overflow-x:auto; }
        table { width:100%; border-collapse:collapse; font-size:13.5px; }
        th { padding:10px 14px; text-align:left; font-size:11.5px; font-weight:700; color:#6b7280; text-transform:uppercase; letter-spacing:.4px; border-bottom:2px solid #f3f4f6; white-space:nowrap; }
        td { padding:12px 14px; border-bottom:1px solid #f9fafb; vertical-align:middle; }
      `}</style>

      <Toaster position="top-center" />
      <Navbar />

      <div style={{ paddingTop:64, background:"#f9fafb", minHeight:"100vh" }}>
        {/* Admin header */}
        <div style={{ background:"linear-gradient(135deg,#0f172a,#92400e,#d97706)", padding:"32px 20px 28px" }}>
          <div style={{ maxWidth:1280, margin:"0 auto" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(255,255,255,0.15)", borderRadius:99, padding:"4px 14px", fontSize:12, fontWeight:700, color:"#fef3c7", marginBottom:10 }}>
              <FaCog /> Admin Panel
            </div>
            <h1 style={{ color:"#fff", fontWeight:900, fontSize:"clamp(22px,4vw,32px)", letterSpacing:"-0.5px" }}>
              WeberTech Admin
            </h1>
            <p style={{ color:"rgba(255,255,255,0.7)", fontSize:13.5, marginTop:4 }}>Full control over transactions, users & revenue</p>
          </div>
        </div>

        <div className="admin-layout">
          {/* Sidebar */}
          <aside style={{ background:"#fff", border:"1.5px solid #e5e7eb", borderRadius:16, padding:20, height:"fit-content", position:"sticky", top:80 }}>
            <p style={{ fontSize:11.5, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:10 }}>Admin Menu</p>
            {[
              { id:"overview",     icon:<FaChartBar />, label:"Overview"     },
              { id:"transactions", icon:<FaHistory />,  label:"Transactions" },
              { id:"users",        icon:<FaUsers />,    label:"Users"        },
            ].map(t => (
              <button key={t.id} className={`admin-tab ${activeTab===t.id?"active":""}`} onClick={() => setActiveTab(t.id)}>
                {t.icon} {t.label}
              </button>
            ))}
          </aside>

          {/* Main */}
          <main>

            {/* ── OVERVIEW ── */}
            {activeTab === "overview" && (
              <div className="fade-up">
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:16, marginBottom:24 }}>
                  {[
                    { label:"Total Revenue",   value:`KES ${totalRevenue.toLocaleString()}`, color:"#16a34a", bg:"#dcfce7", icon:<FaChartBar />  },
                    { label:"Total Orders",    value:totalOrders,                            color:"#2563eb", bg:"#dbeafe", icon:<FaHistory />   },
                    { label:"Completed",       value:completedOrders,                        color:"#16a34a", bg:"#dcfce7", icon:<FaCheckCircle />},
                    { label:"Processing",      value:processingOrders,                       color:"#d97706", bg:"#fef3c7", icon:<FaClock />      },
                    { label:"Failed",          value:failedOrders,                           color:"#dc2626", bg:"#fee2e2", icon:<FaTimesCircle />},
                    { label:"Total Users",     value:totalUsers,                             color:"#7c3aed", bg:"#ede9fe", icon:<FaUsers />      },
                  ].map(s => (
                    <div key={s.label} className="stat-card">
                      <div style={{ width:36, height:36, borderRadius:10, background:s.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, color:s.color, marginBottom:10 }}>{s.icon}</div>
                      <div style={{ fontSize:22, fontWeight:800, color:s.color }}>{s.value}</div>
                      <div style={{ fontSize:12, color:"#6b7280", marginTop:3 }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Recent 5 transactions */}
                <div className="admin-card">
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
                    <h3 style={{ fontWeight:700, fontSize:16 }}>Recent Transactions</h3>
                    <button className="btn-a" onClick={() => setActiveTab("transactions")}>View All</button>
                  </div>
                  {loading ? <LoadingSpinner /> : (
                    <div className="overflow-x">
                      <table>
                        <thead><tr><th>TXN Code</th><th>Bundle</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
                        <tbody>
                          {transactions.slice(0,5).map(t => (
                            <tr key={t.id} className="txn-row">
                              <td style={{ fontWeight:700, fontFamily:"monospace" }}>{t.mpesaTxn}</td>
                              <td>{t.bundle}</td>
                              <td style={{ fontWeight:700 }}>{t.amount}</td>
                              <td><span className={`badge ${BADGE[t.status]||"badge-yellow"}`}>{t.status}</span></td>
                              <td style={{ color:"#9ca3af" }}>{t.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── TRANSACTIONS ── */}
            {activeTab === "transactions" && (
              <div className="fade-up admin-card">
                <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:12, marginBottom:20 }}>
                  <h3 style={{ fontWeight:700, fontSize:16 }}>All Transactions</h3>
                  <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                    <div style={{ position:"relative" }}>
                      <FaSearch style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"#9ca3af", fontSize:13 }} />
                      <input className="input-f" style={{ paddingLeft:34, width:220 }} placeholder="Search TXN, name, number…" value={txnSearch} onChange={e=>setTxnSearch(e.target.value)} />
                    </div>
                    {["All","Completed","Processing","Failed"].map(f=>(
                      <button key={f} onClick={()=>setTxnFilter(f)} style={{ padding:"7px 14px", borderRadius:8, border:`2px solid ${txnFilter===f?"#d97706":"#e5e7eb"}`, background:txnFilter===f?"#fef3c7":"#fff", color:txnFilter===f?"#92400e":"#6b7280", fontWeight:700, fontSize:12.5, cursor:"pointer" }}>{f}</button>
                    ))}
                    <button className="btn-a" onClick={exportCSV} style={{ background:"#16a34a" }}>
                      <FaDownload /> Export CSV
                    </button>
                  </div>
                </div>

                {loading ? <LoadingSpinner /> : (
                  <div className="overflow-x">
                    <table>
                      <thead><tr><th>TXN Code</th><th>Name</th><th>Bundle</th><th>Amount</th><th>Received By</th><th>Paid From</th><th>Status</th><th>Date</th><th>Action</th></tr></thead>
                      <tbody>
                        {filteredTxns.map(t => (
                          <tr key={t.id} className="txn-row">
                            <td style={{ fontWeight:700, fontFamily:"monospace", fontSize:12.5 }}>{t.mpesaTxn}</td>
                            <td>{t.firstName} {t.lastName}</td>
                            <td style={{ display:"flex", alignItems:"center", gap:6, paddingTop:14 }}>
                              <span style={{ color:"#16a34a" }}>{bundleIcon(t.bundleType)}</span>{t.bundle}
                            </td>
                            <td style={{ fontWeight:700 }}>{t.amount}</td>
                            <td style={{ fontFamily:"monospace", fontSize:12.5 }}>{t.receivingNumber}</td>
                            <td style={{ fontFamily:"monospace", fontSize:12.5 }}>{t.paymentNumber}</td>
                            <td><span className={`badge ${BADGE[t.status]||"badge-yellow"}`}>{t.status}</span></td>
                            <td style={{ color:"#9ca3af", fontSize:12.5 }}>{t.date}</td>
                            <td>
                              <button onClick={()=>setEditTxn({...t})} style={{ background:"none", border:"1.5px solid #e5e7eb", borderRadius:7, padding:"5px 10px", cursor:"pointer", fontSize:12, fontWeight:600, color:"#6b7280", display:"inline-flex", alignItems:"center", gap:4 }}>
                                <FaEdit /> Edit
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {filteredTxns.length === 0 && (
                      <p style={{ textAlign:"center", color:"#9ca3af", padding:"28px 0", fontSize:14 }}>No transactions found.</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ── USERS ── */}
            {activeTab === "users" && (
              <div className="fade-up admin-card">
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, marginBottom:20, flexWrap:"wrap" }}>
                  <h3 style={{ fontWeight:700, fontSize:16 }}>All Users ({users.length})</h3>
                  <div style={{ position:"relative" }}>
                    <FaSearch style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"#9ca3af", fontSize:13 }} />
                    <input className="input-f" style={{ paddingLeft:34, width:240 }} placeholder="Search name, email, phone…" value={userSearch} onChange={e=>setUserSearch(e.target.value)} />
                  </div>
                </div>
                {loading ? <LoadingSpinner /> : (
                  <div className="overflow-x">
                    <table>
                      <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Joined</th><th>Action</th></tr></thead>
                      <tbody>
                        {filteredUsers.map(u => (
                          <tr key={u.id} className="txn-row">
                            <td style={{ fontWeight:700 }}>{u.firstName} {u.lastName}</td>
                            <td style={{ fontSize:13 }}>{u.email}</td>
                            <td style={{ fontFamily:"monospace", fontSize:12.5 }}>{u.phone || "—"}</td>
                            <td>
                              <span className={`badge ${u.isAdmin?"badge-blue":"badge-green"}`}>
                                {u.isAdmin ? "Admin" : "User"}
                              </span>
                            </td>
                            <td style={{ color:"#9ca3af", fontSize:12.5 }}>
                              {u.createdAt?.toDate ? u.createdAt.toDate().toLocaleDateString() : "—"}
                            </td>
                            <td>
                              <button onClick={()=>toggleAdmin(u)}
                                style={{ background:"none", border:`1.5px solid ${u.isAdmin?"#fca5a5":"#86efac"}`, borderRadius:7, padding:"5px 10px", cursor:"pointer", fontSize:12, fontWeight:600, color:u.isAdmin?"#dc2626":"#15803d" }}>
                                {u.isAdmin ? "Remove Admin" : "Make Admin"}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {filteredUsers.length === 0 && (
                      <p style={{ textAlign:"center", color:"#9ca3af", padding:"28px 0", fontSize:14 }}>No users found.</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ── Edit TXN modal ── */}
      {editTxn && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
          <div style={{ background:"#fff", borderRadius:18, width:"100%", maxWidth:440, padding:"28px 26px", boxShadow:"0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
              <h3 style={{ fontWeight:800, fontSize:17 }}>Edit Transaction</h3>
              <button onClick={()=>setEditTxn(null)} style={{ background:"none", border:"none", fontSize:20, cursor:"pointer", color:"#6b7280" }}><FaTimes /></button>
            </div>
            <p style={{ fontSize:13, color:"#6b7280", marginBottom:6 }}>TXN Code</p>
            <p style={{ fontWeight:700, fontFamily:"monospace", fontSize:15, marginBottom:20 }}>{editTxn.mpesaTxn}</p>
            <label style={{ fontSize:12, fontWeight:700, color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.4px", display:"block", marginBottom:8 }}>Update Status</label>
            <select className="input-f" value={editTxn.status} onChange={e=>setEditTxn(p=>({...p,status:e.target.value}))} style={{ marginBottom:22 }}>
              <option>Completed</option>
              <option>Processing</option>
              <option>Failed</option>
            </select>
            <div style={{ display:"flex", gap:10 }}>
              <button className="btn-a" style={{ flex:1, justifyContent:"center" }} onClick={saveEditTxn} disabled={saving}>
                {saving ? <FaSpinner style={{ animation:"spin .7s linear infinite" }} /> : <><FaSave /> Save</>}
              </button>
              <button onClick={()=>setEditTxn(null)} style={{ flex:1, padding:"9px 16px", border:"2px solid #e5e7eb", borderRadius:10, background:"#fff", fontWeight:700, fontSize:13.5, cursor:"pointer" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

function LoadingSpinner() {
  return (
    <div style={{ textAlign:"center", padding:"40px 0", color:"#9ca3af" }}>
      <FaSpinner style={{ animation:"spin .7s linear infinite", fontSize:24 }} />
      <p style={{ marginTop:10, fontSize:13 }}>Loading…</p>
    </div>
  );
}
