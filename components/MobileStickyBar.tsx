"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import { TransitionLink } from "./motion/TransitionLink";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";

export function MobileStickyBar() {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    `Hello ${siteConfig.brand.name}, I would like to enquire about memberships.`
  )}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#0A1A1F]/95 backdrop-blur-md border-t border-[#1E3840] px-4 py-3 flex items-center justify-between gap-3">
      {/* Call Button */}
      <a
        href={`tel:${siteConfig.contact.phone}`}
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full border border-[#1E3840] bg-[#0F2329] text-white text-xs font-heading uppercase tracking-wider font-medium active:scale-95 transition-transform"
      >
        <Phone className="w-3.5 h-3.5 text-[#F21B35]" />
        <span>Call</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full border border-[#1E3840] bg-[#0F2329] text-white text-xs font-heading uppercase tracking-wider font-medium active:scale-95 transition-transform"
      >
        <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
        <span>WhatsApp</span>
      </a>

      {/* Join Button */}
      <TransitionLink
        href="/free-trial"
        title="Free Trial"
        className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-full bg-white text-[#0A1A1F] text-xs font-heading uppercase tracking-wider font-semibold active:scale-95 transition-transform"
      >
        <span>Join</span>
        <ArrowRight className="w-3 h-3 text-[#F21B35]" />
      </TransitionLink>
    </div>
  );
}

