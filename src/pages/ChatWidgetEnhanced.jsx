// src/pages/ChatWidgetEnhanced.jsx
// WeberAI — Comprehensive Platform Assistant
// Features: PDF generation, Service recognition, Real-time tracking

import { useState, useEffect, useRef } from "react";
import {
  collection, addDoc, serverTimestamp,
  doc, setDoc, getDoc, getDocs, query, orderBy
} from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

const BUNDLES_URL  = "https://bundles.webertech.co.ke";
const WHATSAPP_URL = "https://wa.me/254722508904";

const QUICK = {
  en: [
    "What services does WeberTech offer?",
    "How do I buy bundles?",
    "Where can I get a professional CV?",
    "How do I register a business?",
    "Tell me about the Academy",
  ],
  sw: [
    "WeberTech inatoa huduma gani?",
    "Ninunue bundle vipi?",
    "Ninapata wapi CV ya kisasa?",
    "Nasajili vipi biashara?",
    "Niambie kuhusu Academy",
  ],
};

const GREETING = {
  en: "👋 Jambo! I'm WeberAI, your personal WeberTech assistant.\nI can help you find the right WeberTech service, open the correct page, and follow the next steps. What would you like help with today?",
  sw: "👋 Jambo! Mimi ni WeberAI, msaidizi wako wa WeberTech.\nNaweza kukusaidia kupata huduma sahihi, kufungua ukurasa unaofaa, na kufuata hatua zinazofuata. Nikusaidie nini leo?",
};

function getSessionId(userId) {
  const key = `wt_chat_session_${userId}`;
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = "sess_" + userId + "_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
    sessionStorage.setItem(key, id);
  }
  return id;
}

const CSS = `
  .wt-tab { position: fixed; top: 50%; right: 0; transform: translateY(-50%); z-index: 9000; background: linear-gradient(180deg,#15803d,#16a34a); color: #fff; border: none; border-radius: 10px 0 0 10px; padding: 16px 10px; cursor: pointer; writing-mode: vertical-rl; font-size: 13px; font-weight: 700; letter-spacing: 1px; box-shadow: -3px 0 18px rgba(22,163,74,0.4); transition: padding .2s; font-family: inherit; display: flex; align-items: center; gap: 8px; }
  .wt-tab:hover { padding: 16px 14px; }
  .wt-tab-dot { width: 8px; height: 8px; border-radius: 50%; background: #4ade80; display: inline-block; animation: wtblink 1.5s ease-in-out infinite; }
  @keyframes wtblink { 0%,100%{opacity:1} 50%{opacity:.25} }
  .wt-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.3); z-index: 9001; animation: wtfade .2s ease both; }
  @keyframes wtfade { from{opacity:0} to{opacity:1} }
  .wt-sidebar { position: fixed; top: 0; right: 0; bottom: 0; width: 400px; background: #fff; z-index: 9002; display: flex; flex-direction: column; box-shadow: -6px 0 32px rgba(0,0,0,0.16); font-family: inherit; }
  .wt-open  { animation: wtslide .28s cubic-bezier(.175,.885,.32,1.1) both; }
  .wt-close { animation: wtslideout .22s ease both; }
  @keyframes wtslide    { from{transform:translateX(100%)} to{transform:translateX(0)} }
  @keyframes wtslideout { from{transform:translateX(0)} to{transform:translateX(100%)} }
  .wt-head { background: linear-gradient(135deg,#15803d,#16a34a); padding: 14px 16px; display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; }
  .wt-msgs { flex: 1; overflow-y: auto; padding: 14px 13px; display: flex; flex-direction: column; gap: 10px; background: #f9fafb; }
  .wt-msgs::-webkit-scrollbar { width: 4px; }
  .wt-msgs::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
  .wt-bub { max-width: 86%; padding: 10px 13px; border-radius: 15px; font-size: 13.5px; line-height: 1.55; word-break: break-word; animation: wtmsgin .2s ease both; }
  @keyframes wtmsgin { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
  .wt-ai   { background:#fff; border:1.5px solid #e5e7eb; align-self:flex-start; border-bottom-left-radius:3px; }
  .wt-user { background:#16a34a; color:#fff; align-self:flex-end; border-bottom-right-radius:3px; }
  .wt-err  { background:#fef2f2; border:1.5px solid #fca5a5; align-self:flex-start; }
  .wt-typing { display: flex; gap: 4px; padding: 10px 13px; background: #fff; border: 1.5px solid #e5e7eb; border-radius: 15px; border-bottom-left-radius: 3px; align-self: flex-start; align-items: center; }
  .wt-typing span { width: 6px; height: 6px; border-radius: 50%; background: #9ca3af; animation: wtbounce .9s ease-in-out infinite; }
  .wt-typing span:nth-child(2){animation-delay:.18s}
  .wt-typing span:nth-child(3){animation-delay:.36s}
  @keyframes wtbounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
  .wt-pdf-btn { display: flex; align-items: center; gap: 8px; background: #f0fdf4; border: 1.5px solid #16a34a; color: #16a34a; border-radius: 10px; padding: 10px 14px; font-size: 13px; font-weight: 700; cursor: pointer; margin-top: 10px; transition: all .15s; }
  .wt-pdf-btn:hover { background: #16a34a; color: #fff; }
  .wt-chips { display: flex; flex-wrap: wrap; gap: 6px; padding: 10px 13px; background: #fff; border-top: 1px solid #f3f4f6; flex-shrink: 0; }
  .wt-chip { background: #f0fdf4; border: 1.5px solid #86efac; color: #15803d; border-radius: 99px; padding: 5px 11px; font-size: 12px; font-weight: 600; cursor: pointer; transition: all .13s; white-space: nowrap; font-family: inherit; }
  .wt-chip:hover { background: #16a34a; color: #fff; border-color: #16a34a; }
  .wt-input-row { display: flex; gap: 8px; padding: 11px 13px; border-top: 1px solid #e5e7eb; background: #fff; flex-shrink: 0; }
  .wt-input { flex: 1; padding: 9px 13px; border: 1.5px solid #e5e7eb; border-radius: 10px; font-size: 14px; outline: none; font-family: inherit; resize: none; max-height: 80px; line-height: 1.5; transition: border-color .15s; }
  .wt-input:focus { border-color: #16a34a; box-shadow: 0 0 0 3px rgba(22,163,74,.1); }
  .wt-send { width: 38px; height: 38px; border-radius: 10px; background: #16a34a; border: none; cursor: pointer; color: #fff; font-size: 17px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; transition: background .13s; }
  .wt-send:hover:not(:disabled) { background: #15803d; }
  .wt-send:disabled { background: #9ca3af; cursor: not-allowed; }
  @media (max-width: 440px) { .wt-sidebar { width: 100vw; } }
  @keyframes wtspin { to{transform:rotate(360deg)} }
  .wt-spin { display: inline-block; animation: wtspin .8s linear infinite; }
`;

function tstamp() {
  return new Date().toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" });
}

// Render the Markdown links returned by WeberAI as safe clickable links.
function renderMessageLine(line, lineIndex) {
  const tokenPattern = /\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]+)\)|(https?:\/\/[^\s]+|\/(?:cyber|academy|electronics|dev|hustle|dashboard|auth)(?:[^\s]*)?)/g;
  const parts = [];
  let cursor = 0;
  let match;

  while ((match = tokenPattern.exec(line)) !== null) {
    if (match.index > cursor) parts.push(line.slice(cursor, match.index));
    const href = match[2] || match[3];
    const label = match[1] || href;
    parts.push(
      <a
        key={`${lineIndex}-${match.index}`}
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        style={{ color: "#15803d", fontWeight: 800, textDecoration: "underline" }}
      >
        {label}
      </a>
    );
    cursor = tokenPattern.lastIndex;
  }

  if (cursor < line.length) parts.push(line.slice(cursor));
  return parts.length ? parts : line;
}

export default function ChatWidgetEnhanced() {
  const [open,      setOpen]      = useState(false);
  const [closing,   setClosing]   = useState(false);
  const [lang,      setLang]      = useState("en");
  const [msgs,      setMsgs]      = useState([]);
  const [input,     setInput]     = useState("");
  const [loading,   setLoading]   = useState(false);
  const [unread,    setUnread]    = useState(true);
  const [sessionId, setSessionId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [authMode,    setAuthMode]    = useState("login"); // "login" | "register"
  const [authEmail,   setAuthEmail]   = useState("");
  const [authPass,    setAuthPass]    = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [refreshing,  setRefreshing]  = useState(false);
  const bottomRef   = useRef(null);
  const inputRef    = useRef(null);
  const cssInjected = useRef(false);

  useEffect(() => {
    if (cssInjected.current) return;
    cssInjected.current = true;
    const s = document.createElement("style");
    s.textContent = CSS;
    document.head.appendChild(s);
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => setCurrentUser(u));
    return () => unsub();
  }, []);

  const loadMessages = async (sid, language = lang) => {
    if (!sid || !currentUser) return;
    setRefreshing(true);
    const greeting = { role:"ai", text:GREETING[language], time:tstamp(), id:"greeting" };
    try {
      const snap = await getDocs(query(collection(db, "chats", sid, "messages"), orderBy("timestamp", "asc")));
      const newMsgs = snap.docs.map(d => ({
        role: d.data().sender === "user" ? "user" : "ai",
        text: typeof d.data().text === "string" ? d.data().text : "",
        time: d.data().timestamp?.toDate?.().toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" }) || tstamp(),
        id: d.id,
        pdfData: d.data().metadata?.pdfData
      }));
      setMsgs([greeting, ...newMsgs]);
    } catch (err) {
      console.error("Chat refresh failed:", err);
      setMsgs([greeting]);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      setSessionId(null);
      setMsgs([]);
      return;
    }
    const sid = getSessionId(currentUser.uid);
    setSessionId(sid);
    loadMessages(sid, lang);
  }, [lang, currentUser?.uid]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:"smooth" });
  }, [msgs]);

  useEffect(() => {
    if (open) {
      setUnread(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const openChat  = () => { setOpen(true); setClosing(false); };
  const closeChat = () => {
    setClosing(true);
    setTimeout(() => { setOpen(false); setClosing(false); }, 220);
  };

  const saveMsg = async (role, text, metadata = {}) => {
    if (!sessionId) return;
    try {
      const chatRef = doc(db, "chats", sessionId);
      const chatSnap = await getDoc(chatRef);
      const chatData = chatSnap.exists() ? chatSnap.data() : {};

      // Sync customer info and last message for Admin Dashboard
      await setDoc(chatRef, {
        sessionId,
        userId:       currentUser?.uid || null,
        userEmail:    currentUser?.email || null,
        customerName: currentUser?.displayName || (currentUser?.email ? currentUser.email.split("@")[0] : "Anonymous"),
        lastMessage:  text,
        lang,
        updatedAt:    serverTimestamp(),
        status:       "active",
        adminTakeover: chatData.adminTakeover || false
      }, { merge: true });

      await addDoc(collection(db, "chats", sessionId, "messages"), {
        sender:    role === "user" ? "user" : (role === "ai" ? "ai" : "admin"),
        text,
        metadata,
        timestamp: serverTimestamp(),
      });
    } catch (err) {
      console.error("Firestore save error:", err);
    }
  };

  const handleGeneratePDF = async (pdfData) => {
    const { type, content } = pdfData;
    setLoading(true);
    try {
      const res = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, content }),
      });
      const data = await res.json();
      if (data.success) {
        // Create download link
        const blob = await (await fetch(`data:application/pdf;base64,${data.pdfBase64}`)).blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = data.fileName;
        a.click();
      }
    } catch (err) {
      console.error("PDF generation failed:", err);
    }
    setLoading(false);
  };

  const send = async (text) => {
    const q = (text || input).trim();
    if (!q || loading) return;
    setInput("");

    const userMsg = { role:"user", text:q, time:tstamp(), id:"u_" + Date.now() };
    setMsgs(prev => [...prev, userMsg]);
    await saveMsg("user", q);

    setLoading(true);

    try {
      // Check if admin has taken over
      const chatSnap = await getDoc(doc(db, "chats", sessionId));
      if (chatSnap.exists() && chatSnap.data().adminTakeover) {
        setLoading(false);
        return; // Admin is in control, AI stays silent
      }

      const history = [...msgs, userMsg]
        .filter(m => m.role === "user" || m.role === "ai")
        .slice(-10)
        .map(m => ({ role: m.role, text: m.text }));

      const res = await fetch("/api/chat", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ messages: history, lang }),
      });

      const data = await res.json();
      let answer = typeof data.answer === "string"
        ? data.answer
        : (data.error || "Sorry, I could not process that request. Please try again or contact WeberTech on WhatsApp.");
      let pdfData = null;

      // Check for PDF generation tag
      const pdfMatch = answer.match(/\[GENERATE_PDF:\s*(.*?)\s*\|\s*(.*?)\s*\]/s);
      if (pdfMatch) {
        pdfData = { type: pdfMatch[1], content: pdfMatch[2] };
        answer = answer.replace(pdfMatch[0], "").trim();
      }

      const aiMsg = { role:"ai", text:answer, time:tstamp(), id:"ai_" + Date.now(), pdfData };
      setMsgs(prev => [...prev, aiMsg]);
      await saveMsg("ai", answer, { pdfData });

    } catch (err) {
      setMsgs(prev => [...prev, { role:"ai", text:"Sorry, I'm having trouble connecting. Please try again.", time:tstamp(), id:"err_"+Date.now(), isErr:true }]);
    }
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const showChips = msgs.length <= 1 && !loading;

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    try {
      if (authMode === "login") {
        await signInWithEmailAndPassword(auth, authEmail, authPass);
        toast.success("Welcome back!");
      } else {
        await createUserWithEmailAndPassword(auth, authEmail, authPass);
        toast.success("Account created!");
      }
    } catch (err) {
      toast.error(err.message);
    }
    setAuthLoading(false);
  };

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Welcome!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      {(open || closing) && <div className="wt-overlay" onClick={closeChat} />}
      {(open || closing) && (
        <div className={`wt-sidebar ${closing ? "wt-close" : "wt-open"}`}>
          <div className="wt-head">
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:36, height:36, borderRadius:"50%", background:"rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>🤖</div>
              <div>
                <div style={{ color:"#fff", fontWeight:800, fontSize:14 }}>WeberAI</div>
                <div style={{ color:"rgba(255,255,255,0.75)", fontSize:11, display:"flex", alignItems:"center", gap:5, marginTop:2 }}>
                  <span style={{ width:6, height:6, borderRadius:"50%", background:"#4ade80", display:"inline-block" }} />
                  Online & Ready
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <select
                value={lang}
                onChange={e => setLang(e.target.value)}
                style={{
                  padding: "4px 8px",
                  borderRadius: 6,
                  border: "none",
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: "pointer",
                  background: "rgba(255,255,255,0.2)",
                  color: "#fff",
                  outline: "none"
                }}
              >
                <option value="en" style={{ color: "#000" }}>EN</option>
                <option value="sw" style={{ color: "#000" }}>SW</option>
              </select>
              {currentUser && <button onClick={() => loadMessages(sessionId, lang)} disabled={refreshing} aria-label="Refresh chat" style={{ background:"rgba(255,255,255,0.18)", border:"none", borderRadius:7, width:28, height:28, cursor:refreshing ? "wait" : "pointer", color:"#fff" }}>{refreshing ? "…" : "↻"}</button>}
              <button onClick={closeChat} style={{ background:"rgba(255,255,255,0.18)", border:"none", borderRadius:7, width:28, height:28, cursor:"pointer", color:"#fff" }}>✕</button>
            </div>
          </div>

          {!currentUser ? (
            <div style={{ flex: 1, padding: 30, display: "flex", flexDirection: "column", justifyContent: "center", background: "#f9fafb" }}>
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <div style={{ fontSize: 40, marginBottom: 10 }}>👤</div>
                <h3 style={{ fontWeight: 800, fontSize: 20, color: "#111827", marginBottom: 6 }}>Welcome to WeberAI</h3>
                <p style={{ color: "#6b7280", fontSize: 13 }}>Please log in to track your assistance and orders.</p>
              </div>

              <form onSubmit={handleAuth} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={authEmail}
                  onChange={e => setAuthEmail(e.target.value)}
                  style={{ padding: "12px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14 }}
                />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={authPass}
                  onChange={e => setAuthPass(e.target.value)}
                  style={{ padding: "12px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14 }}
                />
                <button type="submit" disabled={authLoading} style={{ padding: "12px", borderRadius: 10, border: "none", background: "#16a34a", color: "#fff", fontWeight: 700, cursor: "pointer" }}>
                  {authLoading ? "Processing..." : (authMode === "login" ? "Log In" : "Create Account")}
                </button>
              </form>

              <div style={{ position: "relative", textAlign: "center", margin: "20px 0" }}>
                <span style={{ background: "#f9fafb", padding: "0 10px", fontSize: 11, color: "#9ca3af", position: "relative", zIndex: 1 }}>or</span>
                <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", background: "#e5e7eb" }} />
              </div>

              <button onClick={handleGoogleAuth} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "11px", borderRadius: 10, border: "1.5px solid #e5e7eb", background: "#fff", color: "#374151", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: 16 }} />
                Google
              </button>

              <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#6b7280" }}>
                {authMode === "login" ? "New to WeberTech?" : "Already have an account?"}{" "}
                <button onClick={() => setAuthMode(authMode === "login" ? "register" : "login")} style={{ background: "none", border: "none", color: "#16a34a", fontWeight: 700, cursor: "pointer", padding: 0 }}>
                  {authMode === "login" ? "Sign up" : "Log in"}
                </button>
              </p>
            </div>
          ) : (
            <>
              <div className="wt-msgs">
                {msgs.filter(m => m && m.text).map(m => (
                  <div key={m.id} style={{ display:"flex", flexDirection:"column", alignItems: m.role==="user" ? "flex-end" : "flex-start" }}>
                    <div className={`wt-bub ${m.role==="user" ? "wt-user" : "wt-ai"}`}>
                      {(m.text || "").split("\n").map((line, i) => <p key={i} style={{ margin: i > 0 ? "4px 0 0" : 0 }}>{renderMessageLine(line, i)}</p>)}
                      {m.pdfData && (
                        <button className="wt-pdf-btn" onClick={() => handleGeneratePDF(m.pdfData)}>
                          📄 Download {m.pdfData.type} PDF
                        </button>
                      )}
                    </div>
                    <div className="wt-time" style={{ textAlign: m.role==="user" ? "right" : "left" }}>{m.time}</div>
                  </div>
                ))}
                {loading && <div className="wt-typing"><span/><span/><span/></div>}
                <div ref={bottomRef} />
              </div>

              {showChips && (
                <div className="wt-chips">
                  {QUICK[lang].map(q => <button key={q} className="wt-chip" onClick={() => send(q)}>{q}</button>)}
                </div>
              )}

              <div className="wt-input-row">
                <textarea
                  ref={inputRef}
                  className="wt-input"
                  rows={1}
                  placeholder="Ask WeberAI anything..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  disabled={loading}
                />
                <button className="wt-send" onClick={() => send()} disabled={loading || !input.trim()}>
                  {loading ? <span className="wt-spin">⟳</span> : "➤"}
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {!open && !closing && (
        <button className="wt-tab" onClick={openChat}>
          <span className="wt-tab-dot" />
          {unread ? "Chat with WeberAI" : "AI Support"}
        </button>
      )}
    </>
  );
}
