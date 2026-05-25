// ─────────────────────────────────────────────────────────────────
//  WeberTech — App.jsx
//  Central router. ChatWidget floats on ALL pages.
//  Admin access: isAdmin flag in Firestore users/{uid}
// ─────────────────────────────────────────────────────────────────

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./config/firebase";

// Pages
import Home        from "./pages/Home";
import Bundles     from "./pages/Bundles";
import Academy     from "./pages/Academy";
import Electronics from "./pages/Electronics";
import Cyber       from "./pages/Cyber";
import Dev         from "./pages/Dev";
import Hustle      from "./pages/Hustle";
import Dashboard   from "./pages/Dashboard";
import Admin       from "./pages/Admin";
import NotFound    from "./pages/NotFound";

// Global floating chat
import ChatWidget  from "./pages/ChatWidget";

// ── Protected route wrapper ──────────────────────────────────────
function ProtectedRoute({ children, user, loading }) {
  if (loading) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", background:"#f9fafb" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ width:40, height:40, border:"3px solid #e5e7eb", borderTopColor:"#16a34a", borderRadius:"50%", animation:"spin .7s linear infinite", margin:"0 auto 12px" }} />
        <p style={{ color:"#6b7280", fontSize:14 }}>Loading…</p>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  );
  if (!user) return <Navigate to="/" replace />;
  return children;
}

// ── Admin route wrapper ──────────────────────────────────────────
function AdminRoute({ children, user, isAdmin, loading }) {
  if (loading) return null;
  if (!user || !isAdmin) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  const [user, setUser]       = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const snap = await getDoc(doc(db, "users", firebaseUser.uid));
          const data = snap.exists() ? snap.data() : {};
          setUser({ uid: firebaseUser.uid, email: firebaseUser.email, ...data });
          setIsAdmin(data.isAdmin === true);
        } catch {
          setUser({ uid: firebaseUser.uid, email: firebaseUser.email });
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
        <Route path="/bundles"     element={<Bundles />} />
        <Route path="/academy"     element={<Academy />} />
        <Route path="/electronics" element={<Electronics />} />
        <Route path="/cyber"       element={<Cyber />} />
        <Route path="/dev"         element={<Dev />} />
        <Route path="/hustle"      element={<Hustle />} />

        <Route path="/dashboard" element={
          <ProtectedRoute user={user} loading={loading}>
            <Dashboard user={user} />
          </ProtectedRoute>
        } />

        <Route path="/admin" element={
          <AdminRoute user={user} isAdmin={isAdmin} loading={loading}>
            <Admin user={user} />
          </AdminRoute>
        } />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Floating AI chat on every page */}
      <ChatWidget />
    </BrowserRouter>
  );
}
