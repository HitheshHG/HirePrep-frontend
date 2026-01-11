import axios from "axios";

export default function UploadCard({ setSkills, setQuestions }) {
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    const res = await axios.post(
      "http://localhost:8000/upload",
      formData
    );

    setSkills(res.data.skills);
    setQuestions(res.data.questions);
  };

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-8 text-center">
      <h1 className="text-2xl font-extrabold text-white">
        Hire<span className="text-cyan-400">Prep</span>
      </h1>

      <p className="mt-3 text-slate-400 mb-6">
        Upload your resume to generate interview questions
      </p>

      <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-600 rounded-lg p-8 cursor-pointer hover:border-cyan-400 transition">
        <span className="text-slate-300 mb-2">
          Upload Resume (PDF)
        </span>
        <input
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleUpload}
        />
      </label>
    </div>
  );
}
