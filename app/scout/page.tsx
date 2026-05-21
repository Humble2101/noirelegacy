"use client";

import { useState } from "react";
import { CheckCircle, Upload, Eye, Users, Globe } from "lucide-react";
import { useScrollRevealAll } from "@/lib/useScrollReveal";

const initialForm = {
  scoutName: "",
  agency: "",
  scoutEmail: "",
  modelName: "",
  modelAge: "",
  modelLocation: "",
  notes: "",
};

const features = [
  { icon: Eye, title: "Direct Access", desc: "Your submissions go directly to our creative directors and editorial team." },
  { icon: Users, title: "Global Network", desc: "We work with scouts and agents across Africa, Europe, and the Americas." },
  { icon: Globe, title: "Launch Platform", desc: "Noire Legacy has launched dozens of careers. Your discovery could be next." },
];

export default function ScoutPage() {
  useScrollRevealAll();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<typeof initialForm>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Partial<typeof initialForm> = {};
    if (!form.scoutName) e.scoutName = "Your name is required";
    if (!form.scoutEmail || !/\S+@\S+\.\S+/.test(form.scoutEmail)) e.scoutEmail = "Valid email is required";
    if (!form.modelName) e.modelName = "Model's name is required";
    if (!form.modelAge) e.modelAge = "Model's age is required";
    if (!form.modelLocation) e.modelLocation = "Model's location is required";
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
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
          <h2 className="font-playfair text-4xl font-black text-[#F5F0E8] mb-4">Submission Received</h2>
          <div className="gold-divider max-w-xs mx-auto mb-8" />
          <p className="font-cormorant text-[#F5F0E8]/70 text-xl leading-relaxed">
            Thank you for submitting <span className="text-[#C9A84C]">{form.modelName}</span>. 
            Our team will review the submission and be in touch within 5–10 business days.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <p className="font-cormorant text-[#C9A84C] text-xs tracking-[0.5em] uppercase mb-4 animate-in">
            Talent Discovery
          </p>
          <h1 className="font-playfair text-6xl md:text-7xl font-black text-[#F5F0E8] mb-6 animate-in delay-100">
            Scout a<br />
            <span className="italic text-[#C9A84C]">Model</span>
          </h1>
          <div className="gold-divider max-w-xs mb-8 animate-in delay-200" />
          <p className="font-cormorant text-[#888880] text-xl max-w-xl animate-in delay-300">
            Are you a talent agent, scout, or someone who's discovered an extraordinary 
            face? Submit them to Noire Legacy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Left — Program Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6 animate-in">
              {features.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-5 group">
                  <div className="w-10 h-10 border border-[#2A2A2A] flex-shrink-0 flex items-center justify-center group-hover:border-[#C9A84C] transition-colors">
                    <Icon size={16} className="text-[#C9A84C]" />
                  </div>
                  <div>
                    <h4 className="font-playfair text-lg text-[#F5F0E8] mb-2">{title}</h4>
                    <p className="font-cormorant text-[#888880] text-base leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border border-[#2A2A2A] p-6 animate-in delay-200">
              <h4 className="font-cormorant text-[#C9A84C] text-xs tracking-[0.4em] uppercase mb-4">
                What We Look For
              </h4>
              <ul className="space-y-3">
                {[
                  "Distinctive features & presence",
                  "Personality that translates to camera",
                  "Ages 16–35 (with guardian consent for minors)",
                  "All heights, sizes & backgrounds welcome",
                  "Lagos-based talent preferred but not required",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-[#C9A84C] text-xs mt-1">◆</span>
                    <span className="font-cormorant text-[#F5F0E8]/70 text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-3 animate-in delay-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="font-cormorant text-xs tracking-[0.5em] uppercase text-[#C9A84C] mb-5">
                  Scout / Agent Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <input name="scoutName" value={form.scoutName} onChange={handleChange}
                      placeholder="Your Full Name *" className="form-input" />
                    {errors.scoutName && <p className="text-[#6B1A2A] text-sm mt-1 font-cormorant">{errors.scoutName}</p>}
                  </div>
                  <input name="agency" value={form.agency} onChange={handleChange}
                    placeholder="Agency Name (optional)" className="form-input" />
                  <div>
                    <input name="scoutEmail" type="email" value={form.scoutEmail} onChange={handleChange}
                      placeholder="Your Email Address *" className="form-input" />
                    {errors.scoutEmail && <p className="text-[#6B1A2A] text-sm mt-1 font-cormorant">{errors.scoutEmail}</p>}
                  </div>
                </div>
              </div>

              <div className="gold-divider" />

              <div>
                <h3 className="font-cormorant text-xs tracking-[0.5em] uppercase text-[#C9A84C] mb-5">
                  Model Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <input name="modelName" value={form.modelName} onChange={handleChange}
                      placeholder="Model's Full Name *" className="form-input" />
                    {errors.modelName && <p className="text-[#6B1A2A] text-sm mt-1 font-cormorant">{errors.modelName}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input name="modelAge" type="number" value={form.modelAge} onChange={handleChange}
                        placeholder="Age *" className="form-input" min={16} max={50} />
                      {errors.modelAge && <p className="text-[#6B1A2A] text-sm mt-1 font-cormorant">{errors.modelAge}</p>}
                    </div>
                    <div>
                      <input name="modelLocation" value={form.modelLocation} onChange={handleChange}
                        placeholder="City, Country *" className="form-input" />
                      {errors.modelLocation && <p className="text-[#6B1A2A] text-sm mt-1 font-cormorant">{errors.modelLocation}</p>}
                    </div>
                  </div>

                  <label className="flex items-center gap-3 border border-dashed border-[#2A2A2A] p-5 cursor-pointer hover:border-[#C9A84C]/50 transition-colors group">
                    <Upload size={20} className="text-[#888880] group-hover:text-[#C9A84C] transition-colors" />
                    <div>
                      <span className="font-cormorant text-[#888880] group-hover:text-[#F5F0E8] transition-colors block">
                        Upload Model Photos
                      </span>
                      <span className="font-cormorant text-[#888880]/60 text-sm">
                        Multiple files accepted. JPG, PNG up to 10MB each.
                      </span>
                    </div>
                    <input type="file" className="hidden" multiple accept="image/*" />
                  </label>

                  <textarea name="notes" value={form.notes} onChange={handleChange}
                    placeholder="Why are you submitting this model? Tell us what makes them extraordinary..."
                    rows={5} className="form-input resize-none" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full border border-[#C9A84C] bg-[#C9A84C] text-[#0A0A0A] font-cormorant text-sm tracking-[0.4em] uppercase py-5 hover:bg-transparent hover:text-[#C9A84C] transition-all duration-400 disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Scouting Report"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
