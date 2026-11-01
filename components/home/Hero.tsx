"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { TransitionLink } from "../motion/TransitionLink";
import { ArrowDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Hero({ startAnimation = true }: { startAnimation?: boolean }) {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaClusterRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!startAnimation) return;

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline();

    // 1. Background image scales from 1.15 to 1.0 over 1.6s
    if (imageRef.current) {
      tl.fromTo(
        imageRef.current,
        { scale: 1.15 },
        { scale: 1.0, duration: 1.6, ease: "power2.out" },
        0
      );
    }

    // Status badge fade in
    if (badgeRef.current) {
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        0.2
      );
    }

    // 2. Headline reveals line by line: translateY 110% to 0 inside overflow-hidden, 0.9s, stagger 0.12s, ease power4.out
    if (line1Ref.current && line2Ref.current) {
      tl.fromTo(
        [line1Ref.current, line2Ref.current],
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power4.out",
        },
        0.4
      );
    }

    // 3. Subline and CTA buttons fade up (0.6s)
    if (sublineRef.current) {
      tl.fromTo(
        sublineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        0.9
      );
    }

    if (ctaClusterRef.current) {
      tl.fromTo(
        ctaClusterRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        1.1
      );
    }

    // 4. Scroll indicator appears
    if (scrollIndicatorRef.current) {
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" },
        1.3
      );
    }

    // 5. Subtle parallax: hero image moves up to 8% slower than the page
    if (imageRef.current && containerRef.current) {
      gsap.to(imageRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === containerRef.current) st.kill();
      });
    };
  }, [startAnimation]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[740px] flex items-center justify-center overflow-hidden bg-[#06151A]"
    >
      {/* Background Media with Parallax and Editorial Dark Teal Tint */}
      <div ref={imageRef} className="absolute inset-0 w-full h-full z-0 will-change-transform">
        <Image
          src="/images/hero.jpg"
          alt="FITNESSGYM Architectural Sanctuary Interior"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.58] contrast-[1.15]"
        />
        {/* Dark Teal Atmospheric Gradient Tint */}
        <div className="absolute inset-0 bg-[#06151A]/75 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A1F] via-transparent to-[#06151A]/60 pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 md:px-12 lg:px-20 pt-20 flex flex-col items-center text-center">
        {/* Status Pip Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0F2329]/90 border border-[#1E3840] mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#F21B35] animate-pulse" />
          <span className="font-heading text-xs uppercase tracking-widest text-[#B7C4C8]">
            {siteConfig.brand.badge}
          </span>
        </div>

        {/* Display Headline with Line-by-Line Reveal Mask */}
        <h1 className="font-heading text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white uppercase leading-[0.98] mb-6 max-w-5xl">
          <span className="line-reveal-wrapper">
            <span ref={line1Ref} className="inline-block will-change-transform">
              BUILD YOUR
            </span>
          </span>
          <span className="line-reveal-wrapper">
            <span ref={line2Ref} className="inline-block will-change-transform text-white">
              STRONGER SELF.
            </span>
          </span>
        </h1>

        {/* Subline */}
        <p
          ref={sublineRef}
          className="font-body text-base md:text-xl text-[#B7C4C8] max-w-xl mx-auto mb-10 leading-relaxed"
        >
          {siteConfig.brand.subline}
        </p>

        {/* CTA Cluster */}
        <div
          ref={ctaClusterRef}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <TransitionLink
            href="/free-trial"
            title="Free Trial"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-[#0A1A1F] font-heading text-xs uppercase tracking-widest font-semibold text-center hover:bg-[#F21B35] hover:text-white transition-all duration-300 shadow-lg active:scale-95"
          >
            Claim 1-Day Pass
          </TransitionLink>
          <TransitionLink
            href="/programs"
            title="Programs"
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-[#1E3840] bg-[#0F2329]/60 text-white font-heading text-xs uppercase tracking-widest font-medium text-center hover:border-white transition-all duration-300 active:scale-95"
          >
            Explore Programs
          </TransitionLink>
        </div>
      </div>

      {/* Circular Scroll Down Indicator with slowly drawing ring */}
      <a
        ref={scrollIndicatorRef}
        href="#intro"
        aria-label="Scroll down to facility overview"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 w-12 h-12 rounded-full border border-[#1E3840] bg-[#0F2329]/80 flex items-center justify-center text-white hover:border-[#F21B35] transition-all duration-300 group"
      >
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
          viewBox="0 0 48 48"
        >
          <circle
            cx="24"
            cy="24"
            r="22"
            fill="none"
            stroke="#1E3840"
            strokeWidth="1.5"
          />
          <circle
            cx="24"
            cy="24"
            r="22"
            fill="none"
            stroke="#F21B35"
            strokeWidth="1.5"
            strokeDasharray="138"
            strokeDashoffset="100"
            className="transition-all duration-700 group-hover:stroke-dashoffset-0"
          />
        </svg>
        <ArrowDown className="w-4 h-4 text-white group-hover:translate-y-0.5 transition-transform duration-200" />
      </a>
    </section>
  );
}

