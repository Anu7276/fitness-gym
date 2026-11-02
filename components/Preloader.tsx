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

        {/* 3D HORIZONTAL ROTATING DUMBBELL (Left-to-right 3D rotation, strict proportional height & width) */}
        <div
          ref={dumbbellWrapperRef}
          className="w-[230px] sm:w-[260px] h-[84px] sm:h-[90px] mb-6 sm:mb-8 flex items-center justify-center relative [perspective:1000px]"
        >
          <div className="w-full h-full flex items-center justify-center animate-dumbbell-3d">
            <svg
              width="260"
              height="90"
              viewBox="0 0 260 90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full filter drop-shadow-[0_8px_24px_rgba(242,27,53,0.45)]"
            >
              <defs>
                {/* Chrome steel handle gradient */}
                <linearGradient id="steelBarGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9AAAB4" />
                  <stop offset="25%" stopColor="#FFFFFF" />
                  <stop offset="55%" stopColor="#4A5C67" />
                  <stop offset="100%" stopColor="#182329" />
                </linearGradient>

                {/* Cast iron matte plates gradient */}
                <linearGradient id="castIronPlateGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#121F24" />
                  <stop offset="50%" stopColor="#2A3D46" />
                  <stop offset="100%" stopColor="#0F1A1E" />
                </linearGradient>

                {/* Competition anodized red collar gradient */}
                <linearGradient id="anodizedRedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF4A60" />
                  <stop offset="40%" stopColor="#F21B35" />
                  <stop offset="100%" stopColor="#8A0B1A" />
                </linearGradient>

                {/* Real knurling cross-hatch texture pattern */}
                <pattern id="knurlGrip" width="4" height="4" patternUnits="userSpaceOnUse">
                  <path d="M0 4L4 0M0 0L4 4" stroke="rgba(255,255,255,0.22)" strokeWidth="0.8" />
                </pattern>
              </defs>

              {/* Central Knurled Chrome Steel Bar */}
              <rect x="86" y="38" width="88" height="14" rx="4" fill="url(#steelBarGrad)" />
              <rect x="92" y="38" width="76" height="14" rx="2" fill="url(#knurlGrip)" />

              {/* Red Anodized Competition Collars with Metallic Highlight Edge */}
              <rect
                x="82"
                y="32"
                width="6"
                height="26"
                rx="2"
                fill="url(#anodizedRedGrad)"
                stroke="#FFA0AD"
                strokeWidth="0.5"
              />
              <rect
                x="172"
                y="32"
                width="6"
                height="26"
                rx="2"
                fill="url(#anodizedRedGrad)"
                stroke="#FFA0AD"
                strokeWidth="0.5"
              />

              {/* ================= LEFT WEIGHT PLATES ================= */}
              {/* Inner spacer plate */}
              <rect
                x="73"
                y="22"
                width="9"
                height="46"
                rx="3"
                fill="url(#castIronPlateGrad)"
                stroke="#3D535E"
                strokeWidth="1.2"
              />
              {/* Mid plate (10 KG) */}
              <rect
                x="52"
                y="10"
                width="19"
                height="70"
                rx="4"
                fill="url(#castIronPlateGrad)"
                stroke="#4E6B7A"
                strokeWidth="1.4"
              />
              <line
                x1="61"
                y1="14"
                x2="61"
                y2="76"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />

              {/* Outer heavy plate (20 KG) with chamfer and embossed weight marks */}
              <rect
                x="28"
                y="2"
                width="22"
                height="86"
                rx="5"
                fill="url(#castIronPlateGrad)"
                stroke="#6B8F9F"
                strokeWidth="1.6"
              />
              <rect
                x="32"
                y="8"
                width="14"
                height="74"
                rx="3"
                fill="none"
                stroke="rgba(0,0,0,0.55)"
                strokeWidth="1.5"
              />
              <text
                x="39"
                y="44"
                fontFamily="sans-serif"
                fontSize="9"
                fontWeight="900"
                fill="#A2BDCB"
                textAnchor="middle"
              >
                20
              </text>
              <text
                x="39"
                y="54"
                fontFamily="sans-serif"
                fontSize="7"
                fontWeight="800"
                fill="#74919F"
                textAnchor="middle"
              >
                KG
              </text>

              {/* Outer steel lock nut / retaining bolt */}
              <rect
                x="20"
                y="32"
                width="8"
                height="26"
                rx="2"
                fill="url(#steelBarGrad)"
                stroke="#3E5460"
                strokeWidth="1"
              />
              <circle cx="24" cy="45" r="2.5" fill="#182329" />

              {/* ================= RIGHT WEIGHT PLATES ================= */}
              {/* Inner spacer plate */}
              <rect
                x="178"
                y="22"
                width="9"
                height="46"
                rx="3"
                fill="url(#castIronPlateGrad)"
                stroke="#3D535E"
                strokeWidth="1.2"
              />
              {/* Mid plate (10 KG) */}
              <rect
                x="189"
                y="10"
                width="19"
                height="70"
                rx="4"
                fill="url(#castIronPlateGrad)"
                stroke="#4E6B7A"
                strokeWidth="1.4"
              />
              <line
                x1="198"
                y1="14"
                x2="198"
                y2="76"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />

              {/* Outer heavy plate (20 KG) with chamfer and embossed weight marks */}
              <rect
                x="210"
                y="2"
                width="22"
                height="86"
                rx="5"
                fill="url(#castIronPlateGrad)"
                stroke="#6B8F9F"
                strokeWidth="1.6"
              />
              <rect
                x="214"
                y="8"
                width="14"
                height="74"
                rx="3"
                fill="none"
                stroke="rgba(0,0,0,0.55)"
                strokeWidth="1.5"
              />
              <text
                x="221"
                y="44"
                fontFamily="sans-serif"
                fontSize="9"
                fontWeight="900"
                fill="#A2BDCB"
                textAnchor="middle"
              >
                20
              </text>
              <text
                x="221"
                y="54"
                fontFamily="sans-serif"
                fontSize="7"
                fontWeight="800"
                fill="#74919F"
                textAnchor="middle"
              >
                KG
              </text>

              {/* Outer steel lock nut / retaining bolt */}
              <rect
                x="232"
                y="32"
                width="8"
                height="26"
                rx="2"
                fill="url(#steelBarGrad)"
                stroke="#3E5460"
                strokeWidth="1"
              />
              <circle cx="236" cy="45" r="2.5" fill="#182329" />
            </svg>
          </div>
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
