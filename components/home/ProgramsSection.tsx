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
  const photoBandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Photo band: image starts inset (about 70% width, 24px radius) and scales to 100% with 0 radius
    if (photoBandRef.current && sectionRef.current) {
      gsap.fromTo(
        photoBandRef.current,
        { width: "70%", borderRadius: "24px" },
        {
          width: "100%",
          borderRadius: "0px",
          ease: "none",
          scrollTrigger: {
            trigger: photoBandRef.current,
            start: "top 80%",
            end: "top 25%",
            scrub: true,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === photoBandRef.current) st.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} id="programs" className="w-full py-28 md:py-40 bg-[#0A1A1F] text-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F21B35]" />
            <span className="font-heading text-xs uppercase tracking-widest text-[#B7C4C8]">
              Curated Disciplines
            </span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase mb-4">
            Programs
          </h2>
          <p className="font-body text-base text-[#B7C4C8] max-w-xl leading-relaxed">
            Targeted training methodologies designed for measurable athletic performance.
          </p>
        </div>

        {/* Photo Band Expandable Feature Banner */}
        <div className="w-full flex justify-center mb-16 overflow-hidden">
          <div
            ref={photoBandRef}
            className="relative h-64 md:h-80 overflow-hidden border border-[#1E3840] shadow-2xl mx-auto flex items-center justify-center will-change-transform"
          >
            <Image
              src="/images/intro-1.jpg"
              alt="Programs Overview Sanctuary"
              fill
              sizes="(max-width: 1440px) 100vw, 1440px"
              className="object-cover filter brightness-[0.5] contrast-[1.1]"
            />
            <div className="relative z-10 text-center px-6">
              <span className="font-heading text-xs uppercase tracking-widest text-[#F21B35] font-semibold">
                Engineered Performance
              </span>
              <h3 className="font-heading text-3xl md:text-5xl font-bold uppercase tracking-tight text-white mt-1">
                6 Disciplines • Zero Compromise
              </h3>
            </div>
          </div>
        </div>

        {/* 3x2 Grid of 6 Real Program Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteConfig.programs.map((program) => (
            <article
              key={program.id}
              className="bg-[#0F2329] border border-[#1E3840] rounded-card flex flex-col overflow-hidden group hover:border-[#444748] transition-all duration-300"
            >
              {/* Photo Container: sharp corners (0px) */}
              <div className="w-full h-56 relative overflow-hidden rounded-none border-b border-[#1E3840] bg-[#0A1A1F]">
                <Image
                  src={program.image}
                  alt={program.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover filter brightness-[0.75] contrast-[1.1] rounded-none group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-[#06151A]/30 group-hover:bg-[#06151A]/50 transition-colors duration-300 pointer-events-none" />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#0A1A1F]/90 border border-[#1E3840] rounded-full px-3 py-1 font-heading text-[10px] uppercase tracking-wider text-[#B7C4C8]">
                    {program.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-white uppercase mb-2 group-hover:text-[#F21B35] transition-colors duration-200">
                    {program.name}
                  </h3>
                  <p className="font-body text-sm text-[#B7C4C8] leading-relaxed mb-6 group-hover:translate-y-[-2px] transition-transform duration-300">
                    {program.tagline}
                  </p>
                </div>

                <TransitionLink
                  href={`/programs#${program.slug}`}
                  title={program.name}
                  className="inline-flex items-center gap-2 font-heading text-xs uppercase tracking-wider text-white font-semibold group/link"
                >
                  <span className="relative">
                    Explore
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#F21B35] transition-all duration-300 group-hover/link:w-full" />
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#F21B35] transition-transform group-hover/link:translate-x-1" />
                </TransitionLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

