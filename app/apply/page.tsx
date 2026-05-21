"use client";

import { useState } from "react";
import { CheckCircle, Upload } from "lucide-react";
import { useScrollRevealAll } from "@/lib/useScrollReveal";

type FormData = {
  fullName: string;
  age: string;
  genderIdentity: string;
  city: string;
  country: string;
  height: string;
  measurements: string;
  experienceLevel: string;
  portfolioUrl: string;
  instagram: string;
  categories: string[];
  bio: string;
};

const initialForm: FormData = {
  fullName: "",
  age: "",
  genderIdentity: "",
  city: "",
  country: "",
  height: "",
  measurements: "",
  experienceLevel: "",
  portfolioUrl: "",
  instagram: "",
  categories: [],
  bio: "",
};

const categoryOptions = ["Editorial", "Runway", "Commercial", "Cover", "Brand Ambassador"];

export default function ApplyPage() {
  useScrollRevealAll();
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.fullName) e.fullName = "Full name is required";
    if (!form.age || +form.age < 16 || +form.age > 65) e.age = "Age must be between 16 and 65";
    if (!form.genderIdentity) e.genderIdentity = "Please specify your gender identity";
    if (!form.city) e.city = "City is required";
    if (!form.country) e.country = "Country is required";
    if (!form.height) e.height = "Height is required";
    if (!form.experienceLevel) e.experienceLevel = "Please select your experience level";
    if (form.categories.length === 0) (e as Record<string, string>).categories = "Select at least one category";
    if (!form.bio) e.bio = "Please tell us about yourself";
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const toggleCategory = (cat: string) => {
    setForm((f) => ({
      ...f,
      categories: f.categories.includes(cat)
        ? f.categories.filter((c) => c !== cat)
        : [...f.categories, cat],
    }));
    setErrors((prev) => ({ ...prev, categories: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs as Partial<FormData>);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-xl animate-fade-up">
          <CheckCircle className="text-[#C9A84C] mx-auto mb-8" size={64} />
          <h2 className="font-playfair text-4xl font-black text-[#F5F0E8] mb-4">
            Application Received
          </h2>
          <div className="gold-divider max-w-xs mx-auto mb-8" />
          <p className="font-cormorant text-[#F5F0E8]/70 text-xl leading-relaxed mb-4">
            Thank you, <span className="text-[#C9A84C]">{form.fullName}</span>. 
            Your application has been received — we'll be in touch.
          </p>
          <p className="font-cormorant text-[#888880] text-lg">
            Our editorial team reviews applications within 7–14 business days.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="font-cormorant text-[#C9A84C] text-xs tracking-[0.5em] uppercase mb-4 animate-in">
            Join the Collective
          </p>
          <h1 className="font-playfair text-6xl font-black text-[#F5F0E8] mb-6 animate-in delay-100">
            Apply as a<br />
            <span className="italic text-[#C9A84C]">Model</span>
          </h1>
          <div className="gold-divider max-w-xs mb-8 animate-in delay-200" />
          <p className="font-cormorant text-[#888880] text-xl animate-in delay-300">
            Complete the form below with care. Every submission is reviewed personally 
            by our editorial and creative team.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 animate-in delay-200">
          {/* Personal Info */}
          <div>
            <h3 className="font-cormorant text-xs tracking-[0.5em] uppercase text-[#C9A84C] mb-6">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Full Name *"
                  className="form-input"
                />
                {errors.fullName && <p className="text-[#6B1A2A] text-sm mt-1 font-cormorant">{errors.fullName}</p>}
              </div>
              <div>
                <input
                  name="age"
                  type="number"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="Age *"
                  className="form-input"
                  min={16}
                  max={65}
                />
                {errors.age && <p className="text-[#6B1A2A] text-sm mt-1 font-cormorant">{errors.age}</p>}
              </div>
              <div className="md:col-span-2">
                <input
                  name="genderIdentity"
                  value={form.genderIdentity}
                  onChange={handleChange}
                  placeholder="Gender Identity *"
                  className="form-input"
                />
                {errors.genderIdentity && <p className="text-[#6B1A2A] text-sm mt-1 font-cormorant">{errors.genderIdentity}</p>}
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="font-cormorant text-xs tracking-[0.5em] uppercase text-[#C9A84C] mb-6">
              Location
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City *"
                  className="form-input"
                />
                {errors.city && <p className="text-[#6B1A2A] text-sm mt-1 font-cormorant">{errors.city}</p>}
              </div>
              <div>
                <input
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="Country *"
                  className="form-input"
                />
                {errors.country && <p className="text-[#6B1A2A] text-sm mt-1 font-cormorant">{errors.country}</p>}
              </div>
            </div>
          </div>

          {/* Measurements */}
          <div>
            <h3 className="font-cormorant text-xs tracking-[0.5em] uppercase text-[#C9A84C] mb-6">
              Measurements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  name="height"
                  value={form.height}
                  onChange={handleChange}
                  placeholder={`Height (e.g. 5'10") *`}
                  className="form-input"
                />
                {errors.height && <p className="text-[#6B1A2A] text-sm mt-1 font-cormorant">{errors.height}</p>}
              </div>
              <div>
                <input
                  name="measurements"
                  value={form.measurements}
                  onChange={handleChange}
                  placeholder="Measurements (e.g. 32-24-35)"
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="font-cormorant text-xs tracking-[0.5em] uppercase text-[#C9A84C] mb-6">
              Experience
            </h3>
            <select
              name="experienceLevel"
              value={form.experienceLevel}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Experience Level *</option>
              <option value="new-face">New Face</option>
              <option value="emerging">Emerging</option>
              <option value="experienced">Experienced</option>
            </select>
            {errors.experienceLevel && <p className="text-[#6B1A2A] text-sm mt-1 font-cormorant">{errors.experienceLevel}</p>}
          </div>

          {/* Portfolio */}
          <div>
            <h3 className="font-cormorant text-xs tracking-[0.5em] uppercase text-[#C9A84C] mb-6">
              Portfolio & Social
            </h3>
            <div className="space-y-4">
              <input
                name="portfolioUrl"
                value={form.portfolioUrl}
                onChange={handleChange}
                placeholder="Portfolio URL (optional)"
                className="form-input"
              />
              <input
                name="instagram"
                value={form.instagram}
                onChange={handleChange}
                placeholder="Instagram Handle (e.g. @yourname)"
                className="form-input"
              />
              <label className="flex items-center gap-3 border border-dashed border-[#2A2A2A] p-5 cursor-pointer hover:border-[#C9A84C]/50 transition-colors group">
                <Upload size={20} className="text-[#888880] group-hover:text-[#C9A84C] transition-colors" />
                <span className="font-cormorant text-[#888880] group-hover:text-[#F5F0E8] transition-colors">
                  Upload Portfolio / Photos (optional)
                </span>
                <input type="file" className="hidden" multiple accept="image/*,.pdf" />
              </label>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-cormorant text-xs tracking-[0.5em] uppercase text-[#C9A84C] mb-6">
              Applying For *
            </h3>
            <div className="flex flex-wrap gap-3">
              {categoryOptions.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  className={`font-cormorant text-sm tracking-[0.2em] uppercase px-5 py-2 border transition-all duration-300 ${
                    form.categories.includes(cat)
                      ? "border-[#C9A84C] bg-[#C9A84C]/15 text-[#C9A84C]"
                      : "border-[#2A2A2A] text-[#888880] hover:border-[#C9A84C]/50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            {(errors as Record<string, string>).categories && (
              <p className="text-[#6B1A2A] text-sm mt-2 font-cormorant">
                {(errors as Record<string, string>).categories}
              </p>
            )}
          </div>

          {/* Bio */}
          <div>
            <h3 className="font-cormorant text-xs tracking-[0.5em] uppercase text-[#C9A84C] mb-6">
              Tell Us Your Story *
            </h3>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Share your story, your vision, and why Noire Legacy is the right stage for you..."
              rows={6}
              className="form-input resize-none"
            />
            {errors.bio && <p className="text-[#6B1A2A] text-sm mt-1 font-cormorant">{errors.bio}</p>}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full border border-[#C9A84C] bg-[#C9A84C] text-[#0A0A0A] font-cormorant text-sm tracking-[0.4em] uppercase py-5 hover:bg-transparent hover:text-[#C9A84C] transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting Application..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
