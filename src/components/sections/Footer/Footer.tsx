"use client";

import { useT } from "@/components/primitives/T";
import { footer } from "@/content/site";
import styles from "./footer.module.scss";

export function Footer() {
  const t = useT();
  return (
    <footer className={styles.footer}>
      <span>{t(footer.left)}</span>
    </footer>
  );
}
