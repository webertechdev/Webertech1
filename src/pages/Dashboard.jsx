// ─────────────────────────────────────────────────────────────────
//  WeberTech — src/pages/Dashboard.jsx
//  User dashboard: transactions + profile + re-order
//  Protected route — only logged-in users
// ─────────────────────────────────────────────────────────────────
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { doc, getDoc, updateDoc, collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { toast, Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FaUser, FaHistory, FaRedo, FaSignOutAlt, FaEdit,
  FaCheckCircle, FaClock, FaTimesCircle, FaWhatsapp,
  FaMobileAlt, FaBolt, FaSms, FaPhone, FaTachometerAlt,
  FaShieldAlt, FaKey, FaSpinner
} from "react-icons/fa";

const WHATSAPP = "https://wa.me/254722508904";
const STATUS_STYLE = {
  Completed:  { badge:"badge-green",  icon:<FaCheckCircle style={{ color:"#16a34a" }} /> },
  Processing: { badge:"badge-yellow", icon:<FaClock style={{ color:"#d97706" }} />       },
  Failed:     { badge:"badge-red",    icon:<FaTimesCircle style={{ color:"#dc2626" }} />  },
};

export default function Dashboard({ user }) {
  const [activeTab, setActiveTab]   = useState("overview");
  const [transactions, setTxns]     = useState([]);
  const [txnFilter, setTxnFilter]   = useState("All");
  const [txnLoading, setTxnLoading] = useState(true);
  const [profile, setProfile]       = useState({});
  const [editMode, setEditMode]     = useState(false);
  const [editForm, setEditForm]     = useState({});
  const [pwForm, setPwForm]         = useState({ current:"", next:"", confirm:"" });
  const [saving, setSaving]         = useState(false);
  const navigate = useNavigate();

  // ── Fetch profile ──
  useEffect(() => {
    if (!user?.uid) return;
    getDoc(doc(db, "users", user.uid)).then(snap => {
      if (snap.exists()) { setProfile(snap.data()); setEditForm(snap.data()); }
    });
  }, [user]);

  // ── Fetch transactions ──
  useEffect(() => {
    if (!user?.uid) return;
    setTxnLoading(true);
    getDocs(query(
      collection(db, "transactions"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    )).then(snap => {
      setTxns(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setTxnLoading(false);
    }).catch(() => setTxnLoading(false));
  }, [user]);

  const filteredTxns = txnFilter === "All" ? transactions : transactions.filter(t => t.status === txnFilter);

  const totalSpent = transactions
    .filter(t => t.status === "Completed")
    .reduce((sum, t) => sum + (parseInt(t.amount?.replace(/\D/g,"")) || 0), 0);

  // ── Save profile ──
  const saveProfile = async () => {
    setSaving(true);
    try {
      await updateDoc(doc(db, "users", user.uid), {
        firstName: editForm.firstName,
        lastName:  editForm.lastName,
        phone:     editForm.phone,
      });
      setProfile(p => ({ ...p, ...editForm }));
      setEditMode(false);
      toast.success("Profile updated! ✅");
    } catch { toast.error("Failed to update profile"); }
    setSaving(false);
  };

  // ── Change password ──
  const changePassword = async () => {
    if (pwForm.next !== pwForm.confirm) { toast.error("Passwords don't match"); return; }
    if (pwForm.next.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    setSaving(true);
    try {
      const cred = EmailAuthProvider.credential(user.email, pwForm.current);
      await reauthenticateWithCredential(auth.currentUser, cred);
      await updatePassword(auth.currentUser, pwForm.next);
      setPwForm({ current:"", next:"", confirm:"" });
      toast.success("Password changed successfully! 🔒");
    } catch (e) {
      toast.error(e.code === "auth/wrong-password" ? "Current password is incorrect" : "Failed to change password");
    }
    setSaving(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning";
    if (h < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const bundleIcon = (type) => ({ Data:<FaMobileAlt />, Minutes:<FaPhone />, SMS:<FaSms /> }[type] || <FaBolt />);

  return (
    <>
      <style>{`
        .dash-layout { display:grid; grid-template-columns:240px 1fr; gap:24px; max-width:1200px; margin:0 auto; padding:24px 20px; }
        .dash-sidebar { background:#fff; border-radius:16px; border:1.5px solid #e5e7eb; padding:20px; height:fit-content; position:sticky; top:80px; }
        .dash-tab { display:flex; align-items:center; gap:10px; width:100%; padding:11px 14px; border:none; border-radius:10px; cursor:pointer; font-size:14px; font-weight:600; background:none; color:#6b7280; transition:all .15s; text-align:left; margin-bottom:4px; }
        .dash-tab:hover  { background:#f9fafb; color:#111827; }
        .dash-tab.active { background:#dcfce7; color:#15803d; }
        .dash-card { background:#fff; border:1.5px solid #e5e7eb; border-radius:16px; padding:22px; }
        .stat-card { background:#fff; border:1.5px solid #e5e7eb; border-radius:14px; padding:20px; }
        .badge { display:inline-block; padding:3px 10px; border-radius:99px; font-size:11.5px; font-weight:700; }
        .badge-green  { background:#dcfce7; color:#15803d; }
        .badge-yellow { background:#fef3c7; color:#d97706; }
        .badge-red    { background:#fee2e2; color:#dc2626; }
        .input-f { width:100%; padding:11px 14px; border:1.5px solid #e5e7eb; border-radius:10px; font-size:14px; outline:none; transition:border-color .15s; font-family:inherit; }
        .input-f:focus { border-color:#16a34a; box-shadow:0 0 0 3px rgba(22,163,74,.1); }
        .btn-p { background:#16a34a; color:#fff; border:none; border-radius:10px; font-weight:700; cursor:pointer; transition:all .15s; display:inline-flex; align-items:center; gap:7px; }
        .btn-p:hover:not(:disabled) { background:#15803d; transform:translateY(-1px); }
        .btn-p:disabled { background:#9ca3af; cursor:not-allowed; }
        .btn-o { background:transparent; border:2px solid #16a34a; color:#16a34a; border-radius:10px; font-weight:700; cursor:pointer; transition:all .15s; display:inline-flex; align-items:center; gap:7px; }
        .btn-o:hover { background:#16a34a; color:#fff; }
        @media (max-width:768px) {
          .dash-layout { grid-template-columns:1fr; }
          .dash-sidebar { position:static; }
        }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px);} to{opacity:1;transform:translateY(0);} }
        .fade-up { animation:fadeUp .35s ease both; }
      `}</style>

      <Toaster position="top-center" />
      <Navbar />

      <div style={{ paddingTop:64, background:"#f9fafb", minHeight:"100vh" }}>
        {/* Header bar */}
        <div style={{ background:"linear-gradient(135deg,#0f172a,#15803d)", padding:"32px 20px 28px" }}>
          <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:14 }}>
            <div>
              <div style={{ color:"rgba(255,255,255,0.7)", fontSize:13, marginBottom:4 }}><FaTachometerAlt style={{ marginRight:6 }} />My Dashboard</div>
              <h1 style={{ color:"#fff", fontWeight:800, fontSize:"clamp(20px,4vw,28px)", letterSpacing:"-0.5px" }}>
                {getGreeting()}, {profile.firstName || user?.firstName || "there"} 👋
              </h1>
              <p style={{ color:"rgba(255,255,255,0.65)", fontSize:13.5, marginTop:4 }}>{user?.email}</p>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <Link to="/bundles" style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"10px 18px", background:"#16a34a", borderRadius:10, color:"#fff", fontWeight:700, fontSize:13.5, textDecoration:"none" }}>
                <FaBolt /> Buy Bundle
              </Link>
              <button onClick={handleLogout} style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"10px 18px", background:"rgba(255,255,255,0.12)", border:"none", borderRadius:10, color:"#fff", fontWeight:700, fontSize:13.5, cursor:"pointer" }}>
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>
        </div>

        <div className="dash-layout">
          {/* Sidebar */}
          <aside className="dash-sidebar">
            {/* Avatar */}
            <div style={{ textAlign:"center", marginBottom:20, paddingBottom:16, borderBottom:"1px solid #f3f4f6" }}>
              <div style={{ width:64, height:64, borderRadius:"50%", background:"linear-gradient(135deg,#15803d,#4ade80)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, color:"#fff", fontSize:24, margin:"0 auto 10px" }}>
                {(profile.firstName || "U")[0].toUpperCase()}
              </div>
              <p style={{ fontWeight:700, fontSize:15 }}>{profile.firstName} {profile.lastName}</p>
              <p style={{ fontSize:12, color:"#9ca3af", marginTop:2 }}>{profile.phone || "No phone set"}</p>
            </div>

            {[
              { id:"overview",      icon:<FaTachometerAlt />, label:"Overview"         },
              { id:"transactions",  icon:<FaHistory />,       label:"My Transactions"  },
              { id:"profile",       icon:<FaUser />,          label:"Profile Settings" },
              { id:"security",      icon:<FaKey />,           label:"Security"         },
            ].map(t => (
              <button key={t.id} className={`dash-tab ${activeTab===t.id?"active":""}`} onClick={() => setActiveTab(t.id)}>
                {t.icon} {t.label}
              </button>
            ))}

            <div style={{ borderTop:"1px solid #f3f4f6", marginTop:12, paddingTop:12 }}>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="dash-tab" style={{ display:"flex", color:"#25d366", textDecoration:"none" }}>
                <FaWhatsapp /> WhatsApp Support
              </a>
              <button className="dash-tab" onClick={handleLogout} style={{ color:"#dc2626" }}>
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </aside>

          {/* Main */}
          <main>

            {/* ── OVERVIEW ── */}
            {activeTab === "overview" && (
              <div className="fade-up">
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))", gap:16, marginBottom:24 }}>
                  {[
                    { label:"Total Orders",    value:transactions.length,                                                 color:"#16a34a", bg:"#dcfce7", icon:<FaHistory /> },
                    { label:"Completed",       value:transactions.filter(t=>t.status==="Completed").length,               color:"#2563eb", bg:"#dbeafe", icon:<FaCheckCircle /> },
                    { label:"Total Spent",     value:`KES ${totalSpent.toLocaleString()}`,                                color:"#7c3aed", bg:"#ede9fe", icon:<FaBolt /> },
                    { label:"Processing",      value:transactions.filter(t=>t.status==="Processing").length,              color:"#d97706", bg:"#fef3c7", icon:<FaClock /> },
                  ].map(s => (
                    <div key={s.label} className="stat-card">
                      <div style={{ width:38, height:38, borderRadius:10, background:s.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, color:s.color, marginBottom:10 }}>{s.icon}</div>
                      <div style={{ fontSize:22, fontWeight:800, color:s.color }}>{s.value}</div>
                      <div style={{ fontSize:12.5, color:"#6b7280", marginTop:3 }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Recent transactions */}
                <div className="dash-card">
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18 }}>
                    <h3 style={{ fontWeight:700, fontSize:16 }}>Recent Transactions</h3>
                    <button className="dash-tab" style={{ padding:"6px 12px", fontSize:13 }} onClick={() => setActiveTab("transactions")}>View All</button>
                  </div>
                  {txnLoading ? (
                    <div style={{ textAlign:"center", padding:"32px 0", color:"#9ca3af" }}><FaSpinner style={{ animation:"spin .7s linear infinite", fontSize:22 }} /></div>
                  ) : transactions.length === 0 ? (
                    <div style={{ textAlign:"center", padding:"32px 0" }}>
                      <p style={{ color:"#9ca3af", fontSize:14 }}>No transactions yet.</p>
                      <Link to="/bundles" style={{ display:"inline-flex", alignItems:"center", gap:6, marginTop:12, padding:"10px 20px", background:"#16a34a", borderRadius:10, color:"#fff", fontWeight:700, fontSize:13.5, textDecoration:"none" }}>
                        <FaBolt /> Buy Your First Bundle
                      </Link>
                    </div>
                  ) : (
                    transactions.slice(0,5).map(t => <TxnRow key={t.id} t={t} bundleIcon={bundleIcon} />)
                  )}
                </div>
              </div>
            )}

            {/* ── TRANSACTIONS ── */}
            {activeTab === "transactions" && (
              <div className="fade-up">
                <div className="dash-card">
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12, marginBottom:20 }}>
                    <h3 style={{ fontWeight:700, fontSize:16 }}>Transaction History</h3>
                    <div style={{ display:"flex", gap:8 }}>
                      {["All","Completed","Processing","Failed"].map(f => (
                        <button key={f} onClick={() => setTxnFilter(f)}
                          style={{ padding:"6px 14px", borderRadius:8, border:`2px solid ${txnFilter===f?"#16a34a":"#e5e7eb"}`, background:txnFilter===f?"#dcfce7":"#fff", color:txnFilter===f?"#15803d":"#6b7280", fontWeight:700, fontSize:12.5, cursor:"pointer" }}>
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                  {txnLoading ? (
                    <div style={{ textAlign:"center", padding:"40px 0", color:"#9ca3af" }}><FaSpinner style={{ animation:"spin .7s linear infinite", fontSize:24 }} /></div>
                  ) : filteredTxns.length === 0 ? (
                    <p style={{ textAlign:"center", color:"#9ca3af", padding:"32px 0", fontSize:14 }}>No {txnFilter !== "All" ? txnFilter : ""} transactions found.</p>
                  ) : (
                    filteredTxns.map(t => <TxnRow key={t.id} t={t} bundleIcon={bundleIcon} expanded />)
                  )}
                </div>
              </div>
            )}

            {/* ── PROFILE ── */}
            {activeTab === "profile" && (
              <div className="fade-up">
                <div className="dash-card">
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
                    <h3 style={{ fontWeight:700, fontSize:16 }}><FaUser style={{ marginRight:8, color:"#16a34a" }} />Profile Settings</h3>
                    {!editMode && (
                      <button className="btn-o" style={{ padding:"8px 16px", fontSize:13 }} onClick={() => setEditMode(true)}>
                        <FaEdit /> Edit
                      </button>
                    )}
                  </div>

                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                    {[
                      { label:"First Name", key:"firstName" },
                      { label:"Last Name",  key:"lastName"  },
                    ].map(f => (
                      <div key={f.key}>
                        <label style={{ fontSize:12, fontWeight:700, color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.4px", display:"block", marginBottom:6 }}>{f.label}</label>
                        {editMode ? (
                          <input className="input-f" value={editForm[f.key]||""} onChange={e => setEditForm(p=>({...p,[f.key]:e.target.value}))} />
                        ) : (
                          <p style={{ fontSize:15, fontWeight:600, padding:"10px 0" }}>{profile[f.key] || "—"}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop:16 }}>
                    <label style={{ fontSize:12, fontWeight:700, color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.4px", display:"block", marginBottom:6 }}>Safaricom Number</label>
                    {editMode ? (
                      <input className="input-f" value={editForm.phone||""} onChange={e=>setEditForm(p=>({...p,phone:e.target.value}))} placeholder="07XX XXX XXX" />
                    ) : (
                      <p style={{ fontSize:15, fontWeight:600, padding:"10px 0" }}>{profile.phone || "Not set"}</p>
                    )}
                  </div>

                  <div style={{ marginTop:16 }}>
                    <label style={{ fontSize:12, fontWeight:700, color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.4px", display:"block", marginBottom:6 }}>Email Address</label>
                    <p style={{ fontSize:15, fontWeight:600, padding:"10px 0", color:"#9ca3af" }}>{user?.email} <span style={{ fontSize:12, background:"#dcfce7", color:"#15803d", padding:"2px 8px", borderRadius:99, fontWeight:700, marginLeft:8 }}>Verified</span></p>
                  </div>

                  {editMode && (
                    <div style={{ display:"flex", gap:10, marginTop:24 }}>
                      <button className="btn-p" style={{ padding:"11px 22px", fontSize:14 }} onClick={saveProfile} disabled={saving}>
                        {saving ? <FaSpinner style={{ animation:"spin .7s linear infinite" }} /> : "Save Changes"}
                      </button>
                      <button className="btn-o" style={{ padding:"11px 22px", fontSize:14 }} onClick={() => { setEditMode(false); setEditForm(profile); }}>
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── SECURITY ── */}
            {activeTab === "security" && (
              <div className="fade-up">
                <div className="dash-card">
                  <h3 style={{ fontWeight:700, fontSize:16, marginBottom:24 }}><FaShieldAlt style={{ marginRight:8, color:"#16a34a" }} />Change Password</h3>
                  <div style={{ maxWidth:420, display:"flex", flexDirection:"column", gap:14 }}>
                    {[
                      { label:"Current Password", key:"current", ph:"Enter current password" },
                      { label:"New Password",      key:"next",    ph:"Min 6 characters"       },
                      { label:"Confirm Password",  key:"confirm", ph:"Repeat new password"    },
                    ].map(f => (
                      <div key={f.key}>
                        <label style={{ fontSize:12, fontWeight:700, color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.4px", display:"block", marginBottom:6 }}>{f.label}</label>
                        <input className="input-f" type="password" placeholder={f.ph} value={pwForm[f.key]} onChange={e=>setPwForm(p=>({...p,[f.key]:e.target.value}))} />
                      </div>
                    ))}
                    <button className="btn-p" style={{ padding:"12px 22px", fontSize:14, marginTop:4 }} onClick={changePassword} disabled={saving}>
                      {saving ? <FaSpinner style={{ animation:"spin .7s linear infinite" }} /> : <><FaKey /> Change Password</>}
                    </button>
                  </div>
                  <div style={{ marginTop:32, padding:"18px 20px", background:"#f9fafb", borderRadius:12, border:"1.5px solid #e5e7eb" }}>
                    <p style={{ fontWeight:700, fontSize:14, marginBottom:6 }}>⚠️ Account Security Tips</p>
                    <ul style={{ color:"#6b7280", fontSize:13.5, lineHeight:1.8, paddingLeft:20 }}>
                      <li>Use a strong password with letters, numbers & symbols</li>
                      <li>Never share your password with anyone</li>
                      <li>Contact support@webertech.co.ke if you suspect unauthorized access</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <Footer />
    </>
  );
}

// ── Transaction row sub-component ───────────────────────────────
function TxnRow({ t, bundleIcon, expanded }) {
  const s = STATUS_STYLE[t.status] || STATUS_STYLE.Processing;
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 0", borderBottom:"1px solid #f3f4f6", gap:12, flexWrap: expanded?"wrap":"nowrap" }}>
      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
        <div style={{ width:40, height:40, borderRadius:11, background:"#f0fdf4", display:"flex", alignItems:"center", justifyContent:"center", color:"#16a34a", fontSize:17, flexShrink:0 }}>
          {bundleIcon(t.bundleType)}
        </div>
        <div>
          <p style={{ fontWeight:700, fontSize:14 }}>{t.bundle || "Bundle"}</p>
          <p style={{ fontSize:12, color:"#9ca3af", marginTop:2 }}>{t.mpesaTxn} · {t.date}</p>
          {expanded && <p style={{ fontSize:12, color:"#9ca3af" }}>→ {t.receivingNumber}</p>}
        </div>
      </div>
      <div style={{ textAlign:"right", flexShrink:0 }}>
        <p style={{ fontWeight:800, fontSize:15 }}>{t.amount}</p>
        <span className={`badge ${s.badge}`} style={{ marginTop:4, display:"inline-flex", alignItems:"center", gap:4 }}>
          {s.icon} {t.status}
        </span>
      </div>
    </div>
  );
}
