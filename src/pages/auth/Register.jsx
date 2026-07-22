// src/pages/auth/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { toast, Toaster } from "react-hot-toast";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      
      // Update Auth Profile
      await updateProfile(user, {
        displayName: `${formData.firstName} ${formData.lastName}`
      });

      // Create Firestore User Document
      await setDoc(doc(db, "users", user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        role: "customer",
        status: "active",
        joinedAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        profile: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: "",
          photoURL: "",
          county: "",
          town: "",
          address: "",
        },
        preferences: {
          emailNotifications: true,
          smsNotifications: true,
          darkMode: false
        }
      });

      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || "Registration failed");
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
            <h1 style={h1}>Create Account</h1>
            <p style={p}>Join the WeberTech ecosystem</p>
          </div>

          <form onSubmit={handleRegister} style={form}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={field}>
                <label style={label}>First Name</label>
                <input
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  style={input}
                  placeholder="John"
                />
              </div>
              <div style={field}>
                <label style={label}>Last Name</label>
                <input
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  style={input}
                  placeholder="Doe"
                />
              </div>
            </div>

            <div style={field}>
              <label style={label}>Email Address</label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                style={input}
                placeholder="you@example.com"
              />
            </div>

            <div style={field}>
              <label style={label}>Password</label>
              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                style={input}
                placeholder="Min 6 characters"
                minLength={6}
              />
            </div>

            <button type="submit" disabled={loading} style={btn}>
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p style={footer}>
            Already have an account? <Link to="/auth/login" style={link}>Log in</Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

const container = { paddingTop: 120, paddingBottom: 80, background: "#f9fafb", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" };
const card = { background: "#fff", padding: 40, borderRadius: 20, boxShadow: "0 10px 25px rgba(0,0,0,0.05)", width: "100%", maxWidth: 460 };
const h1 = { fontWeight: 900, fontSize: 28, color: "#111827", marginBottom: 8, letterSpacing: "-0.5px" };
const p = { color: "#6b7280", fontSize: 14.5 };
const form = { display: "flex", flexDirection: "column", gap: 20, marginTop: 24 };
const field = { display: "flex", flexDirection: "column", gap: 8 };
const label = { fontSize: 13, fontWeight: 700, color: "#374151" };
const input = { padding: "12px 16px", borderRadius: 12, border: "1.5px solid #e5e7eb", fontSize: 14.5, outline: "none" };
const btn = { padding: "13px", borderRadius: 12, border: "none", background: "#16a34a", color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", marginTop: 10 };
const footer = { textAlign: "center", marginTop: 24, fontSize: 14, color: "#6b7280" };
const link = { color: "#16a34a", fontWeight: 700, textDecoration: "none" };
