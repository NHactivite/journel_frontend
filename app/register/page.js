"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method:      "POST",
        headers:     { "Content-Type": "application/json" },
        credentials: "include",
        body:        JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Registration failed");
        return;
      }

      router.push("/");   // redirect after register

    } catch (err) {
      setError("Network error");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <form
        onSubmit={handleRegister}
        className="bg-gray-800 p-8 rounded-xl w-96 border border-gray-700"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">🌿 Register</h1>

        {error && (
          <p className="bg-red-900 text-red-300 p-2 mb-4 rounded text-sm">{error}</p>
        )}

        <div className="mb-4">
          <label className="text-sm text-gray-400">Name</label>
          <input
            type="text"
            className="w-full mt-1 p-2 bg-gray-900 border border-gray-700 rounded focus:border-emerald-500 outline-none"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="text-sm text-gray-400">Email</label>
          <input
            type="email"
            className="w-full mt-1 p-2 bg-gray-900 border border-gray-700 rounded focus:border-emerald-500 outline-none"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="text-sm text-gray-400">Password</label>
          <input
            type="password"
            className="w-full mt-1 p-2 bg-gray-900 border border-gray-700 rounded focus:border-emerald-500 outline-none"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-500 py-2 rounded font-semibold disabled:bg-gray-700 disabled:cursor-not-allowed"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-emerald-400 hover:text-emerald-300">Login</a>
        </p>
      </form>
    </div>
  );
}