// src/pages/cyber/data/useProducts.js
// Firestore-first product loading with a local seed fallback, so
// /cyber/legal-documents works in production from day one without
// requiring an admin product-management UI to exist yet.
//
// Once real products are added to Firestore's `products` collection
// (category="legal-document", status="active"), they are used
// instead — seed items only fill gaps / act as the starting catalog.

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { LEGAL_DOCUMENTS_SEED } from "./legalDocumentsSeed";

export function useLegalDocuments() {
  const [products, setProducts] = useState(LEGAL_DOCUMENTS_SEED);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState("seed");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const q = query(
          collection(db, "products"),
          where("category", "==", "legal-document"),
          where("status", "==", "active")
        );
        const snap = await getDocs(q);
        if (cancelled) return;

        if (!snap.empty) {
          const firestoreProducts = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
          // Merge: Firestore products win by slug; seed fills any gaps
          const bySlug = new Map(LEGAL_DOCUMENTS_SEED.map((p) => [p.slug, p]));
          firestoreProducts.forEach((p) => bySlug.set(p.slug, p));
          setProducts([...bySlug.values()]);
          setSource("firestore+seed");
        }
      } catch (err) {
        console.warn("Falling back to seed legal documents — Firestore fetch failed:", err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return { products, loading, source };
}
