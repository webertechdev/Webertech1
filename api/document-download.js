import { getDb } from "./_lib/firebaseAdmin.js";
import { fetchRemotePdf, getDocumentSource, getFileName } from "./_lib/documentLinks.js";

function getQuery(req, key) {
  const value = req.query?.[key];
  return Array.isArray(value) ? value[0] : String(value || "").trim();
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "private, no-store, max-age=0");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

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
    if (order.status !== "paid" || order.type !== "document" || String(order.productId) !== String(productId)) {
      return res.status(403).json({ error: "Payment must be confirmed before downloading this document." });
    }

    const productSnapshot = await db.collection("products").doc(productId).get();
    if (!productSnapshot.exists) return res.status(404).json({ error: "Document not found." });

    const product = productSnapshot.data();
    const source = getDocumentSource(product);
    if (!source) return res.status(404).json({ error: "This document has no public PDF link." });

    const { buffer } = await fetchRemotePdf(source);
    const fileName = getFileName(product.fileName || product.title, "webertech-document.pdf");

    // Best-effort usage tracking. A failed counter update must not block a
    // successful paid delivery.
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

export const runtime = "nodejs";
export const config = { api: { bodyParser: false } };
