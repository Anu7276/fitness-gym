"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/LeadForm";
import {
  Check,
  Shield,
  MapPin,
  Clock,
  Footprints,
  Droplet,
  FileBadge,
  Sparkles,
  Users,
  Dumbbell,
  Moon,
  Activity,
} from "lucide-react";

function FreeTrialContent() {
  const searchParams = useSearchParams();
  const defaultProgram = searchParams.get("program") || undefined;

  return (
    <main className="w-full pt-28 pb-16 md:pb-28 bg-[#0A1A1F] text-white">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14 md:mb-18">
          <span className="text-[12px] uppercase tracking-[0.15em] text-[#F21B35] font-semibold mb-3 block">
            Free pass
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4 leading-[1.05]">
            Claim your 1-day pass
          </h1>
          <p className="font-body text-[17px] text-[#E5E5E5] max-w-xl leading-[1.6]">
            Experience our gym floor with zero cost and no commitment. Workout with full access to
            weights, cardio equipment, and group classes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start max-w-5xl mx-auto">
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7">
            <LeadForm source="Free Trial Page" defaultProgram={defaultProgram} />
          </div>

          {/* Right Column: Privileges Breakdown & What to Bring (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* What is Included */}
            <div className="bg-[#0F2329] border border-[#1E3840] rounded-card p-7">
              <h3 className="font-heading text-lg font-bold text-white mb-4 leading-[1.05]">
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

            {/* What to Bring Callout Note */}
            <div className="bg-[#0F2329] border border-[#F21B35]/40 rounded-card p-7 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-3 text-[#F21B35]">
                <Sparkles className="w-4 h-4" />
                <h3 className="font-heading text-base font-bold text-white uppercase tracking-wider leading-[1.05]">
                  What to bring on your visit
                </h3>
              </div>
              <p className="font-body text-xs text-[#B7C4C8] mb-4 leading-relaxed">
                Everything you need for a comfortable, safe workout experience:
              </p>
              <div className="flex flex-col gap-3 text-xs font-body text-[#E5E5E5]">
                <div className="flex items-start gap-2.5">
                  <Footprints className="w-4 h-4 text-[#F21B35] shrink-0 mt-0.5" />
                  <span><strong>Clean indoor gym shoes</strong> (please carry inside, no muddy street shoes on floor).</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Activity className="w-4 h-4 text-[#F21B35] shrink-0 mt-0.5" />
                  <span><strong>Comfortable workout clothes</strong> suitable for lifting, cardio, or stretching.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Droplet className="w-4 h-4 text-[#F21B35] shrink-0 mt-0.5" />
                  <span><strong>Water bottle</strong> (cold RO-filtered water refill stations available on floor).</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <FileBadge className="w-4 h-4 text-[#F21B35] shrink-0 mt-0.5" />
                  <span><strong>Government photo ID</strong> for 1-minute front-desk pass activation.</span>
                </div>
              </div>
            </div>

            {/* Location & Policies */}
            <div className="bg-[#0F2329] border border-[#1E3840] rounded-card p-7 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#F21B35] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading text-sm font-semibold text-white leading-[1.05]">
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
                  <h4 className="font-heading text-sm font-semibold text-white leading-[1.05]">
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
                  <h4 className="font-heading text-sm font-semibold text-white leading-[1.05]">
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

        {/* Dedicated "Who Is This For?" Section */}
        <div className="mt-20 md:mt-28 max-w-5xl mx-auto pt-16 border-t border-[#1E3840]">
          <div className="text-center mb-12">
            <span className="text-[12px] uppercase tracking-[0.15em] text-[#F21B35] font-semibold mb-2 block">
              Built for all levels
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.05]">
              Who is this for?
            </h2>
            <p className="font-body text-[17px] text-[#B7C4C8] max-w-xl mx-auto mt-3 leading-[1.6]">
              Whether you are stepping into a gym for the first time or training for competitive sport, FITNESSGYM provides the space, equipment, and coaches to reach your personal best.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Persona 1: Beginners */}
            <div className="bg-[#0F2329] border border-[#1E3840] rounded-card p-6 flex flex-col justify-between hover:border-[#F21B35]/60 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#0A1A1F] border border-[#1E3840] flex items-center justify-center text-[#F21B35] mb-4">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-lg font-bold text-white mb-2 leading-[1.05]">
                  Beginners
                </h3>
                <p className="font-body text-xs text-[#E5E5E5] leading-relaxed">
                  Friendly floor trainers walk you through machine settings, safe lifting form, and comfortable starting weights with zero intimidation.
                </p>
              </div>
            </div>

            {/* Persona 2: Busy Schedules */}
            <div className="bg-[#0F2329] border border-[#1E3840] rounded-card p-6 flex flex-col justify-between hover:border-[#F21B35]/60 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#0A1A1F] border border-[#1E3840] flex items-center justify-center text-[#F21B35] mb-4">
                  <Moon className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-lg font-bold text-white mb-2 leading-[1.05]">
                  Busy Professionals &amp; Night Owls
                </h3>
                <p className="font-body text-xs text-[#E5E5E5] leading-relaxed">
                  True 24/7 keyless access lets you train at 5 AM before office or midnight after late shifts without crowd congestion.
                </p>
              </div>
            </div>

            {/* Persona 3: Dedicated Lifters */}
            <div className="bg-[#0F2329] border border-[#1E3840] rounded-card p-6 flex flex-col justify-between hover:border-[#F21B35]/60 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#0A1A1F] border border-[#1E3840] flex items-center justify-center text-[#F21B35] mb-4">
                  <Dumbbell className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-lg font-bold text-white mb-2 leading-[1.05]">
                  Strength Lifters &amp; Athletes
                </h3>
                <p className="font-body text-xs text-[#E5E5E5] leading-relaxed">
                  Calibrated Olympic barbells, dumbbell racks up to 50kg, multiple power cages, sprint turf track, and heavy combat bags.
                </p>
              </div>
            </div>

            {/* Persona 4: Group Class Lovers */}
            <div className="bg-[#0F2329] border border-[#1E3840] rounded-card p-6 flex flex-col justify-between hover:border-[#F21B35]/60 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#0A1A1F] border border-[#1E3840] flex items-center justify-center text-[#F21B35] mb-4">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-lg font-bold text-white mb-2 leading-[1.05]">
                  Group Class Lovers
                </h3>
                <p className="font-body text-xs text-[#E5E5E5] leading-relaxed">
                  Unlimited high-energy Zumba, CrossFit conditioning, and restorative mobility Yoga classes led by certified instructors.
                </p>
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
