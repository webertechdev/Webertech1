import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const WHATSAPP = "https://wa.me/254722508904";

const DIVISIONS = {
  academy: {
    badge: "WEBERTECH ACADEMY",
    icon: "🎓",
    title: "Learn digital skills that move you forward.",
    description: "Practical, beginner-friendly training for people who want to build, earn, and grow in the digital economy.",
    gradient: "linear-gradient(135deg, #451a03 0%, #92400e 52%, #d97706 100%)",
    accent: "#fde68a",
    soft: "rgba(253, 230, 138, 0.14)",
    offers: [
      { icon: "💻", title: "Web & App Development", text: "Build responsive websites, useful web apps, and practical digital products from the ground up." },
      { icon: "🎨", title: "Graphic Design & Branding", text: "Learn design principles, social media graphics, brand identity, and portfolio presentation." },
      { icon: "📣", title: "Digital Marketing", text: "Grow a business online with content, social media, campaigns, and customer-focused messaging." },
      { icon: "📈", title: "Digital Business", text: "Turn your skills into income with freelancing, digital products, and simple business systems." },
    ],
    highlights: ["Hands-on lessons", "Flexible learning paths", "Certificate of completion", "Support when you need it"],
    steps: ["Choose a skill", "Learn through practical lessons", "Build a portfolio project", "Start earning or apply for opportunities"],
    cta: "Join the next learning path",
  },
  electronics: {
    badge: "WEBERTECH ELECTRONICS",
    icon: "📺",
    title: "Reliable technology for home, work, and life.",
    description: "Find genuine electronics and accessories with clear guidance, convenient ordering, and delivery support across Kenya.",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #3730a3 52%, #6366f1 100%)",
    accent: "#a5b4fc",
    soft: "rgba(165, 180, 252, 0.14)",
    offers: [
      { icon: "📱", title: "Phones & Tablets", text: "Everyday smartphones, tablets, chargers, cases, and accessories for staying connected." },
      { icon: "📺", title: "TVs & Entertainment", text: "Smart TVs, woofers, speakers, and accessories for a better home entertainment setup." },
      { icon: "🔌", title: "Power & Accessories", text: "Cables, adapters, power solutions, networking accessories, and useful everyday electronics." },
      { icon: "🏠", title: "Home & Office Tech", text: "Practical equipment for home offices, small businesses, study spaces, and everyday productivity." },
    ],
    highlights: ["Genuine product guidance", "Availability confirmation", "Delivery support across Kenya", "Friendly after-sales help"],
    steps: ["Tell us what you need", "Receive available options and pricing", "Confirm your order", "Arrange delivery or collection"],
    cta: "Ask about available products",
  },
  dev: {
    badge: "WEBERTECH DEV SERVICES",
    icon: "💼",
    title: "Build a digital presence that works.",
    description: "Websites, mobile apps, and custom systems designed for Kenyan businesses, creators, and growing teams.",
    gradient: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 52%, #0ea5e9 100%)",
    accent: "#7dd3fc",
    soft: "rgba(125, 211, 252, 0.14)",
    offers: [
      { icon: "🌐", title: "Business Websites", text: "Professional websites and portfolios that explain your offer and make it easy for customers to contact you." },
      { icon: "🛒", title: "Online Stores", text: "Simple, trustworthy storefronts with product presentation, customer journeys, and payment-ready foundations." },
      { icon: "📲", title: "Mobile Apps", text: "Useful Android and iOS experiences for businesses, communities, and new digital products." },
      { icon: "⚙️", title: "Custom Systems", text: "Dashboards, booking tools, admin panels, and workflow systems that save your team time." },
    ],
    highlights: ["Mobile-friendly builds", "Clear project milestones", "Kenyan business context", "Maintenance and support options"],
    steps: ["Share your idea", "Receive a clear scope and estimate", "Review progress at each milestone", "Launch and keep improving"],
    cta: "Request a development quote",
  },
  hustle: {
    badge: "WEBERTECH HUSTLE KE",
    icon: "🔥",
    title: "Turn practical ideas into income.",
    description: "Business guidance, reseller opportunities, and digital support for Kenyans building their next source of income.",
    gradient: "linear-gradient(135deg, #431407 0%, #9a3412 52%, #ea580c 100%)",
    accent: "#fed7aa",
    soft: "rgba(254, 215, 170, 0.18)",
    offers: [
      { icon: "📦", title: "Reseller Opportunities", text: "Explore practical ways to earn by connecting customers with useful WeberTech services." },
      { icon: "📑", title: "Business Plans", text: "Get clear, professional business plans and profiles for your next opportunity." },
      { icon: "🏛️", title: "AGPO Guidance", text: "Understand the steps and documents needed to prepare for public procurement opportunities." },
      { icon: "💰", title: "Digital Income Support", text: "Learn how digital services, customer support, and simple systems can support your hustle." },
    ],
    highlights: ["Practical Kenyan context", "Clear next steps", "Support for beginners", "Opportunities and guidance in one place"],
    steps: ["Tell us your goal", "Choose a support path", "Get the documents or guidance you need", "Take the next step with confidence"],
    cta: "Start your Hustle KE journey",
  },
};

function DivisionLandingPage({ division }) {
  const content = DIVISIONS[division] || DIVISIONS.academy;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let active = true;
    const loadProducts = async () => {
      try {
        const response = await fetch("/api/public-products");
        const payload = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(payload.error || "Published catalog unavailable");
        const matching = (payload.products || []).filter(item => {
          const category = String(item.division || item.category || "").toLowerCase();
          return category.includes(division) || (division === "cyber" && (category.includes("legal") || item.type === "legal-document"));
        });
        if (active) setProducts(matching);
      } catch (error) {
        console.warn("Division product catalog unavailable:", error);
        // Keep a local Firestore fallback for older/local deployments.
        try {
          const snapshot = await getDocs(collection(db, "products"));
          const matching = snapshot.docs
            .map(item => ({ id: item.id, ...item.data() }))
            .filter(item => item.published !== false)
            .filter(item => {
              const category = String(item.division || item.category || "").toLowerCase();
              return category.includes(division) || (division === "cyber" && (category.includes("legal") || item.type === "legal-document"));
            });
          if (active) setProducts(matching);
        } catch (legacyError) {
          console.warn("Legacy division catalog unavailable:", legacyError);
        }
      }
    };
    loadProducts();
    return () => { active = false; };
  }, [division]);

  return (
    <div className="division-page" style={{ "--division-accent": content.accent, "--division-soft": content.soft }}>
      <style>{`
        .division-page { min-height: 100vh; background: #f8fafc; color: #0f172a; font-family: 'Segoe UI', system-ui, sans-serif; }
        .division-page main { padding-top: 62px; }
        .division-hero { position: relative; overflow: hidden; color: #fff; }
        .division-hero::after { content: ''; position: absolute; width: 420px; height: 420px; right: -120px; top: -150px; border-radius: 50%; background: rgba(255,255,255,.1); filter: blur(2px); }
        .division-hero-inner { position: relative; z-index: 1; max-width: 1180px; margin: 0 auto; padding: 82px 24px 76px; display: grid; grid-template-columns: 1.15fr .85fr; gap: 46px; align-items: center; }
        .division-badge { display: inline-flex; align-items: center; gap: 8px; padding: 7px 13px; border: 1px solid rgba(255,255,255,.28); border-radius: 999px; background: rgba(255,255,255,.1); color: var(--division-accent); font-weight: 800; font-size: 12px; letter-spacing: .08em; }
        .division-hero h1 { max-width: 720px; margin: 20px 0 16px; font-size: clamp(36px, 6vw, 68px); line-height: 1.03; letter-spacing: -2px; }
        .division-hero p { max-width: 650px; margin: 0; color: rgba(255,255,255,.8); font-size: 18px; line-height: 1.7; }
        .division-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; }
        .division-primary, .division-secondary { display: inline-flex; align-items: center; justify-content: center; min-height: 46px; padding: 0 20px; border-radius: 11px; text-decoration: none; font-weight: 800; transition: transform .2s, box-shadow .2s, background .2s; }
        .division-primary { background: var(--division-accent); color: #0f172a; box-shadow: 0 10px 25px rgba(0,0,0,.2); }
        .division-secondary { border: 1px solid rgba(255,255,255,.3); color: #fff; background: rgba(255,255,255,.08); }
        .division-primary:hover, .division-secondary:hover { transform: translateY(-2px); }
        .division-hero-card { padding: 26px; border: 1px solid rgba(255,255,255,.2); border-radius: 22px; background: rgba(15,23,42,.24); backdrop-filter: blur(12px); box-shadow: 0 22px 55px rgba(0,0,0,.18); }
        .division-hero-icon { font-size: 58px; margin-bottom: 16px; }
        .division-hero-card h2 { margin: 0 0 14px; font-size: 21px; }
        .division-check { display: flex; gap: 10px; align-items: flex-start; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,.12); color: rgba(255,255,255,.82); line-height: 1.45; }
        .division-check:last-child { border-bottom: 0; }
        .division-section { max-width: 1180px; margin: 0 auto; padding: 76px 24px; }
        .division-section-head { max-width: 680px; margin-bottom: 30px; }
        .division-eyebrow { margin: 0 0 8px; color: #16a34a; font-size: 12px; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; }
        .division-section h2 { margin: 0; font-size: clamp(28px, 4vw, 42px); letter-spacing: -1px; }
        .division-section-head p { color: #64748b; line-height: 1.7; margin: 12px 0 0; }
        .division-offers { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .division-offer { padding: 23px; border: 1px solid #e2e8f0; border-radius: 16px; background: #fff; box-shadow: 0 8px 25px rgba(15,23,42,.05); }
        .division-offer:hover { border-color: var(--division-accent); transform: translateY(-3px); transition: transform .2s, border-color .2s; }
        .division-offer-icon { font-size: 30px; margin-bottom: 14px; }
        .division-offer h3 { margin: 0 0 8px; font-size: 17px; }
        .division-offer p { margin: 0; color: #64748b; font-size: 14px; line-height: 1.6; }
        .division-split { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: stretch; }
        .division-panel { padding: 28px; border-radius: 20px; background: var(--division-soft); border: 1px solid color-mix(in srgb, var(--division-accent) 30%, transparent); }
        .division-panel h3 { margin: 0 0 18px; font-size: 21px; }
        .division-step { display: flex; gap: 13px; align-items: flex-start; padding: 13px 0; border-bottom: 1px solid rgba(15,23,42,.1); }
        .division-step:last-child { border-bottom: 0; }
        .division-step-number { flex: 0 0 28px; height: 28px; display: grid; place-items: center; border-radius: 50%; background: #0f172a; color: #fff; font-weight: 800; font-size: 13px; }
        .division-cta { max-width: 1180px; margin: 0 auto 76px; padding: 42px 32px; border-radius: 22px; background: #0f172a; color: #fff; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
        .division-cta h2 { margin: 0 0 8px; font-size: clamp(24px, 4vw, 36px); }
        .division-cta p { margin: 0; color: rgba(255,255,255,.65); line-height: 1.6; }
        @media (max-width: 900px) { .division-hero-inner, .division-split { grid-template-columns: 1fr; } .division-offers { grid-template-columns: repeat(2, 1fr); } .division-cta { margin-left: 24px; margin-right: 24px; flex-direction: column; align-items: flex-start; } }
        @media (max-width: 560px) { .division-hero-inner { padding-top: 60px; padding-bottom: 58px; } .division-offers { grid-template-columns: 1fr; } .division-section { padding-top: 56px; padding-bottom: 56px; } .division-cta { padding: 30px 22px; } }
      `}</style>

      <Navbar />
      <main>
        <section className="division-hero" style={{ background: content.gradient }}>
          <div className="division-hero-inner">
            <div>
              <span className="division-badge"><span>{content.icon}</span>{content.badge}</span>
              <h1>{content.title}</h1>
              <p>{content.description}</p>
              <div className="division-actions">
                <a className="division-primary" href={WHATSAPP} target="_blank" rel="noreferrer">💬 Talk to WeberTech</a>
                <Link className="division-secondary" to="/auth/register">Create an account</Link>
              </div>
            </div>
            <div className="division-hero-card">
              <div className="division-hero-icon">{content.icon}</div>
              <h2>Why choose this division?</h2>
              {content.highlights.map(highlight => (
                <div className="division-check" key={highlight}><span style={{ color: content.accent }}>✓</span><span>{highlight}</span></div>
              ))}
            </div>
          </div>
        </section>

        <section className="division-section">
          <div className="division-section-head">
            <p className="division-eyebrow">Explore the division</p>
            <h2>Practical services built around your next step.</h2>
            <p>Choose what you need, then contact WeberTech for availability, guidance, and a clear way forward.</p>
          </div>
          <div className="division-offers">
            {content.offers.map(offer => (
              <article className="division-offer" key={offer.title}>
                <div className="division-offer-icon">{offer.icon}</div>
                <h3>{offer.title}</h3>
                <p>{offer.text}</p>
              </article>
            ))}
          </div>
        </section>

        {products.length > 0 && (
          <section className="division-section" style={{ paddingTop: 0 }}>
            <div className="division-section-head">
              <p className="division-eyebrow">Available now</p>
              <h2>Documents and products for this division.</h2>
              <p>Preview the watermarked file, review the details, and continue to secure payment when you are ready.</p>
            </div>
            <div className="division-offers">
              {products.map(product => (
                <Link key={product.id} to={division === "cyber" ? `/cyber/legal-documents/${product.slug || product.id}` : `/cyber/legal-documents/${product.slug || product.id}`} className="division-offer" style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="division-offer-icon">{product.icon || "📄"}</div>
                  <h3>{product.title}</h3>
                  <p>{product.description || "WeberTech product available online."}</p>
                  <div style={{ marginTop: 14, color: "#16a34a", fontWeight: 800 }}>KES {Number(product.price || 0).toLocaleString()} · Preview & buy →</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="division-section" style={{ paddingTop: 0 }}>
          <div className="division-split">
            <div className="division-panel">
              <h3>What happens next?</h3>
              {content.steps.map((step, index) => (
                <div className="division-step" key={step}>
                  <span className="division-step-number">{index + 1}</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
            <div className="division-panel" style={{ background: "#0f172a", color: "#fff", borderColor: "#0f172a" }}>
              <h3>One platform, more support.</h3>
              <p style={{ color: "rgba(255,255,255,.7)", lineHeight: 1.7, margin: 0 }}>
                Your WeberTech account keeps your requests, orders, downloads, and support conversations together. If you need help choosing a service, WeberAI is available on every page.
              </p>
              <Link to="/dashboard" style={{ display: "inline-block", marginTop: 22, color: content.accent, fontWeight: 800, textDecoration: "none" }}>Open My Dashboard →</Link>
            </div>
          </div>
        </section>

        <section className="division-cta">
          <div>
            <h2>{content.cta}</h2>
            <p>Send us a WhatsApp message and a WeberTech team member will guide you from there.</p>
          </div>
          <a className="division-primary" href={WHATSAPP} target="_blank" rel="noreferrer">Start on WhatsApp →</a>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default DivisionLandingPage;
export { DIVISIONS };
