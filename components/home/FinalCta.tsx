"use client";

import React, { useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";
import { TransitionLink } from "../motion/TransitionLink";
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
      className="w-full py-28 md:py-44 bg-[#06151A] text-white border-t border-[#1E3840] relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col items-center text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F2329] border border-[#1E3840] mb-8">
          <span className="w-2 h-2 rounded-full bg-[#F21B35] animate-pulse" />
          <span className="font-heading text-xs uppercase tracking-widest text-[#B7C4C8]">
            {siteConfig.brand.badge}
          </span>
        </div>

        {/* Mask Revealed Headline */}
        <h2 className="font-heading text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white uppercase leading-[0.98] mb-8 max-w-5xl">
          <span className="line-reveal-wrapper">
            <span ref={line1Ref} className="inline-block will-change-transform">
              YOUR NEXT CHAPTER
            </span>
          </span>
          <span className="line-reveal-wrapper">
            <span ref={line2Ref} className="inline-block will-change-transform text-white">
              STARTS HERE.
            </span>
          </span>
        </h2>

        <p className="font-body text-base md:text-xl text-[#B7C4C8] max-w-xl mx-auto mb-12 leading-relaxed">
          Experience our Waghodia performance sanctuary firsthand with a complimentary 1-Day VIP Pass.
          Full floor access, class entry, and dedicated onboarding.
        </p>

        {/* White Pill Action Button with slide-in fill on hover */}
        <TransitionLink
          href="/free-trial"
          title="Free Trial"
          className="relative inline-flex items-center justify-center px-10 py-5 rounded-full bg-white text-[#0A1A1F] font-heading text-sm uppercase tracking-widest font-bold overflow-hidden group shadow-2xl active:scale-95 transition-all"
        >
          <span className="absolute inset-0 w-full h-full bg-[#F21B35] transform translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0" />
          <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
            Claim 1-Day VIP Pass
          </span>
        </TransitionLink>
      </div>
    </section>
  );
}

