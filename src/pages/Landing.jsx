import UploadCard from "../components/UploadCard";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0a0d12] relative overflow-hidden flex items-center justify-center px-6 py-16">
      {/* faint grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #58a6ff 1px, transparent 1px), linear-gradient(to bottom, #58a6ff 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 h-[420px] w-[720px] rounded-full blur-3xl opacity-[0.12] pointer-events-none"
        style={{ background: "#58a6ff" }}
      />

      <div className="relative z-10 w-full max-w-xl rise-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#232a35] bg-[#11151c] px-3 py-1 text-xs font-mono-display text-[#7d8590] mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3fb950]" />
            resume → skills → quiz
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#e6edf3] font-mono-display">
            Hire<span className="text-[#58a6ff]">Prep</span>
          </h1>

          <p className="mt-4 text-[#7d8590] text-base leading-relaxed max-w-md mx-auto">
            Upload your resume. We parse the skills you actually listed and
            build a technical quiz to pressure-test them before your
            interview does.
          </p>
        </div>

        <UploadCard redirectToQuiz />

        <div className="mt-6 flex items-center justify-center gap-4 text-xs font-mono-display text-[#3a4250]">
          <span>pdf only</span>
          <span className="h-1 w-1 rounded-full bg-[#232a35]" />
          <span>nothing stored server-side</span>
          <span className="h-1 w-1 rounded-full bg-[#232a35]" />
          <span>~15s to first question</span>
        </div>
      </div>
    </div>
  );
}