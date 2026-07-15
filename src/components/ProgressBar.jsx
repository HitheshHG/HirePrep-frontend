export default function ProgressBar({ current, total }) {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-2 font-mono-display text-xs text-[#7d8590]">
        <span>
          // question {current + 1} of {total}
        </span>
        <span>{Math.round(((current + 1) / total) * 100)}%</span>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              i <= current ? "bg-[#58a6ff]" : "bg-[#1c222c]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}