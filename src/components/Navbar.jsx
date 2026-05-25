// ─────────────────────────────────────────────────────────────────
//  WeberTech — src/components/Navbar.jsx
//  Shared nav used on Home + all pages
//  Shows login state, Dashboard link, Admin link if isAdmin
// ─────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { FaMobileAlt, FaBars, FaTimes, FaUser, FaSignOutAlt, FaTachometerAlt, FaCog } from "react-icons/fa";

const navLinks = [
  { label: "Home",        to: "/"            },
  { label: "Bundles",     to: "/bundles"     },
  { label: "Academy",     to: "/academy"     },
  { label: "Electronics", to: "/electronics" },
  { label: "Cyber",       to: "/cyber"       },
  { label: "Dev",         to: "/dev"         },
  { label: "Hustle",      to: "/hustle"      },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [user, setUser]           = useState(null);
  const [isAdmin, setIsAdmin]     = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const location = useLocation();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        const snap = await getDoc(doc(db, "users", u.uid));
        const data = snap.exists() ? snap.data() : {};
        setUser({ ...data, uid: u.uid, email: u.email });
        setIsAdmin(data.isAdmin === true);
      } else {
        setUser(null); setIsAdmin(false);
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setMenuOpen(false);
  };

  const isActive = (to) => location.pathname === to;

  return (
    <>
      <style>{`
        .wt-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          height: 64px;
          background: ${scrolled ? "rgba(255,255,255,0.97)" : "#fff"};
          backdrop-filter: blur(12px);
          border-bottom: 1px solid ${scrolled ? "#e5e7eb" : "transparent"};
          transition: all .25s ease;
          box-shadow: ${scrolled ? "0 2px 20px rgba(0,0,0,0.07)" : "none"};
        }
        .wt-nav-inner {
          max-width: 1280px; margin: 0 auto; padding: 0 20px;
          height: 100%; display: flex; align-items: center; justify-content: space-between;
        }
        .wt-nav-links { display: flex; align-items: center; gap: 2px; }
        .wt-nav-link {
          padding: 6px 12px; border-radius: 8px; text-decoration: none;
          font-size: 13.5px; font-weight: 500; color: #4b5563;
          transition: all .15s; white-space: nowrap;
        }
        .wt-nav-link:hover  { background: #f0fdf4; color: #16a34a; }
        .wt-nav-link.active { background: #dcfce7; color: #15803d; font-weight: 700; }
        .wt-nav-user { display: flex; align-items: center; gap: 8px; }
        @media (max-width: 900px) {
          .wt-nav-links { display: none; }
          .wt-hamburger { display: flex !important; }
        }
        @media (min-width: 901px) { .wt-hamburger { display: none !important; } }
        .wt-mobile-menu {
          position: fixed; top: 64px; left: 0; right: 0; bottom: 0;
          background: #fff; z-index: 99; padding: 16px 20px 32px;
          overflow-y: auto; border-top: 1px solid #e5e7eb;
          animation: slideDown .22s ease both;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <nav className="wt-nav">
        <div className="wt-nav-inner">
          {/* Logo */}
          <Link to="/" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none" }}>
            <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#15803d,#16a34a)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <FaMobileAlt style={{ color:"#fff", fontSize:17 }} />
            </div>
            <span style={{ fontWeight:800, fontSize:18, color:"#111827", letterSpacing:"-0.4px" }}>
              Weber<span style={{ color:"#16a34a" }}>Tech</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="wt-nav-links">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} className={`wt-nav-link ${isActive(l.to)?"active":""}`}>{l.label}</Link>
            ))}
          </div>

          {/* Desktop auth */}
          <div className="wt-nav-user" style={{ display:"flex" }}>
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/admin" style={{ display:"flex", alignItems:"center", gap:5, padding:"7px 12px", background:"#fef3c7", borderRadius:8, fontSize:13, fontWeight:700, color:"#92400e", textDecoration:"none", marginRight:4 }}>
                    <FaCog style={{ fontSize:12 }} /> Admin
                  </Link>
                )}
                <Link to="/dashboard" style={{ display:"flex", alignItems:"center", gap:5, padding:"7px 12px", background:"#f0fdf4", borderRadius:8, fontSize:13, fontWeight:700, color:"#15803d", textDecoration:"none", marginRight:4 }}>
                  <FaTachometerAlt style={{ fontSize:12 }} /> Dashboard
                </Link>
                <button onClick={handleLogout} style={{ display:"flex", alignItems:"center", gap:5, padding:"7px 14px", border:"2px solid #e5e7eb", borderRadius:8, background:"#fff", fontSize:13, fontWeight:600, color:"#6b7280", cursor:"pointer" }}>
                  <FaSignOutAlt /> Logout
                </button>
              </>
            ) : (
              <Link to="/bundles" style={{ display:"flex", alignItems:"center", gap:6, padding:"9px 18px", background:"linear-gradient(135deg,#15803d,#16a34a)", borderRadius:9, fontSize:13.5, fontWeight:700, color:"#fff", textDecoration:"none" }}>
                <FaUser style={{ fontSize:12 }} /> Login
              </Link>
            )}
          </div>

          {/* Hamburger */}
          <button className="wt-hamburger" onClick={() => setMenuOpen(!menuOpen)}
            style={{ background:"none", border:"none", fontSize:22, cursor:"pointer", color:"#111827", display:"none", alignItems:"center" }}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="wt-mobile-menu">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)}
              style={{ display:"block", padding:"13px 14px", borderRadius:10, textDecoration:"none", fontSize:15, fontWeight: isActive(l.to)?700:500, color: isActive(l.to)?"#15803d":"#374151", background: isActive(l.to)?"#f0fdf4":"transparent", marginBottom:4 }}>
              {l.label}
            </Link>
          ))}
          <div style={{ borderTop:"1px solid #e5e7eb", marginTop:12, paddingTop:16 }}>
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)}
                  style={{ display:"flex", alignItems:"center", gap:8, padding:"12px 14px", background:"#f0fdf4", borderRadius:10, textDecoration:"none", fontSize:15, fontWeight:700, color:"#15803d", marginBottom:8 }}>
                  <FaTachometerAlt /> My Dashboard
                </Link>
                {isAdmin && (
                  <Link to="/admin" onClick={() => setMenuOpen(false)}
                    style={{ display:"flex", alignItems:"center", gap:8, padding:"12px 14px", background:"#fef3c7", borderRadius:10, textDecoration:"none", fontSize:15, fontWeight:700, color:"#92400e", marginBottom:8 }}>
                    <FaCog /> Admin Panel
                  </Link>
                )}
                <button onClick={handleLogout}
                  style={{ width:"100%", padding:"12px 14px", border:"2px solid #e5e7eb", borderRadius:10, background:"#fff", fontSize:15, fontWeight:600, color:"#6b7280", cursor:"pointer", display:"flex", alignItems:"center", gap:8 }}>
                  <FaSignOutAlt /> Logout
                </button>
              </>
            ) : (
              <Link to="/bundles" onClick={() => setMenuOpen(false)}
                style={{ display:"block", padding:"13px 14px", background:"linear-gradient(135deg,#15803d,#16a34a)", borderRadius:10, textDecoration:"none", fontSize:15, fontWeight:700, color:"#fff", textAlign:"center" }}>
                Login / Sign Up
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
