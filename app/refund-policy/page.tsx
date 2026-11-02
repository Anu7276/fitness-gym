import React from "react";
import { siteConfig } from "@/config/site";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { ArrowLeft, Clock, ShieldCheck, Check } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Freeze Policy | Flexible Membership",
  description: `Membership pause, travel freeze, and cancellation rules at ${siteConfig.brand.name} Vadodara.`,
  alternates: {
    canonical: "/refund-policy",
  },
};

export default function RefundPolicyPage() {
  return (
    <main className="w-full pt-28 pb-16 md:pb-28 bg-[#0A1A1F] text-white">
      <div className="max-w-[880px] mx-auto px-6 md:px-10">
        {/* Breadcrumb / Back Link */}
        <div className="mb-8">
          <TransitionLink
            href="/"
            title="Home"
            className="inline-flex items-center gap-2 text-xs font-heading uppercase tracking-wider text-[#B7C4C8] hover:text-[#F21B35] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </TransitionLink>
        </div>

        {/* Header */}
        <div className="mb-12 border-b border-[#1E3840] pb-8">
          <span className="text-[12px] uppercase tracking-[0.15em] text-[#F21B35] font-semibold mb-3 block">
            Flexible membership rules
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-white mb-3 leading-[1.05]">
            Refund &amp; Membership Freeze Policy
          </h1>
          <p className="font-body text-xs text-[#7B8E94]">
            Effective Date: January 1, 2024 • {siteConfig.brand.legalName} • Waghodia Road, Vadodara
          </p>
        </div>

        {/* Content Body */}
        <div className="flex flex-col gap-8 font-body text-[15px] text-[#E5E5E5] leading-[1.6]">
          <section>
            <h2 className="font-heading text-xl font-bold text-white mb-3 uppercase leading-[1.05]">
              1. Transparent Pricing, Zero Surprise Fees
            </h2>
            <p>
              At {siteConfig.brand.legalName}, we pride ourselves on honest, straightforward membership pricing. There are no registration surcharges, locker fees, or annual maintenance charges. The fee quoted on our membership plans is all-inclusive.
            </p>
          </section>

          <section className="bg-[#0F2329] border border-[#1E3840] rounded-card p-6 md:p-8">
            <div className="flex items-center gap-2 text-[#25D366] mb-3">
              <Clock className="w-5 h-5" />
              <h2 className="font-heading text-xl font-bold text-white uppercase leading-[1.05]">
                2. Membership Freeze (Pause) Policy
              </h2>
            </div>
            <p className="text-sm text-[#B7C4C8] mb-4">
              We understand that work travel, academic exams, family emergencies, or medical illness happen. We allow generous membership pauses so you never lose the days you paid for:
            </p>
            <div className="space-y-3 text-xs text-[#E5E5E5]">
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                <span><strong>Elite Annual Plan:</strong> Includes up to <strong>30 days of free membership freeze</strong> per annual cycle. You may split this into two separate holds (e.g. 15 days + 15 days).</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                <span><strong>Pro Quarterly Plan:</strong> Includes up to <strong>10 days of free freeze</strong> per 3-month cycle.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                <span><strong>Medical Hold:</strong> Members presenting a doctor&apos;s note for surgical recovery or major illness can request an extended pause of up to 60 days at the management&apos;s discretion.</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-white mb-3 uppercase leading-[1.05]">
              3. Refund &amp; Cancellation Policy
            </h2>
            <p className="mb-3">
              Because gym memberships allocate floor capacity, trainer scheduling, and biometric database slots:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#B7C4C8]">
              <li><strong>Try Before You Buy:</strong> We offer a complimentary, zero-commitment <strong>1-Day Trial Pass</strong> to every prospective member so you can experience our facility completely free before spending a single rupee.</li>
              <li><strong>Monthly Plans:</strong> Monthly memberships are non-refundable once activated. You may cancel at the end of any monthly cycle with zero cancellation fees.</li>
              <li><strong>Relocation / Transferability:</strong> If you permanently relocate outside of Vadodara during an annual Elite plan, you may transfer the remaining balance of your membership to an immediate family member or friend for a nominal administrative transfer fee of ₹500.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-white mb-3 uppercase leading-[1.05]">
              4. How to Request a Membership Pause
            </h2>
            <p>
              To freeze your membership, simply inform our front desk at least 48 hours prior to your travel date or send a message on WhatsApp to <a href={`https://wa.me/${siteConfig.contact.whatsappNumber}`} className="text-[#25D366] underline font-semibold">+{siteConfig.contact.phoneFormatted}</a> with your member ID and requested start/end dates.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
