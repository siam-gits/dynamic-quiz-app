import { GEMINI_API_KEY, GEMINI_API_URL } from "../config";

/**
 * Generates a quiz JSON from a custom topic and number of questions using Gemini API.
 * Each question object will have the format:
 * { question: string, options: [string], answer: string }
 */
export async function generateQuiz(topic, totalQuestions) {
  if (!GEMINI_API_KEY || !GEMINI_API_URL) {
    console.error("GEMINI_API_KEY or GEMINI_API_URL missing.");
    return [];
  }

  const systemInstruction = `
You are a quiz question generator. Generate ${totalQuestions} multiple-choice questions
for the topic: "${topic}". Each question should have exactly 4 options and one correct answer.
Return strictly as a JSON array with objects like:
{ "question": "", "options": ["", "", "", ""], "correct": "" }.
Do NOT include explanations or extra text. No markdown outside the JSON.
`;

  const payload = {
    contents: [{ parts: [{ text: systemInstruction }] }],
    generationConfig: {
      temperature: 0.7,
      candidateCount: 1,
      maxOutputTokens: 2000,
    },
  };

  try {
    const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const rawText = await res.text();

    let data;
    try {
      data = JSON.parse(rawText);
    } catch (err) {
      console.error("Failed to parse JSON:", err.message);
      return [];
    }

    let quizJSON = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!quizJSON) return [];

    // Remove Markdown code fences if present
    const cleaned = quizJSON
      .trim()
      .replace(/^```json\s*/, "")
      .replace(/^```[\s\S]*?\n/, "") // any other code fences
      .replace(/```$/, "");

    let questions = [];
    try {
      questions = JSON.parse(cleaned);
    } catch (err) {
      console.error("Failed to parse quiz JSON from Gemini response:", err.message);
      console.log("Raw Gemini output:", quizJSON);
    }

    return questions;
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
}
