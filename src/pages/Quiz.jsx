import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";

export default function Quiz() {
  const navigate = useNavigate();
  const questions = JSON.parse(localStorage.getItem("questions") || "[]");

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (selectedOption) => {
    const currentQuestion = questions[current];

    const updatedAnswers = [
      ...answers,
      { ...currentQuestion, userAnswer: selectedOption },
    ];

    setAnswers(updatedAnswers);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      localStorage.setItem("answers", JSON.stringify(updatedAnswers));
      navigate("/result");
    }
  };

  if (!questions.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#0a0d12] text-[#7d8590] font-mono-display px-6 text-center">
        <p>// no questions found</p>
        <button
          onClick={() => navigate("/")}
          className="rounded-md border border-[#232a35] bg-[#11151c] px-5 py-2.5 text-sm text-[#e6edf3] hover:border-[#58a6ff]/60 transition"
        >
          upload a resume →
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0d12] relative overflow-hidden px-4 py-16">
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #58a6ff 1px, transparent 1px), linear-gradient(to bottom, #58a6ff 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <button
        onClick={() => navigate("/")}
        className="absolute top-6 right-6 text-sm font-mono-display text-[#7d8590] hover:text-[#e6edf3] transition"
      >
        exit
      </button>

      <div className="relative z-10 w-full flex flex-col items-center gap-6">
        <ProgressBar current={current} total={questions.length} />
        <QuestionCard
          key={current}
          data={questions[current]}
          index={current}
          total={questions.length}
          onAnswer={handleAnswer}
        />
      </div>
    </div>
  );
}