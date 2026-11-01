import React from "react";
import { siteConfig } from "@/config/site";
import { TransitionLink } from "@/components/motion/TransitionLink";

export default function NotFound() {
  return (
    <main className="w-full min-h-[80vh] flex flex-col items-center justify-center text-center px-6 pt-20 bg-[#0A1A1F] text-white">
      <div className="inline-flex items-center gap-2 mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-[#F21B35]" />
        <span className="font-heading text-xs uppercase tracking-widest text-[#B7C4C8]">
          Error 404 • Coordinate Uncharted
        </span>
      </div>

      <h1 className="font-heading text-7xl sm:text-9xl font-bold tracking-tight text-white uppercase mb-4">
        404
      </h1>

      <p className="font-body text-base md:text-xl text-[#B7C4C8] max-w-md mb-8 leading-relaxed">
        The floor section or training page you requested cannot be located. Return to the main sanctuary.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <TransitionLink
          href="/"
          title="Sanctuary"
          className="px-8 py-4 rounded-full bg-white text-[#0A1A1F] font-heading text-xs uppercase tracking-widest font-semibold hover:bg-[#F21B35] hover:text-white transition-all"
        >
          Return to Sanctuary
        </TransitionLink>
        <TransitionLink
          href="/programs"
          title="Programs"
          className="px-8 py-4 rounded-full border border-[#1E3840] bg-[#0F2329] text-white font-heading text-xs uppercase tracking-widest font-medium hover:border-white transition-all"
        >
          View Programs
        </TransitionLink>
      </div>
    </main>
  );
}

