"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { TransitionLink } from "../motion/TransitionLink";
import { ArrowRight } from "lucide-react";

export function TrainersSection() {
  // Take top 3 trainers for the home preview
  const previewTrainers = siteConfig.trainers.slice(0, 3);

  return (
    <section
      id="trainers"
      className="w-full py-14 lg:py-20 bg-[#06151A] text-white overflow-hidden border-t border-[#1E3840]/60"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[12px] uppercase tracking-[0.15em] text-[#F21B35] font-semibold mb-2 block">
              Coaching team
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.05]">
              Expert Trainers
            </h2>
          </div>
          <p className="font-body text-sm md:text-[15px] text-[#B7C4C8] max-w-md leading-relaxed">
            Certified coaches dedicated to helping you train safely, prevent injury, and achieve measurable results.
          </p>
        </div>

        {/* 3 Trainers: Horizontal scroll-snap on mobile, 3-column grid on desktop (No Marquee) */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-6 px-6 no-scrollbar md:grid md:grid-cols-3 md:gap-8 md:mx-0 md:px-0 md:pb-0">
          {previewTrainers.map((trainer) => (
            <article
              key={trainer.id}
              className="w-[82vw] shrink-0 snap-center md:w-auto bg-[#0F2329] border border-[#1E3840] rounded-card overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:border-[#F21B35]/70 hover:shadow-[0_12px_32px_rgba(242,27,53,0.18)] group"
            >
              {/* Card Image: aspect-[4/3] */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#0A1A1F] border-b border-[#1E3840]">
                <Image
                  src={trainer.image}
                  alt={trainer.name}
                  fill
                  sizes="(max-width: 768px) 85vw, 33vw"
                  className="object-cover filter brightness-[0.95] contrast-[1.05] rounded-none transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2329] via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="bg-[#0A1A1F]/90 border border-[#1E3840] rounded-full px-2.5 py-0.5 font-body text-xs text-white">
                    {trainer.experience}
                  </span>
                </div>
              </div>

              {/* Trainer Info */}
              <div className="p-6 md:p-7 flex flex-col flex-1 justify-between">
                <div>
                  {/* Certifications Badge Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {trainer.certifications?.map((cert, cIdx) => (
                      <span
                        key={cIdx}
                        className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#F21B35]/15 border border-[#F21B35]/30 text-[#F21B35] font-semibold"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-[#F21B35] transition-colors leading-[1.05]">
                    {trainer.name}
                  </h3>
                  <p className="font-body text-xs text-[#B7C4C8] font-medium mb-3">
                    {trainer.role}
                  </p>

                  <div className="pt-2.5 border-t border-[#1E3840]">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#7B8E94] block mb-0.5">
                      Specialty
                    </span>
                    <p className="font-body text-xs text-[#E5E5E5] leading-relaxed line-clamp-2">
                      {trainer.speciality}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Meet The Team CTA Button */}
        <div className="mt-8 md:mt-12 flex justify-center">
          <TransitionLink
            href="/trainers"
            title="All Trainers"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#1E3840] bg-[#0F2329] text-white font-heading text-xs uppercase tracking-widest font-semibold hover:border-white hover:bg-white hover:text-[#0A1A1F] transition-all duration-300 shadow-lg min-h-[44px]"
          >
            <span>Meet The Team ({siteConfig.trainers.length})</span>
            <ArrowRight className="w-4 h-4 text-[#F21B35]" />
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
