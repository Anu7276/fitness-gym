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
    <section className="w-full py-28 md:py-40 bg-[#0A1A1F] text-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column (5 Cols): Heading & Contact Prompt */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F21B35]" />
              <span className="font-heading text-xs uppercase tracking-widest text-[#B7C4C8]">
                Clear Answers
              </span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase mb-6">
              Questions
            </h2>
            <p className="font-body text-base text-[#B7C4C8] leading-relaxed mb-8">
              Everything you need to know about our Waghodia facility, biometric access, and membership privileges.
            </p>
            <div className="p-6 bg-[#0F2329] border border-[#1E3840] rounded-card">
              <h4 className="font-heading text-sm uppercase tracking-wider text-white font-semibold mb-2">
                Have a specific requirement?
              </h4>
              <p className="font-body text-xs text-[#B7C4C8] mb-4 leading-relaxed">
                Speak directly with our front desk team for corporate partnerships or bespoke training requests.
              </p>
              <TransitionLink
                href="/contact"
                title="Contact"
                className="font-heading text-xs uppercase tracking-widest text-[#F21B35] font-semibold hover:underline"
              >
                Inquire With Management →
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
                    <span className="font-heading text-lg md:text-xl font-bold uppercase tracking-tight text-white">
                      {faq.question}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full border border-[#1E3840] bg-[#0A1A1F] flex items-center justify-center shrink-0 text-[#B7C4C8] transition-transform duration-350 ${
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
                        <div className="px-6 pb-6 pt-2 text-sm font-body text-[#B7C4C8] leading-relaxed border-t border-[#1E3840]/60">
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

