"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, ShieldCheck, Award, Star } from "lucide-react";

export function Intro() {
  const containerRef = useRef<HTMLElement>(null);
  const photo1Ref = useRef<HTMLDivElement>(null);
  const photo2Ref = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLDivElement>(null);
  const [hasCounted, setHasCounted] = useState(false);
  const [displayYears, setDisplayYears] = useState(0);
  const [displayMembers, setDisplayMembers] = useState(0);
  const [displayTrainers, setDisplayTrainers] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Subtle parallax on offset photos
    if (photo1Ref.current && containerRef.current) {
      gsap.to(photo1Ref.current, {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    if (photo2Ref.current && containerRef.current) {
      gsap.to(photo2Ref.current, {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Count-up animation for stats
    if (statRef.current && !hasCounted) {
      ScrollTrigger.create({
        trigger: statRef.current,
        start: "top 85%",
        onEnter: () => {
          setHasCounted(true);
          const obj = { years: 0, members: 0, trainers: 0 };
          gsap.to(obj, {
            years: 10,
            members: 2500,
            trainers: 12,
            duration: 1.5,
            ease: "power2.out",
            onUpdate: () => {
              setDisplayYears(Math.round(obj.years));
              setDisplayMembers(Math.round(obj.members));
              setDisplayTrainers(Math.round(obj.trainers));
            },
          });
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === containerRef.current) st.kill();
      });
    };
  }, [hasCounted]);

  return (
    <section
      ref={containerRef}
      id="about"
      className="w-full py-16 md:py-28 bg-[#0A1A1F] text-white overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (5 Cols): Plain English Editorial Content */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-[12px] uppercase tracking-[0.15em] text-[#F21B35] font-semibold mb-3 block">
              About us
            </span>

            <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.05] mb-6">
              A Modern Gym Built For Real Progress
            </h2>

            {/* 3 Short Benefit Lines */}
            <div className="flex flex-col gap-3.5 mb-8">
              <div className="flex items-start gap-3 bg-[#0F2329]/90 border border-[#1E3840] rounded-xl p-3.5">
                <div className="w-8 h-8 rounded-full bg-[#0A1A1F] border border-[#1E3840] flex items-center justify-center text-[#F21B35] shrink-0 font-heading font-bold text-xs">
                  <Clock className="w-4 h-4 text-[#F21B35]" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-white uppercase leading-[1.05]">
                    Open 24/7
                  </h3>
                  <p className="font-body text-sm text-[#E5E5E5] mt-0.5 leading-relaxed">
                    Train whenever you want with secure biometric fingerprint access.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#0F2329]/90 border border-[#1E3840] rounded-xl p-3.5">
                <div className="w-8 h-8 rounded-full bg-[#0A1A1F] border border-[#1E3840] flex items-center justify-center text-[#F21B35] shrink-0">
                  <Award className="w-4 h-4 text-[#F21B35]" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-white uppercase leading-[1.05]">
                    Certified coaches
                  </h3>
                  <p className="font-body text-sm text-[#E5E5E5] mt-0.5 leading-relaxed">
                    Personal guidance on lifting form, injury prevention, and nutrition.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#0F2329]/90 border border-[#1E3840] rounded-xl p-3.5">
                <div className="w-8 h-8 rounded-full bg-[#0A1A1F] border border-[#1E3840] flex items-center justify-center text-[#F21B35] shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#F21B35]" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-white uppercase leading-[1.05]">
                    Zero hidden fees
                  </h3>
                  <p className="font-body text-sm text-[#E5E5E5] mt-0.5 leading-relaxed">
                    Transparent pricing, no lock-in contracts, and zero surprise charges.
                  </p>
                </div>
              </div>
            </div>

            {/* Stat Counters: years, members, trainers, Google rating */}
            <div ref={statRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#1E3840]">
              <div>
                <div className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.05]">
                  {displayYears || 10}+
                </div>
                <div className="font-body text-xs text-[#B7C4C8] mt-1">
                  Years
                </div>
              </div>
              <div>
                <div className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.05]">
                  {displayMembers ? displayMembers.toLocaleString("en-IN") : "2,500"}+
                </div>
                <div className="font-body text-xs text-[#B7C4C8] mt-1">
                  Members
                </div>
              </div>
              <div>
                <div className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.05]">
                  {displayTrainers || 12}+
                </div>
                <div className="font-body text-xs text-[#B7C4C8] mt-1">
                  Trainers
                </div>
              </div>
              <div>
                <div className="font-heading text-3xl sm:text-4xl font-bold text-[#F21B35] tracking-tight leading-[1.05] flex items-center gap-1">
                  4.9 <Star className="w-4 h-4 fill-[#F21B35] stroke-none inline -mt-1" />
                </div>
                <div className="font-body text-xs text-[#B7C4C8] mt-1">
                  Google Rating
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols): Natural Offset Photography Module */}
          <div className="lg:col-span-7 relative">
            <div className="relative w-full h-[460px] md:h-[540px] flex items-center">
              {/* Primary Main Photo (4:5 aspect ratio) */}
              <div
                ref={photo1Ref}
                className="w-4/5 h-[380px] md:h-[460px] relative z-10 border border-[#1E3840] overflow-hidden rounded-none shadow-2xl will-change-transform"
              >
                <Image
                  src="/images/about-1.jpg"
                  alt="Barbell training with calibrated plates"
                  fill
                  sizes="(max-width: 768px) 80vw, 40vw"
                  className="object-cover filter brightness-[0.95] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-[#0A1A1F]/15 pointer-events-none" />
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-[#0A1A1F]/90 border border-[#1E3840] text-xs font-body text-white">
                  Zone 1 • Free Weights
                </div>
              </div>

              {/* Offset Secondary Photo (1:1 aspect ratio) */}
              <div
                ref={photo2Ref}
                className="absolute right-0 bottom-4 w-1/2 h-[220px] md:h-[280px] z-20 border border-[#1E3840] bg-[#0F2329] overflow-hidden rounded-none shadow-2xl will-change-transform"
              >
                <Image
                  src="/images/about-2.jpg"
                  alt="Precision dumbbell rack in natural lighting"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover filter brightness-[0.95] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-[#0A1A1F]/15 pointer-events-none" />
                <div className="absolute bottom-3 left-3 px-3 py-1 bg-[#0A1A1F]/90 border border-[#1E3840] text-xs font-body text-white">
                  Dumbbell Racks
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
