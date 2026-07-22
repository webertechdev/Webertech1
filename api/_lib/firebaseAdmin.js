// ─────────────────────────────────────────────────────────────────
//  WeberTech — api/_lib/firebaseAdmin.js
//  Shared Firebase Admin init for WeberPay Core serverless functions.
//  Does NOT touch or replace the admin.initializeApp() calls already
//  living inside api/stkpush.js / api/callback.js — those stay as-is
//  and keep powering the existing Bundles M-PESA flow untouched.
// ─────────────────────────────────────────────────────────────────
const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId:   process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey:  process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const db = admin.firestore();

module.exports = { admin, db };
