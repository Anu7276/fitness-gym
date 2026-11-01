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
      id="about"
      className="w-full py-16 md:py-28 bg-[#0A1A1F] text-white overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (5 Cols): Plain English Editorial Content */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="font-heading text-xs font-semibold uppercase tracking-wider text-[#B7C4C8] mb-3">
              About us
            </span>

            <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
              {siteConfig.brand.yearsOfExcellence}
            </h2>

            <p className="font-body text-[15px] text-[#B7C4C8] leading-relaxed mb-4">
              {siteConfig.brand.aboutSummary}
            </p>

            <p className="font-body text-[15px] text-[#B7C4C8] leading-relaxed mb-8">
              Whether you are lifting for the first time or training for peak athletic performance, our
              certified coaches and dedicated workout zones give you the structure to reach your goals.
            </p>

            {/* Verified Numbers Only (Single Source of Truth) */}
            <div ref={statRef} className="grid grid-cols-2 gap-8 pt-6 border-t border-[#1E3840]">
              <div>
                <div className="font-heading text-4xl md:text-5xl font-bold text-white tracking-tight">
                  {displayYears || 10}
                </div>
                <div className="font-body text-xs text-[#B7C4C8] mt-1">
                  Years of excellence in Vadodara
                </div>
              </div>
              <div>
                <div className="font-heading text-4xl md:text-5xl font-bold text-white tracking-tight">
                  24 / 7
                </div>
                <div className="font-body text-xs text-[#B7C4C8] mt-1">
                  Open round-the-clock keyless access
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
