"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import { MessageCircle } from "lucide-react";

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
      className="fixed bottom-20 md:bottom-8 right-6 z-40 hidden sm:flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] text-white shadow-lg hover:brightness-110 active:scale-95 transition-all duration-200 group"
    >
      <MessageCircle className="w-5 h-5 fill-white stroke-none" />
      <span className="font-heading text-xs uppercase tracking-wider font-semibold">
        WhatsApp
      </span>
    </a>
  );
}

