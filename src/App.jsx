import React, { useState } from "react";
import StartForm from "./components/StartForm";
import Quiz from "./components/Quiz";
import Result from "./components/Result";

// 🧩 Import question sets
import EnglishQuestions from "./questions/EnglishQuestions";
import BanglaQuestions from "./questions/BanglaQuestions";
import BangladeshAffairs from "./questions/BangladeshAffairs";
import InternationalAffairs from "./questions/InternationalAffairs";
import MathAndIQQuestions from "./questions/MathAndIQQuestions";
import AllQuestions from "./questions/AllQuestions";

export default function App() {
  const [step, setStep] = useState("start");
  const [user, setUser] = useState({ name: "", expectedScore: "", topic: "" });
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [totalTime, setTotalTime] = useState(0);

  const topicsData = {
    English: EnglishQuestions,
    Bangla: BanglaQuestions,
    "Bangladesh Affairs": BangladeshAffairs,
    "International Affairs": InternationalAffairs,
    Math: MathAndIQQuestions,
    All: AllQuestions,
  };

  // 🚀 Start Quiz
// 🚀 Start Quiz
function handleStart(name, expectedScore, totalTime, topic, totalQuestions) {
  const selectedQuestions = topicsData[topic] || [];

  // No shuffle — keep original order
  setUser({ name, expectedScore, topic });
  setQuestions(selectedQuestions.slice(0, totalQuestions)); // load correct number of questions
  setTotalTime(totalTime);
  setStep("quiz");
}


  // 📝 Submit Answers
  function handleSubmit(ans) {
    setAnswers(ans);
    setStep("result");
  }

  // 🔄 Restart Quiz
  function handleRestart() {
    setStep("start");
    setQuestions([]);
    setAnswers({});
    setUser({ name: "", expectedScore: "", topic: "" });
    setTotalTime(0);
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {step === "start" && <StartForm onStart={handleStart} />}

      {step === "quiz" && (
        <Quiz
          questions={questions}
          onSubmit={handleSubmit}
          totalTime={totalTime}
          topic={user.topic}
        />
      )}

      {step === "result" && (
        <Result
          name={user.name}
          expectedScore={user.expectedScore}
          questions={questions}
          answers={answers}
          onRestart={handleRestart}
          topic={user.topic}
        />
      )}
    </div>
  );
}
