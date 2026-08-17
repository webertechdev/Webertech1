import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function getAdminApp() {
  if (getApps().length > 0) return getApps()[0];

  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    const error = new Error("Server Firebase authorization is not configured.");
    error.code = "SERVER_AUTH_NOT_CONFIGURED";
    throw error;
  }

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
}

function jsonError(res, status, message) {
  return res.status(status).json({ error: message });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidEmail(value) {
  return typeof value === "string" && value.length <= 320 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return jsonError(res, 405, "Method not allowed");

  try {
    const authorization = req.headers.authorization || "";
    const token = authorization.startsWith("Bearer ") ? authorization.slice(7).trim() : "";
    if (!token) return jsonError(res, 401, "Authentication is required.");

    const adminApp = getAdminApp();
    const decodedToken = await getAuth(adminApp).verifyIdToken(token);
    const userRecord = await getFirestore(adminApp).collection("users").doc(decodedToken.uid).get();
    const userData = userRecord.exists ? userRecord.data() : {};
    const isAdmin = decodedToken.admin === true || decodedToken.role === "admin" || userData?.role === "admin";

    if (!isAdmin || userData?.status === "disabled") {
      return jsonError(res, 403, "Administrator permission is required.");
    }

    const { recipient, subject, message } = req.body || {};
    if (!isValidEmail(recipient)) return jsonError(res, 400, "A valid recipient email is required.");
    if (typeof subject !== "string" || subject.trim().length < 1 || subject.length > 200) {
      return jsonError(res, 400, "A subject between 1 and 200 characters is required.");
    }
    if (typeof message !== "string" || message.trim().length < 1 || message.length > 20000) {
      return jsonError(res, 400, "A message between 1 and 20,000 characters is required.");
    }

    const apiKey = process.env.RESEND_API_KEY?.trim();
    // This is the verified WeberTech sender. Do not use onboarding@resend.dev.
    const from = "support@webertech.co.ke";
    if (!apiKey) {
      return jsonError(res, 503, "Email sending is not configured. Add RESEND_API_KEY in Vercel.");
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: recipient.trim(),
        subject: subject.trim(),
        text: message.trim(),
        html: `<div style="font-family:Arial,sans-serif;line-height:1.6;white-space:pre-wrap">${escapeHtml(message.trim())}</div>`,
      }),
    });

    const providerText = await resendResponse.text();
    let providerData = {};
    try {
      providerData = providerText ? JSON.parse(providerText) : {};
    } catch {
      providerData = { message: providerText };
    }
    if (!resendResponse.ok) {
      console.error("Resend request failed", {
        status: resendResponse.status,
        name: providerData?.name || "",
        message: providerData?.message || providerData?.error?.message || "",
      });

      const providerError = String(providerData?.message || providerData?.error?.message || "").trim();
      let userFriendlyError = "The email provider could not accept this message.";

      if (resendResponse.status === 401) userFriendlyError = "Invalid Resend API Key. Check Vercel environment variables.";
      if (resendResponse.status === 403) userFriendlyError = "Resend permission denied. Verify the sender domain and sender address in Resend.";
      if (resendResponse.status === 422) {
        if (/domain|sender|from/i.test(providerError)) {
          userFriendlyError = "Resend rejected support@webertech.co.ke. Confirm that webertech.co.ke is verified in Resend and that sending is enabled for this domain.";
        } else {
          userFriendlyError = `Resend validation error: ${providerError || "check the recipient and message fields"}`;
        }
      }
      if (resendResponse.status === 429) userFriendlyError = "The email provider limit has been reached.";

      const detail = providerError ? ` Provider detail: ${providerError}` : "";
      return jsonError(res, resendResponse.status, `${userFriendlyError}${detail} The request was not marked as contacted.`);
    }

    return res.status(200).json({ success: true, id: providerData?.id || null });
  } catch (error) {
    console.error("Direct email error", { code: error?.code || "UNKNOWN" });
    if (error?.code === "auth/id-token-expired" || error?.code === "auth/argument-error") {
      return jsonError(res, 401, "Your administrator session has expired. Sign in again.");
    }
    if (error?.code === "SERVER_AUTH_NOT_CONFIGURED") {
      return jsonError(res, 503, "Server administrator authorization is not configured.");
    }
    return jsonError(res, 500, "The email could not be sent. Please try again.");
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};

export const runtime = "nodejs";

export const __test__ = {
  isValidEmail,
  escapeHtml,
};

