import React, { useState, useEffect } from "react";

// 🧩 Import question sets
import EnglishQuestions from "../questions/EnglishQuestions";
import BanglaQuestions from "../questions/BanglaQuestions";
import BangladeshAffairs from "../questions/BangladeshAffairs";
import InternationalAffairs from "../questions/InternationalAffairs";
import MathAndIQQuestions from "../questions/MathAndIQQuestions";
import CurrentAffairs from "../questions/CurrentAffairs";
import AllQuestions from "../questions/AllQuestions";
import Revision from "../questions/Revision";

export default function StartForm({ onStart }) {
  const [name, setName] = useState("");
  const [expectedScore, setExpectedScore] = useState("");
  const [topic, setTopic] = useState("");
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const footerText = "❤️ Made with love only for my Pakhi";

  // 🧮 Topics mapped to question sets
  const topicsData = {
    English: EnglishQuestions,
    Bangla: BanglaQuestions,
    "Bangladesh Affairs": BangladeshAffairs,
    "International Affairs": InternationalAffairs,
    "Math & IQ": MathAndIQQuestions,
    "Current Affairs": CurrentAffairs,
    All: AllQuestions,
    "Revise Mistakes": Revision

  };


  // Footer typing animation
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < footerText.length) {
        setTypedText((prev) => prev + footerText.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const selectedQuestions = topicsData[topic] || [];
  const totalQuestions = selectedQuestions.length;
  const totalTimeMinutes = (totalQuestions / 2).toFixed(1); // rounded to 1 decimal

  const handleStartClick = () => {
    if (!name.trim() || !expectedScore.trim() || !topic) {
      alert("Please enter your name, expected score, and select a topic!");
      return;
    }

    if (totalQuestions === 0) {
      alert(
        "⚠️ This topic doesn't have any questions yet. Try another topic or check back later!"
      );
      return;
    }

    if (Number(expectedScore) > totalQuestions) {
      alert(`Your expected score cannot exceed total questions (${totalQuestions})`);
      return;
    }

    const totalTimeSeconds = (totalQuestions / 2) * 60;
    onStart(name, Number(expectedScore), totalTimeSeconds, topic, totalQuestions);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg text-center space-y-4 transition-all duration-300">
      <h1 className="text-3xl font-extrabold text-blue-600">Quiz</h1>

      {/* Topic dropdown */}
      <select
        className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      >
        <option value="">Select a topic</option>
        {Object.keys(topicsData).map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      {/* Topic info or warning */}
      {topic && (
        <>
          {totalQuestions > 0 ? (
            <div className="bg-gray-100 p-3 rounded-lg text-gray-700 transition duration-300">
              <p className="mt-2">
                📝 <strong>Questions:</strong> {totalQuestions}
              </p>
              <p>
                ⏰ <strong>Time:</strong> {totalTimeMinutes} minutes
              </p>
            </div>
          ) : (
            <div className="mt-2 p-3 bg-yellow-100 rounded border-l-4 border-yellow-400 text-yellow-800 font-semibold text-left transition duration-300">
              ⚠️ This topic doesn't have any questions yet.
              <br />
              Please select another topic or check back later! 🚀
            </div>
          )}
        </>
      )}

      <input
        placeholder="Enter your name"
        className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter expected score"
        className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={expectedScore}
        onChange={(e) => setExpectedScore(e.target.value)}
        min={0}
        max={totalQuestions}
      />

      <button
        className={`w-full px-4 py-2 rounded text-white font-semibold transition ${
          name && expectedScore && topic && totalQuestions > 0
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        onClick={handleStartClick}
        disabled={!name || !expectedScore || !topic || totalQuestions === 0}
      >
        Start Quiz
      </button>

      {/* Footer typing animation */}
      <p className="mt-6 text-sm text-pink-500 font-semibold">
        {typedText}
        {isTyping && (
          <span className="inline-block w-[2px] h-4 bg-pink-500 ml-1 animate-[blink_1s_steps(2)_infinite]" />
        )}
      </p>

      <style jsx>{`
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
