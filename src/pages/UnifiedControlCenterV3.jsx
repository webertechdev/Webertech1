// src/pages/UnifiedControlCenterV3.jsx
// WeberTech Control Center v3 - With Upload Progress & Fixed Hanging

import { useState, useEffect, useRef } from "react";
import { collection, getDocs, doc, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage, firebaseRuntime } from "../config/firebase";
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

function AdminInbox({ inboxData, inboxFilter, setInboxFilter, inboxLoading, refreshInboxData, handleInboxStatus, handleDeleteInboxItem, loading }) {
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
          <button className="uc-refresh-btn" onClick={() => refreshInboxData()} disabled={inboxLoading || loading}>
            {inboxLoading ? "⟳ Loading..." : "🔄 Refresh requests"}
          </button>
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
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [adminReply, setAdminReply] = useState("");
  const [lastRefresh, setLastRefresh] = useState(null);
  const [newDoc, setNewDoc] = useState({
    title: "",
    description: "",
    price: 0,
    category: "cyber",
    icon: "📄",
    features: "",
    fileUrl: "",
    fileName: "",
  });
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

  // Load chat messages
  useEffect(() => {
    if (!selectedChat) return;
    const loadMessages = async () => {
      try {
        const messagesSnap = await getDocs(collection(db, "chats", selectedChat.id, "messages"));
        const msgs = messagesSnap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => a.timestamp - b.timestamp);
        setChatMessages(msgs);
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      } catch (err) {
        console.error("Message load error:", err);
      }
    };
    loadMessages();
  }, [selectedChat]);

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
        category: newDoc.category,
        icon: newDoc.icon,
        features: newDoc.features,
        fileUrl,
        fileName,
        slug,
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
        @media (max-width: 1024px) { .uc-layout { grid-template-columns: 1fr; } .uc-sidebar { position: static; } }
      `}</style>

      <Toaster position="top-center" />
      <Navbar />

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
                        onChange={e => setNewDoc({ ...newDoc, category: e.target.value })}
                        style={{ cursor: "pointer" }}
                      >
                        <option value="cyber">Cyber Division</option>
                        <option value="academy">Academy</option>
                        <option value="electronics">Electronics</option>
                        <option value="bundles">Bundles</option>
                      </select>
                    </div>
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

                <div className="uc-card">
                  <h3 className="uc-card-title">📋 All Documents ({documents.length})</h3>
                  {documents.length === 0 ? (
                    <p style={{ color: "rgba(255,255,255,0.5)", textAlign: "center", padding: "20px 0" }}>No documents yet. Add your first one above!</p>
                  ) : (
                    documents.map(doc => (
                      <div key={doc.id} className="uc-doc-card">
                        <div className="uc-doc-title">{doc.icon || "📄"} {doc.title}</div>
                        <div className="uc-doc-price">KES {doc.price} • {doc.category}</div>
                        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginBottom: 8 }}>{doc.description}</div>
                        {doc.fileName && <div style={{ color: "#4ade80", fontSize: 12, marginBottom: 8 }}>📎 {doc.fileName}</div>}
                        <div className="uc-doc-actions">
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
                      <h3 className="uc-card-title">💬 Chat with {selectedChat.customerName || "Customer"}</h3>
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
