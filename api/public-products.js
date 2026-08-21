import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function getAdminApp() {
  if (getApps().length > 0) return getApps()[0];

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    const error = new Error("Server catalog access is not configured.");
    error.code = "SERVER_CATALOG_NOT_CONFIGURED";
    throw error;
  }

  return initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
}

function normalize(record, id) {
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
      : String(record.features || "").split(",").map(value => value.trim()).filter(Boolean),
    fileUrl: record.fileUrl || record.downloadURL || record.downloadFile || record.documentUrl || record.url || "",
    fileName: record.fileName || "",
    slug: record.slug || id,
    createdAt: record.createdAt?.toDate?.()?.toISOString?.() || null,
  };
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  try {
    const db = getFirestore(getAdminApp());
    const snapshot = await db.collection("products").get();
    const products = snapshot.docs
      .map(item => normalize(item.data(), item.id))
      .filter(item => item.published)
      .sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));

    return res.status(200).json({ products });
  } catch (error) {
    console.error("Published product catalog error", { code: error?.code || "UNKNOWN" });
    if (error?.code === "SERVER_CATALOG_NOT_CONFIGURED") {
      return res.status(503).json({ error: "Published product catalog is not configured." });
    }
    return res.status(500).json({ error: "Unable to load the published product catalog." });
  }
}

export const runtime = "nodejs";
export const config = { api: { bodyParser: false } };
export const __test__ = { normalize };

