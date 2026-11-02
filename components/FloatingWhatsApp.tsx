"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function FloatingWhatsApp() {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    `Hello ${siteConfig.brand.name}, I would like to enquire about memberships and the 1-Day Trial Pass.`
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-8 right-8 z-40 hidden md:flex w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl items-center justify-center hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200 group focus-visible:ring-2 focus-visible:ring-white"
    >
      <WhatsAppIcon className="w-7 h-7 fill-white" />
      {/* Tooltip on desktop hover */}
      <span className="absolute right-16 px-3 py-1.5 rounded-lg bg-[#0A1A1F] border border-[#1E3840] text-xs font-body text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
        Chat on WhatsApp
      </span>
    </a>
  );
}
