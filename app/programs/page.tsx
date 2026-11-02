"use client";

import React, { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { ArrowRight, Flame, Clock, MapPin, Dumbbell } from "lucide-react";
import { MethodTimeline } from "@/components/home/MethodTimeline";

export default function ProgramsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Strength", "Endurance", "Mobility", "Conditioning", "Combat", "Rhythm"];

  const filteredPrograms =
    selectedCategory === "All"
      ? siteConfig.programs
      : siteConfig.programs.filter((p) => p.category === selectedCategory);

  return (
    <main className="w-full pt-28 pb-16 md:pb-28 bg-[#0A1A1F] text-white">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        {/* Page Header */}
        <div className="flex flex-col items-center text-center mb-14 md:mb-18">
          <span className="font-heading text-xs font-semibold uppercase tracking-wider text-[#B7C4C8] mb-3">
            Training options
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Our programs
          </h1>
          <p className="font-body text-[15px] md:text-base text-[#B7C4C8] max-w-xl leading-relaxed">
            Six structured programs led by certified coaches. Whether you want to lift heavier, increase
            cardio endurance, or improve mobility, we have a class for you.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full font-heading text-xs uppercase tracking-wider transition-all duration-200 border ${
                  selectedCategory === cat
                    ? "border-[#F21B35] bg-[#F21B35] text-white font-semibold"
                    : "border-[#1E3840] bg-[#0F2329] text-[#B7C4C8] hover:border-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Program Cards */}
        <div className="flex flex-col gap-10">
          {filteredPrograms.map((program, idx) => (
            <article
              key={program.id}
              id={program.slug}
              className="bg-[#0F2329] border border-[#1E3840] rounded-card overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0"
            >
              {/* Photo: sharp 0px corners, 4:5 aspect ratio */}
              <div
                className={`lg:col-span-6 relative min-h-[300px] lg:min-h-[420px] bg-[#0A1A1F] ${
                  idx % 2 === 1 ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <Image
                  src={program.image}
                  alt={program.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover filter brightness-[0.95] contrast-[1.05] rounded-none"
                />
                <div className="absolute inset-0 bg-[#0A1A1F]/15 pointer-events-none" />
                <div className="absolute top-6 left-6">
                  <span className="bg-[#0A1A1F]/90 border border-[#1E3840] rounded-full px-3.5 py-1 font-body text-xs text-white">
                    {program.category}
                  </span>
                </div>
              </div>

              {/* Specs & Description */}
              <div
                className={`lg:col-span-6 p-8 md:p-10 flex flex-col justify-between ${
                  idx % 2 === 1 ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
                    {program.name}
                  </h2>
                  <p className="font-body text-sm font-semibold text-white mb-4">
                    {program.tagline}
                  </p>
                  <p className="font-body text-[14px] text-[#B7C4C8] leading-relaxed mb-6">
                    {program.description}
                  </p>

                  {/* Program Spec Grid */}
                  <div className="grid grid-cols-2 gap-4 py-5 border-y border-[#1E3840] text-xs">
                    <div className="flex items-center gap-2 text-[#B7C4C8]">
                      <Flame className="w-4 h-4 text-[#F21B35] shrink-0" />
                      <span>Intensity: <strong className="text-white font-medium">{program.intensity}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-[#B7C4C8]">
                      <Clock className="w-4 h-4 text-[#F21B35] shrink-0" />
                      <span>Duration: <strong className="text-white font-medium">{program.duration}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-[#B7C4C8]">
                      <MapPin className="w-4 h-4 text-[#F21B35] shrink-0" />
                      <span>Zone: <strong className="text-white font-medium">{program.zone}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-[#B7C4C8]">
                      <Dumbbell className="w-4 h-4 text-[#F21B35] shrink-0" />
                      <span>Typical Time: <strong className="text-white font-medium">{program.timeSlot}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="font-body text-xs text-[#B7C4C8]">
                    Included in Pro and Elite memberships
                  </span>
                  <TransitionLink
                    href={`/free-trial?program=${encodeURIComponent(program.name)}`}
                    title="Free Trial"
                    className="w-full sm:w-auto px-7 py-3 rounded-full bg-white text-[#0A1A1F] font-heading text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:bg-[#F21B35] hover:text-white transition-all duration-200"
                  >
                    <span>Try class free</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </TransitionLink>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* How We Train: 4-Pillar Methodology */}
        <div className="mt-20 pt-16 border-t border-[#1E3840]/60">
          <MethodTimeline />
        </div>
      </div>
    </main>
  );
}
