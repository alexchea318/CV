import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL, links } from "@/lib/config";

const NAME = "Александр Чеченев";
const ROLE = "Full-Stack / AI Engineer (RAG)";
const DESC =
  "Довожу RAG-системы до продакшена: бэкенд, фронт, инфраструктура и качество генерации. Санкт-Петербург, удалённо.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${NAME} — ${ROLE}`,
  description: DESC,
  alternates: {
    canonical: "/",
    languages: { ru: "/", en: "/en/" },
  },
  openGraph: {
    title: `${NAME} — ${ROLE}`,
    description: DESC,
    type: "profile",
    images: ["/img/me.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: NAME,
  jobTitle: ROLE,
  url: `${SITE_URL}/`,
  email: links.email,
  address: { "@type": "PostalAddress", addressLocality: "Saint Petersburg", addressCountry: "RU" },
  sameAs: [links.github, links.linkedin, links.telegram, links.vk],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
