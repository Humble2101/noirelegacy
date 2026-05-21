"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError("Please fill in all fields."); return; }
    setLoading(true);

    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password.");
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-8">
            <span className="font-playfair text-2xl font-black tracking-[0.3em] text-[#F5F0E8]">
              NOIRE LEGACY
            </span>
          </Link>
          <h1 className="font-playfair text-4xl font-black text-[#F5F0E8] mb-3">
            Welcome Back
          </h1>
          <div className="gold-divider max-w-[80px] mx-auto mb-4" />
          <p className="font-cormorant text-[#888880] text-lg">
            Sign in to your account
          </p>
        </div>

        {/* Card */}
        <div className="border border-[#2A2A2A] p-8 bg-[#0d0d0d]">
          {error && (
            <div className="mb-6 border border-[#6B1A2A]/60 bg-[#6B1A2A]/10 px-4 py-3">
              <p className="font-cormorant text-[#F5F0E8]/80 text-sm">{error}</p>
            </div>
          )}

          {searchParams.get("error") === "registered" && (
            <div className="mb-6 border border-[#C9A84C]/40 bg-[#C9A84C]/5 px-4 py-3">
              <p className="font-cormorant text-[#C9A84C] text-sm">
                Account created successfully. Please sign in.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-cormorant text-xs tracking-[0.3em] uppercase text-[#888880] block mb-2">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="form-input"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="font-cormorant text-xs tracking-[0.3em] uppercase text-[#888880] block mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="form-input pr-12"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888880] hover:text-[#C9A84C] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 border border-[#C9A84C] bg-[#C9A84C] text-[#0A0A0A] font-cormorant text-sm tracking-[0.4em] uppercase py-4 hover:bg-transparent hover:text-[#C9A84C] transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Signing In..." : (
                <><LogIn size={14} /> Sign In</>
              )}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 border border-[#2A2A2A] p-4 bg-[#C9A84C]/5">
            <p className="font-cormorant text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-2">Demo Admin Account</p>
            <p className="font-cormorant text-[#888880] text-sm">Email: admin@noirelecacy.com</p>
            <p className="font-cormorant text-[#888880] text-sm">Password: admin123!</p>
          </div>
        </div>

        <p className="text-center font-cormorant text-[#888880] mt-6 text-base">
          Don't have an account?{" "}
          <Link href="/register" className="text-[#C9A84C] hover:text-[#E8C97A] transition-colors">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
