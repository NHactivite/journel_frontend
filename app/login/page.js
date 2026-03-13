"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {  // ← Next.js route, not FastAPI directly
        method:      "POST",
        headers:     { "Content-Type": "application/json" },
        credentials: "include",                      // ← needed for cookies
        body:        JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Invalid email or password");  // FastAPI uses "detail" not "message"
        return;
      }

      router.push("/");   // redirect after login

    } catch (err) {
      setError("Network error");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-xl w-96 border border-gray-700"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">🌿 Login</h1>

        {error && (
          <p className="bg-red-900 text-red-300 p-2 mb-4 rounded text-sm">{error}</p>
        )}

        <div className="mb-4">
          <label className="text-sm text-gray-400">Email</label>
          <input
            type="email"
            className="w-full mt-1 p-2 bg-gray-900 border border-gray-700 rounded"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="text-sm text-gray-400">Password</label>
          <input
            type="password"
            className="w-full mt-1 p-2 bg-gray-900 border border-gray-700 rounded"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-500 py-2 rounded font-semibold"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          No account?{" "}
          <a href="/register" className="text-emerald-400 hover:text-emerald-300">Register</a>
        </p>
      </form>
    </div>
  );
}