"use client";

import { useT } from "@/components/primitives/T";
import { Reveal } from "@/components/primitives/Reveal";
import { cx } from "@/lib/cx";
import { skills } from "@/content/site";
import { SkillCard } from "./parts/SkillCard";
import styles from "./skills.module.scss";

export function Skills() {
  const t = useT();
  return (
    <section className={styles.skills}>
      <Reveal className={styles.skills__head}>
        {skills.index} <span>{t(skills.label)}</span>
        <span className={styles.skills__rule} />
      </Reveal>

      <div className={styles.skills__grid}>
        {skills.cards.map((card, i) => (
          <Reveal
            key={i}
            delay={i * 40}
            className={cx(styles.skills__cell, card.flagship && styles["skills__cell--wide"])}
          >
            <SkillCard card={card} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={120} className={styles.skills__soft}>
        <span className={styles["skills__soft-label"]}>{t(skills.soft.label)}</span>
        <div className={styles["skills__soft-items"]}>
          {skills.soft.items.map((item, i) => (
            <span key={i} className={styles["skills__soft-chip"]}>
              {t(item)}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
