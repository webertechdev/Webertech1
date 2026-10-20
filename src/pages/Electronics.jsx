import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const WHATSAPP = "https://wa.me/254722508904";
const LOGO = "/logo-webertech.png";
const PROVIDERS = ["Onfon Mobile", "M-KOPA", "Sun King", "Mogo"];
const CATEGORIES = [
  { id: "phones", icon: "📱", label: "Cash phones" },
  { id: "tvs", icon: "📺", label: "TVs & entertainment" },
  { id: "home", icon: "🏠", label: "Home appliances" },
  { id: "networking", icon: "📡", label: "Routers & networking" },
  { id: "electrical", icon: "🔌", label: "Electricals & wiring" },
  { id: "accessories", icon: "🎧", label: "Accessories" },
];

const money = value => value ? `KES ${Number(value).toLocaleString("en-KE")}` : "Price on request";
const whatsappLink = message => `${WHATSAPP}?text=${encodeURIComponent(message)}`;

function PhoneImage({ product }) {
  const [src, setSrc] = useState(product.imageUrl || LOGO);
  return <img src={src} alt={product.title} loading="lazy" onError={() => setSrc(LOGO)} />;
}

function CashPhoneCard({ product, onFinancing }) {
  return <article className="electronics-product-card">
    <div className="electronics-product-image"><PhoneImage product={product} /><span className="electronics-source-pill">Cash price</span></div>
    <div className="electronics-product-body">
      <div className="electronics-product-brand">{product.brand || "Phone"}</div>
      <h3>{product.title}</h3>
      <div className="electronics-cash-price">{money(product.cashPrice)}</div>
      <p className="electronics-spec">Cash purchase through WeberTech. Confirm availability before payment.</p>
      <a className="electronics-buy" href={whatsappLink(`Hello WeberTech, I want to buy this phone for cash.\nBrand: ${product.brand || ""}\nModel: ${product.title}\nListed cash price: ${money(product.cashPrice)}\nPlease confirm availability and delivery.`)} target="_blank" rel="noreferrer">Buy for cash</a>
      <button className="electronics-finance" onClick={() => onFinancing(product)}>See Lipa Polepole options</button>
    </div>
  </article>;
}

function OnfonFinanceCard({ product, provider, onRequest }) {
  return <article className="electronics-product-card electronics-finance-card">
    <div className="electronics-product-image"><PhoneImage product={product} /><span className="electronics-source-pill">{provider}</span></div>
    <div className="electronics-product-body">
      <div className="electronics-product-brand">{product.brand}</div><h3>{product.title}</h3>
      <p className="electronics-spec">Financing details from the official Onfon listing. WeberTech does not collect the deposit here.</p>
      <div className="electronics-price-grid"><div><small>Deposit</small><strong>{money(product.deposit)}</strong></div><div><small>Daily plan</small><strong>{money(product.dailyPayment)} / day</strong></div></div>
      <button className="electronics-finance" onClick={() => onRequest(product, provider)}>Send details on WhatsApp</button>
      <a className="electronics-details" href={product.sourceUrl} target="_blank" rel="noreferrer">View official details ↗</a>
    </div>
  </article>;
}

export default function Electronics() {
  const [category, setCategory] = useState("phones");
  const [cashPhones, setCashPhones] = useState([]);
  const [cashSource, setCashSource] = useState("");
  const [onfonProducts, setOnfonProducts] = useState([]);
  const [brand, setBrand] = useState("Tecno");
  const [brands, setBrands] = useState(["Tecno"]);
  const [provider, setProvider] = useState("Onfon Mobile");
  const [phoneMode, setPhoneMode] = useState("cash");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    fetch("/api/public-products?route=cash-phones")
      .then(response => response.json())
      .then(payload => { if (active) { setCashPhones(payload.products || []); setCashSource(payload.source || ""); } })
      .catch(() => { if (active) setError("Cash phone prices are temporarily unavailable."); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (category !== "phones" || phoneMode !== "finance" || provider !== "Onfon Mobile") return;
    let active = true;
    setLoading(true); setError("");
    fetch(`/api/public-products?route=onfon&brand=${encodeURIComponent(brand)}`)
      .then(async response => { const payload = await response.json(); if (!response.ok) throw new Error(payload.error || "Financing catalog unavailable"); return payload; })
      .then(payload => { if (active) { setOnfonProducts(payload.products || []); setBrands(payload.brands || ["Tecno"]); } })
      .catch(err => { if (active) { setOnfonProducts([]); setError(err.message); } })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [brand, category, phoneMode, provider]);

  const filteredCash = useMemo(() => cashPhones.filter(item => `${item.brand} ${item.title}`.toLowerCase().includes(query.toLowerCase())), [cashPhones, query]);
  const filteredFinance = useMemo(() => onfonProducts.filter(item => item.title.toLowerCase().includes(query.toLowerCase())), [onfonProducts, query]);
  const requestFinance = (product, selectedProvider) => window.open(whatsappLink(`Hello WeberTech, I want Lipa Polepole options.\nPhone: ${product.title}\nBrand: ${product.brand}\nFinancier: ${selectedProvider}\nDeposit shown: ${money(product.deposit)}\nDaily plan shown: ${money(product.dailyPayment)} per day\nPlease confirm availability, terms, and next steps. WeberTech should not collect the deposit here.`), "_blank", "noopener,noreferrer");
  const requestCategory = label => window.open(whatsappLink(`Hello WeberTech, I want to order ${label}. Please share available options, pictures, prices, and payment arrangements.`), "_blank", "noopener,noreferrer");

  return <div className="electronics-page"><style>{`
    .electronics-page{min-height:100vh;background:#f6f8fb;color:#0f172a;font-family:'Segoe UI',system-ui,sans-serif}.electronics-page main{padding-top:62px}.electronics-hero{background:radial-gradient(circle at 88% 10%,rgba(99,102,241,.34),transparent 34%),linear-gradient(135deg,#111827,#1e1b4b 55%,#312e81);color:#fff}.electronics-hero-inner{max-width:1240px;margin:0 auto;padding:78px 24px 64px;display:grid;grid-template-columns:1.1fr .9fr;gap:40px;align-items:center}.electronics-kicker{display:inline-flex;padding:7px 12px;border-radius:99px;background:rgba(165,180,252,.14);border:1px solid rgba(199,210,254,.26);color:#c7d2fe;font-size:12px;font-weight:900;letter-spacing:.1em}.electronics-hero h1{font-size:clamp(38px,6vw,70px);line-height:1.02;letter-spacing:-2px;margin:18px 0 16px}.electronics-hero p{max-width:650px;color:#dbeafe;font-size:18px;line-height:1.7;margin:0}.electronics-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}.electronics-primary,.electronics-secondary{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:0 18px;border-radius:11px;font-weight:800;text-decoration:none}.electronics-primary{background:#a5b4fc;color:#111827}.electronics-secondary{border:1px solid rgba(255,255,255,.28);color:#fff;background:rgba(255,255,255,.08)}.electronics-trust{padding:24px;border-radius:22px;background:rgba(15,23,42,.48);border:1px solid rgba(255,255,255,.18)}.electronics-trust h2{font-size:20px;margin:0 0 15px}.electronics-trust-row{display:flex;gap:10px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.12);color:#e2e8f0;line-height:1.45}.electronics-wrap{max-width:1240px;margin:0 auto;padding:46px 24px}.electronics-section-head{display:flex;justify-content:space-between;gap:20px;align-items:end;margin-bottom:22px}.electronics-section-head h2{font-size:clamp(26px,4vw,40px);letter-spacing:-1px;margin:0}.electronics-section-head p{color:#64748b;line-height:1.65;max-width:700px;margin:10px 0 0}.electronics-categories{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin-bottom:28px}.electronics-category,.electronics-brand,.electronics-mode{border:1px solid #e2e8f0;background:#fff;border-radius:14px;padding:14px 10px;cursor:pointer;text-align:center;font-weight:800;color:#334155;font-family:inherit}.electronics-category.active,.electronics-mode.active{background:#312e81;border-color:#312e81;color:#fff}.electronics-category span{display:block;font-size:26px;margin-bottom:7px}.electronics-toolbar{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:center;margin:18px 0}.electronics-brands{display:flex;gap:8px;flex-wrap:wrap}.electronics-brand{border-radius:99px;padding:9px 13px}.electronics-brand.active{background:#e0e7ff;border-color:#818cf8;color:#312e81}.electronics-search{min-width:230px;padding:11px 14px;border-radius:10px;border:1px solid #cbd5e1;font:inherit}.electronics-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.electronics-product-card{background:#fff;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;box-shadow:0 8px 24px rgba(15,23,42,.05);display:flex;flex-direction:column}.electronics-product-image{height:210px;background:linear-gradient(145deg,#eef2ff,#fff);position:relative;display:grid;place-items:center;padding:16px}.electronics-product-image img{max-width:100%;max-height:175px;object-fit:contain}.electronics-source-pill{position:absolute;top:12px;left:12px;background:#312e81;color:#fff;border-radius:99px;padding:5px 8px;font-size:10px;font-weight:800}.electronics-product-body{padding:16px;display:flex;flex-direction:column;height:100%}.electronics-product-brand{font-size:11px;color:#6366f1;font-weight:900;text-transform:uppercase;letter-spacing:.08em}.electronics-product-body h3{font-size:17px;margin:6px 0;line-height:1.25}.electronics-spec{font-size:12px;color:#64748b;line-height:1.5;margin:8px 0 14px}.electronics-cash-price{font-size:22px;font-weight:900;color:#166534;margin:5px 0}.electronics-buy,.electronics-finance{display:flex;align-items:center;justify-content:center;border:0;border-radius:9px;padding:11px 8px;font:inherit;font-size:12px;font-weight:800;cursor:pointer;text-decoration:none;margin-top:auto}.electronics-buy{background:#16a34a;color:#fff}.electronics-finance{background:#eef2ff;color:#3730a3;margin-top:8px}.electronics-price-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px}.electronics-price-grid div{background:#f8fafc;padding:9px;border-radius:10px}.electronics-price-grid small{display:block;color:#64748b;font-size:10px;margin-bottom:4px}.electronics-price-grid strong{font-size:12px;color:#0f172a;display:block}.electronics-details{color:#475569;font-size:11px;text-align:center;margin-top:12px;text-decoration:none}.electronics-empty{padding:34px;background:#fff;border:1px dashed #cbd5e1;border-radius:16px;color:#64748b}.electronics-coming{display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:center;background:#fff;border:1px solid #e2e8f0;border-radius:20px;padding:26px}.electronics-coming h3{margin:0 0 8px;font-size:22px}.electronics-coming p{color:#64748b;line-height:1.65;margin:0}.electronics-coming-list{display:grid;grid-template-columns:1fr 1fr;gap:10px}.electronics-coming-item{padding:13px;border-radius:12px;background:#f8fafc;color:#334155;font-weight:700}.electronics-note{margin-top:24px;padding:16px 18px;border-left:4px solid #6366f1;background:#eef2ff;color:#3730a3;border-radius:10px;line-height:1.6;font-size:13px}.electronics-track{margin-top:38px;padding:30px;border-radius:20px;background:#0f172a;color:#fff;display:flex;justify-content:space-between;gap:20px;align-items:center}.electronics-track h2{margin:0 0 6px}.electronics-track p{margin:0;color:#cbd5e1;line-height:1.6}.electronics-track a{white-space:nowrap;color:#a5b4fc;font-weight:900;text-decoration:none}@media(max-width:1000px){.electronics-grid{grid-template-columns:repeat(3,1fr)}.electronics-categories{grid-template-columns:repeat(3,1fr)}}@media(max-width:720px){.electronics-hero-inner{grid-template-columns:1fr;padding-top:58px}.electronics-grid{grid-template-columns:repeat(2,1fr)}.electronics-coming{grid-template-columns:1fr}.electronics-track{display:block}.electronics-track a{display:inline-block;margin-top:18px}}@media(max-width:480px){.electronics-wrap{padding-left:16px;padding-right:16px}.electronics-grid{grid-template-columns:1fr}.electronics-categories{grid-template-columns:repeat(2,1fr)}.electronics-section-head{display:block}.electronics-search{width:100%;box-sizing:border-box}}
  `}</style><Navbar /><main>
    <section className="electronics-hero"><div className="electronics-hero-inner"><div><span className="electronics-kicker">WEBERTECH ELECTRONICS</span><h1>Cash phones first. Financing by enquiry.</h1><p>Browse the supplied cash-price list first. WeberTech collects only for cash-phone purchases. Lipa Polepole details are sent to WhatsApp for confirmation with the selected financier.</p><div className="electronics-actions"><a className="electronics-primary" href="#phone-catalog">Browse cash phones ↓</a><a className="electronics-secondary" href={WHATSAPP} target="_blank" rel="noreferrer">💬 Ask WeberTech</a></div></div><div className="electronics-trust"><h2>Clear payment paths</h2><div className="electronics-trust-row"><b>1.</b><span>Cash phones show their cash price first.</span></div><div className="electronics-trust-row"><b>2.</b><span>Click Buy for cash to confirm stock and delivery on WhatsApp.</span></div><div className="electronics-trust-row"><b>3.</b><span>Select Lipa Polepole to send the phone and financier details on WhatsApp.</span></div><div className="electronics-trust-row"><b>4.</b><span>WeberTech does not collect financing deposits through this page.</span></div></div></div></section>
    <section className="electronics-wrap" id="phone-catalog"><div className="electronics-section-head"><div><h2>Shop by category</h2><p>Phones are shown first using the supplied price list. Prices are admin-managed and may be updated when a new list is reviewed.</p></div><span style={{color:"#475569",fontSize:12,fontWeight:700}}>{cashSource === "admin-managed" ? "Admin-managed prices" : "Supplied price list"}</span></div>
      <div className="electronics-categories">{CATEGORIES.map(item => <button key={item.id} className={`electronics-category ${category === item.id ? "active" : ""}`} onClick={() => setCategory(item.id)}><span>{item.icon}</span>{item.label}</button>)}</div>
      {category === "phones" ? <><div className="electronics-toolbar"><div className="electronics-brands"><button className={`electronics-mode ${phoneMode === "cash" ? "active" : ""}`} onClick={() => setPhoneMode("cash")}>Cash phones</button><button className={`electronics-mode ${phoneMode === "finance" ? "active" : ""}`} onClick={() => setPhoneMode("finance")}>Lipa Polepole details</button></div><input className="electronics-search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search phone model or brand" aria-label="Search phone model or brand" /></div>{phoneMode === "cash" ? <>{filteredCash.length ? <div className="electronics-grid">{filteredCash.map(product => <CashPhoneCard key={product.id} product={product} onFinancing={product => { setPhoneMode("finance"); setQuery(product.title); }} />)}</div> : <div className="electronics-empty">No cash phones match your search.</div>}<div className="electronics-note"><strong>Cash-first:</strong> WeberTech collects only for cash-phone orders. Confirm stock, price, and delivery on WhatsApp before sending payment.</div></> : <><div className="electronics-toolbar"><div className="electronics-brands">{PROVIDERS.map(item => <button key={item} className={`electronics-brand ${provider === item ? "active" : ""}`} onClick={() => setProvider(item)}>{item}</button>)}{provider === "Onfon Mobile" && brands.map(item => <button key={item} className={`electronics-brand ${brand === item ? "active" : ""}`} onClick={() => setBrand(item)}>{item}</button>)}</div></div>{provider === "Onfon Mobile" ? loading ? <div className="electronics-empty">Loading official Onfon financing details…</div> : error ? <div className="electronics-empty">{error}</div> : <div className="electronics-grid">{filteredFinance.map(product => <OnfonFinanceCard key={product.id} product={product} provider={provider} onRequest={requestFinance} />)}</div> : <div className="electronics-coming"><div><h3>{provider} phone financing</h3><p>This financier is available for enquiry. WeberTech does not display or collect a deposit here. Send the selected provider and phone details to WhatsApp for confirmation.</p><button className="electronics-finance" onClick={() => requestFinance({ title: query || "phone of interest", brand: "", deposit: null, dailyPayment: null }, provider)}>Send enquiry to WhatsApp</button></div><div className="electronics-coming-list"><div className="electronics-coming-item">✓ Provider selected</div><div className="electronics-coming-item">✓ Phone details included</div><div className="electronics-coming-item">✓ Availability confirmation</div><div className="electronics-coming-item">✓ No deposit collected here</div></div></div>}</>}</> : <div className="electronics-coming"><div><h3>{CATEGORIES.find(item => item.id === category)?.icon} {CATEGORIES.find(item => item.id === category)?.label}</h3><p>WeberTech will confirm the available model, picture, price, delivery, and payment arrangement before you pay.</p><button className="electronics-finance" onClick={() => requestCategory(CATEGORIES.find(item => item.id === category)?.label)}>Request options on WhatsApp</button></div><div className="electronics-coming-list"><div className="electronics-coming-item">✓ Availability confirmation</div><div className="electronics-coming-item">✓ Clear pricing before payment</div><div className="electronics-coming-item">✓ Order support</div><div className="electronics-coming-item">✓ Delivery coordination</div></div></div>}
      <div className="electronics-track"><div><h2>Track WeberTech cash orders</h2><p>Sign in to keep confirmed cash-order requests, payment status, and support updates together. Refresh your dashboard for the latest state.</p></div><Link to="/dashboard">Open my dashboard →</Link></div>
    </section></main><Footer /></div>;
}
