// src/pages/ChatWidget.jsx
// Floating sidebar AI chat — powered by Claude via /api/chat
// Saves every message to Firestore chats/{sessionId}/messages
// Admin can see all chats and take over

import { useState, useEffect, useRef } from "react";
import {
  collection, addDoc, serverTimestamp,
  doc, setDoc, onSnapshot, query, orderBy, updateDoc
} from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const BUNDLES_URL  = "https://bundles.webertech.co.ke";
const WHATSAPP_URL = "https://wa.me/254722508904";

const QUICK = {
  en: [
    "What services does WeberTech offer?",
    "How do I buy bundles?",
    "Tell me about the Academy",
    "What is WeberTech Dev?",
    "How do I contact support?",
  ],
  sw: [
    "WeberTech inatoa huduma gani?",
    "Ninunue bundle vipi?",
    "Niambie kuhusu Academy",
    "WeberTech Dev ni nini?",
    "Niwasiliane na support vipi?",
  ],
};

const GREETING = {
  en: "👋 Hi! I'm WeberTech Support AI.\nAsk me anything about our services — Bundles, Academy, Dev, Cyber, Electronics or Hustle.",
  sw: "👋 Habari! Mimi ni WeberTech Support AI.\nUliza chochote kuhusu huduma zetu — Bundles, Academy, Dev, Cyber, Electronics au Hustle.",
};

// ── Generate anonymous session ID ───────────────────────────────
function getSessionId() {
  let id = sessionStorage.getItem("wt_chat_session");
  if (!id) {
    id = "sess_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
    sessionStorage.setItem("wt_chat_session", id);
  }
  return id;
}

// ── Inject styles once ──────────────────────────────────────────
const CSS = `
  .wt-tab {
    position: fixed; top: 50%; right: 0;
    transform: translateY(-50%);
    z-index: 9000;
    background: linear-gradient(180deg,#15803d,#16a34a);
    color: #fff; border: none;
    border-radius: 10px 0 0 10px;
    padding: 16px 10px;
    cursor: pointer;
    writing-mode: vertical-rl;
    font-size: 13px; font-weight: 700;
    letter-spacing: 1px;
    box-shadow: -3px 0 18px rgba(22,163,74,0.4);
    transition: padding .2s;
    font-family: 'Segoe UI', system-ui, sans-serif;
    display: flex; align-items: center; gap: 8px;
  }
  .wt-tab:hover { padding: 16px 14px; }
  .wt-tab-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: #4ade80; display: inline-block;
    animation: wtblink 1.5s ease-in-out infinite;
  }
  @keyframes wtblink { 0%,100%{opacity:1} 50%{opacity:.25} }

  .wt-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.3);
    z-index: 9001;
    animation: wtfade .2s ease both;
  }
  @keyframes wtfade { from{opacity:0} to{opacity:1} }

  .wt-sidebar {
    position: fixed; top: 0; right: 0; bottom: 0;
    width: 380px; background: #fff;
    z-index: 9002;
    display: flex; flex-direction: column;
    box-shadow: -6px 0 32px rgba(0,0,0,0.16);
    font-family: 'Segoe UI', system-ui, sans-serif;
  }
  .wt-open  { animation: wtslide .28s cubic-bezier(.175,.885,.32,1.1) both; }
  .wt-close { animation: wtslideout .22s ease both; }
  @keyframes wtslide    { from{transform:translateX(100%)} to{transform:translateX(0)} }
  @keyframes wtslideout { from{transform:translateX(0)} to{transform:translateX(100%)} }

  .wt-head {
    background: linear-gradient(135deg,#15803d,#16a34a);
    padding: 14px 16px;
    display: flex; align-items: center; justify-content: space-between;
    flex-shrink: 0;
  }
  .wt-msgs {
    flex: 1; overflow-y: auto;
    padding: 14px 13px;
    display: flex; flex-direction: column; gap: 10px;
    background: #f9fafb;
  }
  .wt-msgs::-webkit-scrollbar { width: 4px; }
  .wt-msgs::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }

  .wt-bub {
    max-width: 86%; padding: 10px 13px;
    border-radius: 15px; font-size: 13.5px;
    line-height: 1.55; word-break: break-word;
    animation: wtmsgin .2s ease both;
  }
  @keyframes wtmsgin { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
  .wt-ai   { background:#fff; border:1.5px solid #e5e7eb; align-self:flex-start; border-bottom-left-radius:3px; }
  .wt-user { background:#16a34a; color:#fff; align-self:flex-end; border-bottom-right-radius:3px; }
  .wt-agent{ background:#1d4ed8; color:#fff; align-self:flex-start; border-bottom-left-radius:3px; }
  .wt-err  { background:#fef2f2; border:1.5px solid #fca5a5; align-self:flex-start; }

  .wt-typing {
    display: flex; gap: 4px; padding: 10px 13px;
    background: #fff; border: 1.5px solid #e5e7eb;
    border-radius: 15px; border-bottom-left-radius: 3px;
    align-self: flex-start; align-items: center;
  }
  .wt-typing span {
    width: 6px; height: 6px; border-radius: 50%; background: #9ca3af;
    animation: wtbounce .9s ease-in-out infinite;
  }
  .wt-typing span:nth-child(2){animation-delay:.18s}
  .wt-typing span:nth-child(3){animation-delay:.36s}
  @keyframes wtbounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }

  .wt-chips {
    display: flex; flex-wrap: wrap; gap: 6px;
    padding: 10px 13px; background: #fff;
    border-top: 1px solid #f3f4f6; flex-shrink: 0;
  }
  .wt-chip {
    background: #f0fdf4; border: 1.5px solid #86efac;
    color: #15803d; border-radius: 99px;
    padding: 5px 11px; font-size: 12px; font-weight: 600;
    cursor: pointer; transition: all .13s;
    white-space: nowrap; font-family: inherit;
  }
  .wt-chip:hover { background: #16a34a; color: #fff; border-color: #16a34a; }

  .wt-taken-over {
    margin: 0 13px 8px; padding: 8px 12px;
    background: #dbeafe; border: 1.5px solid #93c5fd;
    border-radius: 10px; font-size: 12px; color: #1d4ed8; font-weight: 600;
    flex-shrink: 0; text-align: center;
  }

  .wt-wabar {
    margin: 0 13px 8px; padding: 8px 12px;
    background: #f0fdf4; border: 1.5px solid #86efac;
    border-radius: 10px; font-size: 12px; color: #15803d;
    font-weight: 600; flex-shrink: 0;
    display: flex; align-items: center; gap: 7px;
  }

  .wt-input-row {
    display: flex; gap: 8px; padding: 11px 13px;
    border-top: 1px solid #e5e7eb; background: #fff; flex-shrink: 0;
  }
  .wt-input {
    flex: 1; padding: 9px 13px;
    border: 1.5px solid #e5e7eb; border-radius: 10px;
    font-size: 14px; outline: none; font-family: inherit;
    resize: none; max-height: 80px; line-height: 1.5;
    transition: border-color .15s;
  }
  .wt-input:focus { border-color: #16a34a; box-shadow: 0 0 0 3px rgba(22,163,74,.1); }
  .wt-send {
    width: 38px; height: 38px; border-radius: 10px;
    background: #16a34a; border: none; cursor: pointer;
    color: #fff; font-size: 17px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    transition: background .13s;
  }
  .wt-send:hover:not(:disabled) { background: #15803d; }
  .wt-send:disabled { background: #9ca3af; cursor: not-allowed; }

  .wt-lang {
    display: flex; gap: 3px;
    background: rgba(255,255,255,0.15); border-radius: 7px; padding: 3px;
  }
  .wt-lang button {
    padding: 3px 9px; border: none; border-radius: 5px;
    font-size: 11.5px; font-weight: 700; cursor: pointer;
    font-family: inherit; transition: all .13s;
  }
  .wt-lon  { background: #fff; color: #15803d; }
  .wt-loff { background: transparent; color: rgba(255,255,255,.75); }

  .wt-time { font-size: 10px; color: #9ca3af; margin-top: 3px; }

  @media (max-width: 440px) {
    .wt-sidebar { width: 100vw; }
    .wt-tab { font-size: 11px; padding: 12px 8px; }
  }
  @keyframes wtspin { to{transform:rotate(360deg)} }
  .wt-spin { display: inline-block; animation: wtspin .8s linear infinite; }
`;

function tstamp() {
  return new Date().toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" });
}

export default function ChatWidget() {
  const [open,      setOpen]      = useState(false);
  const [closing,   setClosing]   = useState(false);
  const [lang,      setLang]      = useState("en");
  const [msgs,      setMsgs]      = useState([]);
  const [input,     setInput]     = useState("");
  const [loading,   setLoading]   = useState(false);
  const [unread,    setUnread]    = useState(true);
  const [sessionId, setSessionId] = useState(null);
  const [takenOver, setTakenOver] = useState(false); // admin took over
  const [currentUser, setCurrentUser] = useState(null);
  const bottomRef   = useRef(null);
  const inputRef    = useRef(null);
  const cssInjected = useRef(false);

  // ── Inject CSS once ──
  useEffect(() => {
    if (cssInjected.current) return;
    cssInjected.current = true;
    const s = document.createElement("style");
    s.textContent = CSS;
    document.head.appendChild(s);
  }, []);

  // ── Track auth state ──
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => setCurrentUser(u));
    return () => unsub();
  }, []);

  // ── Init session + greeting ──
  useEffect(() => {
    const sid = getSessionId();
    setSessionId(sid);
    const greeting = { role:"ai", text:GREETING[lang], time:tstamp(), id:"greeting" };
    setMsgs([greeting]);
  }, []);

  // ── Listen to Firestore for admin takeover / agent replies ──
  useEffect(() => {
    if (!sessionId) return;
    const q = query(
      collection(db, "chats", sessionId, "messages"),
      orderBy("createdAt", "asc")
    );
    const unsub = onSnapshot(q, snap => {
      const firestoreMsgs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      // Check if admin took over
      const sessionMeta = snap.docs.find(d => d.data().type === "takeover");
      if (sessionMeta) setTakenOver(true);

      // Only sync agent messages to local state (avoid duplicating user/ai msgs)
      const agentMsgs = firestoreMsgs.filter(m => m.role === "agent");
      if (agentMsgs.length > 0) {
        setMsgs(prev => {
          const existingIds = new Set(prev.map(m => m.id));
          const newAgent = agentMsgs.filter(m => !existingIds.has(m.id));
          if (newAgent.length === 0) return prev;
          return [...prev, ...newAgent.map(m => ({
            role: "agent",
            text: m.text,
            time: tstamp(),
            id:   m.id,
          }))];
        });
      }
    });
    return () => unsub();
  }, [sessionId]);

  // ── Scroll to bottom ──
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:"smooth" });
  }, [msgs]);

  // ── Focus input when opened ──
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

  // ── Save message to Firestore ──
  const saveMsg = async (role, text) => {
    if (!sessionId) return;
    try {
      // Ensure session doc exists
      await setDoc(doc(db, "chats", sessionId), {
        sessionId,
        userId:    currentUser?.uid || null,
        userEmail: currentUser?.email || null,
        lang,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status:    "active",
        aiEnabled: !takenOver,
      }, { merge: true });

      // Save message
      await addDoc(collection(db, "chats", sessionId, "messages"), {
        role,
        text,
        lang,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Firestore save error:", err);
    }
  };

  // ── Send message ──
  const send = async (text) => {
    console.log("🔥 SEND CLICKED");
    const q = (text || input).trim();
    if (!q || loading) return;
    setInput("");

    // Add to local state
    const userMsg = { role:"user", text:q, time:tstamp(), id:"u_" + Date.now() };
    setMsgs(prev => [...prev, userMsg]);

    // Save user message to Firestore
    await saveMsg("user", q);

    // If admin has taken over, don't call AI
    if (takenOver) return;

    setLoading(true);

    try {
      // Build conversation history for Claude (last 10 messages)
      const history = [...msgs, userMsg]
        .filter(m => m.role === "user" || m.role === "ai")
        .slice(-10)
        .map(m => ({ role: m.role, text: m.text }));

      const res = await fetch("/api/chat", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ messages: history, lang }),
      });

      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      const aiMsg = { role:"ai", text:data.answer, time:tstamp(), id:"ai_" + Date.now() };
      setMsgs(prev => [...prev, aiMsg]);

      // Save AI reply to Firestore
      await saveMsg("ai", data.answer);

    } catch (err) {
      const errText = lang === "sw"
        ? "Samahani, kuna tatizo. Jaribu tena au wasiliana nasi kwa WhatsApp: +254722508904"
        : "Sorry, something went wrong. Please try again or contact us on WhatsApp: +254722508904";

      setMsgs(prev => [...prev, { role:"ai", text:errText, time:tstamp(), id:"err_"+Date.now(), isErr:true }]);
    }

    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const switchLang = (l) => {
    if (l === lang) return;
    setLang(l);
    setMsgs([{ role:"ai", text:GREETING[l], time:tstamp(), id:"greeting_"+l }]);
  };

  const showChips = msgs.length <= 1 && !loading;

  return (
    <>
      {/* Overlay */}
      {(open || closing) && (
        <div className="wt-overlay" onClick={closeChat} />
      )}

      {/* Sidebar */}
      {(open || closing) && (
        <div className={`wt-sidebar ${closing ? "wt-close" : "wt-open"}`}>

          {/* Header */}
          <div className="wt-head">
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:36, height:36, borderRadius:"50%", background:"rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>
                🤖
              </div>
              <div>
                <div style={{ color:"#fff", fontWeight:800, fontSize:14 }}>WeberTech AI</div>
                <div style={{ color:"rgba(255,255,255,0.75)", fontSize:11, display:"flex", alignItems:"center", gap:5, marginTop:2 }}>
                  <span style={{ width:6, height:6, borderRadius:"50%", background:"#4ade80", display:"inline-block" }} />
                  {takenOver ? "Support Agent Online" : "AI Online · 24/7"}
                </div>
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div className="wt-lang">
                {["en","sw"].map(l => (
                  <button key={l} className={lang===l?"wt-lon":"wt-loff"} onClick={() => switchLang(l)}>
                    {l === "en" ? "EN" : "SW"}
                  </button>
                ))}
              </div>
              <button onClick={closeChat}
                style={{ background:"rgba(255,255,255,0.18)", border:"none", borderRadius:7, width:28, height:28, cursor:"pointer", color:"#fff", fontSize:15, display:"flex", alignItems:"center", justifyContent:"center" }}>
                ✕
              </button>
            </div>
          </div>

          {/* Takeover notice */}
          {takenOver && (
            <div className="wt-taken-over">
              🧑‍💼 A support agent has joined this chat
            </div>
          )}

          {/* Messages */}
          <div className="wt-msgs">
            {msgs.map(m => (
              <div key={m.id} style={{ display:"flex", flexDirection:"column", alignItems: m.role==="user" ? "flex-end" : "flex-start" }}>
                {m.role === "user" ? (
                  <div>
                    <div className="wt-bub wt-user">{m.text}</div>
                    <div className="wt-time" style={{ textAlign:"right" }}>{m.time}</div>
                  </div>
                ) : (
                  <div style={{ display:"flex", alignItems:"flex-end", gap:6 }}>
                    <div style={{ width:22, height:22, borderRadius:"50%", background: m.role==="agent" ? "linear-gradient(135deg,#1d4ed8,#3b82f6)" : "linear-gradient(135deg,#15803d,#16a34a)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, flexShrink:0, marginBottom:2 }}>
                      {m.role === "agent" ? "👤" : "🤖"}
                    </div>
                    <div>
                      {m.role === "agent" && (
                        <div style={{ fontSize:10.5, color:"#1d4ed8", fontWeight:700, marginBottom:3 }}>Support Agent</div>
                      )}
                      <div className={`wt-bub ${m.role==="agent" ? "wt-agent" : m.isErr ? "wt-err" : "wt-ai"}`}>
                        {m.text.split("\n").map((line, i) => (
                          <p key={i} style={{ margin: i > 0 ? "4px 0 0" : 0 }}>{line}</p>
                        ))}
                      </div>
                      {m.isErr && (
                        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
                          style={{ display:"inline-flex", alignItems:"center", gap:5, marginTop:5, fontSize:12, color:"#25d366", fontWeight:700, textDecoration:"none" }}>
                          💬 Chat on WhatsApp
                        </a>
                      )}
                      <div className="wt-time">{m.time}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Typing dots */}
            {loading && (
              <div style={{ display:"flex", alignItems:"flex-end", gap:6 }}>
                <div style={{ width:22, height:22, borderRadius:"50%", background:"linear-gradient(135deg,#15803d,#16a34a)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, flexShrink:0 }}>🤖</div>
                <div className="wt-typing"><span/><span/><span/></div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick chips — first open only */}
          {showChips && (
            <div className="wt-chips">
              {QUICK[lang].map(q => (
                <button key={q} className="wt-chip" onClick={() => send(q)}>{q}</button>
              ))}
            </div>
          )}

          {/* WhatsApp bar */}
          <div className="wt-wabar">
            <span>💬</span>
            <span>
              {lang==="sw" ? "Tatizo gumu? " : "Need human help? "}
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
                style={{ color:"#15803d", textDecoration:"underline", fontWeight:700 }}>
                WhatsApp
              </a>
            </span>
          </div>

          {/* Bundles link */}
          <div style={{ padding:"0 13px 8px", flexShrink:0 }}>
            <a href={BUNDLES_URL} target="_blank" rel="noreferrer"
              style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:7, padding:"9px 0", background:"linear-gradient(135deg,#15803d,#16a34a)", borderRadius:10, color:"#fff", fontWeight:700, fontSize:13, textDecoration:"none" }}>
              ⚡ Buy Bundles → bundles.webertech.co.ke
            </a>
          </div>

          {/* Input */}
          <div className="wt-input-row">
            <textarea
              ref={inputRef}
              className="wt-input"
              rows={1}
              placeholder={lang==="sw" ? "Andika swali lako…" : "Ask me anything about WeberTech…"}
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

      {/* Floating tab — only when closed */}
      {!open && !closing && (
        <button className="wt-tab" onClick={openChat} aria-label="Open WeberTech AI chat">
          <span className="wt-tab-dot" />
          {unread ? "Chat with AI" : "AI Support"}
        </button>
      )}
    </>
  );
}
