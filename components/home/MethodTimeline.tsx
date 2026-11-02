"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function MethodTimeline() {
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const activePillarIndexRef = useRef(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const scrollTriggerInstance = useRef<ScrollTrigger | null>(null);
  const isProgrammaticScroll = useRef(false);
  const isVisible = useRef(false);

  const pillars = siteConfig.pillars;
  const activePillar = pillars[activePillarIndex];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Programmatic pillar selection (syncs scroll position within pinned range)
  const selectPillar = useCallback(
    (idx: number) => {
      const clamped = Math.max(0, Math.min(idx, pillars.length - 1));
      setActivePillarIndex(clamped);
      activePillarIndexRef.current = clamped;

      if (scrollTriggerInstance.current && containerRef.current) {
        isProgrammaticScroll.current = true;
        const start = scrollTriggerInstance.current.start;
        const end = scrollTriggerInstance.current.end;
        // Midpoint of the chosen pillar's segment along the pin distance
        const targetProgress = (clamped + 0.5) / pillars.length;
        const targetScroll = start + targetProgress * (end - start);

        window.scrollTo({
          top: targetScroll,
          behavior: "smooth",
        });

        setTimeout(() => {
          isProgrammaticScroll.current = false;
        }, 650);
      }
    },
    [pillars.length]
  );

  // Track visibility for keyboard navigation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible.current = entry.isIntersecting;
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (!isVisible.current) return;
      if (e.key === "ArrowRight") {
        selectPillar(activePillarIndexRef.current + 1);
      } else if (e.key === "ArrowLeft") {
        selectPillar(activePillarIndexRef.current - 1);
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [selectPillar]);

  // GSAP ScrollTrigger setup for scroll-driven progression
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !pinContainerRef.current) return;

    const totalPillars = pillars.length;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=240%",
      pin: pinContainerRef.current,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        if (isProgrammaticScroll.current) return;

        const progress = self.progress;
        const pillarIndex = Math.min(
          Math.floor(progress * totalPillars),
          totalPillars - 1
        );

        if (activePillarIndexRef.current !== pillarIndex) {
          activePillarIndexRef.current = pillarIndex;
          setActivePillarIndex(pillarIndex);
        }
      },
    });

    scrollTriggerInstance.current = trigger;

    return () => {
      trigger.kill();
    };
  }, [pillars.length]);

  return (
    <section
      ref={containerRef}
      id="how-we-train"
      className="relative w-full bg-[#0A1A1F] text-white"
    >
      <div
        ref={pinContainerRef}
        className="w-full min-h-[100svh] flex flex-col justify-center py-12 md:py-16"
      >
        <div className="max-w-[1240px] w-full mx-auto px-4 sm:px-6 md:px-10">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center mb-10 md:mb-14">
            <span className="font-heading text-xs font-semibold uppercase tracking-wider text-[#B7C4C8] mb-2 sm:mb-3">
              Our approach
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
              How we train
            </h2>
            <p className="font-body text-[14px] sm:text-[15px] text-[#B7C4C8] max-w-lg leading-relaxed">
              Four key pillars designed to help you build sustainable habits and keep making progress.
            </p>
          </div>

          {/* Timeline Bar with 4 Dots and Rotating SVG Badge */}
          <div
            className="relative max-w-2xl mx-auto mb-20 md:mb-24 px-10 sm:px-12 md:px-16 select-none"
            tabIndex={0}
            role="region"
            aria-label="How we train interactive timeline"
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") selectPillar(activePillarIndex + 1);
              if (e.key === "ArrowLeft") selectPillar(activePillarIndex - 1);
            }}
          >
            {/* Inner relative track container where line & dots reside */}
            <div className="relative w-full h-12 flex items-center">
              {/* Base Inactive Line: runs from 0% (dot 0 center) to 100% (dot 3 center) */}
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#1E3840] -translate-y-1/2 z-0" />

              {/* Active Red Fill Line */}
              <div
                className="absolute top-1/2 left-0 h-[2px] bg-[#F21B35] -translate-y-1/2 transition-all duration-500 ease-out z-0"
                style={{
                  width: `${(activePillarIndex / (pillars.length - 1)) * 100}%`,
                }}
              />

              {/* The Gliding Circular Badge Container - Perfectly centered on active dot */}
              <div
                data-testid="rotating-badge-container"
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none z-10 will-change-[left]"
                style={{
                  left: `${(activePillarIndex / (pillars.length - 1)) * 100}%`,
                  transition: prefersReducedMotion
                    ? "opacity 0.3s ease"
                    : "left 0.6s cubic-bezier(0.76, 0, 0.24, 1)",
                }}
              >
                {/* Rotating Ring Badge: 72px desktop, 56px mobile */}
                <div className="relative w-[56px] h-[56px] md:w-[72px] md:h-[72px] flex items-center justify-center">
                  {/* 1. Filled Background Circle in page color #0A1A1F so line passes behind */}
                  <svg
                    viewBox="0 0 100 100"
                    className="absolute inset-0 w-full h-full"
                    aria-hidden="true"
                  >
                    <circle cx="50" cy="50" r="48" fill="#0A1A1F" />
                  </svg>

                  {/* 2. Rotating Circular SVG Text: 1 full turn in 20s, linear */}
                  <svg
                    viewBox="0 0 100 100"
                    className={`w-full h-full select-none ${
                      prefersReducedMotion ? "" : "animate-[spin_20s_linear_infinite]"
                    }`}
                    aria-hidden="true"
                  >
                    <path
                      id="circlePathPillars"
                      d="M 50, 14 a 36,36 0 1,1 0,72 a 36,36 0 1,1 0,-72"
                      fill="none"
                    />
                    <text
                      fill="#B7C4C8"
                      fontSize="8.2"
                      fontFamily="system-ui, -apple-system, sans-serif"
                      fontWeight="600"
                      letterSpacing="1.2"
                    >
                      <textPath
                        href="#circlePathPillars"
                        startOffset="0%"
                        textLength="222"
                        lengthAdjust="spacingAndGlyphs"
                      >
                        BALANCE • PROGRESS • CONSISTENCY •
                      </textPath>
                    </text>
                  </svg>
                </div>
              </div>

              {/* 4 Interactive Dot Anchors: Each centered at (idx / (pillars.length - 1)) * 100% */}
              {pillars.map((pillar, idx) => {
                const isActive = idx === activePillarIndex;
                const isPast = idx <= activePillarIndex;
                const leftPercent = (idx / (pillars.length - 1)) * 100;
                return (
                  <button
                    key={pillar.id}
                    onClick={() => selectPillar(idx)}
                    className="group absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center focus:outline-none z-20 cursor-pointer"
                    style={{ left: `${leftPercent}%` }}
                    aria-label={`View ${pillar.title} pillar`}
                    aria-pressed={isActive}
                    data-dot-index={idx}
                  >
                    {/* The Dot: 24px wide, centered on the line */}
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "border-[#F21B35] bg-[#F21B35] scale-110 shadow-[0_0_15px_rgba(242,27,53,0.5)]"
                          : isPast
                          ? "border-[#F21B35] bg-[#0A1A1F]"
                          : "border-[#1E3840] bg-[#0A1A1F] group-hover:border-white"
                      }`}
                    >
                      {/* Inner Pip */}
                      <div
                        className={`w-2 h-2 rounded-full transition-colors ${
                          isActive ? "bg-white" : isPast ? "bg-[#F21B35]" : "bg-transparent"
                        }`}
                      />
                    </div>

                    {/* Step Label: positioned with clearance below dot */}
                    <span
                      className={`absolute top-[52px] md:top-[62px] whitespace-nowrap font-heading text-[11px] sm:text-xs uppercase tracking-wider transition-colors ${
                        isActive ? "text-white font-bold" : "text-[#B7C4C8] group-hover:text-white"
                      }`}
                    >
                      {pillar.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pillar Content Card (4:3 Aspect Ratio) */}
          <div className="max-w-3xl mx-auto bg-[#0F2329] border border-[#1E3840] rounded-card overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="grid grid-cols-1 md:grid-cols-12 items-center"
              >
                {/* Photo: sharp 0px corners, 4:3 aspect ratio */}
                <div className="md:col-span-6 h-64 md:h-80 relative overflow-hidden bg-[#0A1A1F] border-b md:border-b-0 md:border-r border-[#1E3840]">
                  <Image
                    src={activePillar.image}
                    alt={activePillar.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover filter brightness-[0.95] contrast-[1.05] rounded-none"
                  />
                  <div className="absolute inset-0 bg-[#0A1A1F]/15 pointer-events-none" />
                  <div className="absolute bottom-4 left-4 px-3 py-1 bg-[#0A1A1F]/90 border border-[#1E3840] text-xs font-body text-white">
                    Pillar {activePillarIndex + 1} of 4
                  </div>
                </div>

                {/* Text Description */}
                <div className="md:col-span-6 p-8 md:p-10 flex flex-col justify-center">
                  <span className="font-heading text-xs uppercase tracking-wider text-[#B7C4C8] mb-1">
                    {activePillar.subtitle}
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
                    {activePillar.title}
                  </h3>
                  <p className="font-body text-[14px] text-[#B7C4C8] leading-relaxed mb-6">
                    {activePillar.description}
                  </p>
                  <blockquote className="border-l-2 border-[#F21B35] pl-4 italic font-body text-xs text-white">
                    &ldquo;{activePillar.quote}&rdquo;
                  </blockquote>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
