"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { ShieldCheck, Wind, KeyRound, Sparkles } from "lucide-react";

export default function GymPage() {
  const zones = siteConfig.gymZones;

  return (
    <main className="w-full pt-32 pb-28 md:pb-40 bg-[#0A1A1F] text-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F21B35]" />
            <span className="font-heading text-xs uppercase tracking-widest text-[#B7C4C8]">
              The Space
            </span>
          </div>
          <h1 className="font-heading text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white uppercase mb-6">
            Facility
          </h1>
          <p className="font-body text-base md:text-xl text-[#B7C4C8] max-w-2xl leading-relaxed">
            10,000+ square feet of architecturally planned athletic training floor in Waghodia, Vadodara.
            Custom acoustics, medical-grade air filtration, and uncompromised machinery.
          </p>
        </div>

        {/* Facility Highlights Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-[#0F2329] border border-[#1E3840] rounded-card mb-20 text-center">
          <div className="flex flex-col items-center">
            <KeyRound className="w-6 h-6 text-[#F21B35] mb-2" />
            <span className="font-heading text-xl font-bold text-white uppercase">24/7/365</span>
            <span className="font-body text-xs text-[#B7C4C8] mt-1">Biometric Keyless Entry</span>
          </div>
          <div className="flex flex-col items-center">
            <Sparkles className="w-6 h-6 text-[#F21B35] mb-2" />
            <span className="font-heading text-xl font-bold text-white uppercase">10,000+ sq.ft</span>
            <span className="font-body text-xs text-[#B7C4C8] mt-1">Engineered Training Floor</span>
          </div>
          <div className="flex flex-col items-center">
            <Wind className="w-6 h-6 text-[#F21B35] mb-2" />
            <span className="font-heading text-xl font-bold text-white uppercase">HEPA / HVAC</span>
            <span className="font-body text-xs text-[#B7C4C8] mt-1">Continuous Air Purification</span>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-6 h-6 text-[#F21B35] mb-2" />
            <span className="font-heading text-xl font-bold text-white uppercase">CCTV Monitored</span>
            <span className="font-body text-xs text-[#B7C4C8] mt-1">24-Hour Safety & Security</span>
          </div>
        </div>

        {/* 6 Specialized Facility Zones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {zones.map((zone) => (
            <div
              key={zone.id}
              className="bg-[#0F2329] border border-[#1E3840] rounded-card overflow-hidden flex flex-col group hover:border-[#444748] transition-all duration-300"
            >
              {/* Photo: sharp 0px corners */}
              <div className="w-full h-64 relative overflow-hidden bg-[#0A1A1F] border-b border-[#1E3840]">
                <Image
                  src={zone.image}
                  alt={zone.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover filter brightness-[0.75] contrast-[1.1] rounded-none group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-[#06151A]/20 pointer-events-none" />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#0A1A1F]/90 border border-[#1E3840] rounded-full px-3 py-1 font-heading text-[10px] uppercase tracking-wider text-[#B7C4C8]">
                    {zone.area}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 md:p-8 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-white mb-2">
                    {zone.name}
                  </h3>
                  <p className="font-body text-sm text-[#B7C4C8] leading-relaxed mb-6">
                    {zone.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#1E3840] flex items-center justify-between text-xs text-[#B7C4C8]/70">
                  <span>Waghodia Facility</span>
                  <span className="text-white font-medium">Available 24/7</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Book Tour CTA */}
        <div className="p-10 md:p-16 bg-[#06151A] border border-[#1E3840] rounded-card text-center flex flex-col items-center">
          <h3 className="font-heading text-3xl md:text-5xl font-bold uppercase tracking-tight text-white mb-4">
            Experience The Space In Person
          </h3>
          <p className="font-body text-sm md:text-base text-[#B7C4C8] max-w-xl mb-8 leading-relaxed">
            Schedule a walkthrough with one of our head coaches. We will demonstrate equipment calibration,
            review locker amenities, and activate your 1-Day Trial Pass.
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

