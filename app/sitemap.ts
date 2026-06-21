import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://alexchea318.github.io/CV";
  return [
    { url: `${base}/ru/`, alternates: { languages: { en: `${base}/en/` } } },
    { url: `${base}/en/` },
  ];
}
