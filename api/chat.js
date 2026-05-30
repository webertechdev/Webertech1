// api/chat.js
// Gemini AI replacement (Google Generative AI)

export default async function handler(req, res) {
  console.log("GEMINI KEY:", process.env.GEMINI_API_KEY);
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

    // System prompt (same logic you already had)
    const systemPrompt = `
You are WeberTech Support AI for webertech.co.ke.
Only answer WeberTech-related questions.
If unrelated say: "I can only help with WeberTech services. WhatsApp +254722508904"
Keep answers short and friendly.
`;

    // Build conversation
    const prompt = [
      systemPrompt,
      ...messages.slice(-10).map(m => `${m.role}: ${m.text}`)
    ].join("\n");

   // GEMINI API CALL (Using gemini-3.1-flash-lite-preview)
const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
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
