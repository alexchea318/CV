"use client";

import { useLang, useT } from "@/components/primitives/T";
import { Reveal } from "@/components/primitives/Reveal";
import { contact } from "@/content/site";
import styles from "./contact.module.scss";

export function Contact() {
  const t = useT();
  const { lang } = useLang();

  // VK is RU-only — drop it from the English contact row.
  const contactLinks = contact.links.filter((l) => !(l.kind === "VK" && lang === "en"));

  return (
    <section id="contact" className={styles.contact}>
      <Reveal className={styles.contact__head}>
        {contact.index} <span>{t(contact.label)}</span>
      </Reveal>

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
    </section>
  );
}
