// src/components/Navbar.jsx
// Bundles → external link to bundles.webertech.co.ke
// All other nav items = internal React Router links

import { useState, useEffect } from "react";
import { Link, useLocation }   from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc }         from "firebase/firestore";
import { auth, db }            from "../config/firebase";

const BUNDLES_URL = "https://bundles.webertech.co.ke";

const INTERNAL_LINKS = [
  { label:"Home",        to:"/"            },
  { label:"Academy",     to:"/academy"     },
  { label:"Electronics", to:"/electronics" },
  { label:"Cyber",       to:"/cyber"       },
  { label:"Dev",         to:"/dev"         },
  { label:"Hustle",      to:"/hustle"      },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user,     setUser]     = useState(null);
  const [isAdmin,  setIsAdmin]  = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fu) => {
      if (fu) {
        const snap = await getDoc(doc(db, "users", fu.uid));
        const data = snap.exists() ? snap.data() : {};
        setUser({ uid:fu.uid, email:fu.email, ...data });
        setIsAdmin(data.isAdmin === true);
      } else { setUser(null); setIsAdmin(false); }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const logout = async () => { await signOut(auth); setMenuOpen(false); };
  const active = (to) => location.pathname === to;

  const navBase = {
    padding:"6px 12px", borderRadius:8, textDecoration:"none",
    fontSize:13.5, fontWeight:500, transition:"all .15s", whiteSpace:"nowrap",
  };
  const activeStyle  = { ...navBase, background:"#dcfce7", color:"#15803d", fontWeight:700 };
  const defaultStyle = { ...navBase, color:"#4b5563" };
  const hoverStyle   = { ...navBase, background:"#f0fdf4", color:"#16a34a" };

  return (
    <>
      <style>{`
        .wt-nav {
          position:fixed; top:0; left:0; right:0; z-index:500;
          height:64px;
          background:${scrolled ? "rgba(255,255,255,0.97)" : "#fff"};
          backdrop-filter:blur(10px);
          border-bottom:1px solid ${scrolled ? "#e5e7eb" : "transparent"};
          box-shadow:${scrolled ? "0 2px 16px rgba(0,0,0,0.07)" : "none"};
          transition:all .2s;
        }
        .wt-nav-inner {
          max-width:1280px; margin:0 auto; padding:0 20px;
          height:100%; display:flex; align-items:center; justify-content:space-between;
        }
        .wt-links { display:flex; align-items:center; gap:2px; }
        .wt-link { color:#4b5563; }
        .wt-link:hover { background:#f0fdf4; color:#16a34a; }
        .wt-bundles-pill {
          display:inline-flex; align-items:center; gap:6px;
          padding:7px 16px; background:linear-gradient(135deg,#15803d,#16a34a);
          border-radius:99px; color:#fff !important; font-weight:700;
          font-size:13.5px; text-decoration:none; transition:transform .15s, box-shadow .15s;
          box-shadow:0 4px 14px rgba(22,163,74,0.35);
        }
        .wt-bundles-pill:hover { transform:translateY(-1px); box-shadow:0 6px 20px rgba(22,163,74,0.45); }
        @media (max-width:900px) {
          .wt-links      { display:none !important; }
          .wt-right      { display:none !important; }
          .wt-hamburger  { display:flex !important; }
        }
        @media (min-width:901px) { .wt-hamburger { display:none !important; } }
        .wt-mobile-menu {
          position:fixed; top:64px; left:0; right:0; bottom:0;
          background:#fff; z-index:499; padding:16px 20px 40px;
          overflow-y:auto; border-top:1px solid #e5e7eb;
          animation:wt-mslide .2s ease both;
        }
        @keyframes wt-mslide { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <nav className="wt-nav">
        <div className="wt-nav-inner">

          {/* Logo */}
          <Link to="/" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none" }}>
            <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#15803d,#16a34a)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <span style={{ color:"#fff", fontWeight:900, fontSize:16 }}>W</span>
            </div>
            <span style={{ fontWeight:800, fontSize:18, color:"#111827", letterSpacing:"-0.4px" }}>
              Weber<span style={{ color:"#16a34a" }}>Tech</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="wt-links">
            {INTERNAL_LINKS.map(l => (
              <Link key={l.to} to={l.to}
                style={active(l.to) ? activeStyle : defaultStyle}
                className="wt-link">
                {l.label}
              </Link>
            ))}
            {/* Bundles — external */}
            <a href={BUNDLES_URL} target="_blank" rel="noreferrer" className="wt-bundles-pill">
              ⚡ Bundles
            </a>
          </div>

          {/* Desktop right */}
          <div className="wt-right" style={{ display:"flex", alignItems:"center", gap:8 }}>
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/admin"
                    style={{ padding:"7px 13px", background:"#fef3c7", borderRadius:8, fontSize:13, fontWeight:700, color:"#92400e", textDecoration:"none" }}>
                    ⚙ Admin
                  </Link>
                )}
                <Link to="/dashboard"
                  style={{ padding:"7px 13px", background:"#f0fdf4", borderRadius:8, fontSize:13, fontWeight:700, color:"#15803d", textDecoration:"none" }}>
                  📊 Dashboard
                </Link>
                <button onClick={logout}
                  style={{ padding:"7px 14px", border:"2px solid #e5e7eb", borderRadius:8, background:"#fff", fontSize:13, fontWeight:600, color:"#6b7280", cursor:"pointer" }}>
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/dashboard"
                style={{ padding:"8px 18px", background:"linear-gradient(135deg,#15803d,#16a34a)", borderRadius:9, fontSize:13.5, fontWeight:700, color:"#fff", textDecoration:"none" }}>
                Login
              </Link>
            )}
          </div>

          {/* Hamburger */}
          <button className="wt-hamburger"
            onClick={() => setMenuOpen(p => !p)}
            style={{ background:"none", border:"none", fontSize:22, cursor:"pointer", display:"none", alignItems:"center", color:"#111827" }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="wt-mobile-menu">
          {INTERNAL_LINKS.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)}
              style={{ display:"block", padding:"13px 14px", borderRadius:10, textDecoration:"none", fontSize:15, marginBottom:4,
                       fontWeight: active(l.to) ? 700 : 500,
                       color:      active(l.to) ? "#15803d" : "#374151",
                       background: active(l.to) ? "#f0fdf4" : "transparent" }}>
              {l.label}
            </Link>
          ))}

          {/* Bundles external */}
          <a href={BUNDLES_URL} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}
            style={{ display:"flex", alignItems:"center", gap:8, padding:"13px 14px", background:"linear-gradient(135deg,#15803d,#16a34a)", borderRadius:10, textDecoration:"none", fontSize:15, fontWeight:700, color:"#fff", marginBottom:4 }}>
            ⚡ Buy Bundles → bundles.webertech.co.ke
          </a>

          <div style={{ borderTop:"1px solid #e5e7eb", marginTop:12, paddingTop:16 }}>
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/admin" onClick={() => setMenuOpen(false)}
                    style={{ display:"flex", alignItems:"center", gap:8, padding:"12px 14px", background:"#fef3c7", borderRadius:10, textDecoration:"none", fontSize:15, fontWeight:700, color:"#92400e", marginBottom:8 }}>
                    ⚙ Admin Panel
                  </Link>
                )}
                <Link to="/dashboard" onClick={() => setMenuOpen(false)}
                  style={{ display:"flex", alignItems:"center", gap:8, padding:"12px 14px", background:"#f0fdf4", borderRadius:10, textDecoration:"none", fontSize:15, fontWeight:700, color:"#15803d", marginBottom:8 }}>
                  📊 My Dashboard
                </Link>
                <button onClick={logout}
                  style={{ width:"100%", padding:"12px 14px", border:"2px solid #e5e7eb", borderRadius:10, background:"#fff", fontSize:15, fontWeight:600, color:"#6b7280", cursor:"pointer" }}>
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/dashboard" onClick={() => setMenuOpen(false)}
                style={{ display:"block", padding:"13px 14px", background:"linear-gradient(135deg,#15803d,#16a34a)", borderRadius:10, textDecoration:"none", fontSize:15, fontWeight:700, color:"#fff", textAlign:"center" }}>
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
