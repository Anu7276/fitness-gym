import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Photo & Video Gallery | Inside Waghodia's 24/7 Gym",
  description: `Visual walkthrough of our free weights floor, cardio deck, combat cage, and luxury locker rooms at ${siteConfig.brand.name} Vadodara.`,
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: `Photo & Video Gallery | ${siteConfig.brand.name}`,
    description: `High-resolution visual tour of our 10,000+ sq.ft gym facility.`,
    url: "/gallery",
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
