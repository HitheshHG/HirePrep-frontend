import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UploadCard({ redirectToQuiz }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await axios.post(
        "https://hireprep-backend.onrender.com/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      localStorage.setItem(
        "questions",
        JSON.stringify(res.data.questions)
      );

      if (redirectToQuiz) {
        setTimeout(() => navigate("/quiz"), 1200);
      }
    } catch {
      alert("Upload failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 p-8 text-center">
      {!loading ? (
        <label className="border-dashed border-2 border-slate-600 rounded-lg p-8 block cursor-pointer hover:border-cyan-400 transition">
          <input
            type="file"
            hidden
            accept=".pdf"
            onChange={handleUpload}
          />
          <span className="text-slate-300">
            Upload Resume (PDF)
          </span>
        </label>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
          <p className="text-slate-400 text-sm">
            Analyzing resume & generating quiz…
          </p>
        </div>
      )}
    </div>
  );
}
