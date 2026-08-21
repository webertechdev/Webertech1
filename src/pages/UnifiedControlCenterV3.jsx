// src/pages/UnifiedControlCenterV3.jsx
// WeberTech Control Center v3 - With Upload Progress & Fixed Hanging

import { useState, useEffect, useRef } from "react";
import { collection, getDocs, doc, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { auth, db, storage, firebaseRuntime } from "../config/firebase";
import { toast, Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function withTimeout(promise, timeoutMs, message) {
  return new Promise((resolve, reject) => {
    let settled = false;
    const timer = setTimeout(() => {
      if (!settled) {
        settled = true;
        reject(new Error(message));
      }
    }, timeoutMs);

    Promise.resolve(promise).then(
      value => {
        if (!settled) {
          settled = true;
          clearTimeout(timer);
          resolve(value);
        }
      },
      error => {
        if (!settled) {
          settled = true;
          clearTimeout(timer);
          reject(error);
        }
      }
    );
  });
}

function normalizeHttpUrl(value) {
  try {
    const parsed = new URL((value || "").trim());
    return /^https?:$/.test(parsed.protocol) ? parsed.toString() : "";
  } catch {
    return "";
  }
}

const INBOX_COLLECTIONS = [
  { id: "academy_waitlist", label: "Academy Waitlist", icon: "🎓", description: "Learners waiting for Academy courses or mentorship." },
  { id: "electronics_notify", label: "Electronics Requests", icon: "📺", description: "Customers requesting product availability or stock alerts." },
  { id: "dev_inquiries", label: "Dev Inquiries", icon: "💼", description: "Website, app, dashboard, and custom-system enquiries." },
  { id: "cyber_notify", label: "Cyber Requests", icon: "🖥️", description: "Cyber service notifications and customer requests." },
  { id: "hustle_waitlist", label: "Hustle KE Waitlist", icon: "🔥", description: "Customers interested in Hustle KE opportunities." },
  { id: "reports", label: "Reports", icon: "📊", description: "Generated platform, chat, and AI training reports." },
];

const LEGAL_SUBCATEGORIES = [
  { id: "vehicle", label: "Vehicle Documents", emoji: "🚗" },
  { id: "land", label: "Land Documents", emoji: "🏞️" },
  { id: "employment", label: "Employment Documents", emoji: "💼" },
  { id: "business", label: "Business Documents", emoji: "🏢" },
  { id: "finance", label: "Finance Documents", emoji: "💰" },
  { id: "rental", label: "Rental Documents", emoji: "🏠" },
  { id: "court", label: "Court Documents", emoji: "⚖️" },
  { id: "templates", label: "Business Templates", emoji: "📄" },
];

const EMPTY_INBOX = INBOX_COLLECTIONS.reduce((result, item) => {
  result[item.id] = [];
  return result;
}, {});

function formatInboxDate(value) {
  if (!value) return "Date not available";
  try {
    const date = value?.toDate ? value.toDate() : new Date(value);
    return Number.isNaN(date.getTime()) ? "Date not available" : date.toLocaleString();
  } catch {
    return "Date not available";
  }
}

function displayInboxValue(value) {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "object") {
    try { return JSON.stringify(value); } catch { return "[data]"; }
  }
  return String(value);
}

function inboxCustomerName(item) {
  return item.name || item.fullName || item.customerName || item.firstName || item.email || item.phone || "Anonymous customer";
}

function inboxMessage(item) {
  return item.message || item.inquiry || item.request || item.description || item.details || item.summary || item.course || item.product || item.service || "No message supplied";
}

function csvEscape(value) {
  const text = displayInboxValue(value).replace(/\r?\n/g, " ");
  return /[",]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function downloadInboxCsv(inboxData, inboxFilter) {
  const selectedCollections = INBOX_COLLECTIONS.filter(item => inboxFilter === "all" || item.id === inboxFilter);
  const records = selectedCollections.flatMap(collectionInfo =>
    (inboxData[collectionInfo.id] || []).map(record => ({ collectionInfo, record }))
  );
  if (records.length === 0) {
    toast.error("There are no records to export.");
    return;
  }

  const standardFields = ["collection", "recordId", "status", "name", "email", "phone", "message", "receivedAt"];
  const hiddenFields = ["id", "collectionId", "createdAt", "updatedAt", "adminUpdatedAt", "status", "name", "fullName", "customerName", "firstName", "email", "phone", "message", "inquiry", "request", "description", "details", "summary", "course", "product", "service", "title", "reportTitle", "reportType"];
  const extraFields = [...new Set(records.flatMap(({ record }) => Object.keys(record).filter(key => !hiddenFields.includes(key))))];
  const headers = [...standardFields, ...extraFields];
  const rows = records.map(({ collectionInfo, record }) => {
    const standardValues = [
      collectionInfo.label,
      record.id,
      record.status || "new",
      inboxCustomerName(record),
      record.email || "",
      record.phone || "",
      inboxMessage(record),
      formatInboxDate(record.createdAt || record.updatedAt),
    ];
    return [...standardValues, ...extraFields.map(field => record[field])].map(csvEscape).join(",");
  });

  const csv = `\\ufeff${headers.map(csvEscape).join(",")}\\n${rows.join("\\n")}`;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const scope = inboxFilter === "all" ? "all-requests" : inboxFilter;
  link.href = url;
  link.download = `webertech-${scope}-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  toast.success(`✅ Exported ${records.length} record${records.length === 1 ? "" : "s"} for Excel.`);
}

function AdminInbox({ inboxData, inboxFilter, setInboxFilter, inboxLoading, refreshInboxData, handleInboxStatus, handleDeleteInboxItem, loading, viewMode, setViewMode, openContactModal }) {
  const visibleCollections = INBOX_COLLECTIONS.filter(item => inboxFilter === "all" || item.id === inboxFilter);
  const totalRecords = INBOX_COLLECTIONS.reduce((sum, item) => sum + (inboxData[item.id]?.length || 0), 0);

  return (
    <div className="uc-main">
      <div className="uc-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
          <div>
            <h3 className="uc-card-title" style={{ marginBottom: 6 }}>📥 Customer Requests & Reports</h3>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, margin: 0 }}>
              Manage waitlists, notifications, service enquiries, and generated reports from Firestore. Data loads only when you refresh.
            </p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button className="uc-refresh-btn" onClick={() => refreshInboxData()} disabled={inboxLoading || loading}>
              {inboxLoading ? "⟳ Loading..." : "🔄 Refresh requests"}
            </button>
            <button className={`uc-tab-btn ${viewMode === "table" ? "active" : ""}`} onClick={() => setViewMode("table")} style={{ width: "auto", margin: 0, padding: "8px 12px", fontSize: 12 }}>
              ▦ Table view
            </button>
            <button className={`uc-tab-btn ${viewMode === "cards" ? "active" : ""}`} onClick={() => setViewMode("cards")} style={{ width: "auto", margin: 0, padding: "8px 12px", fontSize: 12 }}>
              ▣ Card view
            </button>
            <button className="uc-btn" onClick={() => downloadInboxCsv(inboxData, inboxFilter)} style={{ padding: "8px 12px", fontSize: 12 }}>
              ⬇ Download Excel
            </button>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 20 }}>
          <button
            className={`uc-tab-btn ${inboxFilter === "all" ? "active" : ""}`}
            onClick={() => setInboxFilter("all")}
            style={{ width: "auto", margin: 0, padding: "9px 12px", fontSize: 12 }}
          >
            All ({totalRecords})
          </button>
          {INBOX_COLLECTIONS.map(item => (
            <button
              key={item.id}
              className={`uc-tab-btn ${inboxFilter === item.id ? "active" : ""}`}
              onClick={() => setInboxFilter(item.id)}
              style={{ width: "auto", margin: 0, padding: "9px 12px", fontSize: 12 }}
            >
              {item.icon} {item.label} ({inboxData[item.id]?.length || 0})
            </button>
          ))}
        </div>
      </div>

      {visibleCollections.map(collectionInfo => {
        const records = inboxData[collectionInfo.id] || [];
        return (
          <div className="uc-card" key={collectionInfo.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
              <div>
                <h3 className="uc-card-title" style={{ marginBottom: 4 }}>{collectionInfo.icon} {collectionInfo.label} ({records.length})</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, margin: 0 }}>{collectionInfo.description}</p>
              </div>
              <code style={{ color: "#86efac", fontSize: 11 }}>{collectionInfo.id}</code>
            </div>

            {records.length === 0 ? (
              <div style={{ padding: "24px 12px", borderRadius: 10, background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)", textAlign: "center", fontSize: 13 }}>
                No records in this collection.
              </div>
            ) : viewMode === "table" ? (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760, fontSize: 12 }}>
                  <thead>
                    <tr style={{ color: "#86efac", textAlign: "left", borderBottom: "1px solid rgba(22,163,74,0.35)" }}>
                      <th style={{ padding: "10px 8px" }}>Customer / Report</th>
                      <th style={{ padding: "10px 8px" }}>Contact</th>
                      <th style={{ padding: "10px 8px" }}>Message / Summary</th>
                      <th style={{ padding: "10px 8px" }}>Received</th>
                      <th style={{ padding: "10px 8px" }}>Status</th>
                      <th style={{ padding: "10px 8px" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map(record => {
                      const isReport = collectionInfo.id === "reports";
                      const status = record.status || "new";
                      const title = isReport ? (record.title || record.reportTitle || record.reportType || "Platform report") : inboxCustomerName(record);
                      const contact = [record.email, record.phone].filter(Boolean).join(" • ") || "—";
                      return (
                        <tr key={record.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.78)", verticalAlign: "top" }}>
                          <td style={{ padding: "12px 8px", color: "#4ade80", fontWeight: 700 }}>{title}</td>
                          <td style={{ padding: "12px 8px" }}>{contact}</td>
                          <td style={{ padding: "12px 8px", maxWidth: 280, whiteSpace: "pre-wrap" }}>{inboxMessage(record)}</td>
                          <td style={{ padding: "12px 8px", whiteSpace: "nowrap" }}>{formatInboxDate(record.createdAt || record.updatedAt)}</td>
                          <td style={{ padding: "12px 8px" }}>
                            <select value={status} onChange={event => handleInboxStatus(collectionInfo.id, record.id, event.target.value)} disabled={loading} style={{ background: "#1e293b", color: "#fff", border: "1px solid rgba(22,163,74,0.45)", borderRadius: 6, padding: "6px 8px" }}>
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="resolved">Resolved</option>
                              <option value="archived">Archived</option>
                            </select>
                          </td>
                          <td style={{ padding: "12px 8px" }}>
                            <div style={{ display: "flex", gap: 6 }}>
                              <button className="uc-btn" style={{ padding: "6px 9px", fontSize: 11, background: "#25d366" }} onClick={() => openContactModal(record, collectionInfo, "whatsapp")} disabled={loading}>WhatsApp</button>
                              <button className="uc-btn" style={{ padding: "6px 9px", fontSize: 11, background: "#2563eb" }} onClick={() => openContactModal(record, collectionInfo, "email")} disabled={loading}>Email</button>
                              <button className="uc-btn uc-btn-danger" style={{ padding: "6px 9px", fontSize: 11 }} onClick={() => handleDeleteInboxItem(collectionInfo.id, record.id)} disabled={loading}>Delete</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ display: "grid", gap: 12 }}>
                {records.map(record => {
                  const status = record.status || "new";
                  const isReport = collectionInfo.id === "reports";
                  const contact = [record.email && `✉ ${record.email}`, record.phone && `☎ ${record.phone}`].filter(Boolean).join(" • ");
                  const excluded = ["id", "collectionId", "createdAt", "updatedAt", "adminUpdatedAt", "status", "name", "fullName", "customerName", "firstName", "email", "phone", "message", "inquiry", "request", "description", "details", "summary", "course", "product", "service", "title", "reportTitle", "reportType"];
                  const extraFields = Object.entries(record).filter(([key, value]) => !excluded.includes(key) && value !== null && value !== undefined && typeof value !== "object");
                  return (
                    <article key={record.id} style={{ padding: 16, borderRadius: 12, background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.25)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
                        <div>
                          <div style={{ color: "#4ade80", fontWeight: 800, fontSize: 14 }}>
                            {isReport ? (record.title || record.reportTitle || record.reportType || "Platform report") : inboxCustomerName(record)}
                          </div>
                          {contact && <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, marginTop: 4 }}>{contact}</div>}
                        </div>
                        <span style={{ padding: "4px 9px", borderRadius: 99, background: status === "resolved" ? "rgba(34,197,94,.18)" : status === "contacted" ? "rgba(251,191,36,.18)" : "rgba(96,165,250,.18)", color: status === "resolved" ? "#86efac" : status === "contacted" ? "#fde68a" : "#bfdbfe", fontSize: 11, fontWeight: 800, textTransform: "capitalize" }}>{status}</span>
                      </div>
                      <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, lineHeight: 1.6, marginTop: 10, whiteSpace: "pre-wrap" }}>{inboxMessage(record)}</div>
                      <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, marginTop: 8 }}>Received: {formatInboxDate(record.createdAt || record.updatedAt)}</div>
                      {extraFields.length > 0 && (
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
                          {extraFields.slice(0, 8).map(([key, value]) => <span key={key} style={{ padding: "4px 7px", borderRadius: 6, background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)", fontSize: 11 }}>{key}: {displayInboxValue(value)}</span>)}
                        </div>
                      )}
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
                        <button className="uc-btn" style={{ padding: "7px 10px", fontSize: 11, background: "#25d366" }} onClick={() => openContactModal(record, collectionInfo, "whatsapp")} disabled={loading}>Contact WhatsApp</button>
                        <button className="uc-btn" style={{ padding: "7px 10px", fontSize: 11, background: "#2563eb" }} onClick={() => openContactModal(record, collectionInfo, "email")} disabled={loading}>Email</button>
                        <button className="uc-btn" style={{ padding: "7px 10px", fontSize: 11 }} onClick={() => handleInboxStatus(collectionInfo.id, record.id, "contacted")} disabled={loading}>Mark contacted</button>
                        <button className="uc-btn" style={{ padding: "7px 10px", fontSize: 11, background: "#2563eb" }} onClick={() => handleInboxStatus(collectionInfo.id, record.id, "resolved")} disabled={loading}>Mark resolved</button>
                        <button className="uc-btn" style={{ padding: "7px 10px", fontSize: 11, background: "#475569" }} onClick={() => handleInboxStatus(collectionInfo.id, record.id, "archived")} disabled={loading}>Archive</button>
                        <button className="uc-btn uc-btn-danger" style={{ padding: "7px 10px", fontSize: 11 }} onClick={() => handleDeleteInboxItem(collectionInfo.id, record.id)} disabled={loading}>Delete</button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function UnifiedControlCenterV3() {
  const [tab, setTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const [storageDiagnostic, setStorageDiagnostic] = useState("");
  const [documents, setDocuments] = useState([]);
  const [chats, setChats] = useState([]);
  const [inboxData, setInboxData] = useState(EMPTY_INBOX);
  const [inboxLoading, setInboxLoading] = useState(false);
  const [inboxFilter, setInboxFilter] = useState("all");
  const [inboxViewMode, setInboxViewMode] = useState("cards");
  const [contactModal, setContactModal] = useState(null);
  const [whatsappMessage, setWhatsappMessage] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [refreshingChat, setRefreshingChat] = useState(false);
  const [adminReply, setAdminReply] = useState("");
  const [lastRefresh, setLastRefresh] = useState(null);
  const [newDoc, setNewDoc] = useState({
    title: "",
    description: "",
    price: 0,
    category: "cyber",
    subcategory: "templates",
    icon: "📄",
    features: "",
    fileUrl: "",
    fileName: "",
  });
  const [editingDoc, setEditingDoc] = useState(null);
  const [editDocForm, setEditDocForm] = useState({});
  const [documentSearch, setDocumentSearch] = useState("");
  const [documentSearchMessage, setDocumentSearchMessage] = useState("");
  const editDocRef = useRef(null);
  const [aiTraining, setAiTraining] = useState({
    personality: "Professional and helpful",
    language: "English & Swahili",
    tone: "Friendly but formal",
    responseStyle: "Concise and clear",
    knowledgeBase: "",
    behaviorRules: "Always provide direct service links. Never generate PDFs.",
  });
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    activeChats: 0,
    documentsCount: 0,
  });
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!editingDoc) return;
    const timer = setTimeout(() => {
      editDocRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
    return () => clearTimeout(timer);
  }, [editingDoc]);

  // Refresh the admin inbox collections without realtime listeners.
  const refreshInboxData = async ({ silent = false } = {}) => {
    setInboxLoading(true);
    const nextInbox = { ...EMPTY_INBOX };
    const failures = [];

    await Promise.all(INBOX_COLLECTIONS.map(async ({ id }) => {
      try {
        const snap = await withTimeout(
          getDocs(collection(db, id)),
          15000,
          `Loading ${id} timed out. Click Refresh to try again.`
        );
        nextInbox[id] = snap.docs
          .map(item => ({ id: item.id, collectionId: id, ...item.data() }))
          .sort((a, b) => {
            const aTime = a.createdAt?.toMillis?.() || a.updatedAt?.toMillis?.() || 0;
            const bTime = b.createdAt?.toMillis?.() || b.updatedAt?.toMillis?.() || 0;
            return bTime - aTime;
          });
      } catch (err) {
        console.warn(`Inbox collection ${id} could not be loaded:`, err);
        failures.push(id);
      }
    }));

    setInboxData(nextInbox);
    setInboxLoading(false);
    if (failures.length > 0) {
      toast.error(`Some admin collections could not load: ${failures.join(", ")}`);
    } else if (!silent) {
      toast.success("✅ Admin requests updated!");
    }
    return nextInbox;
  };

  // Refresh all data
  const refreshData = async () => {
    setLoading(true);
    try {
      // Fetch documents
      const docsSnap = await withTimeout(
        getDocs(collection(db, "products")),
        15000,
        "Loading documents timed out. Click Refresh to try again."
      );
      const allDocs = docsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      setDocuments(allDocs);
      console.log("✅ Documents loaded:", allDocs.length);

      // Fetch chats - filter for recent ones (last 7 days)
      const chatsSnap = await withTimeout(
        getDocs(collection(db, "chats")),
        15000,
        "Loading chats timed out. Click Refresh to try again."
      );
      const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
      const allChats = chatsSnap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter(c => {
          const timestamp = c.updatedAt?.toMillis?.() || c.createdAt?.toMillis?.() || 0;
          return timestamp > sevenDaysAgo;
        });

      const activeChatsCount = allChats.filter(c => c.status === "active" || (c.lastMessage && !c.resolved)).length;
      console.log("✅ Chats loaded:", allChats.length, "Active:", activeChatsCount);

      setChats(allChats);

      // Refresh waitlists, enquiries, and generated reports using the same
      // explicit-refresh pattern as documents and chats.
      await refreshInboxData({ silent: true });

      // Calculate stats
      const ordersSnap = await withTimeout(
        getDocs(collection(db, "orders")),
        15000,
        "Loading orders timed out. Click Refresh to try again."
      );
      const allOrders = ordersSnap.docs.map(d => d.data());
      const totalRevenue = allOrders
        .filter(o => o.status === "paid")
        .reduce((sum, o) => sum + (o.amount || 0), 0);

      // Load AI training config
      try {
        const aiSnap = await withTimeout(
          getDocs(collection(db, "config")),
          15000,
          "Loading AI settings timed out."
        );
        const aiConfig = aiSnap.docs.find(d => d.id === "weberai");
        if (aiConfig?.exists()) {
          setAiTraining(prev => ({ ...prev, ...aiConfig.data() }));
          console.log("✅ AI config loaded");
        }
      } catch (err) {
        console.warn("AI config not found");
      }

      setStats({
        totalOrders: allOrders.length,
        totalRevenue,
        activeChats: activeChatsCount,
        documentsCount: allDocs.length,
      });

      setLastRefresh(new Date().toLocaleTimeString());
      toast.success("✅ Control Center updated!");
    } catch (err) {
      console.error("Refresh error:", err);
      toast.error("Failed to refresh: " + err.message);
    }
    setLoading(false);
  };

  const handleInboxStatus = async (collectionId, itemId, status) => {
    setLoading(true);
    try {
      await setDoc(
        doc(db, collectionId, itemId),
        { status, adminUpdatedAt: serverTimestamp() },
        { merge: true }
      );
      setInboxData(prev => ({
        ...prev,
        [collectionId]: (prev[collectionId] || []).map(item =>
          item.id === itemId ? { ...item, status } : item
        ),
      }));
      toast.success(`✅ Marked as ${status}.`);
    } catch (err) {
      console.error("Inbox update error:", err);
      toast.error(`Could not update record: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteInboxItem = async (collectionId, itemId) => {
    if (!window.confirm("Delete this admin record permanently?")) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, collectionId, itemId));
      setInboxData(prev => ({
        ...prev,
        [collectionId]: (prev[collectionId] || []).filter(item => item.id !== itemId),
      }));
      toast.success("✅ Record deleted.");
    } catch (err) {
      console.error("Inbox delete error:", err);
      toast.error(`Could not delete record: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const generateAiWhatsappMessage = async (record, collectionInfo, channel = "whatsapp") => {
    setIsGenerating(true);
    try {
      const customerName = inboxCustomerName(record);
      const message = inboxMessage(record);
      const service = collectionInfo.label;
      const prompt = channel === "email"
        ? `Draft a professional email reply for ${customerName} regarding their ${service} enquiry. Their message was: "${message}". Return exactly two labeled sections: Subject: one concise subject line, then Message: a friendly concise email body. Mention WeberTech Kenya and ask how we can help further. Do not use placeholder brackets.`
        : `Draft a professional, friendly WhatsApp reply to ${customerName} who inquired about ${service}. Their message was: "${message}". Keep it concise, mention WeberTech Kenya, and ask how we can help further. Return only the message text, without a subject or labels.`;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", text: prompt }],
          lang: "en",
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "AI generation failed");
      const answer = data.answer || data.reply || "";
      if (!answer) throw new Error("AI returned an empty draft");

      if (channel === "email") {
        const subjectMatch = answer.match(/Subject\s*:\s*(.*)/i);
        const messageMatch = answer.match(/Message\s*:\s*([\s\S]*)/i);
        setEmailSubject(subjectMatch?.[1]?.trim() || `${service} enquiry — WeberTech`);
        setWhatsappMessage((messageMatch?.[1] || answer).trim());
      } else {
        setWhatsappMessage(answer.trim());
      }
      toast.success("✨ AI draft generated. Review and edit it before sending.");
    } catch (err) {
      console.error("AI contact draft error:", err);
      const customerName = inboxCustomerName(record);
      const fallback = `Hello ${customerName}, this is WeberTech regarding your ${collectionInfo.label} enquiry. How can we assist you today?`;
      setWhatsappMessage(fallback);
      if (channel === "email") setEmailSubject(`${collectionInfo.label} enquiry — WeberTech`);
      toast.error("AI generation failed. A ready-to-edit template was added instead.");
    } finally {
      setIsGenerating(false);
    }
  };

  const openContactModal = (record, collectionInfo, channel = "whatsapp") => {
    const customerName = inboxCustomerName(record);
    setContactModal({ record, collectionInfo, channel });
    setWhatsappMessage(`Hello ${customerName}, this is WeberTech. We received your enquiry regarding ${collectionInfo.label}. How can we help you today?`);
    setEmailSubject(`${collectionInfo.label} enquiry — WeberTech`);
  };

  const sendContact = async () => {
    if (!contactModal?.record) return;
    const { record, collectionInfo, channel } = contactModal;

    if (channel === "email") {
      const email = record.email || record.emailAddress;
      if (!email) {
        toast.error("No email address available for this contact.");
        return;
      }
      if (!emailSubject.trim() || !whatsappMessage.trim()) {
        toast.error("Add both a subject and message before sending.");
        return;
      }
      if (!auth.currentUser) {
        toast.error("Your administrator session has expired. Sign in again.");
        return;
      }

      setIsSendingEmail(true);
      try {
        const idToken = await auth.currentUser.getIdToken();
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            recipient: email,
            subject: emailSubject.trim(),
            message: whatsappMessage.trim(),
          }),
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok || !result.success) {
          throw new Error(result.error || "The email could not be sent.");
        }

        await handleInboxStatus(collectionInfo.id, record.id, "contacted");
        toast.success("✅ Email sent successfully.");
        setContactModal(null);
      } catch (error) {
        console.error("Direct email send error:", error);
        toast.error(error.message || "The email could not be sent. The request was not marked as contacted.");
      } finally {
        setIsSendingEmail(false);
      }
      return;
    } else {
      const rawPhone = record.phone || record.phoneNumber || record.mobile;
      if (!rawPhone) {
        toast.error("No phone number available for this contact.");
        return;
      }
      let cleanPhone = String(rawPhone).replace(/\D/g, "");
      if (cleanPhone.startsWith("0")) cleanPhone = `254${cleanPhone.substring(1)}`;
      if (!cleanPhone.startsWith("254")) cleanPhone = `254${cleanPhone}`;
      if (cleanPhone.length < 11) {
        toast.error("The contact phone number is not a valid Kenyan number.");
        return;
      }
      const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMessage)}`;
      const opened = window.open(url, "_blank", "noopener,noreferrer");
      if (!opened) window.location.href = url;
      toast.success("🚀 Opening WhatsApp...");
    }

    if (collectionInfo?.id && record.id) {
      handleInboxStatus(collectionInfo.id, record.id, "contacted");
    }
    setContactModal(null);
  };

  useEffect(() => {
    refreshData();
    if (firebaseRuntime.missing.length > 0) {
      setStorageDiagnostic(
        `Firebase configuration is incomplete. Missing: ${firebaseRuntime.missing.join(", ")}.`
      );
    } else if (!firebaseRuntime.storageBucket) {
      setStorageDiagnostic("Firebase Storage bucket is not configured for this deployment.");
    }
  }, []);

  // Load chat messages only when a chat is selected or the admin presses refresh.
  const loadChatMessages = async (chat = selectedChat) => {
    if (!chat) {
      setChatMessages([]);
      return;
    }
    setRefreshingChat(true);
    try {
      const messagesSnap = await getDocs(collection(db, "chats", chat.id, "messages"));
      const msgs = messagesSnap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => (a.timestamp?.toMillis?.() || 0) - (b.timestamp?.toMillis?.() || 0));
      setChatMessages(msgs);
      requestAnimationFrame(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }));
    } catch (err) {
      console.error("Message load error:", err);
      toast.error("Failed to refresh chat messages.");
    } finally {
      setRefreshingChat(false);
    }
  };

  useEffect(() => {
    loadChatMessages(selectedChat);
  }, [selectedChat?.id]);

  // Handle file selection with resumable progress and a hard timeout
  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
      "image/gif",
    ];
    const maxSize = 20 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("File is too large. Please upload a file smaller than 20 MB.");
      e.target.value = "";
      return;
    }
    if (file.type && !allowedTypes.includes(file.type)) {
      toast.error("Unsupported file type. Upload a PDF, DOC/DOCX, JPG, PNG, or GIF.");
      e.target.value = "";
      return;
    }

    if (firebaseRuntime.missing.length > 0) {
      const message = `Firebase configuration is incomplete. Missing: ${firebaseRuntime.missing.join(", ")}.`;
      setUploadError(message);
      toast.error(message);
      e.target.value = "";
      return;
    }
    if (!firebaseRuntime.storageBucket) {
      const message = "Firebase Storage bucket is not configured for this deployment.";
      setUploadError(message);
      toast.error(message);
      e.target.value = "";
      return;
    }

    setUploading(true);
    setUploadError("");
    setStorageDiagnostic("");
    setUploadProgress(0);
    const toastId = toast.loading("📤 Uploading file... 0%");
    let uploadTask;
    let resumableError;

    try {
      console.log("📤 Starting upload:", file.name, file.size, "bytes");
      const storageRef = ref(storage, `documents/${Date.now()}_${file.name}`);
      const metadata = {
        contentType: file.type || "application/octet-stream",
        cacheControl: "public,max-age=3600",
      };
      let startTimer;
      const uploadPromise = new Promise((resolve, reject) => {
        uploadTask = uploadBytesResumable(storageRef, file, metadata);
        startTimer = setTimeout(() => {
          uploadTask?.cancel?.();
          reject(new Error("Firebase Storage did not start after 20 seconds. Check the Storage bucket and rules."));
        }, 20000);
        uploadTask.on(
          "state_changed",
          snapshot => {
            clearTimeout(startTimer);
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setUploadProgress(progress);
            toast.loading(`📤 Uploading file... ${progress}%`, { id: toastId });
          },
          error => {
            clearTimeout(startTimer);
            reject(error);
          },
          () => {
            clearTimeout(startTimer);
            resolve(uploadTask.snapshot);
          }
        );
      });

      let snapshot;
      try {
        snapshot = await withTimeout(
          uploadPromise,
          120000,
          "File upload timed out. Check your connection and try again."
        );
      } catch (err) {
        resumableError = err;
        console.warn("Resumable upload failed; trying one-shot upload:", err);
        toast.loading("📤 Retrying direct upload...", { id: toastId });
        setUploadProgress(0);
        snapshot = await withTimeout(
          uploadBytes(storageRef, file, metadata),
          30000,
          "Direct upload timed out. Verify Firebase Storage is enabled and try again."
        );
      }
      const fileUrl = await withTimeout(
        getDownloadURL(snapshot.ref),
        15000,
        "The file uploaded but its download link could not be created."
      );

      setNewDoc(prev => ({ ...prev, fileUrl, fileName: file.name }));
      setUploadProgress(100);
      toast.success("✅ File uploaded! Ready to add document.", { id: toastId });
    } catch (err) {
      uploadTask?.cancel?.();
      console.error("Upload error:", err);
      const message = err?.message || resumableError?.message || "Unable to upload the file.";
      setUploadError(message);
      setStorageDiagnostic(
        message.includes("Storage") || message.includes("bucket")
          ? "Upload could not reach Firebase Storage. Verify the Vercel Storage bucket environment variable and Firebase Storage Rules."
          : "Upload failed before the file could be saved."
      );
      toast.error(`Upload failed: ${message}`, { id: toastId });
    } finally {
      setUploading(false);
      setUploadProgress(0);
      e.target.value = "";
    }
  };

  // Add new document
  const handleAddDocument = async () => {
    if (uploading) {
      toast.error("Please wait for the file upload to finish.");
      return;
    }
    if (!newDoc.title || !newDoc.price) {
      toast.error("❌ Title and price are required");
      return;
    }
    if (!newDoc.fileUrl) {
      toast.error("Upload a file or paste a hosted document URL before adding it.");
      return;
    }
    const fileUrl = normalizeHttpUrl(newDoc.fileUrl);
    if (!fileUrl) {
      toast.error("Enter a valid public http:// or https:// document URL.");
      return;
    }
    const fileName = newDoc.fileName || fileUrl.split("/").pop()?.split("?")[0] || "Hosted document";

    setLoading(true);
    toast.loading("💾 Adding document...");

    try {
      console.log("💾 Adding document:", newDoc.title);

      const slug = newDoc.title.toLowerCase().replace(/\s+/g, "-");
      const docRef = doc(collection(db, "products"));

      const docData = {
        title: newDoc.title,
        description: newDoc.description,
        price: parseFloat(newDoc.price) || 0,
        category: String(newDoc.category || "cyber").toLowerCase(),
        subcategory: newDoc.subcategory || "",
        division: String(newDoc.category || "cyber").toLowerCase(),
        type: String(newDoc.category || "cyber").toLowerCase() === "cyber" ? "legal-document" : "service-document",
        icon: newDoc.icon,
        features: newDoc.features,
        fileUrl,
        fileName,
        slug,
        published: true,
        status: "active",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await withTimeout(
        setDoc(docRef, docData),
        15000,
        "Saving the document timed out. Click Add Document to try again."
      );
      console.log("✅ Document added to Firestore:", docRef.id);

      // Update the visible list immediately instead of waiting for every dashboard
      // collection to refresh. The manual Refresh button remains available for a
      // complete re-sync.
      setDocuments(prev => [{ id: docRef.id, ...docData }, ...prev]);
      setStats(prev => ({ ...prev, documentsCount: prev.documentsCount + 1 }));
      setLastRefresh(new Date().toLocaleTimeString());

      toast.dismiss();
      toast.success("✅ Document added successfully!");

      setNewDoc({
        title: "",
        description: "",
        price: 0,
        category: "cyber",
        subcategory: "templates",
        icon: "📄",
        features: "",
        fileUrl: "",
        fileName: "",
      });
      setUploadError("");
    } catch (err) {
      console.error("Add doc error:", err);
      toast.dismiss();
      toast.error("Failed to add: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const startEditDocument = (documentRecord) => {
    setEditingDoc(documentRecord);
    setEditDocForm({
      title: documentRecord.title || "",
      description: documentRecord.description || "",
      price: documentRecord.price ?? 0,
      category: documentRecord.category || documentRecord.division || "cyber",
      subcategory: documentRecord.subcategory || "",
      icon: documentRecord.icon || "📄",
      features: Array.isArray(documentRecord.features) ? documentRecord.features.join(", ") : (documentRecord.features || ""),
      published: documentRecord.published !== false,
    });
  };

  const findDocumentToEdit = () => {
    const query = documentSearch.trim().toLowerCase();
    if (!query) {
      setDocumentSearchMessage("Type a title, slug, category, document ID, or filename first.");
      return;
    }

    const matches = documents.filter(documentRecord => [
      documentRecord.title,
      documentRecord.slug,
      documentRecord.id,
      documentRecord.category,
      documentRecord.division,
      documentRecord.description,
      documentRecord.fileName,
    ].some(value => String(value || "").toLowerCase().includes(query)));

    if (matches.length === 0) {
      setDocumentSearchMessage(`No document matched “${documentSearch.trim()}”. Click Refresh and try again.`);
      setEditingDoc(null);
      setEditDocForm({});
      return;
    }

    startEditDocument(matches[0]);
    setDocumentSearchMessage(matches.length === 1
      ? `Editing ${matches[0].title || "the selected document"}.`
      : `${matches.length} matches found. Editing the first match; choose another result below if needed.`);
  };

  const handleUpdateDocument = async () => {
    if (!editingDoc?.id) return;
    const title = String(editDocForm.title || "").trim();
    const price = Number(editDocForm.price);
    if (!title) {
      toast.error("A document title is required.");
      return;
    }
    if (!Number.isFinite(price) || price < 0 || price > 1000000) {
      toast.error("Enter a valid price between KES 0 and KES 1,000,000.");
      return;
    }

    setLoading(true);
    try {
      const updates = {
        title,
        description: String(editDocForm.description || "").trim(),
        price,
        category: String(editDocForm.category || "cyber").toLowerCase(),
        subcategory: editDocForm.subcategory || "",
        division: String(editDocForm.category || "cyber").toLowerCase(),
        icon: editDocForm.icon || "📄",
        features: String(editDocForm.features || "").trim(),
        published: editDocForm.published !== false,
        status: editDocForm.published !== false ? "active" : "draft",
        updatedAt: serverTimestamp(),
      };
      await withTimeout(setDoc(doc(db, "products", editingDoc.id), updates, { merge: true }), 15000, "Saving product updates timed out.");
      setDocuments(prev => prev.map(item => item.id === editingDoc.id ? { ...item, ...updates, updatedAt: new Date() } : item));
      setEditingDoc(null);
      setEditDocForm({});
      setLastRefresh(new Date().toLocaleTimeString());
      toast.success("✅ Product details and price updated live.");
    } catch (error) {
      console.error("Document update error:", error);
      toast.error(`Could not update document: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Delete document
  const handleDeleteDocument = async (docId, fileUrl) => {
    if (!confirm("Delete this document?")) return;
    setLoading(true);

    try {
      console.log("🗑️ Deleting document:", docId);

      await deleteDoc(doc(db, "products", docId));

      if (fileUrl) {
        try {
          const fileRef = ref(storage, fileUrl);
          await deleteObject(fileRef);
          console.log("🗑️ File deleted from storage");
        } catch (err) {
          console.warn("File deletion skipped:", err);
        }
      }

      toast.success("✅ Document deleted!");
      await refreshData();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Save AI training
  const handleSaveAITraining = async () => {
    setLoading(true);
    toast.loading("💾 Saving AI training...");

    try {
      console.log("💾 Saving AI training config");

      await setDoc(doc(db, "config", "weberai"), {
        personality: aiTraining.personality,
        language: aiTraining.language,
        tone: aiTraining.tone,
        responseStyle: aiTraining.responseStyle,
        knowledgeBase: aiTraining.knowledgeBase,
        behaviorRules: aiTraining.behaviorRules,
        updatedAt: serverTimestamp(),
      }, { merge: true });

      console.log("✅ AI training saved");
      toast.dismiss();
      toast.success("✅ AI Training saved!");
    } catch (err) {
      console.error("Save AI error:", err);
      toast.dismiss();
      toast.error("Failed to save: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Send admin reply
  const handleSendReply = async () => {
    if (!adminReply.trim() || !selectedChat) return;
    setLoading(true);

    try {
      const newMsgRef = doc(collection(db, "chats", selectedChat.id, "messages"));

      await setDoc(newMsgRef, {
        text: adminReply,
        sender: "admin",
        timestamp: serverTimestamp(),
      });

      await setDoc(doc(db, "chats", selectedChat.id), {
        lastMessage: adminReply,
        updatedAt: serverTimestamp(),
        adminTakeover: true,
      }, { merge: true });

      setAdminReply("");
      await refreshData();
      toast.success("✅ Reply sent!");
    } catch (err) {
      console.error("Send reply error:", err);
      toast.error("Failed to send reply");
    } finally {
      setLoading(false);
    }
  };

  const normalizedDocumentSearch = documentSearch.trim().toLowerCase();
  const filteredDocuments = normalizedDocumentSearch
    ? documents.filter(documentRecord => [
        documentRecord.title,
        documentRecord.slug,
        documentRecord.id,
        documentRecord.category,
        documentRecord.division,
        documentRecord.description,
        documentRecord.fileName,
      ].some(value => String(value || "").toLowerCase().includes(normalizedDocumentSearch)))
    : documents;

  return (
    <>
      <style>{`
        body { font-family: 'Segoe UI', system-ui, sans-serif; background: #0f172a; }
        .uc-container { padding-top: 64px; background: linear-gradient(135deg, #0f172a, #1e293b); min-height: 100vh; }
        .uc-header { background: linear-gradient(135deg, #1e293b, #334155); padding: 32px 20px; border-bottom: 3px solid #16a34a; }
        .uc-title { color: #fff; font-size: 32px; font-weight: 900; margin: 0; }
        .uc-subtitle { color: rgba(255,255,255,0.6); font-size: 14px; margin-top: 4px; }
        .uc-refresh-bar { display: flex; align-items: center; gap: 12px; margin-top: 16px; padding: 12px 16px; background: rgba(22,163,74,0.1); border: 1px solid rgba(22,163,74,0.4); border-radius: 10px; }
        .uc-refresh-btn { background: #16a34a; color: #fff; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 700; cursor: pointer; transition: all .2s; }
        .uc-refresh-btn:hover { background: #15803d; }
        .uc-refresh-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .uc-layout { display: grid; grid-template-columns: 260px 1fr; gap: 24px; max-width: 1400px; margin: 0 auto; padding: 24px 20px; }
        .uc-sidebar { background: rgba(30,41,59,0.8); border: 1px solid rgba(22,163,74,0.2); border-radius: 16px; padding: 20px; height: fit-content; position: sticky; top: 80px; }
        .uc-tab-btn { width: 100%; padding: 14px 16px; border: none; border-radius: 12px; background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.7); cursor: pointer; font-size: 14px; font-weight: 600; text-align: left; margin-bottom: 8px; transition: all .2s; display: flex; align-items: center; gap: 10px; }
        .uc-tab-btn:hover { background: rgba(22,163,74,0.15); color: #4ade80; }
        .uc-tab-btn.active { background: #16a34a; color: #fff; box-shadow: 0 4px 12px rgba(22,163,74,0.4); }
        .uc-main { display: flex; flex-direction: column; gap: 24px; }
        .uc-card { background: rgba(30,41,59,0.6); border: 1px solid rgba(22,163,74,0.2); border-radius: 16px; padding: 24px; }
        .uc-card-title { color: #fff; font-size: 18px; font-weight: 700; margin: 0 0 20px; }
        .uc-input { width: 100%; padding: 12px 16px; background: rgba(30,41,59,0.8); border: 1px solid rgba(22,163,74,0.3); border-radius: 10px; color: #fff; font-size: 14px; margin-bottom: 12px; font-family: inherit; }
        .uc-input:focus { outline: none; border-color: #16a34a; box-shadow: 0 0 0 3px rgba(22,163,74,0.2); }
        .uc-textarea { width: 100%; padding: 12px 16px; background: rgba(30,41,59,0.8); border: 1px solid rgba(22,163,74,0.3); border-radius: 10px; color: #fff; font-size: 14px; margin-bottom: 12px; font-family: inherit; min-height: 120px; resize: vertical; }
        .uc-textarea:focus { outline: none; border-color: #16a34a; box-shadow: 0 0 0 3px rgba(22,163,74,0.2); }
        .uc-btn { background: #16a34a; color: #fff; border: none; padding: 12px 24px; border-radius: 10px; font-weight: 700; cursor: pointer; transition: all .2s; }
        .uc-btn:hover { background: #15803d; transform: translateY(-2px); }
        .uc-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .uc-btn-danger { background: #dc2626; }
        .uc-btn-danger:hover { background: #b91c1c; }
        .uc-file-upload { display: flex; align-items: center; gap: 12px; padding: 16px; background: rgba(22,163,74,0.1); border: 2px dashed rgba(22,163,74,0.4); border-radius: 12px; cursor: pointer; transition: all .2s; }
        .uc-file-upload:hover { background: rgba(22,163,74,0.15); border-color: rgba(22,163,74,0.6); }
        .uc-file-name { color: #4ade80; font-size: 13px; font-weight: 700; }
        .uc-progress { width: 100%; height: 6px; background: rgba(22,163,74,0.2); border-radius: 10px; overflow: hidden; margin-top: 8px; }
        .uc-progress-bar { height: 100%; background: #16a34a; transition: width .3s; }
        .uc-doc-card { background: rgba(22,163,74,0.1); border: 1px solid rgba(22,163,74,0.3); border-radius: 12px; padding: 16px; margin-bottom: 12px; }
        .uc-doc-title { color: #4ade80; font-weight: 700; margin-bottom: 4px; }
        .uc-doc-price { color: rgba(255,255,255,0.7); font-size: 13px; margin-bottom: 8px; }
        .uc-doc-actions { display: flex; gap: 8px; }
        .uc-doc-actions button { padding: 6px 12px; font-size: 12px; }
        .uc-stat-box { background: rgba(22,163,74,0.1); border: 1px solid rgba(22,163,74,0.3); border-radius: 12px; padding: 20px; text-align: center; }
        .uc-stat-value { font-size: 28px; font-weight: 900; color: #4ade80; }
        .uc-stat-label { font-size: 12px; color: rgba(255,255,255,0.6); margin-top: 6px; text-transform: uppercase; }
        .uc-modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.85); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(8px); }
        .uc-modal { background: #1e293b; border: 1px solid #16a34a; border-radius: 20px; width: 100%; max-width: 500px; padding: 24px; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
        @media (max-width: 1024px) { .uc-layout { grid-template-columns: 1fr; } .uc-sidebar { position: static; } }
      `}</style>

      <Toaster position="top-center" />
      <Navbar />

      {/* WhatsApp / Email Contact Modal */}
      {contactModal && (
        <div className="uc-modal-overlay" onClick={() => !isGenerating && !isSendingEmail && setContactModal(null)}>
          <div className="uc-modal" onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ color: "#fff", margin: 0 }}>
                {contactModal.channel === "email" ? "📧 Contact via Email" : "💬 Contact via WhatsApp"}
              </h3>
              <button
                onClick={() => !isGenerating && !isSendingEmail && setContactModal(null)}
                disabled={isGenerating || isSendingEmail}
                style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 20 }}
              >✕</button>
            </div>

            <div style={{ background: "rgba(255,255,255,0.05)", padding: 12, borderRadius: 10, marginBottom: 20 }}>
              <div style={{ color: "#4ade80", fontWeight: 700, fontSize: 13 }}>{inboxCustomerName(contactModal.record)}</div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 4 }}>
                {contactModal.channel === "email"
                  ? (contactModal.record.email || contactModal.record.emailAddress || "No email address")
                  : (contactModal.record.phone || contactModal.record.phoneNumber || contactModal.record.mobile || "No phone number")}
              </div>
            </div>

            {contactModal.channel === "email" && (
              <div style={{ marginBottom: 12 }}>
                <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, display: "block", marginBottom: 6 }}>Subject</label>
                <input
                  className="uc-input"
                  value={emailSubject}
                  onChange={e => setEmailSubject(e.target.value)}
                  placeholder="Email subject"
                  style={{ marginBottom: 0 }}
                />
              </div>
            )}

            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700 }}>Message</label>
                <button
                  className="uc-btn"
                  style={{ padding: "4px 10px", fontSize: 10, background: "#7c3aed" }}
                  onClick={() => generateAiWhatsappMessage(contactModal.record, contactModal.collectionInfo, contactModal.channel)}
                  disabled={isGenerating}
                >
                  {isGenerating ? "✨ Generating..." : "🤖 Draft with AI"}
                </button>
              </div>
              <textarea
                className="uc-textarea"
                style={{ minHeight: 150, marginBottom: 0 }}
                value={whatsappMessage}
                onChange={e => setWhatsappMessage(e.target.value)}
                placeholder="Type your message here..."
              />
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button
                className="uc-btn"
                style={{ flex: 1, background: contactModal.channel === "email" ? "#2563eb" : "#25d366" }}
                onClick={sendContact}
                disabled={isGenerating || isSendingEmail}
              >
                {contactModal.channel === "email" ? (isSendingEmail ? "Sending..." : "Send Email") : "Open WhatsApp"}
              </button>
              <button
                className="uc-btn"
                style={{ background: "#475569" }}
                onClick={() => !isGenerating && !isSendingEmail && setContactModal(null)}
                disabled={isGenerating || isSendingEmail}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="uc-container">
        <div className="uc-header">
          <h1 className="uc-title">⚡ WeberTech Control Center</h1>
          <p className="uc-subtitle">Unified admin hub: Documents, AI Training, Support, Analytics</p>
          <div className="uc-refresh-bar">
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>Last refresh: {lastRefresh || "Never"}</span>
            <button className="uc-refresh-btn" onClick={refreshData} disabled={loading}>
              {loading ? "⟳ Refreshing..." : "🔄 Refresh"}
            </button>
          </div>
          {storageDiagnostic && (
            <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 8, background: "rgba(220,38,38,0.16)", border: "1px solid rgba(252,165,165,0.55)", color: "#fecaca", fontSize: 13 }}>
              ⚠️ {storageDiagnostic}
            </div>
          )}
        </div>

        <div className="uc-layout">
          {/* Sidebar */}
          <aside className="uc-sidebar">
            <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", marginBottom: 12 }}>Control Menu</p>
            <button className={`uc-tab-btn ${tab === "overview" ? "active" : ""}`} onClick={() => setTab("overview")}>
              📊 Overview
            </button>
            <button className={`uc-tab-btn ${tab === "documents" ? "active" : ""}`} onClick={() => setTab("documents")}>
              📄 Documents
            </button>
            <button className={`uc-tab-btn ${tab === "ai" ? "active" : ""}`} onClick={() => setTab("ai")}>
              🤖 AI Training
            </button>
            <button className={`uc-tab-btn ${tab === "support" ? "active" : ""}`} onClick={() => setTab("support")}>
              💬 Support ({chats.length})
            </button>
            <button className={`uc-tab-btn ${tab === "inbox" ? "active" : ""}`} onClick={() => setTab("inbox")}>
              📥 Requests ({INBOX_COLLECTIONS.reduce((sum, item) => sum + (inboxData[item.id]?.length || 0), 0)})
            </button>
          </aside>

          {/* Main */}
          <main className="uc-main">
            {/* OVERVIEW */}
            {tab === "overview" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                <div className="uc-stat-box">
                  <div className="uc-stat-value">{stats.totalOrders}</div>
                  <div className="uc-stat-label">Total Orders</div>
                </div>
                <div className="uc-stat-box">
                  <div className="uc-stat-value">KES {stats.totalRevenue.toLocaleString()}</div>
                  <div className="uc-stat-label">Revenue</div>
                </div>
                <div className="uc-stat-box">
                  <div className="uc-stat-value">{stats.activeChats}</div>
                  <div className="uc-stat-label">Active Chats</div>
                </div>
                <div className="uc-stat-box">
                  <div className="uc-stat-value">{stats.documentsCount}</div>
                  <div className="uc-stat-label">Documents</div>
                </div>
              </div>
            )}

            {/* DOCUMENTS */}
            {tab === "documents" && (
              <>
                <div className="uc-card">
                  <h3 className="uc-card-title">➕ Add New Document</h3>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Title *</label>
                      <input
                        className="uc-input"
                        placeholder="e.g., Car Sale Agreement"
                        value={newDoc.title}
                        onChange={e => setNewDoc({ ...newDoc, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Price (KES) *</label>
                      <input
                        className="uc-input"
                        type="number"
                        placeholder="199"
                        value={newDoc.price}
                        onChange={e => setNewDoc({ ...newDoc, price: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Category</label>
                      <select
                        className="uc-input"
                        value={newDoc.category}
                        onChange={e => {
                          const cat = e.target.value;
                          setNewDoc({
                            ...newDoc,
                            category: cat,
                            subcategory: cat === "cyber" ? "templates" : ""
                          });
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <option value="cyber">Cyber Division (Legal)</option>
                        <option value="academy">Academy</option>
                        <option value="electronics">Electronics</option>
                        <option value="bundles">Bundles</option>
                        <option value="dev">Dev Services</option>
                        <option value="hustle">Hustle KE</option>
                      </select>
                    </div>
                    {newDoc.category === "cyber" && (
                      <div>
                        <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Legal Category *</label>
                        <select
                          className="uc-input"
                          value={newDoc.subcategory}
                          onChange={e => setNewDoc({ ...newDoc, subcategory: e.target.value })}
                          style={{ cursor: "pointer", border: "1px solid #16a34a" }}
                        >
                          {LEGAL_SUBCATEGORIES.map(sub => (
                            <option key={sub.id} value={sub.id}>{sub.emoji} {sub.label}</option>
                          ))}
                        </select>
                      </div>
                    )}
                    <div>
                      <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Icon</label>
                      <input
                        className="uc-input"
                        placeholder="🚗"
                        maxLength="2"
                        value={newDoc.icon}
                        onChange={e => setNewDoc({ ...newDoc, icon: e.target.value })}
                      />
                    </div>
                  </div>

                  <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Description</label>
                  <textarea
                    className="uc-textarea"
                    placeholder="Brief description..."
                    value={newDoc.description}
                    onChange={e => setNewDoc({ ...newDoc, description: e.target.value })}
                  />

                  <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Features (comma-separated)</label>
                  <input
                    className="uc-input"
                    placeholder="e.g., Editable format, Legal compliance, Ready in minutes"
                    value={newDoc.features}
                    onChange={e => setNewDoc({ ...newDoc, features: e.target.value })}
                  />

                  <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Upload Document File</label>
                  <div
                    className="uc-file-upload"
                    onClick={() => {
                      if (!loading && !uploading) fileInputRef.current?.click();
                    }}
                  >
                    <span style={{ fontSize: 20 }}>📤</span>
                    <div>
                      <div style={{ color: "#fff", fontWeight: 700 }}>Click to upload or drag and drop</div>
                      <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>PDF, DOCX, or images</div>
                      {newDoc.fileName && <div className="uc-file-name">✅ {newDoc.fileName}</div>}
                      {uploadError && <div style={{ color: "#fca5a5", fontSize: 12, marginTop: 6 }}>⚠️ {uploadError}</div>}
                    </div>
                  </div>
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="uc-progress">
                      <div className="uc-progress-bar" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileSelect}
                    style={{ display: "none" }}
                    accept=".pdf,.docx,.doc,.jpg,.jpeg,.png,.gif"
                    disabled={loading || uploading}
                  />

                  <div style={{ marginTop: 14, padding: 14, borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)" }}>
                    <label style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>
                      Or use a hosted document URL
                    </label>
                    <input
                      className="uc-input"
                      type="url"
                      placeholder="https://your-public-host.com/document.pdf"
                      value={newDoc.fileUrl}
                      onChange={e => {
                        const value = e.target.value;
                        setNewDoc(prev => ({
                          ...prev,
                          fileUrl: value,
                          fileName: value ? "Hosted document" : "",
                        }));
                        setUploadError("");
                      }}
                      disabled={loading || uploading}
                    />
                    <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, lineHeight: 1.5 }}>
                      Store the PDF/DOCX in Google Drive, Dropbox, or your own website, enable public access, and paste its direct HTTPS link here. The link must open without login.
                    </div>
                  </div>

                  <button className="uc-btn" onClick={handleAddDocument} disabled={loading || uploading} style={{ width: "100%", marginTop: 16 }}>
                    {uploading ? "⟳ Uploading..." : loading ? "⟳ Adding..." : "✅ Add Document"}
                  </button>
                </div>

                <div className="uc-card" style={{ border: "1px solid rgba(59,130,246,0.45)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                    <div>
                      <h3 className="uc-card-title" style={{ marginBottom: 6 }}>🔎 Find & Edit a Document</h3>
                      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, margin: 0 }}>Search the loaded live catalog by title, slug, category, ID, description, or filename. The first match will populate the editor.</p>
                    </div>
                    <span style={{ color: "#93c5fd", fontSize: 12, fontWeight: 700 }}>{documents.length} loaded</span>
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "stretch", flexWrap: "wrap", marginTop: 16 }}>
                    <input
                      className="uc-input"
                      style={{ flex: "1 1 280px", marginBottom: 0 }}
                      type="search"
                      value={documentSearch}
                      placeholder="Search e.g. NDA, car sale, cyber, or document ID"
                      onChange={e => {
                        setDocumentSearch(e.target.value);
                        setDocumentSearchMessage("");
                      }}
                      onKeyDown={e => {
                        if (e.key === "Enter") findDocumentToEdit();
                      }}
                      aria-label="Search documents to edit"
                    />
                    <button className="uc-btn" onClick={findDocumentToEdit} disabled={loading || documents.length === 0} style={{ whiteSpace: "nowrap" }}>
                      {loading ? "⟳ Working..." : "✏️ Find & Populate"}
                    </button>
                    {documentSearch && (
                      <button
                        className="uc-btn"
                        onClick={() => { setDocumentSearch(""); setDocumentSearchMessage(""); }}
                        disabled={loading}
                        style={{ background: "#475569", whiteSpace: "nowrap" }}
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  {documentSearchMessage && (
                    <div style={{ marginTop: 10, color: filteredDocuments.length ? "#86efac" : "#fca5a5", fontSize: 12 }}>
                      {filteredDocuments.length ? "✅ " : "⚠️ "}{documentSearchMessage}
                    </div>
                  )}
                  {normalizedDocumentSearch && filteredDocuments.length > 0 && (
                    <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
                      {filteredDocuments.slice(0, 6).map(documentRecord => (
                        <button
                          key={documentRecord.id}
                          type="button"
                          onClick={() => {
                            startEditDocument(documentRecord);
                            setDocumentSearchMessage(`Editing ${documentRecord.title || "the selected document"}.`);
                          }}
                          style={{ textAlign: "left", border: "1px solid rgba(147,197,253,0.3)", background: "rgba(59,130,246,0.1)", color: "#fff", borderRadius: 8, padding: "10px 12px", cursor: "pointer" }}
                        >
                          <strong>{documentRecord.icon || "📄"} {documentRecord.title || "Untitled document"}</strong>
                          <span style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: 11, marginTop: 3 }}>
                            KES {Number(documentRecord.price || 0).toLocaleString()} · {documentRecord.category || documentRecord.division || "uncategorized"} · {documentRecord.published === false ? "Draft" : "Published"}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {editingDoc && (
                  <div ref={editDocRef} id="uc-document-editor" className="uc-card" style={{ border: "1px solid rgba(74,222,128,0.55)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                      <h3 className="uc-card-title">✏️ Edit Product & Price</h3>
                      <button className="uc-btn" onClick={() => { setEditingDoc(null); setEditDocForm({}); }} style={{ padding: "6px 12px", fontSize: 12 }}>Cancel</button>
                    </div>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 0 }}>Changes save directly to the live catalog and appear to customers after their next refresh.</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Title *</label>
                        <input className="uc-input" value={editDocForm.title || ""} onChange={e => setEditDocForm(prev => ({ ...prev, title: e.target.value }))} />
                      </div>
                      <div>
                        <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Price (KES) *</label>
                        <input className="uc-input" type="number" min="0" max="1000000" step="1" value={editDocForm.price ?? 0} onChange={e => setEditDocForm(prev => ({ ...prev, price: e.target.value }))} />
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Category</label>
                        <select
                          className="uc-input"
                          value={editDocForm.category || "cyber"}
                          onChange={e => {
                            const cat = e.target.value;
                            setEditDocForm(prev => ({
                              ...prev,
                              category: cat,
                              subcategory: cat === "cyber" ? (prev.subcategory || "templates") : ""
                            }));
                          }}
                        >
                          <option value="cyber">Cyber Division (Legal)</option>
                          <option value="academy">Academy</option>
                          <option value="electronics">Electronics</option>
                          <option value="bundles">Bundles</option>
                          <option value="dev">Dev Services</option>
                          <option value="hustle">Hustle KE</option>
                        </select>
                      </div>
                      {editDocForm.category === "cyber" && (
                        <div>
                          <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Legal Category *</label>
                          <select
                            className="uc-input"
                            value={editDocForm.subcategory || "templates"}
                            onChange={e => setEditDocForm(prev => ({ ...prev, subcategory: e.target.value }))}
                            style={{ cursor: "pointer", border: "1px solid #16a34a" }}
                          >
                            {LEGAL_SUBCATEGORIES.map(sub => (
                              <option key={sub.id} value={sub.id}>{sub.emoji} {sub.label}</option>
                            ))}
                          </select>
                        </div>
                      )}
                      <div>
                        <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Icon</label>
                        <input className="uc-input" maxLength="2" value={editDocForm.icon || "📄"} onChange={e => setEditDocForm(prev => ({ ...prev, icon: e.target.value }))} />
                      </div>
                    </div>
                    <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Description</label>
                    <textarea className="uc-textarea" value={editDocForm.description || ""} onChange={e => setEditDocForm(prev => ({ ...prev, description: e.target.value }))} />
                    <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Features (comma-separated)</label>
                    <input className="uc-input" value={editDocForm.features || ""} onChange={e => setEditDocForm(prev => ({ ...prev, features: e.target.value }))} />
                    <label style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.8)", fontSize: 13, marginTop: 14 }}>
                      <input type="checkbox" checked={editDocForm.published !== false} onChange={e => setEditDocForm(prev => ({ ...prev, published: e.target.checked }))} />
                      Published in the customer catalog
                    </label>
                    <button className="uc-btn" onClick={handleUpdateDocument} disabled={loading} style={{ width: "100%", marginTop: 16 }}>
                      {loading ? "⟳ Saving..." : "💾 Save live changes"}
                    </button>
                  </div>
                )}

                <div className="uc-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                    <h3 className="uc-card-title" style={{ marginBottom: 0 }}>📋 {normalizedDocumentSearch ? `Matching Documents (${filteredDocuments.length})` : `All Documents (${documents.length})`}</h3>
                    {normalizedDocumentSearch && <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>Showing live search results</span>}
                  </div>
                  {documents.length === 0 ? (
                    <p style={{ color: "rgba(255,255,255,0.5)", textAlign: "center", padding: "20px 0" }}>No documents loaded. Click Refresh, then search again.</p>
                  ) : filteredDocuments.length === 0 ? (
                    <p style={{ color: "rgba(255,255,255,0.5)", textAlign: "center", padding: "20px 0" }}>No documents match “{documentSearch}”.</p>
                  ) : (
                    filteredDocuments.map(doc => (
                      <div key={doc.id} className="uc-doc-card">
                        <div className="uc-doc-title">{doc.icon || "📄"} {doc.title}</div>
                        <div className="uc-doc-price">KES {doc.price} • {doc.category}</div>
                        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginBottom: 8 }}>{doc.description}</div>
                        {doc.fileName && <div style={{ color: "#4ade80", fontSize: 12, marginBottom: 8 }}>📎 {doc.fileName}</div>}
                        <div className="uc-doc-actions">
                          <button
                            className="uc-btn"
                            style={{ fontSize: 12, padding: "6px 12px" }}
                            onClick={() => startEditDocument(doc)}
                            disabled={loading}
                          >
                            ✏️ Edit & Price
                          </button>
                          {doc.fileUrl && (
                            <a href={doc.fileUrl} target="_blank" rel="noreferrer" className="uc-btn" style={{ fontSize: 12, padding: "6px 12px", textDecoration: "none" }}>
                              📥 Download
                            </a>
                          )}
                          <button
                            className="uc-btn uc-btn-danger"
                            style={{ fontSize: 12, padding: "6px 12px" }}
                            onClick={() => handleDeleteDocument(doc.id, doc.fileUrl)}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}

            {/* AI TRAINING */}
            {tab === "ai" && (
              <div className="uc-card">
                <h3 className="uc-card-title">🤖 AI Training & Behavior</h3>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginBottom: 20 }}>
                  ⚠️ WeberAI provides direct service links and instructions. No PDFs.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                  <div>
                    <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Personality</label>
                    <input
                      className="uc-input"
                      placeholder="e.g., Professional and helpful"
                      value={aiTraining.personality}
                      onChange={e => setAiTraining({ ...aiTraining, personality: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Language</label>
                    <input
                      className="uc-input"
                      placeholder="e.g., English & Swahili"
                      value={aiTraining.language}
                      onChange={e => setAiTraining({ ...aiTraining, language: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Tone</label>
                    <input
                      className="uc-input"
                      placeholder="e.g., Friendly but formal"
                      value={aiTraining.tone}
                      onChange={e => setAiTraining({ ...aiTraining, tone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Response Style</label>
                    <input
                      className="uc-input"
                      placeholder="e.g., Concise and clear"
                      value={aiTraining.responseStyle}
                      onChange={e => setAiTraining({ ...aiTraining, responseStyle: e.target.value })}
                    />
                  </div>
                </div>

                <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Knowledge Base</label>
                <textarea
                  className="uc-textarea"
                  placeholder="Paste all service details, pricing, and product information..."
                  value={aiTraining.knowledgeBase}
                  onChange={e => setAiTraining({ ...aiTraining, knowledgeBase: e.target.value })}
                  style={{ minHeight: 200 }}
                />

                <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, marginBottom: 6, display: "block" }}>Behavior Rules</label>
                <textarea
                  className="uc-textarea"
                  placeholder="How should the AI handle scenarios? E.g., 'Always provide direct links to services.'"
                  value={aiTraining.behaviorRules}
                  onChange={e => setAiTraining({ ...aiTraining, behaviorRules: e.target.value })}
                  style={{ minHeight: 200 }}
                />

                <button className="uc-btn" onClick={handleSaveAITraining} disabled={loading} style={{ width: "100%" }}>
                  {loading ? "⟳ Saving..." : "💾 Save AI Training"}
                </button>
              </div>
            )}

            {/* CUSTOMER REQUESTS, WAITLISTS & REPORTS */}
            {tab === "inbox" && (
              <AdminInbox
                inboxData={inboxData}
                inboxFilter={inboxFilter}
                setInboxFilter={setInboxFilter}
                inboxLoading={inboxLoading}
                refreshInboxData={refreshInboxData}
                handleInboxStatus={handleInboxStatus}
                handleDeleteInboxItem={handleDeleteInboxItem}
                loading={loading}
                viewMode={inboxViewMode}
                setViewMode={setInboxViewMode}
                openContactModal={openContactModal}
              />
            )}

            {/* SUPPORT */}
            {tab === "support" && (
              <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 16 }}>
                <div className="uc-card" style={{ maxHeight: "600px", overflowY: "auto" }}>
                  <h3 className="uc-card-title">💬 Chats ({chats.length})</h3>
                  {chats.length === 0 ? (
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>No chats yet.</p>
                  ) : (
                    chats.map(chat => (
                      <div
                        key={chat.id}
                        onClick={() => setSelectedChat(chat)}
                        style={{
                          padding: 12,
                          background: selectedChat?.id === chat.id ? "rgba(22,163,74,0.2)" : "rgba(255,255,255,0.05)",
                          border: selectedChat?.id === chat.id ? "1px solid #16a34a" : "1px solid rgba(22,163,74,0.2)",
                          borderRadius: 10,
                          cursor: "pointer",
                          marginBottom: 8,
                          transition: "all .2s",
                        }}
                      >
                        <div style={{ color: "#4ade80", fontWeight: 700, fontSize: 13 }}>{chat.customerName || "Customer"}</div>
                        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 4 }}>{chat.lastMessage?.substring(0, 40)}...</div>
                      </div>
                    ))
                  )}
                </div>

                <div className="uc-card">
                  {selectedChat ? (
                    <>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                        <h3 className="uc-card-title">💬 Chat with {selectedChat.customerName || "Customer"}</h3>
                        <button onClick={() => loadChatMessages(selectedChat)} disabled={refreshingChat} aria-label="Refresh selected chat" style={{ border: "1px solid rgba(74,222,128,0.45)", background: "rgba(22,163,74,0.15)", color: "#86efac", borderRadius: 8, padding: "7px 10px", cursor: refreshingChat ? "wait" : "pointer", fontWeight: 700 }}>{refreshingChat ? "…" : "↻ Refresh"}</button>
                      </div>
                      <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: 10, padding: 16, minHeight: 300, maxHeight: 400, overflowY: "auto", marginBottom: 16 }}>
                        {chatMessages.map(msg => (
                          <div
                            key={msg.id}
                            style={{
                              marginBottom: 12,
                              textAlign: msg.sender === "admin" ? "right" : "left",
                            }}
                          >
                            <div
                              style={{
                                display: "inline-block",
                                maxWidth: "70%",
                                padding: "10px 14px",
                                borderRadius: 10,
                                background: msg.sender === "admin" ? "#16a34a" : "rgba(22,163,74,0.2)",
                                color: msg.sender === "admin" ? "#fff" : "rgba(255,255,255,0.8)",
                                fontSize: 13,
                              }}
                            >
                              {msg.text}
                            </div>
                          </div>
                        ))}
                        <div ref={chatEndRef} />
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8 }}>
                        <input
                          className="uc-input"
                          placeholder="Type your reply..."
                          value={adminReply}
                          onChange={e => setAdminReply(e.target.value)}
                          onKeyPress={e => e.key === "Enter" && handleSendReply()}
                          style={{ marginBottom: 0 }}
                        />
                        <button className="uc-btn" onClick={handleSendReply} disabled={loading}>
                          Send
                        </button>
                      </div>
                    </>
                  ) : (
                    <p style={{ color: "rgba(255,255,255,0.5)", textAlign: "center", padding: "40px 0" }}>Select a chat to start</p>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
}
