import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";

export default function Result() {
  const navigate = useNavigate();
  const answers = JSON.parse(localStorage.getItem("answers")) || [];

  if (!answers.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-slate-400">
        No quiz data found.
      </div>
    );
  }

  const skillMap = {};

  answers.forEach((q) => {
    if (!skillMap[q.skill]) {
      skillMap[q.skill] = { correct: 0, total: 0 };
    }

    skillMap[q.skill].total += 1;
    if (q.userAnswer === q.answer) {
      skillMap[q.skill].correct += 1;
    }
  });

  const resultData = Object.entries(skillMap).map(([skill, data]) => {
    const percent = Math.round((data.correct / data.total) * 100);

    let level = "Weak";
    if (percent >= 80) level = "Strong";
    else if (percent >= 50) level = "Intermediate";

    return { skill, percent, level };
  });

  const overallScore = Math.round(
    resultData.reduce((acc, cur) => acc + cur.percent, 0) /
      resultData.length
  );

  return (
    <div className="min-h-screen bg-[#0f172a] relative overflow-hidden p-6">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-white">
              📊 Skill Assessment
            </h1>
            <p className="mt-2 text-slate-400">
              Performance breakdown based on your resume-driven quiz
            </p>
          </div>

          <div className="rounded-xl bg-slate-900 border border-slate-800 px-6 py-4 text-center">
            <p className="text-sm text-slate-400">Overall Score</p>
            <p className="text-3xl font-bold text-cyan-400">
              {overallScore}%
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl mb-10">
          <h2 className="text-lg font-semibold text-slate-200 mb-4">
            Skill Accuracy Overview
          </h2>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={resultData}>
              <XAxis dataKey="skill" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#020617",
                  border: "1px solid #1e293b",
                  color: "#e2e8f0",
                }}
              />
              <Bar dataKey="percent" fill="#22d3ee" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {resultData.map((item) => (
            <div
              key={item.skill}
              className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl"
            >
              <h2 className="text-lg font-semibold text-white">
                {item.skill}
              </h2>

              <p className="mt-3 text-slate-400">
                Accuracy:{" "}
                <span className="font-semibold text-slate-200">
                  {item.percent}%
                </span>
              </p>

              <p className="mt-1">
                Level:{" "}
                <span
                  className={`font-semibold ${
                    item.level === "Strong"
                      ? "text-green-400"
                      : item.level === "Intermediate"
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {item.level}
                </span>
              </p>

              <div className="mt-4 h-2 w-full rounded bg-slate-800">
                <div
                  className="h-2 rounded bg-cyan-400 transition-all"
                  style={{ width: `${item.percent}%` }}
                />
              </div>

              {item.level !== "Strong" && (
                <a
                  href={`https://www.youtube.com/results?search_query=${item.skill}+tutorial`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-4 text-cyan-400 hover:underline text-sm"
                >
                  Improve {item.skill} →
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="rounded-lg bg-slate-800 border border-slate-700 px-6 py-3 text-slate-200 hover:bg-slate-700 transition"
          >
            Go Home
          </button>

          <button
            onClick={() => navigate("/quiz")}
            className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-black hover:bg-cyan-400 transition"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
