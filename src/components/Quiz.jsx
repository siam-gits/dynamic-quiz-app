import React, { useState, useEffect, useRef } from "react";
import useTimer from "../hooks/useTimer";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function Quiz({ questions, onSubmit, totalTime }) {
  const [answers, setAnswers] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [unansweredIndices, setUnansweredIndices] = useState([]);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [hasHalfAnnounced, setHasHalfAnnounced] = useState(false);
  const [hasOneMinAnnounced, setHasOneMinAnnounced] = useState(false);

  const questionRefs = useRef([]);

  const timeLeft = useTimer(totalTime, () => onSubmit(answers));

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

const answeredCount = Object.keys(answers).length;
const [isTimerMinimized, setIsTimerMinimized] = useState(false);
const [isCounterMinimized, setIsCounterMinimized] = useState(false);

const timePercent = (timeLeft / totalTime) * 100;
const [showFixedTimer, setShowFixedTimer] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    const timerPosition = document.getElementById("main-timer")?.offsetTop || 0;
    setShowFixedTimer(window.scrollY > timerPosition + 50);
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

// Scroll button states
const [showScrollButton, setShowScrollButton] = useState(false);
const [isScrollingUp, setIsScrollingUp] = useState(false);
const [isScrolling, setIsScrolling] = useState(false);
const scrollTimeout = useRef(null);
const lastScrollY = useRef(0);

useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const totalHeight = document.body.scrollHeight;
    const scrollBottom = currentScrollY + window.innerHeight;

    // Detect scroll direction
    const scrollingUp = currentScrollY < lastScrollY.current;
    lastScrollY.current = currentScrollY;

    // Show button after 150px scroll
    setShowScrollButton(currentScrollY > 150);

    // Show button during active scroll
    setIsScrolling(true);
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 2000);

    // Show up arrow if scrolling up OR at bottom
    setIsScrollingUp(scrollingUp || scrollBottom >= totalHeight - 50);
  };

  window.addEventListener("scroll", handleScroll);
  return () => {
    window.removeEventListener("scroll", handleScroll);
    clearTimeout(scrollTimeout.current);
  };
}, []);

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      setVoices(v);
      const defaultVoice =
        v.find((vv) => /Google US English/i.test(vv.name)) ||
        v.find((vv) => /English/i.test(vv.lang)) ||
        v[0];
      setSelectedVoice(defaultVoice);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // Voice reminders
  useEffect(() => {
    if (!selectedVoice) return;

    if (!hasHalfAnnounced && timeLeft <= totalTime / 2) {
      const u = new SpeechSynthesisUtterance(
        "Half of your time has passed. Please manage your pace."
      );
      u.rate = 0.8;
      u.pitch = 1;
      u.volume = 1;
      u.voice = selectedVoice;
      window.speechSynthesis.speak(u);
      setHasHalfAnnounced(true);
    }

    if (!hasOneMinAnnounced && timeLeft <= 60) {
      const u = new SpeechSynthesisUtterance(
        "Only one minute remaining. Please finalize your answers."
      );
      u.rate = 0.8;
      u.pitch = 1;
      u.volume = 1;
      u.voice = selectedVoice;
      window.speechSynthesis.speak(u);
      setHasOneMinAnnounced(true);
    }
  }, [timeLeft, totalTime, hasHalfAnnounced, hasOneMinAnnounced, selectedVoice]);

  // Handle option select
  const handleSelect = (qIndex, option) => {
    setAnswers((prev) => {
      const copy = { ...prev };
      if (copy[qIndex] === option) {
        delete copy[qIndex]; // deselect
      } else {
        copy[qIndex] = option;
        // Remove highlight/pulse if it was highlighted
        if (questionRefs.current[qIndex]) {
          questionRefs.current[qIndex].classList.remove(
            "border-red-500",
            "ring-2",
            "ring-red-200",
            "animate-pulse"
          );
        }
      }
      return copy;
    });
  };

  // Handle submit click
  const handleSubmitClick = () => {
    const unanswered = questions
      .map((_, idx) => idx)
      .filter((idx) => !answers.hasOwnProperty(idx));
    if (unanswered.length > 0) {
      setUnansweredIndices(unanswered);
      setShowModal(true);
    } else {
      onSubmit(answers);
    }
  };

  // Check unanswered button
  const handleCheckUnanswered = () => {
    setShowModal(false);
    if (unansweredIndices.length > 0) {
      // Scroll to first unanswered
      questionRefs.current[unansweredIndices[0]]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      // Highlight all unanswered with pulse
      unansweredIndices.forEach((idx) => {
        questionRefs.current[idx]?.classList.add(
          "border-red-500",
          "ring-2",
          "ring-red-200",
          "animate-pulse"
        );
      });
    }
  };

  const confirmSubmit = () => {
    setShowModal(false);
    onSubmit(answers);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8 relative">
      {/* Timer */}
      <div className="text-center mb-4">
        <p className="text-lg font-medium text-gray-600 mb-1">Remaining Time</p>
        <h2 className="text-4xl font-bold text-gray-800">{formatTime(timeLeft)}</h2>
      </div>

      {/* Timer Bar */}
      <div className="w-full bg-white rounded-full h-4 mb-6 border border-gray-300 overflow-hidden">
        <div
          className="h-4 rounded-full transition-all"
          style={{
            width: `${100 - timePercent}%`,
            background: `linear-gradient(to right, green, yellow, red)`,
          }}
        ></div>
      </div>

      {/* Questions */}
      {questions.map((q, i) => (
    <div
      key={i}
      ref={(el) => (questionRefs.current[i] = el)}
      className="p-3 sm:p-4 bg-white rounded-xl shadow-md border-l-4 border-blue-400 transition max-w-full sm:max-w-[95%] mx-auto"
    >
      <p className="font-semibold mb-2">{i + 1}. {q.question}</p>
      {q.image && <img src={q.image} alt="Question visual" className="mb-3 max-w-full rounded-lg shadow-sm" />}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {q.options.map((opt, j) => {
          const isSelected = answers[i] === opt;
          return (
            <label
              key={j}
              onClick={(e) => { e.preventDefault(); handleSelect(i, opt); }}
              className={`cursor-pointer flex items-center p-2 border rounded-lg transition ${
                isSelected ? "bg-blue-500 text-white border-blue-500" : "hover:bg-blue-50"
              }`}
            >
              <input
                type="radio"
                name={`q-${i}`}
                value={opt}
                checked={isSelected}
                readOnly
                className="mr-2 accent-blue-600 pointer-events-none"
              />
              {opt}
            </label>
              );
            })}
          </div>
        </div>
      ))}

      {/* Submit Button */}
      <div className="text-center">
        <button
          onClick={handleSubmitClick}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition transform hover:-translate-y-1"
        >
          Submit Quiz
        </button>
      </div>
{/* Fixed Timer at top-right */}
<div
  className={`fixed top-4 right-0 z-50 transition-all duration-300`}
  onClick={() => setIsTimerMinimized(!isTimerMinimized)}
>
  <div
    className={`bg-white shadow-lg flex flex-col items-center overflow-hidden cursor-pointer
      ${isTimerMinimized ? "w-1 h-12 rounded-l-full bg-gray-300" : "w-28 px-4 py-2 rounded-l-xl"}`}
  >
    {!isTimerMinimized && (
      <>
        <p className="text-gray-600 text-sm text-center">Remaining Time</p>
        <h2 className="text-lg font-bold text-gray-800 text-center">{formatTime(timeLeft)}</h2>
      </>
    )}
  </div>
</div>


{/* Answered Counter at top-left */}
<div
  className={`fixed top-4 left-0 z-50 transition-all duration-300`}
  onClick={() => setIsCounterMinimized(!isCounterMinimized)}
>
  <div
    className={`bg-white shadow-lg flex flex-col items-center overflow-hidden cursor-pointer
      ${isCounterMinimized ? "w-1 h-12 rounded-r-full bg-gray-300" : "w-28 px-4 py-2 rounded-r-xl"}`}
  >
    {!isCounterMinimized && (
      <>
        <p className="text-gray-500 text-xs uppercase tracking-wider text-center">Answered</p>
        <h2 className="text-lg font-bold text-gray-800 text-center">
          {answeredCount}/{questions.length}
        </h2>
      </>
    )}
  </div>
</div>

{/* Scroll Toggle Button */}
{showScrollButton && isScrolling && (
  <div className="fixed bottom-6 right-1 z-50">
    <button
      onClick={() => {
        if (isScrollingUp) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        }
      }}
      className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full p-4 shadow-xl hover:scale-110 transition transform"
      title={isScrollingUp ? "Scroll to Top" : "Scroll to Bottom"}
    >
      {isScrollingUp ? <ArrowUp size={25} color="#fff" /> : <ArrowDown size={25} color="#fff" />}
    </button>
  </div>
)}






      {/* Simple Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Unanswered Questions</h2>
            <p className="text-gray-700">
              You have {unansweredIndices.length} unanswered question
              {unansweredIndices.length > 1 ? "s" : ""}. Are you sure you want to submit?
            </p>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={handleCheckUnanswered}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Check Unanswered
              </button>
              <button
                onClick={confirmSubmit}
                className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
              >
                Submit Anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
