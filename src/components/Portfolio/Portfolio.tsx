"use client";

import type { Locale } from "@/lib/i18n";
import { LangProvider } from "@/components/primitives/T";
import { Cursor } from "@/components/Cursor";
import { useInteractions } from "@/hooks/interactions";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Achievements } from "@/components/sections/Achievements";
import { Work } from "@/components/sections/Work";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import styles from "./portfolio.module.scss";

function Shell() {
  useInteractions();
  return (
    <div className={styles.portfolio}>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Achievements />
        <Work />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
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
