"use client";

import { useLang, useT } from "@/components/primitives/T";
import { hero } from "@/content/site";
import { tenurePhrase } from "@/lib/tenure";
import { RagDemo } from "./parts/RagDemo";
import styles from "./hero.module.scss";

export function Hero() {
  const { lang } = useLang();
  const t = useT();

  const eyebrow = `${t(hero.openStatus)} — ${t(hero.location)} — ${tenurePhrase(lang)} ${t(hero.tenureSuffix)}`;

  return (
    <header id="top" className={styles.hero}>
      <div className={styles.hero__eyebrow}>
        <div className={styles.hero__status}>
          <span className={styles.hero__pulse} />
          <span className={styles["hero__status-text"]}>{eyebrow}</span>
        </div>
      </div>

      <h1 className={styles.hero__title}>
        <span className={styles.hero__line}>
          <span className={styles.hero__word}>{t(hero.firstName)}</span>
        </span>
        <span className={styles.hero__line}>
          <span className={styles["hero__word--grad"]}>{t(hero.lastName)}</span>
        </span>
      </h1>

      <div className={styles["hero__role-row"]}>
        <div className={styles["hero__role-wrap"]}>
          <span className={styles.hero__role}>{t(hero.role)}</span>
          <span className={styles.hero__spec}>{t(hero.spec)}</span>
        </div>
        <div className={styles.hero__background}>
          <span>{t(hero.backgroundLabel)}</span>
          <span className={styles["hero__bg-role"]}>{hero.backgroundRoles[0]}</span>
          <span className={styles["hero__bg-sep"]}>·</span>
          <span className={styles["hero__bg-role"]}>{hero.backgroundRoles[1]}</span>
        </div>
      </div>

      <div className={styles.hero__bottom}>
        <div className={styles["hero__tagline-wrap"]}>
          <p className={styles.hero__tagline}>{t(hero.tagline)}</p>
        </div>
        <RagDemo />
      </div>

      <div className={styles.hero__scroll}>
        <span className={styles.hero__mouse}>
          <span data-cue className={styles.hero__cue} />
        </span>
        <span>{t(hero.scroll)}</span>
      </div>
    </header>
  );
}
