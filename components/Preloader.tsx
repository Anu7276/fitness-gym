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

  // Guarantee the preloader runs strictly ONCE and never double-fires
  const hasRunRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    setMounted(true);

    if (!siteConfig.loader.enabled) {
      if (onCompleteRef.current) onCompleteRef.current();
      return;
    }

    // Skip duplicate loading if already loaded in this tab session
    if (typeof window !== "undefined" && window.sessionStorage.getItem("fitnessgym_preloaded")) {
      document.documentElement.classList.remove("is-loading");
      setShow(false);
      if (onCompleteRef.current) onCompleteRef.current();
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
        if (onCompleteRef.current) onCompleteRef.current();
      }, 400);
      return;
    }

    // Master GSAP timeline
    const tl = gsap.timeline({
      onComplete: () => {
        if (typeof window !== "undefined") {
          try {
            window.sessionStorage.setItem("fitnessgym_preloaded", "1");
          } catch {}
        }
        document.documentElement.classList.remove("is-loading");
        setShow(false);
        if (onCompleteRef.current) onCompleteRef.current();
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

    // 1.95-2.45s: Smooth exit phase - fade out loader content first, then fade out preloader backdrop cleanly
    if (wordmarkRef.current && dumbbellWrapperRef.current) {
      tl.to(
        [
          wordmarkRef.current,
          dumbbellWrapperRef.current,
          counterRef.current?.parentElement,
          progressLineRef.current?.parentElement,
          quotesRef.current,
        ],
        { scale: 0.92, opacity: 0, duration: 0.28, ease: "power2.inOut" },
        1.95
      );
    }

    // Smoothly fade out entire preloader container (no circular hole cutouts)
    tl.to(
      containerRef.current,
      { opacity: 0, duration: 0.35, ease: "power2.inOut" },
      2.12
    );

    // Trigger hero entrance after preloader starts fading out cleanly
    tl.add(() => {
      if (onCompleteRef.current) onCompleteRef.current();
    }, 2.25);

    return () => {
      clearTimeout(quoteTimer1);
      clearTimeout(quoteTimer2);
      tl.kill();
      document.documentElement.classList.remove("is-loading");
    };
  }, []);

  if (!mounted || !show) return null;

  const brandName = siteConfig.brand.name; // "FITNESSGYM"

  return (
    <div
      ref={containerRef}
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0A1A1F] text-white select-none pointer-events-none transition-opacity duration-300"
    >
      <span className="sr-only">Loading {brandName}...</span>

      <div className="flex flex-col items-center max-w-2xl w-full px-4 text-center">
        {/* Letter by letter wordmark with clean spacing */}
        <div ref={wordmarkRef} className="flex items-center gap-1 sm:gap-1.5 mb-2 sm:mb-3 overflow-hidden">
          {brandName.split("").map((char, index) => (
            <span
              key={index}
              className="letter inline-block font-heading text-3xl sm:text-4xl md:text-5xl font-black tracking-widest text-white uppercase drop-shadow-[0_2px_14px_rgba(255,255,255,0.25)]"
            >
              {char}
            </span>
          ))}
        </div>

        {/* REAL 3D DUMBBELL CENTERPIECE */}
        <div
          ref={dumbbellWrapperRef}
          className="relative w-full flex items-center justify-center my-1 sm:my-2"
        >
          <Dumbbell3D />
        </div>

        {/* Tabular-number counter 00 to 100 with clear separation */}
        <div className="font-heading tabular-nums text-base sm:text-lg font-bold tracking-widest text-white mb-2 flex items-center justify-center">
          <span ref={counterRef}>00</span>
          <span className="text-[#F21B35] font-semibold text-xs ml-1">%</span>
        </div>

        {/* Crimson Progress Track Line */}
        <div className="w-56 sm:w-64 h-[3.5px] bg-[#1E3840] rounded-full relative overflow-hidden mb-5">
          <div
            ref={progressLineRef}
            className="h-full bg-gradient-to-r from-[#F21B35] via-[#FF334B] to-[#FF6B7D] rounded-full transition-all duration-75 shadow-[0_0_15px_rgba(242,27,53,0.9)]"
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
