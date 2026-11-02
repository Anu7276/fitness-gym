import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "10,000+ Sq.Ft Facility & Equipment Tour | Waghodia Road",
  description: `Tour the 6 training zones of ${siteConfig.brand.name} in Vadodara: calibrated Olympic barbells, motorless treadmills, combat cage, and hot rainfall showers.`,
  alternates: {
    canonical: "/gym",
  },
  openGraph: {
    title: `Gym Facility & Equipment | ${siteConfig.brand.name}`,
    description: `10,000+ sq.ft modern fitness floor with keyless 24/7 entry on Waghodia Main Road.`,
    url: "/gym",
  },
};

export default function GymLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
