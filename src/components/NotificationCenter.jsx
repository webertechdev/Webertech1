// src/components/NotificationCenter.jsx
// Real-time Notification Center — Like Facebook
// Payment, Document, Service, Bundle, Course, Discount, Support, System updates

import { useState, useEffect } from "react";
import { collection, getDocs, query, where, orderBy, updateDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

const NOTIFICATION_ICONS = {
  payment: "💳",
  document: "📄",
  service: "⚙️",
  bundle: "⚡",
  course: "🎓",
  discount: "🎟️",
  support: "💬",
  system: "🔔",
};

export default function NotificationCenter({ userId, isOpen, onClose }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!userId) return;
    loadNotifications();
    
    // Refresh every 10 seconds for real-time feel
    const interval = setInterval(loadNotifications, 10000);
    return () => clearInterval(interval);
  }, [userId]);

  const loadNotifications = async () => {
    try {
      const snap = await getDocs(
        query(
          collection(db, "notifications"),
          where("userId", "==", userId),
          orderBy("timestamp", "desc")
        )
      );
      
      const notifs = snap.docs.map(d => ({
        id: d.id,
        ...d.data(),
        timestamp: d.data().timestamp?.toDate?.() || new Date(),
      }));

      setNotifications(notifs);
      setUnreadCount(notifs.filter(n => !n.read).length);
    } catch (err) {
      console.error("Failed to load notifications:", err);
    }
    setLoading(false);
  };

  const markAsRead = async (notificationId) => {
    try {
      await updateDoc(doc(db, "notifications", notificationId), { read: true });
      loadNotifications();
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  const markAllAsRead = async () => {
    try {
      for (const notif of notifications.filter(n => !n.read)) {
        await updateDoc(doc(db, "notifications", notif.id), { read: true });
      }
      loadNotifications();
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        .nc-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.3); z-index: 900; }
        .nc-panel { position: fixed; right: 0; top: 0; bottom: 0; width: 100%; max-width: 420px; background: #fff; z-index: 901; box-shadow: -4px 0 20px rgba(0,0,0,0.15); display: flex; flex-direction: column; animation: slideIn .3s ease; }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .nc-header { padding: 16px 20px; border-bottom: 1.5px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center; flex-shrink: 0; }
        .nc-title { font-size: 18px; font-weight: 800; color: #111827; }
        .nc-badge { background: #dc2626; color: #fff; font-size: 11px; font-weight: 700; padding: 2px 6px; border-radius: 99px; margin-left: 8px; }
        .nc-close { background: none; border: none; font-size: 20px; cursor: pointer; color: #6b7280; }
        .nc-actions { padding: 12px 20px; border-bottom: 1.5px solid #e5e7eb; display: flex; gap: 8px; flex-shrink: 0; }
        .nc-action-btn { flex: 1; padding: 8px 12px; border-radius: 8px; border: 1.5px solid #e5e7eb; background: #fff; font-size: 12px; font-weight: 700; cursor: pointer; transition: all .15s; }
        .nc-action-btn:hover { border-color: #16a34a; background: #f0fdf4; color: #16a34a; }
        .nc-list { flex: 1; overflow-y: auto; }
        .nc-item { padding: 16px 20px; border-bottom: 1px solid #f3f4f6; cursor: pointer; transition: background .15s; display: flex; gap: 12px; }
        .nc-item:hover { background: #f9fafb; }
        .nc-item.unread { background: #f0fdf4; }
        .nc-item-icon { font-size: 24px; flex-shrink: 0; }
        .nc-item-content { flex: 1; }
        .nc-item-title { font-weight: 700; font-size: 13px; color: #111827; }
        .nc-item-message { font-size: 12px; color: #6b7280; margin-top: 2px; line-height: 1.4; }
        .nc-item-time { font-size: 11px; color: #9ca3af; margin-top: 4px; }
        .nc-empty { text-align: center; padding: 60px 20px; color: #9ca3af; }
        @media (max-width: 640px) { .nc-panel { max-width: 100%; } }
      `}</style>

      <div className="nc-overlay" onClick={onClose} />

      <div className="nc-panel">
        <div className="nc-header">
          <div>
            <span className="nc-title">🔔 Notifications</span>
            {unreadCount > 0 && <span className="nc-badge">{unreadCount}</span>}
          </div>
          <button className="nc-close" onClick={onClose}>✕</button>
        </div>

        {unreadCount > 0 && (
          <div className="nc-actions">
            <button className="nc-action-btn" onClick={markAllAsRead}>
              Mark all as read
            </button>
          </div>
        )}

        <div className="nc-list">
          {loading ? (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ width: 32, height: 32, border: "3px solid #e5e7eb", borderTopColor: "#16a34a", borderRadius: "50%", margin: "0 auto", animation: "spin .8s linear infinite" }} />
              <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            </div>
          ) : notifications.length === 0 ? (
            <div className="nc-empty">
              <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
              <p>No notifications yet</p>
            </div>
          ) : (
            notifications.map(notif => (
              <div
                key={notif.id}
                className={`nc-item ${!notif.read ? "unread" : ""}`}
                onClick={() => {
                  markAsRead(notif.id);
                  onClose();
                }}
              >
                <div className="nc-item-icon">
                  {NOTIFICATION_ICONS[notif.type] || "🔔"}
                </div>
                <div className="nc-item-content">
                  <div className="nc-item-title">{notif.title}</div>
                  <div className="nc-item-message">{notif.message}</div>
                  <div className="nc-item-time">
                    {notif.timestamp.toLocaleString([], {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                {!notif.read && (
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#16a34a", flexShrink: 0, marginTop: 4 }} />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
