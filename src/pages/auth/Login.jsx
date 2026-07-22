// src/pages/auth/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../config/firebase";
import { toast, Toaster } from "react-hot-toast";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || "Login failed");
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || "Google login failed");
    }
  };

  return (
    <>
      <Navbar />
      <Toaster />
      <div style={container}>
        <div style={card}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <h1 style={h1}>Welcome Back</h1>
            <p style={p}>Log in to your WeberTech account</p>
          </div>

          <form onSubmit={handleLogin} style={form}>
            <div style={field}>
              <label style={label}>Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={input}
                placeholder="you@example.com"
              />
            </div>

            <div style={field}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label style={label}>Password</label>
                <Link to="/auth/forgot-password" style={forgot}>Forgot password?</Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={input}
                placeholder="••••••••"
              />
            </div>

            <button type="submit" disabled={loading} style={btn}>
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <div style={divider}>
            <span style={dividerText}>or continue with</span>
          </div>

          <button onClick={handleGoogleLogin} style={googleBtn}>
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: 18 }} />
            Google
          </button>

          <p style={footer}>
            Don't have an account? <Link to="/auth/register" style={link}>Sign up</Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

const container = { paddingTop: 120, paddingBottom: 80, background: "#f9fafb", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" };
const card = { background: "#fff", padding: 40, borderRadius: 20, boxShadow: "0 10px 25px rgba(0,0,0,0.05)", width: "100%", maxWidth: 420 };
const h1 = { fontWeight: 900, fontSize: 28, color: "#111827", marginBottom: 8, letterSpacing: "-0.5px" };
const p = { color: "#6b7280", fontSize: 14.5 };
const form = { display: "flex", flexDirection: "column", gap: 20, marginTop: 24 };
const field = { display: "flex", flexDirection: "column", gap: 8 };
const label = { fontSize: 13, fontWeight: 700, color: "#374151" };
const input = { padding: "12px 16px", borderRadius: 12, border: "1.5px solid #e5e7eb", fontSize: 14.5, outline: "none", transition: "border-color 0.2s" };
const forgot = { fontSize: 12.5, color: "#16a34a", fontWeight: 700, textDecoration: "none" };
const btn = { padding: "13px", borderRadius: 12, border: "none", background: "#16a34a", color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", transition: "opacity 0.2s" };
const divider = { position: "relative", textAlign: "center", margin: "24px 0" };
const dividerText = { background: "#fff", padding: "0 12px", fontSize: 12, color: "#9ca3af", position: "relative", zIndex: 1 };
const googleBtn = { display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "12px", borderRadius: 12, border: "1.5px solid #e5e7eb", background: "#fff", color: "#374151", fontWeight: 700, fontSize: 14.5, cursor: "pointer" };
const footer = { textAlign: "center", marginTop: 24, fontSize: 14, color: "#6b7280" };
const link = { color: "#16a34a", fontWeight: 700, textDecoration: "none" };
