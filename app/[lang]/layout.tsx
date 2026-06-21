import type { ReactNode } from "react";
import "../globals.css";
import { displayFont, GeistSans } from "../fonts";

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
  return (
    <html lang={lang} className={`${displayFont.variable} ${GeistSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
