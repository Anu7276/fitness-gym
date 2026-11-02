"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { TransitionLink } from "../motion/TransitionLink";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ProgramsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  // Take only top 3 programs for the home preview
  const previewPrograms = siteConfig.programs.slice(0, 3);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = cardsContainerRef.current?.querySelectorAll<HTMLElement>(".program-card");
    if (cards && cards.length > 0 && cardsContainerRef.current) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === cardsContainerRef.current || st.vars.trigger === sectionRef.current) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="programs"
      className="w-full py-14 lg:py-20 bg-[#0A1A1F] text-white"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[12px] uppercase tracking-[0.15em] text-[#F21B35] font-semibold mb-2 block">
              Training programs
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.05]">
              Targeted Programs
            </h2>
          </div>
          <p className="font-body text-sm md:text-[15px] text-[#B7C4C8] max-w-md leading-relaxed">
            Progressive overload, high-energy cardio, and restorative mobility. Led by certified coaches.
          </p>
        </div>

        {/* 3 Program Cards: Horizontal scroll-snap on mobile, 3-column grid on desktop */}
        <div
          ref={cardsContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-6 px-6 no-scrollbar md:grid md:grid-cols-3 md:gap-8 md:mx-0 md:px-0 md:pb-0"
        >
          {previewPrograms.map((program) => (
            <article
              key={program.id}
              className="program-card w-[82vw] shrink-0 snap-center md:w-auto bg-[#0F2329] border border-[#1E3840] rounded-card flex flex-col overflow-hidden group hover:border-[#F21B35]/70 hover:shadow-[0_12px_32px_rgba(242,27,53,0.18)] hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Card Image: aspect-[4/3] */}
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-none border-b border-[#1E3840] bg-[#0A1A1F]">
                <Image
                  src={program.image}
                  alt={program.name}
                  fill
                  sizes="(max-width: 768px) 85vw, 33vw"
                  className="object-cover filter brightness-[0.92] contrast-[1.05] rounded-none group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-[#0A1A1F]/20 group-hover:bg-[#0A1A1F]/35 transition-colors duration-300 pointer-events-none" />
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="bg-[#0A1A1F]/90 border border-[#1E3840] rounded-full px-2.5 py-0.5 font-body text-xs text-white">
                    {program.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-7 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-[#F21B35] transition-colors duration-200 leading-[1.05]">
                    {program.name}
                  </h3>
                  <p className="font-body text-xs md:text-sm text-[#B7C4C8] leading-relaxed mb-6 line-clamp-2">
                    {program.tagline}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-[#1E3840]/60 flex items-center justify-between">
                  <span className="font-body text-xs text-[#7B8E94]">
                    {program.duration}
                  </span>
                  <TransitionLink
                    href={`/programs#${program.slug}`}
                    title={program.name}
                    className="inline-flex items-center gap-1.5 font-heading text-xs font-semibold uppercase tracking-wider text-white hover:text-[#F21B35] transition-colors"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#F21B35]" />
                  </TransitionLink>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Programs CTA */}
        <div className="mt-8 md:mt-12 flex justify-center">
          <TransitionLink
            href="/programs"
            title="All Programs"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#1E3840] bg-[#0F2329] text-white font-heading text-xs uppercase tracking-widest font-semibold hover:border-white hover:bg-white hover:text-[#0A1A1F] transition-all duration-300 shadow-lg min-h-[44px]"
          >
            <span>View All Programs (6)</span>
            <ArrowRight className="w-4 h-4 text-[#F21B35]" />
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
