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
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaClusterRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!startAnimation) return;

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline();
    let ambientAnim: gsap.core.Tween | null = null;

    // 1. Cinematic entrance zoom-out: scales down from 1.32 to 1.05 over 5s
    if (imageInnerRef.current) {
      tl.fromTo(
        imageInnerRef.current,
        { scale: 1.32 },
        {
          scale: 1.05,
          duration: 5.0,
          ease: "power2.out",
          onComplete: () => {
            // Gentle continuous ambient breathing zoom
            ambientAnim = gsap.to(imageInnerRef.current, {
              scale: 1.10,
              duration: 9,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            });
          },
        },
        0
      );
    }

    // 2. Headline reveals line by line: translateY 110% to 0 inside overflow-hidden, 0.9s, stagger 0.12s
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

    // 5. Scroll-driven zoom-out: as user scrolls down through the hero, the image wrapper zooms out smoothly
    if (imageWrapperRef.current && containerRef.current) {
      gsap.to(imageWrapperRef.current, {
        scale: 0.88,
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }

    return () => {
      tl.kill();
      if (ambientAnim) ambientAnim.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === containerRef.current) st.kill();
      });
    };
  }, [startAnimation]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[100svh] py-24 sm:py-28 flex flex-col items-center justify-center overflow-hidden bg-[#0A1A1F]"
    >
      {/* Background Media with multi-stage zoomout and overlays */}
      <div
        ref={imageWrapperRef}
        className="absolute inset-0 w-full h-full z-0 overflow-hidden will-change-transform origin-center"
      >
        <div
          ref={imageInnerRef}
          className="relative w-full h-full will-change-transform origin-center"
          style={{ transform: "scale(1.25)" }}
        >
          <Image
            src="/images/hero.jpg"
            alt="Bright modern fitness gym floor in Waghodia Vadodara"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter brightness-[0.92] contrast-[1.05]"
          />
        </div>

        {/* Balanced 48% dark overlay */}
        <div className="absolute inset-0 bg-[#0A1A1F]/48 pointer-events-none" />

        {/* Radial backing to guarantee crisp white text contrast without darkening the whole photo */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(10,26,31,0.65) 0%, rgba(10,26,31,0.15) 70%)",
          }}
        />

        {/* Top & bottom gentle gradient fades for smooth transitions */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0A1A1F]/80 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A1A1F] to-transparent pointer-events-none" />
      </div>

      {/* Hero Content - Constrained to 1240px */}
      <div className="relative z-10 max-w-[1240px] w-full mx-auto px-6 md:px-10 pt-20 flex flex-col items-center text-center">
        {/* Display Headline with Line-by-Line Reveal Mask */}
        <h1 className="font-heading text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white uppercase leading-[0.98] mb-6 max-w-4xl drop-shadow-md">
          <span className="line-reveal-wrapper">
            <span ref={line1Ref} className="inline-block will-change-transform">
              Build Your
            </span>
          </span>
          <span className="line-reveal-wrapper">
            <span ref={line2Ref} className="inline-block will-change-transform text-white">
              Stronger Self.
            </span>
          </span>
        </h1>

        {/* Plain English Subline */}
        <p
          ref={sublineRef}
          className="font-body text-base md:text-xl text-[#B7C4C8] max-w-xl mx-auto mb-10 leading-relaxed drop-shadow"
        >
          {siteConfig.brand.subline}
        </p>

        {/* CTA Cluster */}
        <div
          ref={ctaClusterRef}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10 sm:mb-12"
        >
          <TransitionLink
            href="/free-trial"
            title="Free Trial"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-[#0A1A1F] font-heading text-xs uppercase tracking-widest font-semibold text-center hover:bg-[#F21B35] hover:text-white transition-all duration-300 shadow-xl active:scale-95"
          >
            Claim 1-Day Pass
          </TransitionLink>
          <TransitionLink
            href="/programs"
            title="Programs"
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-[#1E3840] bg-[#0F2329]/80 backdrop-blur-sm text-white font-heading text-xs uppercase tracking-widest font-medium text-center hover:border-white transition-all duration-300 active:scale-95"
          >
            Explore Programs
          </TransitionLink>
        </div>

        {/* Circular Scroll Down Indicator - Perfectly centered in between below CTAs */}
        <a
          ref={scrollIndicatorRef}
          href="#about"
          aria-label="Scroll down to about section"
          className="relative z-10 w-12 h-12 rounded-full border border-[#1E3840] bg-[#0F2329]/80 backdrop-blur-sm flex items-center justify-center text-white hover:border-[#F21B35] hover:shadow-[0_0_20px_rgba(242,27,53,0.3)] transition-all duration-300 group"
        >
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 48 48"
          >
            <circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="#1E3840"
              strokeWidth="1.5"
              className="transition-colors duration-300 group-hover:stroke-white/40"
            />
          </svg>
          <ArrowDown className="w-4 h-4 text-white group-hover:translate-y-0.5 transition-transform duration-200" />
        </a>
      </div>
    </section>
  );
}
