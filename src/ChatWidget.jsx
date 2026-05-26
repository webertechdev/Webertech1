// src/pages/ChatWidget.jsx
// Floating AI support chat — sidebar style
// Closed: small green tab on right edge
// Open:   full sidebar panel slides in from right
// Lives in src/pages/ — imported in App.jsx

import { useState, useEffect, useRef } from "react";

const BUNDLES_URL  = "https://bundles.webertech.co.ke";
const WHATSAPP_URL = "https://wa.me/254722508904";
const API_URL      = import.meta.env.VITE_SUPPORT_API_URL || "";

const QUICK = {
  en: ["What services do you offer?", "How do I buy bundles?", "Track my order", "Pricing & packages", "Contact support"],
  sw: ["Huduma zipi mnazotoa?",        "Ninunue bundle vipi?",   "Fuatilia oda",   "Bei na pakiti",       "Wasiliana nasi"],
};

const GREETING = {
  en: "👋 Hi! I'm WeberTech AI.\nAsk me anything about our services — Academy, Dev, Electronics, Cyber or Hustle.",
  sw: "👋 Habari! Mimi ni WeberTech AI.\nUliza chochote kuhusu huduma zetu.",
};

// Inject styles once
const STYLES = `
  .wt-tab {
    position: fixed;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    z-index: 1000;
    background: linear-gradient(180deg, #15803d, #16a34a);
    color: #fff;
    border: none;
    border-radius: 10px 0 0 10px;
    padding: 14px 10px;
    cursor: pointer;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1px;
    box-shadow: -4px 0 20px rgba(22,163,74,0.35);
    transition: padding .2s, background .2s;
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Segoe UI', system-ui, sans-serif;
  }
  .wt-tab:hover { background: linear-gradient(180deg,#14532d,#15803d); padding: 14px 13px; }
  .wt-tab-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: #4ade80;
    animation: wt-blink 1.5s ease-in-out infinite;
    display: inline-block;
  }
  @keyframes wt-blink { 0%,100%{opacity:1} 50%{opacity:.3} }

  .wt-sidebar {
    position: fixed;
    top: 0; right: 0; bottom: 0;
    width: 380px;
    background: #fff;
    z-index: 1001;
    display: flex;
    flex-direction: column;
    box-shadow: -8px 0 40px rgba(0,0,0,0.18);
    font-family: 'Segoe UI', system-ui, sans-serif;
  }
  .wt-sidebar.opening { animation: wt-slideIn .28s cubic-bezier(.175,.885,.32,1.1) both; }
  .wt-sidebar.closing  { animation: wt-slideOut .22s ease both; }
  @keyframes wt-slideIn  { from{transform:translateX(100%)} to{transform:translateX(0)} }
  @keyframes wt-slideOut { from{transform:translateX(0)} to{transform:translateX(100%)} }

  .wt-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.25);
    z-index: 1000;
    animation: wt-fadein .22s ease both;
  }
  @keyframes wt-fadein { from{opacity:0} to{opacity:1} }

  .wt-header {
    background: linear-gradient(135deg,#15803d,#16a34a);
    padding: 16px 18px;
    display: flex; align-items: center; justify-content: space-between;
    flex-shrink: 0;
  }
  .wt-messages {
    flex: 1; overflow-y: auto;
    padding: 16px 14px;
    display: flex; flex-direction: column; gap: 10px;
    background: #f9fafb;
  }
  .wt-messages::-webkit-scrollbar { width: 4px; }
  .wt-messages::-webkit-scrollbar-thumb { background:#d1d5db; border-radius:4px; }

  .wt-bubble {
    max-width: 85%; padding: 11px 14px;
    border-radius: 16px; font-size: 14px; line-height: 1.55;
    word-break: break-word;
    animation: wt-msgIn .22s ease both;
  }
  @keyframes wt-msgIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
  .wt-bubble-ai   { background:#fff; border:1.5px solid #e5e7eb; align-self:flex-start; border-bottom-left-radius:4px; }
  .wt-bubble-user { background:#16a34a; color:#fff; align-self:flex-end; border-bottom-right-radius:4px; }
  .wt-bubble-err  { background:#fef2f2; border:1.5px solid #fca5a5; align-self:flex-start; }

  .wt-typing {
    display:flex; gap:4px; padding:10px 14px;
    background:#fff; border:1.5px solid #e5e7eb;
    border-radius:16px; border-bottom-left-radius:4px;
    align-self:flex-start; align-items:center;
  }
  .wt-typing span {
    width:7px; height:7px; border-radius:50%; background:#9ca3af;
    animation: wt-bounce .9s ease-in-out infinite;
  }
  .wt-typing span:nth-child(2) { animation-delay:.18s }
  .wt-typing span:nth-child(3) { animation-delay:.36s }
  @keyframes wt-bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-7px)} }

  .wt-chips {
    display:flex; flex-wrap:wrap; gap:6px;
    padding:10px 14px; background:#fff;
    border-top:1px solid #f3f4f6; flex-shrink:0;
  }
  .wt-chip {
    background:#f0fdf4; border:1.5px solid #86efac;
    color:#15803d; border-radius:99px; padding:5px 12px;
    font-size:12px; font-weight:600; cursor:pointer;
    transition:all .14s; white-space:nowrap;
    font-family:inherit;
  }
  .wt-chip:hover { background:#16a34a; color:#fff; border-color:#16a34a; }

  .wt-input-row {
    display:flex; gap:8px; padding:12px 14px;
    border-top:1px solid #e5e7eb; background:#fff; flex-shrink:0;
  }
  .wt-input {
    flex:1; padding:10px 14px; border:1.5px solid #e5e7eb;
    border-radius:10px; font-size:14px; outline:none;
    transition:border-color .15s; font-family:inherit; resize:none;
    max-height:80px; line-height:1.5;
  }
  .wt-input:focus { border-color:#16a34a; box-shadow:0 0 0 3px rgba(22,163,74,.1); }
  .wt-send {
    width:40px; height:40px; border-radius:10px;
    background:#16a34a; border:none; cursor:pointer;
    display:flex; align-items:center; justify-content:center;
    color:#fff; font-size:16px; flex-shrink:0;
    transition:background .14s;
  }
  .wt-send:hover:not(:disabled) { background:#15803d; }
  .wt-send:disabled { background:#9ca3af; cursor:not-allowed; }

  .wt-lang {
    display:flex; gap:3px; background:rgba(255,255,255,0.15); border-radius:8px; padding:3px;
  }
  .wt-lang button {
    padding:4px 10px; border:none; border-radius:6px;
    font-size:12px; font-weight:700; cursor:pointer; transition:all .14s;
    font-family:inherit;
  }
  .wt-lang .on  { background:#fff; color:#15803d; }
  .wt-lang .off { background:transparent; color:rgba(255,255,255,.75); }

  .wt-wa-bar {
    margin:0 14px 10px;
    background:#f0fdf4; border:1.5px solid #86efac;
    border-radius:10px; padding:9px 12px;
    display:flex; align-items:center; gap:8px;
    font-size:12px; color:#15803d; font-weight:600; flex-shrink:0;
  }

  @media (max-width:440px) {
    .wt-sidebar { width:100vw; }
    .wt-tab { font-size:11px; padding:10px 8px; }
  }
  @keyframes wt-spin { to{transform:rotate(360deg)} }
  .wt-spin { animation:wt-spin .8s linear infinite; display:inline-block; }
`;

function now() {
  return new Date().toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" });
}

export default function ChatWidget() {
  const [open,     setOpen]     = useState(false);
  const [closing,  setClosing]  = useState(false);
  const [lang,     setLang]     = useState("en");
  const [msgs,     setMsgs]     = useState([]);
  const [input,    setInput]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [unread,   setUnread]   = useState(true);
  const bottomRef  = useRef(null);
  const inputRef   = useRef(null);
  const styleInjected = useRef(false);

  // Inject CSS once
  useEffect(() => {
    if (styleInjected.current) return;
    styleInjected.current = true;
    const s = document.createElement("style");
    s.textContent = STYLES;
    document.head.appendChild(s);
  }, []);

  // Greeting on mount / lang change
  useEffect(() => {
    setMsgs([{ role:"ai", text:GREETING[lang], time:now(), id:"g" }]);
  }, [lang]);

  // Scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:"smooth" });
  }, [msgs]);

  // Focus input when opened
  useEffect(() => {
    if (open) { setUnread(false); setTimeout(() => inputRef.current?.focus(), 300); }
  }, [open]);

  const openChat  = () => { setOpen(true); setClosing(false); };
  const closeChat = () => {
    setClosing(true);
    setTimeout(() => { setOpen(false); setClosing(false); }, 220);
  };

  const addMsg = (role, text, extra = {}) =>
    setMsgs(p => [...p, { role, text, time:now(), id:Date.now() + Math.random(), ...extra }]);

  const send = async (text) => {
    const q = (text || input).trim();
    if (!q || loading) return;
    setInput("");
    addMsg("user", q);
    setLoading(true);

    // If no API URL configured, respond with friendly fallback
    if (!API_URL) {
      setTimeout(() => {
        addMsg("ai",
          lang === "sw"
            ? "Samahani, AI chat bado haijawashwa. Tafadhali wasiliana nasi kwa WhatsApp: +254722508904"
            : "AI chat is not configured yet. Please contact us on WhatsApp: +254 722 508 904",
          { isErr: true }
        );
        setLoading(false);
      }, 800);
      return;
    }

    try {
      const res  = await fetch(API_URL, {
        method:  "POST",
        headers: { "Content-Type":"application/json" },
        body:    JSON.stringify({ question:q, lang }),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();
      addMsg("ai", data.answer || "No response. Please try again.");
    } catch {
      addMsg("ai",
        lang === "sw"
          ? "Samahani, kuna tatizo. Jaribu tena au wasiliana nasi kwa WhatsApp."
          : "Sorry, something went wrong. Try again or contact us on WhatsApp.",
        { isErr: true }
      );
    }
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const isFirstOpen = msgs.length <= 1 && !loading;

  return (
    <>
      {/* Overlay when open */}
      {(open || closing) && (
        <div className="wt-overlay" onClick={closeChat} />
      )}

      {/* Sidebar */}
      {(open || closing) && (
        <div className={`wt-sidebar ${closing ? "closing" : "opening"}`}>

          {/* Header */}
          <div className="wt-header">
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:38, height:38, borderRadius:"50%", background:"rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>🤖</div>
              <div>
                <div style={{ color:"#fff", fontWeight:800, fontSize:14.5 }}>WeberTech AI</div>
                <div style={{ color:"rgba(255,255,255,0.8)", fontSize:11, display:"flex", alignItems:"center", gap:5, marginTop:2 }}>
                  <span style={{ width:6, height:6, borderRadius:"50%", background:"#4ade80", display:"inline-block" }} />
                  Online · 24/7
                </div>
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              {/* Language toggle */}
              <div className="wt-lang">
                {["en","sw"].map(l => (
                  <button key={l} className={lang===l?"on":"off"} onClick={() => setLang(l)}>
                    {l === "en" ? "EN" : "SW"}
                  </button>
                ))}
              </div>
              {/* Close */}
              <button onClick={closeChat}
                style={{ background:"rgba(255,255,255,0.18)", border:"none", borderRadius:8, width:30, height:30, cursor:"pointer", color:"#fff", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}>
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="wt-messages">
            {msgs.map(m => (
              <div key={m.id} style={{ display:"flex", flexDirection:"column", alignItems: m.role==="user" ? "flex-end" : "flex-start" }}>
                {m.role === "ai" ? (
                  <div style={{ display:"flex", alignItems:"flex-end", gap:6 }}>
                    <div style={{ width:24, height:24, borderRadius:"50%", background:"linear-gradient(135deg,#15803d,#16a34a)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, flexShrink:0, marginBottom:2 }}>🤖</div>
                    <div>
                      <div className={`wt-bubble ${m.isErr ? "wt-bubble-err" : "wt-bubble-ai"}`}>
                        {m.text.split("\n").map((l,i) => <p key={i} style={{ margin:i>0?"4px 0 0":0 }}>{l}</p>)}
                      </div>
                      {m.isErr && (
                        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
                          style={{ display:"inline-flex", alignItems:"center", gap:5, marginTop:6, fontSize:12, color:"#25d366", fontWeight:700, textDecoration:"none" }}>
                          💬 Chat on WhatsApp
                        </a>
                      )}
                      <div style={{ fontSize:10, color:"#9ca3af", marginTop:3 }}>{m.time}</div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="wt-bubble wt-bubble-user">{m.text}</div>
                    <div style={{ fontSize:10, color:"#9ca3af", marginTop:3, textAlign:"right" }}>{m.time}</div>
                  </div>
                )}
              </div>
            ))}

            {/* Typing dots */}
            {loading && (
              <div style={{ display:"flex", alignItems:"flex-end", gap:6 }}>
                <div style={{ width:24, height:24, borderRadius:"50%", background:"linear-gradient(135deg,#15803d,#16a34a)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, flexShrink:0 }}>🤖</div>
                <div className="wt-typing"><span /><span /><span /></div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies — show only at start */}
          {isFirstOpen && (
            <div className="wt-chips">
              {QUICK[lang].map(q => (
                <button key={q} className="wt-chip" onClick={() => send(q)}>{q}</button>
              ))}
            </div>
          )}

          {/* WhatsApp escalation */}
          <div className="wt-wa-bar">
            <span style={{ fontSize:16 }}>💬</span>
            <span>
              {lang==="sw" ? "Tatizo gumu? " : "Need human help? "}
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
                style={{ color:"#15803d", textDecoration:"underline", fontWeight:700 }}>
                {lang==="sw" ? "WhatsApp" : "Chat on WhatsApp"}
              </a>
            </span>
          </div>

          {/* Bundles quick link */}
          <div style={{ padding:"0 14px 10px", flexShrink:0 }}>
            <a href={BUNDLES_URL} target="_blank" rel="noreferrer"
              style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:7, padding:"10px 0", background:"linear-gradient(135deg,#15803d,#16a34a)", borderRadius:10, color:"#fff", fontWeight:700, fontSize:13.5, textDecoration:"none" }}>
              ⚡ Buy Bundles Now → bundles.webertech.co.ke
            </a>
          </div>

          {/* Input */}
          <div className="wt-input-row">
            <textarea
              ref={inputRef}
              className="wt-input"
              rows={1}
              placeholder={lang==="sw" ? "Andika swali lako…" : "Ask me anything…"}
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

      {/* Floating tab — only visible when closed */}
      {!open && !closing && (
        <button className="wt-tab" onClick={openChat} aria-label="Open AI support chat">
          <span className="wt-tab-dot" />
          {unread ? "Chat with AI" : "AI Support"}
        </button>
      )}
    </>
  );
}
