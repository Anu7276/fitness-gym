import type { Metadata } from "next";
import { Barlow_Condensed, Manrope } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { PageTransitionProvider } from "@/components/motion/PageTransitionProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { MobileStickyBar } from "@/components/MobileStickyBar";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
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
    "legalName": siteConfig.brand.legalName,
    "description": siteConfig.brand.subline,
    "url": "https://fitnessgym.in",
    "telephone": siteConfig.contact.phone,
    "email": siteConfig.contact.email,
    "image": "https://fitnessgym.in/images/hero.jpg",
    "hasMap": siteConfig.contact.mapUrl,
    "priceRange": "₹1,999 - ₹11,999",
    "openingHours": "Mo-Su 00:00-23:59",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Plot 42, Waghodia Main Road, Near Waghodia Chowkdi",
      "addressLocality": "Vadodara",
      "addressRegion": "Gujarat",
      "postalCode": "390019",
      "addressCountry": "IN",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 22.3072,
      "longitude": 73.2356,
    },
    "sameAs": [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.social.youtube,
    ],
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "24/7 Keyless Access", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Hot Rainfall Showers", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Personal Training Coaches", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Free On-Site Parking", "value": true },
    ],
  };

  return (
    <html lang="en" className={`${barlowCondensed.variable} ${manrope.variable} dark`}>
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
