"use client";

import { T } from "@/components/primitives/T";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import { nav } from "@/content/site";
import { LangToggle } from "./parts/LangToggle";
import { Burger } from "./parts/Burger";
import { MobileMenu } from "./parts/MobileMenu";
import styles from "./nav.module.scss";

export function Nav() {
  const { open, toggle, close } = useMobileMenu();
  return (
    <nav className={styles.nav}>
      <a href="#top" data-cursor data-magnet className={styles.nav__brand}>
        <T v={nav.brand} />
      </a>

      <div className={styles.nav__links}>
        {nav.links.map((l) => (
          <a key={l.href} href={l.href} data-cursor className={styles.nav__link}>
            <T v={l.label} />
          </a>
        ))}
        <LangToggle />
      </div>

      <Burger open={open} onToggle={toggle} />
      {open && <MobileMenu onClose={close} />}
    </nav>
  );
}
