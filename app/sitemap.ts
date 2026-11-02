import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fitnessgym.in";

  const routes: { path: string; priority: number; changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" }[] = [
    { path: "", priority: 1.0, changeFrequency: "daily" },
    { path: "/programs", priority: 0.9, changeFrequency: "weekly" },
    { path: "/schedule", priority: 0.9, changeFrequency: "weekly" },
    { path: "/trainers", priority: 0.85, changeFrequency: "weekly" },
    { path: "/gym", priority: 0.85, changeFrequency: "monthly" },
    { path: "/transformations", priority: 0.85, changeFrequency: "weekly" },
    { path: "/gallery", priority: 0.8, changeFrequency: "monthly" },
    { path: "/calculator", priority: 0.8, changeFrequency: "monthly" },
    { path: "/pricing", priority: 0.95, changeFrequency: "weekly" },
    { path: "/free-trial", priority: 0.95, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
    { path: "/refund-policy", priority: 0.3, changeFrequency: "yearly" },
  ];

  return routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
