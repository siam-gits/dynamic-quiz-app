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

  const updatedTopics = ["All", "English", "Revise Mistakes"];

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

  const timePerQuestionMinutes = topic === "Math & IQ" ? 1 : 0.5;
  const totalQuestions =
    topic === "Custom" && customTotalQuestions
      ? Number(customTotalQuestions)
      : (topicsData[topic] || []).length;
  const totalTimeMinutes = (totalQuestions * timePerQuestionMinutes).toFixed(1);

  const handleStartClick = async () => {
    if (!name.trim() || !expectedScore.trim() || !topic) {
      alert("Please enter your name, expected score, and select a topic!");
      return;
    }

    if (topic === "Custom" && (!customTopic.trim() || !customTotalQuestions)) {
      alert("Please fill in custom topic name and total questions!");
      return;
    }

    if (Number(expectedScore) <= 0) {
      alert("Expected score must be greater than 0!");
      return;
    }

    let selectedQuestions = topicsData[topic] || [];
    let startTopic = topic;

    if (topic === "Custom") {
      setIsLoading(true);
      const questions = await generateQuiz(customTopic, Number(customTotalQuestions));
      setIsLoading(false);

      if (questions.length === 0) {
        alert("Failed to generate quiz questions. Please try again.");
        return;
      }

      selectedQuestions = questions;
      startTopic = customTopic;
    }

    if (Number(expectedScore) > selectedQuestions.length) {
      alert(
        `Your expected score cannot exceed total questions (${selectedQuestions.length})`
      );
      return;
    }

    const totalTimeSeconds = selectedQuestions.length * timePerQuestionMinutes * 60;
    const attemptMode = topic === "Revise Mistakes" ? "revision" : "normal";

    onStart(
      name,
      Number(expectedScore),
      totalTimeSeconds,
      startTopic,
      selectedQuestions.length,
      attemptMode,
      selectedQuestions
    );
  };

  return (
    <div className="flex flex-col items-center mt-10 px-4 w-full relative">
      {/* 🔔 Notification slider */}
      <div className="fixed top-0 left-0 w-screen overflow-hidden bg-gradient-to-r from-indigo-600 via-pink-500 to-purple-600 text-white py-2 shadow-md z-50">
        <div className="inline-block animate-marquee whitespace-nowrap text-sm font-semibold drop-shadow-md tracking-wide">
          🔥 New questions added in{" "} 
          <strong className="text-yellow-300">{updatedTopics.join(", ")}</strong>! 🎯
        </div>
      </div>

      {/* Main Quiz Box */}
      <div className="max-w-md w-full p-6 mt-14 bg-white rounded-2xl shadow-lg text-center space-y-4 transition-all duration-300">
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
          <option value="Custom">Custom</option>
        </select>

        {/* Custom Fields */}
        {topic === "Custom" && (
          <div className="mt-2 space-y-2">
            <input
              placeholder="Custom Topic Name"
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
            />
            <input
              type="number"
              placeholder="Total Questions"
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              value={customTotalQuestions}
              onChange={(e) => setCustomTotalQuestions(e.target.value)}
              min={1}
            />
          </div>
        )}

        {/* Info Boxes */}
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

        {/* Inputs */}
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
          disabled={!name || !expectedScore || !topic || totalQuestions === 0 || isLoading}
        >
          {isLoading ? "Generating..." : "Start Quiz"}
        </button>

        <p className="mt-6 text-sm text-pink-500 font-semibold">
          {typedText}
          {isTyping && (
            <span className="inline-block w-[2px] h-4 bg-pink-500 ml-1 animate-[blink_1s_steps(2)_infinite]" />
          )}
        </p>

        <style jsx>{`
          @keyframes blink { 50% { opacity: 0; } }
          @keyframes marquee { 0% { transform: translateX(100vw); } 100% { transform: translateX(-100%); } }
          .animate-marquee { display: inline-block; animation: marquee 15s linear infinite; }
          @media (min-width: 768px) { .animate-marquee { animation-duration: 20s; } }
          @media (min-width: 1024px) { .animate-marquee { animation-duration: 25s; } }
        `}</style>
      </div>
    </div>
  );
}
