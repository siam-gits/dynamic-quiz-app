import fetch from "node-fetch";
import { GEMINI_API_KEY, GEMINI_API_URL } from "./src/config.js";

async function testGeminiAPI() {
  const payload = {
    instances: [
      {
        content: "Say hello world"
      }
    ],
    temperature: 0.7,
    candidateCount: 1
  };

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log("HTTP status code:", response.status);
    const text = await response.text();
    console.log("Raw response:\n", text);

    try {
      const data = JSON.parse(text);
      console.log("Parsed JSON:", JSON.stringify(data, null, 2));
    } catch (err) {
      console.error("Failed to parse JSON:", err.message);
    }
  } catch (err) {
    console.error("Error calling Gemini API:", err);
  }
}

testGeminiAPI();
