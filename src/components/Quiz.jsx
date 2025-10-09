import React, { useState } from "react";
import useTimer from "../hooks/useTimer";

export default function Quiz({ questions, onSubmit, totalTime }) {
  const [answers, setAnswers] = useState({});
  const timeLeft = useTimer(totalTime, () => onSubmit(answers));

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const timePercent = (timeLeft / totalTime) * 100;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="text-center mb-4">
        <p className="text-lg font-medium text-gray-600 mb-1">Remaining Time</p>
        <h2 className="text-4xl font-bold text-gray-800">{formatTime(timeLeft)}</h2>
      </div>

      <div className="w-full bg-white rounded-full h-4 mb-6 border border-gray-300 overflow-hidden">
        <div
          className="h-4 rounded-full transition-all"
          style={{
            width: `${100 - timePercent}%`,
            background: `linear-gradient(to right, green, yellow, red)`,
          }}
        ></div>
      </div>

{questions.map((q, i) => (
  <div key={i} className="p-4 bg-white rounded-xl shadow-md border-l-4 border-blue-400">
    <p className="font-semibold mb-2">{i + 1}. {q.question}</p>

    {/* Render image if it exists */}
    {q.image && (
      <img 
        src={q.image} 
        alt="Question visual" 
        className="mb-3 max-w-full rounded-lg shadow-sm" 
      />
    )}

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {q.options.map((opt, j) => {
        const isSelected = answers[i] === opt;
        return (
          <label
            key={j}
            className={`cursor-pointer flex items-center p-2 border rounded-lg transition ${
              isSelected ? "bg-blue-500 text-white border-blue-500" : "hover:bg-blue-50"
            }`}
          >
            <input
              type="radio"
              name={`q-${i}`}
              value={opt}
              checked={isSelected}
              onChange={() => setAnswers((prev) => ({ ...prev, [i]: opt }))}
              className="mr-2 accent-blue-600"
            />
            {opt}
          </label>
        );
      })}
    </div>
  </div>
))}


      <div className="text-center">
        <button
          onClick={() => onSubmit(answers)}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition transform hover:-translate-y-1"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
}
