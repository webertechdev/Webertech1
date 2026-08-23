import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { findReferrerByCode, ensureReferralProfile, normalizeReferralCode } from "../../utils/referrals";
import { toast, Toaster } from "react-hot-toast";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Register() {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const queryCode = searchParams.get("ref") || searchParams.get("referral") || "";
    if (queryCode) {
      setFormData(prev => ({ ...prev, referralCode: normalizeReferralCode(queryCode) }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === "referralCode" ? normalizeReferralCode(value) : value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const referralCode = normalizeReferralCode(formData.referralCode);
      const referrer = referralCode ? await findReferrerByCode(db, referralCode) : null;
      if (referralCode && !referrer) {
        toast.error("That referral code was not found. You can continue without it.");
      }

      const { user } = await createUserWithEmailAndPassword(auth, formData.email.trim(), formData.password);
      const displayName = `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim();
      await updateProfile(user, { displayName });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        role: "customer",
        status: "active",
        referralCode: "",
        referredById: referrer?.userId || referrer?.id || null,
        referredByCode: referrer?.code || (referralCode && referrer ? referralCode : ""),
        referralJoinedAt: referrer ? serverTimestamp() : null,
        joinedAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        profile: {
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          photoURL: "",
          county: "",
          town: "",
          address: "",
        },
        preferences: {
          emailNotifications: true,
          smsNotifications: true,
          darkMode: false,
        },
      });

      const referralProfile = await ensureReferralProfile(db, user, {
        referrerId: referrer?.userId || referrer?.id || null,
        referredByCode: referrer?.code || "",
      });
      await setDoc(doc(db, "users", user.uid), {
        referralCode: referralProfile?.code || "",
        referredById: referrer?.userId || referrer?.id || null,
        referredByCode: referrer?.code || "",
        updatedAt: serverTimestamp(),
      }, { merge: true });
      toast.success(referrer ? "Account created. Your referral is linked!" : "Account created successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Toaster />
      <div style={container}>
        <div style={card}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <h1 style={h1}>Create Account</h1>
            <p style={p}>Join the WeberTech ecosystem and track your support, orders, and referral earnings.</p>
          </div>

          <form onSubmit={handleRegister} style={form}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={field}>
                <label style={label}>First Name</label>
                <input name="firstName" required value={formData.firstName} onChange={handleChange} style={input} placeholder="John" autoComplete="given-name" />
              </div>
              <div style={field}>
                <label style={label}>Last Name</label>
                <input name="lastName" required value={formData.lastName} onChange={handleChange} style={input} placeholder="Doe" autoComplete="family-name" />
              </div>
            </div>

            <div style={field}>
              <label style={label}>Phone Number</label>
              <input name="phone" type="tel" required value={formData.phone} onChange={handleChange} style={input} placeholder="0722 508 904" autoComplete="tel" />
            </div>

            <div style={field}>
              <label style={label}>Email Address</label>
              <input name="email" type="email" required value={formData.email} onChange={handleChange} style={input} placeholder="you@example.com" autoComplete="email" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={field}>
                <label style={label}>Password</label>
                <input name="password" type="password" required value={formData.password} onChange={handleChange} style={input} placeholder="Min 6 characters" minLength={6} autoComplete="new-password" />
              </div>
              <div style={field}>
                <label style={label}>Confirm Password</label>
                <input name="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleChange} style={input} placeholder="Repeat password" minLength={6} autoComplete="new-password" />
              </div>
            </div>

            <div style={field}>
              <label style={label}>Referral Code <span style={{ color: "#9ca3af", fontWeight: 500 }}>(optional)</span></label>
              <input name="referralCode" value={formData.referralCode} onChange={handleChange} style={input} placeholder="e.g. WEB1234AB" autoComplete="off" />
              <small style={{ color: "#6b7280", fontSize: 11.5 }}>If a friend shared a referral link, the code is filled automatically.</small>
            </div>

            <button type="submit" disabled={loading} style={btn}>
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p style={footer}>Already have an account? <Link to="/auth/login" style={link}>Log in</Link></p>
        </div>
      </div>
      <Footer />
    </>
  );
}

const container = { paddingTop: 120, paddingBottom: 80, background: "#f9fafb", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" };
const card = { background: "#fff", padding: 40, borderRadius: 20, boxShadow: "0 10px 25px rgba(0,0,0,0.05)", width: "100%", maxWidth: 520 };
const h1 = { fontWeight: 900, fontSize: 28, color: "#111827", marginBottom: 8, letterSpacing: "-0.5px" };
const p = { color: "#6b7280", fontSize: 14.5 };
const form = { display: "flex", flexDirection: "column", gap: 18, marginTop: 24 };
const field = { display: "flex", flexDirection: "column", gap: 8 };
const label = { fontSize: 13, fontWeight: 700, color: "#374151" };
const input = { padding: "12px 16px", borderRadius: 12, border: "1.5px solid #e5e7eb", fontSize: 14.5, outline: "none", width: "100%", boxSizing: "border-box" };
const btn = { padding: "13px", borderRadius: 12, border: "none", background: "#16a34a", color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", marginTop: 6 };
const footer = { textAlign: "center", marginTop: 24, fontSize: 14, color: "#6b7280" };
const link = { color: "#16a34a", fontWeight: 700, textDecoration: "none" };
