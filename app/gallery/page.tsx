"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollRevealAll } from "@/lib/useScrollReveal";

const covers = [
  { id: 1, seed: 301, vol: "Vol. 1", date: "Jan 2025", title: "The Origin Issue", desc: "Our debut. A declaration." },
  { id: 2, seed: 302, vol: "Vol. 2", date: "Mar 2025", title: "Power & Grace", desc: "When strength meets elegance." },
  { id: 3, seed: 303, vol: "Vol. 3", date: "May 2025", title: "The Identity Edit", desc: "Who are you when no one's watching?" },
  { id: 4, seed: 304, vol: "Vol. 4", date: "Jul 2025", title: "Noir Season", desc: "Dark, luminous, unforgettable." },
  { id: 5, seed: 305, vol: "Vol. 5", date: "Oct 2025", title: "The Legacy Issue", desc: "Five issues. One movement." },
  { id: 6, seed: 306, vol: "Vol. 6", date: "Jan 2026", title: "Elevation", desc: "The future has always been ours." },
];

const editorials = [
  { id: 7, seed: 401, label: "Editorial", title: "Midnight Bloom" },
  { id: 8, seed: 402, label: "Feature", title: "The Gold Standard" },
  { id: 9, seed: 403, label: "Campaign", title: "Untamed" },
  { id: 10, seed: 404, label: "Editorial", title: "Shadow & Light" },
  { id: 11, seed: 405, label: "Cover Test", title: "New Faces 2025" },
  { id: 12, seed: 406, label: "Lookbook", title: "Lagos After Dark" },
];

export default function GalleryPage() {
  useScrollRevealAll();
  const [lightbox, setLightbox] = useState<{ seed: number; title: string; index: number } | null>(null);
  const allImages = [...covers.map((c, i) => ({ seed: c.seed, title: c.title, index: i })),
                    ...editorials.map((e, i) => ({ seed: e.seed, title: e.title, index: covers.length + i }))];

  const navigateLightbox = (dir: 1 | -1) => {
    if (!lightbox) return;
    const newIndex = (lightbox.index + dir + allImages.length) % allImages.length;
    setLightbox(allImages[newIndex]);
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="font-cormorant text-[#C9A84C] text-xs tracking-[0.5em] uppercase mb-4 animate-in">
            The Archive
          </p>
          <h1 className="font-playfair text-6xl md:text-7xl font-black text-[#F5F0E8] mb-6 animate-in delay-100">
            Editorial<br />
            <span className="italic text-[#C9A84C]">Gallery</span>
          </h1>
          <div className="gold-divider max-w-xs mb-8 animate-in delay-200" />
          <p className="font-cormorant text-[#888880] text-xl max-w-xl animate-in delay-300">
            Six volumes. Dozens of editorials. One uncompromising vision.
          </p>
        </div>

        {/* Magazine Covers */}
        <div className="mb-20">
          <h2 className="font-cormorant text-xs tracking-[0.5em] uppercase text-[#C9A84C] mb-10 animate-in">
            Magazine Covers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {covers.map((cover, i) => (
              <div
                key={cover.id}
                className="group cursor-pointer animate-in"
                style={{ transitionDelay: `${i * 60}ms` }}
                onClick={() => setLightbox({ seed: cover.seed, title: cover.title, index: i })}
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-3">
                  <Image
                    src={`https://picsum.photos/seed/${cover.seed}/400/533`}
                    alt={cover.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#0A0A0A]/0 group-hover:bg-[#C9A84C]/15 transition-all duration-500" />
                  <div className="absolute top-3 left-3 bg-[#0A0A0A]/80 px-2 py-1">
                    <span className="font-cormorant text-[#C9A84C] text-[10px] tracking-[0.3em] uppercase">
                      {cover.vol}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="font-cormorant text-[#F5F0E8] text-xs tracking-[0.3em] uppercase border border-[#F5F0E8]/60 px-4 py-2 bg-[#0A0A0A]/60 backdrop-blur-sm">
                      View
                    </span>
                  </div>
                </div>
                <p className="font-playfair text-sm text-[#F5F0E8] group-hover:text-[#C9A84C] transition-colors">
                  {cover.title}
                </p>
                <p className="font-cormorant text-[#888880] text-xs tracking-wide">{cover.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Editorials — Masonry-like staggered grid */}
        <div>
          <h2 className="font-cormorant text-xs tracking-[0.5em] uppercase text-[#C9A84C] mb-10 animate-in">
            Editorials & Campaigns
          </h2>
          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {editorials.map((editorial, i) => (
              <div
                key={editorial.id}
                className="group break-inside-avoid cursor-pointer relative overflow-hidden animate-in"
                style={{ transitionDelay: `${i * 60}ms` }}
                onClick={() => setLightbox({ seed: editorial.seed, title: editorial.title, index: covers.length + i })}
              >
                <div className="relative" style={{ aspectRatio: i % 3 === 0 ? "3/4" : i % 3 === 1 ? "1/1" : "4/5" }}>
                  <Image
                    src={`https://picsum.photos/seed/${editorial.seed}/600/${i % 3 === 0 ? 800 : i % 3 === 1 ? 600 : 750}`}
                    alt={editorial.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="font-cormorant text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase">
                      {editorial.label}
                    </span>
                    <p className="font-playfair text-sm text-[#F5F0E8] mt-1">{editorial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
            className="absolute left-6 text-[#F5F0E8]/60 hover:text-[#C9A84C] transition-colors z-10"
          >
            <ChevronLeft size={40} />
          </button>

          <div
            className="relative max-w-2xl max-h-[85vh] w-full mx-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full" style={{ aspectRatio: "3/4" }}>
              <Image
                src={`https://picsum.photos/seed/${lightbox.seed}/800/1067`}
                alt={lightbox.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0A0A0A] to-transparent p-6">
              <p className="font-playfair text-xl text-[#F5F0E8]">{lightbox.title}</p>
            </div>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
            className="absolute right-6 text-[#F5F0E8]/60 hover:text-[#C9A84C] transition-colors z-10"
          >
            <ChevronRight size={40} />
          </button>

          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-[#F5F0E8]/60 hover:text-[#C9A84C] transition-colors"
          >
            <X size={28} />
          </button>
        </div>
      )}
    </div>
  );
}
