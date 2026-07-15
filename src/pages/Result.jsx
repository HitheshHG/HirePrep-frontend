import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useNavigate } from "react-router-dom";

const LEVEL_COLOR = {
  Strong: "#3fb950",
  Intermediate: "#d29922",
  Weak: "#f85149",
};

export default function Result() {
  const navigate = useNavigate();
  const answers = JSON.parse(localStorage.getItem("answers") || "[]");

  if (!answers.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#0a0d12] text-[#7d8590] font-mono-display px-6 text-center">
        <p>// no quiz data found</p>
        <button
          onClick={() => navigate("/")}
          className="rounded-md border border-[#232a35] bg-[#11151c] px-5 py-2.5 text-sm text-[#e6edf3] hover:border-[#58a6ff]/60 transition"
        >
          start a quiz →
        </button>
      </div>
    );
  }

  const skillMap = {};
  answers.forEach((q) => {
    if (!skillMap[q.skill]) skillMap[q.skill] = { correct: 0, total: 0 };
    skillMap[q.skill].total += 1;
    if (q.userAnswer === q.answer) skillMap[q.skill].correct += 1;
  });

  const resultData = Object.entries(skillMap).map(([skill, data]) => {
    const percent = Math.round((data.correct / data.total) * 100);
    let level = "Weak";
    if (percent >= 80) level = "Strong";
    else if (percent >= 50) level = "Intermediate";
    return { skill, percent, level, ...data };
  });

  const overallScore = resultData.length
    ? Math.round(
        resultData.reduce((acc, cur) => acc + cur.percent, 0) /
          resultData.length
      )
    : 0;

  return (
    <div className="min-h-screen bg-[#0a0d12] relative overflow-hidden p-6">
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #58a6ff 1px, transparent 1px), linear-gradient(to bottom, #58a6ff 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <p className="font-mono-display text-xs text-[#7d8590] mb-2">
              // skill assessment
            </p>
            <h1 className="text-3xl font-extrabold text-[#e6edf3] font-mono-display">
              Results
            </h1>
          </div>

          <div className="rounded-lg border border-[#232a35] bg-[#11151c] px-6 py-4 text-center">
            <p className="text-xs font-mono-display text-[#7d8590]">
              overall score
            </p>
            <p className="text-3xl font-bold text-[#58a6ff] font-mono-display">
              {overallScore}%
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-[#232a35] bg-[#11151c] p-6 mb-8">
          <h2 className="text-sm font-mono-display text-[#7d8590] mb-4">
            accuracy by skill
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={resultData}>
              <XAxis
                dataKey="skill"
                stroke="#7d8590"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke="#7d8590"
                fontSize={12}
                tickLine={false}
                width={32}
              />
              <Tooltip
                cursor={{ fill: "#1c222c" }}
                contentStyle={{
                  backgroundColor: "#161b24",
                  border: "1px solid #232a35",
                  borderRadius: 6,
                  color: "#e6edf3",
                  fontSize: 13,
                }}
              />
              <Bar dataKey="percent" radius={[4, 4, 0, 0]}>
                {resultData.map((entry, i) => (
                  <Cell key={i} fill={LEVEL_COLOR[entry.level]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* diff-style breakdown */}
        <div className="rounded-lg border border-[#232a35] bg-[#0e1218] font-mono-display text-sm overflow-hidden mb-10">
          {resultData.map((item, i) => (
            <div
              key={item.skill}
              className={`px-5 py-3 flex items-center justify-between ${
                i !== resultData.length - 1 ? "border-b border-[#1c222c]" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  style={{ color: LEVEL_COLOR[item.level] }}
                  className="font-bold"
                >
                  {item.level === "Strong" ? "+" : item.level === "Weak" ? "-" : "~"}
                </span>
                <span className="text-[#e6edf3]">{item.skill}</span>
                <span className="text-[#3a4250]">
                  {item.correct}/{item.total} correct
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span
                  style={{ color: LEVEL_COLOR[item.level] }}
                  className="text-xs"
                >
                  {item.level}
                </span>
                {item.level !== "Strong" && (
                  <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                      item.skill + " tutorial"
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#58a6ff] hover:underline text-xs"
                  >
                    review →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="rounded-md border border-[#232a35] bg-[#11151c] px-6 py-3 text-[#e6edf3] hover:border-[#58a6ff]/60 transition font-mono-display text-sm"
          >
            ← home
          </button>
          <button
            onClick={() => navigate("/quiz")}
            className="rounded-md bg-[#58a6ff] px-6 py-3 font-semibold text-[#0a0d12] hover:bg-[#79b8ff] transition font-mono-display text-sm"
          >
            retake quiz
          </button>
        </div>
      </div>
    </div>
  );
}