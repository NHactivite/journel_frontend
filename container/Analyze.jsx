import React from "react";
import { useState } from "react";

const Analyze = () => {
  const [analyzeText, setAnalyzeText] = useState("");
  const [analyzeResult, setAnalyzeResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const analyzeEntry = async () => {
    if (!analyzeText.trim()) return showToast("Enter text to analyze", "error");
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/journal/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: analyzeText }),
      });
      const data = await res.json();
      setAnalyzeResult(data);
    } catch {
      showToast("Analysis failed", "error");
    }
    setLoading(false);
  };
  return (
    <div>
      <h2 className="text-lg font-semibold  mb-2">
        Analyze Text
      </h2>
      <p className="text-sm text-slate-500 mb-6">
        Analyze any text without saving to database.
      </p>

      <textarea
        value={analyzeText}
        onChange={(e) => setAnalyzeText(e.target.value)}
        placeholder="Paste any journal text here to analyze emotions..."
        rows={6}
        className="w-full bg-gray-800 border border-gray-700 rounded-xl text-slate-200 px-4 py-3.5 text-sm leading-relaxed resize-y outline-none focus:border-purple-500 placeholder-slate-600 mb-4"
      />

      <button
        onClick={analyzeEntry}
        disabled={loading}
        className={`px-7 py-3 rounded-lg text-sm font-semibold text-white transition-colors mb-6
                ${loading ? "bg-gray-700 cursor-not-allowed" : "bg-purple-700 hover:bg-purple-600 cursor-pointer"}`}
      >
        {loading ? "Analyzing..." : "🔍 Analyze"}
      </button>

      {analyzeResult && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xs text-slate-400 mb-4 uppercase tracking-widest">
            Analysis Result
          </h3>

          <div className="bg-gray-950 rounded-lg p-4 inline-block mb-4">
            <p className="text-xs text-gray-300 mb-1">EMOTION</p>
            <p className="text-2xl font-bold capitalize text-gray-200">
              {analyzeResult.emotion || "—"}
            </p>
          </div>

          <div className="mb-4">
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">
              Keywords
            </p>
            <div className="flex flex-wrap gap-2">
              {(analyzeResult.keywords || []).map((kw) => (
                <span
                  key={kw}
                  className="bg-gray-950 border border-gray-700 rounded-full px-3 py-1 text-xs text-slate-400"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">
              Summary
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              {analyzeResult.summary}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analyze;
