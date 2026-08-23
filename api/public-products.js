import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { readFile } from "node:fs/promises";
import { getDb } from "./_lib/firebaseAdmin.js";
import { fetchRemotePdf, getDocumentSource, getFileName } from "./_lib/documentLinks.js";
import { isDocumentOrderType } from "./_lib/orders.js";

const require = createRequire(import.meta.url);

class LocalStandardFontDataFactory {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  async fetch({ filename }) {
    return new Uint8Array(await readFile(join(this.baseUrl, filename)));
  }
}

function getQuery(req, key) {
  const value = req.query?.[key];
  return Array.isArray(value) ? value[0] : String(value || "").trim();
}

function normalize(record, id) {
  const sourceUrl = record.fileUrl || record.downloadURL || record.downloadFile || record.documentUrl || record.url || "";
  const fileName = record.fileName || "";

  return {
    id,
    title: record.title || "Untitled document",
    description: record.description || "",
    price: Number(record.price || 0),
    category: String(record.category || record.division || "cyber").toLowerCase(),
    subcategory: String(record.subcategory || "").toLowerCase(),
    division: String(record.division || record.category || "cyber").toLowerCase(),
    type: record.type || "service-document",
    published: record.published !== false,
    icon: record.icon || "📄",
    features: Array.isArray(record.features)
      ? record.features
      : String(record.features || "")
          .split(",")
          .map(value => value.trim())
          .filter(Boolean),
    // Never expose the original hosted PDF URL in the public catalog.
    previewUrl: sourceUrl ? `/api/document-preview?productId=${encodeURIComponent(id)}` : "",
    hasDocument: Boolean(sourceUrl),
    fileName,
    slug: record.slug || id,
    createdAt: record.createdAt?.toDate?.()?.toISOString?.() || null,
  };
}

function watermarkCanvas(context, width, height) {
  context.save();
  context.globalAlpha = 0.28;
  context.fillStyle = "#15803d";
  context.font = "bold 30px Liberation Sans";
  context.rotate(-Math.PI / 6);

  const diagonal = Math.sqrt(width * width + height * height);
  for (let y = -diagonal; y < diagonal; y += 150) {
    for (let x = -diagonal; x < diagonal; x += 260) {
      context.fillText("webertech.co.ke", x, y);
    }
  }
  context.restore();

  context.save();
  context.globalAlpha = 0.8;
  context.fillStyle = "#166534";
  context.fillRect(0, Math.max(0, height - 34), width, 34);
  context.globalAlpha = 1;
  context.fillStyle = "#ffffff";
  context.font = "bold 15px Liberation Sans";
  context.fillText("webertech.co.ke · WATERMARKED PREVIEW · NOT FOR REDISTRIBUTION", 16, height - 12);
  context.restore();
}

async function renderFirstPage(buffer) {
  const [{ createCanvas, GlobalFonts }, pdfjsLib, pdfjsWorker] = await Promise.all([
    import("@napi-rs/canvas"),
    import("pdfjs-dist/legacy/build/pdf.mjs"),
    import("pdfjs-dist/legacy/build/pdf.worker.mjs"),
  ]);
  // PDF.js 4 uses a fake-worker fallback in Node. Supplying the bundled worker
  // module globally prevents it from resolving a non-existent Vercel filesystem path.
  if (!globalThis.pdfjsWorker) globalThis.pdfjsWorker = pdfjsWorker;
  const standardFontDataPath = require.resolve(
    "pdfjs-dist/standard_fonts/LiberationSans-Regular.ttf"
  );
  const standardFontDataDir = dirname(standardFontDataPath);
  const bundledFonts = [
    ["Liberation Sans", standardFontDataPath],
    ["Arial", standardFontDataPath],
    ["ArialMT", standardFontDataPath],
    [
      "Arial-BoldMT",
      require.resolve("pdfjs-dist/standard_fonts/LiberationSans-Bold.ttf"),
    ],
    [
      "Arial-ItalicMT",
      require.resolve("pdfjs-dist/standard_fonts/LiberationSans-Italic.ttf"),
    ],
  ];
  for (const [family, fontPath] of bundledFonts) {
    if (!GlobalFonts.families.some(({ family: loadedFamily }) => loadedFamily === family)) {
      GlobalFonts.registerFromPath(fontPath, family);
    }
  }
  const pdf = await pdfjsLib.getDocument({
    data: new Uint8Array(buffer),
    disableWorker: true,
    disableFontFace: false,
    useSystemFonts: true,
    standardFontDataUrl: `${standardFontDataDir}/`,
    StandardFontDataFactory: LocalStandardFontDataFactory,
  }).promise;
  const page = await pdf.getPage(1);
  const viewport = page.getViewport({ scale: 1.35 });
  const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
  const context = canvas.getContext("2d");

  await page.render({ canvasContext: context, viewport }).promise;
  watermarkCanvas(context, canvas.width, canvas.height);
  return canvas.toBuffer("image/png");
}

async function handlePreview(req, res) {
  const productId = getQuery(req, "productId");
  if (!productId) return res.status(400).json({ error: "productId is required" });

  try {
    const db = getDb();
    const snapshot = await db.collection("products").doc(productId).get();
    if (!snapshot.exists || snapshot.data()?.published === false) {
      return res.status(404).json({ error: "Published document not found." });
    }

    const source = getDocumentSource(snapshot.data());
    if (!source) return res.status(404).json({ error: "This document has no public PDF link." });

    const { buffer } = await fetchRemotePdf(source);
    const preview = await renderFirstPage(buffer);
    res.setHeader("Content-Type", "image/png");
    res.setHeader("Content-Disposition", "inline; filename=webertech-watermarked-preview.png");
    res.setHeader("X-Content-Type-Options", "nosniff");
    return res.status(200).send(preview);
  } catch (error) {
    console.error("Document preview rendering error", {
      code: error?.code || "UNKNOWN",
      message: error?.message || "",
    });
    const status = error?.code === "INVALID_DOCUMENT_LINK" || error?.code === "DOCUMENT_NOT_PDF" ? 422 : 502;
    return res.status(status).json({ error: error.message || "Unable to prepare the watermarked preview." });
  }
}

async function handleDownload(req, res) {
  const orderId = getQuery(req, "orderId");
  const productId = getQuery(req, "productId");
  if (!orderId || !productId) {
    return res.status(400).json({ error: "orderId and productId are required" });
  }

  try {
    const db = getDb();
    const orderSnapshot = await db.collection("orders").doc(orderId).get();
    if (!orderSnapshot.exists) return res.status(404).json({ error: "Payment order not found." });

    const order = orderSnapshot.data();
    if (String(order.status || "").toLowerCase() !== "paid" || !isDocumentOrderType(order.type) || String(order.productId) !== String(productId)) {
      return res.status(403).json({ error: "Payment must be confirmed before downloading this document." });
    }

    const productSnapshot = await db.collection("products").doc(productId).get();
    if (!productSnapshot.exists) return res.status(404).json({ error: "Document not found." });

    const product = productSnapshot.data();
    const source = getDocumentSource(product);
    if (!source) return res.status(404).json({ error: "This document has no public PDF link." });

    const { buffer } = await fetchRemotePdf(source);
    const fileName = getFileName(product.fileName || product.title, "webertech-document.pdf");

    // Best-effort usage tracking; a counter failure must not block paid delivery.
    try {
      const downloadSnapshot = await db.collection("downloads").where("orderId", "==", orderId).limit(1).get();
      if (!downloadSnapshot.empty) {
        await downloadSnapshot.docs[0].ref.update({
          downloadCount: Number(downloadSnapshot.docs[0].data()?.downloadCount || 0) + 1,
          lastDownloadedAt: new Date(),
        });
      }
    } catch (trackingError) {
      console.warn("Download counter update skipped", trackingError?.message || trackingError);
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.setHeader("Content-Length", String(buffer.length));
    res.setHeader("X-Content-Type-Options", "nosniff");
    return res.status(200).send(buffer);
  } catch (error) {
    console.error("Document delivery error", { code: error?.code || "UNKNOWN" });
    const status = error?.code === "DOCUMENT_NOT_PDF" || error?.code === "INVALID_DOCUMENT_LINK" ? 422 : 502;
    return res.status(status).json({ error: error.message || "Unable to deliver the document." });
  }
}

async function handleCatalog(req, res) {
  try {
    const db = getDb();
    const snapshot = await db.collection("products").get();
    const products = snapshot.docs
      .map(item => normalize(item.data(), item.id))
      .filter(item => item.published)
      .sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));

    return res.status(200).json({ products });
  } catch (error) {
    console.error("Published product catalog error", { code: error?.code || "UNKNOWN" });
    return res.status(500).json({ error: "Unable to load the published product catalog." });
  }
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "private, no-store, max-age=0");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const route = getQuery(req, "route");
  if (route === "preview") return handlePreview(req, res);
  if (route === "download") return handleDownload(req, res);
  return handleCatalog(req, res);
}

export const runtime = "nodejs";
export const config = { api: { bodyParser: false } };
export const __test__ = { normalize };
