// src/components/DocumentPreview.jsx
// Document preview with watermark overlay
// Displays PDF/image preview with WeberTech watermark

import { useState, useEffect } from "react";
import { storage } from "../config/firebase";
import { ref, getBytes } from "firebase/storage";
import * as pdfjsLib from "pdfjs-dist";

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function DocumentPreview({ fileUrl, fileName, watermark = true }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const generatePreview = async () => {
      try {
        setLoading(true);
        
        // Check file type
        const ext = fileName?.toLowerCase().split(".").pop();
        
        if (ext === "pdf") {
          // PDF preview
          const bytes = await getBytes(ref(storage, fileUrl));
          const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
          const page = await pdf.getPage(1);
          const scale = 1.5;
          const viewport = page.getViewport({ scale });
          
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          
          await page.render({ canvasContext: context, viewport }).promise;
          
          // Add watermark
          if (watermark) {
            addWatermark(context, canvas.width, canvas.height);
          }
          
          setPreviewUrl(canvas.toDataURL());
        } else if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
          // Image preview
          const bytes = await getBytes(ref(storage, fileUrl));
          const blob = new Blob([bytes]);
          const url = URL.createObjectURL(blob);
          
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
            
            // Add watermark
            if (watermark) {
              addWatermark(context, canvas.width, canvas.height);
            }
            
            setPreviewUrl(canvas.toDataURL());
            URL.revokeObjectURL(url);
          };
          img.src = url;
        } else {
          setError("Unsupported file type");
        }
      } catch (err) {
        setError(err.message || "Failed to generate preview");
      } finally {
        setLoading(false);
      }
    };

    if (fileUrl && fileName) {
      generatePreview();
    }
  }, [fileUrl, fileName, watermark]);

  const addWatermark = (context, width, height) => {
    // Semi-transparent overlay
    context.fillStyle = "rgba(255, 255, 255, 0.08)";
    context.fillRect(0, 0, width, height);

    // Watermark text
    context.save();
    context.font = `bold ${Math.max(40, width / 8)}px Arial`;
    context.fillStyle = "rgba(0, 0, 0, 0.15)";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.globalAlpha = 0.15;
    
    // Rotate text
    context.translate(width / 2, height / 2);
    context.rotate(-Math.PI / 4);
    context.fillText("webertech.co.ke", 0, 0);
    
    context.restore();
  };

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 400, background: "#f9fafb", borderRadius: 12, border: "1.5px solid #e5e7eb" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 40, height: 40, border: "3px solid #e5e7eb", borderTopColor: "#16a34a", borderRadius: "50%", margin: "0 auto 12px", animation: "spin .8s linear infinite" }} />
          <p style={{ color: "#9ca3af", fontSize: 14 }}>Generating preview...</p>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 400, background: "#fee2e2", borderRadius: 12, border: "1.5px solid #fecaca" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>⚠️</div>
          <p style={{ color: "#dc2626", fontSize: 14, fontWeight: 700 }}>Preview Error</p>
          <p style={{ color: "#991b1b", fontSize: 13 }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ borderRadius: 12, border: "1.5px solid #e5e7eb", overflow: "hidden", background: "#fff" }}>
      {previewUrl ? (
        <img src={previewUrl} alt="Document preview" style={{ width: "100%", height: "auto", display: "block" }} />
      ) : (
        <div style={{ height: 400, display: "flex", alignItems: "center", justifyContent: "center", background: "#f9fafb" }}>
          <p style={{ color: "#9ca3af" }}>No preview available</p>
        </div>
      )}
    </div>
  );
}
