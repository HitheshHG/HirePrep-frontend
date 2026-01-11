import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";

export default function Quiz() {
  const navigate = useNavigate();
  const questions = JSON.parse(localStorage.getItem("questions")) || [];

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (selectedOption) => {
    const currentQuestion = questions[current];

    const updatedAnswers = [
      ...answers,
      {
        ...currentQuestion,
        userAnswer: selectedOption,
      },
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
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-slate-400">
        No questions found. Please upload a resume first.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] relative overflow-hidden px-4">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
        <div
          className="h-1 bg-cyan-400 transition-all duration-300"
          style={{
            width: `${((current + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      <button
        onClick={() => navigate("/")}
        className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
      >
        Exit
      </button>

      <div className="relative z-10 w-full flex justify-center">
        <QuestionCard
          data={questions[current]}
          index={current}
          total={questions.length}
          onAnswer={handleAnswer}
        />
      </div>
    </div>
  );
}
