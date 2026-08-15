"use client";

import {useLang, useT} from "@/components/primitives/T";
import {contact, footer, hero} from "@/content/site";
import {getCurrentYear} from "@/lib/date";
import {usePrint} from "@/hooks/usePrint";
import {ContactCard} from "./parts/ContactCard";
import styles from "./contact.module.scss";

export function Contact() {
    const t = useT();
    const {lang} = useLang();
    const print = usePrint();

    // hh.ru is a Russian job board: the English page drops it, and the cards
    // that shared its row widen to close the gap.
    const cards = contact.links.filter((l) => !(l.ruOnly && lang === "en"));

    // No scroll-reveal here: the footer is the last thing on the page, so its lower
    // rows can never clear the reveal observer's bottom margin — they'd stay hidden.
    return (
        <footer id="contact" className={styles.contact}>
            <div className={styles.contact__inner}>
                <h2 className={styles.contact__headline}>{t(contact.headline)}</h2>

                <div className={styles.contact__grid}>
                    {cards.map((l) => (
                        <ContactCard
                            key={l.kind}
                            icon={l.icon ?? "email"}
                            label={typeof l.value === "string" ? l.value : t(l.value)}
                            span={(lang === "en" ? l.spanEn ?? l.span : l.span) ?? 2}
                            href={l.href}
                        />
                    ))}
                    <ContactCard
                        icon="pdf"
                        label={t(contact.downloadCta)}
                        span={lang === "en" ? 3 : 2}
                        arrow="↓︎"
                        onClick={print}
                    />
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
                        {t(contact.toTop)} ↑︎
                    </a>
                </div>
            </div>
        </footer>
    );
}
