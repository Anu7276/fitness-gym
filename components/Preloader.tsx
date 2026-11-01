"use client";

import React, { useEffect, useState, useRef } from "react";
import { siteConfig } from "@/config/site";
import { gsap } from "gsap";

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteFade, setQuoteFade] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const dumbbellGroupRef = useRef<SVGGElement>(null);
  const barFillRef = useRef<SVGRectElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const quotesRef = useRef<HTMLDivElement>(null);
  const maskHoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    if (!siteConfig.loader.enabled) {
      if (onComplete) onComplete();
      return;
    }

    // Show once per session
    const hasSeen = sessionStorage.getItem("fitnessgym_preloader_seen");
    if (hasSeen) {
      if (onComplete) onComplete();
      return;
    }

    setShow(true);
    document.documentElement.classList.add("is-loading");

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setTimeout(() => {
        sessionStorage.setItem("fitnessgym_preloader_seen", "true");
        document.documentElement.classList.remove("is-loading");
        setShow(false);
        if (onComplete) onComplete();
      }, 400);
      return;
    }

    // GSAP master timeline for the 2.4s sequence
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("fitnessgym_preloader_seen", "true");
        document.documentElement.classList.remove("is-loading");
        setShow(false);
        if (onComplete) onComplete();
      },
    });

    // 0.00-0.40s: Wordmark appears letter by letter
    if (wordmarkRef.current) {
      const letters = wordmarkRef.current.querySelectorAll(".letter");
      tl.fromTo(
        letters,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.03, ease: "power2.out" },
        0
      );
    }

    // Dumbbell rep animation: rises 24px (0.6s, power2.out), holds 0.3s shaking 2px 3 times, lowers (0.6s, power2.in)
    if (dumbbellGroupRef.current) {
      // 0.20s - 0.80s: rise 24px
      tl.to(dumbbellGroupRef.current, { y: -24, duration: 0.6, ease: "power2.out" }, 0.2);

      // 0.80s - 1.16s: shake plates 2px 3 times
      tl.to(dumbbellGroupRef.current, { x: 2, duration: 0.06, ease: "power1.inOut" }, 0.8);
      tl.to(dumbbellGroupRef.current, { x: -2, duration: 0.06, ease: "power1.inOut" }, 0.86);
      tl.to(dumbbellGroupRef.current, { x: 2, duration: 0.06, ease: "power1.inOut" }, 0.92);
      tl.to(dumbbellGroupRef.current, { x: -2, duration: 0.06, ease: "power1.inOut" }, 0.98);
      tl.to(dumbbellGroupRef.current, { x: 2, duration: 0.06, ease: "power1.inOut" }, 1.04);
      tl.to(dumbbellGroupRef.current, { x: 0, duration: 0.06, ease: "power1.inOut" }, 1.10);

      // 1.16s - 1.76s: lower 24px
      tl.to(dumbbellGroupRef.current, { y: 0, duration: 0.6, ease: "power2.in" }, 1.16);
    }

    // Real asset loading hook + continuous progress counter 00 to 100
    const progressObj = { value: 0 };
    tl.to(
      progressObj,
      {
        value: 100,
        duration: 1.6,
        ease: "power1.inOut",
        onUpdate: () => {
          const val = Math.round(progressObj.value);
          const formatted = val < 10 ? `0${val}` : `${val}`;
          if (counterRef.current) counterRef.current.innerText = formatted;
          if (barFillRef.current) barFillRef.current.setAttribute("width", `${(val / 100) * 50}`);
          if (progressLineRef.current) progressLineRef.current.style.width = `${val}%`;
        },
      },
      0.2
    );

    // Quote rotation at 1.2s with crossfade
    setTimeout(() => {
      setQuoteFade(false);
      setTimeout(() => {
        setQuoteIndex(1);
        setQuoteFade(true);
      }, 150);
    }, 1200);

    // 1.80-2.40s: Exit phase
    // Wordmark & dumbbell scale to 0.9 and fade (0.3s)
    if (wordmarkRef.current && dumbbellGroupRef.current) {
      tl.to(
        [wordmarkRef.current, dumbbellGroupRef.current, counterRef.current, progressLineRef.current?.parentElement, quotesRef.current],
        { scale: 0.9, opacity: 0, duration: 0.3, ease: "power2.in" },
        1.8
      );
    }

    // Circular hole mask grows from center (0.6s, power3.inOut) revealing hero underneath
    const holeObj = { radius: 0 };
    tl.to(
      holeObj,
      {
        radius: 120,
        duration: 0.6,
        ease: "power3.inOut",
        onUpdate: () => {
          if (containerRef.current) {
            const r = holeObj.radius;
            containerRef.current.style.maskImage = `radial-gradient(circle at 50% 50%, transparent ${r}%, black ${r + 5}%)`;
            containerRef.current.style.webkitMaskImage = `radial-gradient(circle at 50% 50%, transparent ${r}%, black ${r + 5}%)`;
          }
        },
      },
      1.8
    );

    // Fade out preloader container completely
    tl.to(
      containerRef.current,
      { opacity: 0, duration: 0.3, ease: "power2.inOut" },
      2.1
    );

    // Trigger hero intro when hole is about half open (~2.15s)
    tl.add(() => {
      if (onComplete) onComplete();
    }, 2.15);

    return () => {
      tl.kill();
      document.documentElement.classList.remove("is-loading");
    };
  }, [onComplete]);

  if (!mounted || !show) return null;

  const brandName = siteConfig.brand.name; // "FITNESSGYM"

  return (
    <div
      ref={containerRef}
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A1A1F] text-white select-none pointer-events-none transition-opacity duration-300"
    >
      <span className="sr-only">Loading {brandName}...</span>

      <div className="flex flex-col items-center max-w-sm px-6 text-center">
        {/* Letter by letter wordmark */}
        <div ref={wordmarkRef} className="flex items-center gap-1 mb-8 overflow-hidden">
          {brandName.split("").map((char, index) => (
            <span
              key={index}
              className="letter inline-block font-heading text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase"
            >
              {char}
            </span>
          ))}
        </div>

        {/* Rep Performing SVG Dumbbell (120px wide) */}
        <div className="w-[120px] h-[44px] mb-6 flex items-center justify-center">
          <svg
            width="120"
            height="44"
            viewBox="0 0 120 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g ref={dumbbellGroupRef}>
              {/* Left Weight Plates */}
              <rect x="4" y="10" width="8" height="24" rx="2" fill="#FFFFFF" />
              <rect x="16" y="6" width="10" height="32" rx="2" fill="#FFFFFF" />
              <rect x="28" y="17" width="5" height="10" rx="1" fill="#B7C4C8" />

              {/* Center Bar Background */}
              <rect x="35" y="19" width="50" height="6" rx="3" fill="#1E3840" />

              {/* Center Bar Animated Red Fill */}
              <rect
                ref={barFillRef}
                x="35"
                y="19"
                width="0"
                height="6"
                rx="3"
                fill="#F21B35"
              />

              {/* Right Weight Plates */}
              <rect x="87" y="17" width="5" height="10" rx="1" fill="#B7C4C8" />
              <rect x="94" y="6" width="10" height="32" rx="2" fill="#FFFFFF" />
              <rect x="108" y="10" width="8" height="24" rx="2" fill="#FFFFFF" />
            </g>
          </svg>
        </div>

        {/* Tabular-number counter 00 to 100 */}
        <div className="font-heading tabular-nums text-sm font-semibold tracking-widest text-white mb-2">
          <span ref={counterRef}>00</span>
          <span className="text-[#B7C4C8]/60 text-xs ml-1">%</span>
        </div>

        {/* Thin Red Progress Line */}
        <div className="w-40 h-[2px] bg-[#1E3840] relative overflow-hidden mb-6">
          <div
            ref={progressLineRef}
            className="h-full bg-[#F21B35] transition-all duration-75"
            style={{ width: "0%" }}
          />
        </div>

        {/* Quotes with 0.3s Crossfade */}
        <div
          ref={quotesRef}
          className={`min-h-[36px] flex items-center justify-center font-body text-xs text-[#B7C4C8] italic transition-opacity duration-300 ${
            quoteFade ? "opacity-100" : "opacity-0"
          }`}
        >
          &ldquo;{siteConfig.preloaderQuotes[quoteIndex]}&rdquo;
        </div>
      </div>
    </div>
  );
}
