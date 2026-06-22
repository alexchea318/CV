"use client";

import { useT } from "@/components/primitives/T";
import { cx } from "@/lib/cx";
import { achievements } from "@/content/site";
import styles from "../achievements.module.scss";

type Item = (typeof achievements.items)[number];

export function AchievementCard({ item }: { item: Item }) {
  const t = useT();
  const variant = item.color === "violet" ? "violet" : "grad";
  return (
    <div>
      <img src={item.img} alt={t(item.title)} loading="lazy" className={styles["ach-card__img"]} />
      <div className={styles["ach-card__head"]}>
        <span className={styles["ach-card__kicker"]}>{t(item.kicker)}</span>
        <span className={cx(styles["ach-card__year"], styles[`ach-card__year--${variant}`])}>{item.year}</span>
      </div>
      <h3 className={styles["ach-card__title"]}>{t(item.title)}</h3>
      <p className={styles["ach-card__text"]}>{t(item.text)}</p>
      {item.cta && (
        <a href={item.cta.href || "#"} target="_blank" rel="noopener" className={styles["ach-card__cta"]}>
          {t(item.cta.label)}
        </a>
      )}
    </div>
  );
}
