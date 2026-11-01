"use client";

import React from "react";
import { siteConfig } from "@/config/site";

export function Marquee() {
  const programList = siteConfig.programs;

  return (
    <div className="w-full border-y border-[#1E3840] py-4 bg-[#0F2329]/50 overflow-hidden relative select-none">
      <div className="flex whitespace-nowrap animate-marquee items-center">
        {/* Render twice for continuous seamless loop */}
        {[0, 1].map((setIndex) => (
          <div
            key={setIndex}
            className="flex items-center gap-8 px-4 font-heading text-base md:text-lg uppercase tracking-wider text-[#B7C4C8] font-medium"
          >
            {programList.map((prog) => (
              <React.Fragment key={`${setIndex}-${prog.id}`}>
                <span className="hover:text-white transition-colors duration-200">
                  {prog.name}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#F21B35] shrink-0" />
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

