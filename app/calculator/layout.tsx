import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Free BMI & Daily Calorie Calculator (TDEE) | Vadodara",
  description: `Calculate your Body Mass Index (BMI), daily maintenance calories (TDEE), and target macronutrient splits (protein, carbs, fats) with ${siteConfig.brand.name}.`,
  alternates: {
    canonical: "/calculator",
  },
  openGraph: {
    title: `BMI & Calorie Calculator | ${siteConfig.brand.name}`,
    description: `Scientific fitness calculators to find your ideal weight and daily calorie target.`,
    url: "/calculator",
  },
};

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

