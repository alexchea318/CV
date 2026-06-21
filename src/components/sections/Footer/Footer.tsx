"use client";

import { useT } from "@/components/primitives/T";
import { footer } from "@/content/site";
import { getCurrentYear } from "@/lib/date";
import styles from "./footer.module.scss";

export function Footer() {
  const t = useT();
  return (
    <footer className={styles.footer}>
      <span>© {getCurrentYear()} {t(footer.left)}</span>
    </footer>
  );
}
