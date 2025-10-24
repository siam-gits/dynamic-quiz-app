import { GEMINI_API_KEY, GEMINI_API_URL } from "../config";

/**
 * Fetches educational insights from the Gemini API based on quiz performance data.
 * @param {string} topic - The subject/topic of the quiz.
 * @param {Array<Object>} performanceData - Array of quiz results.
 * @returns {Promise<string>} - The AI-generated insights or an error message.
 */
export async function fetchInsights(topic, performanceData) {
  if (!GEMINI_API_KEY || !GEMINI_API_URL) {
    console.error("Configuration Error: GEMINI_API_KEY or GEMINI_API_URL is missing.");
    return "⚠️ AI insights unavailable — missing configuration.";
  }

  // Separate questions by type
  const correct = performanceData
    .filter(p => p.isCorrect)
    .map(p => `Q: ${p.question}\n✅ Correct Answer: ${p.correctAnswer}`)
    .join("\n\n");

  const wrong = performanceData
    .filter(p => p.userAnswer && !p.isCorrect)
    .map(p => `Q: ${p.question}\n❌ User Answer: ${p.userAnswer}\n✅ Correct Answer: ${p.correctAnswer}`)
    .join("\n\n");

  const notAnswered = performanceData
    .filter(p => !p.userAnswer)
    .map(p => `Q: ${p.question}\n❌ Not Answered\n✅ Correct Answer: ${p.correctAnswer}`)
    .join("\n\n");

  // --- Updated SYSTEM PROMPT ---
const systemInstruction = `
You are an educational performance analyst. Analyze the quiz result based on correct, wrong, and not answered questions.
Provide feedback in plain text with exactly three headings:

Strengths
Areas to Improve
One Suggestion

Rules:
- Only bold key topics or concepts inside each section using **double asterisks**, in the same language as the questions.
- Do NOT bold the headings themselves.
- If the questions are in Bangla, provide feedback in Bangla.
- Keep it concise, motivational, and tailored to the topic (max 50 words).
`;

  const promptText = `
${systemInstruction}
Topic: "${topic}"

=== Correct Answers ===
${correct || "None"}

=== Wrong Answers ===
${wrong || "None"}

=== Not Answered ===
${notAnswered || "None"}

Write the AI feedback in the structured format described above.
`.trim();

  const payload = {
    contents: [
      {
        parts: [{ text: promptText }]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      candidateCount: 1,
      maxOutputTokens: 1024
    }
  };

  try {
    const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errorDetail = await res.text();
      console.error("API Error Response:", errorDetail);
      return `⚠️ API call failed with status ${res.status}.`;
    }

    const rawText = await res.text();
    let data;
    try {
      data = JSON.parse(rawText);
    } catch (err) {
      console.error("Failed to parse JSON:", err.message);
      return "⚠️ Could not interpret AI response (JSON parse error).";
    }

    const insights = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!insights) {
      console.error("AI Response Malformed:", data);
      return "⚠️ No valid insights available from the AI.";
    }

    return insights.trim();
  } catch (err) {
    console.error("Fetch/Processing error:", err);
    return `⚠️ Unable to fetch AI insights.`;
  }
}
