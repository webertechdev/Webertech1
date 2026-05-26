// src/App.jsx
// webertech.co.ke — main site router
// Bundles lives at bundles.webertech.co.ke (separate project — just a link)
// ChatWidget floats on every page

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged }  from "firebase/auth";
import { doc, getDoc }         from "firebase/firestore";
import { auth, db }            from "./config/firebase";

import Home        from "./pages/Home";
import Academy     from "./pages/Academy";
import Electronics from "./pages/Electronics";
import Cyber       from "./pages/Cyber";
import Dev         from "./pages/Dev";
import Hustle      from "./pages/Hustle";
import Dashboard   from "./pages/Dashboard";
import Admin       from "./pages/Admin";
import NotFound    from "./pages/NotFound";
import ChatWidget  from "./pages/ChatWidget";

// ── Protected: must be logged in ────────────────────────────────
function Protected({ user, loading, children }) {
  if (loading) return <FullPageLoader />;
  if (!user)   return <Navigate to="/" replace />;
  return children;
}

// ── AdminOnly: must have isAdmin:true in Firestore ───────────────
function AdminOnly({ user, isAdmin, loading, children }) {
  if (loading)         return <FullPageLoader />;
  if (!user || !isAdmin) return <Navigate to="/" replace />;
  return children;
}

function FullPageLoader() {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center",
                  minHeight:"100vh", background:"#f9fafb" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ width:36, height:36, border:"3px solid #e5e7eb",
                      borderTopColor:"#16a34a", borderRadius:"50%",
                      animation:"wt-spin .7s linear infinite", margin:"0 auto 12px" }} />
        <p style={{ color:"#9ca3af", fontSize:14 }}>Loading…</p>
        <style>{`@keyframes wt-spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  );
}

export default function App() {
  const [user,    setUser]    = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fu) => {
      if (fu) {
        try {
          const snap = await getDoc(doc(db, "users", fu.uid));
          const data = snap.exists() ? snap.data() : {};
          setUser({ uid: fu.uid, email: fu.email, ...data });
          setIsAdmin(data.isAdmin === true);
        } catch {
          setUser({ uid: fu.uid, email: fu.email });
          setIsAdmin(false);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"            element={<Home />} />
        <Route path="/academy"     element={<Academy />} />
        <Route path="/electronics" element={<Electronics />} />
        <Route path="/cyber"       element={<Cyber />} />
        <Route path="/dev"         element={<Dev />} />
        <Route path="/hustle"      element={<Hustle />} />

        <Route path="/dashboard" element={
          <Protected user={user} loading={loading}>
            <Dashboard user={user} />
          </Protected>
        } />

        <Route path="/admin" element={
          <AdminOnly user={user} isAdmin={isAdmin} loading={loading}>
            <Admin />
          </AdminOnly>
        } />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Floating AI chat — visible on every page */}
      <ChatWidget />
    </BrowserRouter>
  );
}
