"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/LeadForm";
import { Check, Shield, MapPin, Clock } from "lucide-react";

function FreeTrialContent() {
  const searchParams = useSearchParams();
  const defaultProgram = searchParams.get("program") || undefined;

  return (
    <main className="w-full pt-28 pb-16 md:pb-28 bg-[#0A1A1F] text-white">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14 md:mb-18">
          <span className="font-heading text-xs font-semibold uppercase tracking-wider text-[#B7C4C8] mb-3">
            Free pass
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Claim your 1-day pass
          </h1>
          <p className="font-body text-[15px] md:text-base text-[#B7C4C8] max-w-xl leading-relaxed">
            Experience our gym floor with zero cost and no commitment. Workout with full access to
            weights, cardio equipment, and group classes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start max-w-5xl mx-auto">
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7">
            <LeadForm source="Free Trial Page" defaultProgram={defaultProgram} />
          </div>

          {/* Right Column: Privileges Breakdown (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-[#0F2329] border border-[#1E3840] rounded-card p-7">
              <h3 className="font-heading text-lg font-bold text-white mb-4">
                What is included with your pass:
              </h3>
              <div className="flex flex-col gap-3.5 text-xs font-body text-[#B7C4C8]">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#F21B35] shrink-0 mt-0.5" />
                  <span>Full access to the 10,000+ sq.ft training floor and weights</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#F21B35] shrink-0 mt-0.5" />
                  <span>One free class pass (CrossFit, Yoga, Zumba, etc.)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#F21B35] shrink-0 mt-0.5" />
                  <span>Equipment tour and machine guidance with a coach</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#F21B35] shrink-0 mt-0.5" />
                  <span>Locker room, rainfall showers, and towel service</span>
                </div>
              </div>
            </div>

            <div className="bg-[#0F2329] border border-[#1E3840] rounded-card p-7 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#F21B35] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading text-sm font-semibold text-white">
                    Gym Location
                  </h4>
                  <p className="font-body text-xs text-[#B7C4C8] mt-1 leading-relaxed">
                    {siteConfig.contact.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-4 border-t border-[#1E3840]">
                <Clock className="w-5 h-5 text-[#F21B35] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading text-sm font-semibold text-white">
                    Operating Hours
                  </h4>
                  <p className="font-body text-xs text-[#B7C4C8] mt-1">
                    {siteConfig.contact.hours}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-4 border-t border-[#1E3840]">
                <Shield className="w-5 h-5 text-[#F21B35] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading text-sm font-semibold text-white">
                    No High-Pressure Sales
                  </h4>
                  <p className="font-body text-xs text-[#B7C4C8] mt-1 leading-relaxed">
                    Enjoy your workout first. If you decide to join later, we are here to help.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function FreeTrialPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A1A1F] text-white pt-32 text-center font-body text-sm">Loading pass form...</div>}>
      <FreeTrialContent />
    </Suspense>
  );
}
