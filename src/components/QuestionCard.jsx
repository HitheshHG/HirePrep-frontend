export default function QuestionCard({ data, index, total, onAnswer }) {
  if (!data) return null;

  return (
    <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-8">
      <p className="text-sm text-slate-400 mb-2">
        Question <span className="text-cyan-400 font-medium">{index + 1}</span> /{" "}
        {total}
      </p>

      <h2 className="text-lg font-semibold text-slate-100 mb-6 leading-relaxed">
        {data.question}
      </h2>

      <div className="space-y-3">
        {data.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onAnswer(opt)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-left text-slate-200 transition-all duration-200 hover:border-cyan-400 hover:bg-slate-700 active:scale-[0.98]"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
