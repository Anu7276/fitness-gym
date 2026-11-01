"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { ShieldCheck, Wind, KeyRound, Sparkles } from "lucide-react";

export default function GymPage() {
  const zones = siteConfig.gymZones;

  return (
    <main className="w-full pt-28 pb-16 md:pb-28 bg-[#0A1A1F] text-white">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14 md:mb-18">
          <span className="font-heading text-xs font-semibold uppercase tracking-wider text-[#B7C4C8] mb-3">
            The space
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Our facility
          </h1>
          <p className="font-body text-[15px] md:text-base text-[#B7C4C8] max-w-xl leading-relaxed">
            10,000+ square feet of modern gym floor on Waghodia Road, Vadodara. Natural lighting,
            clean air ventilation, and high-quality equipment.
          </p>
        </div>

        {/* Facility Highlights Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-[#0F2329] border border-[#1E3840] rounded-card mb-16 text-center">
          <div className="flex flex-col items-center">
            <KeyRound className="w-6 h-6 text-[#F21B35] mb-2" />
            <span className="font-heading text-lg md:text-xl font-bold text-white">24/7/365</span>
            <span className="font-body text-xs text-[#B7C4C8] mt-1">Biometric keyless entry</span>
          </div>
          <div className="flex flex-col items-center">
            <Sparkles className="w-6 h-6 text-[#F21B35] mb-2" />
            <span className="font-heading text-lg md:text-xl font-bold text-white">10,000+ sq.ft</span>
            <span className="font-body text-xs text-[#B7C4C8] mt-1">Spacious training floor</span>
          </div>
          <div className="flex flex-col items-center">
            <Wind className="w-6 h-6 text-[#F21B35] mb-2" />
            <span className="font-heading text-lg md:text-xl font-bold text-white">Clean Air</span>
            <span className="font-body text-xs text-[#B7C4C8] mt-1">Continuous ventilation</span>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-6 h-6 text-[#F21B35] mb-2" />
            <span className="font-heading text-lg md:text-xl font-bold text-white">Safe & Secure</span>
            <span className="font-body text-xs text-[#B7C4C8] mt-1">24-hour CCTV monitoring</span>
          </div>
        </div>

        {/* 6 Specialized Facility Zones (3:2 Aspect Ratio) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {zones.map((zone) => (
            <div
              key={zone.id}
              className="bg-[#0F2329] border border-[#1E3840] rounded-card overflow-hidden flex flex-col group hover:border-[#444748] transition-all duration-300"
            >
              {/* Photo: sharp 0px corners, 3:2 aspect ratio */}
              <div className="w-full h-56 relative overflow-hidden bg-[#0A1A1F] border-b border-[#1E3840]">
                <Image
                  src={zone.image}
                  alt={zone.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover filter brightness-[0.95] contrast-[1.05] rounded-none group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-[#0A1A1F]/15 pointer-events-none" />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#0A1A1F]/90 border border-[#1E3840] rounded-full px-3 py-1 font-body text-xs text-white">
                    {zone.area}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 md:p-8 flex flex-col flex-1 justify-between">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-white mb-2">
                    {zone.name}
                  </h2>
                  <p className="font-body text-[14px] text-[#B7C4C8] leading-relaxed mb-4">
                    {zone.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#1E3840] flex items-center justify-between text-xs text-[#B7C4C8]">
                  <span>Waghodia facility</span>
                  <span className="text-white">Open 24 hours</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Book Tour CTA Card */}
        <div className="p-8 md:p-14 bg-[#0F2329] border border-[#1E3840] rounded-card text-center flex flex-col items-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-3">
            Come see the space in person
          </h2>
          <p className="font-body text-[15px] text-[#B7C4C8] max-w-lg mb-8 leading-relaxed">
            Stop by for a friendly walkthrough. We will show you the equipment, locker rooms, and activate
            your free 1-Day Trial Pass.
          </p>
          <TransitionLink
            href="/free-trial"
            title="Free Trial"
            className="px-8 py-4 rounded-full bg-white text-[#0A1A1F] font-heading text-xs uppercase tracking-widest font-semibold hover:bg-[#F21B35] hover:text-white transition-all duration-200"
          >
            Claim 1-Day Pass & Tour
          </TransitionLink>
        </div>
      </div>
    </main>
  );
}
