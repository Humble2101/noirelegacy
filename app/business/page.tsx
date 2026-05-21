"use client";

import { useState } from "react";
import { CheckCircle, Star } from "lucide-react";
import { useScrollRevealAll } from "@/lib/useScrollReveal";

const tiers = [
  {
    name: "Bronze",
    price: "Entry",
    icon: "◆",
    color: "#CD7F32",
    desc: "Perfect for emerging brands seeking digital visibility.",
    includes: [
      "Digital feature on Noire Legacy website",
      "1 dedicated social media post",
      "Brand mention in monthly newsletter",
      "Digital press kit badge",
    ],
  },
  {
    name: "Gold",
    price: "Premium",
    icon: "◆◆",
    color: "#C9A84C",
    featured: true,
    desc: "The editorial experience. Maximum exposure, premium placement.",
    includes: [
      "Full magazine spread (4 pages)",
      "Brand interview feature",
      "Social media campaign (5 posts)",
      "Newsletter spotlight",
      "Co-branded content creation",
      "Digital + print distribution",
    ],
  },
  {
    name: "Platinum",
    price: "Elite",
    icon: "◆◆◆",
    color: "#E5E5E5",
    desc: "The ultimate brand partnership. Cover-level authority.",
    includes: [
      "Cover feature / co-branding",
      "Full editorial shoot with models",
      "Exclusive brand partnership deal",
      "8-page magazine spread",
      "Long-form brand story",
      "Multi-platform social campaign",
      "Event sponsorship opportunities",
      "Dedicated PR support",
    ],
  },
];

const initialForm = {
  companyName: "",
  contactPerson: "",
  email: "",
  phone: "",
  website: "",
  budget: "",
  goals: "",
  preferredTier: "",
};

export default function BusinessPage() {
  useScrollRevealAll();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<typeof initialForm>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Partial<typeof initialForm> = {};
    if (!form.companyName) e.companyName = "Company name is required";
    if (!form.contactPerson) e.contactPerson = "Contact person is required";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email is required";
    if (!form.goals) e.goals = "Please describe your campaign goals";
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
          <h2 className="font-playfair text-4xl font-black text-[#F5F0E8] mb-4">Inquiry Received</h2>
          <div className="gold-divider max-w-xs mx-auto mb-8" />
          <p className="font-cormorant text-[#F5F0E8]/70 text-xl leading-relaxed">
            Thank you, <span className="text-[#C9A84C]">{form.companyName}</span>. Our partnerships 
            team will contact you within 48 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="font-cormorant text-[#C9A84C] text-xs tracking-[0.5em] uppercase mb-4 animate-in">
            Brand Partnerships
          </p>
          <h1 className="font-playfair text-6xl md:text-7xl font-black text-[#F5F0E8] mb-6 animate-in delay-100">
            Amplify Your Brand<br />
            <span className="italic text-[#C9A84C]">Through Noire Legacy</span>
          </h1>
          <div className="gold-divider max-w-xs mx-auto mb-8 animate-in delay-200" />
          <p className="font-cormorant text-[#888880] text-xl max-w-2xl mx-auto animate-in delay-300">
            Position your brand alongside the most compelling editorial voice in luxury 
            African fashion media. We don't just feature brands — we tell their story.
          </p>
        </div>

        {/* Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {tiers.map((tier, i) => (
            <div
              key={tier.name}
              className={`relative border p-8 transition-all duration-500 animate-in ${
                tier.featured
                  ? "border-[#C9A84C] bg-[#C9A84C]/5"
                  : "border-[#2A2A2A] hover:border-[#C9A84C]/40"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {tier.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#C9A84C] px-4 py-1">
                  <span className="font-cormorant text-[#0A0A0A] text-xs tracking-[0.3em] uppercase flex items-center gap-1">
                    <Star size={10} fill="currentColor" /> Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <span style={{ color: tier.color }} className="font-cormorant text-2xl">
                  {tier.icon}
                </span>
              </div>
              <p className="font-cormorant text-xs tracking-[0.4em] uppercase mb-2"
                style={{ color: tier.color }}>
                {tier.price}
              </p>
              <h3 className="font-playfair text-3xl font-black text-[#F5F0E8] mb-4">
                {tier.name}
              </h3>
              <div className="h-px mb-6" style={{ background: `linear-gradient(90deg, ${tier.color}40, transparent)` }} />
              <p className="font-cormorant text-[#888880] text-base leading-relaxed mb-8">
                {tier.desc}
              </p>
              <ul className="space-y-3 mb-10">
                {tier.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span style={{ color: tier.color }} className="mt-1 text-xs">◆</span>
                    <span className="font-cormorant text-[#F5F0E8]/70 text-base">{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => {
                  setForm((f) => ({ ...f, preferredTier: tier.name }));
                  document.getElementById("inquiry-form")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full py-3 border font-cormorant text-xs tracking-[0.3em] uppercase transition-all duration-300"
                style={{
                  borderColor: tier.color,
                  color: tier.color,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = `${tier.color}20`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                }}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        {/* Inquiry Form */}
        <div id="inquiry-form" className="max-w-3xl mx-auto animate-in">
          <div className="mb-12">
            <p className="font-cormorant text-[#C9A84C] text-xs tracking-[0.5em] uppercase mb-4">
              Start the Conversation
            </p>
            <h2 className="font-playfair text-4xl font-black text-[#F5F0E8] mb-4">
              Partnership Inquiry
            </h2>
            <div className="gold-divider max-w-xs mb-6" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input name="companyName" value={form.companyName} onChange={handleChange}
                  placeholder="Company Name *" className="form-input" />
                {errors.companyName && <p className="text-[#6B1A2A] text-sm mt-1 font-cormorant">{errors.companyName}</p>}
              </div>
              <div>
                <input name="contactPerson" value={form.contactPerson} onChange={handleChange}
                  placeholder="Contact Person *" className="form-input" />
                {errors.contactPerson && <p className="text-[#6B1A2A] text-sm mt-1 font-cormorant">{errors.contactPerson}</p>}
              </div>
              <div>
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder="Email Address *" className="form-input" />
                {errors.email && <p className="text-[#6B1A2A] text-sm mt-1 font-cormorant">{errors.email}</p>}
              </div>
              <div>
                <input name="phone" value={form.phone} onChange={handleChange}
                  placeholder="Phone Number" className="form-input" />
              </div>
              <div>
                <input name="website" value={form.website} onChange={handleChange}
                  placeholder="Website URL" className="form-input" />
              </div>
              <div>
                <select name="budget" value={form.budget} onChange={handleChange} className="form-input">
                  <option value="">Budget Range</option>
                  <option value="under-500k">Under ₦500,000</option>
                  <option value="500k-1m">₦500K – ₦1M</option>
                  <option value="1m-5m">₦1M – ₦5M</option>
                  <option value="5m-plus">₦5M+</option>
                  <option value="discuss">Prefer to Discuss</option>
                </select>
              </div>
            </div>

            <div>
              <select name="preferredTier" value={form.preferredTier} onChange={handleChange} className="form-input">
                <option value="">Preferred Partnership Tier</option>
                <option value="Bronze">Bronze — Digital Feature</option>
                <option value="Gold">Gold — Magazine Spread & Campaign</option>
                <option value="Platinum">Platinum — Cover Partnership</option>
              </select>
            </div>

            <div>
              <textarea name="goals" value={form.goals} onChange={handleChange}
                placeholder="Campaign Goals — Tell us what you're trying to achieve and why Noire Legacy is the right platform... *"
                rows={5} className="form-input resize-none" />
              {errors.goals && <p className="text-[#6B1A2A] text-sm mt-1 font-cormorant">{errors.goals}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full border border-[#C9A84C] bg-[#C9A84C] text-[#0A0A0A] font-cormorant text-sm tracking-[0.4em] uppercase py-5 hover:bg-transparent hover:text-[#C9A84C] transition-all duration-400 disabled:opacity-50"
            >
              {loading ? "Sending Inquiry..." : "Submit Inquiry"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
