"use client";

import React, { useState } from "react";
import { Preloader } from "@/components/Preloader";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { Intro } from "@/components/home/Intro";
import { ProgramsSection } from "@/components/home/ProgramsSection";
import { TwentyFourHours } from "@/components/home/TwentyFourHours";
import { TrainersSection } from "@/components/home/TrainersSection";
import { MethodTimeline } from "@/components/home/MethodTimeline";
import { PricingSection } from "@/components/home/PricingSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCta } from "@/components/home/FinalCta";

export default function HomePage() {
  const [heroCanAnimate, setHeroCanAnimate] = useState(false);

  return (
    <main className="w-full bg-[#0A1A1F]">
      {/* 1. Rebuilt GSAP Preloader with 120px Rep Dumbbell & Letter Wordmark */}
      <Preloader onComplete={() => setHeroCanAnimate(true)} />

      {/* 2. Hero Section (Clearly visible photo, balanced 48% overlay, line-by-line reveal) */}
      <Hero startAnimation={heroCanAnimate} />

      {/* 3. Program Marquee Strip */}
      <Marquee />

      {/* 4. About Us (Text left, two offset photos right, verified 10-year numbers only) */}
      <Intro />

      {/* 5. Programs (Photo band + six cards) */}
      <ProgramsSection />

      {/* 6. 24-Hour Rhythm Dial (Interactive scrubber & pinned scroll) */}
      <TwentyFourHours />

      {/* 7. Trainers Carousel (Draggable row with drag cursor) */}
      <TrainersSection />

      {/* 8. How We Train Timeline (4 pillars with rotating badge) */}
      <MethodTimeline />

      {/* 9. Membership (Three outlined cards, Pro highlighted) */}
      <PricingSection />

      {/* 10. Reviews (Three real verified testimonials) */}
      <ReviewsSection />

      {/* 11. FAQ (Two columns with animated accordion) */}
      <FaqSection />

      {/* 12. Final Call to Action with Short Free-Trial Form */}
      <FinalCta />
    </main>
  );
}
