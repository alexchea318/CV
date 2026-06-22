"use client";

import { useT } from "@/components/primitives/T";
import { cx } from "@/lib/cx";
import { achievements } from "@/content/site";
import styles from "../achievements.module.scss";

type Item = (typeof achievements.items)[number];

export function AchievementRow({
  item, active, last, onActivate,
}: {
  item: Item; active: boolean; last: boolean; onActivate: () => void;
}) {
  const t = useT();
  const variant = item.color === "violet" ? "violet" : "grad";
  return (
    <div
      data-cursor
      data-cursor-wrap
      onMouseEnter={onActivate}
      onClick={onActivate}
      className={cx(styles["ach-row"], active && styles["ach-row--active"], last && styles["ach-row--last"])}
    >
      <span className={cx(styles["ach-row__bar"], styles[`ach-row__bar--${variant}`])} />
      <span className={cx(styles["ach-row__year"], styles[`ach-row__year--${variant}`])}>{item.year}</span>
      <div className={styles["ach-row__body"]}>
        <div className={styles["ach-row__kicker"]}>{t(item.kicker)}</div>
        <h3 className={styles["ach-row__title"]}>{t(item.title)}</h3>
        <div className={styles["ach-row__desc"]}>
          <p className={styles["ach-row__text"]}>{t(item.text)}</p>
          {item.cta && (
            <a href={item.cta.href || "#"} target="_blank" rel="noopener" data-cursor className={styles["ach-row__cta"]}>
              {t(item.cta.label)}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
