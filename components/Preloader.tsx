"use client";

import React, { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [clipRadius, setClipRadius] = useState(0);

  useEffect(() => {
    setMounted(true);
    // Check if user has already seen the preloader in this session
    const hasSeen = sessionStorage.getItem("fitnessgym_preloader_seen");
    if (hasSeen) {
      if (onComplete) onComplete();
      return;
    }

    setShow(true);

    // Duration between 1.6s and 2.2s
    const totalDuration = 1800;
    const interval = 25;
    const increment = 100 / (totalDuration / interval);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return next;
      });
    }, interval);

    // Quote cycle every 1.2s
    const quoteTimer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % siteConfig.preloaderQuotes.length);
    }, 1200);

    return () => {
      clearInterval(progressTimer);
      clearInterval(quoteTimer);
    };
  }, [onComplete]);

  useEffect(() => {
    if (progress >= 100 && show && !isExiting) {
      setIsExiting(true);
      sessionStorage.setItem("fitnessgym_preloader_seen", "true");

      // Circular clip-path expansion animation: 0% -> 150% over 900ms
      const startTime = performance.now();
      const exitDuration = 900;

      const animateExit = (time: number) => {
        const elapsed = time - startTime;
        const progressFrac = Math.min(elapsed / exitDuration, 1);
        // ease power3.inOut: p < 0.5 ? 4*p^3 : 1 - (-2*p + 2)^3 / 2
        const eased =
          progressFrac < 0.5
            ? 4 * Math.pow(progressFrac, 3)
            : 1 - Math.pow(-2 * progressFrac + 2, 3) / 2;

        setClipRadius(eased * 150);

        // When half open, trigger onComplete to start hero reveal
        if (progressFrac >= 0.5 && onComplete) {
          onComplete();
        }

        if (progressFrac < 1) {
          requestAnimationFrame(animateExit);
        } else {
          setShow(false);
        }
      };

      requestAnimationFrame(animateExit);
    }
  }, [progress, show, isExiting, onComplete]);

  if (!mounted || !show) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A1A1F] text-white select-none pointer-events-none"
      style={{
        clipPath: isExiting
          ? `circle(${clipRadius}% at 50% 50%)`
          : "circle(150% at 50% 50%)",
        transition: isExiting ? "none" : undefined,
      }}
      aria-hidden="true"
    >
      <div
        className={`flex flex-col items-center max-w-md px-6 text-center transition-opacity duration-300 ${
          isExiting ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Animated Dumbbell Logo Mark */}
        <div className="flex items-center gap-2 mb-6">
          <svg
            width="48"
            height="24"
            viewBox="0 0 48 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
          >
            {/* Left Weight Plates */}
            <rect x="2" y="4" width="4" height="16" rx="1" fill="#FFFFFF" />
            <rect x="8" y="1" width="4" height="22" rx="1" fill="#FFFFFF" />
            {/* Center Bar Background */}
            <rect x="12" y="10" width="24" height="4" rx="2" fill="#1E3840" />
            {/* Center Bar Red Fill Indicator */}
            <rect
              x="12"
              y="10"
              width={`${(progress / 100) * 24}`}
              height="4"
              rx="2"
              fill="#F21B35"
              className="transition-all duration-75 ease-linear"
            />
            {/* Right Weight Plates */}
            <rect x="36" y="1" width="4" height="22" rx="1" fill="#FFFFFF" />
            <rect x="42" y="4" width="4" height="16" rx="1" fill="#FFFFFF" />
          </svg>
          <span className="font-heading text-2xl font-bold tracking-tight text-white uppercase">
            {siteConfig.brand.name}
          </span>
        </div>

        {/* Thin Red Progress Bar */}
        <div className="w-48 h-[2px] bg-[#1E3840] relative overflow-hidden mb-3">
          <div
            className="h-full bg-[#F21B35] transition-all duration-75 ease-linear"
            style={{ width: `${Math.round(progress)}%` }}
          />
        </div>

        {/* Percentage Counter */}
        <div className="font-heading text-xs tracking-widest text-[#B7C4C8] mb-6">
          {Math.round(progress)}%
        </div>

        {/* Rotating Motivational Quote */}
        <p className="font-body text-xs text-[#B7C4C8]/80 italic max-w-xs transition-opacity duration-500 min-h-[32px] flex items-center justify-center">
          &ldquo;{siteConfig.preloaderQuotes[quoteIndex]}&rdquo;
        </p>
      </div>
    </div>
  );
}

