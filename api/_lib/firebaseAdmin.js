// ─────────────────────────────────────────────────────────────────
//  WeberTech — api/_lib/firebaseAdmin.js
//  Shared Firebase Admin init for WeberPay Core serverless functions.
//  Uses lazy ESM initialization so validation errors can still return
//  structured JSON even when server configuration is incomplete.
// ─────────────────────────────────────────────────────────────────
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export function getAdminApp() {
  if (getApps().length > 0) return getApps()[0];

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    console.error("[FirebaseAdmin] Missing required environment variables.");
    throw new Error("Firebase Admin environment variables are not set.");
  }

  if (privateKey.includes("\\n")) {
    privateKey = privateKey.replace(/\\n/g, "\n");
  }

  return initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

export function getDb() {
  return getFirestore(getAdminApp());
}
