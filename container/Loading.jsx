const Loading = ({ type = "entries", count = 3 }) => {

  // ── Journal Entry Skeleton ──────────────────────────
  if (type === "entries") return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-gray-800 rounded-xl p-5 border border-gray-700 animate-pulse">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-700 rounded-full" />
              <div className="w-16 h-4 bg-gray-700 rounded" />
              <div className="w-14 h-5 bg-gray-700 rounded-full" />
            </div>
            <div className="w-20 h-4 bg-gray-700 rounded" />
          </div>
          <div className="space-y-2 mb-3">
            <div className="w-full h-3 bg-gray-700 rounded" />
            <div className="w-5/6 h-3 bg-gray-700 rounded" />
            <div className="w-4/6 h-3 bg-gray-700 rounded" />
          </div>
          <div className="flex gap-2 mb-3">
            {[1,2,3].map(k => <div key={k} className="w-14 h-5 bg-gray-700 rounded-full" />)}
          </div>
          <div className="w-3/4 h-3 bg-gray-700 rounded border-t border-gray-700 pt-3" />
        </div>
      ))}
    </div>
  );

  // ── Insights Skeleton ───────────────────────────────
  if (type === "insights") return (
    <div className="animate-pulse">
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[1,2,3,4].map(i => (
          <div key={i} className="bg-gray-800 rounded-xl p-5 border border-gray-700">
            <div className="w-24 h-3 bg-gray-700 rounded mb-3" />
            <div className="w-16 h-8 bg-gray-700 rounded" />
          </div>
        ))}
      </div>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
        <div className="w-32 h-3 bg-gray-700 rounded mb-3" />
        <div className="flex flex-wrap gap-2">
          {[1,2,3,4,5].map(k => <div key={k} className="w-16 h-7 bg-gray-700 rounded-full" />)}
        </div>
      </div>
    </div>
  );

  // ── Cards Skeleton (generic) ────────────────────────
  if (type === "cards") return (
    <div className="grid grid-cols-2 gap-4 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <div className="w-24 h-3 bg-gray-700 rounded mb-3" />
          <div className="w-16 h-6 bg-gray-700 rounded" />
        </div>
      ))}
    </div>
  );

  // ── Spinner (fallback) ──────────────────────────────
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 border-4 border-gray-700 border-t-emerald-500 rounded-full animate-spin" />
    </div>
  );
};

export default Loading;