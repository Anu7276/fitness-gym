import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Training Programs | Bodybuilding, Yoga, CrossFit, MMA & Zumba",
  description: `Explore all 6 signature training programs at ${siteConfig.brand.name} Vadodara. Structured progressive overload, HIIT, martial striking, and mobility.`,
  alternates: {
    canonical: "/programs",
  },
  openGraph: {
    title: `Fitness Programs | ${siteConfig.brand.name}`,
    description: `Hypertrophy, cardio conditioning, yoga flexibility, and combat fitness in Waghodia, Vadodara.`,
    url: "/programs",
  },
};

export default function ProgramsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

