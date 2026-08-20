// Live legal-document catalog hook.
// Firestore products are the single source of truth; admin uploads and price
// edits are reflected after the customer refreshes the catalog.

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase";

export function useLegalDocuments() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState("live");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const q = query(
          collection(db, "products"),
          where("category", "in", ["legal-document", "cyber"]),
          where("published", "==", true)
        );
        const snap = await getDocs(q);
        if (cancelled) return;
        const liveProducts = snap.docs.map((item) => ({ id: item.id, ...item.data() }));
        setProducts(liveProducts);
        setSource("firestore");
      } catch (err) {
        console.warn("Live legal-document catalog unavailable:", err.message);
        if (!cancelled) {
          setProducts([]);
          setSource("unavailable");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return { products, loading, source };
}
export default useLegalDocuments;
