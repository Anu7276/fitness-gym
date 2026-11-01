"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { TransitionLink } from "../motion/TransitionLink";
import { Check } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export function PricingSection() {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const plans = siteConfig.pricing;

  return (
    <section id="pricing" className="w-full py-16 md:py-28 bg-[#0A1A1F] text-white">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 md:mb-20">
          <span className="font-heading text-xs font-semibold uppercase tracking-wider text-[#B7C4C8] mb-3">
            Simple pricing
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Membership plans
          </h2>
          <p className="font-body text-[15px] text-[#B7C4C8] max-w-lg leading-relaxed">
            Transparent rates with zero hidden enrolment fees or long-term lock-ins.
          </p>
        </div>

        {/* 3 Outlined Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const isPopular = plan.popular;
            const isSelected = selectedPlanId === plan.id;

            return (
              <div
                key={plan.id}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                onClick={() => setSelectedPlanId(isSelected ? null : plan.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedPlanId(isSelected ? null : plan.id);
                  }
                }}
                className={`relative bg-[#0F2329] border rounded-card p-8 md:p-10 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 cursor-pointer select-none ${
                  isSelected
                    ? "border-[#F21B35] shadow-[0_0_25px_rgba(242,27,53,0.25)] ring-1 ring-[#F21B35]"
                    : "border-[#1E3840] hover:border-[#F21B35] hover:ring-1 hover:ring-[#F21B35] hover:shadow-[0_0_25px_rgba(242,27,53,0.15)]"
                }`}
              >
                {/* Popular Red Tag */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#F21B35] text-white px-4 py-1 rounded-full font-heading text-[11px] uppercase tracking-wider font-semibold">
                    {plan.badge || "Most popular"}
                  </div>
                )}

                <div>
                  {/* Plan Name & Tagline */}
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-heading text-2xl font-bold text-white">
                      {plan.name}
                    </h3>
                    {!isPopular && plan.badge && (
                      <span className="text-xs font-body text-[#B7C4C8] bg-[#0A1A1F] border border-[#1E3840] px-2.5 py-0.5 rounded-full">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <p className="font-body text-[14px] text-[#B7C4C8] mb-8 leading-relaxed">
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
                    <span className="font-heading text-xs font-semibold uppercase tracking-wider text-white mb-1">
                      What is included:
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
                  className={`w-full py-4 rounded-full font-heading text-xs uppercase tracking-widest font-semibold text-center transition-all duration-300 relative overflow-hidden group focus-visible:ring-2 focus-visible:ring-white active:scale-95 ${
                    isSelected
                      ? "bg-[#F21B35] text-white shadow-lg shadow-[#F21B35]/30"
                      : isPopular
                      ? "bg-white text-[#0A1A1F] hover:bg-[#F21B35] hover:text-white"
                      : "border border-[#1E3840] bg-[#0A1A1F] text-white hover:border-white hover:bg-white hover:text-[#0A1A1F]"
                  }`}
                >
                  <span className="relative z-10">Choose {plan.name}</span>
                </TransitionLink>
              </div>
            );
          })}
        </div>

        {/* Note under pricing */}
        <div className="mt-10 text-center">
          <p className="font-body text-xs text-[#B7C4C8]">
            Need a corporate partnership or student plan?{" "}
            <TransitionLink href="/contact" className="text-white underline hover:text-[#F21B35]">
              Contact our front desk
            </TransitionLink>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
