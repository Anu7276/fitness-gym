"use client";

import React, { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock } from "lucide-react";

export function TwentyFourHours() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const dialRef = useRef<SVGSVGElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const schedule = siteConfig.daySchedule;
  const currentSlot = schedule[activeIndex];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (containerRef.current && pinContainerRef.current) {
      const totalSlots = schedule.length;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%",
        pin: pinContainerRef.current,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          const index = Math.min(
            Math.floor(progress * totalSlots),
            totalSlots - 1
          );
          setActiveIndex(index);

          // Rotate dial from -60deg to +120deg
          if (dialRef.current) {
            const angle = -60 + progress * 180;
            gsap.set(dialRef.current, { rotation: angle });
          }
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === containerRef.current) st.kill();
      });
    };
  }, [schedule.length]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#06151A] text-white transition-colors duration-700"
      style={{ backgroundColor: currentSlot.ambientColor }}
    >
      <div
        ref={pinContainerRef}
        className="h-screen w-full flex flex-col justify-between py-12 md:py-20 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto overflow-hidden"
      >
        {/* Top Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#1E3840] pb-6">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F21B35] animate-pulse" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-tight text-white">
              24-Hour Rhythm • Non-Stop Sanctuary
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F2329] border border-[#1E3840] text-xs font-heading uppercase tracking-wider text-[#B7C4C8]">
            <Clock className="w-3.5 h-3.5 text-[#F21B35]" />
            <span>Open 24/7/365 • Biometric Keyless</span>
          </div>
        </div>

        {/* Center Clock Dial & Active Slot Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
          {/* Left Column: Big Clock Dial Visual */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
              {/* Dial Outer Ring */}
              <div className="absolute inset-0 rounded-full border border-[#1E3840] bg-[#0A1A1F]/80 backdrop-blur-md shadow-2xl" />

              {/* Rotating SVG Clock Hand */}
              <svg
                ref={dialRef}
                viewBox="0 0 200 200"
                className="w-full h-full will-change-transform"
              >
                {/* 12 Hour Ticks */}
                {[...Array(12)].map((_, i) => (
                  <line
                    key={i}
                    x1="100"
                    y1="15"
                    x2="100"
                    y2="25"
                    stroke="#1E3840"
                    strokeWidth="2"
                    transform={`rotate(${i * 30} 100 100)`}
                  />
                ))}

                {/* Hand Line */}
                <line
                  x1="100"
                  y1="100"
                  x2="100"
                  y2="35"
                  stroke="#F21B35"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="100" cy="100" r="6" fill="#F21B35" />
              </svg>

              {/* Digital Time Center Overlay */}
              <div className="absolute flex flex-col items-center pointer-events-none">
                <span className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-white">
                  {currentSlot.time}
                </span>
                <span className="font-heading text-[10px] uppercase tracking-widest text-[#F21B35]">
                  Active Zone
                </span>
              </div>
            </div>

            {/* Time Slot Scrubber Buttons */}
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {schedule.map((item, idx) => (
                <button
                  key={item.time}
                  onClick={() => setActiveIndex(idx)}
                  className={`px-3 py-1.5 rounded-full text-xs font-heading uppercase tracking-wider transition-all duration-200 border ${
                    idx === activeIndex
                      ? "border-[#F21B35] bg-[#F21B35] text-white"
                      : "border-[#1E3840] bg-[#0A1A1F] text-[#B7C4C8] hover:border-white"
                  }`}
                >
                  {item.time}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Slot Detail Editorial Card */}
          <div className="lg:col-span-6 bg-[#0F2329]/90 border border-[#1E3840] rounded-card p-8 md:p-12 backdrop-blur-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A1A1F] border border-[#1E3840] text-[10px] font-heading uppercase tracking-wider text-[#B7C4C8] mb-6">
              <span>Proposed Program Slot</span>
              <span className="text-[#F21B35]">[CONFIRM WITH OWNER]</span>
            </div>

            <h3 className="font-heading text-3xl md:text-5xl font-bold text-white uppercase tracking-tight mb-4">
              {currentSlot.program}
            </h3>

            <p className="font-body text-base text-[#B7C4C8] leading-relaxed mb-8">
              {currentSlot.description}
            </p>

            <div className="pt-6 border-t border-[#1E3840] flex items-center justify-between text-xs text-[#B7C4C8]">
              <span>Waghodia Facility Floor</span>
              <span className="text-white font-medium">Scroll down to scrub daylight cycle ↓</span>
            </div>
          </div>
        </div>

        {/* Bottom Status Ticker */}
        <div className="border-t border-[#1E3840] pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-[#B7C4C8]">
          <span>Continuous HVAC Climate Control & Biometric Security</span>
          <span className="text-white/60">Frame 0{activeIndex + 1} of 0{schedule.length}</span>
        </div>
      </div>
    </div>
  );
}

