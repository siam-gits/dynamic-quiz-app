import React, { useState } from "react";

export default function StartForm({ onStart, topic = "English", totalQuestions = 109, totalTime = 50 }) {
  const [name, setName] = useState("");
  const [expectedScore, setExpectedScore] = useState("");

  const handleStart = () => {
    if (!name.trim() || !expectedScore.trim()) {
      alert("Please enter both your name and expected score!");
      return;
    }
    onStart(name, Number(expectedScore)); // convert to number
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg text-center space-y-4">
      {/* Title */}
      <h1 className="text-3xl font-extrabold text-blue-600">Quiz</h1>

      {/* Fixed Subtitle */}
      <p className="text-gray-600">
        Topic: <span className="font-semibold text-gray-800">{topic}</span> | 
        Total Questions: <span className="font-semibold">{totalQuestions}</span> | 
        Time: <span className="font-semibold">{totalTime} min</span>
      </p>

      {/* Inputs */}
      <input
        placeholder="Enter your name"
        className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        step="1"
        min="0"
        max={totalQuestions}
        placeholder="Enter expected score"
        className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={expectedScore}
        onChange={(e) => setExpectedScore(e.target.value)}
      />

      {/* Start Button */}
      <button
        className={`w-full px-4 py-2 rounded text-white font-semibold transition ${
          name && expectedScore
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        onClick={handleStart}
        disabled={!name || !expectedScore}
      >
        Start Quiz
      </button>
       {/* Lovely Footer */}
  <p className="mt-6 text-sm text-pink-500 font-semibold">
    ❤️ Made with love only for my Pakhi
  </p>
    </div>
  );
}
