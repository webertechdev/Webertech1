// src/pages/CommandCenter.jsx
// WeberTech Command Center — refresh-driven platform administration

import { useEffect, useMemo, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { toast, Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MODULES = [
  { id: "cyber", icon: "🔐", name: "Cyber Division", color: "#dc2626" },
  { id: "academy", icon: "🎓", name: "Academy", color: "#2563eb" },
  { id: "electronics", icon: "📱", name: "Electronics", color: "#7c3aed" },
  { id: "bundles", icon: "⚡", name: "Bundles", color: "#f59e0b" },
  { id: "dev", icon: "💻", name: "Dev Services", color: "#10b981" },
  { id: "hustle", icon: "🤑", name: "Hustle KE", color: "#ec4899" },
];

const SUPPORT_STAGES = [
  { id: "received", label: "Received", description: "We received your support request." },
  { id: "under_review", label: "Under review", description: "A support agent is reviewing the request." },
  { id: "in_progress", label: "In progress", description: "Our team is actively working on a solution." },
  { id: "waiting_customer", label: "Waiting for you", description: "We need information or confirmation from you." },
  { id: "resolved", label: "Resolved", description: "The requested support has been completed." },
  { id: "closed", label: "Closed", description: "This support ticket has been closed." },
];
const SUPPORT_STAGE_IDS = SUPPORT_STAGES.map(stage => stage.id);
const REQUEST_COLLECTIONS = [
  { id: "purchase_requests", label: "Checkout follow-ups" },
  { id: "academy_waitlist", label: "Academy waitlist" },
  { id: "electronics_notify", label: "Electronics requests" },
  { id: "dev_inquiries", label: "Dev inquiries" },
  { id: "cyber_notify", label: "Cyber requests" },
  { id: "hustle_waitlist", label: "Hustle waitlist" },
];

const VIEWS = [
  ["overview", "▦", "Overview"],
  ["orders", "🧾", "Orders"],
  ["transactions", "💳", "Transactions"],
  ["operations", "🗂️", "Operations"],
  ["users", "👥", "Users"],
  ["chats", "💬", "Support chats"],
  ["logs", "🛡️", "Logs & reports"],
];

function toDate(value) {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value?.toDate === "function") return value.toDate();
  if (typeof value === "object" && typeof value.seconds === "number") return new Date(value.seconds * 1000);
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatDate(value, withTime = true) {
  const date = toDate(value);
  if (!date) return "—";
  return date.toLocaleString("en-KE", withTime ? { dateStyle: "medium", timeStyle: "short" } : { dateStyle: "medium" });
}

function amountNumber(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const parsed = Number(String(value ?? "").replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function money(value) {
  return `KES ${amountNumber(value).toLocaleString("en-KE")}`;
}

function displayName(item = {}) {
  const full = [item.firstName, item.lastName].filter(Boolean).join(" ").trim();
  return item.customerName || item.name || full || item.email || item.customerEmail || item.phone || item.customerPhone || "Unknown customer";
}

function normalizeStatus(value) {
  return String(value || "unknown").toLowerCase().replace(/\s+/g, "-");
}

function paymentPhone(record = {}) {
  return record.customerPhone || record.phone || record.receivingNumber || record.paymentNumber || record.payerPhone || "";
}

function paymentReference(record = {}) {
  return record.mpesaRef || record.mpesaTxn || record.mpesaReference || record.reference || record.checkoutRequestId || record.transactionId || record.orderId || record.id || "";
}

function paymentStatus(record = {}) {
  const value = record.status || record.paymentStatus || record.state || "unknown";
  const normalized = String(value).toLowerCase();
  if (["complete", "completed", "success", "successful"].includes(normalized)) return "paid";
  if (["cancel", "canceled"].includes(normalized)) return "cancelled";
  if (["declined", "error"].includes(normalized)) return "failed";
  return normalized;
}

function productModule(order = {}, catalog = []) {
  const linkedProduct = catalog.find(product =>
    String(product.id || product.productId || "") === String(order.productId || "") ||
    (product.slug && product.slug === order.productSlug) ||
    (product.title && product.title.toLowerCase() === String(order.productTitle || "").toLowerCase())
  ) || {};
  const text = `${order.type || ""} ${order.productSlug || ""} ${order.productTitle || ""} ${order.product || ""} ${linkedProduct.division || ""} ${linkedProduct.category || ""} ${linkedProduct.subcategory || ""} ${linkedProduct.type || ""}`.toLowerCase();
  if (/cyber|legal-document|legal document|government|kra|ntsa|helb|sha|nssf|ecitizen|immigration|crb|document|printing|scanning/.test(text)) return "cyber";
  if (/academy|course|training|lesson|forex|crypto/.test(text)) return "academy";
  if (/electronics|phone|tablet|laptop|tv|accessor|power bank|router/.test(text)) return "electronics";
  if (/bundle|airtime|minutes|sms|data/.test(text)) return "bundles";
  if (/dev|website|web app|mobile app|software|system|online store/.test(text)) return "dev";
  if (/hustle|agpo|reseller|business plan|digital income/.test(text)) return "hustle";
  return MODULES.find(module => text.includes(module.id))?.id || "other";
}

function mergePaymentRecords(transactions = [], payments = []) {
  const merged = new Map();
  [...transactions, ...payments].forEach(record => {
    const key = record.orderId || record.transactionId || record.mpesaTxn || record.checkoutRequestId || record.id;
    if (!key) return;
    merged.set(String(key), { ...merged.get(String(key)), ...record, id: record.id || String(key) });
  });
  return Array.from(merged.values()).sort((a, b) => (toDate(b.updatedAt || b.createdAt)?.getTime() || 0) - (toDate(a.updatedAt || a.createdAt)?.getTime() || 0));
}

function exportCsv(fileName, rows) {
  if (!rows?.length) {
    toast.error("There is no data to export yet.");
    return;
  }
  const headers = Array.from(new Set(rows.flatMap(row => Object.keys(row))));
  const cell = value => {
    if (value === null || value === undefined) return "";
    const normalized = typeof value === "object" ? JSON.stringify(value) : String(value);
    return `"${normalized.replace(/"/g, '""')}"`;
  };
  const csv = [headers.map(cell).join(","), ...rows.map(row => headers.map(header => cell(row[header])).join(","))].join("\n");
  const blob = new Blob([`\ufeff${csv}`], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
  toast.success(`${fileName} downloaded. It opens in Excel.`);
}

async function safeCollectionRead(path, orderedField = null) {
  try {
    const ref = collection(db, path);
    const snapshot = orderedField ? await getDocs(query(ref, orderBy(orderedField, "desc"))) : await getDocs(ref);
    return snapshot.docs.map(item => ({ id: item.id, ...item.data() }));
  } catch (error) {
    try {
      const snapshot = await getDocs(collection(db, path));
      return snapshot.docs.map(item => ({ id: item.id, ...item.data() }));
    } catch (fallbackError) {
      console.warn(`Could not read ${path}`, fallbackError);
      return [];
    }
  }
}

async function writeAdminLog(action, targetId = "", metadata = {}) {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) return;
    await addDoc(collection(db, "adminLogs"), {
      adminUid: currentUser.uid,
      adminEmail: currentUser.email || "",
      action,
      targetId,
      metadata,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    // Audit logging must not block a successful administrative action.
    console.warn("Admin audit log could not be written", error);
  }
}

function flattenRequestRecords(requestGroups) {
  return requestGroups.flatMap(group => group.records.map(record => ({
    ...record,
    requestType: group.label,
    sourceCollection: group.id,
  })));
}

export default function CommandCenter() {
  const [activeModule, setActiveModule] = useState("cyber");
  const [activeView, setActiveView] = useState("overview");
  const [stats, setStats] = useState({});
  const [orders, setOrders] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [activities, setActivities] = useState([]);
  const [adminLogs, setAdminLogs] = useState([]);
  const [reports, setReports] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [services, setServices] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [supportTickets, setSupportTickets] = useState([]);
  const [referrals, setReferrals] = useState([]);
  const [referralEarnings, setReferralEarnings] = useState([]);
  const [products, setProducts] = useState([]);
  const [requestGroups, setRequestGroups] = useState([]);
  const [systemHealth, setSystemHealth] = useState("🟢 Healthy");
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [bulkAction, setBulkAction] = useState("");
  const [lastRefresh, setLastRefresh] = useState(null);
  const [lastRefreshBy, setLastRefreshBy] = useState("");
  const [search, setSearch] = useState("");

  const refreshData = async () => {
    setLoading(true);
    try {
      const [allOrders, allTransactions, allPayments, allUsers, allChats, allActivities, allAdminLogs, allReports, allDownloads, allServices, allInvoices, allNotifications, allSupportTickets, allReferrals, allReferralEarnings, allProducts, ...requestResults] = await Promise.all([
        safeCollectionRead("orders", "createdAt"),
        safeCollectionRead("transactions", "createdAt"),
        safeCollectionRead("payments", "updatedAt"),
        safeCollectionRead("users", "updatedAt"),
        safeCollectionRead("chats", "updatedAt"),
        safeCollectionRead("activities", "timestamp"),
        safeCollectionRead("adminLogs", "timestamp"),
        safeCollectionRead("reports", "date"),
        safeCollectionRead("downloads", "createdAt"),
        safeCollectionRead("services", "createdAt"),
        safeCollectionRead("invoices", "createdAt"),
        safeCollectionRead("notifications", "createdAt"),
        safeCollectionRead("supportTickets", "updatedAt"),
        safeCollectionRead("referrals", "updatedAt"),
        safeCollectionRead("referralEarnings", "createdAt"),
        safeCollectionRead("products", "updatedAt"),
        ...REQUEST_COLLECTIONS.map(collectionConfig => safeCollectionRead(collectionConfig.id, "createdAt").then(records => ({ ...collectionConfig, records }))),
      ]);

      setOrders(allOrders);
      const paymentLedger = mergePaymentRecords(allTransactions, allPayments);
      setTransactions(paymentLedger);
      setUsers(allUsers);
      setChats(allChats);
      setActivities(allActivities);
      setAdminLogs(allAdminLogs);
      setReports(allReports);
      setDownloads(allDownloads);
      setServices(allServices);
      setInvoices(allInvoices);
      setNotifications(allNotifications);
      setSupportTickets(allSupportTickets);
      setReferrals(allReferrals);
      setReferralEarnings(allReferralEarnings);
      setProducts(allProducts);
      setRequestGroups(requestResults);

      const moduleStats = {};
      MODULES.forEach(module => {
        const moduleOrders = allOrders.filter(order => productModule(order, allProducts) === module.id);
        moduleStats[module.id] = {
          totalOrders: moduleOrders.length,
          paidOrders: moduleOrders.filter(order => ["paid", "completed", "complete"].includes(normalizeStatus(order.status))).length,
          revenue: moduleOrders.filter(order => ["paid", "completed", "complete"].includes(normalizeStatus(order.status))).reduce((sum, order) => sum + amountNumber(order.amount), 0),
          pendingOrders: moduleOrders.filter(order => ["pending", "processing"].includes(normalizeStatus(order.status))).length,
          failedOrders: moduleOrders.filter(order => ["failed", "cancelled", "canceled"].includes(normalizeStatus(order.status))).length,
        };
      });
      setStats(moduleStats);
      setSystemHealth("🟢 All Systems Operational");
      setLastRefresh(new Date());
      setLastRefreshBy(auth.currentUser?.email || auth.currentUser?.uid || "Administrator");
      void writeAdminLog("read_command_center", "command-center", { collections: ["orders", "transactions", "payments", "users", "chats", "activities", "adminLogs", "reports", "downloads", "services", "invoices", "notifications", "supportTickets", "purchase_requests", "referrals", "referralEarnings", "products"], recordCounts: { orders: allOrders.length, transactions: paymentLedger.length, payments: allPayments.length, users: allUsers.length, chats: allChats.length } });
      toast.success("All Command Center data recalculated.");
    } catch (error) {
      console.error("Refresh error:", error);
      setSystemHealth("🔴 Connection Issue");
      toast.error("Some data could not be refreshed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleOrderStatus = async () => {
    if (!bulkAction || !selectedOrder) return;
    try {
      await updateDoc(doc(db, "orders", selectedOrder.id), {
        status: bulkAction,
        updatedAt: serverTimestamp(),
      });
      await writeAdminLog("order_status_updated", selectedOrder.id, { orderId: selectedOrder.orderId, status: bulkAction });
      toast.success(`Order marked as ${bulkAction}.`);
      setBulkAction("");
      setSelectedOrder(null);
      await refreshData();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update order.");
    }
  };

  const handleSupportTicketUpdate = async (ticket, stage) => {
    const stageInfo = SUPPORT_STAGES.find(item => item.id === stage) || SUPPORT_STAGES[0];
    const currentUser = auth.currentUser;
    if (!currentUser || !ticket?.id) return;
    try {
      const history = Array.isArray(ticket.stageHistory) ? ticket.stageHistory : [];
      await updateDoc(doc(db, "supportTickets", ticket.id), {
        stage,
        status: stage === "resolved" || stage === "closed" ? stage : "open",
        stageLabel: stageInfo.label,
        stageHistory: [...history, { stage, label: stageInfo.label, note: stageInfo.description, updatedBy: currentUser.uid, updatedAt: new Date().toISOString() }],
        updatedAt: serverTimestamp(),
        lastUpdatedBy: currentUser.uid,
      });
      if (ticket.customerId || ticket.userId) {
        await addDoc(collection(db, "notifications"), { userId: ticket.customerId || ticket.userId, type: "support_ticket_update", ticketId: ticket.id, title: `Support ticket ${stageInfo.label}`, message: `${ticket.subject || "Your support request"}: ${stageInfo.description}`, read: false, createdAt: serverTimestamp(), actionUrl: "/dashboard?tab=support" });
      }
      await writeAdminLog("support_ticket_stage_updated", ticket.id, { stage, stageLabel: stageInfo.label, customerId: ticket.customerId || ticket.userId });
      toast.success(`Ticket moved to ${stageInfo.label}.`);
      await refreshData();
    } catch (error) {
      console.error(error);
      toast.error("Could not update support ticket.");
    }
  };
  const handleDeleteAdminLog = async (log) => {
    if (!window.confirm("Delete this admin audit entry? This cannot be undone.")) return;
    try {
      await deleteDoc(doc(db, "adminLogs", log.id));
      toast.success("Audit entry deleted.");
      await writeAdminLog("admin_log_deleted", log.id);
      await refreshData();
    } catch (error) {
      toast.error("Could not delete the audit entry.");
    }
  };

  const currentModule = MODULES.find(module => module.id === activeModule);
  const moduleStats = stats[activeModule] || {};
  const allRequests = useMemo(() => flattenRequestRecords(requestGroups).sort((a, b) => {
    const priority = value => value?.priority === "high" ? 0 : value?.priority === "medium" ? 1 : 2;
    const unread = value => value?.adminUnread || String(value?.status || "").toLowerCase() === "new" ? 0 : 1;
    return (priority(a) - priority(b)) || (unread(a) - unread(b)) || ((toDate(b.createdAt || b.timestamp)?.getTime() || 0) - (toDate(a.createdAt || a.timestamp)?.getTime() || 0));
  }), [requestGroups]);
  const unreadPurchaseRequests = allRequests.filter(request => request.sourceCollection === "purchase_requests" && (request.adminUnread || String(request.status || "").toLowerCase() === "new"));
  const totals = useMemo(() => {
    const paidOrders = orders.filter(order => ["paid", "completed", "complete"].includes(normalizeStatus(order.status)));
    return {
      revenue: paidOrders.reduce((sum, order) => sum + amountNumber(order.amount), 0),
      paidOrders: paidOrders.length,
      pendingOrders: orders.filter(order => ["pending", "processing"].includes(normalizeStatus(order.status))).length,
      failedOrders: orders.filter(order => ["failed", "cancelled", "canceled"].includes(normalizeStatus(order.status))).length,
      unreadChats: chats.reduce((sum, chat) => sum + Number(chat.adminUnreadCount || 0), 0),
      downloads: downloads.length,
      services: services.length,
      supportTickets: supportTickets.length,
      confirmedCommissions: referralEarnings.filter(item => ["confirmed", "paid", "completed"].includes(normalizeStatus(item.status))).reduce((sum, item) => sum + amountNumber(item.commissionAmount ?? item.earnedAmount), 0),
    };
  }, [orders, chats, downloads, services, supportTickets, referralEarnings]);

  const filteredUsers = useMemo(() => {
    const needle = search.trim().toLowerCase();
    if (!needle) return users;
    return users.filter(user => `${displayName(user)} ${user.email || ""} ${user.phone || ""} ${user.referralCode || ""} ${user.role || ""}`.toLowerCase().includes(needle));
  }, [users, search]);

  const filteredOrders = useMemo(() => {
    const needle = search.trim().toLowerCase();
    if (!needle) return orders;
    return orders.filter(order => `${order.orderId || ""} ${order.productTitle || ""} ${displayName(order)} ${order.customerEmail || ""} ${order.status || ""}`.toLowerCase().includes(needle));
  }, [orders, search]);

  const filteredTransactions = useMemo(() => {
    const needle = search.trim().toLowerCase();
    if (!needle) return transactions;
    return transactions.filter(transaction => `${paymentReference(transaction)} ${displayName(transaction)} ${paymentStatus(transaction)} ${paymentPhone(transaction)} ${transaction.customerEmail || ""}`.toLowerCase().includes(needle));
  }, [transactions, search]);

  const selectedUserId = selectedUser ? (selectedUser.uid || selectedUser.id) : "";
  const userOrders = selectedUser ? orders.filter(order => order.userId === selectedUserId || order.customerId === selectedUserId || order.customerEmail === selectedUser.email || order.email === selectedUser.email) : [];
  const userTransactions = selectedUser ? transactions.filter(transaction => transaction.userId === selectedUserId || transaction.customerEmail === selectedUser.email || transaction.email === selectedUser.email || paymentPhone(transaction) === selectedUser.phone) : [];
  const userChats = selectedUser ? chats.filter(chat => chat.userId === selectedUserId || chat.customerId === selectedUserId || chat.customerEmail === selectedUser.email || chat.email === selectedUser.email) : [];
  const storedUserDownloads = selectedUser ? downloads.filter(item => item.customerId === selectedUserId || item.userId === selectedUserId || item.customerEmail === selectedUser.email) : [];
  const paidUserDocumentEntitlements = selectedUser ? userOrders
    .filter(order => ["paid", "completed", "complete"].includes(normalizeStatus(order.status)) && ["document", "legal-document", "service-document"].includes(String(order.type || "").toLowerCase()) && order.productId)
    .filter(order => !storedUserDownloads.some(download => download.orderId === (order.orderId || order.id)))
    .map(order => ({
      id: `entitlement-${order.orderId || order.id}`,
      orderId: order.orderId || order.id,
      customerId: selectedUserId,
      productId: order.productId,
      productSlug: order.productSlug || "",
      productTitle: order.productTitle || "Original document",
      fileName: order.productTitle ? `${order.productTitle}.pdf` : "webertech-document.pdf",
      status: "paid",
      entitlement: true,
      createdAt: order.updatedAt || order.createdAt,
    })) : [];
  const userDownloads = [...storedUserDownloads, ...paidUserDocumentEntitlements];
  const userServices = selectedUser ? services.filter(item => item.customerId === selectedUserId || item.userId === selectedUserId || item.customerEmail === selectedUser.email) : [];
  const userInvoices = selectedUser ? invoices.filter(item => item.customerId === selectedUserId || item.userId === selectedUserId || item.customerEmail === selectedUser.email) : [];
  const userNotifications = selectedUser ? notifications.filter(item => item.customerId === selectedUserId || item.userId === selectedUserId || item.customerEmail === selectedUser.email) : [];
  const userTickets = selectedUser ? supportTickets.filter(item => item.customerId === selectedUserId || item.userId === selectedUserId || item.customerEmail === selectedUser.email) : [];
  const userReferrals = selectedUser ? referrals.filter(item => item.userId === selectedUserId || item.referrerId === selectedUserId) : [];
  const userReferralEarnings = selectedUser ? referralEarnings.filter(item => item.referrerId === selectedUserId || item.referredUserId === selectedUserId || item.customerId === selectedUserId) : [];
  const userActivities = selectedUser ? activities.filter(activity => activity.userId === selectedUserId) : [];

  const commonButton = { background: "rgba(22,163,74,0.18)", color: "#86efac", border: "1px solid rgba(134,239,172,0.25)", borderRadius: 8, padding: "7px 11px", cursor: "pointer", fontSize: 12, fontWeight: 700 };

  return (
    <>
      <style>{`
        body { font-family: 'Segoe UI', system-ui, sans-serif; background: #0f172a; }
        .cmd-container { padding-top: 64px; background: radial-gradient(circle at top right, rgba(22,163,74,.14), transparent 32%), linear-gradient(135deg, #0f172a 0%, #1e293b 100%); min-height: 100vh; color: #fff; }
        .cmd-header { background: linear-gradient(135deg, #172033, #334155); padding: 30px 20px 22px; border-bottom: 2px solid #16a34a; }
        .cmd-header-inner, .cmd-layout { max-width: 1500px; margin: 0 auto; }
        .cmd-title { color: #fff; font-size: clamp(24px, 4vw, 34px); font-weight: 900; margin: 0; }
        .cmd-subtitle { color: rgba(255,255,255,.64); font-size: 14px; margin: 5px 0 0; }
        .cmd-refresh-bar { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-top: 18px; padding: 12px 14px; background: rgba(255,255,255,.07); border: 1px solid rgba(22,163,74,.3); border-radius: 12px; }
        .cmd-refresh-time { color: rgba(255,255,255,.62); font-size: 12px; flex: 1; }
        .cmd-refresh-btn { background: #16a34a; color: #fff; border: none; padding: 8px 14px; border-radius: 8px; font-weight: 800; cursor: pointer; transition: all .2s; }
        .cmd-refresh-btn:hover { background: #15803d; transform: translateY(-1px); }
        .cmd-refresh-btn:disabled { opacity: .5; cursor: not-allowed; transform: none; }
        .cmd-nav { max-width: 1500px; margin: 0 auto; padding: 14px 20px 0; display: flex; gap: 8px; overflow-x: auto; }
        .cmd-nav button { flex: 0 0 auto; padding: 9px 13px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.12); border-radius: 9px; color: rgba(255,255,255,.72); cursor: pointer; font-weight: 700; }
        .cmd-nav button.active { background: #16a34a; border-color: #16a34a; color: #fff; }
        .cmd-layout { display: grid; grid-template-columns: 250px 1fr; gap: 20px; padding: 20px; }
        .cmd-sidebar { background: rgba(30,41,59,.82); border: 1px solid rgba(22,163,74,.22); border-radius: 16px; padding: 16px; height: fit-content; position: sticky; top: 80px; }
        .cmd-module-btn { width: 100%; padding: 12px; border: none; border-radius: 11px; background: rgba(255,255,255,.05); color: rgba(255,255,255,.72); cursor: pointer; font-size: 13px; font-weight: 600; text-align: left; margin-bottom: 7px; transition: all .2s; display: flex; align-items: center; gap: 9px; }
        .cmd-module-btn:hover { background: rgba(22,163,74,.15); color: #86efac; }
        .cmd-module-btn.active { background: #16a34a; color: #fff; box-shadow: 0 4px 12px rgba(22,163,74,.32); }
        .cmd-main { display: flex; flex-direction: column; gap: 18px; min-width: 0; }
        .cmd-card { background: rgba(30,41,59,.68); border: 1px solid rgba(22,163,74,.2); border-radius: 16px; padding: 20px; box-shadow: 0 12px 30px rgba(0,0,0,.12); }
        .cmd-card-header { display: flex; flex-wrap: wrap; gap: 10px; justify-content: space-between; align-items: center; margin-bottom: 15px; }
        .cmd-card-title { color: #fff; font-size: 16px; font-weight: 800; margin: 0; }
        .cmd-card-subtitle { color: rgba(255,255,255,.55); font-size: 12px; margin: 4px 0 0; }
        .cmd-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; }
        .cmd-stat-box { background: linear-gradient(145deg, rgba(22,163,74,.14), rgba(15,23,42,.26)); border: 1px solid rgba(22,163,74,.3); border-radius: 12px; padding: 16px; text-align: center; }
        .cmd-stat-value { font-size: clamp(20px, 3vw, 28px); font-weight: 900; color: #4ade80; }
        .cmd-stat-label { font-size: 10px; color: rgba(255,255,255,.6); margin-top: 5px; text-transform: uppercase; letter-spacing: .5px; }
        .cmd-table-wrap { overflow-x: auto; border: 1px solid rgba(255,255,255,.08); border-radius: 10px; }
        .cmd-table { width: 100%; border-collapse: collapse; min-width: 760px; }
        .cmd-table th { padding: 11px; text-align: left; font-size: 10px; font-weight: 800; color: rgba(255,255,255,.54); text-transform: uppercase; letter-spacing: .4px; background: rgba(15,23,42,.34); border-bottom: 1px solid rgba(22,163,74,.22); }
        .cmd-table td { padding: 12px 11px; border-bottom: 1px solid rgba(22,163,74,.1); color: rgba(255,255,255,.82); font-size: 12px; vertical-align: top; }
        .cmd-table tr:last-child td { border-bottom: none; }
        .cmd-table tr:hover { background: rgba(22,163,74,.06); }
        .cmd-badge { display: inline-block; padding: 4px 9px; border-radius: 99px; font-size: 10px; font-weight: 800; text-transform: uppercase; }
        .cmd-badge-paid, .cmd-badge-completed, .cmd-badge-complete { background: rgba(34,197,94,.2); color: #86efac; }
        .cmd-badge-pending, .cmd-badge-processing { background: rgba(251,146,60,.2); color: #fdba74; }
        .cmd-badge-failed, .cmd-badge-cancelled, .cmd-badge-canceled { background: rgba(239,68,68,.2); color: #fca5a5; }
        .cmd-badge-unknown { background: rgba(148,163,184,.18); color: #cbd5e1; }
        .cmd-btn { background: #16a34a; color: #fff; border: none; border-radius: 9px; padding: 9px 14px; font-weight: 800; cursor: pointer; transition: all .2s; }
        .cmd-btn:hover { background: #15803d; transform: translateY(-1px); }
        .cmd-btn-danger { background: #b91c1c; }
        .cmd-btn-danger:hover { background: #991b1b; }
        .cmd-search { width: min(100%, 360px); padding: 10px 12px; color: #fff; background: rgba(15,23,42,.72); border: 1px solid rgba(134,239,172,.24); border-radius: 9px; outline: none; }
        .cmd-search:focus { border-color: #4ade80; box-shadow: 0 0 0 3px rgba(74,222,128,.12); }
        .cmd-empty { padding: 28px 12px; text-align: center; color: rgba(255,255,255,.52); font-size: 13px; }
        .cmd-profile-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; margin: 12px 0 18px; }
        .cmd-profile-field { background: rgba(15,23,42,.34); border: 1px solid rgba(255,255,255,.08); border-radius: 9px; padding: 10px; }
        .cmd-profile-field small { display: block; text-transform: uppercase; color: rgba(255,255,255,.45); font-size: 9px; font-weight: 800; margin-bottom: 4px; }
        .cmd-profile-field strong { font-size: 12px; color: #f8fafc; word-break: break-word; }
        .cmd-mini-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 10px; }
        .cmd-mini-card { padding: 13px; border-radius: 11px; background: rgba(22,163,74,.09); border: 1px solid rgba(22,163,74,.2); }
        .cmd-mini-card strong { display: block; font-size: 20px; color: #86efac; }
        .cmd-mini-card span { font-size: 11px; color: rgba(255,255,255,.58); }
        @media (max-width: 960px) { .cmd-layout { grid-template-columns: 1fr; } .cmd-sidebar { position: static; } .cmd-module-btn { display: inline-flex; width: calc(50% - 5px); margin-right: 5px; } }
        @media (max-width: 600px) { .cmd-layout { padding: 14px; } .cmd-header { padding: 24px 14px 18px; } .cmd-nav { padding-left: 14px; padding-right: 14px; } .cmd-card { padding: 14px; } .cmd-module-btn { width: 100%; margin-right: 0; } }
      `}</style>

      <Toaster position="top-center" />
      <Navbar />

      <div className="cmd-container">
        <header className="cmd-header">
          <div className="cmd-header-inner">
            <h1 className="cmd-title">⚡ WeberTech Command Center</h1>
            <p className="cmd-subtitle">Total Platform Control • Manual Refresh • Audited Admin Actions</p>
            <div className="cmd-refresh-bar">
              <span style={{ fontSize: 22 }}>{systemHealth}</span>
              <span className="cmd-refresh-time">Last refresh: {lastRefresh ? formatDate(lastRefresh) : "Never"}{lastRefreshBy ? ` · by ${lastRefreshBy}` : ""} · {users.length} users · {orders.length} orders · {transactions.length} transactions</span>
              <button className="cmd-refresh-btn" onClick={refreshData} disabled={loading}>{loading ? "⟳ Recalculating..." : "🔄 Refresh All Data"}</button>
            </div>
          </div>
        </header>

        <nav className="cmd-nav" aria-label="Command Center modules">
          {VIEWS.map(([id, icon, label]) => (
            <button key={id} className={activeView === id ? "active" : ""} onClick={() => setActiveView(id)}>{icon} {label}</button>
          ))}
        </nav>

        <div className="cmd-layout">
          <aside className="cmd-sidebar">
            <p style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,.5)", textTransform: "uppercase", margin: "0 0 11px" }}>Service modules</p>
            {MODULES.map(module => (
              <button key={module.id} className={`cmd-module-btn ${activeModule === module.id ? "active" : ""}`} onClick={() => { setActiveModule(module.id); setActiveView("overview"); }}>
                <span style={{ fontSize: 18 }}>{module.icon}</span>
                <div><div style={{ fontWeight: 800 }}>{module.name}</div><div style={{ fontSize: 10, opacity: .7 }}>{stats[module.id]?.totalOrders || 0} orders · {money(stats[module.id]?.revenue || 0)}</div></div>
              </button>
            ))}
            <div style={{ marginTop: 14, padding: 12, background: "rgba(15,23,42,.35)", borderRadius: 11, color: "rgba(255,255,255,.55)", fontSize: 11, lineHeight: 1.6 }}>
              <strong style={{ color: "#86efac" }}>Refresh policy</strong><br />General collections load only when you use Refresh All Data. Message listeners stay on the active support thread only.
            </div>
          </aside>

          <main className="cmd-main">
            {unreadPurchaseRequests.length > 0 && (
              <section className="cmd-card" style={{ borderColor: "rgba(251,191,36,.6)", background: "rgba(120,53,15,.22)" }}>
                <div className="cmd-card-header"><div><h2 className="cmd-card-title">🔔 Checkout follow-ups ({unreadPurchaseRequests.length})</h2><p className="cmd-card-subtitle">Priority purchase outcomes requiring customer care. They are sorted above older inbox records.</p></div><button style={commonButton} onClick={() => { setActiveView("logs"); setSearch(""); }}>Open priority requests</button></div>
                <div style={{ display: "grid", gap: 8 }}>{unreadPurchaseRequests.slice(0, 3).map(request => <div key={`${request.sourceCollection}-${request.id}`} style={{ padding: 10, borderRadius: 9, background: "rgba(15,23,42,.35)" }}><strong>{request.title || request.requestType || "Checkout request"}</strong><div style={{ fontSize: 12, marginTop: 3 }}>{displayName(request)} · {request.service || request.productTitle || "WeberTech service"} · {request.customerPhone || request.phone || request.customerEmail || request.email || "No contact"}</div></div>)}</div>
              </section>
            )}
            {(activeView === "overview" || activeView === "orders") && (
              <section className="cmd-card">
                <div className="cmd-card-header">
                  <div><h2 className="cmd-card-title">{currentModule?.name} — Dashboard</h2><p className="cmd-card-subtitle">Calculated from the current orders snapshot.</p></div>
                  <button className="cmd-refresh-btn" onClick={refreshData} disabled={loading}>{loading ? "⟳" : "🔄"}</button>
                </div>
                <div className="cmd-stats">
                  <div className="cmd-stat-box"><div className="cmd-stat-value">{moduleStats.totalOrders || 0}</div><div className="cmd-stat-label">Module orders</div></div>
                  <div className="cmd-stat-box"><div className="cmd-stat-value">{money(moduleStats.revenue || 0)}</div><div className="cmd-stat-label">Paid revenue</div></div>
                  <div className="cmd-stat-box"><div className="cmd-stat-value" style={{ color: "#fdba74" }}>{moduleStats.pendingOrders || 0}</div><div className="cmd-stat-label">Pending</div></div>
                  <div className="cmd-stat-box"><div className="cmd-stat-value">{moduleStats.paidOrders || 0}</div><div className="cmd-stat-label">Completed</div></div>
                  <div className="cmd-stat-box"><div className="cmd-stat-value" style={{ color: "#fca5a5" }}>{moduleStats.failedOrders || 0}</div><div className="cmd-stat-label">Failed</div></div>
                </div>
              </section>
            )}

            {activeView === "overview" && (
              <>
                <section className="cmd-card">
                  <div className="cmd-card-header"><div><h2 className="cmd-card-title">Platform snapshot</h2><p className="cmd-card-subtitle">All totals recalculate after every explicit refresh.</p></div><button style={commonButton} onClick={() => exportCsv("webertech-platform-summary.csv", [{ metric: "Users", value: users.length }, { metric: "Orders", value: orders.length }, { metric: "Paid orders", value: totals.paidOrders }, { metric: "Revenue", value: totals.revenue }, { metric: "Transactions", value: transactions.length }, { metric: "Support chats", value: chats.length }, { metric: "Requests", value: allRequests.length }])}>⬇ Export summary</button></div>
                  <div className="cmd-mini-grid">
                    <div className="cmd-mini-card"><strong>{users.length}</strong><span>Registered users</span></div>
                    <div className="cmd-mini-card"><strong>{orders.length}</strong><span>Total orders</span></div>
                    <div className="cmd-mini-card"><strong>{money(totals.revenue)}</strong><span>Confirmed revenue</span></div>
                    <div className="cmd-mini-card"><strong>{transactions.length}</strong><span>Payment records</span></div>
                    <div className="cmd-mini-card"><strong>{chats.length}</strong><span>Support threads</span></div>
                    <div className="cmd-mini-card"><strong>{allRequests.length}</strong><span>Inbound requests</span></div>
                  </div>
                </section>
                <section className="cmd-card">
                  <div className="cmd-card-header"><div><h3 className="cmd-card-title">Recent orders</h3><p className="cmd-card-subtitle">Showing the latest 10 records across all modules.</p></div><button style={commonButton} onClick={() => { setActiveView("orders"); setSearch(""); }}>View all orders</button></div>
                  <OrderTable rows={orders.slice(0, 10)} products={products} onManage={setSelectedOrder} onCustomer={user => { setSelectedUser(user); setActiveView("users"); }} users={users} />
                </section>
              </>
            )}

            {activeView === "orders" && (
              <section className="cmd-card">
                <div className="cmd-card-header"><div><h2 className="cmd-card-title">Orders ledger ({filteredOrders.length})</h2><p className="cmd-card-subtitle">Status, customer, product, module, payment and management history.</p></div><div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}><input className="cmd-search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search order, customer, product, status" /><button style={commonButton} onClick={() => exportCsv("webertech-orders.csv", filteredOrders.map(order => ({ orderId: order.orderId || order.id, product: order.productTitle, module: productModule(order, products), amount: amountNumber(order.amount), status: order.status, customer: displayName(order), email: order.customerEmail || order.email, createdAt: formatDate(order.createdAt) })))}>⬇ Excel CSV</button></div></div>
                <OrderTable rows={filteredOrders} products={products} onManage={setSelectedOrder} onCustomer={user => { setSelectedUser(user); setActiveView("users"); }} users={users} />
              </section>
            )}

            {selectedOrder && (activeView === "overview" || activeView === "orders") && (
              <section className="cmd-card" style={{ background: "rgba(22,163,74,.1)", borderColor: "rgba(22,163,74,.42)" }}>
                <div className="cmd-card-header"><div><h3 className="cmd-card-title">Manage order: {selectedOrder.orderId || selectedOrder.id}</h3><p className="cmd-card-subtitle">Any status change is written to the admin audit log.</p></div><button style={commonButton} onClick={() => setSelectedOrder(null)}>Close</button></div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "end" }}>
                  <label style={{ color: "rgba(255,255,255,.72)", fontSize: 12, fontWeight: 700 }}>Update status<select value={bulkAction} onChange={event => setBulkAction(event.target.value)} style={{ display: "block", minWidth: 210, padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(22,163,74,.3)", background: "#1e293b", color: "#fff", marginTop: 6 }}><option value="">Select status...</option><option value="paid">Mark as Paid</option><option value="pending">Mark as Pending</option><option value="processing">Mark as Processing</option><option value="failed">Mark as Failed</option><option value="cancelled">Mark as Cancelled</option></select></label>
                  <button onClick={handleOrderStatus} className="cmd-btn" disabled={!bulkAction}>Apply status</button>
                  <button onClick={() => { const owner = users.find(user => user.uid === selectedOrder.userId || user.email === selectedOrder.customerEmail); if (owner) { setSelectedUser(owner); setActiveView("users"); } }} style={commonButton}>View customer profile</button>
                </div>
              </section>
            )}

            {activeView === "transactions" && (
              <section className="cmd-card">
                <div className="cmd-card-header"><div><h2 className="cmd-card-title">Transaction history ({filteredTransactions.length})</h2><p className="cmd-card-subtitle">M-PESA, NestLink and other payment records loaded on refresh.</p></div><div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}><input className="cmd-search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search receipt, phone, customer, status" /><button style={commonButton} onClick={() => exportCsv("webertech-transactions.csv", filteredTransactions.map(transaction => ({ id: transaction.id, orderId: transaction.orderId, mpesaReference: paymentReference(transaction), method: transaction.method || transaction.paymentMethod, amount: transaction.amount, status: paymentStatus(transaction), customer: displayName(transaction), phone: paymentPhone(transaction), email: transaction.customerEmail || transaction.email, resultCode: transaction.resultCode, error: transaction.failReason, date: transaction.date, createdAt: formatDate(transaction.createdAt) })))}>⬇ Excel CSV</button></div></div>
                <div className="cmd-table-wrap"><table className="cmd-table"><thead><tr><th>Reference</th><th>Payment / receipt</th><th>Customer</th><th>Phone</th><th>Amount</th><th>Status</th><th>Recorded</th></tr></thead><tbody>{filteredTransactions.length ? filteredTransactions.map(transaction => <tr key={transaction.id}><td style={{ fontFamily: "monospace", fontSize: 11 }}>{transaction.wtRef || transaction.orderId || transaction.id}</td><td>{paymentReference(transaction) || "—"}</td><td>{displayName(transaction)}<div style={{ color: "rgba(255,255,255,.45)", fontSize: 10 }}>{transaction.email || transaction.customerEmail || ""}</div></td><td>{paymentPhone(transaction) || "—"}</td><td>{money(transaction.amount)}</td><td><span className={`cmd-badge cmd-badge-${normalizeStatus(paymentStatus(transaction))}`}>{paymentStatus(transaction)}</span></td><td>{formatDate(transaction.createdAt || transaction.date)}</td></tr>) : <tr><td colSpan="7"><div className="cmd-empty">No transaction records found.</div></td></tr>}</tbody></table></div>
              </section>
            )}

            {activeView === "operations" && (
              <>
                <section className="cmd-card"><div className="cmd-card-header"><div><h2 className="cmd-card-title">Operational records</h2><p className="cmd-card-subtitle">All supporting platform collections are loaded only when Refresh All Data is used.</p></div><button style={commonButton} onClick={() => exportCsv("webertech-all-operations.csv", [...downloads.map(item => ({ source: "download", id: item.id, customerId: item.customerId || item.userId, title: item.productTitle || item.productId, orderId: item.orderId, status: item.status, date: formatDate(item.createdAt) })), ...services.map(item => ({ source: "service", id: item.id, customerId: item.customerId || item.userId, title: item.serviceName || item.name, status: item.status, date: formatDate(item.createdAt) })), ...invoices.map(item => ({ source: "invoice", id: item.invoiceNumber || item.id, customerId: item.customerId || item.userId, amount: item.amount, status: item.status, date: formatDate(item.createdAt) })), ...supportTickets.map(item => ({ source: "support_ticket", id: item.id, customerId: item.customerId || item.userId, subject: item.subject, status: item.status, date: formatDate(item.updatedAt || item.createdAt) }))])}>⬇ Export operations</button></div><div className="cmd-mini-grid"><div className="cmd-mini-card"><strong>{downloads.length}</strong><span>Downloads</span></div><div className="cmd-mini-card"><strong>{services.length}</strong><span>Services</span></div><div className="cmd-mini-card"><strong>{invoices.length}</strong><span>Invoices</span></div><div className="cmd-mini-card"><strong>{notifications.length}</strong><span>Notifications</span></div><div className="cmd-mini-card"><strong>{supportTickets.length}</strong><span>Support tickets</span></div><div className="cmd-mini-card"><strong>{products.length}</strong><span>Products</span></div><div className="cmd-mini-card"><strong>{referrals.length}</strong><span>Referral profiles</span></div><div className="cmd-mini-card"><strong>{money(totals.confirmedCommissions)}</strong><span>Confirmed commissions</span></div></div></section>
                <SimpleDataTable title={`Downloads (${downloads.length})`} rows={downloads} exportName="webertech-downloads.csv" columns={[{ label: "Download", key: "id" }, { label: "Customer", key: "customerId" }, { label: "Product", key: "productTitle" }, { label: "Order", key: "orderId" }, { label: "Status", key: "status" }, { label: "Created", key: "createdAt", render: value => formatDate(value) }]} />
                <SimpleDataTable title={`Services (${services.length})`} rows={services} exportName="webertech-services.csv" columns={[{ label: "Service", key: "serviceName" }, { label: "Customer", key: "customerId" }, { label: "Assigned to", key: "assignedTo" }, { label: "Status", key: "status" }, { label: "Created", key: "createdAt", render: value => formatDate(value) }, { label: "Updated", key: "updatedAt", render: value => formatDate(value) }]} />
                <SimpleDataTable title={`Invoices (${invoices.length})`} rows={invoices} exportName="webertech-invoices.csv" columns={[{ label: "Invoice", key: "invoiceNumber" }, { label: "Customer", key: "customerId" }, { label: "Amount", key: "amount", render: value => money(value) }, { label: "Status", key: "status" }, { label: "Due", key: "dueDate", render: value => formatDate(value, false) }, { label: "Created", key: "createdAt", render: value => formatDate(value) }]} />
                <SimpleDataTable title={`Notifications (${notifications.length})`} rows={notifications} exportName="webertech-notifications.csv" columns={[{ label: "Notification", key: "id" }, { label: "Customer", key: "customerId" }, { label: "Type", key: "type" }, { label: "Subject", key: "subject" }, { label: "Read", key: "read", render: value => value ? "Read" : "Unread" }, { label: "Created", key: "createdAt", render: value => formatDate(value) }]} />
                <section className="cmd-card"><div className="cmd-card-header"><div><h2 className="cmd-card-title">Support tickets ({supportTickets.length})</h2><p className="cmd-card-subtitle">Move each request through a transparent stage until it is resolved or closed.</p></div><button style={commonButton} onClick={() => exportCsv("webertech-support-tickets.csv", supportTickets.map(ticket => ({ ticket: ticket.ticketNumber || ticket.id, customer: ticket.customerId || ticket.userId, subject: ticket.subject, category: ticket.category, priority: ticket.priority, stage: ticket.stageLabel || ticket.stage || "Received", status: ticket.status || "open", updated: formatDate(ticket.updatedAt || ticket.createdAt) })))}>⬇ Export tickets</button></div><div className="cmd-table-wrap"><table className="cmd-table"><thead><tr><th>Ticket</th><th>Customer</th><th>Subject</th><th>Priority</th><th>Stage</th><th>Progress</th><th>Update</th></tr></thead><tbody>{supportTickets.map(ticket => { const currentStage = SUPPORT_STAGE_IDS.includes(ticket.stage) ? ticket.stage : (String(ticket.status || "").toLowerCase() === "resolved" ? "resolved" : "received"); const index = SUPPORT_STAGE_IDS.indexOf(currentStage); return <tr key={ticket.id}><td style={{ fontFamily: "monospace", fontSize: 11 }}>{ticket.ticketNumber || ticket.id}</td><td>{displayName(ticket)}<br /><span style={{ fontSize: 10, color: "rgba(255,255,255,.5)" }}>{ticket.customerEmail || ticket.email || ticket.customerId || ticket.userId || "—"}</span></td><td><strong>{ticket.subject || "Support request"}</strong><div style={{ fontSize: 11, color: "rgba(255,255,255,.6)" }}>{ticket.category || "General support"}</div></td><td>{ticket.priority || "normal"}</td><td><span className={`cmd-badge cmd-badge-${currentStage === "resolved" || currentStage === "closed" ? "paid" : "pending"}`}>{SUPPORT_STAGES.find(stage => stage.id === currentStage)?.label || currentStage}</span></td><td><div style={{ minWidth: 180, fontSize: 10, color: "rgba(255,255,255,.65)" }}>{SUPPORT_STAGES.map((stage, stageIndex) => <span key={stage.id} style={{ color: stageIndex <= index ? "#86efac" : "rgba(255,255,255,.35)", marginRight: 4 }}>●</span>)}</div><div style={{ fontSize: 10, color: "rgba(255,255,255,.5)" }}>{Array.isArray(ticket.stageHistory) ? `${ticket.stageHistory.length} updates` : "Initial stage"} · {formatDate(ticket.updatedAt || ticket.createdAt)}</div></td><td><select value={currentStage} onChange={event => handleSupportTicketUpdate(ticket, event.target.value)} style={{ background: "#0f172a", color: "white", border: "1px solid rgba(255,255,255,.2)", borderRadius: 6, padding: "6px 8px" }}>{SUPPORT_STAGES.map(stage => <option key={stage.id} value={stage.id}>{stage.label}</option>)}</select></td></tr>; })}{!supportTickets.length && <tr><td colSpan="7"><div className="cmd-empty">No support tickets found.</div></td></tr>}</tbody></table></div></section>
                <SimpleDataTable title={`Products (${products.length})`} rows={products} exportName="webertech-products.csv" columns={[{ label: "Product", key: "title" }, { label: "Category", key: "category" }, { label: "Price", key: "price", render: value => money(value) }, { label: "Status", key: "status" }, { label: "Updated", key: "updatedAt", render: value => formatDate(value) }]} />
                <SimpleDataTable title={`Referral profiles (${referrals.length})`} rows={referrals} exportName="webertech-referral-profiles.csv" columns={[{ label: "User", key: "userId" }, { label: "Code", key: "code" }, { label: "Referrer", key: "referrerId" }, { label: "Incoming code", key: "referredByCode" }, { label: "Rate", key: "commissionRate", render: value => `${Number(value || 0.1) * 100}%` }, { label: "Updated", key: "updatedAt", render: value => formatDate(value) }]} />
                <SimpleDataTable title={`Referral earnings ledger (${referralEarnings.length})`} rows={referralEarnings} exportName="webertech-referral-earnings.csv" columns={[{ label: "Ledger entry", key: "id" }, { label: "Referrer", key: "referrerId" }, { label: "Referred customer", key: "referredUserId" }, { label: "Order", key: "orderId" }, { label: "Order amount", key: "orderAmount", render: value => money(value) }, { label: "Commission", key: "commissionAmount", render: value => money(value) }, { label: "Status", key: "status" }, { label: "Created", key: "createdAt", render: value => formatDate(value) }]} />
              </>
            )}

            {activeView === "users" && (
              <section className="cmd-card">
                <div className="cmd-card-header"><div><h2 className="cmd-card-title">Users directory ({filteredUsers.length})</h2><p className="cmd-card-subtitle">Profiles, roles, referrals, activity and customer history.</p></div><div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}><input className="cmd-search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search name, email, phone, referral code" /><button style={commonButton} onClick={() => exportCsv("webertech-users.csv", filteredUsers.map(user => ({ uid: user.uid || user.id, name: displayName(user), email: user.email, phone: user.phone, role: user.role, status: user.status, referralCode: user.referralCode, referredBy: user.referredBy || user.referrerId, joinedAt: formatDate(user.joinedAt), lastLogin: formatDate(user.lastLogin) })))}>⬇ Excel CSV</button></div></div>
                <div className="cmd-table-wrap"><table className="cmd-table"><thead><tr><th>Customer</th><th>Contact</th><th>Role / status</th><th>Referral</th><th>Joined</th><th>Last login</th><th>Records</th><th>Action</th></tr></thead><tbody>{filteredUsers.length ? filteredUsers.map(user => { const uid = user.uid || user.id; const countOrders = orders.filter(order => order.userId === uid || order.customerId === uid || order.customerEmail === user.email).length; const countActivity = activities.filter(activity => activity.userId === uid).length; return <tr key={uid}><td><strong>{displayName(user)}</strong><div style={{ color: "rgba(255,255,255,.42)", fontSize: 10, fontFamily: "monospace" }}>{uid}</div></td><td>{user.email || "—"}<br />{user.phone || "—"}</td><td><span className="cmd-badge cmd-badge-paid">{user.role || "customer"}</span><div style={{ color: "rgba(255,255,255,.5)", fontSize: 10, marginTop: 4 }}>{user.status || "active"}</div></td><td>{user.referralCode || "—"}<div style={{ color: "rgba(255,255,255,.45)", fontSize: 10 }}>From: {user.referredBy || user.referrerId || "none"}</div></td><td>{formatDate(user.joinedAt, false)}</td><td>{formatDate(user.lastLogin)}</td><td>{countOrders} orders · {countActivity} activities</td><td><button style={commonButton} onClick={() => setSelectedUser(user)}>View full profile</button></td></tr>; }) : <tr><td colSpan="8"><div className="cmd-empty">No users found. Refresh to load the directory.</div></td></tr>}</tbody></table></div>
              </section>
            )}

            {selectedUser && activeView === "users" && (
              <section className="cmd-card" style={{ background: "rgba(37,99,235,.1)", borderColor: "rgba(96,165,250,.35)" }}>
                <div className="cmd-card-header"><div><h2 className="cmd-card-title">Customer profile: {displayName(selectedUser)}</h2><p className="cmd-card-subtitle">Complete profile, purchases, payment records, support threads and activity log.</p></div><div style={{ display: "flex", gap: 8 }}><button style={commonButton} onClick={() => exportCsv(`customer-${selectedUser.id || selectedUser.uid}-history.csv`, [...userOrders.map(order => ({ recordType: "order", id: order.orderId || order.id, product: order.productTitle, amount: order.amount, status: order.status, date: formatDate(order.createdAt) })), ...userTransactions.map(transaction => ({ recordType: "transaction", id: transaction.id, receipt: transaction.mpesaTxn, amount: transaction.amount, status: transaction.status, date: formatDate(transaction.createdAt) })), ...userActivities.map(activity => ({ recordType: "activity", id: activity.id, type: activity.type, description: activity.description, date: formatDate(activity.timestamp) })), ...userDownloads.map(item => ({ recordType: "download", id: item.id, orderId: item.orderId, product: item.productTitle || item.productId, status: item.status, date: formatDate(item.createdAt) })), ...userServices.map(item => ({ recordType: "service", id: item.id, service: item.serviceName || item.name, status: item.status, date: formatDate(item.updatedAt || item.createdAt) })), ...userInvoices.map(item => ({ recordType: "invoice", id: item.invoiceNumber || item.id, amount: item.amount, status: item.status, date: formatDate(item.createdAt) })), ...userNotifications.map(item => ({ recordType: "notification", id: item.id, subject: item.subject, read: item.read, date: formatDate(item.createdAt) })), ...userTickets.map(item => ({ recordType: "support_ticket", id: item.id, subject: item.subject, status: item.status, date: formatDate(item.updatedAt || item.createdAt) })), ...userReferralEarnings.map(item => ({ recordType: "referral_earning", id: item.id, orderId: item.orderId, commission: item.commissionAmount, status: item.status, date: formatDate(item.createdAt) }))])}>⬇ Export customer history</button><button style={commonButton} onClick={() => setSelectedUser(null)}>Close</button></div></div>
                <div className="cmd-profile-grid">
                  <div className="cmd-profile-field"><small>Full name</small><strong>{displayName(selectedUser)}</strong></div><div className="cmd-profile-field"><small>Email</small><strong>{selectedUser.email || "—"}</strong></div><div className="cmd-profile-field"><small>Phone</small><strong>{selectedUser.phone || selectedUser.profile?.phone || "—"}</strong></div><div className="cmd-profile-field"><small>Role / status</small><strong>{selectedUser.role || "customer"} · {selectedUser.status || "active"}</strong></div><div className="cmd-profile-field"><small>Joined</small><strong>{formatDate(selectedUser.joinedAt)}</strong></div><div className="cmd-profile-field"><small>Last login</small><strong>{formatDate(selectedUser.lastLogin)}</strong></div><div className="cmd-profile-field"><small>Own referral code</small><strong>{selectedUser.referralCode || selectedUser.referral?.code || "—"}</strong></div><div className="cmd-profile-field"><small>Referred by</small><strong>{selectedUser.referredBy || selectedUser.referrerId || "No referrer"}</strong></div><div className="cmd-profile-field"><small>Location</small><strong>{[selectedUser.profile?.town, selectedUser.profile?.county, selectedUser.profile?.address].filter(Boolean).join(", ") || "—"}</strong></div>
                </div>
                <div className="cmd-mini-grid" style={{ marginBottom: 18 }}><div className="cmd-mini-card"><strong>{userOrders.length}</strong><span>Orders</span></div><div className="cmd-mini-card"><strong>{userTransactions.length}</strong><span>Transactions</span></div><div className="cmd-mini-card"><strong>{userDownloads.length}</strong><span>Downloads</span></div><div className="cmd-mini-card"><strong>{userServices.length}</strong><span>Services</span></div><div className="cmd-mini-card"><strong>{userInvoices.length}</strong><span>Invoices</span></div><div className="cmd-mini-card"><strong>{userTickets.length}</strong><span>Support tickets</span></div><div className="cmd-mini-card"><strong>{userNotifications.length}</strong><span>Notifications</span></div><div className="cmd-mini-card"><strong>{userChats.length}</strong><span>Support chats</span></div><div className="cmd-mini-card"><strong>{userActivities.length}</strong><span>Activity records</span></div><div className="cmd-mini-card"><strong>{userReferralEarnings.length}</strong><span>Referral earnings</span></div></div>
                <div className="cmd-table-wrap"><table className="cmd-table"><thead><tr><th>Recent customer record</th><th>Detail</th><th>Status / value</th><th>Date</th></tr></thead><tbody>{[...userOrders.map(order => ({ type: "Order", detail: `${order.orderId || order.id} · ${order.productTitle || "Product"}`, value: money(order.amount), status: order.status, date: order.createdAt })), ...userTransactions.map(transaction => ({ type: "Payment", detail: transaction.mpesaTxn || transaction.checkoutRequestId || transaction.id, value: money(transaction.amount), status: transaction.status, date: transaction.createdAt })), ...userActivities.map(activity => ({ type: "Activity", detail: activity.description || activity.type, value: activity.type, status: "Logged", date: activity.timestamp })), ...userDownloads.map(item => ({ type: "Download", detail: item.productTitle || item.productId || item.id, value: item.orderId || "—", status: item.status || "Recorded", date: item.createdAt })), ...userServices.map(item => ({ type: "Service", detail: item.serviceName || item.name || item.id, value: item.assignedTo || "Unassigned", status: item.status || "Recorded", date: item.updatedAt || item.createdAt })), ...userInvoices.map(item => ({ type: "Invoice", detail: item.invoiceNumber || item.id, value: money(item.amount), status: item.status || "Recorded", date: item.createdAt })), ...userNotifications.map(item => ({ type: "Notification", detail: item.subject || item.type || item.id, value: item.read ? "Read" : "Unread", status: "Delivered", date: item.createdAt })), ...userTickets.map(item => ({ type: "Support ticket", detail: item.subject || item.id, value: item.category || "Support", status: item.status || "Open", date: item.updatedAt || item.createdAt })), ...userReferralEarnings.map(item => ({ type: "Referral earning", detail: item.orderId || item.id, value: money(item.commissionAmount ?? item.earnedAmount), status: item.status || "Recorded", date: item.createdAt }))].sort((a, b) => (toDate(b.date)?.getTime() || 0) - (toDate(a.date)?.getTime() || 0)).slice(0, 20).map((record, index) => <tr key={`${record.type}-${index}`}><td>{record.type}</td><td>{record.detail}</td><td>{record.value} <span className={`cmd-badge cmd-badge-${normalizeStatus(record.status)}`}>{record.status}</span></td><td>{formatDate(record.date)}</td></tr>)}{!userOrders.length && !userTransactions.length && !userDownloads.length && !userServices.length && !userInvoices.length && !userNotifications.length && !userTickets.length && !userReferralEarnings.length && !userActivities.length && <tr><td colSpan="4"><div className="cmd-empty">No customer records linked to this profile.</div></td></tr>}</tbody></table></div>
              </section>
            )}

            {activeView === "chats" && (
              <section className="cmd-card">
                <div className="cmd-card-header"><div><h2 className="cmd-card-title">💬 Support chats ({chats.length})</h2><p className="cmd-card-subtitle">Chat summaries are loaded on refresh; active message listeners remain in the dedicated Support page.</p></div><button style={commonButton} onClick={() => exportCsv("webertech-support-chats.csv", chats.map(chat => ({ id: chat.id, customer: displayName(chat), email: chat.customerEmail || chat.email, mode: chat.adminTakeover ? "Admin Agent" : "WeberAI", lastMessage: chat.lastMessage, unreadForAdmin: chat.adminUnreadCount || 0, unreadForCustomer: chat.customerUnreadCount || 0, updatedAt: formatDate(chat.updatedAt) })))}>⬇ Excel CSV</button></div>
                <div className="cmd-table-wrap"><table className="cmd-table"><thead><tr><th>Customer / thread</th><th>Last message</th><th>Mode</th><th>Unread</th><th>Updated</th><th>Action</th></tr></thead><tbody>{chats.length ? chats.map(chat => <tr key={chat.id}><td><strong>{displayName(chat)}</strong><div style={{ color: "rgba(255,255,255,.42)", fontFamily: "monospace", fontSize: 10 }}>{chat.id}</div></td><td style={{ maxWidth: 300 }}>{chat.lastMessage || "No message supplied"}</td><td><span style={{ color: chat.adminTakeover ? "#fca5a5" : "#86efac" }}>{chat.adminTakeover ? "🔴 Admin Agent" : "🟢 WeberAI"}</span></td><td>Admin {chat.adminUnreadCount || 0}<br />Customer {chat.customerUnreadCount || 0}</td><td>{formatDate(chat.updatedAt)}</td><td><button style={commonButton} onClick={() => { window.location.href = `/control?chatId=${encodeURIComponent(chat.id)}`; }}>Open in Support</button></td></tr>) : <tr><td colSpan="6"><div className="cmd-empty">No support chats found.</div></td></tr>}</tbody></table></div>
              </section>
            )}

            {activeView === "logs" && (
              <>
                <section className="cmd-card"><div className="cmd-card-header"><div><h2 className="cmd-card-title">Admin read/write audit log ({adminLogs.length})</h2><p className="cmd-card-subtitle">Administrative writes are recorded separately from customer activity. Read this section after refresh.</p></div><button style={commonButton} onClick={() => exportCsv("webertech-admin-audit-logs.csv", adminLogs.map(log => ({ id: log.id, admin: log.adminEmail, action: log.action, target: log.targetId, metadata: log.metadata, timestamp: formatDate(log.timestamp) })))}>⬇ Excel CSV</button></div><div className="cmd-table-wrap"><table className="cmd-table"><thead><tr><th>When</th><th>Administrator</th><th>Action</th><th>Target</th><th>Details</th><th>Control</th></tr></thead><tbody>{adminLogs.length ? adminLogs.map(log => <tr key={log.id}><td>{formatDate(log.timestamp)}</td><td>{log.adminEmail || log.adminUid || "—"}</td><td><span className="cmd-badge cmd-badge-paid">{log.action}</span></td><td style={{ fontFamily: "monospace", fontSize: 11 }}>{log.targetId || "—"}</td><td style={{ maxWidth: 260, wordBreak: "break-word" }}>{log.metadata ? JSON.stringify(log.metadata) : "—"}</td><td><button style={{ ...commonButton, color: "#fca5a5", borderColor: "rgba(252,165,165,.25)" }} onClick={() => handleDeleteAdminLog(log)}>Delete</button></td></tr>) : <tr><td colSpan="6"><div className="cmd-empty">No admin audit entries yet. Status changes and other protected writes will appear here.</div></td></tr>}</tbody></table></div></section>
                <section className="cmd-card"><div className="cmd-card-header"><div><h2 className="cmd-card-title">Customer activity and generated reports</h2><p className="cmd-card-subtitle">Read-only operational history from activities and reports, loaded on refresh.</p></div><button style={commonButton} onClick={() => exportCsv("webertech-activity-report.csv", [...activities.map(activity => ({ source: "activity", id: activity.id, userId: activity.userId, type: activity.type, description: activity.description, timestamp: formatDate(activity.timestamp) })), ...reports.map(report => ({ source: "report", id: report.id, type: report.type || report.title, description: report.message || report.summary, timestamp: formatDate(report.date || report.createdAt) }))])}>⬇ Export logs</button></div><div className="cmd-table-wrap"><table className="cmd-table"><thead><tr><th>Source</th><th>Record</th><th>Customer / owner</th><th>Description</th><th>When</th></tr></thead><tbody>{[...activities.map(activity => ({ source: "Activity", id: activity.id, owner: activity.userId, description: activity.description || activity.type, date: activity.timestamp })), ...reports.map(report => ({ source: "Report", id: report.id, owner: report.createdBy || "System", description: report.message || report.summary || report.title || "Generated platform report", date: report.date || report.createdAt }))].sort((a, b) => (toDate(b.date)?.getTime() || 0) - (toDate(a.date)?.getTime() || 0)).slice(0, 80).map(record => <tr key={`${record.source}-${record.id}`}><td>{record.source}</td><td style={{ fontFamily: "monospace", fontSize: 11 }}>{record.id}</td><td>{record.owner || "—"}</td><td>{record.description}</td><td>{formatDate(record.date)}</td></tr>)}{!activities.length && !reports.length && <tr><td colSpan="5"><div className="cmd-empty">No activity or report records found.</div></td></tr>}</tbody></table></div></section>
                <section className="cmd-card"><div className="cmd-card-header"><div><h2 className="cmd-card-title">Inbound requests ({allRequests.length}) {unreadPurchaseRequests.length ? <span style={{ color: "#fbbf24" }}>· {unreadPurchaseRequests.length} priority</span> : null}</h2><p className="cmd-card-subtitle">Checkout outcomes, waitlists, and service inquiries across all WeberTech divisions. Priority checkout follow-ups appear first.</p></div><button style={commonButton} onClick={() => exportCsv("webertech-inbound-requests.csv", allRequests.map(request => ({ type: request.requestType, source: request.sourceCollection, name: displayName(request), email: request.email || request.customerEmail, phone: request.phone || request.customerPhone, message: request.message || request.summary, status: request.status, received: formatDate(request.createdAt || request.timestamp) })))}>⬇ Export requests</button></div><div className="cmd-table-wrap"><table className="cmd-table"><thead><tr><th>Type</th><th>Customer</th><th>Contact</th><th>Message</th><th>Status</th><th>Received</th><th>Contact</th></tr></thead><tbody>{allRequests.slice(0, 100).map(request => <tr key={`${request.sourceCollection}-${request.id}`}><td>{request.requestType}</td><td>{displayName(request)}<div style={{ color: "rgba(255,255,255,.5)", fontSize: 10 }}>{request.service || request.productTitle || ""}</div></td><td>{request.email || request.customerEmail || "—"}<br />{request.phone || request.customerPhone || "—"}</td><td>{request.message || request.summary || "No message supplied"}</td><td><span className={`cmd-badge cmd-badge-${request.priority === "high" ? "pending" : normalizeStatus(request.status || "new")}`}>{request.priority === "high" ? "Priority" : request.status || "New"}</span></td><td>{formatDate(request.createdAt || request.timestamp)}</td><td style={{ whiteSpace: "nowrap" }}>{(request.phone || request.customerPhone) ? <button style={commonButton} onClick={() => { const raw = String(request.phone || request.customerPhone).replace(/\D/g, ""); const phone = raw.startsWith("0") ? `254${raw.slice(1)}` : raw; window.open(`https://wa.me/${phone}?text=${encodeURIComponent(request.message || request.summary || `Hello ${displayName(request)}, WeberTech is following up on your ${request.service || request.productTitle || "service"}.`)}`, "_blank", "noopener,noreferrer"); }}>WhatsApp</button> : null} {(request.email || request.customerEmail) ? <button style={commonButton} onClick={() => { const email = request.email || request.customerEmail; window.location.href = `mailto:${email}?subject=${encodeURIComponent(request.title || "WeberTech follow-up")}&body=${encodeURIComponent(request.message || request.summary || "Hello, WeberTech is following up on your service request.")}`; }}>Email</button> : null}</td></tr>)}{!allRequests.length && <tr><td colSpan="7"><div className="cmd-empty">No inbound requests found.</div></td></tr>}</tbody></table></div></section>
              </>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

function SimpleDataTable({ title, rows, columns, exportName }) {
  return <section className="cmd-card"><div className="cmd-card-header"><div><h3 className="cmd-card-title">{title}</h3><p className="cmd-card-subtitle">Loaded on refresh and available as an Excel-compatible CSV.</p></div><button style={commonInlineButton} onClick={() => exportCsv(exportName, rows.map(row => Object.fromEntries(columns.map(column => [column.label, column.render ? column.render(row[column.key], row) : row[column.key]]))))}>⬇ Export</button></div><div className="cmd-table-wrap"><table className="cmd-table"><thead><tr>{columns.map(column => <th key={column.key}>{column.label}</th>)}</tr></thead><tbody>{rows.length ? rows.slice(0, 500).map(row => <tr key={row.id || JSON.stringify(row)}>{columns.map(column => <td key={column.key}>{column.render ? column.render(row[column.key], row) : (row[column.key] === null || row[column.key] === undefined || row[column.key] === "" ? "—" : String(row[column.key]))}</td>)}</tr>) : <tr><td colSpan={columns.length}><div className="cmd-empty">No records found. Use Refresh All Data to load current data.</div></td></tr>}</tbody></table></div></section>;
}

function OrderTable({ rows, onManage, onCustomer, users, products = [] }) {
  return <div className="cmd-table-wrap"><table className="cmd-table"><thead><tr><th>Order ID</th><th>Product / module</th><th>Amount</th><th>Status</th><th>Customer</th><th>Created</th><th>Action</th></tr></thead><tbody>{rows.length ? rows.map(order => { const owner = users.find(user => user.uid === order.userId || user.id === order.userId || user.email === order.customerEmail || user.email === order.email); return <tr key={order.id}><td style={{ fontFamily: "monospace", fontSize: 11 }}>{order.orderId || order.id}</td><td><strong>{order.productTitle || order.product || "Unnamed product"}</strong><div style={{ color: "rgba(255,255,255,.45)", fontSize: 10 }}>{productModule(order, products)}</div></td><td>{money(order.amount)}</td><td><span className={`cmd-badge cmd-badge-${normalizeStatus(order.status)}`}>{order.status || "Unknown"}</span></td><td>{displayName(order)}<div style={{ color: "rgba(255,255,255,.45)", fontSize: 10 }}>{order.customerEmail || order.email || ""}</div></td><td>{formatDate(order.createdAt)}</td><td style={{ whiteSpace: "nowrap" }}><button style={{ background: "rgba(22,163,74,.2)", color: "#86efac", border: "none", borderRadius: 6, padding: "6px 9px", cursor: "pointer", fontSize: 11, fontWeight: 800 }} onClick={() => onManage(order)}>Manage</button>{owner && <button style={{ ...commonInlineButton, marginLeft: 5 }} onClick={() => onCustomer(owner)}>Profile</button>}</td></tr>; }) : <tr><td colSpan="7"><div className="cmd-empty">No orders found. Use Refresh All Data to load the current ledger.</div></td></tr>}</tbody></table></div>;
}

const commonInlineButton = { background: "rgba(37,99,235,.18)", color: "#93c5fd", border: "1px solid rgba(147,197,253,.22)", borderRadius: 6, padding: "6px 9px", cursor: "pointer", fontSize: 11, fontWeight: 800 };
