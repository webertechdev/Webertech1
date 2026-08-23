import { createCanvas } from "@napi-rs/canvas";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { getDb } from "./_lib/firebaseAdmin.js";
import { fetchRemotePdf, getDocumentSource } from "./_lib/documentLinks.js";

function getQuery(req, key) {
  const value = req.query?.[key];
  return Array.isArray(value) ? value[0] : String(value || "").trim();
}

function watermarkCanvas(context, width, height) {
  context.save();
  context.globalAlpha = 0.2;
  context.fillStyle = "#15803d";
  context.font = "bold 30px Arial";
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
  context.font = "bold 15px Arial";
  context.fillText("webertech.co.ke · WATERMARKED PREVIEW · NOT FOR REDISTRIBUTION", 16, height - 12);
  context.restore();
}

async function renderFirstPage(buffer) {
  const pdf = await pdfjsLib.getDocument({
    data: new Uint8Array(buffer),
    disableWorker: true,
    useSystemFonts: true,
  }).promise;
  const page = await pdf.getPage(1);
  const viewport = page.getViewport({ scale: 1.35 });
  const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
  const context = canvas.getContext("2d");

  await page.render({ canvasContext: context, viewport }).promise;
  watermarkCanvas(context, canvas.width, canvas.height);
  return canvas.toBuffer("image/png");
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "private, no-store, max-age=0");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

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
    console.error("Document preview rendering error", { code: error?.code || "UNKNOWN", message: error?.message || "" });
    const status = error?.code === "INVALID_DOCUMENT_LINK" || error?.code === "DOCUMENT_NOT_PDF" ? 422 : 502;
    return res.status(status).json({ error: error.message || "Unable to prepare the watermarked preview." });
  }
}

export const runtime = "nodejs";
export const config = { api: { bodyParser: false } };
