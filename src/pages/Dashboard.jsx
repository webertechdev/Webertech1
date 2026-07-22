// src/pages/Dashboard.jsx
// webertech.co.ke landing page dashboard
// Shows: profile settings + links to all WeberTech services
// For bundle order history → links to bundles.webertech.co.ke

import { useState, useEffect } from "react";
import { useNavigate }         from "react-router-dom";
import { signOut, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db }            from "../config/firebase";
import { toast, Toaster }      from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const BUNDLES = "https://bundles.webertech.co.ke";
const WA      = "https://wa.me/254722508904";

const SERVICES = [
  { emoji:"⚡", label:"Buy Bundles",   desc:"Data, Minutes & SMS",      href:BUNDLES,         ext:true,  color:"#16a34a", bg:"#dcfce7" },
  { emoji:"💻", label:"Dev Services",  desc:"Websites & apps",           to:"/dev",            ext:false, color:"#0891b2", bg:"#cffafe" },
  { emoji:"🖨",  label:"Cyber",         desc:"Printing & internet",       to:"/cyber",          ext:false, color:"#dc2626", bg:"#fee2e2" },
  { emoji:"🎓", label:"Academy",       desc:"Learn & earn",              to:"/academy",        ext:false, color:"#d97706", bg:"#fef3c7" },
  { emoji:"📱", label:"Electronics",   desc:"Gadgets & accessories",     to:"/electronics",    ext:false, color:"#7c3aed", bg:"#ede9fe" },
  { emoji:"🔥", label:"Hustle",        desc:"Side hustle opportunities", to:"/hustle",         ext:false, color:"#ea580c", bg:"#ffedd5" },
];

export default function Dashboard({ user }) {
  const [tab,      setTab]      = useState("overview");
  const [profile,  setProfile]  = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [pwForm,   setPwForm]   = useState({ current:"", next:"", confirm:"" });
  const [saving,   setSaving]   = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.uid) return;
    getDoc(doc(db, "users", user.uid)).then(s => {
      if (s.exists()) { setProfile(s.data()); setEditForm(s.data()); }
    });
  }, [user]);

  const greeting = () => {
    const h = new Date().getHours();
    return h < 12 ? "Good Morning" : h < 18 ? "Good Afternoon" : "Good Evening";
  };

  const saveProfile = async () => {
    setSaving(true);
    try {
      await updateDoc(doc(db, "users", user.uid), { firstName:editForm.firstName, lastName:editForm.lastName, phone:editForm.phone });
      setProfile(p => ({ ...p, ...editForm }));
      setEditMode(false);
      toast.success("Profile updated ✅");
    } catch { toast.error("Failed to update profile"); }
    setSaving(false);
  };

  const changePw = async () => {
    if (pwForm.next !== pwForm.confirm) { toast.error("Passwords don't match"); return; }
    if (pwForm.next.length < 6)         { toast.error("Password must be at least 6 characters"); return; }
    setSaving(true);
    try {
      const cred = EmailAuthProvider.credential(user.email, pwForm.current);
      await reauthenticateWithCredential(auth.currentUser, cred);
      await updatePassword(auth.currentUser, pwForm.next);
      setPwForm({ current:"", next:"", confirm:"" });
      toast.success("Password changed 🔒");
    } catch (e) {
      toast.error(e.code === "auth/wrong-password" ? "Wrong current password" : "Failed to change password");
    }
    setSaving(false);
  };

  const logout = async () => { await signOut(auth); navigate("/"); };

  const inp = { width:"100%", padding:"11px 14px", border:"1.5px solid #e5e7eb", borderRadius:10, fontSize:14, outline:"none", fontFamily:"inherit", boxSizing:"border-box" };
  const btnG = { background:"linear-gradient(135deg,#15803d,#16a34a)", color:"#fff", border:"none", borderRadius:10, fontWeight:700, cursor:"pointer", fontFamily:"inherit", display:"inline-flex", alignItems:"center", gap:7 };
  const btnO = { background:"transparent", border:"2px solid #16a34a", color:"#16a34a", borderRadius:10, fontWeight:700, cursor:"pointer", fontFamily:"inherit", display:"inline-flex", alignItems:"center", gap:7 };

  return (
    <>
      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeu{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .wt-dtab{display:flex;align-items:center;gap:10px;width:100%;padding:11px 14px;border:none;border-radius:10px;cursor:pointer;font-size:14px;font-weight:600;background:none;color:#6b7280;transition:all .15s;text-align:left;margin-bottom:4px;font-family:inherit}
        .wt-dtab:hover{background:#f9fafb;color:#111827}
        .wt-dtab.on{background:#dcfce7;color:#15803d}
        .wt-dcard{background:#fff;border:1.5px solid #e5e7eb;border-radius:16px;padding:22px;animation:fadeu .3s ease both}
        .wt-svc-link{display:block;border:1.5px solid #e5e7eb;border-radius:14px;padding:16px 18px;text-decoration:none;transition:all .2s}
        .wt-svc-link:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,0.08);border-color:#86efac}
        @media(max-width:768px){.wt-dlayout{grid-template-columns:1fr!important}}
      `}</style>
      <Toaster position="top-center" />
      <Navbar />

      <div style={{ paddingTop:64, background:"#f9fafb", minHeight:"100vh", fontFamily:"'Segoe UI',system-ui,sans-serif" }}>

        {/* Header */}
        <div style={{ background:"linear-gradient(135deg,#0f172a,#15803d)", padding:"32px 20px 28px" }}>
          <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:14 }}>
            <div>
              <div style={{ color:"rgba(255,255,255,0.6)", fontSize:13, marginBottom:4 }}>👤 My Account</div>
              <h1 style={{ color:"#fff", fontWeight:800, fontSize:"clamp(20px,4vw,28px)", letterSpacing:"-0.5px" }}>
                {greeting()}, {profile.firstName || "there"} 👋
              </h1>
              <p style={{ color:"rgba(255,255,255,0.6)", fontSize:13, marginTop:4 }}>{user?.email}</p>
            </div>
            <button onClick={logout} style={{ ...btnO, padding:"10px 18px", fontSize:13.5, border:"1.5px solid rgba(255,255,255,0.3)", color:"#fff" }}>↩ Sign Out</button>
          </div>
        </div>

        {/* Layout */}
        <div className="wt-dlayout" style={{ display:"grid", gridTemplateColumns:"220px 1fr", gap:24, maxWidth:1100, margin:"0 auto", padding:"24px 20px" }}>

          {/* Sidebar */}
          <aside style={{ background:"#fff", border:"1.5px solid #e5e7eb", borderRadius:16, padding:20, height:"fit-content", position:"sticky", top:80 }}>
            <div style={{ textAlign:"center", marginBottom:18, paddingBottom:16, borderBottom:"1px solid #f3f4f6" }}>
              <div style={{ width:56, height:56, borderRadius:"50%", background:"linear-gradient(135deg,#15803d,#4ade80)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, color:"#fff", fontSize:20, margin:"0 auto 10px" }}>
                {(profile.firstName||"U")[0].toUpperCase()}
              </div>
              <p style={{ fontWeight:700, fontSize:14 }}>{profile.firstName} {profile.lastName}</p>
              <p style={{ fontSize:12, color:"#9ca3af", marginTop:2 }}>{profile.phone || "No phone set"}</p>
            </div>
            {[
              { id:"overview",  icon:"🏠", label:"Overview"         },
              { id:"profile",   icon:"👤", label:"Profile Settings" },
              { id:"security",  icon:"🔒", label:"Security"         },
            ].map(t => (
              <button key={t.id} className={`wt-dtab ${tab===t.id?"on":""}`} onClick={() => setTab(t.id)}>
                {t.icon} {t.label}
              </button>
            ))}
            <div style={{ borderTop:"1px solid #f3f4f6", marginTop:12, paddingTop:12 }}>
              <a href={WA} target="_blank" rel="noreferrer" className="wt-dtab" style={{ display:"flex", color:"#25d366", textDecoration:"none" }}>💬 WhatsApp Support</a>
              <button className="wt-dtab" onClick={logout} style={{ color:"#dc2626" }}>↩ Sign Out</button>
            </div>
          </aside>

          {/* Main */}
          <main>

            {/* OVERVIEW */}
            {tab === "overview" && (
              <div className="wt-dcard">
                <h3 style={{ fontWeight:700, fontSize:17, marginBottom:6 }}>Welcome to WeberTech 🎉</h3>
                <p style={{ color:"#6b7280", fontSize:14, lineHeight:1.6, marginBottom:24 }}>
                  Manage your account and access all WeberTech services from one place.
                </p>

                {/* Bundle history CTA */}
                <div style={{ background:"linear-gradient(135deg,#f0fdf4,#dcfce7)", border:"1.5px solid #86efac", borderRadius:14, padding:"18px 20px", marginBottom:24, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
                  <div>
                    <p style={{ fontWeight:700, fontSize:15, marginBottom:4 }}>⚡ Bundle Order History</p>
                    <p style={{ color:"#6b7280", fontSize:13.5 }}>Track your bundle orders and transaction history on bundles.webertech.co.ke</p>
                  </div>
                  <a href={BUNDLES} target="_blank" rel="noreferrer"
                    style={{ ...btnG, padding:"10px 18px", fontSize:13.5, textDecoration:"none" }}>
                    Go to Bundles →
                  </a>
                </div>

                {/* Services grid */}
                <h4 style={{ fontWeight:700, fontSize:14, color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:16 }}>All Services</h4>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:12 }}>
                  {SERVICES.map(s => {
                    const inner = (
                      <>
                        <div style={{ width:40, height:40, borderRadius:11, background:s.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, marginBottom:10 }}>{s.emoji}</div>
                        <p style={{ fontWeight:700, fontSize:14, color:"#111827", marginBottom:4 }}>{s.label}</p>
                        <p style={{ color:"#9ca3af", fontSize:12.5 }}>{s.desc}</p>
                      </>
                    );
                    return s.ext
                      ? <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="wt-svc-link">{inner}</a>
                      : <a key={s.label} href={s.to} className="wt-svc-link" onClick={e=>{e.preventDefault();window.location.href=s.to}}>{inner}</a>;
                  })}
                </div>
              </div>
            )}

            {/* PROFILE */}
            {tab === "profile" && (
              <div className="wt-dcard">
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:22 }}>
                  <h3 style={{ fontWeight:700, fontSize:16 }}>👤 Profile Settings</h3>
                  {!editMode && <button style={{ ...btnO, padding:"8px 16px", fontSize:13 }} onClick={() => setEditMode(true)}>✏ Edit</button>}
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
                  {[{l:"First Name",k:"firstName"},{l:"Last Name",k:"lastName"}].map(f=>(
                    <div key={f.k}>
                      <label style={{ fontSize:12, fontWeight:700, color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.4px", display:"block", marginBottom:6 }}>{f.l}</label>
                      {editMode
                        ? <input style={inp} value={editForm[f.k]||""} onChange={e=>setEditForm(p=>({...p,[f.k]:e.target.value}))} />
                        : <p style={{ fontSize:15, fontWeight:600, padding:"10px 0" }}>{profile[f.k]||"—"}</p>}
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom:16 }}>
                  <label style={{ fontSize:12, fontWeight:700, color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.4px", display:"block", marginBottom:6 }}>Safaricom Number</label>
                  {editMode
                    ? <input style={inp} value={editForm.phone||""} onChange={e=>setEditForm(p=>({...p,phone:e.target.value}))} placeholder="07XX XXX XXX" />
                    : <p style={{ fontSize:15, fontWeight:600, padding:"10px 0" }}>{profile.phone||"Not set"}</p>}
                </div>
                <div style={{ marginBottom:editMode?22:0 }}>
                  <label style={{ fontSize:12, fontWeight:700, color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.4px", display:"block", marginBottom:6 }}>Email</label>
                  <p style={{ fontSize:15, fontWeight:600, padding:"10px 0", color:"#9ca3af" }}>
                    {user?.email} <span style={{ fontSize:12, background:"#dcfce7", color:"#15803d", padding:"2px 8px", borderRadius:99, fontWeight:700, marginLeft:8 }}>Verified</span>
                  </p>
                </div>
                {editMode && (
                  <div style={{ display:"flex", gap:10 }}>
                    <button style={{ ...btnG, padding:"11px 22px", fontSize:14 }} onClick={saveProfile} disabled={saving}>{saving?"Saving…":"Save Changes"}</button>
                    <button style={{ ...btnO, padding:"11px 22px", fontSize:14 }} onClick={() => { setEditMode(false); setEditForm(profile); }}>Cancel</button>
                  </div>
                )}
              </div>
            )}

            {/* SECURITY */}
            {tab === "security" && (
              <div className="wt-dcard">
                <h3 style={{ fontWeight:700, fontSize:16, marginBottom:22 }}>🔒 Change Password</h3>
                <div style={{ maxWidth:400, display:"flex", flexDirection:"column", gap:14 }}>
                  {[{l:"Current Password",k:"current",ph:"Enter current password"},{l:"New Password",k:"next",ph:"Min 6 characters"},{l:"Confirm New Password",k:"confirm",ph:"Repeat new password"}].map(f=>(
                    <div key={f.k}>
                      <label style={{ fontSize:12, fontWeight:700, color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.4px", display:"block", marginBottom:6 }}>{f.l}</label>
                      <input style={inp} type="password" placeholder={f.ph} value={pwForm[f.k]} onChange={e=>setPwForm(p=>({...p,[f.k]:e.target.value}))} />
                    </div>
                  ))}
                  <button style={{ ...btnG, padding:"12px 0", fontSize:14, justifyContent:"center" }} onClick={changePw} disabled={saving}>{saving?"Changing…":"🔒 Change Password"}</button>
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
