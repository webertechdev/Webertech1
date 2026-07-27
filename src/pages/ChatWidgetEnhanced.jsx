// src/pages/ChatWidgetEnhanced.jsx
// WeberAI — Comprehensive Platform Assistant
// Features: PDF generation, Service recognition, Real-time tracking

import { useState, useEffect, useRef } from "react";
import {
  collection, addDoc, serverTimestamp,
  doc, setDoc, onSnapshot, query, orderBy
} from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const BUNDLES_URL  = "https://bundles.webertech.co.ke";
const WHATSAPP_URL = "https://wa.me/254722508904";

const QUICK = {
  en: [
    "What services does WeberTech offer?",
    "How do I buy bundles?",
    "Generate a professional CV for me",
    "How do I register a business?",
    "Tell me about the Academy",
  ],
  sw: [
    "WeberTech inatoa huduma gani?",
    "Ninunue bundle vipi?",
    "Nifanyie CV ya kisasa",
    "Nasajili vipi biashara?",
    "Niambie kuhusu Academy",
  ],
};

const GREETING = {
  en: "👋 Jambo! I'm WeberAI, your personal WeberTech assistant.\nI can help you with Bundles, Cyber services, Academy, Electronics, and even generate documents for you. How can I help today?",
  sw: "👋 Jambo! Mimi ni WeberAI, msaidizi wako wa WeberTech.\nNaweza kukusaidia na Bundles, huduma za Cyber, Academy, Electronics, na hata kukutengenezea stakabadhi. Nikusaidie nini leo?",
};

function getSessionId() {
  let id = sessionStorage.getItem("wt_chat_session");
  if (!id) {
    id = "sess_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
    sessionStorage.setItem("wt_chat_session", id);
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

  useEffect(() => {
    const sid = getSessionId();
    setSessionId(sid);
    const greeting = { role:"ai", text:GREETING[lang], time:tstamp(), id:"greeting" };
    setMsgs([greeting]);
  }, []);

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
      await setDoc(doc(db, "chats", sessionId), {
        sessionId,
        userId:    currentUser?.uid || null,
        userEmail: currentUser?.email || null,
        lang,
        updatedAt: serverTimestamp(),
        status:    "active",
      }, { merge: true });

      await addDoc(collection(db, "chats", sessionId, "messages"), {
        role,
        text,
        metadata,
        createdAt: serverTimestamp(),
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
      let answer = data.answer;
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

  return (
    <>
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
            <button onClick={closeChat} style={{ background:"rgba(255,255,255,0.18)", border:"none", borderRadius:7, width:28, height:28, cursor:"pointer", color:"#fff" }}>✕</button>
          </div>

          <div className="wt-msgs">
            {msgs.map(m => (
              <div key={m.id} style={{ display:"flex", flexDirection:"column", alignItems: m.role==="user" ? "flex-end" : "flex-start" }}>
                <div className={`wt-bub ${m.role==="user" ? "wt-user" : "wt-ai"}`}>
                  {m.text.split("\n").map((line, i) => <p key={i} style={{ margin: i > 0 ? "4px 0 0" : 0 }}>{line}</p>)}
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
