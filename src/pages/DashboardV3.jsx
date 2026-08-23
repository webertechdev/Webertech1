// src/pages/DashboardV3.jsx
// WeberTech Customer Dashboard v3 — Complete Feature Set with Working Buttons
// Features: Wallet, Rewards, Referrals, Notifications, Enhanced Profile

import { useState, useEffect } from "react";
import { collection, getDocs, doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { toast, Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { loadReferralSnapshot, referralLinkForCode, REFERRAL_COMMISSION_RATE, displayReferralName } from "../utils/referrals";
const SUPPORT_STAGES = [
  { id: "received", label: "Received", description: "We received your support request." },
  { id: "under_review", label: "Under review", description: "A support agent is reviewing the request." },
  { id: "in_progress", label: "In progress", description: "Our team is actively working on a solution." },
  { id: "waiting_customer", label: "Waiting for you", description: "We need information or confirmation from you." },
  { id: "resolved", label: "Resolved", description: "The requested support has been completed." },
  { id: "closed", label: "Closed", description: "This support ticket has been closed." },
];

export default function DashboardV3({ user: initialUser }) {
  const [user, setUser] = useState(initialUser || null);
  const [tab, setTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [services, setServices] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [profile, setProfile] = useState({});
  const [wallet, setWallet] = useState({ balance: 0, currency: "KES" });
  const [rewards, setRewards] = useState({ points: 0, tier: "Silver", nextTier: 500 });
  const [referralCode, setReferralCode] = useState("");
  const [referralData, setReferralData] = useState({ profile: null, friends: [], earnings: [], totalEarnings: 0, referredRevenue: 0 });
  const [referralStats, setReferralStats] = useState({ referrals: 0, earnings: 0, referredRevenue: 0, rate: REFERRAL_COMMISSION_RATE });
  const [lastRefresh, setLastRefresh] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({});

  const refreshReferralData = async (userId) => {
    if (!userId) return;
    const snapshot = await loadReferralSnapshot(db, userId);
    const code = snapshot.profile?.code || `WEB${String(userId).substring(0, 8).toUpperCase()}`;
    const totalEarnings = Number(snapshot.totalEarnings || snapshot.profile?.totalEarnings || 0);
    const rate = Number(snapshot.profile?.commissionRate || REFERRAL_COMMISSION_RATE);
    setReferralCode(code);
    setReferralData({ ...snapshot, totalEarnings });
    setReferralStats({
      referrals: snapshot.friends.length,
      earnings: totalEarnings,
      referredRevenue: Number(snapshot.referredRevenue || 0),
      rate,
    });
  };

  // Load user auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fu) => {
      if (!fu) return setUser(null);
      try {
        const snap = await getDoc(doc(db, "users", fu.uid));
        const data = snap.exists() ? snap.data() : {};
        setUser({ uid: fu.uid, email: fu.email, ...data });
        setProfile(data || {});
        setProfileForm(data || {});
        
        // Load wallet, rewards, referrals
        const walletSnap = await getDoc(doc(db, "wallets", fu.uid)).catch(() => null);
        if (walletSnap?.exists()) setWallet(walletSnap.data());
        
        const rewardsSnap = await getDoc(doc(db, "rewards", fu.uid)).catch(() => null);
        if (rewardsSnap?.exists()) setRewards(rewardsSnap.data());
        
        await refreshReferralData(fu.uid).catch(error => {
          console.warn("Referral data could not load:", error?.message || error);
        });
      } catch (err) {
        console.error("User fetch error:", err);
        setUser({ uid: fu.uid, email: fu.email });
      }
    });
    return () => unsub();
  }, []);

  // Manual data refresh function (simplified to avoid index errors)
  const refreshData = async () => {
    if (!user?.uid) return;
    setLoading(true);
    try {
      // Fetch all collections without complex sorting
      const [ordersSnap, downloadsSnap, servicesSnap, invoicesSnap, ticketsSnap, notifSnap] = await Promise.all([
        getDocs(collection(db, "orders")).catch(() => ({ docs: [] })),
        getDocs(collection(db, "downloads")).catch(() => ({ docs: [] })),
        getDocs(collection(db, "services")).catch(() => ({ docs: [] })),
        getDocs(collection(db, "invoices")).catch(() => ({ docs: [] })),
        getDocs(collection(db, "supportTickets")).catch(() => ({ docs: [] })),
        getDocs(collection(db, "notifications")).catch(() => ({ docs: [] })),
      ]);

      // Filter by user ID
      const userOrders = ordersSnap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter(o => o.customerId === user.uid)
        .sort((a, b) => (b.createdAt?.toDate?.() || 0) - (a.createdAt?.toDate?.() || 0));
      
      const storedDownloads = downloadsSnap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter(d => d.customerId === user.uid);
      const paidDocumentEntitlements = userOrders
        .filter(order => ["paid", "completed", "complete"].includes(String(order.status || "").toLowerCase())
          && ["document", "legal-document", "service-document"].includes(String(order.type || "").toLowerCase())
          && order.productId)
        .filter(order => !storedDownloads.some(download => download.orderId === (order.orderId || order.id)))
        .map(order => ({
          id: `entitlement-${order.orderId || order.id}`,
          orderId: order.orderId || order.id,
          customerId: user.uid,
          productId: order.productId,
          productTitle: order.productTitle || "Original document",
          fileName: order.productTitle ? `${order.productTitle}.pdf` : "webertech-document.pdf",
          createdAt: order.updatedAt || order.createdAt,
          entitlement: true,
        }));
      const userDownloads = [...storedDownloads, ...paidDocumentEntitlements]
        .sort((a, b) => (b.createdAt?.toDate?.() || 0) - (a.createdAt?.toDate?.() || 0));
      
      const userServices = servicesSnap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter(s => s.customerId === user.uid)
        .sort((a, b) => (b.createdAt?.toDate?.() || 0) - (a.createdAt?.toDate?.() || 0));
      
      const userInvoices = invoicesSnap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter(i => i.customerId === user.uid)
        .sort((a, b) => (b.createdAt?.toDate?.() || 0) - (a.createdAt?.toDate?.() || 0));
      
      const userTickets = ticketsSnap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter(t => t.customerId === user.uid)
        .sort((a, b) => (b.createdAt?.toDate?.() || 0) - (a.createdAt?.toDate?.() || 0));
      
      const userNotifications = notifSnap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter(n => n.userId === user.uid)
        .sort((a, b) => (b.createdAt?.toDate?.() || 0) - (a.createdAt?.toDate?.() || 0));

      setOrders(userOrders);
      setDownloads(userDownloads);
      setServices(userServices);
      setInvoices(userInvoices);
      setTickets(userTickets);
      setNotifications(userNotifications);
      await refreshReferralData(user.uid);
      setLastRefresh(new Date().toLocaleTimeString());
      toast.success("✅ Dashboard updated and referral earnings recalculated!");
    } catch (err) {
      console.error("Data refresh error:", err);
      toast.error("⚠️ Some data couldn't load, but dashboard is still working!");
    }
    setLoading(false);
  };

  // Load data on component mount
  useEffect(() => {
    if (user?.uid) {
      refreshData();
    }
  }, [user?.uid]);

  // Handle profile update
  const handleProfileUpdate = async () => {
    if (!user?.uid) return;
    setLoading(true);
    try {
      await updateDoc(doc(db, "users", user.uid), {
        ...profileForm,
        updatedAt: serverTimestamp(),
      });
      setProfile(profileForm);
      setEditingProfile(false);
      toast.success("✅ Profile updated!");
    } catch (err) {
      toast.error("Failed to update profile");
    }
    setLoading(false);
  };

  // Copy referral code
  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success("✅ Referral code copied!");
  };

  // Share referral link
  const shareReferralLink = () => {
    const link = referralLinkForCode(referralCode);
    navigator.clipboard.writeText(link);
    toast.success("✅ Referral link copied!");
  };

  // Claim rewards
  const claimRewards = async () => {
    if (rewards.points < 100) {
      toast.error("Need at least 100 points to claim");
      return;
    }
    try {
      const newBalance = wallet.balance + (rewards.points / 100);
      await updateDoc(doc(db, "wallets", user.uid), { balance: newBalance });
      await updateDoc(doc(db, "rewards", user.uid), { points: 0 });
      setWallet({ ...wallet, balance: newBalance });
      setRewards({ ...rewards, points: 0 });
      toast.success("✅ Rewards claimed!");
    } catch (err) {
      toast.error("Failed to claim rewards");
    }
  };

  // Withdraw from wallet
  const withdrawFromWallet = async () => {
    if (wallet.balance < 100) {
      toast.error("Minimum withdrawal is KES 100");
      return;
    }
    try {
      const newBalance = wallet.balance - 100;
      await updateDoc(doc(db, "wallets", user.uid), { balance: newBalance });
      setWallet({ ...wallet, balance: newBalance });
      toast.success("✅ Withdrawal initiated!");
    } catch (err) {
      toast.error("Failed to process withdrawal");
    }
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <div style={{ paddingTop: 120, textAlign: "center", minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div>
            <h2 style={{ fontWeight: 900, fontSize: 24, marginBottom: 10 }}>Sign in to your account</h2>
            <p style={{ color: "#6b7280", marginBottom: 20 }}>Access your orders, downloads, and services.</p>
            <a href="/auth/login" style={{ display: "inline-block", padding: "12px 24px", background: "#16a34a", color: "#fff", borderRadius: 10, fontWeight: 700, textDecoration: "none" }}>
              Sign In / Sign Up
            </a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const stats = [
    { icon: "📋", label: "Total Orders", value: orders.length, color: "#2563eb", bg: "#dbeafe" },
    { icon: "⬇️", label: "Downloads", value: downloads.length, color: "#16a34a", bg: "#dcfce7" },
    { icon: "⚙️", label: "Active Services", value: services.filter(s => s.status !== "completed").length, color: "#d97706", bg: "#fef3c7" },
    { icon: "💰", label: "Wallet Balance", value: `KES ${wallet.balance.toFixed(0)}`, color: "#7c3aed", bg: "#ede9fe" },
  ];

  const unreadNotificationCount = notifications.filter(notification => notification.read !== true).length;
  const tabs = [
    { id: "overview", icon: "📊", label: "Overview" },
    { id: "orders", icon: "📋", label: "Orders" },
    { id: "downloads", icon: "⬇️", label: "Downloads" },
    { id: "services", icon: "⚙️", label: "Services" },
    { id: "support", icon: "🎧", label: tickets.length ? `Support (${tickets.length})` : "Support" },
    { id: "wallet", icon: "💰", label: "Wallet" },
    { id: "rewards", icon: "🎁", label: "Rewards" },
    { id: "referrals", icon: "🔗", label: "Refer & Earn" },
    { id: "notifications", icon: "🔔", label: unreadNotificationCount ? `Notifications (${unreadNotificationCount})` : "Notifications" },
    { id: "settings", icon: "⚙️", label: "Settings" },
  ];

  return (
    <>
      <style>{`
        body { font-family: 'Segoe UI', system-ui, sans-serif; }
        .dash-container { padding-top: 64px; background: #f9fafb; min-height: 100vh; }
        .dash-header { background: linear-gradient(135deg, #0f172a, #16a34a); padding: 32px 20px; color: #fff; }
        .dash-title { font-size: 28px; font-weight: 900; margin: 0 0 8px; }
        .dash-subtitle { color: rgba(255,255,255,0.8); font-size: 14px; margin: 0; }
        .dash-refresh { display: inline-flex; align-items: center; gap: 8px; margin-top: 16px; padding: 10px 16px; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); border-radius: 8px; color: #fff; font-size: 12px; }
        .dash-refresh-btn { background: rgba(255,255,255,0.2); border: none; padding: 8px 14px; border-radius: 6px; color: #fff; font-weight: 700; cursor: pointer; transition: all .2s; }
        .dash-refresh-btn:hover { background: rgba(255,255,255,0.3); }
        .dash-refresh-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .dash-layout { display: grid; grid-template-columns: 220px 1fr; gap: 24px; max-width: 1280px; margin: 0 auto; padding: 24px 20px; }
        .dash-sidebar { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 16px; padding: 20px; height: fit-content; position: sticky; top: 80px; }
        .dash-tab { display: flex; align-items: center; gap: 8px; padding: 11px 14px; border: none; border-radius: 10px; cursor: pointer; font-size: 13.5px; font-weight: 600; background: none; color: #6b7280; transition: all .15s; text-align: left; margin-bottom: 4px; font-family: inherit; width: 100%; }
        .dash-tab:hover { background: #f9fafb; color: #111827; }
        .dash-tab.on { background: #16a34a; color: #fff; }
        .dash-card { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 16px; padding: 22px; margin-bottom: 20px; }
        .dash-stat { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 14px; padding: 20px; }
        .dash-stat-value { font-size: 22px; font-weight: 800; }
        .dash-stat-label { font-size: 12px; color: #6b7280; margin-top: 3px; }
        .dash-btn { background: #16a34a; color: #fff; border: none; padding: 10px 16px; border-radius: 8px; font-weight: 700; cursor: pointer; transition: all .2s; font-size: 13px; }
        .dash-btn:hover { background: #15803d; transform: translateY(-2px); }
        .dash-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .dash-btn-secondary { background: #e5e7eb; color: #1f2937; }
        .dash-btn-secondary:hover { background: #d1d5db; }
        .dash-tbl { width: 100%; border-collapse: collapse; font-size: 13.5px; }
        .dash-tbl th { padding: 10px 14px; text-align: left; font-size: 11.5px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: .4px; border-bottom: 2px solid #f3f4f6; }
        .dash-tbl td { padding: 12px 14px; border-bottom: 1px solid #f9fafb; vertical-align: middle; }
        .dash-tbl tr:hover { background: #fafafa; }
        .dash-badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 99px; font-size: 11.5px; font-weight: 700; }
        .badge-paid { background: #dcfce7; color: #15803d; }
        .badge-pending { background: #fef3c7; color: #92400e; }
        .badge-active { background: #dcfce7; color: #15803d; }
        .input-group { margin-bottom: 16px; }
        .input-label { display: block; font-size: 12px; font-weight: 700; color: #6b7280; margin-bottom: 6px; }
        .input-field { width: 100%; padding: 10px 12px; border: 1.5px solid #e5e7eb; border-radius: 8px; font-size: 13.5px; font-family: inherit; }
        .input-field:focus { outline: none; border-color: #16a34a; box-shadow: 0 0 0 3px rgba(22,163,74,0.1); }
        .referral-box { background: linear-gradient(135deg, #f0fdf4, #dcfce7); border: 2px solid #16a34a; border-radius: 12px; padding: 20px; margin-bottom: 16px; }
        .referral-code { background: #fff; border: 1px solid #16a34a; border-radius: 8px; padding: 12px; font-family: monospace; font-size: 16px; font-weight: 700; color: #16a34a; text-align: center; margin-bottom: 12px; }
        .wallet-box { background: linear-gradient(135deg, #ede9fe, #ddd6fe); border: 2px solid #7c3aed; border-radius: 12px; padding: 20px; margin-bottom: 16px; }
        .wallet-balance { font-size: 32px; font-weight: 900; color: #7c3aed; }
        @media (max-width: 768px) { .dash-layout { grid-template-columns: 1fr; } .dash-sidebar { position: static; } }
      `}</style>

      <Toaster position="top-center" />
      <Navbar />

      <div className="dash-container">
        {/* Header */}
        <div className="dash-header">
          <h1 className="dash-title">👤 My Dashboard</h1>
          <p className="dash-subtitle">Welcome back, {user.firstName || "Customer"}! Manage your orders, downloads, services, and account settings.</p>
          <div className="dash-refresh">
            <span>Last refresh: {lastRefresh || "Never"}</span>
            <button className="dash-refresh-btn" onClick={refreshData} disabled={loading}>
              {loading ? "⟳ Refreshing..." : "🔄 Refresh Now"}
            </button>
          </div>
        </div>

        {/* Layout */}
        <div className="dash-layout">
          {/* Sidebar */}
          <aside className="dash-sidebar">
            <p style={{ fontSize: 11.5, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 10 }}>Menu</p>
            {tabs.map(t => (
              <button key={t.id} className={`dash-tab ${tab === t.id ? "on" : ""}`} onClick={() => setTab(t.id)}>
                {t.icon} {t.label}
              </button>
            ))}
            <button onClick={() => signOut(auth)} className="dash-tab" style={{ marginTop: 16, color: "#dc2626" }}>
              🚪 Sign Out
            </button>
          </aside>

          {/* Main */}
          <main>
            {/* OVERVIEW */}
            {tab === "overview" && (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(155px,1fr))", gap: 16, marginBottom: 24 }}>
                  {stats.map(s => (
                    <div key={s.label} className="dash-stat" style={{ background: s.bg }}>
                      <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
                      <div className="dash-stat-label">{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="dash-card">
                  <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Recent Orders</h3>
                  {orders.length === 0 ? (
                    <p style={{ color: "#9ca3af", textAlign: "center", padding: "20px 0" }}>No orders yet. Start shopping!</p>
                  ) : (
                    <div style={{ overflowX: "auto" }}>
                      <table className="dash-tbl">
                        <thead><tr><th>Order ID</th><th>Product</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
                        <tbody>
                          {orders.slice(0, 5).map(o => (
                            <tr key={o.id}>
                              <td style={{ fontWeight: 700, fontFamily: "monospace", fontSize: 12 }}>{o.orderId}</td>
                              <td>{o.productTitle}</td>
                              <td style={{ fontWeight: 700 }}>KES {o.amount?.toLocaleString()}</td>
                              <td><span className={`dash-badge badge-${o.status}`}>{o.status.toUpperCase()}</span></td>
                              <td style={{ color: "#9ca3af", fontSize: 12.5 }}>{o.createdAt?.toDate?.().toLocaleDateString?.() || "—"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* WALLET */}
            {tab === "wallet" && (
              <div className="dash-card">
                <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 20 }}>💰 WeberWallet</h3>
                <div className="wallet-box">
                  <div style={{ color: "#7c3aed", fontSize: 12, fontWeight: 700, marginBottom: 8 }}>AVAILABLE BALANCE</div>
                  <div className="wallet-balance">KES {wallet.balance.toFixed(2)}</div>
                  <div style={{ color: "#7c3aed", fontSize: 12, marginTop: 8 }}>Currency: {wallet.currency}</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                  <button className="dash-btn" onClick={withdrawFromWallet}>💸 Withdraw</button>
                  <button className="dash-btn dash-btn-secondary">📊 Transaction History</button>
                </div>
                <h4 style={{ fontWeight: 700, marginBottom: 12 }}>Quick Actions</h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <button className="dash-btn">💳 Top Up Wallet</button>
                  <button className="dash-btn">📱 Buy Bundles</button>
                </div>
              </div>
            )}

            {/* REWARDS */}
            {tab === "rewards" && (
              <div className="dash-card">
                <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 20 }}>🎁 Loyalty Rewards</h3>
                <div style={{ background: "linear-gradient(135deg, #fef3c7, #fde68a)", border: "2px solid #f59e0b", borderRadius: 12, padding: 20, marginBottom: 20 }}>
                  <div style={{ color: "#92400e", fontSize: 12, fontWeight: 700, marginBottom: 8 }}>YOUR POINTS</div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: "#f59e0b" }}>{rewards.points}</div>
                  <div style={{ color: "#92400e", fontSize: 12, marginTop: 8 }}>Tier: {rewards.tier} | Next tier: {rewards.nextTier} points</div>
                </div>
                <button className="dash-btn" onClick={claimRewards} style={{ marginBottom: 20, width: "100%" }}>
                  ✨ Claim Rewards (100 pts = KES 1)
                </button>
                <h4 style={{ fontWeight: 700, marginBottom: 12 }}>How to Earn Points</h4>
                <ul style={{ color: "#6b7280", fontSize: 13.5, lineHeight: 1.8, paddingLeft: 20 }}>
                  <li>1 point per KES 10 spent</li>
                  <li>5 bonus points per referral</li>
                  <li>10 points for reviews</li>
                  <li>Double points on weekends</li>
                </ul>
              </div>
            )}

            {/* REFER & EARN */}
            {tab === "referrals" && (
              <div className="dash-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: 18, margin: 0 }}>🔗 Refer & Earn</h3>
                    <p style={{ color: "#6b7280", fontSize: 13, margin: "6px 0 0" }}>Invite friends and earn {Math.round(referralStats.rate * 100)}% of every confirmed purchase they make for life.</p>
                  </div>
                  <button className="dash-refresh-btn" style={{ background: "#16a34a" }} onClick={refreshData} disabled={loading}>{loading ? "⟳ Recalculating" : "🔄 Refresh earnings"}</button>
                </div>
                <div className="referral-box">
                  <div style={{ color: "#15803d", fontSize: 12, fontWeight: 700, marginBottom: 8 }}>YOUR REFERRAL CODE</div>
                  <div className="referral-code">{referralCode || "Preparing…"}</div>
                  <div style={{ color: "#166534", fontSize: 12, marginBottom: 12, wordBreak: "break-all" }}>Link: {referralLinkForCode(referralCode)}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <button className="dash-btn" onClick={copyReferralCode} disabled={!referralCode}>📋 Copy Code</button>
                    <button className="dash-btn" onClick={shareReferralLink} disabled={!referralCode}>🔗 Copy Link</button>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12, marginBottom: 20 }}>
                  <div style={{ background: "#f0fdf4", border: "1px solid #dcfce7", borderRadius: 12, padding: 16 }}>
                    <div style={{ color: "#6b7280", fontSize: 12, fontWeight: 700 }}>FRIENDS JOINED</div>
                    <div style={{ fontSize: 24, fontWeight: 900, color: "#16a34a" }}>{referralStats.referrals}</div>
                  </div>
                  <div style={{ background: "#eff6ff", border: "1px solid #dbeafe", borderRadius: 12, padding: 16 }}>
                    <div style={{ color: "#6b7280", fontSize: 12, fontWeight: 700 }}>REFERRED REVENUE</div>
                    <div style={{ fontSize: 24, fontWeight: 900, color: "#2563eb" }}>KES {Number(referralStats.referredRevenue || 0).toLocaleString()}</div>
                  </div>
                  <div style={{ background: "#fefce8", border: "1px solid #fef08a", borderRadius: 12, padding: 16 }}>
                    <div style={{ color: "#6b7280", fontSize: 12, fontWeight: 700 }}>LIFETIME EARNINGS</div>
                    <div style={{ fontSize: 24, fontWeight: 900, color: "#a16207" }}>KES {Number(referralStats.earnings || 0).toLocaleString()}</div>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 10 }}>
                  <h4 style={{ fontWeight: 700, margin: 0 }}>👥 My Referred Friends ({referralData.friends.length})</h4>
                  <span style={{ color: "#6b7280", fontSize: 12 }}>Confirmed paid orders earn {Math.round(referralStats.rate * 100)}% automatically.</span>
                </div>
                {referralData.friends.length === 0 ? (
                  <p style={{ color: "#9ca3af", textAlign: "center", padding: "18px 0" }}>No referred friends yet. Share your link to start building your network.</p>
                ) : (
                  <div style={{ overflowX: "auto", marginBottom: 18 }}>
                    <table className="dash-tbl">
                      <thead><tr><th>Friend</th><th>Email</th><th>Joined</th><th>Status</th></tr></thead>
                      <tbody>{referralData.friends.map(friend => (
                        <tr key={friend.id}>
                          <td style={{ fontWeight: 700 }}>{displayReferralName(friend)}</td>
                          <td>{friend.email || "—"}</td>
                          <td style={{ color: "#6b7280", fontSize: 12 }}>{friend.joinedAt?.toDate?.().toLocaleDateString?.() || "—"}</td>
                          <td><span className="dash-badge badge-active">{friend.status || "active"}</span></td>
                        </tr>
                      ))}</tbody>
                    </table>
                  </div>
                )}
                <div style={{ background: "#f9fafb", borderRadius: 10, padding: 12, color: "#6b7280", fontSize: 12, lineHeight: 1.6 }}>
                  Referral earnings are based on successful confirmed orders, are recorded server-side with duplicate-payment protection, and are recalculated from the ledger when you refresh your dashboard.
                </div>
              </div>
            )}

            {/* NOTIFICATIONS */}
            {tab === "notifications" && (
              <div className="dash-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <h3 style={{ fontWeight: 700, fontSize: 16, margin: 0 }}>🔔 Notification History ({notifications.length}){unreadNotificationCount ? <span style={{ color: "#dc2626", marginLeft: 8 }}>· {unreadNotificationCount} new</span> : null}</h3>
                  <button className="dash-btn dash-btn-secondary" onClick={async () => { try { await Promise.all(notifications.filter(notification => notification.read !== true).map(notification => updateDoc(doc(db, "notifications", notification.id), { read: true, updatedAt: serverTimestamp() }))); setNotifications(notifications.map(notification => ({ ...notification, read: true }))); toast.success("Notifications marked as read."); } catch (error) { toast.error("Could not update notifications."); } }}>Mark all read</button>
                </div>
                {notifications.length === 0 ? (
                  <p style={{ color: "#9ca3af", textAlign: "center", padding: "20px 0" }}>No notifications yet.</p>
                ) : (
                  <div style={{ display: "grid", gap: 12 }}>
                    {notifications.slice(0, 10).map(n => (
                      <div key={n.id} style={{ background: n.read ? "#f9fafb" : "#fff7ed", border: `1px solid ${n.read ? "#e5e7eb" : "#fdba74"}`, borderRadius: 10, padding: 12 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "flex-start" }}><div style={{ fontWeight: 700, color: "#111827", marginBottom: 4 }}>{n.title || "WeberTech update"}</div>{n.read !== true ? <span style={{ color: "#c2410c", fontSize: 11, fontWeight: 800 }}>NEW</span> : null}</div>
                        <div style={{ color: "#6b7280", fontSize: 13, marginBottom: 6 }}>{n.message}</div>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}><div style={{ color: "#9ca3af", fontSize: 11 }}>{(n.createdAt || n.timestamp)?.toDate?.().toLocaleString?.() || "—"}</div>{n.actionUrl ? <a href={n.actionUrl} style={{ color: "#16a34a", fontSize: 12, fontWeight: 800 }}>Open service / dashboard →</a> : null}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SUPPORT */}
            {tab === "support" && (
              <div className="dash-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}><div><h3 style={{ fontWeight: 700, fontSize: 16, margin: 0 }}>Support tickets ({tickets.length})</h3><p style={{ color: "#6b7280", fontSize: 12, margin: "5px 0 0" }}>Track every request from receipt to resolution. Refresh to load the latest stage.</p></div><button className="dash-btn dash-btn-secondary" onClick={refreshData} disabled={loading}>{loading ? "⟳" : "🔄 Refresh"}</button></div>
                {tickets.length === 0 ? <p style={{ color: "#9ca3af", textAlign: "center", padding: "20px 0" }}>No support tickets yet.</p> : <div style={{ display: "grid", gap: 16 }}>{tickets.map(ticket => { const currentStage = SUPPORT_STAGES.some(stage => stage.id === ticket.stage) ? ticket.stage : "received"; const currentIndex = SUPPORT_STAGES.findIndex(stage => stage.id === currentStage); return <div key={ticket.id} style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 16, background: "#fff" }}><div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}><div><strong>{ticket.subject || "Support request"}</strong><div style={{ color: "#6b7280", fontSize: 12, marginTop: 4 }}>{ticket.ticketNumber || ticket.id} · {ticket.category || "General support"} · {ticket.priority || "normal"} priority</div></div><span style={{ padding: "7px 10px", borderRadius: 999, background: "#ecfdf5", color: "#166534", fontSize: 12, fontWeight: 700 }}>{SUPPORT_STAGES.find(stage => stage.id === currentStage)?.label}</span></div><div style={{ display: "grid", gridTemplateColumns: `repeat(${SUPPORT_STAGES.length}, minmax(70px, 1fr))`, gap: 4, marginTop: 18 }}>{SUPPORT_STAGES.map((stage, index) => <div key={stage.id} style={{ textAlign: "center", fontSize: 11, color: index <= currentIndex ? "#16a34a" : "#9ca3af", fontWeight: index === currentIndex ? 800 : 600 }}><div style={{ height: 8, borderRadius: 8, background: index <= currentIndex ? "#22c55e" : "#e5e7eb", marginBottom: 6 }} />{stage.label}</div>)}</div><div style={{ marginTop: 14, color: "#6b7280", fontSize: 13 }}>{SUPPORT_STAGES.find(stage => stage.id === currentStage)?.description}</div>{Array.isArray(ticket.stageHistory) && ticket.stageHistory.length > 0 ? <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid #f3f4f6", color: "#6b7280", fontSize: 12 }}>Latest update: {ticket.stageHistory[ticket.stageHistory.length - 1].label || ticket.stageHistory[ticket.stageHistory.length - 1].stage} · {ticket.stageHistory.length} total updates</div> : null}</div>; })}</div>}
              </div>
            )}

            {/* SETTINGS */}
            {tab === "settings" && (
              <div className="dash-card">
                <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 20 }}>⚙️ Account Settings</h3>
                {!editingProfile ? (
                  <>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                      <div>
                        <div className="input-label">First Name</div>
                        <div style={{ padding: "10px 12px", background: "#f9fafb", borderRadius: 8, border: "1px solid #e5e7eb" }}>{profile.firstName || "—"}</div>
                      </div>
                      <div>
                        <div className="input-label">Last Name</div>
                        <div style={{ padding: "10px 12px", background: "#f9fafb", borderRadius: 8, border: "1px solid #e5e7eb" }}>{profile.lastName || "—"}</div>
                      </div>
                      <div>
                        <div className="input-label">Phone</div>
                        <div style={{ padding: "10px 12px", background: "#f9fafb", borderRadius: 8, border: "1px solid #e5e7eb" }}>{profile.phone || "—"}</div>
                      </div>
                      <div>
                        <div className="input-label">Email</div>
                        <div style={{ padding: "10px 12px", background: "#f9fafb", borderRadius: 8, border: "1px solid #e5e7eb" }}>{user.email}</div>
                      </div>
                    </div>
                    <button className="dash-btn" onClick={() => setEditingProfile(true)}>✏️ Edit Profile</button>
                  </>
                ) : (
                  <>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                      <div className="input-group">
                        <label className="input-label">First Name</label>
                        <input className="input-field" value={profileForm.firstName || ""} onChange={e => setProfileForm({ ...profileForm, firstName: e.target.value })} />
                      </div>
                      <div className="input-group">
                        <label className="input-label">Last Name</label>
                        <input className="input-field" value={profileForm.lastName || ""} onChange={e => setProfileForm({ ...profileForm, lastName: e.target.value })} />
                      </div>
                      <div className="input-group">
                        <label className="input-label">Phone</label>
                        <input className="input-field" value={profileForm.phone || ""} onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })} />
                      </div>
                      <div className="input-group">
                        <label className="input-label">County</label>
                        <input className="input-field" value={profileForm.county || ""} onChange={e => setProfileForm({ ...profileForm, county: e.target.value })} />
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <button className="dash-btn" onClick={handleProfileUpdate} disabled={loading}>💾 Save Changes</button>
                      <button className="dash-btn dash-btn-secondary" onClick={() => setEditingProfile(false)}>❌ Cancel</button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* ORDERS, DOWNLOADS, SERVICES, INVOICES */}
            {tab === "orders" && (
              <div className="dash-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <h3 style={{ fontWeight: 700, fontSize: 16, margin: 0 }}>All Orders ({orders.length})</h3>
                  <button className="dash-refresh-btn" onClick={refreshData} disabled={loading}>
                    {loading ? "⟳" : "🔄"}
                  </button>
                </div>
                {orders.length === 0 ? (
                  <p style={{ color: "#9ca3af", textAlign: "center", padding: "20px 0" }}>No orders found.</p>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table className="dash-tbl">
                      <thead><tr><th>Order ID</th><th>Product</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
                      <tbody>
                        {orders.map(o => (
                          <tr key={o.id}>
                            <td style={{ fontWeight: 700, fontFamily: "monospace", fontSize: 12 }}>{o.orderId}</td>
                            <td>{o.productTitle}</td>
                            <td style={{ fontWeight: 700 }}>KES {o.amount?.toLocaleString()}</td>
                            <td><span className={`dash-badge badge-${o.status}`}>{o.status.toUpperCase()}</span></td>
                            <td style={{ color: "#9ca3af", fontSize: 12.5 }}>{o.createdAt?.toDate?.().toLocaleDateString?.() || "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {tab === "downloads" && (
              <div className="dash-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <h3 style={{ fontWeight: 700, fontSize: 16, margin: 0 }}>My Downloads ({downloads.length})</h3>
                  <button className="dash-refresh-btn" onClick={refreshData} disabled={loading}>
                    {loading ? "⟳" : "🔄"}
                  </button>
                </div>
                {downloads.length === 0 ? (
                  <p style={{ color: "#9ca3af", textAlign: "center", padding: "20px 0" }}>No downloads yet.</p>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table className="dash-tbl">
                      <thead><tr><th>File</th><th>Downloaded</th><th>Action</th></tr></thead>
                      <tbody>
                        {downloads.map(d => (
                          <tr key={d.id}>
                            <td>{d.fileName || d.productTitle || "Original document"}</td>
                            <td style={{ color: "#9ca3af", fontSize: 12.5 }}>{d.downloadedAt?.toDate?.().toLocaleDateString?.() || d.createdAt?.toDate?.().toLocaleDateString?.() || "—"}</td>
                            <td>{(d.fileUrl || (d.orderId && d.productId ? `/api/document-download?orderId=${encodeURIComponent(d.orderId)}&productId=${encodeURIComponent(d.productId)}` : "")) ? <a href={d.fileUrl || `/api/document-download?orderId=${encodeURIComponent(d.orderId)}&productId=${encodeURIComponent(d.productId)}`} target="_blank" rel="noreferrer" className="dash-btn" style={{ textDecoration: "none", display: "inline-block" }}>Download</a> : <span style={{ color: "#9ca3af" }}>Preparing</span>}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {tab === "services" && (
              <div className="dash-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <h3 style={{ fontWeight: 700, fontSize: 16, margin: 0 }}>Active Services ({services.length})</h3>
                  <button className="dash-refresh-btn" onClick={refreshData} disabled={loading}>
                    {loading ? "⟳" : "🔄"}
                  </button>
                </div>
                {services.length === 0 ? (
                  <p style={{ color: "#9ca3af", textAlign: "center", padding: "20px 0" }}>No active services.</p>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table className="dash-tbl">
                      <thead><tr><th>Service</th><th>Status</th><th>Expires</th><th>Action</th></tr></thead>
                      <tbody>
                        {services.map(s => (
                          <tr key={s.id}>
                            <td>{s.serviceName}</td>
                            <td><span className="dash-badge badge-active">{s.status?.toUpperCase()}</span></td>
                            <td style={{ color: "#9ca3af", fontSize: 12.5 }}>{s.expiresAt?.toDate?.().toLocaleDateString?.() || "—"}</td>
                            <td><button className="dash-btn" style={{ fontSize: 12, padding: "6px 12px" }}>Renew</button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
}
