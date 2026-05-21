"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Filter } from "lucide-react";
import { useScrollRevealAll } from "@/lib/useScrollReveal";

const allModels = [
  { id: 1, seed: 64, name: "Amara Osei", category: "Editorial", location: "Lagos", height: "5'10\"", exp: "Experienced" },
  { id: 2, seed: 65, name: "Zainab Lawal", category: "Runway", location: "Abuja", height: "5'11\"", exp: "Experienced" },
  { id: 3, seed: 91, name: "Kemi Adeyemi", category: "Commercial", location: "Lagos", height: "5'8\"", exp: "Emerging" },
  { id: 4, seed: 169, name: "Sola Bankole", category: "Cover", location: "London", height: "5'10\"", exp: "Experienced" },
  { id: 5, seed: 175, name: "Fatima Aliyu", category: "Editorial", location: "Kano", height: "5'9\"", exp: "Emerging" },
  { id: 6, seed: 177, name: "Ngozi Eze", category: "Brand Ambassador", location: "Port Harcourt", height: "5'8\"", exp: "Experienced" },
  { id: 7, seed: 210, name: "Adaeze Nwosu", category: "Runway", location: "Enugu", height: "5'11\"", exp: "New Face" },
  { id: 8, seed: 216, name: "Tolu Adesanya", category: "Editorial", location: "Lagos", height: "5'9\"", exp: "Experienced" },
  { id: 9, seed: 237, name: "Bimpe Coker", category: "Commercial", location: "Ibadan", height: "5'7\"", exp: "Emerging" },
  { id: 10, seed: 342, name: "Chisom Obi", category: "Cover", location: "Lagos", height: "5'10\"", exp: "Experienced" },
  { id: 11, seed: 433, name: "Halima Yusuf", category: "Editorial", location: "Abuja", height: "5'10\"", exp: "New Face" },
  { id: 12, seed: 513, name: "Nneka Onyekachi", category: "Brand Ambassador", location: "Lagos", height: "5'8\"", exp: "Experienced" },
];

const categories = ["All", "Editorial", "Runway", "Commercial", "Cover", "Brand Ambassador"];

export default function ModelsPage() {
  useScrollRevealAll();
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? allModels
    : allModels.filter((m) => m.category === activeCategory);

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="font-cormorant text-[#C9A84C] text-xs tracking-[0.5em] uppercase mb-4 animate-in">
            Our Talent
          </p>
          <h1 className="font-playfair text-6xl md:text-7xl font-black text-[#F5F0E8] mb-6 animate-in delay-100">
            The Roster
          </h1>
          <div className="gold-divider max-w-xs mb-8 animate-in delay-200" />
          <p className="font-cormorant text-[#888880] text-xl max-w-xl animate-in delay-300">
            A curated collective of extraordinary talent — each face a universe, 
            each story a legacy waiting to be told.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-3 mb-12 flex-wrap animate-in">
          <Filter size={14} className="text-[#C9A84C]" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-cormorant text-xs tracking-[0.3em] uppercase px-5 py-2 border transition-all duration-300 ${
                activeCategory === cat
                  ? "border-[#C9A84C] bg-[#C9A84C]/10 text-[#C9A84C]"
                  : "border-[#2A2A2A] text-[#888880] hover:border-[#C9A84C]/50 hover:text-[#F5F0E8]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((model, i) => (
            <div
              key={model.id}
              className="group relative overflow-hidden cursor-pointer animate-in"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={`https://picsum.photos/seed/${model.seed}/600/800`}
                  alt={model.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/20 to-transparent opacity-80" />
                <div className="absolute inset-0 bg-[#C9A84C]/0 group-hover:bg-[#C9A84C]/8 transition-all duration-500" />

                {/* Category badge */}
                <div className="absolute top-4 left-4 border border-[#C9A84C]/60 px-3 py-1 backdrop-blur-sm bg-[#0A0A0A]/40">
                  <span className="font-cormorant text-[#C9A84C] text-[10px] tracking-[0.3em] uppercase">
                    {model.category}
                  </span>
                </div>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="font-cormorant text-[#888880] text-xs tracking-wide">
                    {model.location}
                  </span>
                  <h4 className="font-playfair text-lg text-[#F5F0E8] mt-1">{model.name}</h4>
                  {/* Hover detail */}
                  <div className="overflow-hidden max-h-0 group-hover:max-h-16 transition-all duration-500">
                    <div className="pt-3 flex items-center justify-between">
                      <span className="font-cormorant text-[#888880] text-xs">{model.height} · {model.exp}</span>
                    </div>
                    <div className="h-px bg-[#C9A84C]/50 mt-2" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center animate-in">
          <div className="gold-divider max-w-xs mx-auto mb-10" />
          <p className="font-cormorant text-[#888880] text-lg mb-6">
            Are you the next face of Noire Legacy?
          </p>
          <Link
            href="/apply"
            className="inline-block border border-[#C9A84C] bg-[#C9A84C] text-[#0A0A0A] font-cormorant text-sm tracking-[0.3em] uppercase px-12 py-4 hover:bg-transparent hover:text-[#C9A84C] transition-all duration-400"
          >
            Apply as a Model
          </Link>
        </div>
      </div>
    </div>
  );
}
