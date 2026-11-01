"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig, TimeSlotItem } from "@/config/site";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, Sun, Moon, ArrowRight, RotateCcw } from "lucide-react";

// The 6 exact preview slots from config
const PREVIEW_SLOTS: TimeSlotItem[] = siteConfig.daySchedule as TimeSlotItem[];

// Target modulo hour angles for the 6 slots (Minute hand is always 0 / 360 at :00)
// 04:00 AM: (4 % 12) * 30 = 120°
// 07:00 AM: (7 % 12) * 30 = 210°
// 10:00 AM: (10 % 12) * 30 = 300°
// 02:00 PM: (2 % 12) * 30 = 60°
// 06:00 PM: (6 % 12) * 30 = 180°
// 11:00 PM: (11 % 12) * 30 = 330°
const SLOT_BASE_HOUR_ANGLES = [120, 210, 300, 60, 180, 330];

// Computes current time in siteConfig timezone (default Asia/Kolkata)
function getZonedTime(timeZone = siteConfig.timezone || "Asia/Kolkata"): {
  hours: number;
  minutes: number;
  seconds: number;
  millis: number;
  formattedTime: string;
  period: "AM" | "PM";
  isDaytime: boolean;
} {
  const now = new Date();
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    });
    const parts = formatter.formatToParts(now);
    let h = 0,
      m = 0,
      s = 0;
    for (const p of parts) {
      if (p.type === "hour") h = parseInt(p.value, 10);
      if (p.type === "minute") m = parseInt(p.value, 10);
      if (p.type === "second") s = parseInt(p.value, 10);
    }
    const ms = now.getMilliseconds();
    const period: "AM" | "PM" = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    const formattedTime = `${h12 < 10 ? "0" : ""}${h12}:${m < 10 ? "0" : ""}${m}`;
    const isDaytime = h >= 6 && h < 18;
    return { hours: h, minutes: m, seconds: s, millis: ms, formattedTime, period, isDaytime };
  } catch {
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();
    const ms = now.getMilliseconds();
    const period: "AM" | "PM" = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    const formattedTime = `${h12 < 10 ? "0" : ""}${h12}:${m < 10 ? "0" : ""}${m}`;
    const isDaytime = h >= 6 && h < 18;
    return { hours: h, minutes: m, seconds: s, millis: ms, formattedTime, period, isDaytime };
  }
}

// Finds the slot closest to the current hour
function getClosestSlotIndex(currentHour24: number): number {
  let closestIdx = 0;
  let minDiff = 24;
  PREVIEW_SLOTS.forEach((slot, idx) => {
    let diff = Math.abs(slot.hour - currentHour24);
    if (diff > 12) diff = 24 - diff;
    if (diff < minDiff) {
      minDiff = diff;
      closestIdx = idx;
    }
  });
  return closestIdx;
}

export function TwentyFourHours() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);

  // SVG Hand references
  const hourHandRef = useRef<SVGGElement>(null);
  const minuteHandRef = useRef<SVGGElement>(null);
  const secondHandRef = useRef<SVGGElement>(null);

  // State
  const [mode, setMode] = useState<"now" | "preview">("preview");
  const [activeIndex, setActiveIndex] = useState(0); // 0 to 5
  const activeIndexRef = useRef(0);

  const [liveDisplay, setLiveDisplay] = useState(() => {
    const z = getZonedTime();
    return { formattedTime: z.formattedTime, period: z.period, isDaytime: z.isDaytime };
  });

  // Track cumulative angles so hands always turn clockwise without snapping
  const cumulativeAngles = useRef({
    hour: SLOT_BASE_HOUR_ANGLES[0], // starts at 120
    minute: 0,
  });

  const isProgrammaticScroll = useRef(false);
  const rafId = useRef<number | null>(null);
  const isVisible = useRef(true);
  const scrollTriggerInstance = useRef<ScrollTrigger | null>(null);

  // Current slot data
  const currentSlot: TimeSlotItem = PREVIEW_SLOTS[activeIndex] ?? PREVIEW_SLOTS[0];
  const activeBg = mode === "now" ? PREVIEW_SLOTS[getClosestSlotIndex(getZonedTime().hours)].ambientColor : currentSlot.ambientColor;

  // Animate hands smoothly to a preview slot (clockwise cumulative movement)
  const animateHandsToSlot = useCallback((targetSlotIndex: number) => {
    const targetBaseHour = SLOT_BASE_HOUR_ANGLES[targetSlotIndex];
    const curHour = cumulativeAngles.current.hour;
    const curModHour = ((curHour % 360) + 360) % 360;

    // Clockwise difference for hour hand
    let deltaHour = (targetBaseHour - curModHour + 360) % 360;
    if (deltaHour === 0 && targetSlotIndex !== activeIndexRef.current) {
      deltaHour = 360;
    }

    const nextCumulativeHour = curHour + deltaHour;
    cumulativeAngles.current.hour = nextCumulativeHour;

    // The minute hand makes full 360-degree rotations corresponding to hours passed
    const hoursPassed = Math.max(1, Math.round(deltaHour / 30));
    const nextCumulativeMinute = cumulativeAngles.current.minute + hoursPassed * 360;
    cumulativeAngles.current.minute = nextCumulativeMinute;

    if (hourHandRef.current && minuteHandRef.current) {
      gsap.to(hourHandRef.current, {
        rotation: nextCumulativeHour,
        duration: 0.9,
        ease: "power3.inOut",
        svgOrigin: "150 150",
      });
      gsap.to(minuteHandRef.current, {
        rotation: nextCumulativeMinute,
        duration: 0.9,
        ease: "power3.inOut",
        svgOrigin: "150 150",
      });
    }

    // Hide second hand in preview mode
    if (secondHandRef.current) {
      gsap.to(secondHandRef.current, { opacity: 0, duration: 0.25 });
    }
  }, []);

  // Unified slot selector
  const setSlot = useCallback(
    (index: number, source: "scroll" | "click" | "key" | "now") => {
      if (source === "now") {
        setMode("now");
        return;
      }

      setMode("preview");
      const clampedIndex = Math.max(0, Math.min(PREVIEW_SLOTS.length - 1, index));
      activeIndexRef.current = clampedIndex;
      setActiveIndex(clampedIndex);
      animateHandsToSlot(clampedIndex);

      // If user clicked or used keyboard, sync the pinned ScrollTrigger scroll position
      if ((source === "click" || source === "key") && scrollTriggerInstance.current) {
        const st = scrollTriggerInstance.current;
        if (st.end > st.start) {
          isProgrammaticScroll.current = true;
          const targetProgress = (clampedIndex + 0.1) / PREVIEW_SLOTS.length;
          const targetScroll = st.start + targetProgress * (st.end - st.start);

          window.scrollTo({
            top: targetScroll,
            behavior: "auto",
          });

          setTimeout(() => {
            isProgrammaticScroll.current = false;
          }, 400);
        }
      }
    },
    [animateHandsToSlot]
  );

  // Live clock tick & sweep loop for "Now" mode
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const updateLiveClock = () => {
      if (mode !== "now" || !isVisible.current || document.visibilityState !== "visible") {
        return;
      }

      const { hours, minutes, seconds, millis, formattedTime, period, isDaytime } = getZonedTime();
      setLiveDisplay({ formattedTime, period, isDaytime });

      // Precise angle formulas
      const secondFraction = prefersReducedMotion ? seconds : seconds + millis / 1000;
      const secondAngle = secondFraction * 6;
      const minuteAngle = (minutes + seconds / 60) * 6;
      const hourAngle = ((hours % 12) + minutes / 60 + seconds / 3600) * 30;

      if (hourHandRef.current && minuteHandRef.current && secondHandRef.current) {
        gsap.set(hourHandRef.current, { rotation: hourAngle, svgOrigin: "150 150" });
        gsap.set(minuteHandRef.current, { rotation: minuteAngle, svgOrigin: "150 150" });
        gsap.set(secondHandRef.current, {
          rotation: secondAngle,
          svgOrigin: "150 150",
          opacity: 1,
        });
      }

      if (!prefersReducedMotion) {
        rafId.current = requestAnimationFrame(updateLiveClock);
      }
    };

    if (mode === "now") {
      updateLiveClock();
      if (prefersReducedMotion) {
        const interval = setInterval(updateLiveClock, 1000);
        return () => clearInterval(interval);
      } else {
        rafId.current = requestAnimationFrame(updateLiveClock);
        return () => {
          if (rafId.current) cancelAnimationFrame(rafId.current);
        };
      }
    }
  }, [mode]);

  // Track visibility with IntersectionObserver to pause live RAF
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isVisible.current) return;
      if (e.key === "ArrowRight") {
        setSlot(activeIndex + 1, "key");
      } else if (e.key === "ArrowLeft") {
        setSlot(activeIndex - 1, "key");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, setSlot]);

  // ScrollTrigger Setup
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial hand positioning
    if (hourHandRef.current && minuteHandRef.current && secondHandRef.current) {
      gsap.set(hourHandRef.current, {
        rotation: SLOT_BASE_HOUR_ANGLES[0],
        svgOrigin: "150 150",
      });
      gsap.set(minuteHandRef.current, {
        rotation: 0,
        svgOrigin: "150 150",
      });
      gsap.set(secondHandRef.current, {
        opacity: 0,
        svgOrigin: "150 150",
      });
    }

    if (containerRef.current && pinContainerRef.current) {
      const totalSlots = PREVIEW_SLOTS.length;

      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=220%",
        pin: pinContainerRef.current,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        scrub: 0.5,
        onUpdate: (self) => {
          if (isProgrammaticScroll.current) return;

          const progress = self.progress;
          const slotIndex = Math.min(
            Math.floor(progress * totalSlots),
            totalSlots - 1
          );

          if (activeIndexRef.current !== slotIndex) {
            activeIndexRef.current = slotIndex;
            setActiveIndex(slotIndex);
            setMode("preview");
            animateHandsToSlot(slotIndex);
          }
        },
      });

      scrollTriggerInstance.current = trigger;

      return () => {
        trigger.kill();
      };
    }
  }, [animateHandsToSlot]);

  // Active program card details
  const activeProgram = mode === "now" ? PREVIEW_SLOTS[getClosestSlotIndex(getZonedTime().hours)] : currentSlot;
  const isNight = mode === "now" ? !liveDisplay.isDaytime : currentSlot.period === "PM" || currentSlot.hour < 6;

  return (
    <section
      ref={containerRef}
      id="24-hours"
      className="relative w-full text-white transition-colors duration-700 ease-out overflow-x-clip"
      style={{ backgroundColor: activeBg }}
      aria-label="24-Hour Rhythm at Fitness Gym"
    >
      <div
        ref={pinContainerRef}
        className="min-h-[100svh] w-full flex flex-col justify-between py-8 md:py-12 px-4 sm:px-6 md:px-10 max-w-[1240px] mx-auto overflow-hidden"
      >
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#1E3840]/60 pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F21B35] animate-pulse" />
            <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
              Open 24 hours every day
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F2329]/90 border border-[#1E3840] text-xs font-body text-[#B7C4C8]">
            <Clock className="w-3.5 h-3.5 text-[#F21B35]" />
            <span>Biometric keyless member entry • Waghodia Road</span>
          </div>
        </div>

        {/* Center Grid: Dial (Left) + Fixed Info Card (Right) */}
        <div className="grid grid-cols-1 min-[1100px]:grid-cols-12 gap-8 min-[1100px]:gap-12 items-center my-auto w-full py-4">
          {/* LEFT: Analog Dial & Digital Readout */}
          <div className="min-[1100px]:col-span-6 flex flex-col items-center justify-center">
            {/* Pure Analog 12-Hour Watch Face: 280-320px below 1100px, 420px on desktop */}
            <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] min-[1100px]:w-[420px] min-[1100px]:h-[420px] flex items-center justify-center">
              {/* Outer Case Bezel & Ambient Shadow */}
              <div className="absolute inset-0 rounded-full border border-[#1E3840] bg-[#0A1A1F]/90 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.5)]" />

              {/* Watch Face SVG */}
              <svg
                viewBox="0 0 300 300"
                className="w-full h-full relative z-10 select-none pointer-events-none"
              >
                {/* Outer Bezel Rim */}
                <circle
                  cx="150"
                  cy="150"
                  r="142"
                  stroke="#1E3840"
                  strokeWidth="2"
                  fill="none"
                />
                <circle
                  cx="150"
                  cy="150"
                  r="136"
                  stroke="#1E3840"
                  strokeWidth="0.75"
                  strokeDasharray="2 3"
                  fill="none"
                  opacity="0.4"
                />

                {/* 60 Minute & 12 Hour Ticks (Stationary) */}
                {[...Array(60)].map((_, i) => {
                  const isHour = i % 5 === 0;
                  const isQuarter = i % 15 === 0;
                  return (
                    <line
                      key={i}
                      x1="150"
                      y1={isQuarter ? "12" : isHour ? "14" : "18"}
                      x2="150"
                      y2={isQuarter ? "28" : isHour ? "25" : "22"}
                      stroke={isQuarter ? "#FFFFFF" : isHour ? "#B7C4C8" : "#1E3840"}
                      strokeWidth={isQuarter ? "2.5" : isHour ? "2" : "1"}
                      transform={`rotate(${i * 6} 150 150)`}
                    />
                  );
                })}

                {/* Numerals 12, 3, 6, 9 (Stationary) */}
                <text
                  x="150"
                  y="46"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#FFFFFF"
                  fontSize="15"
                  fontWeight="700"
                  fontFamily="system-ui, sans-serif"
                >
                  12
                </text>
                <text
                  x="254"
                  y="150"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#B7C4C8"
                  fontSize="15"
                  fontWeight="600"
                  fontFamily="system-ui, sans-serif"
                >
                  3
                </text>
                <text
                  x="150"
                  y="254"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#B7C4C8"
                  fontSize="15"
                  fontWeight="600"
                  fontFamily="system-ui, sans-serif"
                >
                  6
                </text>
                <text
                  x="46"
                  y="150"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#B7C4C8"
                  fontSize="15"
                  fontWeight="600"
                  fontFamily="system-ui, sans-serif"
                >
                  9
                </text>

                {/* Intermediate numerals (1, 2, 4, 5, 7, 8, 10, 11) */}
                {[1, 2, 4, 5, 7, 8, 10, 11].map((h) => {
                  const angle = (h * 30 * Math.PI) / 180;
                  const r = 104;
                  const x = 150 + r * Math.sin(angle);
                  const y = 150 - r * Math.cos(angle);
                  return (
                    <text
                      key={h}
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#B7C4C8"
                      fontSize="11"
                      fontWeight="500"
                      opacity="0.6"
                      fontFamily="system-ui, sans-serif"
                    >
                      {h}
                    </text>
                  );
                })}

                {/* Sub-dial track ring (Stationary) */}
                <circle
                  cx="150"
                  cy="150"
                  r="62"
                  stroke="#1E3840"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                  fill="none"
                  opacity="0.5"
                />

                {/* HANDS (Placed on top of all dial face elements) */}

                {/* 1. Hour Hand (Short, thick, white) */}
                <g
                  ref={hourHandRef}
                  data-hand="hour"
                  style={{ transformBox: "view-box", transformOrigin: "150px 150px" }}
                  className="will-change-transform"
                >
                  <line
                    x1="150"
                    y1="162"
                    x2="150"
                    y2="88"
                    stroke="#FFFFFF"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  {/* Subtle inner accent on hour hand */}
                  <line
                    x1="150"
                    y1="140"
                    x2="150"
                    y2="95"
                    stroke="#0A1A1F"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </g>

                {/* 2. Minute Hand (Longer, thin, white) */}
                <g
                  ref={minuteHandRef}
                  data-hand="minute"
                  style={{ transformBox: "view-box", transformOrigin: "150px 150px" }}
                  className="will-change-transform"
                >
                  <line
                    x1="150"
                    y1="168"
                    x2="150"
                    y2="52"
                    stroke="#FFFFFF"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </g>

                {/* 3. Second Hand (Red, thin with counterweight - live mode only) */}
                <g
                  ref={secondHandRef}
                  data-hand="second"
                  style={{ transformBox: "view-box", transformOrigin: "150px 150px" }}
                  className="will-change-transform"
                >
                  <line
                    x1="150"
                    y1="180"
                    x2="150"
                    y2="38"
                    stroke="#F21B35"
                    strokeWidth="1.5"
                  />
                  {/* Counterweight disc */}
                  <circle cx="150" cy="172" r="3.5" fill="#F21B35" />
                </g>

                {/* Center Cap (Stationary, sitting directly above hands) */}
                <circle cx="150" cy="150" r="7" fill="#F21B35" />
                <circle cx="150" cy="150" r="3" fill="#FFFFFF" />
              </svg>
            </div>

            {/* DIGITAL TIME READOUT (Placed directly BELOW the dial) */}
            <div
              className="mt-4 flex flex-col items-center text-center"
              aria-live="polite"
            >
              <div className="flex items-center gap-3">
                <span className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-white tabular-nums">
                  {mode === "now" ? liveDisplay.formattedTime : currentSlot.time.slice(0, 5)}
                </span>
                <div className="flex flex-col items-start text-left">
                  <div className="flex items-center gap-1.5 text-sm sm:text-base font-heading font-semibold text-[#B7C4C8]">
                    <span>{mode === "now" ? liveDisplay.period : currentSlot.period}</span>
                    {isNight ? (
                      <Moon className="w-4 h-4 text-[#B7C4C8]" />
                    ) : (
                      <Sun className="w-4 h-4 text-[#F21B35]" />
                    )}
                  </div>
                  {mode === "now" ? (
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#25D366]">
                      Live IST
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#B7C4C8]/70">
                      Preview
                    </span>
                  )}
                </div>
              </div>

              {/* Readable sub-label (>= 14px) */}
              <p className="font-body text-sm text-[#B7C4C8] mt-1.5">
                {mode === "now" ? (
                  <span className="text-white font-medium">Open now. Biometric keyless member entry active.</span>
                ) : (
                  <span>Open 24/7. Pick a time to see what is on.</span>
                )}
              </p>

              {/* Switch back to live button if in preview mode */}
              {mode === "preview" && (
                <button
                  type="button"
                  onClick={() => setSlot(0, "now")}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs text-[#B7C4C8] hover:text-white transition-colors"
                >
                  <RotateCcw className="w-3 h-3 text-[#F21B35]" />
                  <span>Switch to live clock</span>
                </button>
              )}
            </div>

            {/* TIME PILLS (Real buttons with aria-pressed) */}
            <div
              className="flex items-center gap-2 mt-5 max-w-full overflow-x-auto pb-1 px-2 scrollbar-none"
              role="tablist"
              aria-label="Time slots"
            >
              {/* "Now" Pill */}
              <button
                type="button"
                role="tab"
                aria-pressed={mode === "now"}
                aria-selected={mode === "now"}
                onClick={() => setSlot(0, "now")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-heading font-semibold tracking-wider transition-all duration-200 border flex items-center gap-1.5 shrink-0 ${
                  mode === "now"
                    ? "border-[#F21B35] bg-[#F21B35] text-white shadow-lg shadow-[#F21B35]/25"
                    : "border-[#1E3840] bg-[#0A1A1F] text-[#B7C4C8] hover:border-white/50"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${mode === "now" ? "bg-white" : "bg-[#25D366]"} animate-pulse`} />
                <span>Now</span>
              </button>

              {/* 6 Standard Preview Slot Pills */}
              {PREVIEW_SLOTS.map((slot, idx) => {
                const isActive = mode === "preview" && activeIndex === idx;
                return (
                  <button
                    key={slot.time}
                    type="button"
                    role="tab"
                    aria-pressed={isActive}
                    aria-selected={isActive}
                    onClick={() => setSlot(idx, "click")}
                    className={`px-3 py-1.5 rounded-full text-xs font-heading font-medium tracking-wide transition-all duration-200 border whitespace-nowrap shrink-0 ${
                      isActive
                        ? "border-[#F21B35] bg-[#F21B35] text-white shadow-lg shadow-[#F21B35]/25"
                        : "border-[#1E3840] bg-[#0A1A1F] text-[#B7C4C8] hover:border-white/50"
                    }`}
                  >
                    {slot.time}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Fixed-Height Info Card */}
          <div className="min-[1100px]:col-span-6 w-full flex justify-center min-[1100px]:justify-start">
            <div className="w-full max-w-[480px] min-h-[400px] md:min-h-[440px] bg-[#0F2329]/95 border border-[#1E3840] rounded-card p-6 sm:p-8 flex flex-col justify-between backdrop-blur-md shadow-2xl transition-all duration-300">
              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1E3840]/60">
                  <span className="font-heading text-xs uppercase tracking-wider text-[#B7C4C8] font-semibold">
                    {mode === "now" ? "Current Time Routine" : "Scheduled Focus"}
                  </span>
                  {mode === "now" ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#25D366]/15 border border-[#25D366]/40 text-[11px] font-heading uppercase tracking-wider text-[#25D366]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-ping" />
                      Open Now
                    </span>
                  ) : (
                    siteConfig.demoMode && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#0A1A1F] border border-[#1E3840] text-[11px] font-mono text-[#B7C4C8]">
                        Sample schedule
                      </span>
                    )
                  )}
                </div>

                {/* Program Photo (Natural, bright, sharp) */}
                <div className="relative w-full h-44 sm:h-48 rounded-lg overflow-hidden border border-[#1E3840] mb-5 bg-[#0A1A1F]">
                  <Image
                    src={activeProgram.image}
                    alt={activeProgram.program}
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A1F]/90 via-[#0A1A1F]/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-[#0A1A1F]/80 backdrop-blur-sm border border-[#1E3840] text-xs font-heading font-semibold text-white">
                      {mode === "now" ? liveDisplay.formattedTime : activeProgram.time}
                    </span>
                  </div>
                </div>

                {/* Program Title & Plain English Description */}
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
                  {activeProgram.program}
                </h3>
                <p className="font-body text-sm text-[#B7C4C8] leading-relaxed line-clamp-3">
                  {activeProgram.description}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-4 border-t border-[#1E3840]/60 mt-4 flex items-center justify-between">
                <Link
                  href={`/programs#${activeProgram.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-heading uppercase tracking-widest text-white hover:text-[#F21B35] font-semibold transition-colors group"
                >
                  <span>View program details</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
                <span className="text-[11px] font-body text-[#B7C4C8]/70 hidden sm:inline">
                  Keyless biometric entry
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Ticker: Fixed Status */}
        <div className="border-t border-[#1E3840]/60 pt-3 flex flex-col sm:flex-row items-center justify-between text-xs text-[#B7C4C8] shrink-0">
          <span>Full facility access anytime day or night • 24/7/365</span>
          <span className="text-white/60 mt-1 sm:mt-0">
            {mode === "now" ? "Live mode (Asia/Kolkata)" : `Slot 0${activeIndex + 1} of 0${PREVIEW_SLOTS.length}`}
          </span>
        </div>
      </div>
    </section>
  );
}
