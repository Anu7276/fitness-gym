"use client";

import React, { useState } from "react";
import Image from "next/image";
import { siteConfig, galleryMedia, GalleryItem } from "@/config/site";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Play, X, ZoomIn, Eye, Sparkles, MapPin, ArrowRight } from "lucide-react";

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: "all", label: "All Spaces" },
    { id: "weights", label: "Free Weights" },
    { id: "cardio", label: "Cardio Deck" },
    { id: "combat", label: "Combat & Turf" },
    { id: "studio", label: "Studio & Yoga" },
    { id: "amenities", label: "Showers & Lockers" },
  ];

  const filteredMedia = galleryMedia.filter((item) => {
    if (selectedCategory === "all") return true;
    return item.category === selectedCategory;
  });

  return (
    <main className="w-full pt-28 pb-16 md:pb-28 bg-[#0A1A1F] text-white">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-[12px] uppercase tracking-[0.15em] text-[#F21B35] font-semibold mb-3 block">
            Visual tour
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4 leading-[1.05]">
            Photo &amp; Video Gallery
          </h1>
          <p className="font-body text-[17px] text-[#E5E5E5] max-w-xl leading-[1.6]">
            Take an inside look at our 10,000+ sq.ft training sanctuary in Waghodia, Vadodara. Clean equipment, natural lighting, and zero clutter.
          </p>
        </div>

        {/* Video Feature Highlight Card */}
        <div className="relative w-full rounded-card overflow-hidden border border-[#1E3840] bg-[#0F2329] mb-14 shadow-2xl">
          <div className="relative w-full h-[320px] sm:h-[420px] md:h-[480px]">
            <Image
              src="/images/hero.jpg"
              alt="FITNESSGYM 24/7 Floor Ambiance"
              fill
              priority
              sizes="100vw"
              className="object-cover filter brightness-[0.7] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F2329] via-transparent to-black/40" />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-20 h-20 rounded-full bg-[#F21B35] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform duration-300 group focus:outline-none focus:ring-4 focus:ring-[#F21B35]/50 mb-4"
                aria-label="Watch gym facility video on YouTube"
              >
                <Play className="w-8 h-8 fill-white stroke-none translate-x-0.5" />
              </a>
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-heading uppercase tracking-widest text-white font-semibold">
                Watch 60-Second Floor Tour
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-2 drop-shadow-md">
                Experience the 24/7 Rhythm
              </h3>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-heading uppercase tracking-wider font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                  isSelected
                    ? "bg-[#F21B35] text-white shadow-lg shadow-[#F21B35]/25"
                    : "bg-[#0F2329] border border-[#1E3840] text-[#B7C4C8] hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="group relative bg-[#0F2329] border border-[#1E3840] rounded-card overflow-hidden cursor-pointer hover:border-[#F21B35]/70 transition-all duration-300 hover:-translate-y-1 shadow-lg"
            >
              <div className="relative w-full h-64 overflow-hidden bg-[#0A1A1F]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover filter brightness-[0.92] contrast-[1.05] group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2329] via-transparent to-transparent opacity-80" />

                {/* Hover Eye Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                  <span className="w-12 h-12 rounded-full bg-[#F21B35] text-white flex items-center justify-center shadow-xl">
                    <ZoomIn className="w-6 h-6" />
                  </span>
                </div>

                <div className="absolute top-3 left-3">
                  <span className="bg-[#0A1A1F]/90 border border-[#1E3840] rounded-full px-2.5 py-0.5 font-mono text-[10px] text-[#B7C4C8] uppercase font-semibold">
                    {item.categoryLabel}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-heading text-base font-bold text-white group-hover:text-[#F21B35] transition-colors leading-[1.05] mb-1">
                  {item.title}
                </h3>
                <p className="font-body text-xs text-[#B7C4C8] line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeModalItem && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fade-in"
            onClick={() => setActiveModalItem(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-[#0F2329] border border-[#1E3840] rounded-card overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#0A1A1F]/90 border border-[#1E3840] text-white flex items-center justify-center hover:bg-[#F21B35] transition-colors shadow-lg"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full h-[400px] md:h-[520px] bg-black">
                <Image
                  src={activeModalItem.image}
                  alt={activeModalItem.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-[#1E3840]">
                <div>
                  <span className="text-[11px] font-mono text-[#F21B35] uppercase tracking-wider font-semibold block mb-1">
                    {activeModalItem.categoryLabel}
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-white leading-[1.05]">
                    {activeModalItem.title}
                  </h3>
                  <p className="font-body text-xs md:text-sm text-[#B7C4C8] mt-1 max-w-xl">
                    {activeModalItem.description}
                  </p>
                </div>
                <TransitionLink
                  href="/free-trial"
                  title="Free Trial"
                  className="px-6 py-3 rounded-full bg-[#F21B35] text-white font-heading text-xs uppercase tracking-widest font-bold hover:bg-[#d0142b] transition-all shrink-0 text-center shadow-lg"
                >
                  Visit in Person
                </TransitionLink>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Call to Action */}
        <div className="mt-16 bg-[#0F2329] border border-[#1E3840] rounded-card p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2 leading-[1.05]">
              Photos Don&apos;t Do It Justice
            </h3>
            <p className="font-body text-xs md:text-sm text-[#B7C4C8] max-w-lg leading-relaxed">
              Come feel the knurling on our Eleiko barbells, test our curved motorless treadmills, and walk the floor in person with zero sales pressure.
            </p>
          </div>
          <TransitionLink
            href="/free-trial"
            title="Free Trial"
            className="w-full md:w-auto px-8 py-4 rounded-full bg-white text-[#0A1A1F] font-heading text-xs uppercase tracking-widest font-bold hover:bg-[#F21B35] hover:text-white transition-all text-center shrink-0 shadow-lg"
          >
            Claim Free Day Pass
          </TransitionLink>
        </div>
      </div>
    </main>
  );
}
