"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { Preloader } from "@/components/Preloader";
import { Hero } from "@/components/home/Hero";
import { StatsStrip } from "@/components/home/StatsStrip";
import { ProgramsSection } from "@/components/home/ProgramsSection";
import { TrainersSection } from "@/components/home/TrainersSection";
import { PricingSection } from "@/components/home/PricingSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCta } from "@/components/home/FinalCta";

export default function HomePage() {
  const [heroCanAnimate, setHeroCanAnimate] = useState(false);
  const sections = siteConfig.sections || {
    hero: true,
    stats: true,
    programs: true,
    trainers: true,
    pricing: true,
    reviews: true,
    faq: false,
    cta: true,
  };

  return (
    <main className="w-full bg-[#0A1A1F]">
      {/* 3D Rep Dumbbell Preloader */}
      <Preloader onComplete={() => setHeroCanAnimate(true)} />

      {/* 1. Hero Section (min-h-[85svh], line-by-line reveal) */}
      {sections.hero && <Hero startAnimation={heroCanAnimate} />}

      {/* 2. Stats Strip (3 benefit lines + 4 verified stat counters) */}
      {sections.stats && <StatsStrip />}

      {/* 3. Programs Preview (3 cards + View All, horizontal scroll-snap on mobile) */}
      {sections.programs && <ProgramsSection />}

      {/* 4. Trainers Preview (3 coaches + Meet the Team, horizontal scroll-snap on mobile) */}
      {sections.trainers && <TrainersSection />}

      {/* 5. Pricing (3 compact cards with approx monthly breakdown) */}
      {sections.pricing && <PricingSection />}

      {/* 6. Member Reviews (Single carousel with Google 4.9 rating badge) */}
      {sections.reviews && <ReviewsSection />}

      {/* 7. Optional Home FAQ (Disabled by default, full FAQ lives on /contact) */}
      {sections.faq && <FaqSection />}

      {/* 8. Final CTA with 1-Day Trial Form */}
      {sections.cta && <FinalCta />}
    </main>
  );
}
