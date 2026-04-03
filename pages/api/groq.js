export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }
    const apiBaseUrl =
      process.env.AI_TUTOR_API_URL ||
      "https://keerti-12-ai-tutor.hf.space";

    const response = await fetch(`${apiBaseUrl}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: message,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({
        error: "AI backend error",
        details: errorText,
      });
    }

    const result = await response.json();

    if (!result.answer) {
      return res.status(500).json({
        error: "Empty response from AI",
      });
    }

    return res.status(200).json({
      reply: result.answer,
    });

  } catch (error) {
    console.error("API Error:", error);

    res.status(500).json({
      error: "Server failed to run AI model",
      details: error.message,
    });
  }
}