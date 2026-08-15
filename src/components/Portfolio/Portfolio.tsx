"use client";

import type { Locale } from "@/lib/i18n";
import { LangProvider } from "@/components/primitives/T";
import { Cursor } from "@/components/Cursor";
import { useInteractions } from "@/hooks/interactions";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Resume } from "@/components/sections/Resume";
import { Contact } from "@/components/sections/Contact";
import styles from "./portfolio.module.scss";

function Shell() {
  useInteractions();
  return (
    <div className={styles.portfolio}>
      <Cursor />
      <Nav />
      {/* The hero and the contacts wrap a plain CV: the wow is the frame,
          the sheet inside is what an HR person came to read. */}
      <main>
        <Hero />
        <Resume />
      </main>
      <Contact />
    </div>
  );
}

export function Portfolio({ initialLang }: { initialLang: Locale }) {
  return (
    <LangProvider initial={initialLang}>
      <Shell />
    </LangProvider>
  );
}
