import React, { useState } from "react";
import StartForm from "./components/StartForm";
import Quiz from "./components/Quiz";
import Result from "./components/Result";

// 🧩 Local question sets
import EnglishQuestions from "./questions/EnglishQuestions";
import BanglaQuestions from "./questions/BanglaQuestions";
import BangladeshAffairs from "./questions/BangladeshAffairs";
import InternationalAffairs from "./questions/InternationalAffairs";
import MathAndIQQuestions from "./questions/MathAndIQQuestions";
import CurrentAffairs from "./questions/CurrentAffairs";
import AllQuestions from "./questions/AllQuestions";
import Revision from "./questions/Revision";

export default function App() {
  const [step, setStep] = useState("start");
  const [user, setUser] = useState({ name: "", expectedScore: "", topic: "", mode: "normal" });
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [totalTime, setTotalTime] = useState(0);

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

  // 🚀 Start Quiz
  function handleStart(
    name,
    expectedScore,
    totalTime,
    topic,
    totalQuestions,
    attemptMode = "normal",
    generatedQuestions = [] // for custom Gemini topics
  ) {
    const selectedQuestions = generatedQuestions.length
      ? generatedQuestions
      : (topicsData[topic] || []).slice(0, totalQuestions);

    setUser({ name, expectedScore, topic, mode: attemptMode });
    setQuestions(selectedQuestions);
    setTotalTime(totalTime);
    setStep("quiz");
  }

  // 📝 Submit Answers
  function handleSubmit(ans) {
    setAnswers(ans);
    setStep("result");
  }

  // 🔄 Restart Quiz
function handleRestart(restartQuestions = null, attemptMode = "normal") {
  setStep("start");
  setQuestions(restartQuestions || []);
  setAnswers({});
  setUser(prev => ({
    name: prev.name || "",
    expectedScore: prev.expectedScore || "",
    topic: prev.topic || "",
    mode: attemptMode,
  }));
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
          mode={user.mode}
        />
      )}
    </div>
  );
}
