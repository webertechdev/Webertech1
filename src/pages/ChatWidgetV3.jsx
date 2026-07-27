// src/pages/ChatWidgetV3.jsx
// WeberAI v3 - Intelligent Conversational Flow (No Link Spam)

import { useState, useEffect, useRef } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const WHATSAPP_URL = "https://wa.me/254722508904";

const QUICK = {
  en: [
    "What services does WeberTech offer?",
    "How do I buy bundles?",
    "Tell me about Cyber services",
    "How do I register a business?",
    "Tell me about the Academy",
  ],
  sw: [
    "WeberTech inatoa huduma gani?",
    "Ninunue bundle vipi?",
    "Niambie kuhusu huduma za Cyber",
    "Nasajili vipi biashara?",
    "Niambie kuhusu Academy",
  ],
};

const GREETING = {
  en: "👋 Hi! I'm WeberAI, your WeberTech assistant. I can help you find services, answer questions, and guide you. What do you need today?",
  sw: "👋 Habari! Mimi ni WeberAI, msaidizi wako wa WeberTech. Naweza kukusaidia kupata huduma, kujibu maswali, na kukuongoza. Unahitaji nini leo?",
};

// Service information with smart detection
const SERVICES = {
  cyber: {
    keywords: ["cyber", "legal", "government", "document", "kra", "ntsa", "helb", "printing", "writing"],
    name: "Cyber Division",
    link: "/cyber",
    description: "Legal documents, government services, printing, professional writing",
    response: {
      en: "Our Cyber Division offers legal documents, government services, printing, and professional writing. Would you like to explore these services?",
      sw: "Cyber Division yetu inatoa hati za kisheria, huduma za serikali, uchapaji, na kuandika kwa kitaaluma. Je, unataka kujifunza zaidi?",
    },
  },
  bundles: {
    keywords: ["bundle", "airtime", "data", "safaricom", "telecom", "recharge"],
    name: "Safaricom Bundles",
    link: "/bundles",
    description: "Airtime, data, and bundle packages",
    response: {
      en: "We offer Safaricom bundles including airtime, data, and special packages. Interested in purchasing?",
      sw: "Tunatoa bundle za Safaricom kama airtime, data, na paketi maalum. Je, unataka kununua?",
    },
  },
  academy: {
    keywords: ["academy", "course", "learn", "forex", "trading", "mentorship", "education"],
    name: "Academy",
    link: "/academy",
    description: "Forex trading and mentorship courses",
    response: {
      en: "Our Academy provides Forex trading and mentorship courses to help you grow your skills. Want to learn more?",
      sw: "Academy yetu inatoa kozi za Forex na mentorship ili kukusaidia kueneza ujuzi wako. Je, unataka kujifunza zaidi?",
    },
  },
  electronics: {
    keywords: ["electronics", "hardware", "computer", "phone", "device", "accessory"],
    name: "Electronics",
    link: "/electronics",
    description: "Hardware and accessories",
    response: {
      en: "We have a wide range of electronics and accessories available. What are you looking for?",
      sw: "Tunayo elektroniki na accessories nyingi. Unatafuta nini?",
    },
  },
  dev: {
    keywords: ["dev", "develop", "website", "app", "software", "build", "code"],
    name: "Dev Services",
    link: "/dev",
    description: "Web and app development",
    response: {
      en: "Our Dev team builds custom websites and applications. Tell me about your project idea.",
      sw: "Timu yetu ya Dev inajengea website na app maalum. Niambie kuhusu mradi wako.",
    },
  },
  hustle: {
    keywords: ["hustle", "startup", "business", "entrepreneur", "package", "tools"],
    name: "Hustle KE",
    link: "/hustle",
    description: "Startup packages and business tools",
    response: {
      en: "Hustle KE offers startup packages and business tools to help entrepreneurs. Are you starting a business?",
      sw: "Hustle KE inatoa paketi za startup na zana za biashara. Je, unaanza biashara?",
    },
  },
};

function getSessionId() {
  let id = sessionStorage.getItem("wt_chat_session");
  if (!id) {
    id = "sess_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
    sessionStorage.setItem("wt_chat_session", id);
  }
  return id;
}

function detectService(text) {
  const lowerText = text.toLowerCase();
  for (const [key, service] of Object.entries(SERVICES)) {
    if (service.keywords.some(keyword => lowerText.includes(keyword))) {
      return key;
    }
  }
  return null;
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
  .wt-link-btn { display: inline-flex; align-items: center; gap: 8px; background: #f0fdf4; border: 1.5px solid #16a34a; color: #16a34a; border-radius: 10px; padding: 10px 14px; font-size: 13px; font-weight: 700; cursor: pointer; margin-top: 10px; transition: all .15s; text-decoration: none; }
  .wt-link-btn:hover { background: #16a34a; color: #fff; }
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
`;

function tstamp() {
  return new Date().toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" });
}

export default function ChatWidgetV3() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [lang, setLang] = useState("en");
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(true);
  const [user, setUser] = useState(null);
  const msgsEndRef = useRef(null);

  useEffect(() => {
    onAuthStateChanged(auth, setUser);
  }, []);

  useEffect(() => {
    msgsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    setInput("");
    setLoading(true);

    const userMsg = { role: "user", text, time: tstamp() };
    setMsgs(prev => [...prev, userMsg]);

    try {
      // Detect service from user query
      const detectedService = detectService(text);
      
      let aiResponse = "";
      let showLink = false;

      if (detectedService) {
        // User asked about a specific service
        const service = SERVICES[detectedService];
        aiResponse = service.response[lang];
        showLink = true;
      } else if (text.toLowerCase().includes("service")) {
        // User asking about services in general
        aiResponse = lang === "en"
          ? "We offer several services:\n\n• 📋 Cyber Division (Legal docs, Government services)\n• 📱 Safaricom Bundles\n• 🎓 Academy (Forex & Mentorship)\n• 🖥️ Electronics\n• 💻 Dev Services\n• 🚀 Hustle KE\n\nWhich one interests you?"
          : "Tunatoa huduma kadhaa:\n\n• 📋 Cyber Division\n• 📱 Safaricom Bundles\n• 🎓 Academy\n• 🖥️ Electronics\n• 💻 Dev Services\n• 🚀 Hustle KE\n\nKui unakamatia?";
      } else {
        // General conversation
        aiResponse = lang === "en"
          ? "I'm here to help! You can ask me about our services, pricing, or how to get started. What would you like to know?"
          : "Niko hapa kusaidia! Unaweza kuniuliza kuhusu huduma zetu, bei, au jinsi ya kuanza. Unataka kujua nini?";
      }

      const aiMsg = { role: "ai", text: aiResponse, time: tstamp(), showLink, service: detectedService };
      setMsgs(prev => [...prev, aiMsg]);

      // Log to Firestore
      if (user) {
        await addDoc(collection(db, "chats", getSessionId(), "messages"), {
          user: userMsg.text,
          ai: aiResponse,
          timestamp: serverTimestamp(),
        });
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMsgs(prev => [...prev, { role: "error", text: "Failed to process message", time: tstamp() }]);
    }
    setLoading(false);
  };

  const renderMessage = (msg, idx) => {
    if (msg.role === "user") {
      return (
        <div key={idx} className="wt-bub wt-user">
          {msg.text}
        </div>
      );
    }
    if (msg.role === "error") {
      return (
        <div key={idx} className="wt-bub wt-err">
          {msg.text}
        </div>
      );
    }
    return (
      <div key={idx} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div className="wt-bub wt-ai">
          {msg.text}
        </div>
        {msg.showLink && msg.service && (
          <a
            href={SERVICES[msg.service].link}
            className="wt-link-btn"
            style={{ display: "inline-flex", textDecoration: "none", alignSelf: "flex-start" }}
          >
            🔗 {SERVICES[msg.service].name}
          </a>
        )}
      </div>
    );
  };

  return (
    <>
      <style>{CSS}</style>
      <button className="wt-tab" onClick={() => { setOpen(true); setUnread(false); }}>
        <span className="wt-tab-dot"></span>
        AI
      </button>

      {open && <div className="wt-overlay" onClick={() => { setClosing(true); setTimeout(() => { setOpen(false); setClosing(false); }, 220); }} />}

      <div className={`wt-sidebar ${open ? "wt-open" : closing ? "wt-close" : ""}`} style={{ display: open || closing ? "flex" : "none" }}>
        <div className="wt-head">
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>💬 WeberAI</div>
          <div style={{ display: "flex", gap: 8 }}>
            <select
              value={lang}
              onChange={e => setLang(e.target.value)}
              style={{ padding: "4px 8px", borderRadius: 6, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
            >
              <option value="en">English</option>
              <option value="sw">Swahili</option>
            </select>
            <button onClick={() => { setClosing(true); setTimeout(() => { setOpen(false); setClosing(false); }, 220); }} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", borderRadius: 6, width: 28, height: 28, cursor: "pointer", fontSize: 16 }}>✕</button>
          </div>
        </div>

        <div className="wt-msgs">
          {msgs.length === 0 && (
            <div className="wt-bub wt-ai">
              {GREETING[lang]}
            </div>
          )}
          {msgs.map((msg, idx) => renderMessage(msg, idx))}
          {loading && (
            <div className="wt-typing">
              <span></span><span></span><span></span>
            </div>
          )}
          <div ref={msgsEndRef} />
        </div>

        {msgs.length === 0 && (
          <div className="wt-chips">
            {QUICK[lang].map((q, i) => (
              <button key={i} className="wt-chip" onClick={() => sendMessage(q)}>
                {q}
              </button>
            ))}
          </div>
        )}

        <div className="wt-input-row">
          <input
            className="wt-input"
            placeholder={lang === "en" ? "Ask me anything..." : "Niulize kitu chochote..."}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === "Enter" && sendMessage(input)}
          />
          <button className="wt-send" onClick={() => sendMessage(input)} disabled={loading}>
            {loading ? "⟳" : "→"}
          </button>
        </div>
      </div>
    </>
  );
}
