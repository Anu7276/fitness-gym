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
    <section id="trainers" className="w-full py-28 md:py-40 bg-[#06151A] text-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F21B35]" />
              <span className="font-heading text-xs uppercase tracking-widest text-[#B7C4C8]">
                Master Coaches
              </span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase">
              Trainers
            </h2>
          </div>
          <p className="font-body text-sm text-[#B7C4C8] max-w-md leading-relaxed">
            Every coach on our floor holds certified credentials in exercise science and biomechanics.
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
              className="hidden lg:flex pointer-events-none absolute z-30 w-16 h-16 rounded-full bg-white text-[#0A1A1F] items-center justify-center font-heading text-xs uppercase tracking-widest font-bold shadow-2xl transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2"
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
            dragConstraints={{ right: 0, left: -900 }}
            className="flex gap-6 pb-6 cursor-grab active:cursor-grabbing overflow-x-auto lg:overflow-visible no-scrollbar snap-x snap-mandatory"
          >
            {siteConfig.trainers.map((trainer) => (
              <motion.div
                key={trainer.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="w-[280px] sm:w-[320px] shrink-0 bg-[#0F2329] border border-[#1E3840] rounded-card overflow-hidden flex flex-col snap-start"
              >
                {/* Tall Portrait Photo: sharp 0px corners */}
                <div className="w-full h-96 relative overflow-hidden bg-[#0A1A1F] border-b border-[#1E3840]">
                  <Image
                    src={trainer.image}
                    alt={trainer.name}
                    fill
                    sizes="320px"
                    className="object-cover filter brightness-[0.8] contrast-[1.1] rounded-none pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F2329] via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#0A1A1F]/90 border border-[#1E3840] rounded-full px-3 py-1 font-heading text-[10px] uppercase tracking-wider text-[#B7C4C8]">
                      {trainer.experience}
                    </span>
                  </div>
                </div>

                {/* Trainer Info */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white uppercase mb-1">
                      {trainer.name}
                    </h3>
                    <p className="font-heading text-xs uppercase tracking-wider text-[#F21B35] font-semibold mb-3">
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
        <div className="mt-8 flex items-center justify-between text-xs text-[#B7C4C8]">
          <span className="font-heading uppercase tracking-widest text-[#B7C4C8]/70">
            ← Drag to view coaches →
          </span>
          <TransitionLink
            href="/trainers"
            title="Trainers"
            className="font-heading uppercase tracking-widest text-white hover:text-[#F21B35] transition-colors"
          >
            Meet Full Faculty →
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}

