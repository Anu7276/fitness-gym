"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { motion } from "framer-motion";
import { TransitionLink } from "../motion/TransitionLink";

export function TrainersSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section id="trainers" className="w-full py-16 md:py-28 bg-[#06151A] text-white overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-heading text-xs font-semibold uppercase tracking-wider text-[#B7C4C8]">
                Coaching team
              </span>
              {siteConfig.demoMode && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#0F2329] border border-[#1E3840] text-[11px] text-[#B7C4C8]">
                  Sample content
                </span>
              )}
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Our trainers
            </h2>
          </div>
          <p className="font-body text-[15px] text-[#B7C4C8] max-w-md leading-relaxed">
            Friendly, certified fitness coaches dedicated to helping you train safely and reach your personal best.
          </p>
        </div>

        {/* Carousel Container with Custom Drag Cursor on Desktop */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="relative cursor-grab active:cursor-grabbing select-none"
        >
          {/* Floating "Drag" Bubble for Desktop */}
          {isHovering && (
            <div
              className="hidden lg:flex pointer-events-none absolute z-30 w-14 h-14 rounded-full bg-white text-[#0A1A1F] items-center justify-center font-heading text-xs uppercase tracking-wider font-bold shadow-2xl transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${cursorPos.x}px`,
                top: `${cursorPos.y}px`,
              }}
            >
              Drag
            </div>
          )}

          {/* Draggable Row */}
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -800 }}
            className="flex gap-6 pb-6 cursor-grab active:cursor-grabbing overflow-x-auto lg:overflow-visible no-scrollbar snap-x snap-mandatory"
          >
            {siteConfig.trainers.map((trainer) => (
              <motion.div
                key={trainer.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="w-[280px] sm:w-[310px] shrink-0 bg-[#0F2329] border border-[#1E3840] rounded-card overflow-hidden flex flex-col snap-start"
              >
                {/* Portrait Photo: sharp 0px corners, 4:5 aspect ratio */}
                <div className="w-full h-80 relative overflow-hidden bg-[#0A1A1F] border-b border-[#1E3840]">
                  <Image
                    src={trainer.image}
                    alt={trainer.name}
                    fill
                    sizes="310px"
                    className="object-cover filter brightness-[0.95] contrast-[1.05] rounded-none pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F2329] via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#0A1A1F]/90 border border-[#1E3840] rounded-full px-3 py-1 font-body text-xs text-white">
                      {trainer.experience}
                    </span>
                  </div>
                </div>

                {/* Trainer Info */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white mb-1">
                      {trainer.name}
                    </h3>
                    <p className="font-body text-xs text-[#B7C4C8] font-medium mb-3">
                      {trainer.role}
                    </p>
                    <p className="font-body text-xs text-[#B7C4C8] leading-relaxed line-clamp-2">
                      {trainer.speciality}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Carousel Hint & Link */}
        <div className="mt-6 flex items-center justify-between text-xs text-[#B7C4C8]">
          <span className="font-body text-[#B7C4C8]/70">
            ← Drag or swipe to see all coaches →
          </span>
          <TransitionLink
            href="/trainers"
            title="Trainers"
            className="font-heading uppercase tracking-wider text-white hover:text-[#F21B35] font-semibold transition-colors"
          >
            Meet the team →
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
