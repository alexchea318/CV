"use client";

import { useT } from "@/components/primitives/T";
import { nav } from "@/content/site";
import { LangToggle } from "./LangToggle";
import styles from "../nav.module.scss";

export function MobileMenu({ onClose }: { onClose: () => void }) {
  const t = useT();
  return (
    <>
      <div className={styles.nav__backdrop} onClick={onClose} />
      <div className={styles.menu}>
        {nav.links.map((l) => (
          <a key={l.href} href={l.href} onClick={onClose} className={styles.menu__link}>
            {t(l.label)}
          </a>
        ))}
        <div className={styles.menu__divider}>
          <LangToggle vertical />
        </div>
      </div>
    </>
  );
}
