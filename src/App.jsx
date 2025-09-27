// App.jsx
import React, { useState } from "react";
import StartForm from "./components/StartForm";
import Quiz from "./components/Quiz";
import Result from "./components/Result";

export default function App() {
  const [step, setStep] = useState("start");
  const [user, setUser] = useState({ name: "", topic: "" });
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  // Replace your previous handleStart with this
  function handleStart(name, topic) {
    setUser({ name, topic });

    // Dummy questions
    const englishQuestions = [
  { question: "Choose the correct sentence: She ___ like tea.", options: ["don't", "doesn't likes", "doesn't like", "don't likes"], correct: "doesn't like" },
  { question: "Identify the error: 'Neither the teacher nor the students ___ aware of the change.'", options: ["Neither", "was", "aware", "of"], correct: "was" },
  { question: "Choose the correct sentence: He is ___ than his brother.", options: ["more smarter", "more smart", "smarter", "more smarter"], correct: "smarter" },
  { question: "Choose the synonym of 'benevolent'", options: ["Malevolent", "Generous", "Indifferent", "Hostile"], correct: "Generous" },
  { question: "Choose the antonym of 'ardent'", options: ["Indifferent", "Passionate", "Eager", "Zealous"], correct: "Indifferent" },
  { question: "His explanation was so ___ that everyone understood the complex topic easily.", options: ["Ambiguous", "Lucid", "Obscure", "Vague"], correct: "Lucid" },
  { question: "Choose the correct form: I ___ to the market yesterday.", options: ["go", "goes", "went", "gone"], correct: "went" },
  { question: "Choose the correct preposition: He is good ___ mathematics.", options: ["in", "at", "on", "for"], correct: "at" },
  { question: "Select the correct article: She bought ___ apple.", options: ["a", "an", "the", "no article"], correct: "an" },
  { question: "Choose the correct tense: By next year, I ___ completed my degree.", options: ["will", "will have", "have", "had"], correct: "will have" },
  { question: "Choose the synonym of 'quick'", options: ["Slow", "Fast", "Lazy", "Weak"], correct: "Fast" },
  { question: "Choose the antonym of 'scarce'", options: ["Rare", "Abundant", "Limited", "Few"], correct: "Abundant" },
  { question: "Fill in the blank: He speaks English ___ than I do.", options: ["good", "well", "better", "best"], correct: "better" },
  { question: "Choose the correct spelling:", options: ["Occurence", "Occurrence", "Ocurrence", "Ocurrense"], correct: "Occurrence" },
  { question: "Select the correct plural form: Child", options: ["Childs", "Childes", "Children", "Childer"], correct: "Children" },
  { question: "Choose the correct conjunction: I wanted to go out, ___ it was raining.", options: ["so", "but", "and", "or"], correct: "but" },
  { question: "Choose the correct passive voice: 'The cat chased the mouse.'", options: ["The mouse was chased by the cat", "The mouse chased the cat", "The cat was chased by the mouse", "The mouse is chasing the cat"], correct: "The mouse was chased by the cat" },
  { question: "Choose the correct sentence: 'If I ___ rich, I would travel the world.'", options: ["am", "were", "was", "be"], correct: "were" },
  { question: "Select the correct word: 'He has a ___ of experience in teaching.'", options: ["lot", "lots", "few", "little"], correct: "lot" },
  { question: "Choose the correct idiom: 'Break the ___' means to initiate conversation.", options: ["ice", "glass", "stone", "wall"], correct: "ice" },
  { question: "Choose the correct sentence: 'She ___ to the store every Saturday.'", options: ["goes", "going", "gone", "go"], correct: "goes" },
  { question: "Identify the error: 'He don't like playing football.'", options: ["He", "don't", "like", "playing"], correct: "don't" },
  { question: "Choose the correct form: 'I ___ a book when you called.'", options: ["was reading", "am reading", "read", "had read"], correct: "was reading" },
  { question: "Select the correct preposition: 'She is interested ___ learning new languages.'", options: ["in", "on", "at", "to"], correct: "in" },
  { question: "Choose the correct article: 'I saw ___ elephant in the zoo.'", options: ["a", "an", "the", "no article"], correct: "an" },
  { question: "Choose the correct sentence: 'He ___ to the gym every morning.'", options: ["go", "goes", "going", "gone"], correct: "goes" },
  { question: "Identify the error: 'Neither the teacher nor the students was absent.'", options: ["Neither", "the", "was", "absent"], correct: "was" },
  { question: "Choose the correct form: 'By the time you arrive, I ___ my homework.'", options: ["will finish", "finish", "had finished", "will have finished"], correct: "will have finished" },
  { question: "Select the correct preposition: 'She is fond ___ painting.'", options: ["of", "in", "on", "at"], correct: "of" },
  { question: "Choose the correct sentence: 'He ___ a letter when I saw him.'", options: ["writes", "is writing", "was writing", "had written"], correct: "was writing" },
  { question: "Identify the error: 'She can sings very well.'", options: ["She", "can", "sings", "very"], correct: "sings" },
  { question: "Choose the correct form: 'They ___ to the party if they had been invited.'", options: ["will go", "would go", "would have gone", "had gone"], correct: "would have gone" },
  { question: "Select the correct preposition: 'He is good ___ playing chess.'", options: ["in", "on", "at", "for"], correct: "at" },
  { question: "Choose the correct sentence: 'She ___ to the market every Sunday.'", options: ["go", "goes", "going", "gone"], correct: "goes" },
  { question: "Identify the error: 'I have seen him yesterday.'", options: ["I", "have", "seen", "yesterday"], correct: "have" },
  { question: "Choose the correct form: 'By next month, I ___ my project.'", options: ["complete", "will complete", "will have completed", "had completed"], correct: "will have completed" },
  { question: "Select the correct preposition: 'She is married ___ a doctor.'", options: ["to", "with", "by", "for"], correct: "to" },
  { question: "Choose the correct sentence: 'He ___ a book when I entered the room.'", options: ["reads", "is reading", "was reading", "had read"], correct: "was reading" },
  { question: "Identify the error: 'Neither the manager nor the employees was present.'", options: ["Neither", "the", "was", "present"], correct: "was" },
  { question: "Choose the correct form: 'I ___ to the store when it started raining.'", options: ["go", "went", "was going", "had gone"], correct: "was going" },
  { question: "Select the correct preposition: 'She is interested ___ learning new languages.'", options: ["in", "on", "at", "to"], correct: "in" },
  { question: "Choose the correct sentence: 'They ___ to the park every weekend.'", options: ["go", "goes", "going", "gone"], correct: "go" },
  { question: "Identify the error: 'He don't know the answer.'", options: ["He", "don't", "know", "the"], correct: "don't" },
  { question: "Choose the correct form: 'She ___ a letter when I called her.'", options: ["writes", "is writing", "was writing", "had written"], correct: "was writing" },
  { question: "Select the correct preposition: 'He is afraid ___ dogs.'", options: ["of", "in", "on", "at"], correct: "of" },
  { question: "Choose the correct sentence: 'I ___ to the gym every morning.'", options: ["go", "goes", "going", "gone"], correct: "go" },
  { question: "Choose the synonym of 'abundant'", options: ["Plentiful", "Rare", "Limited", "Few"], correct: "Plentiful" },
  { question: "Choose the antonym of 'optimistic'", options: ["Hopeful", "Pessimistic", "Confident", "Cheerful"], correct: "Pessimistic" },
  { question: "Select the correct word: 'He is very ___ in solving problems.'", options: ["efficient", "inefficient", "lazy", "weak"], correct: "efficient" },
  { question: "Fill in the blank: 'We should ___ the truth.'", options: ["hide", "conceal", "reveal", "ignore"], correct: "reveal" },
  { question: "Choose the correct idiom: 'Hit the ___' means to do something perfectly.", options: ["nail", "rock", "stone", "board"], correct: "nail" },
  { question: "Choose the correct sentence: 'Neither of them ___ ready for the test.'", options: ["is", "are", "was", "were"], correct: "is" },
  { question: "Identify the error: 'She has went to the market.'", options: ["She", "has", "went", "market"], correct: "went" },
  { question: "Choose the correct form: 'If he had studied, he ___ passed the exam.'", options: ["would", "would have", "will", "had"], correct: "would have" },
  { question: "Select the correct preposition: 'He is capable ___ doing great work.'", options: ["of", "in", "at", "on"], correct: "of" },
  { question: "Choose the correct sentence: 'I ___ seen that movie before.'", options: ["have", "has", "had", "having"], correct: "have" },
  { question: "Identify the error: 'She don't like coffee.'", options: ["She", "don't", "like", "coffee"], correct: "don't" },
  { question: "Choose the correct form: 'By the time he arrives, we ___ dinner.'", options: ["will have finished", "finish", "finished", "have finished"], correct: "will have finished" },
  { question: "Select the correct preposition: 'He is married ___ a famous singer.'", options: ["to", "with", "by", "for"], correct: "to" },
  { question: "Choose the correct sentence: 'I wish I ___ taller.'", options: ["am", "was", "were", "be"], correct: "were" },
  { question: "Identify the error: 'Neither of the answers are correct.'", options: ["Neither", "of", "are", "correct"], correct: "are" },
  { question: "Choose the synonym of 'arduous'", options: ["Easy", "Difficult", "Simple", "Quick"], correct: "Difficult" },
  { question: "Choose the antonym of 'frequent'", options: ["Often", "Rare", "Regular", "Common"], correct: "Rare" },
  { question: "Fill in the blank: 'He spoke ___ during the meeting.'", options: ["loudly", "soft", "quiet", "silent"], correct: "loudly" },
  { question: "Choose the correct idiom: 'Bite the ___' means to face a difficult situation.", options: ["bullet", "stone", "nail", "dust"], correct: "bullet" },
  { question: "Choose the correct sentence: 'I have been waiting ___ two hours.'", options: ["since", "for", "at", "on"], correct: "for" },
  { question: "Identify the error: 'He did not knew the answer.'", options: ["did", "not", "knew", "answer"], correct: "knew" },
  { question: "Choose the correct form: 'I ___ been there before.'", options: ["has", "have", "had", "having"], correct: "have" },
  { question: "Select the correct preposition: 'He is interested ___ learning new skills.'", options: ["in", "on", "at", "for"], correct: "in" },
  { question: "Choose the correct sentence: 'She ___ working here for five years.'", options: ["is", "has been", "have", "was"], correct: "has been" },
  { question: "Identify the error: 'She don't know what to do.'", options: ["She", "don't", "know", "what"], correct: "don't" },
  { question: "Choose the correct form: 'If I had enough money, I ___ a car.'", options: ["will buy", "would buy", "buy", "bought"], correct: "would buy" },
  { question: "Select the correct preposition: 'He is capable ___ achieving great results.'", options: ["of", "in", "at", "for"], correct: "of" },
  { question: "Choose the correct sentence: 'I wish I ___ speak French.'", options: ["can", "could", "may", "will"], correct: "could" },
  { question: "Identify the error: 'Neither of the options were correct.'", options: ["Neither", "of", "were", "correct"], correct: "were" },
  { question: "Choose the synonym of 'meticulous'", options: ["Careless", "Precise", "Sloppy", "Lazy"], correct: "Precise" },
  { question: "Choose the antonym of 'timid'", options: ["Shy", "Bold", "Fearful", "Weak"], correct: "Bold" },
  { question: "Fill in the blank: 'She speaks English ___ than her brother.'", options: ["good", "well", "better", "best"], correct: "better" },
  { question: "Choose the correct idiom: 'Costs an arm and a ___' means very expensive.", options: ["leg", "hand", "eye", "ear"], correct: "leg" },
  { question: "Choose the correct sentence: 'He ___ going to the market.'", options: ["is", "are", "am", "be"], correct: "is" },
  { question: "Identify the error: 'She don't likes apples.'", options: ["She", "don't", "likes", "apples"], correct: "don't" },
  { question: "Choose the correct form: 'By the time you come, I ___ finished my work.'", options: ["will have", "will", "have", "had"], correct: "will have" },
  { question: "Select the correct preposition: 'He is worried ___ the exam.'", options: ["about", "on", "at", "for"], correct: "about" },
  { question: "Choose the correct sentence: 'I have never ___ to Paris.'", options: ["go", "went", "gone", "been"], correct: "been" },
  { question: "Identify the error: 'He did not knew the answer.'", options: ["did", "not", "knew", "answer"], correct: "knew" },
  { question: "Choose the correct form: 'If she had studied, she ___ passed the exam.'", options: ["would", "would have", "will", "had"], correct: "would have" },
  { question: "Select the correct preposition: 'He is famous ___ his achievements.'", options: ["for", "of", "by", "at"], correct: "for" },
  { question: "Choose the correct sentence: 'She ___ to the store every day.'", options: ["go", "goes", "going", "gone"], correct: "goes" },
  { question: "Identify the error: 'Neither of them were present.'", options: ["Neither", "of", "were", "present"], correct: "were" },
  { question: "Choose the synonym of 'obscure'", options: ["Clear", "Unclear", "Bright", "Visible"], correct: "Unclear" },
  { question: "Choose the antonym of 'generous'", options: ["Kind", "Stingy", "Charitable", "Giving"], correct: "Stingy" },
  { question: "Fill in the blank: 'He completed the work ___ time.'", options: ["on", "in", "at", "for"], correct: "on" },
  { question: "Choose the correct idiom: 'Under the weather' means ___", options: ["sick", "happy", "angry", "tired"], correct: "sick" },
  { question: "Choose the correct sentence: 'I ___ been working here for five years.'", options: ["have", "has", "had", "having"], correct: "have" },
  { question: "Identify the error: 'She don't like watching TV.'", options: ["She", "don't", "like", "watching"], correct: "don't" },
  { question: "Choose the correct form: 'By next year, I ___ completed my studies.'", options: ["will", "will have", "have", "had"], correct: "will have" },
  { question: "Select the correct preposition: 'He is married ___ a teacher.'", options: ["to", "with", "by", "for"], correct: "to" },
  { question: "Choose the correct sentence: 'I wish I ___ taller.'", options: ["am", "was", "were", "be"], correct: "were" },
  { question: "Identify the error: 'Neither of the answers are correct.'", options: ["Neither", "of", "are", "correct"], correct: "are" },
  { question: "Choose the synonym of 'arduous'", options: ["Easy", "Difficult", "Simple", "Quick"], correct: "Difficult" },
  { question: "Choose the antonym of 'frequent'", options: ["Often", "Rare", "Regular", "Common"], correct: "Rare" },
  { question: "Fill in the blank: 'He spoke ___ during the meeting.'", options: ["loudly", "soft", "quiet", "silent"], correct: "loudly" },
  { question: "Choose the correct idiom: 'Bite the bullet' means ___", options: ["face a difficult situation", "run away", "give up", "ignore"], correct: "face a difficult situation" },
  { question: "Choose the correct sentence: 'I have been waiting ___ two hours.'", options: ["since", "for", "at", "on"], correct: "for" },
  { question: "Identify the error: 'He did not knew the answer.'", options: ["did", "not", "knew", "answer"], correct: "knew" },
  { question: "Choose the correct form: 'I ___ been there before.'", options: ["has", "have", "had", "having"], correct: "have" },
  { question: "Select the correct preposition: 'He is interested ___ learning new skills.'", options: ["in", "on", "at", "for"], correct: "in" },
  { question: "Choose the correct sentence: 'She ___ working here for five years.'", options: ["is", "has been", "have", "was"], correct: "has been" },
  { question: "Identify the error: 'She don't know what to do.'", options: ["She", "don't", "know", "what"], correct: "don't" }
];

    setQuestions(englishQuestions);
    setStep("quiz");
  }

  function handleSubmit(ans) {
    setAnswers(ans);
    setStep("result");
  }

  function handleRestart() {
  setStep("start");      // Go back to start form
  setQuestions([]);      // Clear questions
  setAnswers({});        // Clear previous answers
  setUser({ name: "", topic: "" }); // Reset user info (optional)
}
  return (
    <div className="p-6 max-w-3xl mx-auto">
      {step === "start" && <StartForm onStart={handleStart} />}
      {step === "quiz" && <Quiz questions={questions} onSubmit={handleSubmit} />}
{step === "result" && (
  <Result
    name={user.name}
    topic={user.topic}
    questions={questions}
    answers={answers}
    onRestart={handleRestart}
  />
)}    </div>
  );
}
