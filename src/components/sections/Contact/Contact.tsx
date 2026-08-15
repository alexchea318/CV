"use client";

import {useLang, useT} from "@/components/primitives/T";
import {contact, footer, hero} from "@/content/site";
import {getCurrentYear} from "@/lib/date";
import {usePrint} from "@/hooks/usePrint";
import styles from "./contact.module.scss";

export function Contact() {
    const t = useT();
    const {lang} = useLang();
    const print = usePrint();

    // hh.ru is a Russian job board: the English page drops it.
    const contactLinks = contact.links.filter((l) => !(l.ruOnly && lang === "en"));

    // No scroll-reveal here: the footer is the last thing on the page, so its lower
    // rows can never clear the reveal observer's bottom margin — they'd stay hidden.
    return (
        <footer id="contact" className={styles.contact}>
            <div className={styles.contact__inner}>
                <h2 className={styles.contact__headline}>{t(contact.headline)}</h2>

                <div className={styles.contact__links}>
                    {contactLinks.map((l) => (
                        <a
                            key={l.kind}
                            href={l.href}
                            data-cursor
                            {...(l.href.startsWith("http") ? {target: "_blank", rel: "noopener"} : {})}
                            className={styles.link}
                        >
                            <span className={styles.link__arrow} aria-hidden>↳</span>
                            {typeof l.value === "string" ? l.value : t(l.value)}
                        </a>
                    ))}
                    <button type="button" data-cursor data-print-hide onClick={print} className={styles.link}>
                        <span className={styles.link__arrow} aria-hidden>↳</span>
                        {t(contact.downloadCta)}
                    </button>
                </div>

                <div className={styles.contact__bottom}>
                    <div className={styles.contact__left}>
                        <span>© {getCurrentYear()} {t(footer.left)}</span>
                        <span className={styles.contact__status}>
                            <span className={styles.contact__dot} aria-hidden/>
                            {t(hero.openStatus)}
                        </span>
                    </div>
                    <a href="#top" data-cursor className={styles.contact__totop}>
                        {t(contact.toTop)} ↑
                    </a>
                </div>
            </div>
        </footer>
    );
}
