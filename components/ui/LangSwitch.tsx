"use client";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export function LangSwitch({ current }: { current: Locale }) {
  const other: Locale = current === "ru" ? "en" : "ru";
  return (
    <Link href={`/${other}/`} className="mono inline-flex items-center gap-2 text-[var(--color-muted)]">
      <span className={current === "ru" ? "text-[var(--color-fg)]" : ""}>RU</span>
      <span aria-hidden>/</span>
      <span className={current === "en" ? "text-[var(--color-fg)]" : ""}>EN</span>
    </Link>
  );
}
