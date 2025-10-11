import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import emreSound from "../Assets/emre_zdemir.mp3";
import { downloadQuizPDF } from "../utils/pdf";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { fetchExplanation } from "../api/fetchExplanation";

export default function Result({
  name,
  expectedScore,
  questions,
  answers,
  onRestart,
  topic,
  mode = "normal",
}) {
  const [submitted, setSubmitted] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [filter, setFilter] = useState("all");
  const [progress, setProgress] = useState(0);

  // Calculate correct, wrong, not answered
  let correct = 0,
    wrong = 0,
    notAnswered = 0;
  questions.forEach((q, i) => {
    const ans = answers[i];
    if (ans === undefined || ans === null || ans === "") notAnswered++;
    else if (ans === q.correct) correct++;
    else wrong++;
  });

  const penalty = 0.5;
  const score = correct - wrong * penalty;
  const maxScore = questions.length;
  const percentage = ((score / maxScore) * 100).toFixed(2);

  const remark =
    score / maxScore > 0.8
      ? "🎉 Amazing job, my love! You’ve prepared so well!"
      : score / maxScore > 0.5
      ? "👍 Good effort, darling! Keep practicing and you'll ace it!"
      : "💖 Don't worry honey, I still believe in you!";

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbzwRqxhJoOATh4Npm4DFLXqm53c9cMkt9zes27xD8i2REdg3XU_Q8u5mjl7LWW1NJn2Ng/exec";

  // Animate score circle
  useEffect(() => {
    let start = 0;
    const rawEnd = (score / maxScore) * 100;
    const end = Math.max(0, rawEnd);
    const duration = 1000;
    const step = end / (duration / 10);

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setProgress(start);
    }, 10);
    return () => clearInterval(timer);
  }, [score, maxScore]);

  // Build revision JSON
  const revisionData = {
    wrong: questions
      .map((q, i) => {
        if (answers[i] && answers[i] !== q.correct) {
          return {
            questionNumber: i + 1,
            question: q.question,
            options: q.options,
            yourAnswer: answers[i],
            correctAnswer: q.correct,
          };
        }
        return null;
      })
      .filter(Boolean),
    notAnswered: questions
      .map((q, i) => {
        if (!answers[i]) {
          return {
            questionNumber: i + 1,
            question: q.question,
            options: q.options,
            correctAnswer: q.correct,
          };
        }
        return null;
      })
      .filter(Boolean),
  };

  // Submit results
  useEffect(() => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = scriptURL;
    form.target = "hidden_iframe";

    const fields = {
      name,
      topic,
      score: Number(score).toFixed(2),
      correct,
      wrong,
      notAnswered,
      expectedScore: Number(expectedScore).toFixed(2),
      percentage: Number(percentage).toFixed(2) + "%",
      revisionJSON: JSON.stringify(revisionData),
      attemptType: mode === "revision" ? "Revision" : "Normal",
    };

    Object.keys(fields).forEach((key) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = fields[key];
      form.appendChild(input);
    });

    document.body.appendChild(form);
    const iframe = document.createElement("iframe");
    iframe.name = "hidden_iframe";
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    form.submit();
    setSubmitted(true);
    setConfetti(true);

    const audio = new Audio(emreSound);
    audio.volume = 0.5;
    audio.play().catch(() => {});

    const cleanupTimer = setTimeout(() => {
      document.body.removeChild(form);
      document.body.removeChild(iframe);
      setConfetti(false);
    }, 5000);

    return () => clearTimeout(cleanupTimer);
  }, [score]);

  // Fetch history
  const fetchHistory = () => {
    fetch(`${scriptURL}?name=${encodeURIComponent(name)}`)
      .then((res) => res.json())
      .then((data) => {
        setHistory(data.reverse());
      })
      .catch((err) => console.error(err));
  };

  // Revise Mistakes
  const handleReviseMistakes = () => {
    if (history.length === 0) return alert("No previous attempts found!");
    const last = history.find((h) => h.revisionJSON);
    if (!last) return alert("No revision data found!");
    const revJSON = JSON.parse(last.revisionJSON || "{}");
    const revQuestions = [...(revJSON.wrong || []), ...(revJSON.notAnswered || [])];
    if (!revQuestions.length)
      return alert("No mistakes to revise — amazing job!");
    const revisedQuiz = revQuestions.map((q) => ({
      question: q.question,
      options: q.options,
      correct: q.correctAnswer,
    }));
    onRestart(revisedQuiz, "revision");
  };

  // Filtered questions
  const filteredQuestions = questions.filter((q, i) => {
    if (filter === "correct") return answers[i] === q.correct;
    if (filter === "wrong") return answers[i] && answers[i] !== q.correct;
    if (filter === "notAnswered") return !answers[i];
    return true;
  });

  // PDF download


 function ExplainButton({ question, correctAnswer, userAnswer }) {
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState(null);

  async function handleExplain() {
    setLoading(true);
    const text = await fetchExplanation(question, correctAnswer, userAnswer);
    setExplanation(text);
    setLoading(false);
  }

    return (
      <div className="mt-2">
        {!explanation ? (
        <button
  onClick={handleExplain}
  disabled={loading}
  className={`relative flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all duration-300 
    ${loading 
      ? "bg-blue-400 cursor-not-allowed" 
      : "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 shadow-lg hover:shadow-xl"
    }`}
>
  {loading ? (
    <>
      <svg
        className="animate-spin h-4 w-4 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      <span>Explaining...</span>
    </>
  ) : (
    <>
      <span>✨ Explain</span>
    </>
  )}
</button>

        ) : (
          <div className="bg-gray-100 p-3 rounded-lg text-sm text-gray-700">
            <strong>Explanation:</strong> {explanation}
          </div>
        )}
      </div>
    );
  }

  // --- Render ---
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10 relative">
      {confetti && <Confetti numberOfPieces={150} recycle={false} />}

      <h2 className="text-2xl font-bold mb-4 text-center">
        Result for <span className="text-blue-600">{name}</span> |{" "}
        Expected Score: <span className="text-purple-600">{expectedScore}</span>
      </h2>

      {/* Score Circle */}
      <div className="flex justify-center mb-6">
        <div className="relative w-36 h-36">
          <svg className="w-full h-full">
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="50%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#f87171" />
              </linearGradient>
            </defs>
            <circle stroke="#e5e7eb" strokeWidth="10" fill="transparent" r="54" cx="72" cy="72"/>
            <circle
              stroke="url(#scoreGradient)"
              strokeWidth="10"
              strokeDasharray={2*Math.PI*54}
              strokeDashoffset={2*Math.PI*54*(1-progress/100)}
              strokeLinecap="round"
              fill="transparent"
              r="54"
              cx="72"
              cy="72"
              transform="rotate(-90 72 72)"
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-xl font-bold">{score.toFixed(2)} pts</p>
            <p className="text-lg text-gray-600">{percentage}%</p>
          </div>
        </div>
      </div>

      <p className="text-center mb-6 font-semibold text-lg">{remark}</p>

      {/* Result Cards */}
      <div className="flex justify-around mb-6 space-x-2">
        <div
          className="flex-1 bg-gradient-to-r from-green-400 to-green-600 text-white p-4 rounded-xl shadow-lg flex flex-col items-center cursor-pointer"
          onClick={() => setFilter(filter==="correct"?"all":"correct")}
        >
          <p className="font-bold text-2xl">{correct}</p>
          <p className="text-sm">Correct ✅</p>
        </div>
        <div
          className="flex-1 bg-gradient-to-r from-red-400 to-red-600 text-white p-4 rounded-xl shadow-lg flex flex-col items-center cursor-pointer"
          onClick={() => setFilter(filter==="wrong"?"all":"wrong")}
        >
          <p className="font-bold text-2xl">{wrong}</p>
          <p className="text-sm">Wrong ❌</p>
        </div>
        <div
          className="flex-1 bg-gradient-to-r from-gray-400 to-gray-600 text-white p-4 rounded-xl shadow-lg flex flex-col items-center cursor-pointer"
          onClick={() => setFilter(filter==="notAnswered"?"all":"notAnswered")}
        >
          <p className="font-bold text-2xl">{notAnswered}</p>
          <p className="text-sm">Not Answered ⚪</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button onClick={()=>onRestart(null,"normal")} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">Reattempt Full Quiz</button>
        {/* <button onClick={handleReviseMistakes} className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition">Revise Mistakes</button> */}
        <button onClick={()=>{setShowHistory(!showHistory); fetchHistory()}} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">{showHistory?"Hide Results":"Show Results"}</button>
<button 
  onClick={() => downloadQuizPDF({ name, topic, questions, answers, score, maxScore, percentage })}
  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
>
  Download PDF
</button>      </div>

      {/* Filtered Questions with Explain */}
      {filter!=="all" && filteredQuestions.length>0 && (
        <ul className="space-y-4 mb-6">
          {filteredQuestions.map((q,i)=>{
            const idx = questions.indexOf(q);
            const isWrong = answers[idx] !== q.correct;
            return (
              <li key={i} className="p-4 rounded-lg border shadow-sm bg-gray-50">
                <strong className="block mb-2">{idx+1}. {q.question}</strong>
                <div className="space-y-2">
                  {q.options.map((opt,optIdx)=>{
                    const isUserAnswer = answers[idx]===opt;
                    const isCorrectAnswer = q.correct===opt;
                    return (
                      <div key={optIdx} className={`px-3 py-2 rounded-lg border ${isCorrectAnswer?"border-green-500 bg-green-50":""} ${isUserAnswer && !isCorrectAnswer?"border-red-500 bg-red-50":""} ${!isUserAnswer && !isCorrectAnswer?"border-gray-300 bg-white":""}`}>
                        <span className="font-medium">{opt}</span>
                        {isCorrectAnswer && <span className="ml-2 text-green-600 font-bold">✔ Correct</span>}
                        {isUserAnswer && !isCorrectAnswer && <span className="ml-2 text-red-600 font-bold">✘ Your Choice</span>}
                        {isUserAnswer && isCorrectAnswer && <span className="ml-2 text-green-700 font-bold">🎉 You chose this</span>}
                      </div>
                    )
                  })}
                 {answers[idx] !== q.correct && (
  <ExplainButton 
    question={q.question} 
    correctAnswer={q.correct} 
    userAnswer={answers[idx]} 
    topic={topic} 
  />
)}

                </div>
              </li>
            )
          })}
        </ul>
      )}

      {/* Show History */}
      {showHistory && history.length > 0 && (
        <div className="mt-6 bg-gray-50 p-4 rounded-xl shadow-inner overflow-x-auto">
          <h3 className="text-xl font-bold mb-2 text-center">All Previous Attempts</h3>
          <table className="min-w-full text-center border-collapse">
            <thead>
              <tr>
                <th className="border px-2 py-1">Date</th>
                <th className="border px-2 py-1">Topic</th>
                <th className="border px-2 py-1">Expected Score</th>
                <th className="border px-2 py-1">Score</th>
                <th className="border px-2 py-1">Correct</th>
                <th className="border px-2 py-1">Wrong</th>
                <th className="border px-2 py-1">Not Answered</th>
                <th className="border px-2 py-1">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h, idx) => (
                <tr key={idx}>
                  <td className="border px-2 py-1">{h.timestamp || "—"}</td>
                  <td className="border px-2 py-1">{h.topic}</td>
                  <td className="border px-2 py-1">{Math.round(h.expectedScore)}</td>
                  <td className="border px-2 py-1">{parseFloat(h.score).toFixed(2)}</td>
                  <td className="border px-2 py-1 text-green-700 font-bold">{h.correct}</td>
                  <td className="border px-2 py-1 text-red-700 font-bold">{h.wrong}</td>
                  <td className="border px-2 py-1 text-gray-700 font-bold">{h.notAnswered}</td>
                  <td className="border px-2 py-1">{(parseFloat(h.percentage) * 100).toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Submission Toast */}
      {submitted && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg animate-fade-in-out z-50">
          ✅ Submission Successful!
        </div>
      )}

      <style>{`
        @keyframes fade-in-out {
          0% { opacity:0; transform:translateY(-20px); }
          10% { opacity:1; transform:translateY(0); }
          90% { opacity:1; transform:translateY(0); }
          100% { opacity:0; transform:translateY(-20px); }
        }
        .animate-fade-in-out { animation: fade-in-out 3s ease forwards; }
      `}</style>
    </div>
  );
}
