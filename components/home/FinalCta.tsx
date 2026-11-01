"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/LeadForm";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function FinalCta() {
  const containerRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (line1Ref.current && line2Ref.current && containerRef.current) {
      gsap.fromTo(
        [line1Ref.current, line2Ref.current],
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === containerRef.current) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-16 md:py-28 bg-[#06151A] text-white border-t border-[#1E3840] overflow-hidden"
    >
      {/* Background Photo Band with Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <Image
          src="/images/cta.jpg"
          alt="Gym training background"
          fill
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.8]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06151A] via-[#06151A]/80 to-[#06151A]" />
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column (6 Cols): Headline & Invitation */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#F21B35] animate-pulse" />
              <span className="font-heading text-xs font-semibold uppercase tracking-wider text-[#B7C4C8]">
                {siteConfig.brand.badge}
              </span>
            </div>

            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-[1.05] mb-6">
              <span className="line-reveal-wrapper">
                <span ref={line1Ref} className="inline-block will-change-transform">
                  Your Next Chapter
                </span>
              </span>
              <span className="line-reveal-wrapper">
                <span ref={line2Ref} className="inline-block will-change-transform text-white">
                  Starts Here.
                </span>
              </span>
            </h2>

            <p className="font-body text-[15px] text-[#B7C4C8] max-w-lg mb-8 leading-relaxed">
              Try out our Waghodia gym floor with a free 1-Day Pass. Full access to weights, cardio machines,
              and any group class on your visit.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-6 border-t border-[#1E3840] text-xs text-[#B7C4C8]">
              <div>
                <strong className="text-white block font-heading uppercase tracking-wider mb-0.5">
                  Location:
                </strong>
                Waghodia Road, Vadodara
              </div>
              <div className="sm:border-l sm:border-[#1E3840] sm:pl-6">
                <strong className="text-white block font-heading uppercase tracking-wider mb-0.5">
                  Access:
                </strong>
                Open 24/7/365
              </div>
            </div>
          </div>

          {/* Right Column (6 Cols): Embedded Short Free-Trial Form */}
          <div className="lg:col-span-6">
            <LeadForm source="Home Final CTA" />
          </div>
        </div>
      </div>
    </section>
  );
}
