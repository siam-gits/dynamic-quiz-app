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
  // const [telegramVisited, setTelegramVisited] = useState(false);
  // const [showModal, setShowModal] = useState(false);

  const footerText = "❤️ Made with love only for my Pakhi";

  const topicsData = {
    English: EnglishQuestions,
    Bangla: BanglaQuestions,
    "Bangladesh Affairs": BangladeshAffairs,
    "International Affairs": InternationalAffairs,
    "Math & IQ": MathAndIQQuestions,
    "Current Affairs": CurrentAffairs,
    All: AllQuestions,
    "Revise Mistakes": Revision,
  };

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
  const timePerQuestionMinutes = topic === "Math & IQ" ? 1 : 0.5;
  const totalTimeMinutes = (totalQuestions * timePerQuestionMinutes).toFixed(1);
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
    alert(
      `Your expected score cannot exceed total questions (${totalQuestions})`
    );
    return;
  }

  const totalTimeSeconds = totalQuestions * timePerQuestionMinutes * 60;

  // ✅ Here is where we pass the attempt mode
  const attemptMode = topic === "Revise Mistakes" ? "revision" : "normal";

  onStart(
    name,
    Number(expectedScore),
    totalTimeSeconds,
    topic,
    totalQuestions,
    attemptMode // <-- pass mode here
  );
};



  // const handleTelegramClick = () => {
  //   window.open("https://t.me/sarkar_siam", "_blank");
  //   setTelegramVisited(true);
  //   setShowModal(false);
  // };
const updatedTopics = ["All"];

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg text-center space-y-4 transition-all duration-300">
      <h1 className="text-3xl font-extrabold text-blue-600">Quiz</h1>

  <select
  className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
  value={topic}
  onChange={(e) => setTopic(e.target.value)}
>
  <option value="">Select a topic</option>
  {Object.keys(topicsData).map((t) => (
    <option key={t} value={t}>
      {t} {updatedTopics.includes(t) ? "🔥New" : ""}
    </option>
  ))}
</select>

{topic === "All" && (
  <div className="mt-2 p-3 bg-gradient-to-r from-blue-50 to-indigo-100 border-l-4 border-indigo-400 text-indigo-700 rounded-md font-semibold italic shadow-sm">
    🧠 You’re entering <strong>49th BCS Mode!</strong><br />
    Take a deep breath, stay calm, and show what you’ve got! 🚀
  </div>
)}

{topic === "Revise Mistakes" && (
  <div className="mt-2 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 rounded-md font-semibold italic shadow-sm">
    ⚡ You are entering Revision Mode! Only your previous mistakes and unanswered questions will appear.
  </div>
)}

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

      <p className="mt-6 text-sm text-pink-500 font-semibold">
        {typedText}
        {isTyping && (
          <span className="inline-block w-[2px] h-4 bg-pink-500 ml-1 animate-[blink_1s_steps(2)_infinite]" />
        )}
      </p>

      {/* Glass Telegram Modal */}
{/*
{showModal && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <!-- Glass background -->
    <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>

    <div className="relative bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 bg-opacity-90 backdrop-blur-md rounded-3xl p-6 max-w-md text-center shadow-2xl border border-white border-opacity-20">
      <h2 className="text-2xl font-extrabold text-yellow-300 drop-shadow-lg">
        ❤️ Send Some Love ❤️
      </h2>
      <p className="text-white text-sm mt-2 drop-shadow-md">
        Your man is a little sad tonight 😢 as he couldn’t talk to you and listen to your unlimited fisfis tonight.<br />
        He’s now sleeping with a heavy heart 💔.<br />
        Please send him some love on Telegram 💌, no matter the hour,<br />
        and come back here to light up his night by attempting the quiz! 🌟
      </p>
      <button
        onClick={handleTelegramClick}
        className="mt-4 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition transform hover:shadow-xl"
      >
        Send Love on Telegram
      </button>
    </div>
  </div>
)}
*/}




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
