import { GEMINI_API_KEY, GEMINI_API_URL } from "../config";

/**
 * @typedef {Object} QuizQuestion
 * @property {string} question - The question text.
 * @property {string[]} options - Array of 4 possible answers.
 * @property {string} correct - The correct answer.
 */

/**
 * Generates multiple-choice quiz questions using the Gemini API.
 * Ensures uniqueness across all batches.
 *
 * @param {string} topic - The quiz topic.
 * @param {number} totalQuestions - Total number of questions to generate.
 * @param {number} [batchSize=25] - Number of questions per API batch.
 * @param {function} [onProgress] - Optional callback(progressInfo)
 * @param {AbortSignal} [signal] - Optional abort signal to cancel generation
 * @returns {Promise<QuizQuestion[]>} Array of unique question objects
 */
export async function generateQuiz(topic, totalQuestions, batchSize = 25, onProgress, signal) {
  if (!GEMINI_API_KEY || !GEMINI_API_URL) {
    console.error("GEMINI_API_KEY or GEMINI_API_URL missing.");
    return [];
  }

  const allQuestions = [];

  async function fetchQuizBatch(batchCount, previousQuestions) {
    if (signal?.aborted) return []; // stop immediately if aborted

    const previousQuestionsText = previousQuestions.map(q => q.question).join("\n");
    const systemInstruction = `You are a quiz question generator. Generate ${batchCount} multiple-choice questions
for the topic: "${topic}". Each question must have exactly 4 options and one correct answer.
All questions must be unique compared to these previous questions:
${previousQuestionsText || "(none)"}
Return strictly as a JSON array like:
[
  { "question": "", "options": ["", "", "", ""], "correct": "" }
]
Do NOT include explanations, markdown, or extra text. Return only valid JSON.`;

    const payload = {
      contents: [{ parts: [{ text: systemInstruction }] }],
      generationConfig: { temperature: 0.7, candidateCount: 1, maxOutputTokens: 8000 },
    };

    try {
      const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal,
      });

      if (!res.ok) {
        console.error(`❌ Gemini API HTTP error: ${res.status}`);
        return [];
      }

      const rawText = await res.text();
      let data;
      try { data = JSON.parse(rawText); } catch { return []; }

      const quizJSON = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!quizJSON) return [];

      const cleaned = quizJSON
        .trim()
        .replace(/^```json\s*/i, "")
        .replace(/^```[\s\S]*?\n/i, "")
        .replace(/```$/i, "");

      try {
        const questions = JSON.parse(cleaned);
        return Array.isArray(questions) ? questions : [];
      } catch {
        console.error("❌ Failed to parse quiz JSON.", quizJSON);
        return [];
      }
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Generation aborted.");
      } else {
        console.error("❌ Fetch error:", err.message);
      }
      return [];
    }
  }

  let attempt = 0;
  const maxAttempts = 50; // safety limit

  while (allQuestions.length < totalQuestions && attempt < maxAttempts) {
    if (signal?.aborted) break; // stop if aborted
    attempt++;
    const remaining = totalQuestions - allQuestions.length;
    const currentBatchSize = Math.min(batchSize, remaining);

    let batch = await fetchQuizBatch(currentBatchSize, allQuestions);

    // Retry once if empty
    if (!batch.length) {
      await new Promise(r => setTimeout(r, 1000));
      batch = await fetchQuizBatch(currentBatchSize, allQuestions);
    }

    // Deduplicate
    batch = batch.filter(q => !allQuestions.some(prev => prev.question.trim() === q.question.trim()));

    if (batch.length) {
      allQuestions.push(...batch);
    } else {
      console.warn("⚠️ No new unique questions returned, retrying...");
    }

    if (typeof onProgress === "function") {
      const percent = Math.min(100, Math.round((allQuestions.length / totalQuestions) * 100));
      onProgress({ totalSoFar: allQuestions.length, totalTarget: totalQuestions, percent });
    }
  }

  if (allQuestions.length < totalQuestions) {
    console.warn(`⚠️ Only generated ${allQuestions.length} unique questions out of requested ${totalQuestions}.`);
  } else {
    console.log(`✅ Generated ${allQuestions.length} unique questions for "${topic}".`);
  }

  return allQuestions;
}
