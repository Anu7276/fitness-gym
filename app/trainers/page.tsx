"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { ArrowRight, Award } from "lucide-react";

export default function TrainersPage() {
  const trainers = siteConfig.trainers;

  return (
    <main className="w-full pt-32 pb-28 md:pb-40 bg-[#0A1A1F] text-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F21B35]" />
            <span className="font-heading text-xs uppercase tracking-widest text-[#B7C4C8]">
              Faculty
            </span>
          </div>
          <h1 className="font-heading text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white uppercase mb-6">
            Trainers
          </h1>
          <p className="font-body text-base md:text-xl text-[#B7C4C8] max-w-2xl leading-relaxed">
            Our instructional staff unites specialized sports biomechanics, Olympic lifting certifications,
            and decades of cumulative floor experience in Vadodara.
          </p>
        </div>

        {/* Trainers Roster Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer) => (
            <div
              key={trainer.id}
              className="bg-[#0F2329] border border-[#1E3840] rounded-card overflow-hidden flex flex-col group hover:border-[#444748] transition-all duration-300"
            >
              {/* Photo: sharp 0px corners */}
              <div className="w-full h-[400px] relative overflow-hidden bg-[#0A1A1F] border-b border-[#1E3840]">
                <Image
                  src={trainer.image}
                  alt={trainer.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover filter brightness-[0.8] contrast-[1.1] rounded-none group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2329] via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#0A1A1F]/90 border border-[#1E3840] rounded-full px-3 py-1 font-heading text-[10px] uppercase tracking-wider text-[#B7C4C8] flex items-center gap-1.5">
                    <Award className="w-3 h-3 text-[#F21B35]" />
                    <span>{trainer.experience}</span>
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 md:p-8 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-white mb-1">
                    {trainer.name}
                  </h3>
                  <p className="font-heading text-xs uppercase tracking-wider text-[#F21B35] font-semibold mb-4">
                    {trainer.role}
                  </p>
                  <p className="font-body text-sm text-[#B7C4C8] leading-relaxed mb-4">
                    {trainer.bio}
                  </p>
                  <div className="pt-4 border-t border-[#1E3840] text-xs text-[#B7C4C8]/80">
                    <strong className="text-white block mb-0.5">Focus Specialty:</strong>
                    {trainer.speciality}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#1E3840] flex items-center justify-between">
                  <span className="text-[11px] font-heading uppercase tracking-widest text-[#B7C4C8]/60">
                    Waghodia Coaching
                  </span>
                  <TransitionLink
                    href={`/free-trial?trainer=${encodeURIComponent(trainer.name)}`}
                    title="Free Trial"
                    className="inline-flex items-center gap-1.5 font-heading text-xs uppercase tracking-wider text-white hover:text-[#F21B35] font-semibold transition-colors"
                  >
                    <span>Book Session</span>
                    <ArrowRight className="w-3 h-3 text-[#F21B35]" />
                  </TransitionLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

