"use client";

import React, { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { motion, AnimatePresence } from "framer-motion";

export function MethodTimeline() {
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const pillars = siteConfig.pillars;
  const activePillar = pillars[activePillarIndex];

  return (
    <section className="w-full py-28 md:py-40 bg-[#0A1A1F] text-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F21B35]" />
            <span className="font-heading text-xs uppercase tracking-widest text-[#B7C4C8]">
              Methodology
            </span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase mb-4">
            How We Train
          </h2>
          <p className="font-body text-base text-[#B7C4C8] max-w-xl leading-relaxed">
            Four foundational pillars engineered to support durable athletic transformation.
          </p>
        </div>

        {/* Timeline Bar with 4 Dots and Rotating SVG Badge */}
        <div className="relative max-w-4xl mx-auto mb-20 px-4">
          {/* Base Inactive Line */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#1E3840] -translate-y-1/2" />

          {/* Active Red Fill Line */}
          <div
            className="absolute top-1/2 left-0 h-[2px] bg-[#F21B35] -translate-y-1/2 transition-all duration-500 ease-out"
            style={{
              width: `${(activePillarIndex / (pillars.length - 1)) * 100}%`,
            }}
          />

          {/* 4 Interactive Dots */}
          <div className="relative flex justify-between items-center z-10">
            {pillars.map((pillar, idx) => {
              const isActive = idx === activePillarIndex;
              const isPast = idx <= activePillarIndex;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillarIndex(idx)}
                  className="group flex flex-col items-center focus:outline-none"
                  aria-label={`View ${pillar.title} pillar`}
                >
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "border-[#F21B35] bg-[#F21B35] scale-125 shadow-[0_0_15px_rgba(242,27,53,0.5)]"
                        : isPast
                        ? "border-[#F21B35] bg-[#0A1A1F]"
                        : "border-[#1E3840] bg-[#0A1A1F] hover:border-white"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full transition-colors ${
                        isActive ? "bg-white" : isPast ? "bg-[#F21B35]" : "bg-transparent"
                      }`}
                    />
                  </div>
                  <span
                    className={`font-heading text-xs uppercase tracking-wider mt-3 transition-colors ${
                      isActive ? "text-white font-bold" : "text-[#B7C4C8] group-hover:text-white"
                    }`}
                  >
                    {pillar.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Rotating Circular Text Badge (SVG textPath) */}
          <div className="hidden md:block absolute -top-8 -right-16 pointer-events-none">
            <svg
              className="w-24 h-24 animate-spin-slow"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="circlePath"
                d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                fill="none"
              />
              <text fill="#B7C4C8" fontSize="8.5" fontFamily="Outfit" letterSpacing="2">
                <textPath href="#circlePath" startOffset="0%">
                  • DISCIPLINE • PRECISION • ENDURANCE
                </textPath>
              </text>
            </svg>
          </div>
        </div>

        {/* Pillar Content Crossfade Card */}
        <div className="max-w-4xl mx-auto bg-[#0F2329] border border-[#1E3840] rounded-card overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePillar.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-12 items-center"
            >
              {/* Photo: sharp corners (0px) */}
              <div className="md:col-span-6 h-72 md:h-96 relative overflow-hidden bg-[#0A1A1F] border-b md:border-b-0 md:border-r border-[#1E3840]">
                <Image
                  src={activePillar.image}
                  alt={activePillar.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover filter brightness-[0.8] contrast-[1.1] rounded-none"
                />
                <div className="absolute inset-0 bg-[#06151A]/20 pointer-events-none" />
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-[#0A1A1F]/90 border border-[#1E3840] text-[10px] font-heading uppercase tracking-widest text-[#B7C4C8]">
                  Pillar 0{activePillarIndex + 1}
                </div>
              </div>

              {/* Text Description */}
              <div className="md:col-span-6 p-8 md:p-12 flex flex-col justify-center">
                <span className="font-heading text-xs uppercase tracking-widest text-[#F21B35] font-semibold mb-2">
                  {activePillar.subtitle}
                </span>
                <h3 className="font-heading text-3xl font-bold uppercase tracking-tight text-white mb-4">
                  {activePillar.title}
                </h3>
                <p className="font-body text-sm text-[#B7C4C8] leading-relaxed mb-6">
                  {activePillar.description}
                </p>
                <blockquote className="border-l-2 border-[#F21B35] pl-4 italic font-body text-xs text-white/90">
                  &ldquo;{activePillar.quote}&rdquo;
                </blockquote>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

