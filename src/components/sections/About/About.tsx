"use client";

import { useLang, useT } from "@/components/primitives/T";
import { Reveal } from "@/components/primitives/Reveal";
import { about } from "@/content/site";
import { tenurePhrase } from "@/lib/tenure";
import { StatList } from "./parts/StatList";
import { CapabilityList } from "./parts/CapabilityList";
import styles from "./about.module.scss";

export function About() {
  const { lang } = useLang();
  const t = useT();
  const s = about.statement;

  return (
    <section className={styles.about}>
      <Reveal className={styles.about__head}>
        {about.index} <span>{t(about.label)}</span>
      </Reveal>

      <div className={styles.about__grid}>
        <Reveal delay={40}>
          <p className={styles.about__statement}>
            {t(s.leadA)}
            {tenurePhrase(lang)}
            {t(s.leadB)}
            <span className={styles.about__accent}>{t(s.accent)}</span>
            {t(s.tail)}
          </p>
          <StatList />
        </Reveal>

        <Reveal delay={120}>
          <CapabilityList />
        </Reveal>
      </div>
    </section>
  );
}
