"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Check, X } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function PricingPage() {
  const plans = siteConfig.pricing;

  // Comparison feature list
  const comparisonMatrix = [
    { feature: "24/7 Biometric Keyless Access", basic: true, pro: true, elite: true },
    { feature: "Full Free Weights & Plate-Loaded Floor", basic: true, pro: true, elite: true },
    { feature: "Lockers & Hot Rainfall Showers", basic: true, pro: true, elite: true },
    { feature: "Free Fitness & Machine Orientation", basic: true, pro: true, elite: true },
    { feature: "Unlimited Access to 6 Group Classes", basic: false, pro: true, elite: true },
    { feature: "Monthly Personal Trainer Consultation", basic: false, pro: true, elite: true },
    { feature: "Bi-Weekly Body Composition & InBody Check", basic: false, pro: true, elite: true },
    { feature: "Quarterly Tailored Nutrition Macro Plan", basic: false, basicNote: "-", pro: false, elite: true },
    { feature: "Permanent Dedicated VIP Locker", basic: false, pro: false, elite: true },
    { feature: "Official FITNESSGYM Performance Kit", basic: false, pro: false, elite: true },
    { feature: "Membership Freeze Protection (Up to 30 Days)", basic: false, pro: false, elite: true },
  ];

  return (
    <main className="w-full pt-32 pb-28 md:pb-40 bg-[#0A1A1F] text-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F21B35]" />
            <span className="font-heading text-xs uppercase tracking-widest text-[#B7C4C8]">
              Transparent Membership
            </span>
          </div>
          <h1 className="font-heading text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white uppercase mb-6">
            Membership Plans
          </h1>
          <p className="font-body text-base md:text-xl text-[#B7C4C8] max-w-2xl leading-relaxed">
            Choose the commitment level that matches your training cadence. No registration surcharges,
            no surprise renewal fees.
          </p>
        </div>

        {/* 3 Main Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-24">
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
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#F21B35] text-white px-4 py-1 rounded-full font-heading text-[10px] uppercase tracking-widest font-bold">
                    {plan.badge || "Most Popular"}
                  </div>
                )}

                <div>
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

                  <div className="flex flex-col gap-3.5 mb-10">
                    <span className="font-heading text-[11px] uppercase tracking-wider text-[#B7C4C8]/80 font-semibold mb-1">
                      Privileges:
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
                  className={`w-full py-4 rounded-full font-heading text-xs uppercase tracking-widest font-semibold text-center transition-all duration-300 ${
                    isPopular
                      ? "bg-white text-[#0A1A1F] hover:bg-[#F21B35] hover:text-white"
                      : "border border-[#1E3840] bg-[#0A1A1F] text-white hover:border-white"
                  }`}
                >
                  Join {plan.name} Tier
                </TransitionLink>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison Matrix */}
        <div className="bg-[#0F2329] border border-[#1E3840] rounded-card p-8 md:p-12 mb-20 overflow-x-auto">
          <h3 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-8">
            Side-By-Side Comparison
          </h3>

          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-[#1E3840] text-xs font-heading uppercase tracking-wider text-[#B7C4C8]">
                <th className="py-4 font-semibold">Tier Features</th>
                <th className="py-4 text-center font-semibold">Basic (₹1,999/mo)</th>
                <th className="py-4 text-center font-semibold text-white">Pro (₹5,999/qtr)</th>
                <th className="py-4 text-center font-semibold">Elite (₹11,999/yr)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E3840]/60 text-sm font-body">
              {comparisonMatrix.map((row, i) => (
                <tr key={i} className="hover:bg-[#0A1A1F]/40 transition-colors">
                  <td className="py-4 text-[#B7C4C8]">{row.feature}</td>
                  <td className="py-4 text-center">
                    {row.basic ? (
                      <Check className="w-4 h-4 text-white inline-block" />
                    ) : (
                      <X className="w-4 h-4 text-[#B7C4C8]/30 inline-block" />
                    )}
                  </td>
                  <td className="py-4 text-center bg-[#F21B35]/5">
                    {row.pro ? (
                      <Check className="w-4 h-4 text-[#F21B35] inline-block font-bold" />
                    ) : (
                      <X className="w-4 h-4 text-[#B7C4C8]/30 inline-block" />
                    )}
                  </td>
                  <td className="py-4 text-center">
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

        {/* Corporate / Bespoke Plans */}
        <div className="p-10 bg-[#06151A] border border-[#1E3840] rounded-card flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-heading text-2xl font-bold uppercase tracking-tight text-white mb-2">
              Corporate & Small Group Memberships
            </h4>
            <p className="font-body text-sm text-[#B7C4C8] max-w-xl leading-relaxed">
              We offer customized wellness packages for local Vadodara businesses, sports teams, and families.
            </p>
          </div>
          <TransitionLink
            href="/contact"
            title="Contact"
            className="px-8 py-3.5 rounded-full border border-[#1E3840] bg-[#0F2329] text-white font-heading text-xs uppercase tracking-widest font-semibold hover:border-white transition-colors shrink-0"
          >
            Inquire Group Rates
          </TransitionLink>
        </div>
      </div>
    </main>
  );
}

