"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Intro() {
  const containerRef = useRef<HTMLElement>(null);
  const photo1Ref = useRef<HTMLDivElement>(null);
  const photo2Ref = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLDivElement>(null);
  const [hasCounted, setHasCounted] = useState(false);
  const [displayYears, setDisplayYears] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Parallax on offset photos
    if (photo1Ref.current && containerRef.current) {
      gsap.to(photo1Ref.current, {
        yPercent: -8,
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
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Count-up animation for verified 10 years
    if (statRef.current && !hasCounted) {
      ScrollTrigger.create({
        trigger: statRef.current,
        start: "top 85%",
        onEnter: () => {
          setHasCounted(true);
          const obj = { val: 0 };
          gsap.to(obj, {
            val: 10,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => {
              setDisplayYears(Math.round(obj.val));
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
      id="intro"
      className="w-full py-28 md:py-40 bg-[#0A1A1F] text-white overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (5 Cols): Editorial Content */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F21B35]" />
              <span className="font-heading text-xs uppercase tracking-widest text-[#B7C4C8]">
                Sanctuary Overview
              </span>
            </div>

            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-tight mb-8">
              {siteConfig.brand.yearsOfExcellence}
            </h2>

            <p className="font-body text-base text-[#B7C4C8] leading-relaxed mb-6">
              {siteConfig.brand.introSummary}
            </p>

            <p className="font-body text-base text-[#B7C4C8] leading-relaxed mb-10">
              Our floor integrates certified master coaches, seamless round-the-clock facility access,
              and designated biomechanical lifting arenas. Every apparatus is calibrated to translate
              focused effort into measurable, permanent vitality.
            </p>

            {/* Spec Metrics Row (Only verified numbers) */}
            <div ref={statRef} className="grid grid-cols-2 gap-8 pt-6 border-t border-[#1E3840]">
              <div>
                <div className="font-heading text-4xl md:text-5xl font-bold text-white">
                  {displayYears || 10}+
                </div>
                <div className="font-body text-xs uppercase tracking-wider text-[#B7C4C8] mt-1">
                  Years Operating in Vadodara
                </div>
              </div>
              <div>
                <div className="font-heading text-4xl md:text-5xl font-bold text-white">
                  24 / 7
                </div>
                <div className="font-body text-xs uppercase tracking-wider text-[#B7C4C8] mt-1">
                  {siteConfig.brand.accessType}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols): Offset Photography Module */}
          <div className="lg:col-span-7 relative">
            <div className="relative w-full h-[500px] md:h-[620px] flex items-center">
              {/* Primary Main Photo (Sharp 0px corners, border hairline) */}
              <div
                ref={photo1Ref}
                className="w-4/5 h-[420px] md:h-[520px] relative z-10 border border-[#1E3840] overflow-hidden rounded-none shadow-2xl will-change-transform"
              >
                <Image
                  src="/images/intro-1.jpg"
                  alt="Precision calibrated Olympic weight racks"
                  fill
                  sizes="(max-width: 768px) 80vw, 45vw"
                  className="object-cover filter brightness-[0.8] contrast-[1.1]"
                />
                <div className="absolute inset-0 bg-[#06151A]/20 pointer-events-none" />
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-[#0A1A1F]/90 border border-[#1E3840] text-[10px] font-heading uppercase tracking-widest text-[#B7C4C8]">
                  Zone 01 • Olympic Free Weights
                </div>
              </div>

              {/* Offset Secondary Photo (Sharp 0px corners, border hairline) */}
              <div
                ref={photo2Ref}
                className="absolute right-0 bottom-6 w-1/2 h-[260px] md:h-[340px] z-20 border border-[#1E3840] bg-[#0F2329] overflow-hidden rounded-none shadow-2xl will-change-transform"
              >
                <Image
                  src="/images/intro-2.jpg"
                  alt="Close-up of heavy cast iron dumbbells"
                  fill
                  sizes="(max-width: 768px) 50vw, 30vw"
                  className="object-cover filter brightness-[0.75] contrast-[1.15]"
                />
                <div className="absolute inset-0 bg-[#06151A]/30 pointer-events-none" />
                <div className="absolute bottom-3 left-3 px-3 py-1 bg-[#0A1A1F]/90 border border-[#1E3840] text-[10px] font-heading uppercase tracking-widest text-[#B7C4C8]">
                  Zone 02 • Biomechanical Racks
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

