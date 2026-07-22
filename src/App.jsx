// src/App.jsx
// webertech.co.ke — main site
// Bundles = external link to bundles.webertech.co.ke (no /bundles route here)
// ChatWidget floats on every page

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged }  from "firebase/auth";
import { doc, getDoc }         from "firebase/firestore";
import { auth, db }            from "./config/firebase";

// Pages — all in src/pages/
import Home        from "./pages/Home";
import Academy     from "./pages/Academy";
import Electronics from "./pages/Electronics";
import Cyber       from "./pages/Cyber";
import CyberHome           from "./pages/cyber/CyberHome";
import LegalDocuments      from "./pages/cyber/LegalDocuments";
import LegalDocumentDetail from "./pages/cyber/LegalDocumentDetail";
import Government from "./pages/cyber/Government";
import Business from "./pages/cyber/Business";
import Printing from "./pages/cyber/Printing";
import Writing from "./pages/cyber/Writing";
import Dev         from "./pages/Dev";
import Hustle      from "./pages/Hustle";
import Dashboard   from "./pages/Dashboard";
import DashboardEnhanced from "./pages/DashboardEnhanced";
import Admin       from "./pages/Admin";
import AdminEnhanced from "./pages/AdminEnhanced";
import NotFound    from "./pages/NotFound";
import ChatWidget  from "./pages/ChatWidget";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

// ── Route guards ────────────────────────────────────────────────
function Protected({ user, loading, children }) {
  if (loading) return <Loader />;
  if (!user)   return <Navigate to="/" replace />;
  return children;
}

function AdminOnly({ user, isAdmin, loading, children }) {
  if (loading)          return <Loader />;
  if (!user || !isAdmin) return <Navigate to="/" replace />;
  return children;
}

function Loader() {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", background:"#f9fafb" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ width:34, height:34, border:"3px solid #e5e7eb", borderTopColor:"#16a34a", borderRadius:"50%", margin:"0 auto 12px", animation:"spin .7s linear infinite" }} />
        <p style={{ color:"#9ca3af", fontSize:14 }}>Loading…</p>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
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
          setUser({ uid:fu.uid, email:fu.email, ...data });
          setIsAdmin(data.isAdmin === true);
        } catch {
          setUser({ uid:fu.uid, email:fu.email });
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
        <Route path="/cyber"                              element={<CyberHome />} />
        <Route path="/cyber/legal-documents"               element={<LegalDocuments />} />
        <Route path="/cyber/legal-documents/:slug"         element={<LegalDocumentDetail />} />
        <Route path="/cyber/government"                    element={<Government />} />
        <Route path="/cyber/business"                      element={<Business />} />
        <Route path="/cyber/printing"                      element={<Printing />} />
        <Route path="/cyber/writing"                       element={<Writing />} />
        <Route path="/dev"         element={<Dev />} />
        <Route path="/hustle"      element={<Hustle />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        <Route path="/dashboard" element={
          <Protected user={user} loading={loading}>
            <DashboardEnhanced user={user} />
          </Protected>
        } />

        <Route path="/admin" element={
          <AdminOnly user={user} isAdmin={isAdmin} loading={loading}>
            <AdminEnhanced />
          </AdminOnly>
        } />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Floating AI chat — on every page */}
      <ChatWidget />
    </BrowserRouter>
  );
}
