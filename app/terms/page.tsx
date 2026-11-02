import React from "react";
import { siteConfig } from "@/config/site";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Member Guidelines",
  description: `Gym rules, code of conduct, and membership terms at ${siteConfig.brand.name} Vadodara.`,
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
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
            Member rules &amp; agreement
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-white mb-3 leading-[1.05]">
            Terms of Service
          </h1>
          <p className="font-body text-xs text-[#7B8E94]">
            Effective Date: January 1, 2024 • {siteConfig.brand.legalName} • Waghodia Road, Vadodara
          </p>
        </div>

        {/* Content Body */}
        <div className="flex flex-col gap-8 font-body text-[15px] text-[#E5E5E5] leading-[1.6]">
          <section>
            <h2 className="font-heading text-xl font-bold text-white mb-3 uppercase leading-[1.05]">
              1. General Membership &amp; Eligibility
            </h2>
            <p>
              By accessing or using the facilities of {siteConfig.brand.legalName}, you agree to abide by these Terms of Service. Members must be at least 16 years of age. Members aged 16-17 require a parent or legal guardian signature on enrollment.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-white mb-3 uppercase leading-[1.05]">
              2. 24/7 Access &amp; Biometric Security
            </h2>
            <p className="mb-3">
              Your keyless biometric access credential is strictly non-transferable.
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#B7C4C8]">
              <li>You may not allow non-members or unverified guests to enter through your biometric scan without prior front desk approval (&ldquo;tailgating&rdquo;).</li>
              <li>Unauthorized access sharing carries an immediate revocation of membership privileges without refund.</li>
              <li>CCTV monitoring is in continuous 24/7 operation throughout training zones for member safety and asset protection.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-white mb-3 uppercase leading-[1.05]">
              3. Gym Floor Etiquette &amp; Hygiene Rules
            </h2>
            <ul className="list-disc list-inside space-y-2 text-[#B7C4C8]">
              <li><strong>Footwear:</strong> Clean athletic indoor shoes are mandatory. Street shoes, sandals, slippers, or bare feet are prohibited on the gym floor.</li>
              <li><strong>Reracking Weights:</strong> All dumbbells, barbells, and weight plates must be returned to their designated racks immediately after use.</li>
              <li><strong>Sanitizing Benches:</strong> Please wipe down benches and machine pads after use using the disinfectant wipes provided.</li>
              <li><strong>Dropping Weights:</strong> Olympic drops are permitted only on designated shock-absorbing rubber lifting platforms using bumper plates.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-white mb-3 uppercase leading-[1.05]">
              4. Health &amp; Physical Fitness Disclaimer
            </h2>
            <p>
              Physical exercise carries inherent risks. You acknowledge that you are in suitable physical condition to engage in resistance, cardiovascular, or combat training. If you have preexisting cardiovascular, joint, or respiratory conditions, you are strongly advised to obtain medical clearance prior to joining.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-white mb-3 uppercase leading-[1.05]">
              5. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These terms are governed by the laws of India. Any disputes arising in connection with gym membership shall be subject to the exclusive jurisdiction of the competent courts in Vadodara, Gujarat.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
