// src/pages/Admin.jsx
// Access: isAdmin === true in Firestore users/{uid}
// Protected via AdminOnly in App.jsx

import { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc, orderBy, query } from "firebase/firestore";
import { db }             from "../config/firebase";
import { toast, Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Admin() {
  const [tab,        setTab]        = useState("overview");
  const [txns,       setTxns]       = useState([]);
  const [users,      setUsers]      = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [txnSearch,  setTxnSearch]  = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [txnFilter,  setTxnFilter]  = useState("All");
  const [editTxn,    setEditTxn]    = useState(null);
  const [saving,     setSaving]     = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [ts, us] = await Promise.all([
          getDocs(query(collection(db,"transactions"), orderBy("createdAt","desc"))),
          getDocs(query(collection(db,"users"),        orderBy("createdAt","desc"))),
        ]);
        setTxns(ts.docs.map(d => ({ id:d.id, ...d.data() })));
        setUsers(us.docs.map(d => ({ id:d.id, ...d.data() })));
      } catch { toast.error("Failed to load data"); }
      setLoading(false);
    };
    load();
  }, []);

  // ── Stats ──
  const revenue  = txns.filter(t=>t.status==="Completed").reduce((a,t)=>a+(parseInt(t.amount?.replace(/\D/g,""))||0),0);
  const complete  = txns.filter(t=>t.status==="Completed").length;
  const process   = txns.filter(t=>t.status==="Processing").length;
  const failed    = txns.filter(t=>t.status==="Failed").length;

  // ── Filtered txns ──
  const shownTxns = txns
    .filter(t => txnFilter==="All" || t.status===txnFilter)
    .filter(t => {
      const s = txnSearch.toLowerCase();
      return !s || [t.mpesaTxn,t.firstName,t.lastName,t.receivingNumber,t.paymentNumber,t.bundle]
        .some(v => v?.toLowerCase().includes(s));
    });

  // ── Filtered users ──
  const shownUsers = users.filter(u => {
    const s = userSearch.toLowerCase();
    return !s || [u.firstName,u.lastName,u.email,u.phone].some(v=>v?.toLowerCase().includes(s));
  });

  // ── Update txn status ──
  const saveTxn = async () => {
    setSaving(true);
    try {
      await updateDoc(doc(db,"transactions",editTxn.id), { status:editTxn.status });
      setTxns(p => p.map(t => t.id===editTxn.id ? {...t,status:editTxn.status} : t));
      toast.success("Transaction updated ✅");
      setEditTxn(null);
    } catch { toast.error("Failed to update"); }
    setSaving(false);
  };

  // ── Toggle admin ──
  const toggleAdmin = async (u) => {
    const val = !u.isAdmin;
    try {
      await updateDoc(doc(db,"users",u.id), { isAdmin:val });
      setUsers(p => p.map(x => x.id===u.id ? {...x,isAdmin:val} : x));
      toast.success(`${u.firstName} is ${val?"now admin":"no longer admin"}`);
    } catch { toast.error("Failed"); }
  };

  // ── Export CSV ──
  const exportCSV = () => {
    const rows = [
      ["TXN","Status","Bundle","Amount","Delivered To","Paid From","Name","Date"],
      ...txns.map(t=>[t.mpesaTxn,t.status,t.bundle,t.amount,t.receivingNumber,t.paymentNumber,`${t.firstName} ${t.lastName}`,t.date])
    ];
    const blob = new Blob([rows.map(r=>r.join(",")).join("\n")], {type:"text/csv"});
    const a    = document.createElement("a");
    a.href     = URL.createObjectURL(blob);
    a.download = `webertech-txns-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  // ── Styles ──
  const inp  = { padding:"9px 14px", border:"1.5px solid #e5e7eb", borderRadius:10, fontSize:14, outline:"none", fontFamily:"inherit" };
  const btnA = (bg="#d97706") => ({ background:bg, color:"#fff", border:"none", borderRadius:10, fontWeight:700, cursor:"pointer", padding:"9px 16px", fontSize:13.5, fontFamily:"inherit", display:"inline-flex", alignItems:"center", gap:6 });

  const BADGE = {
    Completed:  <span style={{ background:"#dcfce7", color:"#15803d", padding:"3px 10px", borderRadius:99, fontSize:11.5, fontWeight:700 }}>✅ Completed</span>,
    Processing: <span style={{ background:"#fef3c7", color:"#d97706", padding:"3px 10px", borderRadius:99, fontSize:11.5, fontWeight:700 }}>⏳ Processing</span>,
    Failed:     <span style={{ background:"#fee2e2", color:"#dc2626", padding:"3px 10px", borderRadius:99, fontSize:11.5, fontWeight:700 }}>❌ Failed</span>,
  };

  return (
    <>
      <style>{`
        body{font-family:'Segoe UI',system-ui,sans-serif}
        @keyframes fadeu{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        .adm-tab{display:flex;align-items:center;gap:10px;width:100%;padding:11px 14px;border:none;border-radius:10px;cursor:pointer;font-size:14px;font-weight:600;background:none;color:#6b7280;transition:all .15s;text-align:left;margin-bottom:4px;font-family:inherit}
        .adm-tab:hover{background:#f9fafb;color:#111827}
        .adm-tab.on{background:#fef3c7;color:#92400e}
        .adm-card{background:#fff;border:1.5px solid #e5e7eb;border-radius:16px;padding:22px;animation:fadeu .3s ease both}
        .adm-stat{background:#fff;border:1.5px solid #e5e7eb;border-radius:14px;padding:20px}
        .adm-row:hover{background:#fafafa}
        .adm-tbl{width:100%;border-collapse:collapse;font-size:13.5px}
        .adm-tbl th{padding:10px 14px;text-align:left;font-size:11.5px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:.4px;border-bottom:2px solid #f3f4f6;white-space:nowrap}
        .adm-tbl td{padding:12px 14px;border-bottom:1px solid #f9fafb;vertical-align:middle}
        @media(max-width:768px){.adm-layout{grid-template-columns:1fr!important}}
      `}</style>

      <Toaster position="top-center" />
      <Navbar />

      <div style={{ paddingTop:64, background:"#f9fafb", minHeight:"100vh" }}>

        {/* Header */}
        <div style={{ background:"linear-gradient(135deg,#0f172a,#92400e,#d97706)", padding:"32px 20px 28px" }}>
          <div style={{ maxWidth:1280, margin:"0 auto" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(255,255,255,0.15)", borderRadius:99, padding:"4px 14px", fontSize:12, fontWeight:700, color:"#fef3c7", marginBottom:10 }}>
              ⚙ Admin Panel
            </div>
            <h1 style={{ color:"#fff", fontWeight:900, fontSize:"clamp(22px,4vw,32px)", letterSpacing:"-0.5px" }}>
              WeberTech Admin
            </h1>
            <p style={{ color:"rgba(255,255,255,0.65)", fontSize:13.5, marginTop:4 }}>
              Full control — transactions, users & revenue
            </p>
          </div>
        </div>

        {/* Layout */}
        <div className="adm-layout" style={{ display:"grid", gridTemplateColumns:"220px 1fr", gap:24, maxWidth:1280, margin:"0 auto", padding:"24px 20px" }}>

          {/* Sidebar */}
          <aside style={{ background:"#fff", border:"1.5px solid #e5e7eb", borderRadius:16, padding:20, height:"fit-content", position:"sticky", top:80 }}>
            <p style={{ fontSize:11.5, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:10 }}>Menu</p>
            {[
              { id:"overview",     icon:"📊", label:"Overview"      },
              { id:"transactions", icon:"📋", label:"Transactions"  },
              { id:"users",        icon:"👥", label:"Users"         },
            ].map(t => (
              <button key={t.id} className={`adm-tab ${tab===t.id?"on":""}`} onClick={()=>setTab(t.id)}>
                {t.icon} {t.label}
              </button>
            ))}
          </aside>

          {/* Main */}
          <main>

            {/* OVERVIEW */}
            {tab==="overview" && (
              <>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(155px,1fr))", gap:16, marginBottom:24 }}>
                  {[
                    { icon:"💰", label:"Total Revenue",  value:`KES ${revenue.toLocaleString()}`, color:"#16a34a", bg:"#dcfce7" },
                    { icon:"📋", label:"Total Orders",   value:txns.length,                        color:"#2563eb", bg:"#dbeafe" },
                    { icon:"✅", label:"Completed",      value:complete,                           color:"#16a34a", bg:"#dcfce7" },
                    { icon:"⏳", label:"Processing",     value:process,                            color:"#d97706", bg:"#fef3c7" },
                    { icon:"❌", label:"Failed",         value:failed,                             color:"#dc2626", bg:"#fee2e2" },
                    { icon:"👥", label:"Total Users",    value:users.length,                       color:"#7c3aed", bg:"#ede9fe" },
                  ].map(s => (
                    <div key={s.label} className="adm-stat">
                      <div style={{ fontSize:22, marginBottom:8 }}>{s.icon}</div>
                      <div style={{ fontSize:22, fontWeight:800, color:s.color }}>{s.value}</div>
                      <div style={{ fontSize:12, color:"#6b7280", marginTop:3 }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="adm-card">
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
                    <h3 style={{ fontWeight:700, fontSize:16 }}>Recent Transactions</h3>
                    <button style={btnA()} onClick={()=>setTab("transactions")}>View All →</button>
                  </div>
                  {loading ? <Spinner /> : (
                    <div style={{ overflowX:"auto" }}>
                      <table className="adm-tbl">
                        <thead><tr><th>TXN Code</th><th>Bundle</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
                        <tbody>
                          {txns.slice(0,5).map(t => (
                            <tr key={t.id} className="adm-row">
                              <td style={{ fontWeight:700, fontFamily:"monospace", fontSize:12.5 }}>{t.mpesaTxn}</td>
                              <td>{t.bundle}</td>
                              <td style={{ fontWeight:700 }}>{t.amount}</td>
                              <td>{BADGE[t.status]||BADGE.Processing}</td>
                              <td style={{ color:"#9ca3af", fontSize:12.5 }}>{t.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* TRANSACTIONS */}
            {tab==="transactions" && (
              <div className="adm-card">
                <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:12, marginBottom:20 }}>
                  <h3 style={{ fontWeight:700, fontSize:16 }}>All Transactions</h3>
                  <div style={{ display:"flex", gap:10, flexWrap:"wrap", alignItems:"center" }}>
                    <input style={{ ...inp, width:210 }} placeholder="Search TXN, name, number…" value={txnSearch} onChange={e=>setTxnSearch(e.target.value)} />
                    {["All","Completed","Processing","Failed"].map(f=>(
                      <button key={f} onClick={()=>setTxnFilter(f)}
                        style={{ padding:"7px 14px", borderRadius:8, border:`2px solid ${txnFilter===f?"#d97706":"#e5e7eb"}`, background:txnFilter===f?"#fef3c7":"#fff", color:txnFilter===f?"#92400e":"#6b7280", fontWeight:700, fontSize:12.5, cursor:"pointer", fontFamily:"inherit" }}>
                        {f}
                      </button>
                    ))}
                    <button style={btnA("#16a34a")} onClick={exportCSV}>⬇ CSV</button>
                  </div>
                </div>

                {loading ? <Spinner /> : (
                  <div style={{ overflowX:"auto" }}>
                    <table className="adm-tbl">
                      <thead>
                        <tr><th>TXN Code</th><th>Name</th><th>Bundle</th><th>Amount</th><th>Delivered To</th><th>Paid From</th><th>Status</th><th>Date</th><th>Edit</th></tr>
                      </thead>
                      <tbody>
                        {shownTxns.map(t => (
                          <tr key={t.id} className="adm-row">
                            <td style={{ fontWeight:700, fontFamily:"monospace", fontSize:12 }}>{t.mpesaTxn}</td>
                            <td>{t.firstName} {t.lastName}</td>
                            <td>{t.bundle}</td>
                            <td style={{ fontWeight:700 }}>{t.amount}</td>
                            <td style={{ fontFamily:"monospace", fontSize:12 }}>{t.receivingNumber}</td>
                            <td style={{ fontFamily:"monospace", fontSize:12 }}>{t.paymentNumber}</td>
                            <td>{BADGE[t.status]||BADGE.Processing}</td>
                            <td style={{ color:"#9ca3af", fontSize:12 }}>{t.date}</td>
                            <td>
                              <button onClick={()=>setEditTxn({...t})}
                                style={{ background:"none", border:"1.5px solid #e5e7eb", borderRadius:7, padding:"5px 10px", cursor:"pointer", fontSize:12, fontWeight:600, color:"#6b7280", fontFamily:"inherit" }}>
                                ✏ Edit
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {shownTxns.length===0 && <p style={{ textAlign:"center", color:"#9ca3af", padding:"28px 0", fontSize:14 }}>No transactions found.</p>}
                  </div>
                )}
              </div>
            )}

            {/* USERS */}
            {tab==="users" && (
              <div className="adm-card">
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, marginBottom:20, flexWrap:"wrap" }}>
                  <h3 style={{ fontWeight:700, fontSize:16 }}>All Users ({users.length})</h3>
                  <input style={{ ...inp, width:240 }} placeholder="Search name, email, phone…" value={userSearch} onChange={e=>setUserSearch(e.target.value)} />
                </div>

                {loading ? <Spinner /> : (
                  <div style={{ overflowX:"auto" }}>
                    <table className="adm-tbl">
                      <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Joined</th><th>Action</th></tr></thead>
                      <tbody>
                        {shownUsers.map(u => (
                          <tr key={u.id} className="adm-row">
                            <td style={{ fontWeight:700 }}>{u.firstName} {u.lastName}</td>
                            <td style={{ fontSize:13 }}>{u.email}</td>
                            <td style={{ fontFamily:"monospace", fontSize:12.5 }}>{u.phone||"—"}</td>
                            <td>
                              <span style={{ background:u.isAdmin?"#dbeafe":"#dcfce7", color:u.isAdmin?"#1d4ed8":"#15803d", padding:"3px 10px", borderRadius:99, fontSize:11.5, fontWeight:700 }}>
                                {u.isAdmin?"Admin":"User"}
                              </span>
                            </td>
                            <td style={{ color:"#9ca3af", fontSize:12.5 }}>
                              {u.createdAt?.toDate ? u.createdAt.toDate().toLocaleDateString() : "—"}
                            </td>
                            <td>
                              <button onClick={()=>toggleAdmin(u)}
                                style={{ background:"none", border:`1.5px solid ${u.isAdmin?"#fca5a5":"#86efac"}`, borderRadius:7, padding:"5px 10px", cursor:"pointer", fontSize:12, fontWeight:600, color:u.isAdmin?"#dc2626":"#15803d", fontFamily:"inherit" }}>
                                {u.isAdmin?"Remove Admin":"Make Admin"}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {shownUsers.length===0 && <p style={{ textAlign:"center", color:"#9ca3af", padding:"28px 0", fontSize:14 }}>No users found.</p>}
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Edit modal */}
      {editTxn && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:600, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
          <div style={{ background:"#fff", borderRadius:18, width:"100%", maxWidth:420, padding:"28px 26px", boxShadow:"0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
              <h3 style={{ fontWeight:800, fontSize:17 }}>Edit Transaction</h3>
              <button onClick={()=>setEditTxn(null)} style={{ background:"none", border:"none", fontSize:20, cursor:"pointer", color:"#6b7280" }}>✕</button>
            </div>
            <p style={{ fontSize:13, color:"#6b7280", marginBottom:4 }}>TXN Code</p>
            <p style={{ fontWeight:700, fontFamily:"monospace", fontSize:15, marginBottom:20 }}>{editTxn.mpesaTxn}</p>
            <label style={{ fontSize:12, fontWeight:700, color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.4px", display:"block", marginBottom:8 }}>Update Status</label>
            <select value={editTxn.status} onChange={e=>setEditTxn(p=>({...p,status:e.target.value}))}
              style={{ ...inp, width:"100%", marginBottom:22 }}>
              <option>Completed</option>
              <option>Processing</option>
              <option>Failed</option>
            </select>
            <div style={{ display:"flex", gap:10 }}>
              <button style={{ ...btnA(), flex:1, justifyContent:"center" }} onClick={saveTxn} disabled={saving}>
                {saving?"Saving…":"💾 Save"}
              </button>
              <button onClick={()=>setEditTxn(null)}
                style={{ flex:1, padding:"9px 16px", border:"2px solid #e5e7eb", borderRadius:10, background:"#fff", fontWeight:700, fontSize:13.5, cursor:"pointer", fontFamily:"inherit" }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

function Spinner() {
  return (
    <div style={{ textAlign:"center", padding:"40px 0", color:"#9ca3af" }}>
      <div style={{ width:28, height:28, border:"3px solid #e5e7eb", borderTopColor:"#d97706", borderRadius:"50%", animation:"spin .7s linear infinite", margin:"0 auto 10px" }} />
      <p style={{ fontSize:13 }}>Loading…</p>
    </div>
  );
}
