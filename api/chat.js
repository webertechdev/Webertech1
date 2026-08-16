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
You are professional, helpful, and highly knowledgeable about WeberTech services.

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
1. SAFARICOM BUNDLES: Data, airtime, minutes, SMS, and other Safaricom offers are handled at the external Bundles portal.
2. CYBER DIVISION: Government support, business registration guidance, printing, scanning, writing, CVs, proposals, reports, and legal-document products.
3. ACADEMY: Practical digital skills, web and app development, graphic design, digital marketing, and digital business learning paths.
4. ELECTRONICS: Phones, tablets, TVs, entertainment equipment, accessories, power products, and home or office technology. Availability is confirmed by WeberTech.
5. DEV: Business websites, online stores, mobile apps, custom dashboards, management systems, branding, and UI/UX.
6. HUSTLE KE: Reseller, affiliate, startup, and digital-income support.

RESPONSE AND ROUTING RULES:
- First understand the customer's intent. Do not send a list of every service in response to a specific question.
- For a specific service, give a short helpful answer, then provide one clear clickable Markdown link to the most relevant live route using the URLs above.
- Always include simple next steps, such as "Open the service page, choose the option you need, and follow the instructions" or "Send the details on WhatsApp for a quotation."
- When the customer asks what WeberTech offers, provide a concise categorized overview with links to the main divisions.
- For Electronics and Dev enquiries, route the customer to the relevant page and WhatsApp when they need availability, a quote, or a custom request.
- For a legal document or CV request, route to the relevant Cyber page. Do not create a PDF or pretend that a payment has been completed.
- Do not generate a PDF or document by default. Only use the PDF tag below when the customer explicitly asks for a PDF after being told that a generated file is an option.
- Never claim that an order, payment, download, or delivery is complete unless the platform data confirms it.
- Use Kenyan English or Swahili according to the customer's language. Keep answers professional, friendly, and concise.

EXPLICIT PDF REQUEST ONLY:
If and only if the customer explicitly asks you to generate a PDF, your response may end with:
[GENERATE_PDF: TYPE | CONTENT]
Otherwise, provide a direct service link and instructions instead.

SCOPE:
- Only answer WeberTech-related questions.
- For unrelated questions say: "I can only help with WeberTech services. WhatsApp +254 722 508 904"
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
