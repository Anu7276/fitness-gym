import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Member Transformations & Before-After Results | Vadodara",
  description: `Real fitness transformations from members at ${siteConfig.brand.name} Vadodara. Verified fat loss, muscle building, and health turnaround stories.`,
  alternates: {
    canonical: "/transformations",
  },
  openGraph: {
    title: `Member Transformations | ${siteConfig.brand.name}`,
    description: `See real before/after physical results from consistent 24/7 training in Waghodia.`,
    url: "/transformations",
  },
};

export default function TransformationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

