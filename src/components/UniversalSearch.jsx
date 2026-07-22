// src/components/UniversalSearch.jsx
// Universal Search — Search across all WeberTech modules
// Documents, Services, Courses, Electronics, Bundles, Dev

import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { Link } from "react-router-dom";

export default function UniversalSearch({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState({ documents: [], services: [], courses: [], electronics: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults({ documents: [], services: [], courses: [], electronics: [] });
      return;
    }

    const search = async () => {
      setLoading(true);
      try {
        const searchLower = searchTerm.toLowerCase();

        // Search products (documents, services, etc.)
        const productsSnap = await getDocs(collection(db, "products"));
        const allProducts = productsSnap.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(p => p.title?.toLowerCase().includes(searchLower) || p.description?.toLowerCase().includes(searchLower));

        // Categorize results
        const categorized = {
          documents: allProducts.filter(p => p.category === "legal-document"),
          services: allProducts.filter(p => p.type === "service"),
          courses: allProducts.filter(p => p.type === "course"),
          electronics: allProducts.filter(p => p.type === "electronics"),
        };

        setResults(categorized);
      } catch (err) {
        console.error("Search error:", err);
      }
      setLoading(false);
    };

    const timer = setTimeout(search, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  if (!isOpen) return null;

  const totalResults = Object.values(results).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <>
      <style>{`
        .us-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; animation: fadein .2s ease; }
        @keyframes fadein { from { opacity: 0; } to { opacity: 1; } }
        .us-modal { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #fff; border-radius: 20px; width: 90%; max-width: 600px; max-height: 80vh; overflow-y: auto; z-index: 1001; box-shadow: 0 20px 60px rgba(0,0,0,0.2); }
        .us-header { padding: 20px; border-bottom: 1.5px solid #e5e7eb; display: flex; align-items: center; gap: 12px; }
        .us-input { flex: 1; padding: 12px 16px; border: 1.5px solid #e5e7eb; border-radius: 12px; font-size: 16px; outline: none; font-family: inherit; }
        .us-close { background: none; border: none; font-size: 20px; cursor: pointer; color: #6b7280; }
        .us-content { padding: 20px; }
        .us-section { margin-bottom: 24px; }
        .us-section-title { font-size: 12px; font-weight: 800; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; }
        .us-result { padding: 12px; border-radius: 12px; border: 1.5px solid #e5e7eb; margin-bottom: 8px; text-decoration: none; color: inherit; display: block; transition: all .15s; }
        .us-result:hover { background: #f9fafb; border-color: #16a34a; }
        .us-result-title { font-weight: 700; font-size: 14px; color: #111827; }
        .us-result-cat { font-size: 11px; color: #9ca3af; margin-top: 2px; }
        .us-result-price { font-size: 12px; color: #16a34a; font-weight: 700; margin-top: 4px; }
        .us-empty { text-align: center; padding: 40px 20px; color: #9ca3af; }
      `}</style>

      <div className="us-overlay" onClick={onClose} />

      <div className="us-modal">
        <div className="us-header">
          <input
            type="text"
            className="us-input"
            placeholder="Search documents, services, courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          <button className="us-close" onClick={onClose}>✕</button>
        </div>

        <div className="us-content">
          {loading ? (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ width: 32, height: 32, border: "3px solid #e5e7eb", borderTopColor: "#16a34a", borderRadius: "50%", margin: "0 auto", animation: "spin .8s linear infinite" }} />
              <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            </div>
          ) : searchTerm.trim() === "" ? (
            <div className="us-empty">
              <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
              <p>Start typing to search across WeberTech</p>
            </div>
          ) : totalResults === 0 ? (
            <div className="us-empty">
              <div style={{ fontSize: 40, marginBottom: 12 }}>😕</div>
              <p>No results found for "{searchTerm}"</p>
            </div>
          ) : (
            <>
              {results.documents.length > 0 && (
                <div className="us-section">
                  <div className="us-section-title">📄 Documents</div>
                  {results.documents.map(doc => (
                    <Link key={doc.id} to={`/cyber/legal-documents/${doc.slug}`} className="us-result" onClick={onClose}>
                      <div className="us-result-title">{doc.title}</div>
                      <div className="us-result-cat">Legal Document</div>
                      <div className="us-result-price">KES {doc.price?.toLocaleString()}</div>
                    </Link>
                  ))}
                </div>
              )}

              {results.services.length > 0 && (
                <div className="us-section">
                  <div className="us-section-title">⚙️ Services</div>
                  {results.services.map(svc => (
                    <div key={svc.id} className="us-result">
                      <div className="us-result-title">{svc.title}</div>
                      <div className="us-result-cat">{svc.category}</div>
                      <div className="us-result-price">From KES {svc.price?.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              )}

              {results.courses.length > 0 && (
                <div className="us-section">
                  <div className="us-section-title">🎓 Courses</div>
                  {results.courses.map(course => (
                    <div key={course.id} className="us-result">
                      <div className="us-result-title">{course.title}</div>
                      <div className="us-result-cat">Academy Course</div>
                      <div className="us-result-price">KES {course.price?.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              )}

              {results.electronics.length > 0 && (
                <div className="us-section">
                  <div className="us-section-title">🛒 Electronics</div>
                  {results.electronics.map(item => (
                    <div key={item.id} className="us-result">
                      <div className="us-result-title">{item.title}</div>
                      <div className="us-result-cat">Electronics</div>
                      <div className="us-result-price">KES {item.price?.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
