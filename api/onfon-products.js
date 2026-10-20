const ONFON_ORIGIN = "https://www.onfonmobile.com";
const BRANDS = ["Tecno", "Infinix", "Itel", "Samsung", "Nokia", "Zte", "Vivo", "Oppo", "RealMe", "Honor", "Redmi", "Safaricom", "Villaon", "Lenix"];
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000;

function cleanText(value = "") {
  return String(value)
    .replace(/\\u002F/g, "/")
    .replace(/\\u0026/g, "&")
    .replace(/\\"/g, '"')
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeUrl(value = "") {
  try {
    return decodeURIComponent(value.replace(/&amp;/g, "&"));
  } catch {
    return value;
  }
}

function parseProducts(html, brand) {
  const products = [];
  const imagePattern = /<img[^>]+alt="([^"]+)"[^>]+src="([^"]+)"[^>]*>/gi;
  let match;
  while ((match = imagePattern.exec(html))) {
    const title = cleanText(match[1]);
    if (!title || /logo|device image/i.test(title)) continue;
    const windowText = cleanText(html.slice(match.index, match.index + 2600));
    const daily = windowText.match(/Pay\s+ksh\s+([\d,]+)\s+PER\s+DAY/i)?.[1] || "";
    const deposit = windowText.match(/Deposit\s+KSH\s+([\d,]+)/i)?.[1] || "";
    if (!daily && !deposit) continue;
    const imageRaw = decodeUrl(match[2].replace(/^\/_next\/image\?url=/, "").split(/&(?:amp;)?w=/i)[0]);
    const imageUrl = imageRaw.startsWith("http") ? imageRaw : `${ONFON_ORIGIN}${imageRaw.startsWith("/") ? "" : "/"}${imageRaw}`;
    const sourceUrl = `${ONFON_ORIGIN}/products/${encodeURIComponent(brand)}/${encodeURIComponent(title)}`;
    const id = `${brand}-${title}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    if (!products.some(item => item.id === id)) {
      products.push({
        id,
        title,
        brand,
        imageUrl,
        sourceUrl,
        dailyPayment: Number(daily.replace(/,/g, "")) || null,
        deposit: Number(deposit.replace(/,/g, "")) || null,
        planDays: 365,
        provider: "Onfon Mobile",
        type: "electronics",
      });
    }
  }
  return products;
}

async function loadBrand(brand) {
  const cached = cache.get(brand);
  if (cached && Date.now() - cached.at < CACHE_TTL) return cached.products;
  const response = await fetch(`${ONFON_ORIGIN}/products/${encodeURIComponent(brand)}`, {
    headers: { "User-Agent": "WeberTech Electronics Catalog/1.0" },
  });
  if (!response.ok) throw new Error(`Onfon ${brand} catalog returned ${response.status}`);
  const html = await response.text();
  const products = parseProducts(html, brand);
  cache.set(brand, { at: Date.now(), products });
  return products;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "public, max-age=300, s-maxage=300");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const requested = String(req.query?.brand || "Tecno").trim();
  const brands = requested.toLowerCase() === "all"
    ? BRANDS
    : [BRANDS.find(item => item.toLowerCase() === requested.toLowerCase()) || "Tecno"];

  try {
    const results = await Promise.all(brands.map(async brand => {
      try { return await loadBrand(brand); } catch (error) {
        console.warn("Onfon catalog unavailable", brand, error.message);
        return [];
      }
    }));
    return res.status(200).json({ provider: "Onfon Mobile", source: `${ONFON_ORIGIN}/products`, brands: BRANDS, products: results.flat() });
  } catch (error) {
    return res.status(502).json({ error: "Unable to load the official Onfon catalog right now." });
  }
}
