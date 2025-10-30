import React, { useState, useEffect, useRef } from "react";
import EnglishQuestions from "../questions/EnglishQuestions";
import BanglaQuestions from "../questions/BanglaQuestions";
import BangladeshAffairs from "../questions/BangladeshAffairs";
import InternationalAffairs from "../questions/InternationalAffairs";
import MathAndIQQuestions from "../questions/MathAndIQQuestions";
import CurrentAffairs from "../questions/CurrentAffairs";
import AllQuestions from "../questions/AllQuestions";
import Revision from "../questions/Revision";
import { generateQuiz } from "../api/generateQuiz";

export default function StartForm({ onStart }) {
  const [name, setName] = useState("");
  const [expectedScore, setExpectedScore] = useState("");
  const [topic, setTopic] = useState("");
  const [customTopic, setCustomTopic] = useState("");
  const [customTotalQuestions, setCustomTotalQuestions] = useState("");
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedCount, setGeneratedCount] = useState(0);
  const [abortController, setAbortController] = useState(null);
const [showSiamModal, setShowSiamModal] = useState(false);
const [pendingQuiz, setPendingQuiz] = useState(null);

  const footerText = "❤️ Made with love only for my Pakhi";

 const [hearts, setHearts] = useState([])
useEffect(() => {
  const interval = setInterval(() => {
const shapes = [
      "hearts/beating_heart_3d.png", // 🛑 Removed leading slash (/)
      "hearts/black_heart_3d.png",   // 🛑 Removed leading slash (/)
      "hearts/blue_heart_3d.png",
      "hearts/green_heart_3d.png",
      "hearts/growing_heart_3d.png",
      "hearts/heart_ballon_3d.png",
      "hearts/heart_exclamation_3d.png",
      "hearts/heart_with_arrow_3d.png",
      "hearts/heart_with_ribbon_3d.png",
      "hearts/orange_heart_3d.png",
      "hearts/pink_heart_3d.png",
      "hearts/red_heart_3d.png",
      "hearts/sparkling_heart_3d.png",
      "hearts/white_heart_3d.png",
      "hearts/yellow_heart_3d.png",
    ];

    const newHeart = {
      id: Math.random(),
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      size: 40 + Math.random() * 30,
      left: Math.random() * 100,
      delay: 0,
      duration: 12 + Math.random() * 8,
      rotateStart: Math.random() * 360,
      popped: false,
    };

    setHearts(prev => {
      const maxHearts = 10; // ✅ fewer hearts total
      if (prev.length >= maxHearts) return prev;
      return [...prev, newHeart];
    });

    // Remove each heart after animation
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, (newHeart.duration + 0.5) * 1000);
  }, 1200); // ✅ slower spawn rate (1.2s)

  return () => clearInterval(interval);
}, []);




   
const [effects, setEffects] = useState([]);
const [sparkles, setSparkles] = useState([]);

const handlePop = (id, event) => {
  // Pop the heart
  setHearts(prev =>
    prev.map(h => (h.id === id ? { ...h, popped: true } : h))
  );

  setTimeout(() => {
    setHearts(prev => prev.filter(h => h.id !== id));
  }, 500);

  if (event) {
    const rect = event.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // --- Floating message ---
    const messages = [
      "I believe in you, always.",
      "You are capable of amazing things.",
      "Keep going, I’m proud of you.",
      "Your hard work will pay off.",
      "I care about you deeply.",
      "You’re stronger than you know.",
      "I love how dedicated you are.",
      "Stay confident, you’ve got this.",
      "You make me proud every day.",
      "I’m cheering for you, always.",
      "Keep pushing, success is near.",
      "I admire your determination.",
      "You’re doing great, don’t give up.",
      "I’m here for you, always.",
      "Your dreams are worth it.",
      "Your dreams are worth it.",
      "You inspire me every day.",
      "Stay positive, you can do it.",
      "I’m proud of your efforts.",
      "You mean so much to me."
    ];
    const message = messages[Math.floor(Math.random() * messages.length)];
    const effectId = Math.random();
    setEffects(prev => [...prev, { id: effectId, x, y, message }]);
    setTimeout(() => setEffects(prev => prev.filter(e => e.id !== effectId)), 2500);

    // --- Sparkles ---
    const newSparkles = Array.from({ length: 5 }).map(() => ({
  id: Math.random(),
  x,
  y,
  dx: (Math.random() - 0.5) * 60, // wider spread
  dy: (Math.random() - 0.5) * 60,
  size: 6 + Math.random() * 6 // bigger sparkles
}));

    setSparkles(prev => [...prev, ...newSparkles]);
    setTimeout(() => setSparkles(prev => prev.filter(s => !newSparkles.includes(s))), 500);
  }
};



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


const [isOnline, setIsOnline] = useState(navigator.onLine);


useEffect(() => {
  const handleOnline = () => setIsOnline(true);
  const handleOffline = () => setIsOnline(false);

  window.addEventListener("online", handleOnline);
  window.addEventListener("offline", handleOffline);

  return () => {
    window.removeEventListener("online", handleOnline);
    window.removeEventListener("offline", handleOffline);
  };
}, []);




  const updatedTopics = ["All", "English", "Revise Mistakes"];

  // Footer typing effect
// Footer typing effect
useEffect(() => {
  let index = 0;
  const interval = setInterval(() => {
    const text = footerText;

    if (index < text.length) {
      // 1. Get the code point at the current index (correctly handles multi-char emojis)
      const codePoint = text.codePointAt(index);
      
      // 2. Convert the code point back to a string
      const nextChar = String.fromCodePoint(codePoint);

      // 3. Append the full character to the typed text
      setTypedText((prev) => prev + nextChar);

      // 4. Advance the index by the number of code units (2 for emojis, 1 for normal chars)
      index += nextChar.length; 
    } else {
      clearInterval(interval);
      setIsTyping(false);
    }
  }, 100);
  return () => clearInterval(interval);
}, []);

  const notifications = [
    <>🔥 New questions added in <strong className="text-yellow-300">{updatedTopics.join(", ")}</strong>! 🎯</>,
    <>🚀 Generate custom questions using <strong className="text-yellow-300">Gemini</strong> in Custom! ✨</>,
    <>📊 History now shows a line chart for better progress visualization! 📈</>,
  ];

  const [currentNotification, setCurrentNotification] = useState(0);
  const marqueeDuration = 15000;

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentNotification((prev) => (prev + 1) % notifications.length);
    }, marqueeDuration);
    return () => clearTimeout(timer);
  }, [currentNotification]);

  const timePerQuestionMinutes = topic === "Math & IQ" ? 1 : 0.5;
  const totalQuestions =
    topic === "Custom" && customTotalQuestions
      ? Number(customTotalQuestions)
      : (topicsData[topic] || []).length;
  const totalTimeMinutes = (totalQuestions * timePerQuestionMinutes).toFixed(1);
const [generatedQuestions, setGeneratedQuestions] = useState([]);

  // Handle quiz start
const handleStartClick = async () => {
  // --- Basic validation ---
  if (!name.trim() || !expectedScore.trim() || !topic) {
    alert("Please enter your name, expected score, and select a topic!");
    return;
  }

  // ✅ If expected score <= 0, show alert and stop
  if (Number(expectedScore) <= 0) {
    alert("Expected score must be greater than zero!");
    return;
  }

  // --- Normal topics: start immediately ---
  if (topic !== "Custom") {
    const questions = topicsData[topic] || [];
    if (Number(expectedScore) > questions.length) {
      alert(`Your expected score cannot exceed total questions (${questions.length})`);
      return;
    }

// ✨ Special modal for Siam or Custom ✨
if (name.trim().toLowerCase() === "saba" || topic === "Custom") {
  const questions = topic === "Custom" ? generatedQuestions : topicsData[topic] || [];
  const totalTimeSeconds = questions.length * (topic === "Math & IQ" ? 60 : 30); // adjust per question
  const attemptMode = topic === "Revise Mistakes" ? "revision" : "normal";

  // Store pending quiz info
  setPendingQuiz({
    name,
    expectedScore: Number(expectedScore),
    totalTimeSeconds,
    topic,
    totalQuestions: questions.length,
    attemptMode,
    questions,
  });

  // Show modal instead of starting immediately
  setShowSiamModal(true);
  return;
}



    const totalTimeSeconds = questions.length * (topic === "Math & IQ" ? 1 : 0.5) * 60;
    const attemptMode = topic === "Revise Mistakes" ? "revision" : "normal";

    onStart(
      name,
      Number(expectedScore),
      totalTimeSeconds,
      topic,
      questions.length,
      attemptMode,
      questions
    );
    return;
  }

 // --- Custom topics ---
if (topic === "Custom") {
  if (!customTopic.trim() || !customTotalQuestions) {
    alert("Please enter a custom topic name and total questions!");
    return;
  }
  if (Number(expectedScore) > Number(customTotalQuestions)) {
    alert(`Your expected score cannot exceed total questions (${customTotalQuestions})`);
    return;
  }
  if (Number(expectedScore) <= 0) {
    alert("Expected score must be greater than zero!");
    return;
  }

  // Show modal first instead of starting generation
  setPendingQuiz({
    name,
    expectedScore: Number(expectedScore),
    totalQuestions: Number(customTotalQuestions),
    topic: customTopic,
    attemptMode: "normal",
    questions: [], // will generate after "Let’s Begin"
  });
  setShowSiamModal(true);
  return;
}


  // --- Abort previous generation if any ---
  if (abortController) abortController.abort();
  const controller = new AbortController();
  setAbortController(controller);
  setIsLoading(true);
  setProgress(0);
  setGeneratedCount(0);

  try {
    const questions = await generateQuiz(
      customTopic,
      Number(customTotalQuestions),
      5,
      (progressInfo) => {
        setProgress(progressInfo.percent);
        setGeneratedCount(progressInfo.totalSoFar);
      },
      controller.signal
    );

    if (questions.length === Number(customTotalQuestions)) {
      setGeneratedQuestions(questions);
      const totalTimeSeconds = questions.length * 30;
      onStart(
        name,
        Number(expectedScore),
        totalTimeSeconds,
        customTopic,
        questions.length,
        "normal",
        questions
      );
    }
  } catch (err) {
    if (err.name === "AbortError") {
      console.log("Quiz generation aborted.");
    } else {
      console.error(err);
      alert("Error generating quiz. Try again.");
    }
  } finally {
    setIsLoading(false);
    setAbortController(null);
  }
};


// Inside component StartForm
useEffect(() => {
  const savedName = localStorage.getItem("quizName");
  if (savedName) {
    setName(savedName);
  }
}, []);


  return (
    <div className="flex flex-col items-center mt-10 px-4 w-full relative">
      {/* Notification Marquee */}
      <div className="fixed top-0 left-0 w-screen overflow-hidden bg-gradient-to-r from-indigo-600 via-pink-500 to-purple-600 text-white py-2 shadow-md z-50">
        <div
          key={currentNotification}
          className="marquee text-sm font-semibold drop-shadow-md tracking-wide"
          style={{ animationDuration: `${marqueeDuration / 1000}s` }}
        >
          {notifications[currentNotification]}
        </div>
      </div>

      {/* Main Quiz Box */}
      <div className="max-w-md w-full p-6 mt-14 bg-white rounded-2xl shadow-lg text-center space-y-4 transition-all duration-300">
        <h1 className="text-3xl font-extrabold text-blue-600">Quiz</h1>

        {/* Topic Select */}
        <select
          className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={topic}
onChange={(e) => {
  if (abortController) abortController.abort(); // stop ongoing generation

  // Reset states
  setIsLoading(false);
  setProgress(0);
  setGeneratedCount(0);
  setCustomTopic("");
  setCustomTotalQuestions("");
  setGeneratedQuestions([]); // ✅ reset old questions

  setTopic(e.target.value);
}}



        >
          <option value="">Select a topic</option>
          {Object.keys(topicsData).map((t) => (
            <option key={t} value={t}>
              {t} {updatedTopics.includes(t) ? "🔥New" : ""}
            </option>
          ))}
          <option value="Custom">Custom</option>
        </select>

        {/* Custom Fields */}
        {topic === "Custom" && (
          <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-400 rounded-xl shadow-md space-y-3">
            <input
              type="text"
              placeholder="Custom Topic Name"
              className="w-full px-3 py-2 rounded-lg border-2 border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
            />
            <input
              type="number"
              placeholder="Total Questions"
              min={1}
              className="w-full px-3 py-2 rounded-lg border-2 border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200"
              value={customTotalQuestions}
              onChange={(e) => setCustomTotalQuestions(e.target.value)}
            />
{customTotalQuestions && customTotalQuestions < 25 && (
  <p className="mt-2 text-sm text-yellow-800 bg-yellow-100 border-l-4 border-yellow-400 rounded-md px-3 py-2 italic flex items-center gap-2 shadow-sm">
    <span>🤔Hmm… {customTotalQuestions} questions might be a little short for proper practice. Adding more could help you prepare better!</span>
  </p>
)}
{customTotalQuestions && customTotalQuestions > 100 && (
  <p className="mt-2 text-sm text-red-800 bg-red-100 border-l-4 border-red-400 rounded-md px-3 py-2 italic flex items-center gap-2 shadow-sm">
    <span>⚠️ {customTotalQuestions} questions is quite a lot. Make sure you have enough time to complete them effectively!</span>
  </p>
)}

          </div>
        )}

{!isOnline && (
  <div className="fixed top-10 left-0 w-screen bg-red-600 text-white py-2 text-center font-semibold shadow-md z-50">
    ⚠️ You are currently offline. Some features (like Custom Quiz) may not work.
  </div>
)}

        {/* Info Box for empty topic */}
        {topic && topic !== "Custom" && totalQuestions === 0 && (
          <div className="mt-2 p-3 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-md font-semibold italic shadow-sm">
            ⚠️ This topic doesn't have any questions yet. Try another topic or check back later!
          </div>
        )}

        {/* Other Info Boxes */}
        {topic === "All" && (
          <div className="mt-2 p-3 bg-gradient-to-r from-blue-50 to-indigo-100 border-l-4 border-indigo-400 text-indigo-700 rounded-md font-semibold italic shadow-sm">
            🧠 You’re going to attempt the <strong>49th BCS Preliminary!</strong>
            <br />
            Take a deep breath, stay calm, and show what you’ve got! 🚀
          </div>
        )}
        {topic === "Revise Mistakes" && (
          <div className="mt-2 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 rounded-md font-semibold italic shadow-sm">
            ⚡ You are entering Revision Mode! Only your previous mistakes and unanswered questions will appear.
          </div>
        )}

        {/* Question/Time Summary */}
        {topic && totalQuestions > 0 && (
          <div className="bg-gray-100 p-3 rounded-lg text-gray-700 mt-2">
            <p>📝 <strong>Questions:</strong> {totalQuestions}</p>
            <p>⏰ <strong>Time:</strong> {totalTimeMinutes} minutes</p>
          </div>
        )}

        {/* Name & Expected Score */}
     <input
  placeholder="Enter your name"
  className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
  value={name}
  onChange={(e) => {
    setName(e.target.value);
    localStorage.setItem("quizName", e.target.value);
  }}
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

{/* Start Button with Progress */}
<button
  className={`w-full relative rounded-2xl overflow-hidden text-white font-bold shadow-lg transition-all duration-300 ${
    name && expectedScore && topic && totalQuestions > 0 && (topic !== "Custom" || isOnline)
      ? isLoading
        ? "bg-gray-900 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700"
      : "bg-gray-400 cursor-not-allowed"
  }`}
  onClick={handleStartClick}
disabled={
  !name ||
  !expectedScore ||
  !topic ||
  totalQuestions === 0 ||
  isLoading ||
  (topic === "Custom" && !isOnline)
}

  style={{ height: "50px" }}
>
  {/* Progress bar for generation */}
  {isLoading && (
    <div
      className="absolute top-0 left-0 h-full rounded-2xl bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600 shadow-lg transition-all duration-700 ease-out overflow-hidden"
      style={{ width: `${progress}%` }}
    >
      <div
        className="h-full w-full"
        style={{
          background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)',
          animation: 'shimmer 1.5s linear infinite',
        }}
      />
    </div>
  )}

  {/* Button text */}
  <span
    className={`relative z-10 flex items-center justify-center h-full w-full text-lg font-semibold ${
      isLoading ? 'animate-pulse-text' : generatedQuestions.length === Number(customTotalQuestions) ? 'animate-bounce-small' : ''
    }`}
  >
    {topic === "Custom"
      ? isLoading
        ? `Generating… (${generatedCount}/${customTotalQuestions})`
        : "Start Quiz"
      : "Start Quiz"}
  </span>

  {/* CSS Animations */}
  <style jsx>{`
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    @keyframes pulse-text {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
    @keyframes bounce-small {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
    }
    .animate-pulse-text {
      animation: pulse-text 1s infinite;
    }
    .animate-bounce-small {
      animation: bounce-small 0.6s ease-in-out;
    }
  `}</style>
</button>


{isLoading && (
  <button
    type="button"
    onClick={() => {
      if (abortController) abortController.abort(); // Stop API generation
      setIsLoading(false);
      setProgress(0);
      setGeneratedCount(0);
      setGeneratedQuestions([]);
      setAbortController(null);
    }}
    className="mt-3 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 via-pink-500 to-red-600 hover:from-red-600 hover:via-pink-600 hover:to-red-700 text-white font-bold py-3 px-4 rounded-2xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 animate-pulse"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
     Stop Generation
  </button>
)}

        {/* Footer Typing */}
        <p className="mt-6 text-sm text-pink-500 font-semibold">
          {typedText}
          {isTyping && (
            <span className="inline-block w-[2px] h-4 bg-pink-500 ml-1 animate-[blink_1s_steps(2)_infinite]" />
          )}
        </p>

        <style jsx>{`
          @keyframes gradient-x {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 2s linear infinite;
          }
          @keyframes blink { 50% { opacity: 0; } }
          @keyframes marquee { 0% { transform: translateX(100vw); } 100% { transform: translateX(-100%); } }
          .marquee {
            display: inline-block;
            white-space: nowrap;
            animation-name: marquee;
            animation-timing-function: linear;
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
          }
        `}</style>
      </div>


<div className="fixed bottom-0 left-0 w-screen h-screen overflow-hidden z-0 pointer-events-none">
  {/* Hearts */}
{hearts.map((heart) => (
  <img
    key={heart.id}
    src={heart.shape}
    alt="heart"
    className={`absolute select-none cursor-pointer ${
      heart.popped ? "pop-heart" : "animate-float-love"
    }`}
    style={{
      left: `${heart.left}%`,
      width: `${heart.size}px`,
      height: `${heart.size}px`,
      animationDelay: `${heart.delay}s`,
      animationDuration: `${heart.duration}s`,
      bottom: `-100px`,
      pointerEvents: "auto",
    }}
    onClick={(e) => handlePop(heart.id, e)}
  />
))}


  {/* Floating message effects */}
  {effects.map((effect) => (
    <div
      key={effect.id}
      className="absolute flex items-center justify-center animate-effect"
      style={{
        left: effect.x,
        top: effect.y,
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <span className="text-black font-bold text-sm">{effect.message}</span>
    </div>
  ))}
  {/* Sparkles */}
{sparkles.map(s => (
  <div
    key={s.id}
    className="absolute bg-yellow-400 rounded-full animate-sparkle"
    style={{
      width: `${s.size * 1.5}px`,    // 🔹 increase size
      height: `${s.size * 1.5}px`,   // 🔹 increase size
      left: s.x,
      top: s.y,
      pointerEvents: 'none',
      zIndex: 9999,
      '--dx': `${s.dx * 1.5}px`,     // 🔹 slightly wider spread
      '--dy': `${s.dy * 1.5}px`,     // 🔹 slightly wider spread
    }}
  />
))}


<style jsx>{`
  /* ❤️ Float animation — perfectly upright now */
  @keyframes float-love {
    0% {
      transform: translateY(0) scale(1);
      opacity: 0;
    }
    5% {
      opacity: 1;
    }
    100% {
      transform: translateY(-120vh) scale(1);
      opacity: 0;
    }
  }

@keyframes pop {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  40% {
    transform: scale(1.5); /* smooth grow */
    opacity: 0.9;
  }
  70% {
    transform: scale(1.2); /* slight shrink for natural effect */
    opacity: 0.7;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}

.pop-heart {
  animation: pop 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  position: absolute;
  will-change: transform, opacity;
}

  /* ✨ Floating text pop animation — slow zoom-in then fade */
  @keyframes effect-float {
    0% {
      opacity: 1;
      transform: translate(-50%, -50%) translateY(0) scale(1);
    }
    60% {
      transform: translate(-50%, -50%) translateY(-30px) scale(1.1);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -50%) translateY(-60px) scale(1.1);
    }
  }

  .animate-effect {
    animation: effect-float 2.5s ease-out forwards;
  }

  .animate-float-love {
    position: absolute;
    animation-name: float-love;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    will-change: transform, opacity;
  }

  .pop-heart {
    animation: pop 0.5s forwards;
    position: absolute;
    will-change: transform, opacity;
    /* Add sparkle pseudo-element */
    --spark-size: 8px;
  }
  
  .pop-heart::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: var(--spark-size);
    height: var(--spark-size);
    background: radial-gradient(circle, gold 0%, rgba(255, 215, 0, 0) 70%);
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
    animation: sparkle 0.5s forwards;
  }

@keyframes sparkle-move {
  0% {
    opacity: 1;
    transform: translate(0px, 0px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(var(--dx), var(--dy)) scale(1.5); /* smoother and bigger */
  }
}

.animate-sparkle {
  animation: sparkle-move 1s ease-out forwards; /* slower & smoother */
}



`}</style>

</div>
{showSiamModal && pendingQuiz && (
  <div
    className="fixed inset-0 bg-black/40 backdrop-blur-lg flex items-center justify-center z-[9999] animate-fadeIn"
    onClick={(e) => {
      if (e.target === e.currentTarget) {
        setShowSiamModal(false);
        setPendingQuiz(null);
      }
    }}
  >
    <div
      className="relative bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 px-10 py-10 rounded-xl shadow-2xl text-white w-[500px] text-center border border-white/30 backdrop-blur-xl animate-scaleIn"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-2xl font-extrabold mb-3 drop-shadow-md">Hey Love 💖</h2>
<p className="text-sm mb-5 leading-relaxed font-medium text-center">
  This tough time will pass, my love 💖, and remember, <br />
  your man is always with you, no matter what. 💫<br />
  All your worries will fade, and your dreams will come true. 🌈<br />
  Just study hard and believe in yourself<br />
  Let’s make it happen together! 🚀
</p>




    <button
  onClick={async () => {
    if (!pendingQuiz) return;

    setShowSiamModal(false);

    if (topic === "Custom") {
      // Start generating questions now
      setIsLoading(true);
      const controller = new AbortController();
      setAbortController(controller);
      try {
        const questions = await generateQuiz(
          pendingQuiz.topic,
          pendingQuiz.totalQuestions,
          5,
          (progressInfo) => {
            setProgress(progressInfo.percent);
            setGeneratedCount(progressInfo.totalSoFar);
          },
          controller.signal
        );

        const totalTimeSeconds = questions.length * 30;

        onStart(
          pendingQuiz.name,
          pendingQuiz.expectedScore,
          totalTimeSeconds,
          pendingQuiz.topic,
          questions.length,
          "normal",
          questions
        );
      } catch (err) {
        console.error(err);
        alert("Error generating quiz. Try again.");
      } finally {
        setIsLoading(false);
        setAbortController(null);
        setPendingQuiz(null);
      }
    } else {
      // Normal topics
      const totalTimeSeconds = (topicsData[topic] || []).length * (topic === "Math & IQ" ? 60 : 30);
      onStart(
        pendingQuiz.name,
        pendingQuiz.expectedScore,
        totalTimeSeconds,
        topic,
        pendingQuiz.totalQuestions,
        pendingQuiz.attemptMode,
        topicsData[topic] || []
      );
      setPendingQuiz(null);
    }
  }}
  className="mt-3 bg-white text-pink-600 font-bold px-8 py-3 rounded-full shadow-md hover:scale-105 transition-all cursor-pointer"
>
  Let’s Begin 💫
</button>


      <div className="absolute inset-0 rounded-xl border-2 border-white/20 animate-glow pointer-events-none"></div>
    </div>

    <style jsx>{`
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes scaleIn {
        0% { transform: scale(0.8); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
      }
      @keyframes glow {
        0% { box-shadow: 0 0 10px rgba(255,255,255,0.3); }
        50% { box-shadow: 0 0 25px rgba(255,255,255,0.6); }
        100% { box-shadow: 0 0 10px rgba(255,255,255,0.3); }
      }
      .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      .animate-scaleIn { animation: scaleIn 0.4s ease-out; }
      .animate-glow { animation: glow 2s ease-in-out infinite; }
    `}</style>
  </div>
)}

    </div>
  );
} 