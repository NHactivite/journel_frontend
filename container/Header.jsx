"use client"
import { useRouter } from "next/navigation";

export default function Header({ activeTab, setActiveTab, user }) {
 
  const router = useRouter();
  const TABS = ["write", "analyze", "entries", "insights"];

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method:      "POST",
      credentials: "include",
    });
    router.push("/login");
  };

  return (
    <div className="border-gray-800 lg:px-8 px-2 py-5 grid lg:grid-cols-2">
      <div className="lg:block flex flex-col items-center lg:mt-2">
        <h1 className="lg:text-2xl text-xl font-bold tracking-tight">🌿 Nature Journal</h1>
        <p className="text-slate-500 mt-1">AI-powered emotion analysis</p>
      </div>
      <div>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`lg:px-15 px-4 py-3.5 text-sm capitalize font-medium border-b-2 transition-colors
              ${activeTab === tab
                ? "border-emerald-400 text-emerald-400"
                : "border-transparent text-slate-500 hover:text-slate-300"}`}
          >
            {tab}
          </button>
        ))}
       {
        user===null?(
           <button
          onClick={()=>router.push("/login")}
          className="bg-gray-900 font-bold text-xs text-white rounded-md px-2 py-1.5"
        >
          Login
        </button>
        ):(
           <button
          onClick={handleLogout}
          className="bg-gray-900 font-bold text-xs text-white rounded-md px-2 py-1.5"
        >
          Logout
        </button>
        )
       
       }
      </div>
    </div>
  );
}