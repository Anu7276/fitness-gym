import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Certified Coaches & Personal Trainers | Vadodara",
  description: `Meet our certified coaching faculty at ${siteConfig.brand.name}. Specialists in CSCS barbell mechanics, RYT-500 yoga, CrossFit L2, and combat striking.`,
  alternates: {
    canonical: "/trainers",
  },
  openGraph: {
    title: `Expert Trainers | ${siteConfig.brand.name}`,
    description: `Personal coaching and structured form guidance in Waghodia, Vadodara.`,
    url: "/trainers",
  },
};

export default function TrainersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
