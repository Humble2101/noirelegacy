"use client";

import { useState } from "react";
import Link from "next/link";
import { Instagram, Music2, PinIcon, Linkedin } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Models", href: "/models" },
  { label: "Scout a Model", href: "/scout" },
  { label: "Business & Brands", href: "/business" },
  { label: "Gallery", href: "/gallery" },
  { label: "Apply as a Model", href: "/apply" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Music2, label: "TikTok", href: "#" },
  { icon: PinIcon, label: "Pinterest", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#2A2A2A] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="font-playfair text-3xl font-black tracking-[0.3em] text-[#F5F0E8] uppercase">
                Noire Legacy
              </h3>
              <p className="text-[#C9A84C] text-xs tracking-[0.5em] uppercase font-cormorant mt-1">
                Magazine
              </p>
            </div>
            <p className="font-cormorant text-[#888880] text-lg leading-relaxed max-w-sm">
              A sanctuary of dark elegance. Where identity, power, and legacy 
              converge through the lens of artistry.
            </p>
            <div className="flex gap-4 mt-8">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 border border-[#2A2A2A] flex items-center justify-center text-[#888880] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-cormorant text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-6">
              Navigate
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-cormorant text-[#888880] hover:text-[#F5F0E8] text-base transition-colors duration-300 tracking-wide"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-cormorant text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-6">
              Stay in the Know
            </h4>
            <p className="font-cormorant text-[#888880] text-base mb-6 leading-relaxed">
              Subscribe for exclusive editorials, model calls, and brand features.
            </p>
            {subscribed ? (
              <p className="font-cormorant text-[#C9A84C] italic text-lg">
                Thank you for subscribing.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="form-input text-sm"
                  required
                />
                <button
                  type="submit"
                  className="border border-[#C9A84C] text-[#C9A84C] font-cormorant text-xs tracking-[0.3em] uppercase py-3 hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all duration-300"
                >
                  Subscribe
                </button>
              </form>
            )}
            <div className="mt-8">
              <p className="font-cormorant text-[#888880] text-sm">
                <a
                  href="mailto:hello@noirelecacy.com"
                  className="hover:text-[#C9A84C] transition-colors"
                >
                  hello@noirelecacy.com
                </a>
              </p>
              <p className="font-cormorant text-[#888880] text-sm mt-1">
                Lagos, Nigeria 🇳🇬
              </p>
            </div>
          </div>
        </div>

        <div className="gold-divider mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-cormorant text-[#888880] text-sm tracking-wide">
            © 2026 Noire Legacy Magazine. All rights reserved.
          </p>
          <p className="font-cormorant text-[#888880] text-sm italic">
            Where Legacy Meets the Lens
          </p>
        </div>
      </div>
    </footer>
  );
}
