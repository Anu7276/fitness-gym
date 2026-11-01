"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import { TransitionLink } from "./motion/TransitionLink";

export function Footer() {
  return (
    <footer className="w-full bg-[#06151A] border-t border-[#1E3840] py-16">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2 font-heading text-2xl font-bold tracking-tight text-white uppercase">
              <svg
                width="32"
                height="16"
                viewBox="0 0 48 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="2" y="4" width="4" height="16" rx="1" fill="#FFFFFF" />
                <rect x="8" y="1" width="4" height="22" rx="1" fill="#FFFFFF" />
                <rect x="12" y="10" width="24" height="4" rx="2" fill="#F21B35" />
                <rect x="36" y="1" width="4" height="22" rx="1" fill="#FFFFFF" />
                <rect x="42" y="4" width="4" height="16" rx="1" fill="#FFFFFF" />
              </svg>
              <span>{siteConfig.brand.name}</span>
            </div>
            <p className="font-body text-sm text-[#B7C4C8] max-w-sm leading-relaxed">
              {siteConfig.brand.introSummary}
            </p>
            <div className="flex items-center gap-2 text-xs font-heading uppercase tracking-widest text-[#B7C4C8]/80 mt-2">
              <span className="w-2 h-2 rounded-full bg-[#F21B35] animate-pulse" />
              <span>{siteConfig.brand.badge}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="font-heading text-xs uppercase tracking-widest text-white font-semibold mb-2">
              Navigation
            </h4>
            {siteConfig.navigation.map((item) => (
              <TransitionLink
                key={item.href}
                href={item.href}
                title={item.title}
                className="font-body text-sm text-[#B7C4C8] hover:text-white transition-colors duration-200"
              >
                {item.name}
              </TransitionLink>
            ))}
            <TransitionLink
              href="/free-trial"
              title="Free Trial"
              className="font-body text-sm text-[#F21B35] hover:underline"
            >
              1-Day VIP Pass
            </TransitionLink>
          </div>

          {/* Location & Hours */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <h4 className="font-heading text-xs uppercase tracking-widest text-white font-semibold mb-2">
              Sanctuary Location
            </h4>
            <p className="font-body text-sm text-[#B7C4C8] leading-relaxed">
              {siteConfig.contact.address}
              <br />
              <span className="text-white/80">{siteConfig.contact.landmark}</span>
            </p>
            <p className="font-body text-xs text-[#B7C4C8]/80 mt-1">
              Hours: <span className="text-white">{siteConfig.contact.hours}</span>
            </p>
            <p className="font-body text-xs text-[#B7C4C8]/80">
              Phone:{" "}
              <a href={`tel:${siteConfig.contact.phone}`} className="text-white hover:underline">
                {siteConfig.contact.phoneFormatted}
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1E3840]/60 flex flex-col md:flex-row items-center justify-between gap-4 font-body text-xs text-[#B7C4C8]/70">
          <div>
            © {new Date().getFullYear()} {siteConfig.brand.legalName}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Waghodia, Vadodara, Gujarat</span>
            <span>•</span>
            <span className="text-white/60">White-Label Architecture v2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

