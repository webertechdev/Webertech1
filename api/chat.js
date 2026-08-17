// api/chat.js
// Gemini AI replacement (Google Generative AI)

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

    // System prompt for WeberAI
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
2. CYBER DIVISION: KRA PIN, NTSA, HELB, eCitizen, Passport assistance, Business registration, Printing, and Legal Documents (Car Sale, Rental Agreements, etc.).
3. ACADEMY: Professional courses in Web Dev, Trading, Design, and Digital Marketing.
4. ELECTRONICS: Genuine smartphones, TVs, and appliances with delivery across Kenya.
5. DEV: Custom websites, e-commerce, mobile apps, and branding.
6. HUSTLE KE: Affiliate programs and reseller opportunities.

TONE & BEHAVIOR:
- BE CONVERSATIONAL: Don't just dump links. Acknowledge the user's need first.
- SMART ROUTING: If they ask about "business registration", talk about the Cyber Division business services and provide the link /cyber/business.
- DIRECT LINKS: Use Markdown links like [Business Registration](/cyber/business).
- NEXT STEPS: Always give a clear "Next Step" (e.g., "Click the link, select your service, and we'll handle the rest").
- MULTILINGUAL: Support both English and Swahili naturally.
- SCOPE: Focus on WeberTech. If asked unrelated things, politely steer back to WeberTech services or provide the WhatsApp link for custom support.

EXPLICIT PDF REQUEST ONLY:
If the user explicitly asks for a PDF after you've explained the service, you can use: [GENERATE_PDF: TYPE | CONTENT].
Otherwise, prefer direct service links.
`;

    // Build conversation
    const prompt = [
      systemPrompt,
      ...messages.slice(-10).map(m => `${m.role}: ${m.text}`)
    ].join("\n");

   // GEMINI API CALL (Using gemini-2.5-flash-preview)
const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]
    })
  }
);


    const data = await response.json();

    console.log("Gemini response:", JSON.stringify(data, null, 2));
    if (!response.ok) {
      console.error("Gemini error:", data);
      return res.status(500).json({ error: "AI service error" });
    }

    const answer =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, no response generated.";

    return res.status(200).json({ answer });

  } catch (err) {
    console.error("API ERROR:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
