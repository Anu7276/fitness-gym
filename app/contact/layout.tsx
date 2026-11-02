import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact & Location | Waghodia Main Road, Vadodara",
  description: `Visit ${siteConfig.brand.name} on Waghodia Main Road, near Waghodia Chowkdi in Vadodara. Call +91 98250 12345, chat on WhatsApp, or get driving directions.`,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `Contact & Directions | ${siteConfig.brand.name}`,
    description: `Open 24/7 on Waghodia Main Road with dedicated member parking. Get directions.`,
    url: "/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
