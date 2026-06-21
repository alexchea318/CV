"use client";

import { useT } from "@/components/primitives/T";
import { cx } from "@/lib/cx";
import { experience } from "@/content/site";
import { RoleDetail } from "./RoleDetail";
import styles from "../experience.module.scss";

type Role = (typeof experience.roles)[number];

export function RoleAccordion({
  role, open, last, onToggle,
}: {
  role: Role; open: boolean; last: boolean; onToggle: () => void;
}) {
  const t = useT();
  return (
    <div className={cx(styles.acc, last && styles["acc--last"], open && styles["acc--open"])}>
      <button type="button" onClick={onToggle} aria-expanded={open} className={styles.acc__btn}>
        <span className={styles.acc__bar} />
        <span className={styles.acc__period}>{t(role.period)}</span>
        <span className={styles.acc__title}>{t(role.title)}</span>
        <span className={styles.acc__company}>{role.company}</span>
      </button>
      {open && (
        <div className={styles.acc__panel}>
          <RoleDetail role={role} compact />
        </div>
      )}
    </div>
  );
}
