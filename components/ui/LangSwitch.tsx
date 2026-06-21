"use client";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export function LangSwitch({ current }: { current: Locale }) {
  const other: Locale = current === "ru" ? "en" : "ru";
  return (
    <Link href={`/${other}/`} className="text-muted hover:text-fg transition-colors uppercase text-sm tracking-widest">
      {other}
    </Link>
  );
}
