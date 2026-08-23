// src/components/UniversalSearch.jsx
// eCitizen-style global search for all WeberTech divisions and published products.

import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GROUP_ORDER, STATIC_SEARCH_ENTRIES } from "../data/searchCatalog";

const CACHE_KEY = "webertech:global-search-catalog:v1";
const CACHE_TTL = 5 * 60 * 1000;

const GROUP_META = {
  "Cyber Services": { icon: "🖥️", color: "#dc2626" },
  "Hustle KE": { icon: "🔥", color: "#ea580c" },
  Academy: { icon: "🎓", color: "#d97706" },
  Electronics: { icon: "📺", color: "#4f46e5" },
  "Dev Services": { icon: "💼", color: "#0284c7" },
  "Safaricom Bundles": { icon: "📡", color: "#16a34a" },
};

function safeText(value) {
  return String(value || "").trim();
}

function productGroup(product) {
  const raw = safeText(product.division || product.category || product.type).toLowerCase();
  if (raw.includes("academy") || raw.includes("course")) return "Academy";
  if (raw.includes("electronic")) return "Electronics";
  if (raw.includes("dev") || raw.includes("software")) return "Dev Services";
  if (raw.includes("hustle") || raw.includes("affiliate")) return "Hustle KE";
  if (raw.includes("bundle") || raw.includes("safaricom") || raw.includes("airtime")) return "Safaricom Bundles";
  return "Cyber Services";
}

function productRoute(product, group) {
  const type = safeText(product.type).toLowerCase();
  const category = safeText(product.category).toLowerCase();
  const division = safeText(product.division).toLowerCase();
  const isDocument = type.includes("document") || type.includes("legal") || category.includes("legal") || category === "cyber";
  if (isDocument) return `/cyber/legal-documents/${encodeURIComponent(product.slug || product.id)}`;
  if (group === "Academy" || division.includes("academy") || category.includes("academy")) return "/academy";
  if (group === "Electronics" || division.includes("electronic") || category.includes("electronic")) return "/electronics";
  if (group === "Dev Services" || division.includes("dev") || category.includes("dev")) return "/dev";
  if (group === "Hustle KE" || division.includes("hustle") || category.includes("hustle")) return "/hustle";
  if (group === "Safaricom Bundles" || division.includes("bundle") || category.includes("bundle")) return "https://bundles.webertech.co.ke";
  return "/cyber";
}

function normalizeProduct(product) {
  const group = productGroup(product);
  const title = safeText(product.title) || "Untitled service";
  const features = Array.isArray(product.features)
    ? product.features
    : safeText(product.features).split(",").map(value => value.trim()).filter(Boolean);
  return {
    id: `live-${product.id || title}`,
    title,
    description: safeText(product.description) || "Available from WeberTech.",
    group,
    icon: safeText(product.icon) || GROUP_META[group]?.icon || "✨",
    route: productRoute(product, group),
    external: productRoute(product, group).startsWith("http"),
    price: Number.isFinite(Number(product.price)) && Number(product.price) > 0 ? Number(product.price) : null,
    keywords: [product.category, product.division, product.type, product.slug, ...features].filter(Boolean).join(" "),
    live: true,
  };
}

function readCachedProducts() {
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) || "null");
    if (cached && Date.now() - Number(cached.savedAt) < CACHE_TTL && Array.isArray(cached.products)) return cached.products;
  } catch {
    // Ignore unavailable or malformed session storage.
  }
  return null;
}

function scoreResult(item, query) {
  if (!query) return 0;
  const needle = query.toLowerCase();
  const title = item.title.toLowerCase();
  const description = item.description.toLowerCase();
  const keywords = safeText(item.keywords).toLowerCase();
  let score = 0;
  if (title === needle) score += 100;
  if (title.startsWith(needle)) score += 55;
  if (title.includes(needle)) score += 35;
  if (keywords.includes(needle)) score += 20;
  if (description.includes(needle)) score += 10;
  return score;
}

function matches(item, query) {
  if (!query) return true;
  const haystack = [item.title, item.description, item.group, item.keywords].join(" ").toLowerCase();
  return query.toLowerCase().split(/\s+/).filter(Boolean).every(word => haystack.includes(word));
}

function formatPrice(price) {
  return price ? `KES ${price.toLocaleString()}` : "Explore service";
}

export default function UniversalSearch() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [liveProducts, setLiveProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [highlighted, setHighlighted] = useState(0);

  const catalog = useMemo(() => [
    ...STATIC_SEARCH_ENTRIES,
    ...liveProducts,
  ], [liveProducts]);

  const results = useMemo(() => {
    const filtered = catalog
      .filter(item => item.live || item.published !== false)
      .filter(item => matches(item, query.trim()))
      .map(item => ({ item, score: scoreResult(item, query.trim()) }))
      .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title));
    return filtered.slice(0, 24).map(entry => entry.item);
  }, [catalog, query]);

  const groupedResults = useMemo(() => GROUP_ORDER
    .map(group => ({ group, items: results.filter(item => item.group === group) }))
    .filter(section => section.items.length > 0), [results]);

  const flatResults = useMemo(() => groupedResults.flatMap(section => section.items), [groupedResults]);

  const loadProducts = async () => {
    const cached = readCachedProducts();
    if (cached) {
      setLiveProducts(cached.map(normalizeProduct));
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/public-products");
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || "Live catalog unavailable");
      const products = (payload.products || []).filter(product => product.published !== false);
      setLiveProducts(products.map(normalizeProduct));
      try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), products })); } catch { /* no-op */ }
    } catch (loadError) {
      console.warn("Global search live catalog unavailable:", loadError);
      setError("Showing WeberTech services. Live products will appear when the catalog is available.");
    } finally {
      setLoading(false);
    }
  };

  const openSearch = () => {
    setIsOpen(true);
    setHighlighted(0);
    void loadProducts();
    window.setTimeout(() => inputRef.current?.focus(), 0);
  };

  const closeSearch = () => {
    setIsOpen(false);
    setQuery("");
    setHighlighted(0);
  };

  const goToResult = item => {
    if (!item) return;
    closeSearch();
    if (item.external) window.open(item.route, "_blank", "noopener,noreferrer");
    else navigate(item.route);
  };

  useEffect(() => {
    const onShortcut = event => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (isOpen) inputRef.current?.focus();
        else openSearch();
      }
    };
    window.addEventListener("keydown", onShortcut);
    return () => window.removeEventListener("keydown", onShortcut);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = event => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeSearch();
      } else if (event.key === "ArrowDown" && flatResults.length) {
        event.preventDefault();
        setHighlighted(current => (current + 1) % flatResults.length);
      } else if (event.key === "ArrowUp" && flatResults.length) {
        event.preventDefault();
        setHighlighted(current => (current - 1 + flatResults.length) % flatResults.length);
      } else if (event.key === "Enter" && flatResults[highlighted]) {
        event.preventDefault();
        goToResult(flatResults[highlighted]);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, flatResults, highlighted]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onOutside = event => {
      if (!event.target.closest(".global-search-shell")) closeSearch();
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [isOpen]);

  let resultIndex = -1;

  return (
    <div className="global-search-shell">
      <style>{`
        .global-search-shell { position: relative; flex: 0 1 330px; min-width: 190px; z-index: 1002; font-family: 'Segoe UI', system-ui, sans-serif; }
        .global-search-trigger { width: 100%; display: flex; align-items: center; gap: 9px; min-height: 38px; padding: 0 13px; border: 1px solid rgba(255,255,255,.2); border-radius: 12px; background: rgba(255,255,255,.1); color: rgba(255,255,255,.72); cursor: text; text-align: left; transition: border-color .18s, background .18s, box-shadow .18s; }
        .global-search-trigger:hover, .global-search-trigger:focus-visible { background: rgba(255,255,255,.15); border-color: rgba(134,239,172,.7); box-shadow: 0 0 0 3px rgba(74,222,128,.12); outline: none; }
        .global-search-trigger-icon { color: #86efac; font-size: 16px; line-height: 1; }
        .global-search-trigger-copy { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 12.5px; }
        .global-search-shortcut { display: inline-flex; align-items: center; padding: 2px 6px; border: 1px solid rgba(255,255,255,.18); border-radius: 5px; color: rgba(255,255,255,.5); font-size: 10px; white-space: nowrap; }
        .global-search-popover { position: fixed; top: 70px; left: 50%; transform: translateX(-50%); width: min(720px, calc(100vw - 28px)); max-height: min(720px, calc(100vh - 92px)); overflow: hidden; border: 1px solid #dbe5df; border-radius: 18px; background: #fff; box-shadow: 0 24px 70px rgba(15,23,42,.28); animation: global-search-in .18s cubic-bezier(.23,1,.32,1) both; }
        @keyframes global-search-in { from { opacity: 0; transform: translate(-50%, -7px) scale(.98); } to { opacity: 1; transform: translate(-50%, 0) scale(1); } }
        .global-search-backdrop { position: fixed; inset: 0; background: rgba(2,6,23,.38); z-index: -1; }
        .global-search-input-row { display: flex; align-items: center; gap: 10px; padding: 14px; border-bottom: 1px solid #e5e7eb; }
        .global-search-input-icon { color: #16a34a; font-size: 19px; }
        .global-search-input { flex: 1; min-width: 0; border: 0; outline: none; color: #0f172a; font-size: 17px; font-weight: 600; font-family: inherit; }
        .global-search-input::placeholder { color: #94a3b8; font-weight: 500; }
        .global-search-clear { border: 0; background: #f1f5f9; color: #64748b; width: 29px; height: 29px; border-radius: 50%; cursor: pointer; font-size: 14px; }
        .global-search-close { border: 0; background: none; color: #64748b; padding: 4px 2px; cursor: pointer; font-size: 20px; line-height: 1; }
        .global-search-hint { padding: 10px 18px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 12px; }
        .global-search-body { max-height: min(600px, calc(100vh - 190px)); overflow-y: auto; padding: 12px; }
        .global-search-section { margin-bottom: 15px; }
        .global-search-section:last-child { margin-bottom: 0; }
        .global-search-section-title { display: flex; align-items: center; gap: 7px; padding: 4px 8px 7px; color: #64748b; font-size: 11px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
        .global-search-section-count { margin-left: auto; color: #94a3b8; font-size: 10px; font-weight: 700; letter-spacing: 0; }
        .global-search-result { width: 100%; display: flex; align-items: flex-start; gap: 11px; padding: 11px 10px; border: 1px solid transparent; border-radius: 11px; background: #fff; color: #0f172a; text-align: left; cursor: pointer; transition: background .14s, border-color .14s, transform .14s; }
        .global-search-result:hover, .global-search-result.active { border-color: #bbf7d0; background: #f0fdf4; transform: translateX(2px); outline: none; }
        .global-search-result-icon { flex: 0 0 34px; display: grid; place-items: center; width: 34px; height: 34px; border-radius: 10px; background: #f0fdf4; font-size: 18px; }
        .global-search-result-copy { min-width: 0; flex: 1; }
        .global-search-result-title { display: flex; align-items: center; gap: 7px; font-size: 14px; font-weight: 800; line-height: 1.25; }
        .global-search-result-description { margin-top: 3px; color: #64748b; font-size: 12px; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .global-search-result-meta { display: flex; align-items: center; gap: 8px; margin-top: 5px; color: #16a34a; font-size: 11px; font-weight: 800; }
        .global-search-result-live { color: #0369a1; font-size: 9px; letter-spacing: .06em; text-transform: uppercase; }
        .global-search-result-arrow { align-self: center; color: #94a3b8; font-size: 17px; }
        .global-search-empty { padding: 42px 20px; text-align: center; color: #64748b; }
        .global-search-empty-icon { margin-bottom: 9px; font-size: 34px; }
        .global-search-empty-title { color: #0f172a; font-weight: 800; }
        .global-search-empty-text { margin-top: 5px; font-size: 13px; }
        .global-search-loading { display: flex; align-items: center; gap: 8px; padding: 9px 18px; border-bottom: 1px solid #f1f5f9; color: #16a34a; font-size: 12px; }
        .global-search-spinner { width: 14px; height: 14px; border: 2px solid #bbf7d0; border-top-color: #16a34a; border-radius: 50%; animation: global-spin .7s linear infinite; }
        @keyframes global-spin { to { transform: rotate(360deg); } }
        .global-search-error { padding: 8px 18px; background: #fffbeb; color: #92400e; border-bottom: 1px solid #fde68a; font-size: 11px; }
        .global-search-footer { display: flex; justify-content: space-between; gap: 10px; padding: 9px 16px; border-top: 1px solid #e5e7eb; color: #94a3b8; font-size: 10px; }
        @media (max-width: 1100px) { .global-search-shell { flex: 0 1 250px; } .global-search-shortcut { display: none; } }
        @media (max-width: 640px) {
          .global-search-shell { flex: 0 0 auto; min-width: 0; }
          .global-search-trigger { width: 39px; height: 39px; min-height: 39px; padding: 0; justify-content: center; border-radius: 11px; }
          .global-search-trigger-copy, .global-search-shortcut { display: none; }
          .global-search-trigger-icon { font-size: 18px; }
          .global-search-popover { top: 68px; width: calc(100vw - 18px); max-height: calc(100vh - 82px); }
          .global-search-footer { display: none; }
        }
        @media (prefers-reduced-motion: reduce) { .global-search-popover, .global-search-result { animation: none; transition: none; } }
      `}</style>

      <button className="global-search-trigger" type="button" onClick={openSearch} aria-label="Search all WeberTech services">
        <span className="global-search-trigger-icon" aria-hidden="true">⌕</span>
        <span className="global-search-trigger-copy">Search all WeberTech services…</span>
        <span className="global-search-shortcut">Ctrl K</span>
      </button>

      {isOpen && (
        <div className="global-search-popover" role="dialog" aria-modal="true" aria-label="Search all WeberTech services">
          <div className="global-search-backdrop" aria-hidden="true" />
          <div className="global-search-input-row">
            <span className="global-search-input-icon" aria-hidden="true">⌕</span>
            <input
              ref={inputRef}
              className="global-search-input"
              type="search"
              value={query}
              onChange={event => { setQuery(event.target.value); setHighlighted(0); }}
              placeholder="Search eCitizen, bundles, phones, courses, documents…"
              aria-label="Search WeberTech services"
              aria-controls="global-search-results"
              autoComplete="off"
            />
            {query && <button className="global-search-clear" type="button" onClick={() => { setQuery(""); setHighlighted(0); }} aria-label="Clear search">✕</button>}
            <button className="global-search-close" type="button" onClick={closeSearch} aria-label="Close search">✕</button>
          </div>
          {loading && <div className="global-search-loading"><span className="global-search-spinner" />Loading live products…</div>}
          {error && <div className="global-search-error">{error}</div>}
          {!query.trim() && !loading && <div className="global-search-hint">Search once to explore all WeberTech services, products, documents and opportunities.</div>}
          <div className="global-search-body" id="global-search-results">
            {groupedResults.length ? groupedResults.map(section => (
              <section className="global-search-section" key={section.group}>
                <div className="global-search-section-title">
                  <span>{GROUP_META[section.group]?.icon || "✨"}</span>
                  <span>{section.group}</span>
                  <span className="global-search-section-count">{section.items.length}</span>
                </div>
                {section.items.map(item => {
                  resultIndex += 1;
                  const currentIndex = resultIndex;
                  return (
                    <button
                      className={`global-search-result ${highlighted === currentIndex ? "active" : ""}`}
                      type="button"
                      key={item.id}
                      onMouseEnter={() => setHighlighted(currentIndex)}
                      onClick={() => goToResult(item)}
                    >
                      <span className="global-search-result-icon">{item.icon}</span>
                      <span className="global-search-result-copy">
                        <span className="global-search-result-title">{item.title}{item.external && <span aria-label="Opens in a new tab">↗</span>}</span>
                        <span className="global-search-result-description">{item.description}</span>
                        <span className="global-search-result-meta"><span>{formatPrice(item.price)}</span>{item.live && <span className="global-search-result-live">Live catalog</span>}</span>
                      </span>
                      <span className="global-search-result-arrow" aria-hidden="true">›</span>
                    </button>
                  );
                })}
              </section>
            )) : (
              <div className="global-search-empty">
                <div className="global-search-empty-icon">⌕</div>
                <div className="global-search-empty-title">No services found</div>
                <div className="global-search-empty-text">Try “KRA”, “phone”, “website”, “AGPO”, “bundles” or “course”.</div>
              </div>
            )}
          </div>
          <div className="global-search-footer"><span>↑ ↓ to move · Enter to open · Esc to close</span><span>{results.length} result{results.length === 1 ? "" : "s"}</span></div>
        </div>
      )}
    </div>
  );
}
