"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, ShieldCheck, Award, Star } from "lucide-react";

export function StatsStrip() {
  const containerRef = useRef<HTMLElement>(null);
  const statRef = useRef<HTMLDivElement>(null);
  const [hasCounted, setHasCounted] = useState(false);
  const [displayYears, setDisplayYears] = useState(0);
  const [displayMembers, setDisplayMembers] = useState(0);
  const [displayTrainers, setDisplayTrainers] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (statRef.current && !hasCounted) {
      ScrollTrigger.create({
        trigger: statRef.current,
        start: "top 88%",
        onEnter: () => {
          setHasCounted(true);
          const obj = { years: 0, members: 0, trainers: 0 };
          gsap.to(obj, {
            years: 10,
            members: 2500,
            trainers: 12,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => {
              setDisplayYears(Math.round(obj.years));
              setDisplayMembers(Math.round(obj.members));
              setDisplayTrainers(Math.round(obj.trainers));
            },
          });
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === containerRef.current || st.vars.trigger === statRef.current) {
          st.kill();
        }
      });
    };
  }, [hasCounted]);

  return (
    <section
      ref={containerRef}
      id="about"
      className="w-full py-14 lg:py-20 bg-[#0A1A1F] text-white border-y border-[#1E3840]/60"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        {/* 3 Short Benefit Lines */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="flex items-start gap-3.5 bg-[#0F2329] border border-[#1E3840] rounded-xl p-4 transition-all duration-300 hover:border-[#F21B35]/50">
            <div className="w-9 h-9 rounded-full bg-[#0A1A1F] border border-[#1E3840] flex items-center justify-center text-[#F21B35] shrink-0">
              <Clock className="w-4 h-4 text-[#F21B35]" />
            </div>
            <div>
              <h3 className="font-heading text-base font-bold text-white uppercase leading-[1.05]">
                Open 24/7
              </h3>
              <p className="font-body text-xs text-[#E5E5E5] mt-1 leading-relaxed">
                Train when you want with biometric keyless access.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 bg-[#0F2329] border border-[#1E3840] rounded-xl p-4 transition-all duration-300 hover:border-[#F21B35]/50">
            <div className="w-9 h-9 rounded-full bg-[#0A1A1F] border border-[#1E3840] flex items-center justify-center text-[#F21B35] shrink-0">
              <Award className="w-4 h-4 text-[#F21B35]" />
            </div>
            <div>
              <h3 className="font-heading text-base font-bold text-white uppercase leading-[1.05]">
                Certified Coaches
              </h3>
              <p className="font-body text-xs text-[#E5E5E5] mt-1 leading-relaxed">
                Hands-on form guidance and injury prevention.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 bg-[#0F2329] border border-[#1E3840] rounded-xl p-4 transition-all duration-300 hover:border-[#F21B35]/50">
            <div className="w-9 h-9 rounded-full bg-[#0A1A1F] border border-[#1E3840] flex items-center justify-center text-[#F21B35] shrink-0">
              <ShieldCheck className="w-4 h-4 text-[#F21B35]" />
            </div>
            <div>
              <h3 className="font-heading text-base font-bold text-white uppercase leading-[1.05]">
                Zero Hidden Fees
              </h3>
              <p className="font-body text-xs text-[#E5E5E5] mt-1 leading-relaxed">
                No lock-in contracts, zero surprise renewal charges.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Stat Counters Strip */}
        <div
          ref={statRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 md:p-8 bg-[#0F2329]/70 border border-[#1E3840] rounded-2xl text-center"
        >
          <div className="flex flex-col items-center">
            <div className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.05]">
              {displayYears || 10}+
            </div>
            <div className="font-body text-xs text-[#B7C4C8] mt-1.5 uppercase tracking-wider font-semibold">
              Years in Waghodia
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.05]">
              {displayMembers ? displayMembers.toLocaleString("en-IN") : "2,500"}+
            </div>
            <div className="font-body text-xs text-[#B7C4C8] mt-1.5 uppercase tracking-wider font-semibold">
              Active Members
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.05]">
              {displayTrainers || 12}+
            </div>
            <div className="font-body text-xs text-[#B7C4C8] mt-1.5 uppercase tracking-wider font-semibold">
              Certified Trainers
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.05] flex items-center gap-1.5">
              <span>4.9</span>
              <Star className="w-5 h-5 fill-[#F21B35] text-[#F21B35] inline-block" />
            </div>
            <div className="font-body text-xs text-[#B7C4C8] mt-1.5 uppercase tracking-wider font-semibold">
              Google Rating (500+)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
