"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ReviewsSection() {
  const reviews = siteConfig.testimonials;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto advance every 5s unless paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, reviews.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  return (
    <section className="w-full py-28 md:py-40 bg-[#06151A] text-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header with Google-Style Rating Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F21B35]" />
              <span className="font-heading text-xs uppercase tracking-widest text-[#B7C4C8]">
                Member Stories
              </span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase">
              What Our Members Say
            </h2>
          </div>

          {/* Google Style Rating Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#0F2329] border border-[#1E3840]">
            <div className="flex gap-1 text-[#F21B35]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#F21B35] stroke-none" />
              ))}
            </div>
            <span className="font-heading text-xs uppercase tracking-wider text-white font-semibold">
              5.0 Star Rating • Waghodia
            </span>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="relative max-w-4xl mx-auto"
        >
          <div className="min-h-[260px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={reviews[currentIndex].id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full bg-[#0F2329] border border-[#1E3840] rounded-card p-8 md:p-12 shadow-xl"
              >
                {/* Star Row */}
                <div className="flex gap-1 mb-6 text-[#F21B35]">
                  {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F21B35] stroke-none" />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-body text-base md:text-xl text-white leading-relaxed mb-8 italic">
                  &ldquo;{reviews[currentIndex].quote}&rdquo;
                </p>

                {/* Author Info */}
                <div className="flex items-center justify-between border-t border-[#1E3840] pt-6">
                  <div>
                    <h4 className="font-heading text-lg font-bold uppercase tracking-tight text-white">
                      {reviews[currentIndex].author}
                    </h4>
                    <p className="font-body text-xs text-[#B7C4C8]">
                      {reviews[currentIndex].role} • {reviews[currentIndex].date}
                    </p>
                  </div>
                  <span className="font-heading text-[10px] uppercase tracking-widest text-[#B7C4C8]/60">
                    Verified Google Review
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? "w-8 bg-[#F21B35]" : "w-2 bg-[#1E3840]"
                  }`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-[#1E3840] bg-[#0F2329] flex items-center justify-center text-white hover:border-white transition-colors"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-[#1E3840] bg-[#0F2329] flex items-center justify-center text-white hover:border-white transition-colors"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

