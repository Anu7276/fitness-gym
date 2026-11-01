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
    <main className="w-full pt-32 pb-28 md:pb-40 bg-[#0A1A1F] text-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F21B35]" />
            <span className="font-heading text-xs uppercase tracking-widest text-[#B7C4C8]">
              Complimentary Invitation
            </span>
          </div>
          <h1 className="font-heading text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white uppercase mb-6">
            1-Day VIP Pass
          </h1>
          <p className="font-body text-base md:text-xl text-[#B7C4C8] max-w-2xl leading-relaxed">
            Experience our Vadodara training facility with zero cost and zero obligation. Full access to
            the weight room, cardio theater, and your choice of group class.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7">
            <LeadForm source="Free Trial Page" defaultProgram={defaultProgram} />
          </div>

          {/* Right Column: Privileges Breakdown (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-[#0F2329] border border-[#1E3840] rounded-card p-8">
              <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-white mb-4">
                What Your Pass Includes:
              </h3>
              <div className="flex flex-col gap-4 text-xs font-body text-[#B7C4C8]">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#F21B35] shrink-0 mt-0.5" />
                  <span>Full access to 10,000+ sq.ft training arena and Olympic weights</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#F21B35] shrink-0 mt-0.5" />
                  <span>One complimentary seat in any scheduled class (CrossFit, Yoga, Zumba, etc.)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#F21B35] shrink-0 mt-0.5" />
                  <span>Personal equipment orientation with a certified floor coach</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#F21B35] shrink-0 mt-0.5" />
                  <span>Full locker room, rainfall shower, and towel amenities</span>
                </div>
              </div>
            </div>

            <div className="bg-[#0F2329] border border-[#1E3840] rounded-card p-8 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#F21B35] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading text-sm uppercase tracking-wider text-white font-semibold">
                    Facility Address
                  </h4>
                  <p className="font-body text-xs text-[#B7C4C8] mt-1 leading-relaxed">
                    {siteConfig.contact.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-4 border-t border-[#1E3840]">
                <Clock className="w-5 h-5 text-[#F21B35] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading text-sm uppercase tracking-wider text-white font-semibold">
                    Operating Schedule
                  </h4>
                  <p className="font-body text-xs text-[#B7C4C8] mt-1">
                    {siteConfig.contact.hours}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-4 border-t border-[#1E3840]">
                <Shield className="w-5 h-5 text-[#F21B35] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading text-sm uppercase tracking-wider text-white font-semibold">
                    Honesty Policy
                  </h4>
                  <p className="font-body text-xs text-[#B7C4C8] mt-1 leading-relaxed">
                    No high-pressure sales calls. After your workout, you decide if FITNESSGYM fits your goals.
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
    <Suspense fallback={<div className="min-h-screen bg-[#0A1A1F] text-white pt-32 text-center">Loading pass form...</div>}>
      <FreeTrialContent />
    </Suspense>
  );
}

