import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Class Schedule & Timetable | Daily Group Fitness Classes",
  description: `Complete weekly class timetable for Bodybuilding, CrossFit, Yoga, MMA & Zumba at ${siteConfig.brand.name} Waghodia Road, Vadodara. 24/7 gym floor access.`,
  alternates: {
    canonical: "/schedule",
  },
  openGraph: {
    title: `Class Timetable | ${siteConfig.brand.name}`,
    description: `Morning and evening coached workout classes across 6 zones. Keyless biometric entry 24 hours every day.`,
    url: "/schedule",
  },
};

export default function ScheduleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
