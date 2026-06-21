"use client";

import { cx } from "@/lib/cx";
import styles from "../nav.module.scss";

export function Burger({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      className={styles.nav__burger}
      aria-label="Menu"
      aria-expanded={open}
      onClick={onToggle}
    >
      <span className={cx(styles.burger__box, open && styles["burger--open"])}>
        <span className={cx(styles.burger__line, styles["burger__line--1"])} />
        <span className={cx(styles.burger__line, styles["burger__line--2"])} />
        <span className={cx(styles.burger__line, styles["burger__line--3"])} />
      </span>
    </button>
  );
}
