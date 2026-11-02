"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Check, X } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function PricingPage() {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const plans = siteConfig.pricing;

  const comparisonMatrix = [
    { feature: "24/7 biometric keyless access", basic: true, pro: true, elite: true },
    { feature: "Full free weights & machine floor", basic: true, pro: true, elite: true },
    { feature: "Locker rooms & rainfall showers", basic: true, pro: true, elite: true },
    { feature: "Free equipment onboarding session", basic: true, pro: true, elite: true },
    { feature: "Unlimited access to all 6 group classes", basic: false, pro: true, elite: true },
    { feature: "Monthly personal coach check-in", basic: false, pro: true, elite: true },
    { feature: "Bi-weekly body composition measurement", basic: false, pro: true, elite: true },
    { feature: "Quarterly tailored nutrition advice", basic: false, pro: false, elite: true },
    { feature: "Permanent dedicated VIP locker", basic: false, pro: false, elite: true },
    { feature: "Complimentary gym training shirt", basic: false, pro: false, elite: true },
    { feature: "Membership freeze protection (up to 30 days)", basic: false, pro: false, elite: true },
  ];

  return (
    <main className="w-full pt-28 pb-16 md:pb-28 bg-[#0A1A1F] text-white">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14 md:mb-18">
          <span className="font-heading text-xs font-semibold uppercase tracking-wider text-[#B7C4C8] mb-3">
            Membership
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Membership plans
          </h1>
          <p className="font-body text-[15px] md:text-base text-[#B7C4C8] max-w-xl leading-relaxed">
            Choose the membership length that fits your training routine. No hidden fees or surprise renewal rates.
          </p>
        </div>

        {/* 3 Main Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-20">
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
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#F21B35] text-white px-4 py-1 rounded-full font-heading text-[11px] uppercase tracking-wider font-semibold">
                    {plan.badge || "Most popular"}
                  </div>
                )}

                <div>
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

                  <div className="mb-8 pb-8 border-b border-[#1E3840]">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-heading text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.05]">
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
                      <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#25D366]/10 border border-[#25D366]/30 text-xs font-body font-semibold text-[#25D366]">
                        <span>⚡ {plan.perMonthApprox}</span>
                      </div>
                    )}
                  </div>

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
                  Join {plan.name} plan
                </TransitionLink>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison Matrix */}
        <div className="bg-[#0F2329] border border-[#1E3840] rounded-card p-8 md:p-10 mb-16 overflow-x-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-6">
            Compare plans side-by-side
          </h2>

          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-[#1E3840] text-xs font-heading uppercase tracking-wider text-[#B7C4C8]">
                <th className="py-4 font-semibold">Features</th>
                <th className="py-4 text-center font-semibold">Basic (₹1,999/mo)</th>
                <th className="py-4 text-center font-semibold text-white">Pro (₹5,999/qtr)</th>
                <th className="py-4 text-center font-semibold">Elite (₹11,999/yr)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E3840]/60 text-sm font-body">
              {comparisonMatrix.map((row, i) => (
                <tr key={i} className="hover:bg-[#0A1A1F]/40 transition-colors">
                  <td className="py-3.5 text-[#B7C4C8]">{row.feature}</td>
                  <td className="py-3.5 text-center">
                    {row.basic ? (
                      <Check className="w-4 h-4 text-white inline-block" />
                    ) : (
                      <X className="w-4 h-4 text-[#B7C4C8]/30 inline-block" />
                    )}
                  </td>
                  <td className="py-3.5 text-center bg-[#F21B35]/5">
                    {row.pro ? (
                      <Check className="w-4 h-4 text-[#F21B35] inline-block font-bold" />
                    ) : (
                      <X className="w-4 h-4 text-[#B7C4C8]/30 inline-block" />
                    )}
                  </td>
                  <td className="py-3.5 text-center">
                    {row.elite ? (
                      <Check className="w-4 h-4 text-white inline-block" />
                    ) : (
                      <X className="w-4 h-4 text-[#B7C4C8]/30 inline-block" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Corporate / Small Group Rates */}
        <div className="p-8 bg-[#0F2329] border border-[#1E3840] rounded-card flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading text-xl font-bold text-white mb-1">
              Corporate & Small Group Memberships
            </h3>
            <p className="font-body text-sm text-[#B7C4C8] max-w-xl leading-relaxed">
              We offer wellness plans for local Vadodara businesses, teams, and families.
            </p>
          </div>
          <TransitionLink
            href="/contact"
            title="Contact"
            className="px-7 py-3 rounded-full border border-[#1E3840] bg-[#0A1A1F] text-white font-heading text-xs uppercase tracking-wider font-semibold hover:border-white transition-colors shrink-0"
          >
            Inquire group rates
          </TransitionLink>
        </div>
      </div>
    </main>
  );
}
