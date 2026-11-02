"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TransitionLink } from "../motion/TransitionLink";

export function FaqSection() {
  const faqs = siteConfig.faqs;
  const [openId, setOpenId] = useState<string | null>(faqs[0].id);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full py-16 md:py-28 bg-[#0A1A1F] text-white">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column (5 Cols): Heading & Contact Prompt */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <span className="font-heading text-xs font-semibold uppercase tracking-wider text-[#B7C4C8] mb-3">
              FAQ
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
              Frequently asked questions
            </h2>
            <p className="font-body text-[15px] text-[#B7C4C8] leading-relaxed mb-8">
              Everything you need to know about our Waghodia gym, hours, memberships, and trial passes.
            </p>
            <div className="p-6 bg-[#0F2329] border border-[#1E3840] rounded-card">
              <h3 className="font-heading text-base font-bold text-white mb-2">
                Have a specific question?
              </h3>
              <p className="font-body text-xs text-[#B7C4C8] mb-4 leading-relaxed">
                Contact our desk team directly on WhatsApp or phone for immediate answers.
              </p>
              <TransitionLink
                href="/contact"
                title="Contact"
                className="font-heading text-xs uppercase tracking-wider text-white hover:text-[#F21B35] font-semibold transition-colors"
              >
                Contact our team →
              </TransitionLink>
            </div>
          </div>

          {/* Right Column (7 Cols): Accordion List */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;

              return (
                <div
                  key={faq.id}
                  className={`bg-[#0F2329] border rounded-card transition-colors duration-200 overflow-hidden ${
                    isOpen ? "border-[#F21B35]/60" : "border-[#1E3840] hover:border-[#444748]"
                  }`}
                >
                  <button
                    onClick={() => toggle(faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-heading text-base md:text-lg font-bold text-white">
                      {faq.question}
                    </span>
                    <span
                      className={`w-7 h-7 rounded-full border border-[#1E3840] bg-[#0A1A1F] flex items-center justify-center shrink-0 text-[#B7C4C8] transition-transform duration-350 ${
                        isOpen ? "rotate-45 text-[#F21B35] border-[#F21B35]" : "rotate-0"
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-6 pb-6 pt-1 text-[14px] font-body text-[#B7C4C8] leading-relaxed border-t border-[#1E3840]/60">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
