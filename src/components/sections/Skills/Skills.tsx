"use client";

import { useT } from "@/components/primitives/T";
import { Reveal } from "@/components/primitives/Reveal";
import { skills } from "@/content/site";
import styles from "./skills.module.scss";

export function Skills() {
  const t = useT();
  return (
    <section className={styles.skills}>
      <Reveal className={styles.skills__head}>
        {skills.index} <span>{t(skills.label)}</span>
      </Reveal>

      <div className={styles.skills__grid}>
        {skills.groups.map((g, gi) => (
          <Reveal key={gi} delay={gi * 30}>
            <div className={styles.skills__title}>{t(g.title)}</div>
            <div className={styles.skills__row}>
              {g.items.map((item, ii) => (
                <span key={ii} className={styles.skills__cell}>
                  <span className={styles.skills__item}>{t(item)}</span>
                  {ii < g.items.length - 1 && <span className={styles.skills__sep}>·</span>}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
