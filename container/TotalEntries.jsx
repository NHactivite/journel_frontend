import React from "react";
import { useState, useEffect } from "react";
const TotalEntries = (user) => {
  const [refresh, setRefresh] = useState(false);
  const [entries, setEntries] = useState([]);
  const ambienceIcons = { forest: "🌲", ocean: "🌊", mountain: "⛰️" };


  const fetchEntries = async () => {
  try {
    if (!user || !user.userId) return;
    const userId=user?.userId.id;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/journal/${userId}`,{
          credentials: "include",
      }
    );

    const data = await res.json();

    if (Array.isArray(data)) {
      setEntries(data);
    } else if (Array.isArray(data.entries)) {
      setEntries(data.entries);
    } else {
      setEntries([]);
    }

  } catch (error) {
    console.log("Failed to fetch entries", error);
  }
};

  useEffect(() => {
    fetchEntries();
  }, [refresh]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold ">
          Previous Entries
          <span className="ml-2 text-sm text-slate-500 font-normal">
            ({entries.length})
          </span>
        </h2>
        <button
          onClick={() => setRefresh((prev) => !prev)}
          className="bg-gray-800 border border-gray-700 text-slate-400 rounded-md px-4 py-1.5 text-sm hover:border-gray-500 cursor-pointer"
        >
          ↻ Refresh
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <p className="text-4xl mb-3">📓</p>
          <p>No entries yet. Write your first journal entry!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="bg-gray-800 rounded-xl p-5 border border-gray-700"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">
                    {ambienceIcons[entry.ambience] || "🌿"}
                  </span>
                  <span className="text-sm text-gray-200 capitalize">
                    {entry.ambience}
                  </span>
                  {entry.emotion && (
                    <span className="text-xs px-3 py-1 text-gray-300  rounded-full bg-gray-950 border border-gray-700 capitalize ">
                      {entry.emotion}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-300 ">
                  {new Date(entry.created_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-3">
                {entry.text}
              </p>

              {entry.keywords?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {entry.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="bg-gray-950 border border-gray-800 rounded-full px-2.5 py-0.5 text-xs text-gray-400 "
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              )}

              {entry.summary && (
                <p className="text-xs text-slate-400  italic border-t border-gray-700 pt-3">
                  "{entry.summary}"
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TotalEntries;
