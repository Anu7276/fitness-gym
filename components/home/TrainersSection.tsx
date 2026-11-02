"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { TransitionLink } from "../motion/TransitionLink";

export function TrainersSection() {
  return (
    <section id="trainers" className="w-full py-16 md:py-28 bg-[#06151A] text-white overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="font-heading text-xs font-semibold uppercase tracking-wider text-[#B7C4C8] mb-2 block">
              Coaching team
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Our trainers
            </h2>
          </div>
          <p className="font-body text-[15px] text-[#B7C4C8] max-w-md leading-relaxed">
            Friendly, certified fitness coaches dedicated to helping you train safely and reach your personal best.
          </p>
        </div>

        {/* Infinite Marquee Track Container */}
        <div className="relative w-full overflow-hidden select-none py-2">
          {/* Subtle edge fade vignettes for seamless edge blending */}
          <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-24 z-20 bg-gradient-to-r from-[#06151A] to-transparent pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-24 z-20 bg-gradient-to-l from-[#06151A] to-transparent pointer-events-none" />

          {/* Marquee track: 2 identical sets for infinite continuous loop */}
          <div className="flex animate-marquee hover:[animation-play-state:paused] gap-6 w-max">
            {[0, 1].map((setIndex) => (
              <div key={setIndex} className="flex gap-6 shrink-0">
                {siteConfig.trainers.map((trainer) => (
                  <div
                    key={`${setIndex}-${trainer.id}`}
                    className="w-[280px] sm:w-[310px] shrink-0 bg-[#0F2329] border border-[#1E3840] rounded-card overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 hover:border-[#F21B35]/70 hover:shadow-[0_12px_30px_rgba(242,27,53,0.18)] group cursor-pointer"
                  >
                    {/* Portrait Photo: sharp 0px corners, 4:5 aspect ratio */}
                    <div className="w-full h-80 relative overflow-hidden bg-[#0A1A1F] border-b border-[#1E3840]">
                      <Image
                        src={trainer.image}
                        alt={trainer.name}
                        fill
                        sizes="310px"
                        className="object-cover filter brightness-[0.95] contrast-[1.05] rounded-none pointer-events-none transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F2329] via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#0A1A1F]/90 border border-[#1E3840] rounded-full px-3 py-1 font-body text-xs text-white">
                          {trainer.experience}
                        </span>
                      </div>
                    </div>

                    {/* Trainer Info */}
                    <div className="p-6 flex flex-col flex-1 justify-between">
                      <div>
                        <h3 className="font-heading text-xl font-bold text-white mb-1 group-hover:text-[#F21B35] transition-colors">
                          {trainer.name}
                        </h3>
                        <p className="font-body text-xs text-[#B7C4C8] font-medium mb-3">
                          {trainer.role}
                        </p>
                        <p className="font-body text-xs text-[#B7C4C8] leading-relaxed line-clamp-2">
                          {trainer.speciality}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Hint & Link */}
        <div className="mt-6 flex items-center justify-between text-xs text-[#B7C4C8]">
          <span className="font-body text-[#B7C4C8]/70 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F21B35] animate-pulse" />
            Hover to pause • Continuous coach showcase
          </span>
          <TransitionLink
            href="/trainers"
            title="Trainers"
            className="font-heading uppercase tracking-wider text-white hover:text-[#F21B35] font-semibold transition-colors"
          >
            Meet the team →
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
