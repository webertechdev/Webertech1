import { useState } from "react";
import { Link } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast, Toaster } from "react-hot-toast";
import { db } from "../config/firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const WHATSAPP = "https://wa.me/254722508904";

const SERVICES = [
  {
    icon: "📦",
    title: "Bundle Reseller Program",
    description: "Explore practical ways to earn by connecting customers with useful WeberTech services.",
    action: { label: "Ask on WhatsApp", href: WHATSAPP, external: true },
  },
  {
    icon: "🏛️",
    title: "AGPO Registration Assistance",
    description: "Understand the steps and documents needed to prepare for public procurement opportunities.",
    action: { label: "View AGPO support", href: "/cyber/business" },
  },
  {
    icon: "📝",
    title: "CV Writing & Business Plans",
    description: "Get clear, professional business plans and profiles for your next opportunity.",
    action: { label: "View writing services", href: "/cyber/writing" },
  },
];

const HIGHLIGHTS = ["Affiliate Commissions", "Digital Product Sales", "Weekly M-PESA Payouts"];

export default function Hustle() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    const phone = form.phone.replace(/\s/g, "");
    if (!form.name.trim()) return toast.error("Enter your name");
    if (!form.email.includes("@")) return toast.error("Enter a valid email");
    if (!/^(\+254|0)?7\d{8}$/.test(phone)) return toast.error("Enter a valid phone number");

    setLoading(true);
    try {
      await addDoc(collection(db, "hustle_waitlist"), { ...form, page: "Hustle KE", createdAt: serverTimestamp() });
      setSubmitted(true);
      toast.success("You're on the list!");
    } catch {
      toast.error("Something went wrong. Try again.");
    }
    setLoading(false);
  };

  return (
    <>
      <Toaster position="top-center" />
      <style>{`
        .hustle-page { min-height: 100vh; background: #fff7ed; color: #1c1917; font-family: 'Segoe UI', system-ui, sans-serif; }
        .hustle-main { padding-top: 62px; }
        .hustle-hero { position: relative; overflow: hidden; color: #fff; background: linear-gradient(135deg, #431407 0%, #9a3412 52%, #ea580c 100%); }
        .hustle-hero::before { content: ''; position: absolute; width: 460px; height: 460px; right: -150px; top: -190px; border-radius: 50%; background: rgba(255,255,255,.1); }
        .hustle-hero-inner { position: relative; z-index: 1; max-width: 1180px; margin: 0 auto; padding: 82px 24px 76px; display: grid; grid-template-columns: 1.15fr .85fr; gap: 46px; align-items: center; }
        .hustle-kicker { display: inline-flex; align-items: center; gap: 8px; padding: 7px 13px; border: 1px solid rgba(255,255,255,.28); border-radius: 999px; background: rgba(255,255,255,.1); color: #fed7aa; font-size: 12px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
        .hustle-hero h1 { margin: 20px 0 12px; font-size: clamp(42px, 7vw, 76px); line-height: 1; letter-spacing: -2px; }
        .hustle-tagline { margin: 0 0 16px; color: #fed7aa; font-size: clamp(22px, 3vw, 32px); font-weight: 800; }
        .hustle-hero-copy { max-width: 650px; margin: 0; color: rgba(255,255,255,.82); font-size: 18px; line-height: 1.7; }
        .hustle-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; }
        .hustle-btn { display: inline-flex; align-items: center; justify-content: center; min-height: 46px; padding: 0 20px; border-radius: 11px; font-weight: 800; text-decoration: none; transition: transform .2s, box-shadow .2s; }
        .hustle-btn:hover { transform: translateY(-2px); }
        .hustle-btn-primary { background: #fdba74; color: #431407; box-shadow: 0 10px 25px rgba(0,0,0,.2); border: 0; cursor: pointer; font: inherit; }
        .hustle-btn-secondary { border: 1px solid rgba(255,255,255,.35); color: #fff; background: rgba(255,255,255,.08); }
        .hustle-card { padding: 28px; border: 1px solid rgba(255,255,255,.2); border-radius: 22px; background: rgba(15,23,42,.24); backdrop-filter: blur(12px); box-shadow: 0 22px 55px rgba(0,0,0,.18); }
        .hustle-card-icon { font-size: 58px; margin-bottom: 16px; }
        .hustle-card h2 { margin: 0 0 16px; font-size: 22px; }
        .hustle-check { display: flex; gap: 10px; align-items: flex-start; padding: 11px 0; border-bottom: 1px solid rgba(255,255,255,.12); color: rgba(255,255,255,.85); line-height: 1.45; }
        .hustle-check:last-child { border-bottom: 0; }
        .hustle-section { max-width: 1180px; margin: 0 auto; padding: 76px 24px; }
        .hustle-eyebrow { margin: 0 0 8px; color: #c2410c; font-size: 12px; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; }
        .hustle-section h2 { margin: 0; font-size: clamp(28px, 4vw, 42px); letter-spacing: -1px; }
        .hustle-lead { max-width: 680px; margin: 12px 0 30px; color: #78716c; line-height: 1.7; }
        .hustle-services { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .hustle-service { display: flex; flex-direction: column; padding: 24px; border: 1px solid #fed7aa; border-radius: 17px; background: #fff; box-shadow: 0 8px 25px rgba(124,45,18,.06); }
        .hustle-service-icon { font-size: 32px; margin-bottom: 14px; }
        .hustle-service h3 { margin: 0 0 10px; font-size: 18px; }
        .hustle-service p { flex: 1; margin: 0 0 20px; color: #78716c; font-size: 14px; line-height: 1.65; }
        .hustle-service-link { color: #c2410c; font-size: 14px; font-weight: 800; text-decoration: none; }
        .hustle-highlights { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 26px; }
        .hustle-pill { padding: 9px 13px; border-radius: 999px; background: #ffedd5; color: #9a3412; font-size: 13px; font-weight: 800; }
        .hustle-join { display: grid; grid-template-columns: 1fr 400px; gap: 28px; align-items: center; padding: 42px 32px; border-radius: 22px; background: #1c1917; color: #fff; }
        .hustle-join h2 { margin: 0 0 10px; font-size: clamp(26px, 4vw, 38px); }
        .hustle-join p { margin: 0; color: rgba(255,255,255,.68); line-height: 1.65; }
        .hustle-form { display: grid; gap: 10px; padding: 22px; border-radius: 16px; background: #fff; }
        .hustle-form input { width: 100%; box-sizing: border-box; padding: 12px 13px; border: 1px solid #e7e5e4; border-radius: 9px; font: inherit; }
        .hustle-form small { color: #78716c; text-align: center; }
        @media (max-width: 900px) { .hustle-hero-inner, .hustle-join { grid-template-columns: 1fr; } .hustle-services { grid-template-columns: 1fr; } }
        @media (max-width: 560px) { .hustle-hero-inner { padding-top: 60px; padding-bottom: 58px; } .hustle-section { padding-top: 56px; padding-bottom: 56px; } .hustle-join { padding: 28px 20px; } }
      `}</style>
      <div className="hustle-page">
        <Navbar />
        <main className="hustle-main">
          <section className="hustle-hero">
            <div className="hustle-hero-inner">
              <div>
                <span className="hustle-kicker">🔥 WeberTech Hustle KE</span>
                <h1>Hustle KE</h1>
                <p className="hustle-tagline">Start. Grow. Earn. Repeat.</p>
                <p className="hustle-hero-copy">Hustle KE is our reseller & affiliate program. Earn commissions on bundles, get help with AGPO registration, business plans, and weekly M-PESA payouts.</p>
                <div className="hustle-actions">
                  <a className="hustle-btn hustle-btn-primary" href={WHATSAPP} target="_blank" rel="noreferrer">💬 Talk to WeberTech</a>
                  <a className="hustle-btn hustle-btn-secondary" href="#hustle-services">Explore services</a>
                </div>
              </div>
              <div className="hustle-card">
                <div className="hustle-card-icon">🔥</div>
                <h2>Hustle KE includes</h2>
                {HIGHLIGHTS.map((item) => <div className="hustle-check" key={item}><span style={{ color: "#fdba74" }}>✓</span><span>{item}</span></div>)}
              </div>
            </div>
          </section>

          <section className="hustle-section" id="hustle-services">
            <p className="hustle-eyebrow">Hustle KE services</p>
            <h2>Choose the support you need.</h2>
            <p className="hustle-lead">Explore the existing WeberTech Hustle KE services and choose the next step that fits your goal.</p>
            <div className="hustle-services">
              {SERVICES.map((service) => (
                <article className="hustle-service" key={service.title}>
                  <div className="hustle-service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  {service.action.external ? <a className="hustle-service-link" href={service.action.href} target="_blank" rel="noreferrer">{service.action.label} →</a> : <Link className="hustle-service-link" to={service.action.href}>{service.action.label} →</Link>}
                </article>
              ))}
            </div>
          </section>

          <section className="hustle-section" style={{ paddingTop: 0 }}>
            <div className="hustle-join">
              <div>
                <p className="hustle-eyebrow" style={{ color: "#fdba74" }}>Join the Hustle</p>
                <h2>Get started with Hustle KE.</h2>
                <p>Share your details and we will notify you about Hustle KE. You can also reach WeberTech through WhatsApp.</p>
              </div>
              {submitted ? <div className="hustle-form"><strong>You're on the list!</strong><span>WeberTech has received your Hustle KE request.</span><Link className="hustle-service-link" to="/">Back to Home →</Link></div> : <form className="hustle-form" onSubmit={submit}><input required placeholder="Your Name" value={form.name} onChange={update("name")} /><input required type="email" placeholder="Email Address" value={form.email} onChange={update("email")} /><input required type="tel" placeholder="Phone Number (07XX XXX XXX)" value={form.phone} onChange={update("phone")} /><button className="hustle-btn hustle-btn-primary" type="submit" disabled={loading}>{loading ? "Sending…" : "Join the Hustle"}</button><small>No spam — only Hustle KE updates.</small></form>}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
