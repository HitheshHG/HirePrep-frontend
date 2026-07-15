import { useEffect, useState } from "react";

const LETTERS = ["a", "b", "c", "d"];

export default function QuestionCard({ data, index, total, onAnswer }) {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setSelected(null);
  }, [index]);

  if (!data) return null;

  const fileName = `${(data.skill || "general")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")}.quiz`;

  const handleSelect = (opt) => {
    if (selected) return;
    setSelected(opt);
    setTimeout(() => onAnswer(opt), 350);
  };

  return (
    <div className="w-full max-w-xl rounded-lg border border-[#232a35] bg-[#11151c] shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b24] border-b border-[#232a35]">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#58a6ff]" />
          <span className="text-xs font-mono-display text-[#e6edf3]">
            {fileName}
          </span>
        </div>
        <span className="text-xs font-mono-display text-[#7d8590]">
          {index + 1}/{total}
        </span>
      </div>

      <div className="p-6">
        <p className="text-[15px] leading-relaxed text-[#e6edf3] mb-6">
          {data.question}
        </p>

        <div className="space-y-2">
          {data.options.map((opt, i) => {
            const isSelected = selected === opt;
            const isCorrect = selected && opt === data.answer;
            const isWrongPick = isSelected && opt !== data.answer;

            let stateClasses =
              "border-[#232a35] bg-[#0e1218] hover:border-[#58a6ff]/60 hover:bg-[#141a24]";
            if (selected) {
              if (isCorrect) {
                stateClasses = "border-[#3fb950]/60 bg-[#3fb950]/10";
              } else if (isWrongPick) {
                stateClasses = "border-[#f85149]/60 bg-[#f85149]/10";
              } else {
                stateClasses = "border-[#232a35] bg-[#0e1218] opacity-50";
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(opt)}
                disabled={!!selected}
                className={`w-full flex items-center gap-3 rounded-md border px-4 py-3 text-left transition-all duration-200 ${stateClasses} ${
                  !selected ? "active:scale-[0.99]" : ""
                }`}
              >
                <span className="font-mono-display text-xs text-[#7d8590] w-4 shrink-0">
                  {LETTERS[i]}
                </span>
                <span className="text-[#e6edf3] text-sm">{opt}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}