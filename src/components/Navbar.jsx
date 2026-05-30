// src/components/Navbar.jsx
// Logo top-left + all service links across top
// Mobile: hamburger slides down full menu
// Bundles → external link to bundles.webertech.co.ke

import { useState, useEffect }         from "react";
import { Link, useLocation }           from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc }                 from "firebase/firestore";
import { auth, db }                    from "../config/firebase";

const BUNDLES_URL = "https://bundles.webertech.co.ke";
const WA_URL      = "https://wa.me/254722508904";

// Exact nav order the client requested
const NAV = [
  { label:"Home",        to:"/",            ext:false },
  { label:"Cyber",       to:"/cyber",       ext:false },
  { label:"Hustle KE",   to:"/hustle",      ext:false },
  { label:"Academy",     to:"/academy",     ext:false },
  { label:"Electronics", to:"/electronics", ext:false },
  { label:"Bundles",     to:BUNDLES_URL,    ext:true  },
  { label:"Dev",         to:"/dev",         ext:false },
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
        try {
          const snap = await getDoc(doc(db, "users", fu.uid));
          const data = snap.exists() ? snap.data() : {};
          setUser({ uid:fu.uid, email:fu.email, ...data });
          setIsAdmin(data.isAdmin === true);
        } catch { setUser({ uid:fu.uid, email:fu.email }); }
      } else { setUser(null); setIsAdmin(false); }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const logout  = async () => { await signOut(auth); setMenuOpen(false); };
  const isActive = (to) => !to.startsWith("http") && location.pathname === to;

  return (
    <>
      <style>{`
        :root { --nav-h: 62px; }

        .wtn {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 900; height: var(--nav-h);
          background: ${scrolled ? "rgba(15,23,42,0.97)" : "rgba(15,23,42,0.92)"};
          backdrop-filter: blur(16px);
          border-bottom: 1px solid ${scrolled ? "rgba(255,255,255,0.1)" : "transparent"};
          box-shadow: ${scrolled ? "0 4px 24px rgba(0,0,0,0.3)" : "none"};
          transition: all .22s ease;
          font-family: 'Segoe UI', system-ui, sans-serif;
        }

        .wtn-inner {
          max-width: 1400px; margin: 0 auto;
          padding: 0 20px; height: 100%;
          display: flex; align-items: center; justify-content: space-between;
          gap: 8px;
        }

        /* Logo */
        .wtn-logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; flex-shrink: 0;
        }
        .wtn-logo-img {
          height: 36px; width: auto;
          filter: brightness(0) invert(1);
          transition: opacity .2s;
        }
        .wtn-logo-img:hover { opacity: .85; }
        .wtn-logo-fallback {
          display: flex; align-items: center; gap: 8px;
        }
        .wtn-logo-icon {
          width: 34px; height: 34px; border-radius: 9px;
          background: linear-gradient(135deg,#15803d,#16a34a);
          display: flex; align-items: center; justify-content: center;
          font-weight: 900; color: #fff; font-size: 16px; flex-shrink: 0;
        }
        .wtn-logo-text {
          font-weight: 800; font-size: 17px; color: #fff; letter-spacing: -.3px;
        }
        .wtn-logo-text span { color: #4ade80; }

        /* Desktop nav links */
        .wtn-links {
          display: flex; align-items: center; gap: 2px;
          flex: 1; justify-content: center;
        }
        .wtn-link {
          padding: 6px 12px; border-radius: 8px;
          text-decoration: none; font-size: 13.5px; font-weight: 500;
          color: rgba(255,255,255,0.75);
          transition: all .15s; white-space: nowrap;
          border: 1.5px solid transparent;
        }
        .wtn-link:hover { color: #fff; background: rgba(255,255,255,0.08); }
        .wtn-link.active {
          color: #4ade80; font-weight: 700;
          background: rgba(74,222,128,0.1);
          border-color: rgba(74,222,128,0.25);
        }
        .wtn-link.bundles {
          background: linear-gradient(135deg,#15803d,#16a34a);
          color: #fff !important; font-weight: 700;
          border-radius: 99px; padding: 6px 16px;
          border-color: transparent;
          box-shadow: 0 3px 12px rgba(22,163,74,0.35);
        }
        .wtn-link.bundles:hover { transform: translateY(-1px); box-shadow: 0 5px 18px rgba(22,163,74,0.45); }

        /* WhatsApp Us pill */
        .wtn-wa {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 14px; background: #25d366; border-radius: 99px;
          color: #fff; font-weight: 700; font-size: 13px;
          text-decoration: none; white-space: nowrap; flex-shrink: 0;
          transition: transform .15s, box-shadow .15s;
          box-shadow: 0 3px 12px rgba(37,211,102,0.35);
        }
        .wtn-wa:hover { transform: translateY(-1px); box-shadow: 0 5px 18px rgba(37,211,102,0.45); }

        /* Auth area */
        .wtn-auth {
          display: flex; align-items: center; gap: 6px; flex-shrink: 0;
        }
        .wtn-auth-link {
          padding: 6px 12px; border-radius: 8px; text-decoration: none;
          font-size: 12.5px; font-weight: 600; color: rgba(255,255,255,0.7);
          border: 1.5px solid rgba(255,255,255,0.15); transition: all .15s;
        }
        .wtn-auth-link:hover { color: #fff; border-color: rgba(255,255,255,0.3); background: rgba(255,255,255,0.07); }
        .wtn-auth-admin {
          padding: 5px 10px; background: rgba(251,191,36,0.15);
          border: 1.5px solid rgba(251,191,36,0.3);
          border-radius: 8px; color: #fbbf24;
          font-size: 12px; font-weight: 700; text-decoration: none;
        }
        .wtn-signout {
          padding: 5px 11px; border: 1.5px solid rgba(255,255,255,0.15);
          border-radius: 8px; background: none; color: rgba(255,255,255,0.6);
          font-size: 12.5px; font-weight: 600; cursor: pointer; font-family: inherit;
          transition: all .15s;
        }
        .wtn-signout:hover { color: #fff; border-color: rgba(255,255,255,0.3); }

        /* Hamburger */
        .wtn-ham {
          display: none; background: none; border: none;
          color: #fff; font-size: 22px; cursor: pointer;
          padding: 4px; line-height: 1; flex-shrink: 0;
        }

        /* Mobile menu */
        .wtn-menu {
          position: fixed; top: var(--nav-h); left: 0; right: 0; bottom: 0;
          background: rgba(15,23,42,0.98); backdrop-filter: blur(20px);
          z-index: 899; overflow-y: auto;
          padding: 16px 20px 40px;
          font-family: 'Segoe UI', system-ui, sans-serif;
          animation: wtn-down .2s ease both;
        }
        @keyframes wtn-down {
          from { opacity:0; transform:translateY(-8px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .wtn-mlink {
          display: block; padding: 13px 16px; border-radius: 12px;
          text-decoration: none; font-size: 16px; font-weight: 600;
          color: rgba(255,255,255,0.8); margin-bottom: 6px;
          border: 1px solid transparent; transition: all .15s;
        }
        .wtn-mlink:hover { background: rgba(255,255,255,0.07); color: #fff; }
        .wtn-mlink.active { background: rgba(74,222,128,0.12); color: #4ade80; border-color: rgba(74,222,128,0.2); }
        .wtn-mlink.bundles {
          background: linear-gradient(135deg,#15803d,#16a34a);
          color: #fff !important; border-color: transparent;
        }

        @media (max-width: 1024px) {
          .wtn-links { display: none !important; }
          .wtn-auth  { display: none !important; }
          .wtn-wa    { display: none !important; }
          .wtn-ham   { display: block !important; }
        }
      `}</style>

      <nav className="wtn">
        <div className="wtn-inner">

          {/* ── Logo ── */}
          <Link to="/" className="wtn-logo">
            <img
              src="/logo-webertech.png"
              alt="WeberTech"
              className="wtn-logo-img"
              onError={e => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            {/* Fallback if logo image missing */}
            <div className="wtn-logo-fallback" style={{ display:"none" }}>
              <div className="wtn-logo-icon">W</div>
              <span className="wtn-logo-text">Weber<span>Tech</span></span>
            </div>
          </Link>

          {/* ── Desktop nav links ── */}
          <div className="wtn-links">
            {NAV.map(l => {
              if (l.ext) {
                return (
                  <a key={l.label} href={l.to} target="_blank" rel="noreferrer"
                    className="wtn-link bundles">
                    ⚡ {l.label}
                  </a>
                );
              }
              return (
                <Link key={l.label} to={l.to}
                  className={`wtn-link ${isActive(l.to) ? "active" : ""}`}>
                  {l.label}
                </Link>
              );
            })}
          </div>

          {/* ── WhatsApp Us + Auth ── */}
          <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
            <a href={WA_URL} target="_blank" rel="noreferrer" className="wtn-wa">
              💬 WhatsApp Us
            </a>
            <div className="wtn-auth">
              {user ? (
                <>
                  {isAdmin && <Link to="/admin" className="wtn-auth-admin">⚙ Admin</Link>}
                  <Link to="/dashboard" className="wtn-auth-link">👤 Account</Link>
                  <button onClick={logout} className="wtn-signout">Sign Out</button>
                </>
              ) : (
                <Link to="/dashboard" className="wtn-auth-link">Login</Link>
              )}
            </div>
            {/* Hamburger */}
            <button className="wtn-ham" onClick={() => setMenuOpen(p => !p)} aria-label="Menu">
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div className="wtn-menu">
          {NAV.map(l => {
            if (l.ext) {
              return (
                <a key={l.label} href={l.to} target="_blank" rel="noreferrer"
                  className="wtn-mlink bundles" onClick={() => setMenuOpen(false)}>
                  ⚡ {l.label} →
                </a>
              );
            }
            return (
              <Link key={l.label} to={l.to}
                className={`wtn-mlink ${isActive(l.to) ? "active" : ""}`}
                onClick={() => setMenuOpen(false)}>
                {l.label}
              </Link>
            );
          })}

          {/* WhatsApp */}
          <a href={WA_URL} target="_blank" rel="noreferrer"
            style={{ display:"flex", alignItems:"center", gap:8, padding:"13px 16px", background:"#25d366", borderRadius:12, textDecoration:"none", fontSize:16, fontWeight:700, color:"#fff", marginTop:8, marginBottom:6 }}
            onClick={() => setMenuOpen(false)}>
            💬 WhatsApp Us
          </a>

          {/* Auth */}
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.1)", marginTop:12, paddingTop:16 }}>
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/admin" className="wtn-mlink" onClick={() => setMenuOpen(false)}
                    style={{ color:"#fbbf24" }}>⚙ Admin Panel</Link>
                )}
                <Link to="/dashboard" className="wtn-mlink" onClick={() => setMenuOpen(false)}>
                  👤 My Account
                </Link>
                <button onClick={logout}
                  style={{ width:"100%", padding:"12px 16px", border:"1.5px solid rgba(255,255,255,0.15)", borderRadius:12, background:"none", color:"rgba(255,255,255,0.6)", fontSize:15, fontWeight:600, cursor:"pointer", fontFamily:"inherit", textAlign:"left" }}>
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/dashboard" className="wtn-mlink" onClick={() => setMenuOpen(false)}>
                Login / Sign Up
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
