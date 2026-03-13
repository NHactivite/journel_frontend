"use client"
import Analyze from '@/container/Analyze'
import Header from '@/container/Header'
import Insight from '@/container/Insight'
import TotalEntries from '@/container/TotalEntries'
import Write_tab from '@/container/Write_tab'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const Page = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("write");
  const [user, setUser]           = useState(null);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/auth/profile", {
          credentials: "include",   // ← sends cookie
        });
        
        if (!res.ok) {
          toast.success("please login")  // ← not logged in, redirect
          return;
        }

        const data = await res.json();
        setUser(data);             // { id, name, email }
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  // Show nothing while checking auth
  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center text-slate-400">
      Loading...
    </div>
  );
  console.log(user,"kpp");
  
  return (
    <div>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} user={user} />
      <div className='m-4'>
        {activeTab === "write"    && <Write_tab   userId={user} />}
        {activeTab === "analyze"  && <Analyze     />}
        {activeTab === "entries"  && <TotalEntries userId={user} />}
        {activeTab === "insights" && <Insight     userId={user} />}
      </div>
    </div>
  )
}

export default Page