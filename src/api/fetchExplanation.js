import { GEMINI_API_KEY, GEMINI_API_URL } from "../config";

export async function fetchExplanation(question, correctAnswer, userAnswer) {
  if (!GEMINI_API_KEY || !GEMINI_API_URL) {
    console.error("Configuration Error: GEMINI_API_KEY or GEMINI_API_URL is missing.");
    return "No explanation available.";
  }

  // **CRITICAL PROMPT REVISION**
  // The system instruction now strictly enforces that the model must find the
  // true correct answer based on the question, then compare it to the provided data.
  const systemInstruction = "You are an expert Q&A fact-checker. You must first find the true, historically correct answer to the question using Google Search. Then, use that true answer to construct the explanation. Completely ignore the provided 'correctAnswer' if it conflicts with the true historical fact. Only provide the concise explanation requested in the prompt, no conversational filler or verbose internal reasoning (thoughts).";
  
  // Construct prompt including correct answer and user's answer
  const payload = {
    contents: [
      {
        parts: [
          {
            // The prompt asks for the explanation based on the TRUE answer, 
            // and mentions the provided "correctAnswer" only as a reference.
            text: `${systemInstruction}
Provide an explanation in 3-5 lines for the true correct answer to the following question.
Question: "${question}".
The data provided claims the correct answer is: "${correctAnswer}". If this is wrong, state the true correct answer and explain why it is correct instead.
User's answer: "${userAnswer || 'Not answered'}".
Keep the explanation short and highlight why other options are wrong if relevant.`
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.0, 
      candidateCount: 1,
      maxOutputTokens: 1024 
    },
    // Keep Google Search tool enabled for grounding and validation
    tools: [
      {
        googleSearch: {}
      }
    ]
  };

  try {
    const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    console.log("HTTP status:", res.status);
    const rawText = await res.text();
    console.log("Raw response:\n", rawText);

    let data;
    try {
      data = JSON.parse(rawText);
    } catch (err) {
      console.error("Failed to parse JSON:", err.message);
      return "No explanation available.";
    }

    const explanation = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!explanation) return "No explanation available.";

    return explanation;
  } catch (err) {
    console.error("Fetch error:", err);
    return "No explanation available.";
  }
}