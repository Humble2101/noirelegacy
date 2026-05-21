"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, UserPlus, CheckCircle } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name || form.name.length < 2) e.name = "Name must be at least 2 characters";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email is required";
    if (!form.password || form.password.length < 8) e.password = "Password must be at least 8 characters";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrors({ general: data.error || "Something went wrong." });
      } else {
        setSuccess(true);
        setTimeout(() => router.push("/login?error=registered"), 2000);
      }
    } catch {
      setErrors({ general: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = () => {
    const p = form.password;
    if (!p) return null;
    if (p.length < 8) return { label: "Too short", color: "#6B1A2A", width: "25%" };
    if (p.length < 10 || !/[A-Z]/.test(p)) return { label: "Weak", color: "#C9A84C", width: "50%" };
    if (!/[0-9]/.test(p) || !/[^A-Za-z0-9]/.test(p)) return { label: "Good", color: "#C9A84C", width: "75%" };
    return { label: "Strong", color: "#4CAF50", width: "100%" };
  };
  const strength = getPasswordStrength();

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center animate-fade-up">
          <CheckCircle className="text-[#C9A84C] mx-auto mb-6" size={64} />
          <h2 className="font-playfair text-4xl font-black text-[#F5F0E8] mb-4">Account Created</h2>
          <div className="gold-divider max-w-xs mx-auto mb-6" />
          <p className="font-cormorant text-[#888880] text-lg">Redirecting you to sign in...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20 pb-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-8">
            <span className="font-playfair text-2xl font-black tracking-[0.3em] text-[#F5F0E8]">
              NOIRE LEGACY
            </span>
          </Link>
          <h1 className="font-playfair text-4xl font-black text-[#F5F0E8] mb-3">
            Join the Legacy
          </h1>
          <div className="gold-divider max-w-[80px] mx-auto mb-4" />
          <p className="font-cormorant text-[#888880] text-lg">
            Create your account
          </p>
        </div>

        <div className="border border-[#2A2A2A] p-8 bg-[#0d0d0d]">
          {errors.general && (
            <div className="mb-6 border border-[#6B1A2A]/60 bg-[#6B1A2A]/10 px-4 py-3">
              <p className="font-cormorant text-[#F5F0E8]/80 text-sm">{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-cormorant text-xs tracking-[0.3em] uppercase text-[#888880] block mb-2">
                Full Name
              </label>
              <input name="name" value={form.name} onChange={handleChange}
                placeholder="Your full name" className="form-input" />
              {errors.name && <p className="text-[#6B1A2A] text-sm mt-1 font-cormorant">{errors.name}</p>}
            </div>

            <div>
              <label className="font-cormorant text-xs tracking-[0.3em] uppercase text-[#888880] block mb-2">
                Email Address
              </label>
              <input name="email" type="email" value={form.email} onChange={handleChange}
                placeholder="your@email.com" className="form-input" />
              {errors.email && <p className="text-[#6B1A2A] text-sm mt-1 font-cormorant">{errors.email}</p>}
            </div>

            <div>
              <label className="font-cormorant text-xs tracking-[0.3em] uppercase text-[#888880] block mb-2">
                Password
              </label>
              <div className="relative">
                <input name="password" type={showPassword ? "text" : "password"}
                  value={form.password} onChange={handleChange}
                  placeholder="Min. 8 characters" className="form-input pr-12" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888880] hover:text-[#C9A84C] transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {strength && (
                <div className="mt-2">
                  <div className="h-0.5 bg-[#2A2A2A] w-full">
                    <div className="h-full transition-all duration-500" style={{ width: strength.width, background: strength.color }} />
                  </div>
                  <p className="font-cormorant text-xs mt-1" style={{ color: strength.color }}>{strength.label}</p>
                </div>
              )}
              {errors.password && <p className="text-[#6B1A2A] text-sm mt-1 font-cormorant">{errors.password}</p>}
            </div>

            <div>
              <label className="font-cormorant text-xs tracking-[0.3em] uppercase text-[#888880] block mb-2">
                Confirm Password
              </label>
              <input name="confirmPassword" type={showPassword ? "text" : "password"}
                value={form.confirmPassword} onChange={handleChange}
                placeholder="Repeat password" className="form-input" />
              {errors.confirmPassword && <p className="text-[#6B1A2A] text-sm mt-1 font-cormorant">{errors.confirmPassword}</p>}
            </div>

            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-3 border border-[#C9A84C] bg-[#C9A84C] text-[#0A0A0A] font-cormorant text-sm tracking-[0.4em] uppercase py-4 hover:bg-transparent hover:text-[#C9A84C] transition-all duration-400 disabled:opacity-50 mt-2">
              {loading ? "Creating Account..." : (<><UserPlus size={14} /> Create Account</>)}
            </button>
          </form>
        </div>

        <p className="text-center font-cormorant text-[#888880] mt-6 text-base">
          Already have an account?{" "}
          <Link href="/login" className="text-[#C9A84C] hover:text-[#E8C97A] transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
