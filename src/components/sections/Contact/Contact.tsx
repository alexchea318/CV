"use client";

import { useLang, useT } from "@/components/primitives/T";
import { contact, footer, hero } from "@/content/site";
import { getCurrentYear } from "@/lib/date";
import styles from "./contact.module.scss";

export function Contact() {
  const t = useT();
  const { lang } = useLang();

  // VK is RU-only — drop it from the English contact row.
  const contactLinks = contact.links.filter((l) => !(l.kind === "VK" && lang === "en"));

  // No scroll-reveal here: the footer is the last thing on the page, so its lower
  // rows can never clear the reveal observer's bottom margin — they'd stay hidden.
  return (
    <footer id="contact" className={styles.contact}>
      <div className={styles.contact__inner}>
        <div className={styles.contact__top}>
          <div>
            {contact.index} <span>{t(contact.label)}</span>
          </div>
          <div className={styles.contact__status}>
            <span className={styles.contact__dot} aria-hidden />
            <span>{t(hero.openStatus)}</span>
          </div>
        </div>

        <a
          href={contact.headlineHref}
          target="_blank"
          rel="noopener"
          data-cursor
          data-magnet
          className={styles.contact__headline}
        >
          {t(contact.headline)}
        </a>

        <div className={styles.contact__links}>
          {contactLinks.map((l) => {
            const external = l.href.startsWith("http");
            return (
              <a
                key={l.kind}
                href={l.href}
                data-cursor
                {...(external ? { target: "_blank", rel: "noopener" } : {})}
                className={styles.contact__link}
              >
                <span className={styles.contact__arrow}>↳</span> {l.value}
              </a>
            );
          })}
        </div>

        <div className={styles.contact__bottom}>
          <span>© {getCurrentYear()} {t(footer.left)}</span>
          <a href="#top" data-cursor className={styles.contact__totop}>
            {t(contact.toTop)} ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
