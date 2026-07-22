// src/pages/DashboardOverviewV2.jsx
// Enhanced Dashboard Overview — Phase 2
// Today's Activity, Pending Orders, Unread Messages, Wallet, Rewards, Coupons, Quick Actions, Recommendations

import { useState, useEffect } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../config/firebase";
import { Link } from "react-router-dom";

export default function DashboardOverviewV2({ user }) {
  const [stats, setStats] = useState({
    pendingOrders: 0,
    pendingServices: 0,
    unreadMessages: 0,
    walletBalance: 0,
    rewardPoints: 0,
    availableCoupons: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user?.uid) return;
      try {
        // Pending orders
        const ordersSnap = await getDocs(
          query(collection(db, "orders"), where("customerId", "==", user.uid), where("status", "!=", "paid"))
        );
        
        // Pending services
        const servicesSnap = await getDocs(
          query(collection(db, "services"), where("customerId", "==", user.uid), where("status", "!=", "completed"))
        );
        
        // Recent activity
        const activitySnap = await getDocs(
          query(collection(db, "activities"), where("userId", "==", user.uid), orderBy("timestamp", "desc"))
        );

        setStats(prev => ({
          ...prev,
          pendingOrders: ordersSnap.size,
          pendingServices: servicesSnap.size,
          unreadMessages: 0, // TODO: Implement messaging
          walletBalance: 0, // TODO: Implement wallet
          rewardPoints: 0, // TODO: Implement loyalty
          availableCoupons: 0, // TODO: Implement coupons
        }));

        setRecentActivity(
          activitySnap.docs.slice(0, 8).map(doc => ({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp?.toDate?.() || new Date(),
          }))
        );
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      }
      setLoading(false);
    };

    loadDashboardData();
  }, [user?.uid]);

  const QUICK_ACTIONS = [
    { icon: "⚡", label: "Buy Bundles", href: "https://bundles.webertech.co.ke", external: true },
    { icon: "📄", label: "Buy Documents", href: "/cyber/legal-documents", external: false },
    { icon: "🏛", label: "Government Services", href: "/cyber/government", external: false },
    { icon: "🛒", label: "Electronics", href: "/electronics", external: false },
    { icon: "🎓", label: "Academy", href: "/academy", external: false },
    { icon: "💻", label: "Dev Services", href: "/dev", external: false },
  ];

  const RECOMMENDATIONS = [
    { id: 1, title: "Car Sale Agreement", category: "Document", price: "KES 199" },
    { id: 2, title: "NTSA Transfer", category: "Service", price: "From KES 500" },
    { id: 3, title: "Business Registration", category: "Service", price: "From KES 1000" },
  ];

  return (
    <>
      <style>{`
        .dov2-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; margin-bottom: 24px; }
        .dov2-stat { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 14px; padding: 16px; text-align: center; }
        .dov2-stat-icon { font-size: 28px; margin-bottom: 8px; }
        .dov2-stat-value { font-size: 24px; font-weight: 900; color: #111827; }
        .dov2-stat-label { font-size: 12px; color: #9ca3af; margin-top: 4px; font-weight: 600; }
        .dov2-card { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 16px; padding: 20px; margin-bottom: 20px; }
        .dov2-card-title { font-size: 16px; font-weight: 800; margin-bottom: 16px; color: #111827; }
        .dov2-action { display: inline-flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; border-radius: 12px; text-decoration: none; color: #111827; border: 1.5px solid #e5e7eb; transition: all .15s; }
        .dov2-action:hover { border-color: #16a34a; background: #f0fdf4; }
        .dov2-action-icon { font-size: 24px; }
        .dov2-action-label { font-size: 11px; font-weight: 700; text-align: center; }
        .dov2-activity-item { padding: 12px 0; border-bottom: 1px solid #f3f4f6; display: flex; gap: 12px; align-items: flex-start; }
        .dov2-activity-item:last-child { border-bottom: none; }
        .dov2-activity-icon { font-size: 18px; flex-shrink: 0; }
        .dov2-activity-content { flex: 1; }
        .dov2-activity-desc { font-size: 13px; color: #111827; font-weight: 600; }
        .dov2-activity-time { font-size: 12px; color: #9ca3af; margin-top: 2px; }
        .dov2-rec-item { background: #f9fafb; border-radius: 12px; padding: 12px; }
        .dov2-rec-title { font-weight: 700; font-size: 13px; color: #111827; }
        .dov2-rec-cat { font-size: 11px; color: #9ca3af; margin-top: 2px; }
        .dov2-rec-price { font-size: 12px; color: #16a34a; font-weight: 700; margin-top: 4px; }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Welcome */}
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "#111827", marginBottom: 4 }}>
            Welcome back, {user?.firstName || "there"}! 👋
          </h2>
          <p style={{ color: "#6b7280", fontSize: 14.5 }}>
            Here's what's happening with your account today.
          </p>
        </div>

        {/* Key Stats Grid */}
        <div className="dov2-grid">
          <div className="dov2-stat">
            <div className="dov2-stat-icon">📋</div>
            <div className="dov2-stat-value">{stats.pendingOrders}</div>
            <div className="dov2-stat-label">Pending Orders</div>
          </div>
          <div className="dov2-stat">
            <div className="dov2-stat-icon">⚙️</div>
            <div className="dov2-stat-value">{stats.pendingServices}</div>
            <div className="dov2-stat-label">Pending Services</div>
          </div>
          <div className="dov2-stat">
            <div className="dov2-stat-icon">💬</div>
            <div className="dov2-stat-value">{stats.unreadMessages}</div>
            <div className="dov2-stat-label">Unread Messages</div>
          </div>
          <div className="dov2-stat">
            <div className="dov2-stat-icon">💰</div>
            <div className="dov2-stat-value">KES {stats.walletBalance}</div>
            <div className="dov2-stat-label">Wallet Balance</div>
          </div>
          <div className="dov2-stat">
            <div className="dov2-stat-icon">⭐</div>
            <div className="dov2-stat-value">{stats.rewardPoints}</div>
            <div className="dov2-stat-label">Reward Points</div>
          </div>
          <div className="dov2-stat">
            <div className="dov2-stat-icon">🎟️</div>
            <div className="dov2-stat-value">{stats.availableCoupons}</div>
            <div className="dov2-stat-label">Available Coupons</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dov2-card">
          <div className="dov2-card-title">Quick Actions</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))", gap: 12 }}>
            {QUICK_ACTIONS.map(action => (
              <a
                key={action.label}
                href={action.href}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noreferrer" : undefined}
                className="dov2-action"
              >
                <div className="dov2-action-icon">{action.icon}</div>
                <div className="dov2-action-label">{action.label}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Two Column Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          {/* Recent Activity */}
          <div className="dov2-card">
            <div className="dov2-card-title">Today's Activity</div>
            {loading ? (
              <p style={{ color: "#9ca3af", textAlign: "center", padding: "20px 0" }}>Loading...</p>
            ) : recentActivity.length === 0 ? (
              <p style={{ color: "#9ca3af", fontSize: 13 }}>No activity yet today.</p>
            ) : (
              <div>
                {recentActivity.map(activity => (
                  <div key={activity.id} className="dov2-activity-item">
                    <div className="dov2-activity-icon">
                      {activity.type === "login" && "🔓"}
                      {activity.type === "order_created" && "📋"}
                      {activity.type === "order_paid" && "✅"}
                      {activity.type === "download" && "⬇️"}
                      {activity.type === "service_requested" && "⚙️"}
                      {activity.type === "profile_updated" && "👤"}
                      {!["login", "order_created", "order_paid", "download", "service_requested", "profile_updated"].includes(activity.type) && "📝"}
                    </div>
                    <div className="dov2-activity-content">
                      <div className="dov2-activity-desc">{activity.description}</div>
                      <div className="dov2-activity-time">
                        {activity.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recommended For You */}
          <div className="dov2-card">
            <div className="dov2-card-title">Recommended For You</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {RECOMMENDATIONS.map(rec => (
                <div key={rec.id} className="dov2-rec-item">
                  <div className="dov2-rec-title">{rec.title}</div>
                  <div className="dov2-rec-cat">{rec.category}</div>
                  <div className="dov2-rec-price">{rec.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coupons & Wallet Info */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div className="dov2-card">
            <div className="dov2-card-title">💳 Available Coupons</div>
            <p style={{ color: "#9ca3af", fontSize: 13 }}>No active coupons at the moment. Check back soon!</p>
          </div>

          <div className="dov2-card">
            <div className="dov2-card-title">💰 Wallet & Rewards</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>Balance</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#16a34a" }}>KES {stats.walletBalance}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>Points</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#f59e0b" }}>{stats.rewardPoints}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
