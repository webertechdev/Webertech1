// src/config/firebase.js
// ⚠️ IMPORTANT: Vercel env vars MUST use VITE_ prefix for Vite to read them
// WRONG: REACT_APP_PROJECT_ID  → Vite cannot read this
// RIGHT: VITE_FIREBASE_PROJECT_ID → Vite reads this correctly

import { initializeApp, getApps } from "firebase/app";
import { getAuth }                 from "firebase/auth";
import { getFirestore }            from "firebase/firestore";
import { getStorage }              from "firebase/storage";

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

// Prevent duplicate app init on hot reload
const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApps()[0];

export const auth    = getAuth(app);
export const db      = getFirestore(app);
export const storage = getStorage(app);
export default app;
