// ─────────────────────────────────────────────────────────────────
//  WeberTech — api/_lib/firebaseAdmin.js
//  Shared Firebase Admin init for WeberPay Core serverless functions.
// ─────────────────────────────────────────────────────────────────
const admin = require("firebase-admin");

function initAdmin() {
  if (admin.apps.length > 0) return admin.app();

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    console.error("[FirebaseAdmin] Missing required environment variables.");
    // In Vercel, this might happen if env vars aren't synced to the environment
    throw new Error("Firebase Admin environment variables are not set.");
  }

  // Handle both literal newlines and escaped newlines from Vercel/CI
  if (privateKey.includes("\\n")) {
    privateKey = privateKey.replace(/\\n/g, "\n");
  }

  return admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

const app = initAdmin();
const db = admin.firestore();

module.exports = { admin, db, app };
