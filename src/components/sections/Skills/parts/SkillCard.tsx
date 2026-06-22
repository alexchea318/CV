"use client";

import { useT } from "@/components/primitives/T";
import { cx } from "@/lib/cx";
import type { SkillCard as Card } from "@/content/site";
import styles from "../skills.module.scss";

export function SkillCard({ card }: { card: Card }) {
  const t = useT();
  return (
    <div data-cursor className={cx(styles["sk-card"], card.flagship && styles["sk-card--flagship"])}>
      <div className={styles["sk-card__title"]}>{t(card.title)}</div>
      <div className={styles["sk-card__items"]}>
        {card.items.map((item, i) => (
          <span key={i} className={styles["sk-card__chip"]}>
            {t(item)}
          </span>
        ))}
      </div>
    </div>
  );
}
