import UploadCard from "../components/UploadCard";

export default function Landing() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 w-full max-w-xl px-6">
        <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-8 text-center">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Hire<span className="text-cyan-400">Prep</span>
          </h1>

          <p className="mt-4 text-slate-400">
            Upload your resume and take an{" "}
            <span className="text-slate-200 font-medium">
              AI-powered interview quiz
            </span>
          </p>

          <div className="mt-8 rounded-xl bg-slate-800 border border-slate-700 p-6">
            <UploadCard redirectToQuiz />
          </div>

          <p className="mt-6 text-xs text-slate-500">
            PDF only · Secure · Developer friendly
          </p>
        </div>
      </div>
    </div>
  );
}
