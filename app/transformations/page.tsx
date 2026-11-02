"use client";

import React, { useState } from "react";
import Image from "next/image";
import { siteConfig, transformations } from "@/config/site";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Trophy, ArrowRight, Quote, Flame, Scale, Clock, User, CheckCircle2 } from "lucide-react";

export default function TransformationsPage() {
  const [selectedProgram, setSelectedProgram] = useState<string>("All");

  const programsList = ["All", "Bodybuilding", "CrossFit", "Power Zumba", "Elite Yoga", "MMA Training"];

  const filteredTransformations = transformations.filter((item) => {
    if (selectedProgram === "All") return true;
    return item.program.toLowerCase() === selectedProgram.toLowerCase();
  });

  return (
    <main className="w-full pt-28 pb-16 md:pb-28 bg-[#0A1A1F] text-white">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-[12px] uppercase tracking-[0.15em] text-[#F21B35] font-semibold mb-3 block">
            Real member results
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4 leading-[1.05]">
            Transformations Gallery
          </h1>
          <p className="font-body text-[17px] text-[#E5E5E5] max-w-xl leading-[1.6]">
            No gimmicks or extreme diets. Just dedicated coaching, clean equipment, round-the-clock consistency, and real physical change in Waghodia.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
          {programsList.map((prog) => {
            const isSelected = selectedProgram === prog;
            return (
              <button
                key={prog}
                onClick={() => setSelectedProgram(prog)}
                className={`px-5 py-2.5 rounded-full text-xs font-heading uppercase tracking-wider font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                  isSelected
                    ? "bg-[#F21B35] text-white shadow-lg shadow-[#F21B35]/25"
                    : "bg-[#0F2329] border border-[#1E3840] text-[#B7C4C8] hover:text-white"
                }`}
              >
                {prog}
              </button>
            );
          })}
        </div>

        {/* Transformations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTransformations.map((item) => (
            <div
              key={item.id}
              className="bg-[#0F2329] border border-[#1E3840] rounded-card overflow-hidden flex flex-col justify-between hover:border-[#F21B35]/70 transition-all duration-300 hover:-translate-y-1 group shadow-xl"
            >
              <div>
                {/* Media Showcase: Dual Before / After Comparison */}
                <div className="relative w-full h-72 bg-[#0A1A1F] border-b border-[#1E3840] grid grid-cols-2 overflow-hidden">
                  {/* Before Side */}
                  <div className="relative w-full h-full border-r border-[#1E3840]">
                    <Image
                      src={item.imageBefore}
                      alt={`${item.name} Before`}
                      fill
                      sizes="220px"
                      className="object-cover filter grayscale contrast-125 brightness-90"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-[#0A1A1F]/90 border border-[#1E3840] text-[10px] font-mono text-[#7B8E94] uppercase">
                      Day 1
                    </div>
                  </div>

                  {/* After Side */}
                  <div className="relative w-full h-full">
                    <Image
                      src={item.imageAfter}
                      alt={`${item.name} After`}
                      fill
                      sizes="220px"
                      className="object-cover filter brightness-[0.95] contrast-[1.05]"
                    />
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-[#F21B35] text-[10px] font-mono text-white uppercase font-bold shadow">
                      {item.duration}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-7">
                  {/* Name & Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-heading text-xl font-bold text-white leading-[1.05]">
                      {item.name}, <span className="text-[#B7C4C8] text-base">{item.age}</span>
                    </h3>
                    <span className="text-[11px] font-mono text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/30 px-2.5 py-0.5 rounded-full font-semibold">
                      {item.duration}
                    </span>
                  </div>

                  {/* Achievement Highlight */}
                  <div className="mb-4 text-xs font-heading uppercase tracking-wider text-[#F21B35] font-semibold flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>{item.achievement}</span>
                  </div>

                  {/* Stats Pill Matrix */}
                  <div className="grid grid-cols-3 gap-2 bg-[#0A1A1F] border border-[#1E3840] rounded-xl p-3 mb-5 text-center text-xs">
                    <div>
                      <span className="text-[10px] text-[#7B8E94] block uppercase">Weight</span>
                      <strong className="font-mono text-white text-xs">{item.stats.weightChange}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#7B8E94] block uppercase">Body Fat</span>
                      <strong className="font-mono text-[#25D366] text-xs">{item.stats.bodyFatChange || "Lean"}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#7B8E94] block uppercase">Muscle</span>
                      <strong className="font-mono text-white text-xs">{item.stats.muscleGain || "+3 kg"}</strong>
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="font-body text-xs text-[#E5E5E5] leading-relaxed italic mb-5">
                    &ldquo;{item.quote}&rdquo;
                  </p>

                  {/* Coach & Program details */}
                  <div className="pt-3 border-t border-[#1E3840] flex justify-between text-xs text-[#B7C4C8]">
                    <span>Coach: <strong className="text-white">{item.trainer}</strong></span>
                    <span className="text-[#7B8E94]">{item.program}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="p-6 md:p-7 pt-0">
                <TransitionLink
                  href={`/free-trial?goal=${encodeURIComponent(item.achievement)}`}
                  title="Free Trial"
                  className="w-full py-3 rounded-full bg-[#0A1A1F] border border-[#1E3840] text-white font-heading text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 hover:border-[#F21B35] hover:text-[#F21B35] transition-colors"
                >
                  <span>Start Similar Plan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </TransitionLink>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 bg-[#0F2329] border border-[#1E3840] rounded-card p-8 md:p-10 text-center max-w-3xl mx-auto shadow-2xl">
          <span className="text-[12px] uppercase tracking-[0.15em] text-[#F21B35] font-semibold mb-2 block">
            Ready for your results?
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3 leading-[1.05]">
            Start Your Free 1-Day Trial Pass
          </h2>
          <p className="font-body text-[15px] text-[#B7C4C8] mb-8 max-w-lg mx-auto leading-relaxed">
            Every transformation began on Day 1 with a free walkthrough. Try our machines, meet your coach, and experience our 24/7 floor.
          </p>
          <TransitionLink
            href="/free-trial"
            title="Free Trial"
            className="inline-flex px-8 py-4 rounded-full bg-[#F21B35] text-white font-heading text-xs uppercase tracking-widest font-bold hover:bg-[#d0142b] transition-all shadow-xl active:scale-95"
          >
            Claim 1-Day Pass Now
          </TransitionLink>
        </div>
      </div>
    </main>
  );
}

