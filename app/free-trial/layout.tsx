import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Claim Free 1-Day Trial Pass | No Lock-in Contracts",
  description: `Experience ${siteConfig.brand.name} Vadodara completely free. Full access to weights floor, cardio deck, group classes, and locker amenities with zero commitment.`,
  alternates: {
    canonical: "/free-trial",
  },
  openGraph: {
    title: `Free 1-Day Gym Pass | ${siteConfig.brand.name}`,
    description: `Claim your complimentary 1-day pass to train at Waghodia's premier 24/7 gym.`,
    url: "/free-trial",
  },
};

export default function FreeTrialLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

