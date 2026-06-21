import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import "../globals.css";
import { displayFont, GeistSans } from "../fonts";
import { isLocale } from "@/lib/i18n";

export function generateStaticParams() {
  return [{ lang: "ru" }, { lang: "en" }];
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
  return (
    <html lang={lang} className={`${displayFont.variable} ${GeistSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
