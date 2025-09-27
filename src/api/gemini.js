import { GEMINI_API_KEY, GEMINI_API_URL } from "../config";

export async function fetchQuestions(topic) {
  try {
    const res = await fetch(GEMINI_API_URL + "?key=" + GEMINI_API_KEY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          { parts: [{ text: `Generate 50 multiple-choice quiz questions in JSON for the topic: ${topic}` }] }
        ]
      }),
    });

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) return [];

    // Ensure JSON is valid
    const parsed = JSON.parse(text);
    return parsed.questions || [];
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
}

