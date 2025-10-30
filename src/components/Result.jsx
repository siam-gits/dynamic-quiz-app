import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import emreSound from "../Assets/emre_zdemir.mp3";
import { downloadQuizPDF } from "../utils/pdf";
import { fetchInsights } from "../api/fetchInsights";
import { ArrowUp, ArrowDown } from "lucide-react";

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
  const [loadingHistory, setLoadingHistory] = useState(false);
const [selectedDataIndex, setSelectedDataIndex] = useState(null);
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
    "https://script.google.com/macros/s/AKfycbzOaOXGKIdDP70a870cB_2d8dTYk-zRJO1S8lhDSsF11QKjpVzmVvfGi0Fm3NqrI-Kzew/exec";





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


    const resultData = {
  timestamp: new Date().toISOString(),
  name,
  topic,
  score,
  correct,
  wrong,
  notAnswered,
  percentage,
  mode,
  quizJSON: JSON.stringify({
    questions,
    answers,
    score,
    maxScore: questions.length,
    percentage,
  }),
};

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
  quizJSON: resultData.quizJSON, // ✅ add this line
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


  //Analysis
const [insights, setInsights] = useState("");
const [loadingInsights, setLoadingInsights] = useState(false);

async function handleGenerateInsights() {
  setLoadingInsights(true);
  const performanceData = questions.map((q, i) => ({
    question: q.question,
    correctAnswer: q.correct,
    userAnswer: answers[i] || "No answer",
    isCorrect: answers[i] === q.correct
  }));

  const text = await fetchInsights(topic, performanceData);
  setInsights(text);
  setLoadingInsights(false);
}

  // Fetch history
const fetchHistory = async () => {
  try {
    const res = await fetch(`${scriptURL}?name=${encodeURIComponent(name)}`);
    const data = await res.json();
    setHistory(data.reverse());
  } catch (err) {
    console.error(err);
  }
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
          onClick={() => {
    setFilter(prev => prev === "correct" ? "all" : "correct");
    setShowHistory(false);
    setInsights(""); // hide analysis
  }}
        >
          <p className="font-bold text-2xl">{correct}</p>
          <p className="text-sm">Correct ✅</p>
        </div>
        <div
          className="flex-1 bg-gradient-to-r from-red-400 to-red-600 text-white p-4 rounded-xl shadow-lg flex flex-col items-center cursor-pointer"
          onClick={() => {
    setFilter(prev => prev === "wrong" ? "all" : "wrong");
    setShowHistory(false);
    setInsights("");
  }}
        >
          <p className="font-bold text-2xl">{wrong}</p>
          <p className="text-sm">Wrong ❌</p>
        </div>
        <div
          className="flex-1 bg-gradient-to-r from-gray-400 to-gray-600 text-white p-4 rounded-xl shadow-lg flex flex-col items-center cursor-pointer"
          onClick={() => {
    setFilter(prev => prev === "notAnswered" ? "all" : "notAnswered");
    setShowHistory(false);
    setInsights("");
  }}
        >
          <p className="font-bold text-2xl">{notAnswered}</p>
          <p className="text-sm">Not Answered ⚪</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button onClick={()=>onRestart(null,"normal")} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">Reattempt Quiz</button>
<button
  onClick={async () => {
    setFilter("all");       // hide correct/wrong/not answered
    setShowHistory(false);  // hide history
    await handleGenerateInsights(); // show analysis
  }}
  disabled={loadingInsights}
  className="relative flex items-center justify-center gap-2 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
>
  {loadingInsights ? (
    <>
      <svg
        className="animate-spin h-5 w-5 text-white"
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
      <span>Analyzing...</span>
    </>
  ) : (
    <span>Analyze Quiz</span>
  )}
</button>



        {/* <button onClick={handleReviseMistakes} className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition">Revise Mistakes</button> */}
<button
  onClick={async () => {
    setFilter("all"); // hide any filter
    setInsights("");  // hide analysis

    if (!showHistory && history.length === 0) {
      // First time loading, show spinner
      setLoadingHistory(true);
      await fetchHistory();
      setLoadingHistory(false);
    }

    // Toggle visibility
    setShowHistory(prev => !prev);
  }}
  disabled={loadingHistory}
  className={`px-4 py-2 rounded text-white transition flex items-center justify-center gap-2
    ${loadingHistory ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}
  `}
>
  {loadingHistory ? (
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
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <span>Loading...</span>
    </>
  ) : (
    <span>{showHistory ? "Hide Results" : "Show Results"}</span>
  )}
</button>


<button 
  onClick={() => downloadQuizPDF({ name, topic, questions, answers, score, maxScore, percentage })}
  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
>
  Download PDF
</button>      </div>


{insights && (
  <div className="mt-6 p-6 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-2xl shadow-inner relative">
    {/* Close Button */}
    <button
      onClick={() => setInsights("")}
      className="absolute top-2 right-2 text-red-600 font-bold text-xl hover:text-red-800"
      aria-label="Close Insights"
    >
      ×
    </button>

    {/* Centered main heading */}
    <h3 className="text-xl font-bold mb-4 text-purple-800 text-center">
      AI Quiz Analysis
    </h3>
    <hr className="border-purple-300 mb-4" />

    {/* Split insights into sections */}
    <div className="text-sm">
      {insights.split("\n\n").map((block, idx) => {
        const [heading, ...rest] = block.split("\n");

        // Assign colors for each heading
        let headingColor = "text-green-600"; // Strengths is green
        if (heading.toLowerCase().includes("areas to improve")) headingColor = "text-red-600";
        else if (heading.toLowerCase().includes("one suggestion")) headingColor = "text-blue-600";

        return (
          <div key={idx} className="mb-4">
            <span className={`font-bold ${headingColor}`}>{heading}</span>
            <br />
            <span
              className="whitespace-pre-line"
              dangerouslySetInnerHTML={{
                __html: rest.join("\n").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
              }}
            />
          </div>
        );
      })}
    </div>
  </div>
)}







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
    <h3 className="text-xl font-bold mb-4 text-center">All Previous Attempts</h3>

    {/* Line Chart */}
    <div className="mb-6 w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={history}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={(str) => new Date(str).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            interval="preserveStartEnd"
          />
          <YAxis 
            domain={[0, 100]}
            label={{ 
              value: 'Percentage', 
              angle: -90, 
              position: 'insideLeft', 
              style: { textAnchor: 'middle', fill: '#374151', fontWeight: 'bold' } 
            }}
          />
          <Tooltip 
            content={({ payload }) => {
              if (!payload || payload.length === 0) return null;
              const data = payload[0].payload;
              return (
                <div className="bg-white p-2 border rounded shadow text-sm">
                  <div><strong>Date:</strong> {new Date(data.timestamp).toLocaleString()}</div>
                  <div><strong>Topic:</strong> {data.topic}</div>
                  <div><strong>Score:</strong> {data.correct + data.wrong + data.notAnswered ? `${data.score}/${data.correct + data.wrong + data.notAnswered}` : data.score}</div>
                  <div><strong>Percentage:</strong> {(parseFloat(data.percentage) * 100).toFixed(2)}%</div>
                </div>
              );
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey={(h) => {
              const percentage = parseFloat(h.percentage) * 100;
              return isNaN(percentage) ? 0 : percentage;
            }}          
            stroke="#4f46e5" 
            strokeWidth={2} 
            activeDot={{ r: 6 }}
            name="Score %"
            dot={(props) => {
              const { cx, cy, index, value } = props; // 'index' is provided by Recharts for data point position in the array
              if (isNaN(cx) || isNaN(cy) || value == null) return null; // Skip invalid points

              const isSelected = index === selectedDataIndex;
              const isHighScore = parseFloat(history[index]?.percentage || 0) >= 0.80;

              const handleDotClick = () => {
                console.log("Clicked dot at index:", index, "with payload:", history[index]);
                setSelectedDataIndex(prev => prev === index ? null : index);
              };

              return (
                <g onClick={handleDotClick} style={{ cursor: 'pointer' }}>
                  <circle 
                    cx={cx} 
                    cy={cy} 
                    r={isSelected ? 8 : (isHighScore ? 6 : 4)} 
                    fill={isHighScore ? "#34d399" : "#4f46e5"} 
                    stroke={isSelected ? "#ffffff" : (isHighScore ? "#10b981" : "none")} 
                    strokeWidth={isSelected ? 3 : (isHighScore ? 2 : 0)} 
                  />
                  {/* Optional: Invisible larger hit area for easier clicking */}
                  <circle 
                    cx={cx} 
                    cy={cy} 
                    r={10} 
                    fill="transparent" 
                    stroke="none" 
                  />
                </g>
              );
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>

    {/* Table */}
  <table className="min-w-full text-center border-collapse">
  <thead>
    <tr>
      <th className="border px-2 py-1">Date</th>
      <th className="border px-2 py-1">Topic</th>
      <th className="border px-2 py-1">Score</th>
      <th className="border px-2 py-1">Correct</th>
      <th className="border px-2 py-1">Wrong</th>
      <th className="border px-2 py-1">Not Answered</th>
      <th className="border px-2 py-1">Percentage</th>
      <th className="border px-2 py-1">Download</th> {/* 🆕 New column */}
    </tr>
  </thead>

  <tbody>
    {history.map((h, idx) => (
      <tr
        key={idx}
        className={`transition-colors duration-200 ${
          selectedDataIndex === idx ? "bg-blue-200 font-semibold" : ""
        }`}
      >
        <td className="border px-2 py-1">
          {new Date(h.timestamp).toLocaleDateString()}
        </td>
        <td className="border px-2 py-1">{h.topic}</td>
        <td className="border px-2 py-1">{`${parseFloat(h.score).toFixed(0)}/${
          h.correct + h.wrong + h.notAnswered
        }`}</td>
        <td className="border px-2 py-1 text-green-700 font-bold">{h.correct}</td>
        <td className="border px-2 py-1 text-red-700 font-bold">{h.wrong}</td>
        <td className="border px-2 py-1 text-gray-700 font-bold">
          {h.notAnswered}
        </td>
        <td className="border px-2 py-1">
          {(parseFloat(h.percentage) * 100).toFixed(2)}%
        </td>

        {/* 🆕 Download button */}
<td className="border px-2 py-1">
  <button
    onClick={() => {
      if (!h.quizJSON) return alert("No quiz data available!");
      const quizData = JSON.parse(h.quizJSON);

      downloadQuizPDF({
        name: h.name,
        topic: h.topic,
        questions: quizData.questions,
        answers: quizData.answers,
        score: quizData.score,
        maxScore: quizData.maxScore,
        percentage: quizData.percentage,
        date: new Date(h.timestamp).toLocaleString(), // optional
      });
    }}
    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
  >
    Download PDF
  </button>
</td>


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
