"use client";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";

const Write_tab = (user) => {
  const ambienceIcons = { forest: "🌲", ocean: "🌊", mountain: "⛰️" };
  const [ambience, setAmbience] = useState("forest");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
 
  const submitJournal = async () => {
    if (!text.trim()) return console.log("Write something first!");
   
    setLoading(true);
    
    try {
  if (!user || !user.userId){
    toast.error("Login First")
    setLoading(false);
    return;
  }   
     const userId=user?.userId.id;
     console.log(userId,"mm");
     
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/journal`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          text,
          ambience,
        }),
      });

      const data = await res.json();

      console.log("Saved! Emotion:", data.emotion || "unknown");

      setText("");
    } catch (error) {
      console.log("Failed to save", error);
    }

    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-600 mb-6">
        Write Journal Entry
      </h2>

      <div className="mb-6">
        <label className="text-xs text-slate-500 uppercase tracking-widest block mb-3">
          Session Ambience
        </label>
        <div className="flex gap-3">
          {["forest", "ocean", "mountain"].map((a) => (
            <button
              key={a}
              onClick={() => setAmbience(a)}
              className={`px-5 py-2.5 rounded-lg text-sm capitalize border-2 transition-all
                      ${
                        ambience === a
                          ? "border-emerald-500 bg-emerald-950 text-emerald-400"
                          : "border-gray-700 bg-gray-800 text-slate-400 hover:border-gray-600"
                      }`}
            >
              {ambienceIcons[a]} {a}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="text-xs text-slate-500 uppercase tracking-widest block mb-3">
          Your Entry
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="How did your session feel today? What did you notice, experience, or think about?"
          rows={7}
          className="w-full bg-gray-800 border border-gray-700 rounded-xl text-slate-200 px-4 py-3.5 text-sm leading-relaxed resize-y outline-none focus:border-emerald-500 placeholder-slate-600"
        />
        <p className="text-right text-xs text-slate-600 mt-1">
          {text.length} characters
        </p>
      </div>

      <button
        onClick={submitJournal}
        disabled={loading }
        className={`px-7 py-3 rounded-lg text-sm font-semibold text-white transition-colors ${loading ? "bg-gray-700 cursor-not-allowed" : "bg-emerald-700 hover:bg-emerald-600 cursor-pointer"}`}
      >
        {loading ? "Saving & Analyzing..." : "💾 Save Entry"}
      </button>
    </div>
  );
};

export default Write_tab;
