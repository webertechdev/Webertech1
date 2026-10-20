import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PaymentModal from "../payments/PaymentModal";

const WHATSAPP = "https://wa.me/254722508904";
const ONFON = "https://www.onfonmobile.com/products";
const PROVIDERS = ["Onfon Mobile", "M-KOPA", "Sun King", "Mogo"];
const CATEGORIES = [
  { id: "phones", icon: "📱", label: "Phones" },
  { id: "tvs", icon: "📺", label: "TVs & entertainment" },
  { id: "home", icon: "🏠", label: "Home appliances" },
  { id: "networking", icon: "📡", label: "Routers & networking" },
  { id: "electrical", icon: "🔌", label: "Electricals & wiring" },
  { id: "accessories", icon: "🎧", label: "Accessories" },
];

function money(value) {
  return value ? `KES ${Number(value).toLocaleString()}` : "Confirm with WeberTech";
}

function ProductCard({ product, onBuy, onCash }) {
  return (
    <article className="electronics-product-card">
      <div className="electronics-product-image">
        <img src={product.imageUrl} alt={product.title} loading="lazy" />
        <span className="electronics-source-pill">Onfon Mobile</span>
      </div>
      <div className="electronics-product-body">
        <div className="electronics-product-brand">{product.brand}</div>
        <h3>{product.title}</h3>
        <p className="electronics-spec">Official listing · {product.planDays}-day plan</p>
        <div className="electronics-price-grid">
          <div><small>Daily plan</small><strong>{money(product.dailyPayment)} / day</strong></div>
          <div><small>Deposit</small><strong>{money(product.deposit)}</strong></div>
        </div>
        <div className="electronics-card-actions">
          <button className="electronics-buy" onClick={() => onBuy(product)} disabled={!product.deposit}>Pay deposit</button>
          <button className="electronics-cash" onClick={() => onCash(product)}>Cash quote</button>
        </div>
        <a className="electronics-details" href={product.sourceUrl} target="_blank" rel="noreferrer">View official details ↗</a>
      </div>
    </article>
  );
}

export default function Electronics() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("phones");
  const [provider, setProvider] = useState("Onfon Mobile");
  const [brand, setBrand] = useState("Tecno");
  const [brands, setBrands] = useState(["Tecno"]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [customer, setCustomer] = useState(null);
  const [paymentProduct, setPaymentProduct] = useState(null);

  useEffect(() => onAuthStateChanged(auth, async (firebaseUser) => {
    if (!firebaseUser) return setCustomer(null);
    const profile = await getDoc(doc(db, "users", firebaseUser.uid)).catch(() => null);
    const data = profile?.exists() ? profile.data() : {};
    setCustomer({ uid: firebaseUser.uid, email: firebaseUser.email || data.email || "", name: [data.firstName, data.lastName].filter(Boolean).join(" ") || firebaseUser.displayName || "Customer" });
  }), []);

  useEffect(() => {
    if (category !== "phones" || provider !== "Onfon Mobile") return;
    let active = true;
    setLoading(true);
    setError("");
    fetch(`/api/onfon-products?brand=${encodeURIComponent(brand)}`)
      .then(async response => {
        const payload = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(payload.error || "Onfon catalog unavailable");
        return payload;
      })
      .then(payload => {
        if (!active) return;
        setProducts(payload.products || []);
        setBrands(payload.brands || brands);
      })
      .catch(err => { if (active) { setProducts([]); setError(err.message); } })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [brand, category, provider]);

  const filteredProducts = useMemo(() => products.filter(product => product.title.toLowerCase().includes(query.toLowerCase())), [products, query]);

  const openCheckout = (product) => {
    if (!customer) {
      navigate(`/auth/login?redirect=${encodeURIComponent("/electronics")}`);
      return;
    }
    setPaymentProduct({
      id: product.id,
      slug: product.id,
      title: `${product.title} — Onfon deposit request`,
      price: product.deposit,
      type: "electronics",
      brand: product.brand,
      provider: product.provider,
      sourceUrl: product.sourceUrl,
    });
  };

  const requestCash = (product) => {
    const text = `Hello WeberTech, I want a cash quote and availability confirmation for ${product.title} from Onfon Mobile. Official listing: ${product.sourceUrl}`;
    window.open(`${WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="electronics-page">
      <style>{`
        .electronics-page{min-height:100vh;background:#f6f8fb;color:#0f172a;font-family:'Segoe UI',system-ui,sans-serif}.electronics-page main{padding-top:62px}.electronics-hero{background:radial-gradient(circle at 88% 10%,rgba(99,102,241,.34),transparent 34%),linear-gradient(135deg,#111827,#1e1b4b 55%,#312e81);color:#fff}.electronics-hero-inner{max-width:1240px;margin:0 auto;padding:78px 24px 64px;display:grid;grid-template-columns:1.1fr .9fr;gap:40px;align-items:center}.electronics-kicker{display:inline-flex;padding:7px 12px;border-radius:99px;background:rgba(165,180,252,.14);border:1px solid rgba(199,210,254,.26);color:#c7d2fe;font-size:12px;font-weight:900;letter-spacing:.1em}.electronics-hero h1{font-size:clamp(38px,6vw,70px);line-height:1.02;letter-spacing:-2px;margin:18px 0 16px}.electronics-hero p{max-width:650px;color:#dbeafe;font-size:18px;line-height:1.7;margin:0}.electronics-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}.electronics-primary,.electronics-secondary{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:0 18px;border-radius:11px;font-weight:800;text-decoration:none}.electronics-primary{background:#a5b4fc;color:#111827}.electronics-secondary{border:1px solid rgba(255,255,255,.28);color:#fff;background:rgba(255,255,255,.08)}.electronics-trust{padding:24px;border-radius:22px;background:rgba(15,23,42,.48);border:1px solid rgba(255,255,255,.18);box-shadow:0 25px 60px rgba(0,0,0,.22)}.electronics-trust h2{font-size:20px;margin:0 0 15px}.electronics-trust-row{display:flex;gap:10px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.12);color:#e2e8f0;line-height:1.45}.electronics-trust-row:last-child{border-bottom:0}.electronics-wrap{max-width:1240px;margin:0 auto;padding:46px 24px}.electronics-section-head{display:flex;justify-content:space-between;gap:20px;align-items:end;margin-bottom:22px}.electronics-section-head h2{font-size:clamp(26px,4vw,40px);letter-spacing:-1px;margin:0}.electronics-section-head p{color:#64748b;line-height:1.65;max-width:650px;margin:10px 0 0}.electronics-categories{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin-bottom:42px}.electronics-category{border:1px solid #e2e8f0;background:#fff;border-radius:14px;padding:16px 10px;cursor:pointer;text-align:center;font-weight:800;color:#334155;font-family:inherit}.electronics-category.active{background:#312e81;border-color:#312e81;color:#fff;box-shadow:0 12px 24px rgba(49,46,129,.2)}.electronics-category span{display:block;font-size:26px;margin-bottom:7px}.electronics-toolbar{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:center;margin:18px 0}.electronics-brands{display:flex;gap:8px;flex-wrap:wrap}.electronics-brand{border:1px solid #cbd5e1;background:#fff;border-radius:99px;padding:9px 13px;cursor:pointer;font-weight:700;color:#475569}.electronics-brand.active{background:#e0e7ff;border-color:#818cf8;color:#312e81}.electronics-search{min-width:230px;padding:11px 14px;border-radius:10px;border:1px solid #cbd5e1;font:inherit}.electronics-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.electronics-product-card{background:#fff;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;box-shadow:0 8px 24px rgba(15,23,42,.05);display:flex;flex-direction:column}.electronics-product-image{height:210px;background:linear-gradient(145deg,#eef2ff,#fff);position:relative;display:grid;place-items:center;padding:16px}.electronics-product-image img{max-width:100%;max-height:175px;object-fit:contain}.electronics-source-pill{position:absolute;top:12px;left:12px;background:#312e81;color:#fff;border-radius:99px;padding:5px 8px;font-size:10px;font-weight:800}.electronics-product-body{padding:16px;display:flex;flex-direction:column;height:100%}.electronics-product-brand{font-size:11px;color:#6366f1;font-weight:900;text-transform:uppercase;letter-spacing:.08em}.electronics-product-body h3{font-size:17px;margin:6px 0 6px;line-height:1.25}.electronics-spec{font-size:12px;color:#64748b;margin:0 0 14px}.electronics-price-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px}.electronics-price-grid div{background:#f8fafc;padding:9px;border-radius:10px}.electronics-price-grid small{display:block;color:#64748b;font-size:10px;margin-bottom:4px}.electronics-price-grid strong{font-size:12px;color:#0f172a;display:block}.electronics-card-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:auto}.electronics-buy,.electronics-cash{border:0;border-radius:9px;padding:10px 7px;font:inherit;font-size:12px;font-weight:800;cursor:pointer}.electronics-buy{background:#16a34a;color:#fff}.electronics-cash{background:#eef2ff;color:#3730a3}.electronics-buy:disabled{background:#cbd5e1;cursor:not-allowed}.electronics-details{color:#475569;font-size:11px;text-align:center;margin-top:12px;text-decoration:none}.electronics-empty{padding:34px;background:#fff;border:1px dashed #cbd5e1;border-radius:16px;color:#64748b}.electronics-coming{display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:center;background:#fff;border:1px solid #e2e8f0;border-radius:20px;padding:26px}.electronics-coming h3{margin:0 0 8px;font-size:22px}.electronics-coming p{color:#64748b;line-height:1.65;margin:0}.electronics-coming-list{display:grid;grid-template-columns:1fr 1fr;gap:10px}.electronics-coming-item{padding:13px;border-radius:12px;background:#f8fafc;color:#334155;font-weight:700}.electronics-note{margin-top:24px;padding:16px 18px;border-left:4px solid #6366f1;background:#eef2ff;color:#3730a3;border-radius:10px;line-height:1.6;font-size:13px}.electronics-track{margin-top:38px;padding:30px;border-radius:20px;background:#0f172a;color:#fff;display:flex;justify-content:space-between;gap:20px;align-items:center}.electronics-track h2{margin:0 0 6px}.electronics-track p{margin:0;color:#cbd5e1;line-height:1.6}.electronics-track a{white-space:nowrap;color:#a5b4fc;font-weight:900;text-decoration:none}@media(max-width:1000px){.electronics-grid{grid-template-columns:repeat(3,1fr)}.electronics-categories{grid-template-columns:repeat(3,1fr)}}@media(max-width:720px){.electronics-hero-inner{grid-template-columns:1fr;padding-top:58px}.electronics-grid{grid-template-columns:repeat(2,1fr)}.electronics-coming{grid-template-columns:1fr}.electronics-track{display:block}.electronics-track a{display:inline-block;margin-top:18px}}@media(max-width:480px){.electronics-wrap{padding-left:16px;padding-right:16px}.electronics-grid{grid-template-columns:1fr}.electronics-categories{grid-template-columns:repeat(2,1fr)}.electronics-section-head{display:block}.electronics-search{width:100%;box-sizing:border-box}}
      `}</style>
      <Navbar />
      <main>
        <section className="electronics-hero"><div className="electronics-hero-inner"><div><span className="electronics-kicker">WEBERTECH ELECTRONICS</span><h1>Technology for home, work, and life.</h1><p>Shop phones first through a live Onfon Mobile catalog, request cash availability, or use the disclosed Lipa Polepole deposit plan. Other electronics categories are organized here for guided ordering as the catalog grows.</p><div className="electronics-actions"><a className="electronics-primary" href="#phone-catalog">Browse phones ↓</a><a className="electronics-secondary" href={WHATSAPP} target="_blank" rel="noreferrer">💬 Ask WeberTech</a></div></div><div className="electronics-trust"><h2>How ordering works</h2><div className="electronics-trust-row"><b>1.</b><span>Choose a category and product.</span></div><div className="electronics-trust-row"><b>2.</b><span>For Onfon phones, review the official deposit and daily plan.</span></div><div className="electronics-trust-row"><b>3.</b><span>Pay the deposit through WeberPay or request a cash quote.</span></div><div className="electronics-trust-row"><b>4.</b><span>Track the payment order in your WeberTech dashboard while availability is confirmed.</span></div></div></div></section>
        <section className="electronics-wrap" id="phone-catalog"><div className="electronics-section-head"><div><h2>Shop by category</h2><p>Phones are the first live catalog. Select another category to send a product request without seeing made-up stock or prices.</p></div><a href={ONFON} target="_blank" rel="noreferrer" style={{color:"#4338ca",fontWeight:800,textDecoration:"none"}}>Official Onfon source ↗</a></div>
          <div className="electronics-categories">{CATEGORIES.map(item => <button key={item.id} className={`electronics-category ${category === item.id ? "active" : ""}`} onClick={() => setCategory(item.id)}><span>{item.icon}</span>{item.label}</button>)}</div>
          {category === "phones" ? <><div className="electronics-toolbar"><div className="electronics-brands">{PROVIDERS.map(item => <button key={item} className={`electronics-brand ${provider === item ? "active" : ""}`} onClick={() => { setProvider(item); setProducts([]); }}>{item}</button>)}</div></div>{provider === "Onfon Mobile" ? <><div className="electronics-toolbar"><div className="electronics-brands">{brands.map(item => <button key={item} className={`electronics-brand ${brand === item ? "active" : ""}`} onClick={() => setBrand(item)}>{item}</button>)}<button className={`electronics-brand ${brand === "all" ? "active" : ""}`} onClick={() => setBrand("all")}>All Onfon phones</button></div><input className="electronics-search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search phone model" aria-label="Search phone model" /></div>{loading ? <div className="electronics-empty">Loading the official {brand === "all" ? "Onfon" : brand} catalog…</div> : error ? <div className="electronics-empty">{error}. <a href={ONFON} target="_blank" rel="noreferrer">Open the official catalog</a> or ask WeberTech for help.</div> : filteredProducts.length ? <div className="electronics-grid">{filteredProducts.map(product => <ProductCard key={product.id} product={product} onBuy={openCheckout} onCash={requestCash} />)}</div> : <div className="electronics-empty">No matching devices were returned by the official Onfon catalog.</div>}<div className="electronics-note"><strong>Important:</strong> Onfon publishes the deposit and daily plan on its public catalog. A full cash price is not exposed there, so WeberTech asks for confirmation instead of inventing a cash price.</div></> : <div className="electronics-coming"><div><h3>{provider} phone options</h3><p>This provider is listed for the requested phone-financing choice. WeberTech has not connected a live public catalog for it yet, so send a request and the team will confirm the model, price, and payment arrangement before you pay.</p><div className="electronics-actions"><a className="electronics-primary" style={{background:"#312e81",color:"#fff"}} href={`${WHATSAPP}?text=${encodeURIComponent(`Hello WeberTech, I want phone options through ${provider}. Please share available models and pricing.`)}`} target="_blank" rel="noreferrer">Request {provider} options</a></div></div><div className="electronics-coming-list">{["Availability confirmation","Clear pricing before payment","Order support","Delivery coordination"].map(item => <div className="electronics-coming-item" key={item}>✓ {item}</div>)}</div></div>}</> : <div className="electronics-coming"><div><h3>{CATEGORIES.find(item => item.id === category)?.icon} {CATEGORIES.find(item => item.id === category)?.label}</h3><p>WeberTech will confirm the available model, price, delivery, and payment arrangement before you pay. Send a request for this category and the team will follow up.</p><div className="electronics-actions"><a className="electronics-primary" style={{background:"#312e81",color:"#fff"}} href={`${WHATSAPP}?text=${encodeURIComponent(`Hello WeberTech, I want to order ${CATEGORIES.find(item => item.id === category)?.label}. Please share available options and pricing.`)}`} target="_blank" rel="noreferrer">Request options on WhatsApp</a></div></div><div className="electronics-coming-list">{["Availability confirmation","Clear pricing before payment","Order support","Delivery coordination"].map(item => <div className="electronics-coming-item" key={item}>✓ {item}</div>)}</div></div>}
          <div className="electronics-track"><div><h2>Track every WeberTech order</h2><p>Sign in to keep payment status, order history, and support updates in one place. Refresh your dashboard to load the latest order state.</p></div><Link to="/dashboard">Open my dashboard →</Link></div>
        </section>
      </main>
      <Footer />
      <PaymentModal open={Boolean(paymentProduct)} onClose={() => setPaymentProduct(null)} product={paymentProduct} customer={customer} />
    </div>
  );
}
