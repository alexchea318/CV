"use client";

import { useT } from "@/components/primitives/T";
import { cx } from "@/lib/cx";
import { experience } from "@/content/site";
import styles from "../experience.module.scss";

type Role = (typeof experience.roles)[number];

export function RoleDetail({ role, compact = false }: { role: Role; compact?: boolean }) {
  const t = useT();
  return (
    <>
      <div className={cx(styles.detail__range, compact && styles["detail__range--compact"])}>
        {t(role.dateRange)}
      </div>
      {!compact && (
        <>
          <h3 className={styles.detail__title}>{t(role.title)}</h3>
          <div className={styles.detail__company}>{role.company}</div>
        </>
      )}
      <p className={cx(styles.detail__blurb, compact && styles["detail__blurb--compact"])}>
        {t(role.blurb)}
      </p>
      {role.groups.map((g, gi) => (
        <div key={gi} className={styles.detail__group}>
          <span className={styles.detail__label}>{g.label}</span>
          <ul className={styles.detail__items}>
            {g.items.map((it, ii) => (
              <li key={ii} className={styles.detail__item}>{t(it)}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
