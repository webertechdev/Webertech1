// src/services/activityTracker.js
// Track all customer activities for lifetime reference
// Logs: Login, Logout, Orders, Downloads, Services, Payments, Profile Updates, Support, Chats

import { collection, addDoc, serverTimestamp, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const ACTIVITY_TYPES = {
  LOGIN: "login",
  LOGOUT: "logout",
  ORDER_CREATED: "order_created",
  ORDER_PAID: "order_paid",
  ORDER_FAILED: "order_failed",
  DOWNLOAD: "download",
  SERVICE_REQUESTED: "service_requested",
  SERVICE_UPDATED: "service_updated",
  SERVICE_COMPLETED: "service_completed",
  PAYMENT_RECEIVED: "payment_received",
  PROFILE_UPDATED: "profile_updated",
  SUPPORT_TICKET_CREATED: "support_ticket_created",
  SUPPORT_TICKET_UPDATED: "support_ticket_updated",
  CHAT_MESSAGE: "chat_message",
  INVOICE_GENERATED: "invoice_generated",
  REFUND_REQUESTED: "refund_requested",
  NOTIFICATION_SENT: "notification_sent",
};

/**
 * Log an activity to Firestore
 * @param {string} userId - Firebase Auth UID
 * @param {string} type - Activity type (from ACTIVITY_TYPES)
 * @param {string} description - Human-readable description
 * @param {object} metadata - Additional data (orderId, productId, amount, etc.)
 */
export const logActivity = async (userId, type, description, metadata = {}) => {
  try {
    if (!userId) {
      console.warn("Activity logging: No userId provided");
      return null;
    }

    const activityDoc = {
      userId,
      type,
      description,
      metadata,
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent,
      ip: metadata.ip || "unknown", // Set server-side for security
    };

    const docRef = await addDoc(collection(db, "activities"), activityDoc);
    console.log(`Activity logged: ${type} (${docRef.id})`);
    return docRef.id;
  } catch (err) {
    console.error("Failed to log activity:", err);
  }
};

/**
 * Get user activity history
 * @param {string} userId - Firebase Auth UID
 * @param {number} limit - Number of records to fetch (default 50)
 * @returns {array} Activity records
 */
export const getUserActivity = async (userId, limit = 50) => {
  try {
    const q = query(
      collection(db, "activities"),
      where("userId", "==", userId),
      orderBy("timestamp", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.slice(0, limit).map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate?.() || new Date(),
    }));
  } catch (err) {
    console.error("Failed to fetch activity history:", err);
    return [];
  }
};

/**
 * Get activity summary for a date range
 * @param {string} userId - Firebase Auth UID
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {object} Activity summary
 */
export const getActivitySummary = async (userId, startDate, endDate) => {
  try {
    const activities = await getUserActivity(userId, 1000);
    const filtered = activities.filter(a => {
      const ts = a.timestamp;
      return ts >= startDate && ts <= endDate;
    });

    const summary = {
      total: filtered.length,
      byType: {},
      byDate: {},
    };

    filtered.forEach(activity => {
      // Count by type
      summary.byType[activity.type] = (summary.byType[activity.type] || 0) + 1;

      // Count by date
      const dateKey = activity.timestamp.toISOString().split("T")[0];
      summary.byDate[dateKey] = (summary.byDate[dateKey] || 0) + 1;
    });

    return summary;
  } catch (err) {
    console.error("Failed to get activity summary:", err);
    return null;
  }
};

// Activity logging helpers for common operations

export const logLogin = (userId) => {
  return logActivity(userId, ACTIVITY_TYPES.LOGIN, "User logged in");
};

export const logLogout = (userId) => {
  return logActivity(userId, ACTIVITY_TYPES.LOGOUT, "User logged out");
};

export const logOrderCreated = (userId, orderId, productTitle, amount) => {
  return logActivity(
    userId,
    ACTIVITY_TYPES.ORDER_CREATED,
    `Order created: ${productTitle}`,
    { orderId, productTitle, amount }
  );
};

export const logOrderPaid = (userId, orderId, amount, paymentMethod) => {
  return logActivity(
    userId,
    ACTIVITY_TYPES.ORDER_PAID,
    `Order paid via ${paymentMethod}`,
    { orderId, amount, paymentMethod }
  );
};

export const logDownload = (userId, productId, productTitle) => {
  return logActivity(
    userId,
    ACTIVITY_TYPES.DOWNLOAD,
    `Downloaded: ${productTitle}`,
    { productId, productTitle }
  );
};

export const logServiceRequested = (userId, serviceId, serviceName) => {
  return logActivity(
    userId,
    ACTIVITY_TYPES.SERVICE_REQUESTED,
    `Service requested: ${serviceName}`,
    { serviceId, serviceName }
  );
};

export const logServiceUpdated = (userId, serviceId, status) => {
  return logActivity(
    userId,
    ACTIVITY_TYPES.SERVICE_UPDATED,
    `Service status updated to: ${status}`,
    { serviceId, status }
  );
};

export const logServiceCompleted = (userId, serviceId, serviceName) => {
  return logActivity(
    userId,
    ACTIVITY_TYPES.SERVICE_COMPLETED,
    `Service completed: ${serviceName}`,
    { serviceId, serviceName }
  );
};

export const logProfileUpdated = (userId, fields) => {
  return logActivity(
    userId,
    ACTIVITY_TYPES.PROFILE_UPDATED,
    "Profile information updated",
    { fields }
  );
};

export const logSupportTicketCreated = (userId, ticketId, subject) => {
  return logActivity(
    userId,
    ACTIVITY_TYPES.SUPPORT_TICKET_CREATED,
    `Support ticket created: ${subject}`,
    { ticketId, subject }
  );
};

export const logChatMessage = (userId, conversationId, messageType) => {
  return logActivity(
    userId,
    ACTIVITY_TYPES.CHAT_MESSAGE,
    `Chat message sent (${messageType})`,
    { conversationId, messageType }
  );
};

export const logInvoiceGenerated = (userId, invoiceId, amount) => {
  return logActivity(
    userId,
    ACTIVITY_TYPES.INVOICE_GENERATED,
    `Invoice generated: KES ${amount}`,
    { invoiceId, amount }
  );
};

export const logRefundRequested = (userId, refundId, amount, reason) => {
  return logActivity(
    userId,
    ACTIVITY_TYPES.REFUND_REQUESTED,
    `Refund requested: KES ${amount} (${reason})`,
    { refundId, amount, reason }
  );
};

export default {
  ACTIVITY_TYPES,
  logActivity,
  getUserActivity,
  getActivitySummary,
  logLogin,
  logLogout,
  logOrderCreated,
  logOrderPaid,
  logDownload,
  logServiceRequested,
  logServiceUpdated,
  logServiceCompleted,
  logProfileUpdated,
  logSupportTicketCreated,
  logChatMessage,
  logInvoiceGenerated,
  logRefundRequested,
};
