import type { Metadata } from "next";
import { Outfit, Manrope } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { PageTransitionProvider } from "@/components/motion/PageTransitionProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { MobileStickyBar } from "@/components/MobileStickyBar";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fitnessgym.in"),
  title: {
    default: `${siteConfig.brand.name} | 24/7 Gym in Waghodia, Vadodara`,
    template: `%s | ${siteConfig.brand.name}`,
  },
  description: `${siteConfig.brand.name} — Open 24/7 on Waghodia Road, Vadodara. 10 years of excellence in bodybuilding, cardio, yoga, CrossFit, MMA, and zumba.`,
  keywords: [
    "Gym in Vadodara",
    "24/7 Gym Waghodia",
    "Fitness Gym Vadodara",
    "CrossFit Vadodara",
    "Bodybuilding Waghodia",
    "MMA training Vadodara",
    "Yoga Vadodara",
  ],
  authors: [{ name: siteConfig.brand.name }],
  openGraph: {
    title: `${siteConfig.brand.name} | Modern 24/7 Gym in Vadodara`,
    description: siteConfig.brand.subline,
    url: "https://fitnessgym.in",
    siteName: siteConfig.brand.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.brand.name} Gym Floor`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.brand.name,
    description: siteConfig.brand.subline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthClub",
    "name": siteConfig.brand.name,
    "description": siteConfig.brand.subline,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Plot 42, Waghodia Main Road",
      "addressLocality": "Vadodara",
      "addressRegion": "Gujarat",
      "postalCode": "390019",
      "addressCountry": "IN",
    },
    "openingHours": "Mo-Su 00:00-23:59",
    "telephone": siteConfig.contact.phone,
    "url": "https://fitnessgym.in",
    "priceRange": "₹1,999 - ₹11,999",
  };

  return (
    <html lang="en" className={`${outfit.variable} ${manrope.variable} dark`}>
      <head>
        {/* Critical inline CSS to prevent preloader flash and lock initial scroll */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html { background-color: #0A1A1F; }
              html.is-loading, html.is-loading body { overflow: hidden !important; height: 100vh !important; }
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                document.documentElement.classList.add('is-loading');
              } catch(e) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body bg-[#0A1A1F] text-[#B7C4C8] antialiased min-h-screen flex flex-col">
        <PageTransitionProvider>
          <SmoothScroll>
            <Navbar />
            <div className="flex-1 w-full">{children}</div>
            <Footer />
            <FloatingWhatsApp />
            <MobileStickyBar />
          </SmoothScroll>
        </PageTransitionProvider>
      </body>
    </html>
  );
}
