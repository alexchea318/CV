import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { displayFont, GeistSans } from "../fonts";
import { isLocale, pick, type Locale } from "@/lib/i18n";
import { profile } from "@/content/profile";
import { JsonLd } from "./JsonLd";
import { SITE_URL } from "@/lib/config";

export function generateStaticParams() {
  return [{ lang: "ru" }, { lang: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const locale = lang as Locale;
  const title = `${pick(profile.name, locale)} — ${pick(profile.role, locale)}`;
  const description = pick(profile.tagline, locale);
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
      images: [profile.photo],
    },
    twitter: { card: "summary_large_image", title, description },
    alternates: { languages: { ru: "/ru/", en: "/en/" } },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  return (
    <html lang={lang} className={`${displayFont.variable} ${GeistSans.variable}`}>
      <body>
        <JsonLd lang={locale} />
        {children}
      </body>
    </html>
  );
}
