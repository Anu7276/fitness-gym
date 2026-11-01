"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { TransitionLink } from "../motion/TransitionLink";
import { Check } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export function PricingSection() {
  const plans = siteConfig.pricing;

  return (
    <section id="pricing" className="w-full py-28 md:py-40 bg-[#0A1A1F] text-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F21B35]" />
            <span className="font-heading text-xs uppercase tracking-widest text-[#B7C4C8]">
              Investment
            </span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase mb-4">
            Membership
          </h2>
          <p className="font-body text-base text-[#B7C4C8] max-w-xl leading-relaxed">
            Transparent pricing with zero hidden enrolment fees or aggressive long-term lock-ins.
          </p>
        </div>

        {/* 3 Outlined Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const isPopular = plan.popular;

            return (
              <div
                key={plan.id}
                className={`relative bg-[#0F2329] border rounded-card p-8 md:p-10 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                  isPopular
                    ? "border-[#F21B35] shadow-[0_0_30px_rgba(242,27,53,0.15)] ring-1 ring-[#F21B35]"
                    : "border-[#1E3840] hover:border-[#444748]"
                }`}
              >
                {/* Popular Red Tag */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#F21B35] text-white px-4 py-1 rounded-full font-heading text-[10px] uppercase tracking-widest font-bold">
                    {plan.badge || "Most Popular"}
                  </div>
                )}

                <div>
                  {/* Plan Name & Tagline */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-white">
                      {plan.name}
                    </h3>
                    {!isPopular && plan.badge && (
                      <span className="text-[10px] font-heading uppercase tracking-widest text-[#B7C4C8] bg-[#0A1A1F] border border-[#1E3840] px-2.5 py-1 rounded-full">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <p className="font-body text-xs text-[#B7C4C8] mb-8 leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Price Block */}
                  <div className="mb-8 pb-8 border-b border-[#1E3840]">
                    <div className="flex items-baseline gap-1">
                      <span className="font-heading text-4xl md:text-5xl font-bold text-white tracking-tight">
                        {formatPrice(plan.price)}
                      </span>
                    </div>
                    <span className="font-body text-xs text-[#B7C4C8] mt-1 block">
                      {plan.periodLabel}
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <div className="flex flex-col gap-3.5 mb-10">
                    <span className="font-heading text-[11px] uppercase tracking-wider text-[#B7C4C8]/80 font-semibold mb-1">
                      Included Privileges:
                    </span>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs text-[#B7C4C8]">
                        <Check className="w-4 h-4 text-[#F21B35] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA Button */}
                <TransitionLink
                  href="/free-trial"
                  title="Free Trial"
                  className={`w-full py-4 rounded-full font-heading text-xs uppercase tracking-widest font-semibold text-center transition-all duration-300 relative overflow-hidden group ${
                    isPopular
                      ? "bg-white text-[#0A1A1F] hover:bg-[#F21B35] hover:text-white"
                      : "border border-[#1E3840] bg-[#0A1A1F] text-white hover:border-white"
                  }`}
                >
                  <span className="relative z-10">Select {plan.name} Tier</span>
                </TransitionLink>
              </div>
            );
          })}
        </div>

        {/* Note under pricing */}
        <div className="mt-12 text-center">
          <p className="font-body text-xs text-[#B7C4C8]/70">
            All memberships include complimentary locker access and towel service. Need corporate or family arrangements?{" "}
            <TransitionLink href="/contact" className="text-white underline hover:text-[#F21B35]">
              Contact our membership desk
            </TransitionLink>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

