// api/generate-pdf.js
// PDF Generation Engine for WeberAI
// Generates professional PDFs (Letters, Invoices, Contracts) based on AI instructions

import { jsPDF } from "jspdf";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { type, content, metadata } = req.body || {};

    if (!content) {
      return res.status(400).json({ error: "Content required" });
    }

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;

    // ── Header ──
    doc.setFillColor(22, 163, 74); // WeberTech Green
    doc.rect(0, 0, pageWidth, 40, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("WeberTech Solutions KE", margin, 25);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Digital Platform | webertech.co.ke", margin, 32);

    // ── Document Type ──
    doc.setTextColor(31, 41, 55);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(type?.toUpperCase() || "DOCUMENT", margin, 60);

    // ── Date ──
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - margin - 40, 60);

    // ── Content ──
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    
    const splitContent = doc.splitTextToSize(content, pageWidth - (margin * 2));
    doc.text(splitContent, margin, 80);

    // ── Footer ──
    const footerY = doc.internal.pageSize.getHeight() - 20;
    doc.setFontSize(9);
    doc.setTextColor(156, 163, 175);
    doc.text("© 2026 WeberTech Solutions KE. All rights reserved.", margin, footerY);
    doc.text("Chuka, Kenya | +254 722 508 904", pageWidth - margin - 60, footerY);

    // ── Output ──
    const pdfOutput = doc.output("arraybuffer");
    const base64 = Buffer.from(pdfOutput).toString("base64");

    return res.status(200).json({
      success: true,
      fileName: `webertech-${type || "doc"}-${Date.now()}.pdf`,
      pdfBase64: base64,
    });

  } catch (err) {
    console.error("PDF GEN ERROR:", err);
    return res.status(500).json({ error: "PDF generation failed" });
  }
}
