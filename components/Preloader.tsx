"use client";

import React, { useEffect, useState, useRef } from "react";
import { siteConfig } from "@/config/site";
import { gsap } from "gsap";
import { Dumbbell3D } from "@/components/Dumbbell3D";

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  // Pool of quotes
  const quotes = siteConfig.preloaderQuotes;
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [quoteFade, setQuoteFade] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const dumbbellWrapperRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const quotesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    if (!siteConfig.loader.enabled) {
      if (onComplete) onComplete();
      return;
    }

    // Pick a random starting quote on each reload so it's always different
    const randomStart = Math.floor(Math.random() * quotes.length);
    setCurrentQuoteIndex(randomStart);

    setShow(true);
    document.documentElement.classList.add("is-loading");

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setTimeout(() => {
        document.documentElement.classList.remove("is-loading");
        setShow(false);
        if (onComplete) onComplete();
      }, 400);
      return;
    }

    // Master GSAP timeline
    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.classList.remove("is-loading");
        setShow(false);
        if (onComplete) onComplete();
      },
    });

    // 0.00-0.35s: Wordmark appears letter by letter
    if (wordmarkRef.current) {
      const letters = wordmarkRef.current.querySelectorAll(".letter");
      tl.fromTo(
        letters,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, stagger: 0.025, ease: "power2.out" },
        0
      );
    }

    // Dumbbell wrapper smooth scale-in
    if (dumbbellWrapperRef.current) {
      tl.fromTo(
        dumbbellWrapperRef.current,
        { scale: 0.75, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.4)" },
        0.1
      );
    }

    // Real progress counter 00 to 100
    const progressObj = { value: 0 };
    tl.to(
      progressObj,
      {
        value: 100,
        duration: 1.8,
        ease: "power1.inOut",
        onUpdate: () => {
          const val = Math.round(progressObj.value);
          const formatted = val < 10 ? `0${val}` : `${val}`;
          if (counterRef.current) counterRef.current.innerText = formatted;
          if (progressLineRef.current) progressLineRef.current.style.width = `${val}%`;
        },
      },
      0.15
    );

    // Dynamic quote transitions: switch quotes at ~0.75s and ~1.45s so multiple appear!
    const quoteTimer1 = setTimeout(() => {
      setQuoteFade(false);
      setTimeout(() => {
        setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
        setQuoteFade(true);
      }, 180);
    }, 750);

    const quoteTimer2 = setTimeout(() => {
      setQuoteFade(false);
      setTimeout(() => {
        setCurrentQuoteIndex((prev) => (prev + 2) % quotes.length);
        setQuoteFade(true);
      }, 180);
    }, 1450);

    // 1.95-2.45s: Exit phase
    if (wordmarkRef.current && dumbbellWrapperRef.current) {
      tl.to(
        [
          wordmarkRef.current,
          dumbbellWrapperRef.current,
          counterRef.current?.parentElement,
          progressLineRef.current?.parentElement,
          quotesRef.current,
        ],
        { scale: 0.88, opacity: 0, duration: 0.3, ease: "power2.in" },
        1.95
      );
    }

    // Circular hole mask grows from center (0.55s, power3.inOut) revealing hero underneath
    const holeObj = { radius: 0 };
    tl.to(
      holeObj,
      {
        radius: 130,
        duration: 0.55,
        ease: "power3.inOut",
        onUpdate: () => {
          if (containerRef.current) {
            const r = holeObj.radius;
            containerRef.current.style.maskImage = `radial-gradient(circle at 50% 50%, transparent ${r}%, black ${r + 6}%)`;
            containerRef.current.style.webkitMaskImage = `radial-gradient(circle at 50% 50%, transparent ${r}%, black ${r + 6}%)`;
          }
        },
      },
      2.0
    );

    // Fade out preloader container completely
    tl.to(
      containerRef.current,
      { opacity: 0, duration: 0.25, ease: "power2.inOut" },
      2.25
    );

    // Trigger hero intro when hole opens
    tl.add(() => {
      if (onComplete) onComplete();
    }, 2.2);

    return () => {
      clearTimeout(quoteTimer1);
      clearTimeout(quoteTimer2);
      tl.kill();
      document.documentElement.classList.remove("is-loading");
    };
  }, [onComplete, quotes]);

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

      <div className="flex flex-col items-center max-w-md px-6 text-center">
        {/* Letter by letter wordmark with clean spacing */}
        <div ref={wordmarkRef} className="flex items-center gap-1 mb-6 sm:mb-8 overflow-hidden">
          {brandName.split("").map((char, index) => (
            <span
              key={index}
              className="letter inline-block font-heading text-3xl sm:text-4xl font-extrabold tracking-wider text-white uppercase"
            >
              {char}
            </span>
          ))}
        </div>

        {/* REAL 3D DUMBBELL (Three.js WebGL with PBR Materials & GSAP 3D Rotation) */}
        <div
          ref={dumbbellWrapperRef}
          className="w-full flex items-center justify-center mb-4 sm:mb-6"
        >
          <Dumbbell3D />
        </div>

        {/* Tabular-number counter 00 to 100 with clear separation */}
        <div className="font-heading tabular-nums text-base font-bold tracking-widest text-white mb-2 flex items-center justify-center">
          <span ref={counterRef}>00</span>
          <span className="text-[#F21B35] font-semibold text-xs ml-1">%</span>
        </div>

        {/* Crimson Progress Track Line */}
        <div className="w-48 sm:w-56 h-[3px] bg-[#1E3840] rounded-full relative overflow-hidden mb-5">
          <div
            ref={progressLineRef}
            className="h-full bg-gradient-to-r from-[#F21B35] to-[#FF4D63] rounded-full transition-all duration-75 shadow-[0_0_12px_rgba(242,27,53,0.8)]"
            style={{ width: "0%" }}
          />
        </div>

        {/* Dynamic Fitness Quotes with Smooth Crossfade */}
        <div
          ref={quotesRef}
          className={`min-h-[44px] flex items-center justify-center font-body text-xs sm:text-sm text-[#B7C4C8] italic px-4 transition-all duration-300 transform ${
            quoteFade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
          }`}
        >
          &ldquo;{quotes[currentQuoteIndex]}&rdquo;
        </div>
      </div>
    </div>
  );
}
