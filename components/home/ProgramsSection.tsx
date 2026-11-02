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
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggers: ScrollTrigger[] = [];

    // 1. Expandable photo band: starts inset (~70% width, 24px radius) scaling to full width
    if (photoBandRef.current && sectionRef.current) {
      const bandTween = gsap.fromTo(
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
      if (bandTween.scrollTrigger) triggers.push(bandTween.scrollTrigger);
    }

    // 2. Scroll-Driven Staggered Entrance on Program Cards
    const cards = cardsContainerRef.current?.querySelectorAll<HTMLElement>(".program-card");
    if (cards && cards.length > 0 && cardsContainerRef.current) {
      const cardsTween = gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );
      if (cardsTween.scrollTrigger) triggers.push(cardsTween.scrollTrigger);

      // 3. Live Parallax Scrub on each Card's Inner Image
      cards.forEach((card) => {
        const img = card.querySelector<HTMLElement>(".program-card-img");
        if (img) {
          const parallaxTween = gsap.fromTo(
            img,
            { yPercent: -12, scale: 1.15 },
            {
              yPercent: 12,
              scale: 1.05,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            }
          );
          if (parallaxTween.scrollTrigger) triggers.push(parallaxTween.scrollTrigger);
        }
      });
    }

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="programs" className="w-full py-16 md:py-28 bg-[#0A1A1F] text-white">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 md:mb-20">
          <span className="font-heading text-xs font-semibold uppercase tracking-wider text-[#B7C4C8] mb-3">
            Training programs
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Six programs, one membership
          </h2>
          <p className="font-body text-[15px] text-[#B7C4C8] max-w-lg leading-relaxed">
            Targeted workouts designed for real progress. All included with Pro and Elite memberships.
          </p>
        </div>

        {/* Expandable Photo Band */}
        <div className="w-full flex justify-center mb-16 overflow-hidden">
          <div
            ref={photoBandRef}
            className="relative h-60 md:h-80 overflow-hidden border border-[#1E3840] shadow-2xl mx-auto flex items-center justify-center will-change-transform"
          >
            <Image
              src="/images/band-programs.jpg"
              alt="FITNESSGYM open training floor"
              fill
              sizes="(max-width: 1240px) 100vw, 1240px"
              className="object-cover filter brightness-[0.75] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-[#0A1A1F]/40 pointer-events-none" />
            <div className="relative z-10 text-center px-6">
              <span className="font-heading text-xs uppercase tracking-wider text-white bg-[#0A1A1F]/80 px-3.5 py-1.5 rounded-full border border-[#1E3840]">
                All skill levels welcome
              </span>
              <h3 className="font-heading text-2xl md:text-4xl font-bold text-white mt-3">
                Coached by certified trainers in dedicated zones
              </h3>
            </div>
          </div>
        </div>

        {/* 3x2 Grid of 6 Program Cards with Scroll Entrance and Parallax */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {siteConfig.programs.map((program) => (
            <article
              key={program.id}
              className="program-card bg-[#0F2329] border border-[#1E3840] rounded-card flex flex-col overflow-hidden group hover:border-[#F21B35]/70 hover:shadow-[0_16px_36px_rgba(242,27,53,0.18)] hover:-translate-y-2 transition-all duration-300 will-change-transform"
            >
              {/* Photo: sharp 0px corners, with scroll-driven parallax bleed */}
              <div className="w-full h-64 relative overflow-hidden rounded-none border-b border-[#1E3840] bg-[#0A1A1F]">
                <div className="program-card-img absolute -inset-y-6 inset-x-0 w-full h-[calc(100%+48px)] will-change-transform">
                  <Image
                    src={program.image}
                    alt={program.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover filter brightness-[0.92] contrast-[1.05] rounded-none group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>
                <div className="absolute inset-0 bg-[#0A1A1F]/20 group-hover:bg-[#0A1A1F]/35 transition-colors duration-300 pointer-events-none" />
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-[#0A1A1F]/90 border border-[#1E3840] rounded-full px-3 py-1 font-body text-xs text-white">
                    {program.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-white mb-2 group-hover:text-[#F21B35] transition-colors duration-200">
                    {program.name}
                  </h3>
                  <p className="font-body text-[14px] text-[#B7C4C8] leading-relaxed mb-6">
                    {program.tagline}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1E3840]/60 flex items-center justify-between">
                  <span className="font-body text-xs text-[#B7C4C8]">
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
      </div>
    </section>
  );
}
