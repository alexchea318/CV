"use client";

import { useT } from "@/components/primitives/T";
import { cx } from "@/lib/cx";
import { experience } from "@/content/site";
import styles from "../experience.module.scss";

type Role = (typeof experience.roles)[number];

export function TimelineRow({
  role, active, last, onActivate,
}: {
  role: Role; active: boolean; last: boolean; onActivate: () => void;
}) {
  const t = useT();
  return (
    <div
      data-cursor
      onMouseEnter={onActivate}
      onClick={onActivate}
      className={cx(styles.role, active && styles["role--active"], last && styles["role--last"])}
    >
      <span className={styles.role__bar} />
      <span className={styles.role__period}>{t(role.period)}</span>
      <div className={styles.role__body}>
        <div className={styles.role__title}>{t(role.title)}</div>
        <div className={styles.role__company}>{role.company}</div>
      </div>
    </div>
  );
}
