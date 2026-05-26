// src/pages/Dashboard.jsx
// Protected — only logged-in users via App.jsx ProtectedRoute

import { useState, useEffect } from "react";
import { Link, useNavigate }   from "react-router-dom";
import { signOut, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { doc, getDoc, updateDoc, collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { auth, db }            from "../config/firebase";
import { toast, Toaster }      from "react-hot-toast";
import Navbar  from "../components/Navbar";
import Footer  from "../components/Footer";

const BUNDLES_URL = "https://bundles.webertech.co.ke";
const WHATSAPP    = "https://wa.me/254722508904";

const BADGE = {
  Completed:  { cls:"wt-badge-g", icon:"✅" },
  Processing: { cls:"wt-badge-y", icon:"⏳" },
  Failed:     { cls:"wt-badge-r", icon:"❌" },
};

export default function Dashboard({ user }) {
  const [tab,      setTab]      = useState("overview");
  const [txns,     setTxns]     = useState([]);
  const [filter,   setFilter]   = useState("All");
  const [profile,  setProfile]  = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [pwForm,   setPwForm]   = useState({ current:"", next:"", confirm:"" });
  const [txnLoad,  setTxnLoad]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.uid) return;
    getDoc(doc(db,"users",user.uid)).then(s => {
      if (s.exists()) { setProfile(s.data()); setEditForm(s.data()); }
    });
  }, [user]);

  useEffect(() => {
    if (!user?.uid) return;
    setTxnLoad(true);
    getDocs(query(
      collection(db,"transactions"),
      where("userId","==",user.uid),
      orderBy("createdAt","desc")
    )).then(s => {
      setTxns(s.docs.map(d => ({ id:d.id, ...d.data() })));
      setTxnLoad(false);
    }).catch(() => setTxnLoad(false));
  }, [user]);

  const shown    = filter==="All" ? txns : txns.filter(t => t.status===filter);
  const spent    = txns.filter(t=>t.status==="Completed").reduce((a,t)=>a+(parseInt(t.amount?.replace(/\D/g,""))||0),0);
  const greeting = () => { const h=new Date().getHours(); return h<12?"Good Morning":h<18?"Good Afternoon":"Good Evening"; };

  const saveProfile = async () => {
    setSaving(true);
    try {
      await updateDoc(doc(db,"users",user.uid),{ firstName:editForm.firstName, lastName:editForm.lastName, phone:editForm.phone });
      setProfile(p=>({...p,...editForm})); setEditMode(false); toast.success("Profile updated ✅");
    } catch { toast.error("Failed to update"); }
    setSaving(false);
  };

  const changePw = async () => {
    if (pwForm.next !== pwForm.confirm) { toast.error("Passwords don't match"); return; }
    if (pwForm.next.length < 6)         { toast.error("Min 6 characters"); return; }
    setSaving(true);
    try {
      const cred = EmailAuthProvider.credential(user.email, pwForm.current);
      await reauthenticateWithCredential(auth.currentUser, cred);
      await updatePassword(auth.currentUser, pwForm.next);
      setPwForm({ current:"", next:"", confirm:"" }); toast.success("Password changed 🔒");
    } catch (e) { toast.error(e.code==="auth/wrong-password"?"Wrong current password":"Failed to change password"); }
    setSaving(false);
  };

  const logout = async () => { await signOut(auth); navigate("/"); };

  const inp = { width:"100%", padding:"11px 14px", border:"1.5px solid #e5e7eb", borderRadius:10, fontSize:14, outline:"none", fontFamily:"inherit", boxSizing:"border-box" };
  const btnP = { background:"#16a34a", color:"#fff", border:"none", borderRadius:10, fontWeight:700, cursor:"pointer", fontFamily:"inherit" };
  const btnO = { background:"transparent", border:"2px solid #16a34a", color:"#16a34a", borderRadius:10, fontWeight:700, cursor:"pointer", fontFamily:"inherit" };

  return (
    <>
      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeu{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .wt-badge-g{background:#dcfce7;color:#15803d}
        .wt-badge-y{background:#fef3c7;color:#d97706}
        .wt-badge-r{background:#fee2e2;color:#dc2626}
        .wt-badge{display:inline-block;padding:3px 10px;border-radius:99px;font-size:11.5px;font-weight:700}
        .wt-tab-btn{display:flex;align-items:center;gap:10px;width:100%;padding:11px 14px;border:none;border-radius:10px;cursor:pointer;font-size:14px;font-weight:600;background:none;color:#6b7280;transition:all .15s;text-align:left;margin-bottom:4px;font-family:inherit}
        .wt-tab-btn:hover{background:#f9fafb;color:#111827}
        .wt-tab-btn.on{background:#dcfce7;color:#15803d}
        .wt-card{background:#fff;border:1.5px solid #e5e7eb;border-radius:16px;padding:22px}
        .wt-stat{background:#fff;border:1.5px solid #e5e7eb;border-radius:14px;padding:20px}
        .wt-row:hover{background:#fafafa}
        @media(max-width:768px){.wt-dash-grid{grid-template-columns:1fr!important}}
      `}</style>

      <Toaster position="top-center" />
      <Navbar />

      <div style={{ paddingTop:64, background:"#f9fafb", minHeight:"100vh", fontFamily:"'Segoe UI',system-ui,sans-serif" }}>

        {/* Header */}
        <div style={{ background:"linear-gradient(135deg,#0f172a,#15803d)", padding:"32px 20px 28px" }}>
          <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:14 }}>
            <div>
              <div style={{ color:"rgba(255,255,255,0.65)", fontSize:13, marginBottom:4 }}>📊 My Dashboard</div>
              <h1 style={{ color:"#fff", fontWeight:800, fontSize:"clamp(20px,4vw,28px)", letterSpacing:"-0.5px" }}>
                {greeting()}, {profile.firstName || user?.firstName || "there"} 👋
              </h1>
              <p style={{ color:"rgba(255,255,255,0.6)", fontSize:13, marginTop:4 }}>{user?.email}</p>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <a href={BUNDLES_URL} target="_blank" rel="noreferrer"
                style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"10px 18px", background:"#16a34a", borderRadius:10, color:"#fff", fontWeight:700, fontSize:13.5, textDecoration:"none" }}>
                ⚡ Buy Bundle
              </a>
              <button onClick={logout}
                style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"10px 18px", background:"rgba(255,255,255,0.12)", border:"none", borderRadius:10, color:"#fff", fontWeight:700, fontSize:13.5, cursor:"pointer", fontFamily:"inherit" }}>
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="wt-dash-grid" style={{ display:"grid", gridTemplateColumns:"240px 1fr", gap:24, maxWidth:1200, margin:"0 auto", padding:"24px 20px" }}>

          {/* Sidebar */}
          <aside style={{ background:"#fff", border:"1.5px solid #e5e7eb", borderRadius:16, padding:20, height:"fit-content", position:"sticky", top:80 }}>
            <div style={{ textAlign:"center", marginBottom:18, paddingBottom:16, borderBottom:"1px solid #f3f4f6" }}>
              <div style={{ width:60, height:60, borderRadius:"50%", background:"linear-gradient(135deg,#15803d,#4ade80)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, color:"#fff", fontSize:22, margin:"0 auto 10px" }}>
                {(profile.firstName||"U")[0].toUpperCase()}
              </div>
              <p style={{ fontWeight:700, fontSize:15 }}>{profile.firstName} {profile.lastName}</p>
              <p style={{ fontSize:12, color:"#9ca3af", marginTop:2 }}>{profile.phone||"No phone"}</p>
            </div>
            {[
              { id:"overview",     icon:"📊", label:"Overview"         },
              { id:"transactions", icon:"📋", label:"My Transactions"  },
              { id:"profile",      icon:"👤", label:"Profile Settings" },
              { id:"security",     icon:"🔒", label:"Security"         },
            ].map(t => (
              <button key={t.id} className={`wt-tab-btn ${tab===t.id?"on":""}`} onClick={()=>setTab(t.id)}>
                {t.icon} {t.label}
              </button>
            ))}
            <div style={{ borderTop:"1px solid #f3f4f6", marginTop:12, paddingTop:12 }}>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="wt-tab-btn" style={{ display:"flex", color:"#25d366", textDecoration:"none" }}>💬 WhatsApp Support</a>
              <button className="wt-tab-btn" onClick={logout} style={{ color:"#dc2626" }}>↩ Sign Out</button>
            </div>
          </aside>

          {/* Main */}
          <main style={{ animation:"fadeu .35s ease both" }}>

            {/* OVERVIEW */}
            {tab==="overview" && (
              <>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:16, marginBottom:24 }}>
                  {[
                    { label:"Total Orders",  value:txns.length,                              color:"#16a34a", bg:"#dcfce7", icon:"📋" },
                    { label:"Completed",     value:txns.filter(t=>t.status==="Completed").length, color:"#2563eb", bg:"#dbeafe", icon:"✅" },
                    { label:"Total Spent",   value:`KES ${spent.toLocaleString()}`,          color:"#7c3aed", bg:"#ede9fe", icon:"💰" },
                    { label:"Processing",    value:txns.filter(t=>t.status==="Processing").length, color:"#d97706", bg:"#fef3c7", icon:"⏳" },
                  ].map(s=>(
                    <div key={s.label} className="wt-stat">
                      <div style={{ fontSize:24, marginBottom:8 }}>{s.icon}</div>
                      <div style={{ fontSize:22, fontWeight:800, color:s.color }}>{s.value}</div>
                      <div style={{ fontSize:12.5, color:"#6b7280", marginTop:3 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="wt-card">
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18 }}>
                    <h3 style={{ fontWeight:700, fontSize:16 }}>Recent Transactions</h3>
                    <button className="wt-tab-btn" style={{ width:"auto", padding:"6px 12px", fontSize:13 }} onClick={()=>setTab("transactions")}>View All</button>
                  </div>
                  <TxnList txns={txns.slice(0,5)} loading={txnLoad} />
                </div>
              </>
            )}

            {/* TRANSACTIONS */}
            {tab==="transactions" && (
              <div className="wt-card">
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12, marginBottom:20 }}>
                  <h3 style={{ fontWeight:700, fontSize:16 }}>Transaction History</h3>
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                    {["All","Completed","Processing","Failed"].map(f=>(
                      <button key={f} onClick={()=>setFilter(f)}
                        style={{ padding:"6px 14px", borderRadius:8, border:`2px solid ${filter===f?"#16a34a":"#e5e7eb"}`, background:filter===f?"#dcfce7":"#fff", color:filter===f?"#15803d":"#6b7280", fontWeight:700, fontSize:12.5, cursor:"pointer", fontFamily:"inherit" }}>
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
                <TxnList txns={shown} loading={txnLoad} expanded />
              </div>
            )}

            {/* PROFILE */}
            {tab==="profile" && (
              <div className="wt-card">
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:22 }}>
                  <h3 style={{ fontWeight:700, fontSize:16 }}>👤 Profile Settings</h3>
                  {!editMode && <button style={{ ...btnO, padding:"8px 16px", fontSize:13 }} onClick={()=>setEditMode(true)}>✏ Edit</button>}
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
                  {[{label:"First Name",key:"firstName"},{label:"Last Name",key:"lastName"}].map(f=>(
                    <div key={f.key}>
                      <label style={{ fontSize:12, fontWeight:700, color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.4px", display:"block", marginBottom:6 }}>{f.label}</label>
                      {editMode ? <input style={inp} value={editForm[f.key]||""} onChange={e=>setEditForm(p=>({...p,[f.key]:e.target.value}))} />
                               : <p style={{ fontSize:15, fontWeight:600, padding:"10px 0" }}>{profile[f.key]||"—"}</p>}
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom:16 }}>
                  <label style={{ fontSize:12, fontWeight:700, color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.4px", display:"block", marginBottom:6 }}>Safaricom Number</label>
                  {editMode ? <input style={inp} value={editForm.phone||""} onChange={e=>setEditForm(p=>({...p,phone:e.target.value}))} placeholder="07XX XXX XXX" />
                            : <p style={{ fontSize:15, fontWeight:600, padding:"10px 0" }}>{profile.phone||"Not set"}</p>}
                </div>
                <div style={{ marginBottom:editMode?24:0 }}>
                  <label style={{ fontSize:12, fontWeight:700, color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.4px", display:"block", marginBottom:6 }}>Email</label>
                  <p style={{ fontSize:15, fontWeight:600, padding:"10px 0", color:"#9ca3af" }}>
                    {user?.email} <span style={{ fontSize:12, background:"#dcfce7", color:"#15803d", padding:"2px 8px", borderRadius:99, fontWeight:700, marginLeft:8 }}>Verified</span>
                  </p>
                </div>
                {editMode && (
                  <div style={{ display:"flex", gap:10 }}>
                    <button style={{ ...btnP, padding:"11px 22px", fontSize:14 }} onClick={saveProfile} disabled={saving}>
                      {saving ? "Saving…" : "Save Changes"}
                    </button>
                    <button style={{ ...btnO, padding:"11px 22px", fontSize:14 }} onClick={()=>{setEditMode(false);setEditForm(profile);}}>Cancel</button>
                  </div>
                )}
              </div>
            )}

            {/* SECURITY */}
            {tab==="security" && (
              <div className="wt-card">
                <h3 style={{ fontWeight:700, fontSize:16, marginBottom:22 }}>🔒 Change Password</h3>
                <div style={{ maxWidth:400, display:"flex", flexDirection:"column", gap:14 }}>
                  {[{label:"Current Password",key:"current",ph:"Enter current password"},{label:"New Password",key:"next",ph:"Min 6 characters"},{label:"Confirm Password",key:"confirm",ph:"Repeat new password"}].map(f=>(
                    <div key={f.key}>
                      <label style={{ fontSize:12, fontWeight:700, color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.4px", display:"block", marginBottom:6 }}>{f.label}</label>
                      <input style={inp} type="password" placeholder={f.ph} value={pwForm[f.key]} onChange={e=>setPwForm(p=>({...p,[f.key]:e.target.value}))} />
                    </div>
                  ))}
                  <button style={{ ...btnP, padding:"12px 0", fontSize:14, marginTop:4 }} onClick={changePw} disabled={saving}>
                    {saving ? "Changing…" : "🔒 Change Password"}
                  </button>
                </div>
                <div style={{ marginTop:28, padding:"16px 20px", background:"#f9fafb", borderRadius:12, border:"1.5px solid #e5e7eb" }}>
                  <p style={{ fontWeight:700, fontSize:14, marginBottom:8 }}>⚠️ Security Tips</p>
                  <ul style={{ color:"#6b7280", fontSize:13.5, lineHeight:1.8, paddingLeft:20 }}>
                    <li>Use a strong password with letters, numbers & symbols</li>
                    <li>Never share your password with anyone</li>
                    <li>Contact support@webertech.co.ke if you suspect unauthorized access</li>
                  </ul>
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

function TxnList({ txns, loading, expanded }) {
  if (loading) return <p style={{ textAlign:"center", color:"#9ca3af", padding:"30px 0", fontSize:14 }}>⟳ Loading…</p>;
  if (!txns.length) return (
    <div style={{ textAlign:"center", padding:"32px 0" }}>
      <p style={{ color:"#9ca3af", fontSize:14, marginBottom:14 }}>No transactions yet.</p>
      <a href="https://bundles.webertech.co.ke" target="_blank" rel="noreferrer"
        style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"10px 20px", background:"#16a34a", borderRadius:10, color:"#fff", fontWeight:700, fontSize:13.5, textDecoration:"none" }}>
        ⚡ Buy Your First Bundle
      </a>
    </div>
  );
  const b = BADGE;
  return txns.map(t => {
    const s = b[t.status] || b.Processing;
    return (
      <div key={t.id} className="wt-row" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"13px 0", borderBottom:"1px solid #f3f4f6", gap:12 }}>
        <div>
          <p style={{ fontWeight:700, fontSize:14 }}>{t.bundle||"Bundle"}</p>
          <p style={{ fontSize:12, color:"#9ca3af", marginTop:2 }}>{t.mpesaTxn} · {t.date}</p>
          {expanded && <p style={{ fontSize:12, color:"#9ca3af" }}>→ {t.receivingNumber}</p>}
        </div>
        <div style={{ textAlign:"right", flexShrink:0 }}>
          <p style={{ fontWeight:800, fontSize:15 }}>{t.amount}</p>
          <span className={`wt-badge ${s.cls}`} style={{ marginTop:4, display:"inline-block" }}>{s.icon} {t.status}</span>
        </div>
      </div>
    );
  });
}
