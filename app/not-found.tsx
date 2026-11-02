import React from "react";
import { siteConfig } from "@/config/site";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { ArrowRight, Compass, Dumbbell } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist at FITNESSGYM Vadodara.",
};

export default function NotFound() {
  return (
    <main className="w-full min-h-[85vh] flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 bg-[#0A1A1F] text-white">
      {/* Dumbbell Icon Badge */}
      <div className="w-20 h-20 rounded-full bg-[#0F2329] border border-[#1E3840] flex items-center justify-center text-[#F21B35] mb-6 shadow-xl">
        <Dumbbell className="w-10 h-10 -rotate-45" />
      </div>

      <div className="inline-flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-[#F21B35] animate-pulse" />
        <span className="text-[12px] uppercase tracking-[0.15em] text-[#F21B35] font-semibold">
          Error 404 • Lost Your Rep?
        </span>
      </div>

      <h1 className="font-heading text-7xl sm:text-9xl font-extrabold tracking-tight text-white uppercase mb-4 leading-[1.05]">
        404
      </h1>

      <p className="font-body text-base md:text-lg text-[#E5E5E5] max-w-md mb-8 leading-[1.6]">
        This page couldn&apos;t handle the weight. Don&apos;t worry—our 24/7 gym floor and coaches are right where you left them.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <TransitionLink
          href="/"
          title="Home"
          className="px-8 py-4 rounded-full bg-[#F21B35] text-white font-heading text-xs uppercase tracking-widest font-bold hover:bg-[#d0142b] transition-all shadow-xl active:scale-95 text-center min-h-[44px] flex items-center justify-center"
        >
          Return to Home
        </TransitionLink>
        <TransitionLink
          href="/schedule"
          title="Timetable"
          className="px-8 py-4 rounded-full border border-[#1E3840] bg-[#0F2329] text-white font-heading text-xs uppercase tracking-widest font-semibold hover:border-white transition-all text-center min-h-[44px] flex items-center justify-center"
        >
          View Class Timetable
        </TransitionLink>
        <TransitionLink
          href="/programs"
          title="Programs"
          className="px-8 py-4 rounded-full border border-[#1E3840] bg-[#0F2329] text-white font-heading text-xs uppercase tracking-widest font-semibold hover:border-white transition-all text-center min-h-[44px] flex items-center justify-center"
        >
          Explore Programs
        </TransitionLink>
      </div>
    </main>
  );
}
