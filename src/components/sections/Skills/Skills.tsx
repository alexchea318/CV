"use client";

import { useT } from "@/components/primitives/T";
import { Reveal } from "@/components/primitives/Reveal";
import { cx } from "@/lib/cx";
import { skills } from "@/content/site";
import styles from "./skills.module.scss";

export function Skills() {
  const t = useT();
  const { responsibility, technologies } = skills;
  // Two copies of the word run so the translateX(-50%) loop is seamless.
  const marquee = [...skills.marquee, ...skills.marquee];

  return (
    <section className={styles.skills}>
      <Reveal className={styles.skills__head}>
        {skills.index} <span>{t(skills.label)}</span>
      </Reveal>

      <div className={styles.skills__grid}>
        {/* Ownership — what I'm accountable for */}
        <Reveal className={styles.skills__col}>
          <div className={styles.skills__colhead}>
            <span className={styles.skills__star}>✱</span>
            <span className={styles["skills__colhead-text"]}>{t(responsibility.label)}</span>
          </div>
          <div className={styles.skills__own}>
            {responsibility.items.map((it) => (
              <div key={it.no} data-cursor className={styles.own}>
                <span className={styles.own__no}>{it.no}</span>
                <div>
                  <div className={styles.own__name}>{t(it.title)}</div>
                  <p className={styles.own__text}>{t(it.text)}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Technologies — the stack, first group leads */}
        <Reveal className={styles.skills__col} delay={40}>
          <div className={styles.skills__colhead}>
            <span className={styles.skills__star}>✱</span>
            <span className={styles["skills__colhead-text"]}>{t(technologies.label)}</span>
          </div>
          <div className={styles.skills__tech}>
            {technologies.groups.map((g, i) => (
              <div key={i} data-cursor className={cx(styles.tech, i === 0 && styles["tech--lead"])}>
                <div className={styles.tech__name}>{t(g.label)}</div>
                <div className={styles.tech__chips}>
                  {g.items.map((it, j) => (
                    <span key={j} className={cx(styles.chip, i === 0 && styles["chip--lead"])}>
                      {t(it)}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <div className={styles.skills__marquee} aria-hidden>
        <div className={styles.skills__marqueeTrack}>
          {marquee.map((word, i) => (
            <span key={i} className={styles.skills__marqueeItem}>
              <span className={styles.skills__marqueeWord}>{word}</span>
              <span className={styles.skills__marqueeStar}>✱</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
