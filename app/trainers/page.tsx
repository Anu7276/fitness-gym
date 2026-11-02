"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { ArrowRight, Award } from "lucide-react";

export default function TrainersPage() {
  const trainers = siteConfig.trainers;

  return (
    <main className="w-full pt-28 pb-16 md:pb-28 bg-[#0A1A1F] text-white">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14 md:mb-18">
          <span className="font-heading text-xs font-semibold uppercase tracking-wider text-[#B7C4C8] mb-3">
            Coaching staff
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Our trainers
          </h1>
          <p className="font-body text-[15px] md:text-base text-[#B7C4C8] max-w-xl leading-relaxed">
            Experienced, supportive trainers who focus on safe form, sustainable habits, and keeping you motivated.
          </p>
        </div>

        {/* Trainers Roster Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer) => (
            <div
              key={trainer.id}
              className="bg-[#0F2329] border border-[#1E3840] rounded-card overflow-hidden flex flex-col group hover:border-[#444748] transition-all duration-300"
            >
              {/* Photo: sharp 0px corners, 4:5 aspect ratio */}
              <div className="w-full h-80 relative overflow-hidden bg-[#0A1A1F] border-b border-[#1E3840]">
                <Image
                  src={trainer.image}
                  alt={trainer.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover filter brightness-[0.95] contrast-[1.05] rounded-none group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2329] via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#0A1A1F]/90 border border-[#1E3840] rounded-full px-3 py-1 font-body text-xs text-white flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#F21B35]" />
                    <span>{trainer.experience}</span>
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 md:p-8 flex flex-col flex-1 justify-between">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-white mb-1">
                    {trainer.name}
                  </h2>
                  <p className="font-body text-xs text-[#B7C4C8] font-medium mb-3">
                    {trainer.role}
                  </p>
                  <p className="font-body text-[14px] text-[#B7C4C8] leading-relaxed mb-4">
                    {trainer.bio}
                  </p>
                  <div className="pt-3 border-t border-[#1E3840] text-xs text-[#B7C4C8]">
                    <strong className="text-white block mb-0.5">Speciality:</strong>
                    {trainer.speciality}
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-[#1E3840] flex items-center justify-between">
                  <span className="text-xs font-body text-[#B7C4C8]/80">
                    Waghodia Coaching
                  </span>
                  <TransitionLink
                    href={`/free-trial?trainer=${encodeURIComponent(trainer.name)}`}
                    title="Free Trial"
                    className="inline-flex items-center gap-1.5 font-heading text-xs uppercase tracking-wider text-white hover:text-[#F21B35] font-semibold transition-colors"
                  >
                    <span>Book session</span>
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
