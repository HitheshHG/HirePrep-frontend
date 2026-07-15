import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-[#0a0d12] text-[#7d8590] font-mono-display">
              404 — route not found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}