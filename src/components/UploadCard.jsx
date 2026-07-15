import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "https://hireprep-backend.onrender.com";

const STAGES = [
  "reading resume.pdf",
  "extracting skills",
  "generating quiz",
];

export default function UploadCard({ redirectToQuiz }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [stageIndex, setStageIndex] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [fileName, setFileName] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const runStages = () => {
    setStageIndex(0);
    const id = setInterval(() => {
      setStageIndex((i) => (i < STAGES.length - 1 ? i + 1 : i));
    }, 900);
    return () => clearInterval(id);
  };

  const handleFile = async (file) => {
    if (!file) return;

    if (file.type !== "application/pdf") {
      setStatus("error");
      setErrorMsg("Only PDF files are supported.");
      return;
    }

    setFileName(file.name);
    setStatus("loading");
    setErrorMsg("");
    const stopStages = runStages();

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await axios.post(`${API_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 60000,
      });

      if (!res.data?.questions?.length) {
        throw new Error(
          "No quiz questions could be generated from this resume. Try a resume with clearer, listed technical skills."
        );
      }

      localStorage.setItem("questions", JSON.stringify(res.data.questions));
      localStorage.setItem("skills", JSON.stringify(res.data.skills || []));

      stopStages();
      setStageIndex(STAGES.length);

      if (redirectToQuiz) {
        setTimeout(() => navigate("/quiz"), 500);
      } else {
        setStatus("idle");
      }
    } catch (err) {
      stopStages();
      setStatus("error");
      setErrorMsg(
        err.response?.data?.detail ||
          err.message ||
          "Upload failed. Please try again."
      );
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div className="rounded-lg border border-[#232a35] bg-[#11151c] overflow-hidden shadow-2xl">
      {/* window chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#161b24] border-b border-[#232a35]">
        <span className="h-2.5 w-2.5 rounded-full bg-[#f85149]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#d29922]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#3fb950]/70" />
        <span className="ml-2 text-xs font-mono-display text-[#7d8590]">
          {fileName || "upload.sh"}
        </span>
      </div>

      <div className="p-6">
        {status === "loading" ? (
          <div className="py-6 font-mono-display text-sm text-left">
            {STAGES.map((stage, i) => (
              <div key={stage} className="flex items-center gap-2 py-1">
                <span
                  className={
                    i < stageIndex
                      ? "text-[#3fb950]"
                      : i === stageIndex
                      ? "text-[#58a6ff]"
                      : "text-[#3a4250]"
                  }
                >
                  {i < stageIndex ? "✓" : i === stageIndex ? "›" : "·"}
                </span>
                <span
                  className={
                    i <= stageIndex ? "text-[#e6edf3]" : "text-[#3a4250]"
                  }
                >
                  {stage}
                  {i === stageIndex && (
                    <span className="caret-blink">_</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <label
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={onDrop}
            className={`flex flex-col items-center justify-center rounded-md border-2 border-dashed px-6 py-10 cursor-pointer transition-colors ${
              dragActive
                ? "border-[#58a6ff] bg-[#58a6ff]/5"
                : "border-[#2d3542] hover:border-[#58a6ff]/60"
            }`}
          >
            <span className="font-mono-display text-2xl text-[#58a6ff] mb-3">
              ↑
            </span>
            <span className="text-[#e6edf3] font-medium">
              Drop your resume here
            </span>
            <span className="text-sm text-[#7d8590] mt-1">
              or click to browse · PDF only
            </span>
            <input
              ref={inputRef}
              type="file"
              hidden
              accept=".pdf,application/pdf"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </label>
        )}

        {status === "error" && (
          <div className="mt-4 rounded-md border border-[#f85149]/30 bg-[#f85149]/10 px-4 py-3 text-sm text-[#ff9a94] font-mono-display">
            error: {errorMsg}
          </div>
        )}
      </div>
    </div>
  );
}