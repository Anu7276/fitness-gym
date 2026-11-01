"use client";

import React, { useState } from "react";
import { Preloader } from "@/components/Preloader";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { Marquee } from "@/components/home/Marquee";
import { ProgramsSection } from "@/components/home/ProgramsSection";
import { TrainersSection } from "@/components/home/TrainersSection";
import { MethodTimeline } from "@/components/home/MethodTimeline";
import { TwentyFourHours } from "@/components/home/TwentyFourHours";
import { PricingSection } from "@/components/home/PricingSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCta } from "@/components/home/FinalCta";

export default function HomePage() {
  const [heroCanAnimate, setHeroCanAnimate] = useState(false);

  return (
    <main className="w-full bg-[#0A1A1F]">
      {/* Preloader with circular clip-path mask exit */}
      <Preloader onComplete={() => setHeroCanAnimate(true)} />

      {/* Hero Section */}
      <Hero startAnimation={heroCanAnimate} />

      {/* Intro Sanctuary Section */}
      <Intro />

      {/* Marquee Strip */}
      <Marquee />

      {/* Programs Bento & Expandable Photo Band */}
      <ProgramsSection />

      {/* Trainers Carousel */}
      <TrainersSection />

      {/* Method 4 Pillars Timeline */}
      <MethodTimeline />

      {/* Signature 24-Hours Clock Dial Pinned Scroll Moment */}
      <TwentyFourHours />

      {/* Pricing / Membership */}
      <PricingSection />

      {/* Real Member Testimonials */}
      <ReviewsSection />

      {/* FAQ Section */}
      <FaqSection />

      {/* Final Action CTA */}
      <FinalCta />
    </main>
  );
}

