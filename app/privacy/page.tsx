import React from "react";
import { siteConfig } from "@/config/site";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Member Data Protection",
  description: `Privacy policy and member data security standards at ${siteConfig.brand.name} Vadodara.`,
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
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
            Legal &amp; Compliance
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-white mb-3 leading-[1.05]">
            Privacy Policy
          </h1>
          <p className="font-body text-xs text-[#7B8E94]">
            Effective Date: January 1, 2024 • Last Updated: November 2024 • {siteConfig.brand.legalName}
          </p>
        </div>

        {/* Content Body */}
        <div className="flex flex-col gap-8 font-body text-[15px] text-[#E5E5E5] leading-[1.6]">
          <section>
            <h2 className="font-heading text-xl font-bold text-white mb-3 uppercase leading-[1.05]">
              1. Our Privacy Commitment
            </h2>
            <p>
              At {siteConfig.brand.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), we respect your personal privacy. We collect only the information necessary to provide you with secure 24/7 gym access, personal coaching, pass reservations, and membership administration. We never sell, rent, or trade your personal or health data to third-party advertisers.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-white mb-3 uppercase leading-[1.05]">
              2. Information We Collect
            </h2>
            <p className="mb-3">
              When you submit a trial pass request, enroll in membership, or visit our facility on Waghodia Road, we may collect:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#B7C4C8]">
              <li><strong>Contact Information:</strong> Full name, mobile phone number, email address, and emergency contact details.</li>
              <li><strong>Biometric Access Data:</strong> Encrypted mathematical fingerprint templates used exclusively by our door access scanners to enable keyless 24/7 entry. We do not store raw fingerprint images.</li>
              <li><strong>Fitness Objectives:</strong> Fitness goals, health history disclosures relevant to safe exercise, and body composition benchmarks (if opted into by Pro/Elite members).</li>
              <li><strong>Payment Records:</strong> Transaction IDs and dates. We do not store credit card numbers; all digital payments are handled via secure RBI-authorized payment processors.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-white mb-3 uppercase leading-[1.05]">
              3. How We Use Your Data
            </h2>
            <ul className="list-disc list-inside space-y-2 text-[#B7C4C8]">
              <li>To issue and verify your complimentary 1-day pass or membership access.</li>
              <li>To send you appointment confirmations, trainer check-ins, or gym schedule updates via WhatsApp and SMS.</li>
              <li>To maintain safety, first aid readiness, and 24/7 premises security via CCTV recording.</li>
              <li>To resolve billing, pausing, or subscription queries.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-white mb-3 uppercase leading-[1.05]">
              4. WhatsApp &amp; Communications
            </h2>
            <p>
              We use WhatsApp strictly for direct, high-value communication such as visit confirmations, trainer assignments, and membership reminders. We do not send automated mass marketing spam. You may opt out of WhatsApp updates at any time by replying &ldquo;STOP&rdquo; or notifying our front desk.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-white mb-3 uppercase leading-[1.05]">
              5. Contact Us Regarding Your Data
            </h2>
            <p>
              If you wish to view, update, or request the deletion of your personal records from our system, please contact our Data Officer:
            </p>
            <div className="bg-[#0F2329] border border-[#1E3840] rounded-xl p-5 mt-3 text-xs font-body text-[#B7C4C8]">
              <p className="font-semibold text-white mb-1">{siteConfig.brand.legalName}</p>
              <p>Address: {siteConfig.contact.address}</p>
              <p>Email: <a href={`mailto:${siteConfig.contact.email}`} className="text-[#F21B35] underline">{siteConfig.contact.email}</a></p>
              <p>Phone: {siteConfig.contact.phone}</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
