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
    <section id="pricing" className="w-full py-14 lg:py-20 bg-[#0A1A1F] text-white">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-14">
          <span className="text-[12px] uppercase tracking-[0.15em] text-[#F21B35] font-semibold mb-2 block">
            Simple pricing
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-white mb-3 leading-[1.05]">
            Membership Plans
          </h2>
          <p className="font-body text-sm md:text-[15px] text-[#B7C4C8] max-w-lg leading-relaxed">
            Transparent rates with zero hidden enrolment fees or long-term lock-ins.
          </p>
        </div>

        {/* 3 Outlined Compact Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
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
                className={`relative bg-[#0F2329] border rounded-card p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 cursor-pointer select-none ${
                  isSelected
                    ? "border-[#F21B35] shadow-[0_0_25px_rgba(242,27,53,0.25)] ring-1 ring-[#F21B35]"
                    : "border-[#1E3840] hover:border-[#F21B35] hover:ring-1 hover:ring-[#F21B35] hover:shadow-[0_0_25px_rgba(242,27,53,0.15)]"
                }`}
              >
                {/* Popular Red Tag */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#F21B35] text-white px-3.5 py-0.5 rounded-full font-heading text-[11px] uppercase tracking-wider font-semibold">
                    {plan.badge || "Most popular"}
                  </div>
                )}

                <div>
                  {/* Plan Name & Tagline */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                      {plan.name}
                    </h3>
                    {!isPopular && plan.badge && (
                      <span className="text-[11px] font-body text-[#B7C4C8] bg-[#0A1A1F] border border-[#1E3840] px-2 py-0.5 rounded-full">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <p className="font-body text-xs sm:text-[13px] text-[#B7C4C8] mb-6 leading-relaxed line-clamp-2">
                    {plan.description}
                  </p>

                  {/* Price Block */}
                  <div className="mb-6 pb-6 border-b border-[#1E3840]">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.05]">
                        {formatPrice(plan.price)}
                      </span>
                      <span className="font-body text-xs text-[#7B8E94]">
                        /{plan.period}
                      </span>
                    </div>
                    <span className="font-body text-xs text-[#B7C4C8] mt-1 block">
                      {plan.periodLabel}
                    </span>
                    {plan.perMonthApprox && (
                      <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#25D366]/10 border border-[#25D366]/30 text-[11px] font-body font-semibold text-[#25D366]">
                        <span>⚡ {plan.perMonthApprox}</span>
                      </div>
                    )}
                  </div>

                  {/* Feature Checklist */}
                  <div className="flex flex-col gap-2.5 mb-8">
                    <span className="font-heading text-xs font-semibold uppercase tracking-wider text-white mb-0.5">
                      What is included:
                    </span>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#B7C4C8]">
                        <Check className="w-3.5 h-3.5 text-[#F21B35] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA Button */}
                <TransitionLink
                  href="/free-trial"
                  title="Free Trial"
                  className={`w-full py-3.5 rounded-full font-heading text-xs uppercase tracking-widest font-semibold text-center transition-all duration-300 relative overflow-hidden group focus-visible:ring-2 focus-visible:ring-white active:scale-95 ${
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
