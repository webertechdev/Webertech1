// Shared direct-document link helpers.
// The admin stores only a public HTTPS PDF link. Customer-facing endpoints
// fetch that link server-side so the source URL is not exposed in the catalog.

export function normalizeDocumentUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";

  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "https:") return "";

    if (parsed.hostname === "drive.google.com") {
      const fileId = parsed.pathname.match(/\/file\/d\/([^/]+)/)?.[1] || parsed.searchParams.get("id");
      if (fileId) {
        return `https://drive.google.com/uc?export=download&id=${encodeURIComponent(fileId)}`;
      }
    }

    if (parsed.hostname === "www.dropbox.com" || parsed.hostname === "dropbox.com") {
      parsed.searchParams.set("dl", "1");
    }

    return parsed.toString();
  } catch {
    return "";
  }
}

export function isLikelyPdfUrl(value) {
  const normalized = normalizeDocumentUrl(value);
  if (!normalized) return false;

  const parsed = new URL(normalized);
  const pathname = parsed.pathname.toLowerCase();
  const hostname = parsed.hostname.toLowerCase();

  // Drive share links do not contain .pdf after normalization, so the known
  // provider is accepted and the fetched response is verified as a PDF below.
  return pathname.endsWith(".pdf") || hostname === "drive.google.com" || hostname.endsWith("dropbox.com");
}

export function getDocumentSource(record = {}) {
  return normalizeDocumentUrl(
    record.fileUrl || record.downloadURL || record.downloadFile || record.documentUrl || record.url || ""
  );
}

export function getFileName(value, fallback = "webertech-document.pdf") {
  const raw = String(value || "").trim();
  if (raw) {
    const candidate = raw.split("/").pop()?.split("?")[0]?.split("#")[0] || "";
    try {
      const decoded = decodeURIComponent(candidate).replace(/[<>:"/\\|?*\x00-\x1F]/g, "-").trim();
      if (decoded) {
        if (/\.pdf$/i.test(decoded)) return decoded;
        if (!raw.includes("://") && !raw.includes("/") && !raw.includes("?") && !raw.includes("#")) {
          return `${decoded}.pdf`;
        }
      }
    } catch {
      // Fall through to the safe fallback.
    }
  }
  return fallback;
}

export async function fetchRemotePdf(value) {
  const url = normalizeDocumentUrl(value);
  if (!isLikelyPdfUrl(url)) {
    const error = new Error("The document link must be a public HTTPS PDF link.");
    error.code = "INVALID_DOCUMENT_LINK";
    throw error;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 25000);

  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        Accept: "application/pdf,application/octet-stream;q=0.9,*/*;q=0.1",
        "User-Agent": "WeberTech-document-delivery/1.0",
      },
    });

    if (!response.ok) {
      const error = new Error(`The document host returned HTTP ${response.status}.`);
      error.code = "DOCUMENT_SOURCE_UNAVAILABLE";
      throw error;
    }

    const contentType = String(response.headers.get("content-type") || "").toLowerCase();
    const buffer = Buffer.from(await response.arrayBuffer());
    const isPdf = buffer.subarray(0, 4).toString() === "%PDF" || contentType.includes("application/pdf");
    if (!isPdf) {
      const error = new Error("The link did not return a PDF file. Check that the file is public and downloadable.");
      error.code = "DOCUMENT_NOT_PDF";
      throw error;
    }

    return { buffer, contentType: "application/pdf" };
  } finally {
    clearTimeout(timer);
  }
}
