"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useScrollRevealAll } from "@/lib/useScrollReveal";

const featuredModels = [
  { id: 1, seed: 64, name: "Amara Osei", category: "Editorial" },
  { id: 2, seed: 65, name: "Zainab Lawal", category: "Runway" },
  { id: 3, seed: 91, name: "Kemi Adeyemi", category: "Commercial" },
  { id: 4, seed: 169, name: "Sola Bankole", category: "Cover" },
  { id: 5, seed: 175, name: "Fatima Aliyu", category: "Editorial" },
  { id: 6, seed: 177, name: "Ngozi Eze", category: "Brand Ambassador" },
];

const pillars = [
  {
    word: "Identity",
    roman: "I",
    desc: "We celebrate the complexity of who you are — every shade, every facet, every contradiction that makes you singular.",
  },
  {
    word: "Power",
    roman: "II",
    desc: "Beauty is authority. Noire Legacy amplifies voices that command attention and demand to be remembered.",
  },
  {
    word: "Elegance",
    roman: "III",
    desc: "Refinement is not restraint — it is the art of choosing exactly what matters and executing it with precision.",
  },
];

export default function HomePage() {
  useScrollRevealAll();
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax on hero
  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
        {/* Parallax BG */}
        <div ref={heroRef} className="absolute inset-0 will-change-transform">
          <Image
            src="https://picsum.photos/seed/noir1/1920/1080"
            alt="Noire Legacy Hero"
            fill
            className="object-cover opacity-25"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-transparent to-[#0A0A0A]" />
        </div>

        {/* Decorative lines */}
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent animate-gold-pulse" />
        <div className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent animate-gold-pulse" style={{ animationDelay: "1s" }} />

        {/* Left vertical text */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4">
          <div className="h-20 w-px bg-gradient-to-b from-transparent to-[#C9A84C]/60" />
          <span className="font-cormorant text-[#888880] text-xs tracking-[0.4em] uppercase" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
            Lagos · Nigeria · 2026
          </span>
          <div className="h-20 w-px bg-gradient-to-t from-transparent to-[#C9A84C]/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <p className="font-cormorant text-[#C9A84C] text-xs tracking-[0.7em] uppercase mb-8 animate-fade-in opacity-0" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
            Vol. VI — 2026 Edition
          </p>

          <h1 className="font-playfair text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-[#F5F0E8] leading-[0.9] mb-8">
            <span className="block animate-fade-up opacity-0" style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}>
              Where
            </span>
            <span className="block italic text-[#C9A84C] animate-fade-up opacity-0" style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}>
              Legacy
            </span>
            <span className="block animate-fade-up opacity-0" style={{ animationDelay: "0.9s", animationFillMode: "forwards" }}>
              Meets the Lens
            </span>
          </h1>

          <div className="gold-divider my-8 animate-fade-in opacity-0 max-w-xs mx-auto" style={{ animationDelay: "1.1s", animationFillMode: "forwards" }} />

          <p className="font-cormorant italic text-[#F5F0E8]/70 text-xl md:text-2xl tracking-wide mb-12 animate-fade-up opacity-0" style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}>
            A high-fashion editorial magazine celebrating identity, power, and elegance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up opacity-0" style={{ animationDelay: "1.4s", animationFillMode: "forwards" }}>
            <Link
              href="/apply"
              className="group border border-[#C9A84C] bg-[#C9A84C] text-[#0A0A0A] font-cormorant text-sm tracking-[0.3em] uppercase px-10 py-4 hover:bg-transparent hover:text-[#C9A84C] transition-all duration-400 flex items-center justify-center gap-3"
            >
              Apply as a Model
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/business"
              className="group border border-[#F5F0E8]/40 text-[#F5F0E8]/80 font-cormorant text-sm tracking-[0.3em] uppercase px-10 py-4 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-400 flex items-center justify-center gap-3"
            >
              Partner With Us
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-gold-pulse">
          <span className="font-cormorant text-[#888880] text-xs tracking-[0.4em] uppercase">Scroll</span>
          <ChevronDown size={16} className="text-[#C9A84C]" />
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
            <div>
              <p className="font-cormorant text-[#C9A84C] text-xs tracking-[0.5em] uppercase mb-6 animate-in">
                About the Magazine
              </p>
              <h2 className="font-playfair text-5xl md:text-6xl font-black text-[#F5F0E8] leading-tight mb-8 animate-in delay-100">
                A Publication <br />
                <span className="italic text-[#C9A84C]">Unlike Any Other</span>
              </h2>
              <div className="gold-divider mb-8 animate-in delay-200" />
              <p className="font-cormorant text-[#F5F0E8]/70 text-xl leading-relaxed mb-6 animate-in delay-300">
                Noire Legacy was born from the belief that luxury fashion media should 
                reflect the full spectrum of its audience — their complexity, their culture, 
                their commanding presence.
              </p>
              <p className="font-cormorant text-[#888880] text-lg leading-relaxed animate-in delay-400">
                Based in Lagos, we are a global editorial force. Every page is a statement. 
                Every cover is a declaration of legacy.
              </p>
            </div>
            <div className="relative animate-in delay-200">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="https://picsum.photos/seed/about1/800/1067"
                  alt="About Noire Legacy"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent" />
              </div>
              {/* Decorative offset box */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-[#C9A84C]/40" />
              <div className="absolute -top-6 -left-6 w-20 h-20 border border-[#C9A84C]/20" />
            </div>
          </div>

          {/* Pull quote */}
          <div className="text-center py-16 border-t border-b border-[#2A2A2A] mb-24 animate-in">
            <p className="font-playfair text-3xl md:text-4xl italic text-[#F5F0E8]/90 max-w-3xl mx-auto leading-relaxed">
              "Fashion is the armor to survive the reality of everyday life — 
              we make that armor extraordinary."
            </p>
            <p className="font-cormorant text-[#C9A84C] text-sm tracking-[0.4em] uppercase mt-6">
              — Noire Legacy Editorial Team
            </p>
          </div>

          {/* Three Pillars */}
          <div>
            <p className="font-cormorant text-[#C9A84C] text-xs tracking-[0.5em] uppercase mb-4 text-center animate-in">
              Our Foundation
            </p>
            <h2 className="font-playfair text-4xl font-black text-[#F5F0E8] text-center mb-16 animate-in delay-100">
              The Editorial Pillars
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
              {pillars.map((p, i) => (
                <div
                  key={p.word}
                  className="group relative border border-[#2A2A2A] p-10 hover:border-[#C9A84C]/40 transition-colors duration-500 animate-in"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <span className="font-playfair text-8xl font-black text-[#C9A84C]/10 group-hover:text-[#C9A84C]/20 transition-colors absolute top-6 right-8 select-none">
                    {p.roman}
                  </span>
                  <p className="font-cormorant text-[#C9A84C] text-xs tracking-[0.5em] uppercase mb-4">
                    0{i + 1}
                  </p>
                  <h3 className="font-playfair text-3xl font-black text-[#F5F0E8] mb-6">
                    {p.word}
                  </h3>
                  <div className="w-10 h-px bg-[#C9A84C] mb-6 group-hover:w-20 transition-all duration-500" />
                  <p className="font-cormorant text-[#888880] text-lg leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── MODELS PREVIEW ─── */}
      <section className="py-24 px-6 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="font-cormorant text-[#C9A84C] text-xs tracking-[0.5em] uppercase mb-3 animate-in">
                The Roster
              </p>
              <h2 className="font-playfair text-5xl font-black text-[#F5F0E8] animate-in delay-100">
                Featured Models
              </h2>
            </div>
            <Link
              href="/models"
              className="hidden md:flex items-center gap-2 font-cormorant text-sm tracking-[0.3em] uppercase text-[#C9A84C] hover:text-[#E8C97A] transition-colors group animate-in"
            >
              See All Models
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {featuredModels.map((model, i) => (
              <div
                key={model.id}
                className="group relative overflow-hidden cursor-pointer animate-in"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src={`https://picsum.photos/seed/${model.seed}/600/800`}
                    alt={model.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gold overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-[#C9A84C]/0 group-hover:bg-[#C9A84C]/10 transition-all duration-500" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="font-cormorant text-[#C9A84C] text-xs tracking-[0.4em] uppercase">
                    {model.category}
                  </span>
                  <h4 className="font-playfair text-xl text-[#F5F0E8] mt-1">{model.name}</h4>
                  <div className="h-px w-0 group-hover:w-full bg-[#C9A84C]/60 transition-all duration-500 mt-3" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/models"
              className="inline-block border border-[#C9A84C]/50 text-[#C9A84C] font-cormorant text-sm tracking-[0.3em] uppercase px-12 py-4 hover:border-[#C9A84C] hover:bg-[#C9A84C]/10 transition-all duration-300"
            >
              View All Models
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://picsum.photos/seed/cta1/1920/600"
            alt="CTA background"
            fill
            className="object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="gold-divider mb-12 max-w-xs mx-auto animate-in" />
          <h2 className="font-playfair text-5xl md:text-6xl font-black text-[#F5F0E8] mb-8 animate-in delay-100">
            Your Legacy <span className="italic text-[#C9A84C]">Starts Here</span>
          </h2>
          <p className="font-cormorant text-[#F5F0E8]/70 text-xl leading-relaxed mb-12 animate-in delay-200">
            Whether you're an emerging model, an established talent, or a brand ready 
            to make history — Noire Legacy is your stage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in delay-300">
            <Link
              href="/apply"
              className="border border-[#C9A84C] bg-[#C9A84C] text-[#0A0A0A] font-cormorant text-sm tracking-[0.3em] uppercase px-10 py-4 hover:bg-transparent hover:text-[#C9A84C] transition-all duration-400"
            >
              Model Applications
            </Link>
            <Link
              href="/scout"
              className="border border-[#F5F0E8]/30 text-[#F5F0E8]/80 font-cormorant text-sm tracking-[0.3em] uppercase px-10 py-4 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-400"
            >
              Scout a Model
            </Link>
          </div>
          <div className="gold-divider mt-12 max-w-xs mx-auto animate-in delay-400" />
        </div>
      </section>
    </>
  );
}
