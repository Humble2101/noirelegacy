"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User, Save, CheckCircle, Camera } from "lucide-react";
import Image from "next/image";

type ProfileData = {
  name: string;
  email: string;
  bio: string;
  location: string;
  instagram: string;
  portfolioUrl: string;
  height: string;
  measurements: string;
  experienceLevel: string;
  categories: string;
};

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData>({
    name: "", email: "", bio: "", location: "", instagram: "",
    portfolioUrl: "", height: "", measurements: "", experienceLevel: "", categories: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login?callbackUrl=/profile");
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile")
        .then((r) => r.json())
        .then((data) => {
          setProfile({
            name: data.name || "",
            email: data.email || "",
            bio: data.profile?.bio || "",
            location: data.profile?.location || "",
            instagram: data.profile?.instagram || "",
            portfolioUrl: data.profile?.portfolioUrl || "",
            height: data.profile?.height || "",
            measurements: data.profile?.measurements || "",
            experienceLevel: data.profile?.experienceLevel || "",
            categories: data.profile?.categories || "",
          });
          setLoading(false);
        });
    }
  }, [status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setProfile((p) => ({ ...p, [e.target.name]: e.target.value }));
    setSaved(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });

    const data = await res.json();
    setSaving(false);

    if (res.ok) {
      setSaved(true);
      await update({ name: profile.name });
      setTimeout(() => setSaved(false), 3000);
    } else {
      setError(data.error || "Failed to save.");
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin mx-auto mb-4" />
          <p className="font-cormorant text-[#888880] tracking-[0.3em] uppercase text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <p className="font-cormorant text-[#C9A84C] text-xs tracking-[0.5em] uppercase mb-3">
              My Account
            </p>
            <h1 className="font-playfair text-5xl font-black text-[#F5F0E8]">
              My Profile
            </h1>
            <div className="gold-divider max-w-xs mt-4" />
          </div>

          {/* Avatar */}
          <div className="relative group">
            <div className="w-20 h-20 border-2 border-[#C9A84C]/40 bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
              {session?.user?.image ? (
                <Image src={session.user.image} alt="Avatar" fill className="object-cover" />
              ) : (
                <User size={32} className="text-[#C9A84C]" />
              )}
            </div>
            <div className="absolute inset-0 bg-[#0A0A0A]/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
              <Camera size={16} className="text-[#C9A84C]" />
            </div>
          </div>
        </div>

        {/* Role badge */}
        <div className="flex items-center gap-3 mb-10">
          <span className={`inline-block text-xs tracking-[0.4em] uppercase px-4 py-1.5 border font-cormorant ${
            session?.user?.role === "ADMIN"
              ? "border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10"
              : "border-[#2A2A2A] text-[#888880]"
          }`}>
            {session?.user?.role === "ADMIN" ? "Administrator" : "Member"}
          </span>
          <span className="font-cormorant text-[#888880] text-sm">
            {session?.user?.email}
          </span>
        </div>

        {error && (
          <div className="mb-6 border border-[#6B1A2A]/60 bg-[#6B1A2A]/10 px-4 py-3">
            <p className="font-cormorant text-[#F5F0E8]/80">{error}</p>
          </div>
        )}

        {saved && (
          <div className="mb-6 border border-[#C9A84C]/40 bg-[#C9A84C]/5 px-4 py-3 flex items-center gap-3">
            <CheckCircle size={16} className="text-[#C9A84C]" />
            <p className="font-cormorant text-[#C9A84C]">Profile saved successfully.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Basic Info */}
          <div className="border border-[#2A2A2A] p-8">
            <h3 className="font-cormorant text-xs tracking-[0.5em] uppercase text-[#C9A84C] mb-6">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="font-cormorant text-xs tracking-[0.3em] uppercase text-[#888880] block mb-2">Full Name</label>
                <input name="name" value={profile.name} onChange={handleChange} className="form-input" placeholder="Your name" />
              </div>
              <div>
                <label className="font-cormorant text-xs tracking-[0.3em] uppercase text-[#888880] block mb-2">Email</label>
                <input value={profile.email} className="form-input opacity-50 cursor-not-allowed" disabled />
              </div>
              <div className="md:col-span-2">
                <label className="font-cormorant text-xs tracking-[0.3em] uppercase text-[#888880] block mb-2">Location</label>
                <input name="location" value={profile.location} onChange={handleChange} className="form-input" placeholder="City, Country" />
              </div>
              <div className="md:col-span-2">
                <label className="font-cormorant text-xs tracking-[0.3em] uppercase text-[#888880] block mb-2">Bio</label>
                <textarea name="bio" value={profile.bio} onChange={handleChange}
                  className="form-input resize-none" rows={4} placeholder="Tell your story..." />
              </div>
            </div>
          </div>

          {/* Model Info */}
          <div className="border border-[#2A2A2A] p-8">
            <h3 className="font-cormorant text-xs tracking-[0.5em] uppercase text-[#C9A84C] mb-6">
              Model Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="font-cormorant text-xs tracking-[0.3em] uppercase text-[#888880] block mb-2">Height</label>
                <input name="height" value={profile.height} onChange={handleChange} className="form-input" placeholder={`e.g. 5'10"`} />
              </div>
              <div>
                <label className="font-cormorant text-xs tracking-[0.3em] uppercase text-[#888880] block mb-2">Measurements</label>
                <input name="measurements" value={profile.measurements} onChange={handleChange} className="form-input" placeholder="e.g. 32-24-35" />
              </div>
              <div>
                <label className="font-cormorant text-xs tracking-[0.3em] uppercase text-[#888880] block mb-2">Experience Level</label>
                <select name="experienceLevel" value={profile.experienceLevel} onChange={handleChange} className="form-input">
                  <option value="">Select level</option>
                  <option value="new-face">New Face</option>
                  <option value="emerging">Emerging</option>
                  <option value="experienced">Experienced</option>
                </select>
              </div>
              <div>
                <label className="font-cormorant text-xs tracking-[0.3em] uppercase text-[#888880] block mb-2">Categories</label>
                <input name="categories" value={profile.categories} onChange={handleChange} className="form-input" placeholder="Editorial, Runway, Commercial..." />
              </div>
            </div>
          </div>

          {/* Social & Portfolio */}
          <div className="border border-[#2A2A2A] p-8">
            <h3 className="font-cormorant text-xs tracking-[0.5em] uppercase text-[#C9A84C] mb-6">
              Social & Portfolio
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="font-cormorant text-xs tracking-[0.3em] uppercase text-[#888880] block mb-2">Instagram</label>
                <input name="instagram" value={profile.instagram} onChange={handleChange} className="form-input" placeholder="@yourhandle" />
              </div>
              <div>
                <label className="font-cormorant text-xs tracking-[0.3em] uppercase text-[#888880] block mb-2">Portfolio URL</label>
                <input name="portfolioUrl" value={profile.portfolioUrl} onChange={handleChange} className="form-input" placeholder="https://yourportfolio.com" />
              </div>
            </div>
          </div>

          <button type="submit" disabled={saving}
            className="flex items-center justify-center gap-3 border border-[#C9A84C] bg-[#C9A84C] text-[#0A0A0A] font-cormorant text-sm tracking-[0.4em] uppercase px-12 py-4 hover:bg-transparent hover:text-[#C9A84C] transition-all duration-400 disabled:opacity-50">
            {saving ? "Saving..." : (<><Save size={14} /> Save Profile</>)}
          </button>
        </form>
      </div>
    </div>
  );
}
