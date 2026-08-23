// api/chat.js
// WeberAI chat endpoint with live admin-managed training context.

import { getDb } from "./_lib/firebaseAdmin.js";

function cleanText(value, max = 12000) {
  return String(value || "").trim().slice(0, max);
}

async function loadTrainingConfig() {
  try {
    const snapshot = await getDb().collection("config").doc("weberai").get();
    return snapshot.exists ? snapshot.data() || {} : {};
  } catch (error) {
    console.warn("[WeberAI] Training config unavailable; using defaults:", error.message);
    return {};
  }
}

function correctionContext(corrections) {
  if (!Array.isArray(corrections)) return "";
  return corrections
    .filter(item => item && item.question && item.correctedAnswer)
    .slice(-40)
    .map((item, index) => [
      `Correction ${index + 1}:`,
      `Customer question: ${cleanText(item.question, 1200)}`,
      `Previous answer to avoid: ${cleanText(item.previousAnswer, 1800) || "Not recorded"}`,
      `Preferred answer: ${cleanText(item.correctedAnswer, 2200)}`,
    ].join("\n"))
    .join("\n\n");
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { messages, lang } = req.body || {};

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "messages required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Missing Gemini API key" });
    }

    const training = await loadTrainingConfig();
    const personality = cleanText(training.personality) || "Professional and helpful";
    const language = cleanText(training.language) || "English & Swahili";
    const tone = cleanText(training.tone) || "Friendly but formal";
    const responseStyle = cleanText(training.responseStyle) || "Concise and clear";
    const knowledgeBase = cleanText(training.knowledgeBase, 18000);
    const behaviorRules = cleanText(training.behaviorRules, 10000) || "Always provide direct service links. Never generate PDFs unless explicitly requested.";
    const corrections = correctionContext(training.learnedCorrections);

    const systemPrompt = `
You are WeberAI, the intelligent assistant for WeberTech Solutions KE (webertech.co.ke).
You are friendly, conversational, and act as a professional guide to all WeberTech digital services.

LIVE SERVICE ROUTES:
- Home: /
- Safaricom Bundles: https://bundles.webertech.co.ke
- Cyber Division: /cyber
- Legal Documents: /cyber/legal-documents
- Government Services: /cyber/government
- Business Services: /cyber/business
- Printing: /cyber/printing
- Writing and CVs: /cyber/writing
- Academy: /academy
- Electronics: /electronics
- Dev Services: /dev
- Hustle KE: /hustle
- WhatsApp support: https://wa.me/254722508904

SERVICE KNOWLEDGE:
1. SAFARICOM BUNDLES: Instant Safaricom data, airtime, and minutes via M-PESA.
2. CYBER DIVISION: KRA PIN, NTSA, HELB, eCitizen, Passport assistance, Business registration, Printing, and Legal Documents (Car Sale, Rental Agreements, and similar documents).
3. ACADEMY: Professional courses in Web Development, Trading, Design, and Digital Marketing.
4. ELECTRONICS: Genuine smartphones, TVs, and appliances with delivery across Kenya.
5. DEV: Custom websites, e-commerce, mobile apps, and branding.
6. HUSTLE KE: Affiliate programs and reseller opportunities.

ADMIN-MANAGED AI PROFILE:
Personality: ${personality}
Language: ${language}
Tone: ${tone}
Response style: ${responseStyle}
Behavior rules: ${behaviorRules}
${knowledgeBase ? `\nADMIN KNOWLEDGE BASE:\n${knowledgeBase}` : ""}
${corrections ? `\nVERIFIED ADMIN CORRECTIONS — FOLLOW THESE WHEN RELEVANT:\n${corrections}` : ""}

CORE RESPONSE RULES:
- Acknowledge the customer's need before giving instructions or links.
- Use Markdown links such as [Business Registration](/cyber/business).
- Give a clear next step.
- Support English and Swahili naturally.
- Focus on WeberTech. For unrelated requests, politely steer back to WeberTech or provide WhatsApp support.
- Treat the verified admin corrections above as the preferred answer for matching questions. Do not repeat an answer that the correction explicitly replaces.

EXPLICIT PDF REQUEST ONLY:
If the customer explicitly asks for a PDF after you have explained the service, you may use [GENERATE_PDF: TYPE | CONTENT]. Otherwise provide the direct service link and instructions; do not generate a PDF automatically.
`;

    const prompt = [
      systemPrompt,
      `Preferred conversation language: ${cleanText(lang, 40) || language}`,
      ...messages.slice(-12).map(message => {
        const role = message?.role === "ai" || message?.role === "assistant" ? "assistant" : "customer";
        return `${role}: ${cleanText(message?.text || message?.content, 5000)}`;
      }),
    ].join("\n");

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      console.error("Gemini error:", data);
      return res.status(500).json({ error: "AI service error" });
    }

    const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, no response generated.";
    return res.status(200).json({ answer });
  } catch (error) {
    console.error("WeberAI API error:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
