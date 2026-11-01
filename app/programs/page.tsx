"use client";

import React, { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { ArrowRight, Flame, Clock, MapPin, Dumbbell } from "lucide-react";

export default function ProgramsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Hypertrophy", "Endurance", "Mobility", "Conditioning", "Combat", "Rhythm"];

  const filteredPrograms =
    selectedCategory === "All"
      ? siteConfig.programs
      : siteConfig.programs.filter((p) => p.category === selectedCategory);

  return (
    <main className="w-full pt-32 pb-28 md:pb-40 bg-[#0A1A1F] text-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Page Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F21B35]" />
            <span className="font-heading text-xs uppercase tracking-widest text-[#B7C4C8]">
              Disciplines
            </span>
          </div>
          <h1 className="font-heading text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white uppercase mb-6">
            Programs
          </h1>
          <p className="font-body text-base md:text-xl text-[#B7C4C8] max-w-2xl leading-relaxed">
            Six disciplined methodologies engineered for tangible physiological adaptation. Every class is
            led by certified coaches in dedicated floor zones.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-10">
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
        <div className="flex flex-col gap-12">
          {filteredPrograms.map((program, idx) => (
            <article
              key={program.id}
              id={program.slug}
              className="bg-[#0F2329] border border-[#1E3840] rounded-card overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0"
            >
              {/* Photo: sharp 0px corners */}
              <div
                className={`lg:col-span-6 relative min-h-[320px] lg:min-h-[460px] bg-[#0A1A1F] ${
                  idx % 2 === 1 ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <Image
                  src={program.image}
                  alt={program.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover filter brightness-[0.75] contrast-[1.1] rounded-none"
                />
                <div className="absolute inset-0 bg-[#06151A]/20 pointer-events-none" />
                <div className="absolute top-6 left-6">
                  <span className="bg-[#0A1A1F]/90 border border-[#1E3840] rounded-full px-4 py-1.5 font-heading text-xs uppercase tracking-wider text-[#B7C4C8]">
                    {program.category}
                  </span>
                </div>
              </div>

              {/* Specs & Description */}
              <div
                className={`lg:col-span-6 p-8 md:p-12 flex flex-col justify-between ${
                  idx % 2 === 1 ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div>
                  <h2 className="font-heading text-3xl md:text-5xl font-bold uppercase tracking-tight text-white mb-3">
                    {program.name}
                  </h2>
                  <p className="font-heading text-xs uppercase tracking-wider text-[#F21B35] font-semibold mb-6">
                    {program.tagline}
                  </p>
                  <p className="font-body text-sm text-[#B7C4C8] leading-relaxed mb-8">
                    {program.description}
                  </p>

                  {/* Program Spec Grid */}
                  <div className="grid grid-cols-2 gap-4 py-6 border-y border-[#1E3840] text-xs">
                    <div className="flex items-center gap-2 text-[#B7C4C8]">
                      <Flame className="w-4 h-4 text-[#F21B35] shrink-0" />
                      <span>Intensity: <strong className="text-white">{program.intensity}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-[#B7C4C8]">
                      <Clock className="w-4 h-4 text-[#F21B35] shrink-0" />
                      <span>Duration: <strong className="text-white">{program.duration}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-[#B7C4C8]">
                      <MapPin className="w-4 h-4 text-[#F21B35] shrink-0" />
                      <span>Zone: <strong className="text-white">{program.zone}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-[#B7C4C8]">
                      <Dumbbell className="w-4 h-4 text-[#F21B35] shrink-0" />
                      <span>Proposed Slot: <strong className="text-white">{program.timeSlot}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="font-body text-xs text-[#B7C4C8]">
                    Included in Pro & Elite Memberships
                  </span>
                  <TransitionLink
                    href={`/free-trial?program=${encodeURIComponent(program.name)}`}
                    title="Free Trial"
                    className="w-full sm:w-auto px-7 py-3 rounded-full bg-white text-[#0A1A1F] font-heading text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:bg-[#F21B35] hover:text-white transition-all duration-200"
                  >
                    <span>Try Class Free</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </TransitionLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

