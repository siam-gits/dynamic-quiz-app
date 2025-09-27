import React, { useState } from "react";

export default function Result({ name, topic, questions, answers, onRestart }) {
  const [showAnswers, setShowAnswers] = useState(false);

  let correct = 0;
  let wrong = 0;
  let notAnswered = 0;

  questions.forEach((q, i) => {
    if (!answers[i]) notAnswered++;
    else if (answers[i] === q.correct) correct++;
    else wrong++;
  });

  const score = correct * 1 - wrong * 0.5;

 const remark =
  score / questions.length > 0.8
    ? "🎉 Amazing job, my love! You’ve prepared so well!"
    : score / questions.length > 0.5
    ? "👍 Good effort, darling! Keep practicing and you'll ace it!"
    : "💖 Don't worry honey, I still believe in you!";


  return (
  <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
  <h2 className="text-2xl font-bold mb-4 text-center">
    Result for <span className="text-blue-600">{name}</span> | 
    Expected Score: <span className="text-purple-600">{topic}</span>
  </h2>

      <div className="flex justify-around mb-6">
        <div className="bg-green-100 text-green-800 p-4 rounded-xl text-center w-1/3">
          <p className="font-bold text-xl">{correct}</p>
          <p>Correct</p>
        </div>
        <div className="bg-red-100 text-red-800 p-4 rounded-xl text-center w-1/3">
          <p className="font-bold text-xl">{wrong}</p>
          <p>Wrong</p>
        </div>
        <div className="bg-gray-100 text-gray-800 p-4 rounded-xl text-center w-1/3">
          <p className="font-bold text-xl">{notAnswered}</p>
          <p>Not Answered</p>
        </div>
      </div>

      <div className="text-center mb-6">
        <span className="inline-block bg-yellow-200 text-yellow-800 px-4 py-2 rounded-full font-bold text-lg">
          Score: {score}
        </span>
      </div>

      <p className="text-center mb-6 font-semibold text-lg">{remark}</p>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setShowAnswers(!showAnswers)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {showAnswers ? "Hide Answers" : "Show Answers"}
        </button>

        <button
          onClick={onRestart}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Re-attempt Quiz
        </button>
      </div>

      {/* Answers List */}
      {showAnswers && (
        <ul className="space-y-3">
          {questions.map((q, i) => {
            const isCorrect = answers[i] === q.correct;
            return (
              <li
                key={i}
                className={`p-4 rounded-lg border-l-4 ${
                  isCorrect
                    ? "border-green-500 bg-green-50"
                    : answers[i]
                    ? "border-red-500 bg-red-50"
                    : "border-gray-400 bg-gray-50"
                }`}
              >
                <strong className="block">{q.question}</strong>
                <p>
                  Your Answer:{" "}
                  <span
                    className={isCorrect ? "text-green-700" : "text-red-700"}
                  >
                    {answers[i] || "Not answered"}
                  </span>
                </p>
                <p>Correct Answer: {q.correct}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
