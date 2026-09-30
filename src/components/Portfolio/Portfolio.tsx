"use client";

import type { Locale } from "@/lib/i18n";
import { LangProvider } from "@/components/primitives/T";
import { Cursor } from "@/components/Cursor";
import { useInteractions } from "@/hooks/interactions";
import { Nav } from "@/components/sections/Nav";
import { Resume } from "@/components/sections/Resume";
import styles from "./portfolio.module.scss";

function Shell() {
  useInteractions();
  return (
    <div className={styles.portfolio}>
      <Cursor />
      <Nav />
      <main>
        <Resume />
      </main>
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
