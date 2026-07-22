// src/pages/auth/ForgotPassword.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/firebase";
import { toast, Toaster } from "react-hot-toast";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
      toast.success("Reset email sent!");
    } catch (err) {
      toast.error(err.message || "Failed to send reset email");
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <Toaster />
      <div style={container}>
        <div style={card}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <h1 style={h1}>Reset Password</h1>
            <p style={p}>We'll send you a link to reset your password</p>
          </div>

          {sent ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📧</div>
              <h2 style={{ fontWeight: 800, fontSize: 20, marginBottom: 8 }}>Check your inbox</h2>
              <p style={{ color: "#6b7280", fontSize: 14.5, marginBottom: 24 }}>
                We've sent a password reset link to <strong>{email}</strong>.
              </p>
              <Link to="/auth/login" style={btnLink}>Back to Login</Link>
            </div>
          ) : (
            <form onSubmit={handleReset} style={form}>
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

              <button type="submit" disabled={loading} style={btn}>
                {loading ? "Sending..." : "Send Reset Link"}
              </button>

              <div style={{ textAlign: "center", marginTop: 10 }}>
                <Link to="/auth/login" style={link}>Back to Login</Link>
              </div>
            </form>
          )}
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
const input = { padding: "12px 16px", borderRadius: 12, border: "1.5px solid #e5e7eb", fontSize: 14.5, outline: "none" };
const btn = { padding: "13px", borderRadius: 12, border: "none", background: "#16a34a", color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer" };
const btnLink = { display: "block", padding: "13px", borderRadius: 12, background: "#16a34a", color: "#fff", fontWeight: 800, fontSize: 15, textDecoration: "none", textAlign: "center" };
const link = { color: "#6b7280", fontWeight: 700, textDecoration: "none", fontSize: 14 };
