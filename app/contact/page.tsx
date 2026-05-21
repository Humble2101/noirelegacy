"use client";

import { useState } from "react";
import { CheckCircle, Instagram, Music2, MapPin, Mail } from "lucide-react";
import { useScrollRevealAll } from "@/lib/useScrollReveal";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const socials = [
  { icon: Instagram, label: "Instagram", handle: "@noirelecacy", href: "#" },
  { icon: Music2, label: "TikTok", handle: "@noirelecacy", href: "#" },
  { icon: Mail, label: "Email", handle: "hello@noirelecacy.com", href: "mailto:hello@noirelecacy.com" },
];

export default function ContactPage() {
  useScrollRevealAll();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<typeof initialForm>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Partial<typeof initialForm> = {};
    if (!form.name) e.name = "Name is required";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email is required";
    if (!form.subject) e.subject = "Please select a subject";
    if (!form.message) e.message = "Message is required";
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
          <h2 className="font-playfair text-4xl font-black text-[#F5F0E8] mb-4">Message Sent</h2>
          <div className="gold-divider max-w-xs mx-auto mb-8" />
          <p className="font-cormorant text-[#F5F0E8]/70 text-xl leading-relaxed">
            Thank you for reaching out. We'll respond within 2–3 business days.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <p className="font-cormorant text-[#C9A84C] text-xs tracking-[0.5em] uppercase mb-4 animate-in">
            Reach Out
          </p>
          <h1 className="font-playfair text-6xl md:text-7xl font-black text-[#F5F0E8] mb-6 animate-in delay-100">
            Let's Connect
          </h1>
          <div className="gold-divider max-w-xs mb-8 animate-in delay-200" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Left */}
          <div className="lg:col-span-2 space-y-10 animate-in">
            <div>
              <h3 className="font-cormorant text-xs tracking-[0.5em] uppercase text-[#C9A84C] mb-6">
                Where to Find Us
              </h3>
              <div className="flex items-start gap-4">
                <MapPin size={18} className="text-[#C9A84C] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-playfair text-lg text-[#F5F0E8]">Lagos, Nigeria 🇳🇬</p>
                  <p className="font-cormorant text-[#888880] text-base mt-1">
                    The creative capital of Africa's fashion future.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-cormorant text-xs tracking-[0.5em] uppercase text-[#C9A84C] mb-6">
                Connect With Us
              </h3>
              <div className="space-y-4">
                {socials.map(({ icon: Icon, label, handle, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 border border-[#2A2A2A] flex items-center justify-center group-hover:border-[#C9A84C] transition-colors">
                      <Icon size={16} className="text-[#888880] group-hover:text-[#C9A84C] transition-colors" />
                    </div>
                    <div>
                      <p className="font-cormorant text-[#888880] text-xs tracking-[0.3em] uppercase">{label}</p>
                      <p className="font-cormorant text-[#F5F0E8] text-base group-hover:text-[#C9A84C] transition-colors">
                        {handle}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="border border-[#2A2A2A] p-6">
              <h4 className="font-cormorant text-[#C9A84C] text-xs tracking-[0.4em] uppercase mb-4">
                Response Times
              </h4>
              <div className="space-y-3">
                {[
                  { type: "General Inquiries", time: "2–3 business days" },
                  { type: "Model Applications", time: "7–14 business days" },
                  { type: "Brand Partnerships", time: "48 hours" },
                  { type: "Scout Submissions", time: "5–10 business days" },
                ].map(({ type, time }) => (
                  <div key={type} className="flex justify-between items-center">
                    <span className="font-cormorant text-[#888880] text-sm">{type}</span>
                    <span className="font-cormorant text-[#C9A84C] text-sm">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-3 animate-in delay-200">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input name="name" value={form.name} onChange={handleChange}
                    placeholder="Your Name *" className="form-input" />
                  {errors.name && <p className="text-[#6B1A2A] text-sm mt-1 font-cormorant">{errors.name}</p>}
                </div>
                <div>
                  <input name="email" type="email" value={form.email} onChange={handleChange}
                    placeholder="Email Address *" className="form-input" />
                  {errors.email && <p className="text-[#6B1A2A] text-sm mt-1 font-cormorant">{errors.email}</p>}
                </div>
              </div>

              <div>
                <select name="subject" value={form.subject} onChange={handleChange} className="form-input">
                  <option value="">Subject *</option>
                  <option value="general">General Inquiry</option>
                  <option value="model-application">Model Application Query</option>
                  <option value="brand-partnership">Brand Partnership</option>
                  <option value="press">Press & Media</option>
                  <option value="events">Events & Collaborations</option>
                  <option value="other">Other</option>
                </select>
                {errors.subject && <p className="text-[#6B1A2A] text-sm mt-1 font-cormorant">{errors.subject}</p>}
              </div>

              <div>
                <textarea name="message" value={form.message} onChange={handleChange}
                  placeholder="Your message..." rows={8} className="form-input resize-none" />
                {errors.message && <p className="text-[#6B1A2A] text-sm mt-1 font-cormorant">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full border border-[#C9A84C] bg-[#C9A84C] text-[#0A0A0A] font-cormorant text-sm tracking-[0.4em] uppercase py-5 hover:bg-transparent hover:text-[#C9A84C] transition-all duration-400 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
