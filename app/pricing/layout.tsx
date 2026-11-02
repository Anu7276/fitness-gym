import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Membership Plans & Transparent Pricing | Vadodara",
  description: `Simple, transparent gym pricing starting at ₹1,999/month. Full 24/7 keyless access, zero admission fees, and no lock-in contracts at ${siteConfig.brand.name}.`,
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: `Membership Pricing | ${siteConfig.brand.name}`,
    description: `Compare Basic, Pro, and Elite annual plans. 24/7 gym access on Waghodia Road.`,
    url: "/pricing",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
