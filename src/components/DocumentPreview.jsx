// src/components/DocumentPreview.jsx
// Watermarked previews for uploaded PDFs/images, with a branded fallback cover
// for documents whose original file is not yet available or is an editable Word file.

import { useState, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const asText = (value) => String(value || "").trim();

export default function DocumentPreview({
  fileUrl = "",
  fileName = "",
  title = "WeberTech Document",
  description = "Ready-to-use WeberTech document.",
  features = [],
  watermark = true,
}) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let objectUrl = null;

    const finishWithFallback = () => {
      if (cancelled) return;
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = 900;
      canvas.height = 1200;

      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#0f172a";
      context.fillRect(0, 0, canvas.width, 150);
      context.fillStyle = "#22c55e";
      context.fillRect(0, 150, canvas.width, 8);

      context.fillStyle = "#ffffff";
      context.font = "800 28px Arial";
      context.fillText("WEBERTECH", 58, 62);
      context.font = "500 16px Arial";
      context.fillStyle = "#bbf7d0";
      context.fillText("SECURE DOCUMENT PREVIEW", 58, 101);

      context.fillStyle = "#111827";
      context.font = "800 42px Arial";
      drawWrappedText(context, asText(title) || "Document Preview", 58, 255, 780, 54, 3);

      context.fillStyle = "#4b5563";
      context.font = "400 22px Arial";
      drawWrappedText(context, asText(description) || "Preview available before purchase.", 58, 410, 780, 34, 6);

      context.fillStyle = "#16a34a";
      context.font = "800 20px Arial";
      context.fillText("Included in this document", 58, 650);
      context.fillStyle = "#374151";
      context.font = "400 21px Arial";
      const items = Array.isArray(features) ? features.filter(Boolean).slice(0, 6) : [];
      (items.length ? items : ["Professional WeberTech template", "Original file supplied after payment"]).forEach((item, index) => {
        context.fillText(`✓  ${asText(item)}`, 72, 705 + index * 42);
      });

      context.fillStyle = "#6b7280";
      context.font = "400 17px Arial";
      context.fillText("This is a protected preview. The original uploaded file", 58, 1035);
      context.fillText("is available after payment confirmation.", 58, 1065);
      context.fillStyle = "#16a34a";
      context.font = "700 18px Arial";
      context.fillText("webertech.co.ke", 58, 1135);

      if (watermark) addWatermark(context, canvas.width, canvas.height);
      setPreviewUrl(canvas.toDataURL("image/png"));
    };

    const generatePreview = async () => {
      setLoading(true);
      setPreviewUrl(null);
      const rawUrl = asText(fileUrl);
      const isProtectedPreview = /\/api\/document-preview(?:[/?]|$)/i.test(rawUrl);
      const source = asText(fileName) || rawUrl || "document";
      const ext = isProtectedPreview
        ? "png"
        : source.toLowerCase().split(".").pop()?.split("?")[0];

      // Customer pages receive a server-rendered, watermarked preview endpoint.
      // Do not infer its type from fileName: hosted records may use labels such
      // as "Hosted PDF document" rather than a filename ending in .pdf.
      if (!rawUrl || (!isProtectedPreview && ["doc", "docx", "xls", "xlsx", "ppt", "pptx"].includes(ext))) {
        finishWithFallback();
        setLoading(false);
        return;
      }

      try {
        if (isProtectedPreview || ext === "pdf") {
          let data;
          const response = await fetch(fileUrl, { credentials: "omit" });
          if (!response.ok) throw new Error(`Preview request failed (${response.status})`);
          const contentType = String(response.headers.get("content-type") || "").toLowerCase();
          data = new Uint8Array(await response.arrayBuffer());

          if (contentType.startsWith("image/")) {
            objectUrl = URL.createObjectURL(new Blob([data], { type: contentType }));
            if (!cancelled) setPreviewUrl(objectUrl);
            return;
          }

          const pdf = await pdfjsLib.getDocument({ data }).promise;
          const page = await pdf.getPage(1);
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          await page.render({ canvasContext: context, viewport }).promise;
          if (watermark) addWatermark(context, canvas.width, canvas.height);
          if (!cancelled) setPreviewUrl(canvas.toDataURL("image/png"));
        } else if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
          const url = fileUrl;

          await new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement("canvas");
              const context = canvas.getContext("2d");
              canvas.width = img.width;
              canvas.height = img.height;
              context.drawImage(img, 0, 0);
              if (watermark) addWatermark(context, canvas.width, canvas.height);
              if (!cancelled) setPreviewUrl(canvas.toDataURL("image/png"));
              resolve();
            };
            img.onerror = reject;
            img.src = url;
          });
        } else {
          finishWithFallback();
        }
      } catch (err) {
        console.warn("Document preview unavailable; showing protected cover:", err);
        finishWithFallback();
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    generatePreview();
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [fileUrl, fileName, title, description, features, watermark]);

  if (loading) {
    return (
      <div style={frameStyle}>
        <div style={{ textAlign: "center" }}>
          <div style={spinnerStyle} />
          <p style={{ color: "#9ca3af", fontSize: 14 }}>Generating secure preview…</p>
        </div>
      </div>
    );
  }

  return (
    <div style={frameStyle}>
      {previewUrl ? (
          <img
            src={previewUrl}
            alt={`${title} watermarked preview`}
            draggable="false"
            onContextMenu={event => event.preventDefault()}
            style={{ width: "100%", height: "auto", display: "block", userSelect: "none", WebkitUserDrag: "none" }}
          />
      ) : (
        <div style={{ padding: 36, textAlign: "center", color: "#6b7280" }}>Preview unavailable</div>
      )}
    </div>
  );
}

function drawWrappedText(context, text, x, y, maxWidth, lineHeight, maxLines) {
  const words = asText(text).split(/\s+/).filter(Boolean);
  let line = "";
  let lineCount = 0;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (context.measureText(test).width > maxWidth && line) {
      context.fillText(line, x, y + lineCount * lineHeight);
      line = word;
      lineCount += 1;
      if (lineCount >= maxLines) break;
    } else {
      line = test;
    }
  }
  if (lineCount < maxLines && line) context.fillText(line, x, y + lineCount * lineHeight);
}

function addWatermark(context, width, height) {
  context.save();
  context.font = `bold ${Math.max(40, width / 8)}px Arial`;
  context.fillStyle = "rgba(0, 0, 0, 0.24)";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.globalAlpha = 0.32;
  context.translate(width / 2, height / 2);
  context.rotate(-Math.PI / 4);
  context.fillText("webertech.co.ke", 0, 0);
  context.restore();
}

const frameStyle = {
  borderRadius: 12,
  border: "1.5px solid #e5e7eb",
  overflow: "hidden",
  background: "#fff",
};

const spinnerStyle = {
  width: 40,
  height: 40,
  border: "3px solid #e5e7eb",
  borderTopColor: "#16a34a",
  borderRadius: "50%",
  margin: "0 auto 12px",
  animation: "wt-preview-spin .8s linear infinite",
};

if (typeof document !== "undefined" && !document.getElementById("wt-preview-spin-style")) {
  const style = document.createElement("style");
  style.id = "wt-preview-spin-style";
  style.textContent = "@keyframes wt-preview-spin{to{transform:rotate(360deg)}}";
  document.head.appendChild(style);
}
// End of DocumentPreview.jsx
