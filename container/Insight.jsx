import React, { useEffect, useState } from "react";

const Insight = (user) => {
  const [refresh, setRefresh] = useState(false);
  const [insights, setInsights] = useState(null);
  const ambienceIcons = { forest: "🌲", ocean: "🌊", mountain: "⛰️" };
  const fetchInsights = async () => {
    try {
      if (!user || !user.userId) return;
      const userId=user?.userId.id;
     const res = await fetch(`/api/journal/insights/${userId}`) 
      if (!res.ok) {
        setInsights(null);
        return;
      }
      const data = await res.json();
      setInsights(data);
    } catch {
      showToast("Failed to fetch insights", "error");
    }
  };

  useEffect(() => {
    fetchInsights();
  }, [refresh]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold ">Insights</h2>
        <button
          onClick={() => setRefresh(prev=>!prev)}
          className="bg-gray-800 border border-gray-700 text-slate-400 rounded-md px-4 py-1.5 text-sm hover:border-gray-500 cursor-pointer"
        >
          ↻ Refresh
        </button>
      </div>

      {!insights ? (
        <div className="text-center py-20 text-slate-500">
          <p className="text-4xl mb-3">📊</p>
          <p>No insights yet. Add some journal entries first!</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              {
                label: "Total Entries",
                value: insights.totalEntries,
                icon: "📓",
                cls: "text-emerald-400",
              },
              {
                label: "Top Emotion",
                value: insights.topEmotion || "—",
                icon: "💚",
                cls: "text-orange-400",
              },
              {
                label: "Fav Ambience",
                value: insights.mostUsedAmbience
                  ? `${ambienceIcons[insights.mostUsedAmbience]|| "🌿"} ${insights.mostUsedAmbience}`
                  : "—",
                icon: "🌿",
                cls: "text-green-400",
              },
              {
                label: "Keywords Tracked",
                value: insights.recentKeywords?.length || 0,
                icon: "🏷️",
                cls: "text-purple-400",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-gray-800 rounded-xl p-5 border border-gray-700"
              >
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">
                  {stat.icon} {stat.label}
                </p>
                <p className={`text-2xl font-bold capitalize ${stat.cls}`}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {insights.recentKeywords?.length > 0 && (
            <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 mb-4">
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">
                🏷️ Recent Keywords
              </p>
              <div className="flex flex-wrap gap-2">
                {insights.recentKeywords.map((kw) => (
                  <span
                    key={kw}
                    className="bg-gray-950 border border-gray-700 rounded-full px-3 py-1.5 text-sm text-slate-400"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

        </>
      )}
    </div>
  );
};

export default Insight;
