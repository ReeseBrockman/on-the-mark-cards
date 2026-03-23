"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/account");
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="border border-yellow-400 p-8 rounded-xl">
          <h1 className="text-white text-2xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-400 text-sm mb-8">Sign in to your account</p>

          {error && (
            <div className="bg-red-900 border border-red-500 text-red-200 text-sm px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="text-gray-400 text-xs mb-1 block">EMAIL</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-gray-900 text-white text-sm px-4 py-3 border border-gray-700 focus:border-yellow-400 outline-none rounded-lg"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="text-gray-400 text-xs mb-1 block">
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-gray-900 text-white text-sm px-4 py-3 border border-gray-700 focus:border-yellow-400 outline-none rounded-lg"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 text-black font-bold py-3 hover:bg-black hover:text-yellow-400 border border-transparent hover:border-yellow-400 transition-colors rounded-lg mt-2 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col gap-3 text-center">
            <Link
              href="/forgot-password"
              className="text-gray-400 hover:text-yellow-400 text-sm transition-colors font-medium"
            >
              Forgot your password?
            </Link>
            <p className="text-gray-500 text-sm">
              Don't have an account?{" "}
              <Link href="/signup" className="text-yellow-400 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
