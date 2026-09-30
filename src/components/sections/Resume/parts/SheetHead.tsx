"use client";

import {useLang, useT} from "@/components/primitives/T";
import {contact, hero, resume} from "@/content/site";
import {cx} from "@/lib/cx";
import {usePrint} from "@/hooks/usePrint";
import styles from "../resume.module.scss";

/** Sheet header: who, for what role, how to reach, and the PDF button. */
export function SheetHead() {
    const {lang} = useLang();
    const t = useT();
    const print = usePrint();

    return (
        <header className={styles.sheet__head}>
            <div className={styles.sheet__id}>
                <h2 className={styles.sheet__name}>
                    {t(hero.firstName)} {t(hero.lastName)}
                </h2>
                <span className={styles.sheet__role}>{t(hero.roleLine)}</span>
            </div>

            <div className={styles.sheet__facts}>
                <span>{t(hero.location)}</span>
                <span>{t(hero.english)}</span>
            </div>

            <div className={styles.sheet__row}>
                {/* The same row as the contacts block, minus the PDF: the reader
                    is already inside the document that button would hand over. */}
                <div className={styles.sheet__contacts}>
                    {contact.sheetLinks
                        .filter((l) => !(l.ruOnly && lang === "en"))
                        .map((l) => (
                            <a
                                key={l.kind}
                                data-cursor
                                href={l.href}
                                {...(l.href.startsWith("http") ? {target: "_blank", rel: "noopener"} : {})}
                                className={cx(!l.print && styles["sheet__contact--screen"])}
                            >
                                <span className={styles.sheet__label}>
                                    {typeof l.value === "string" ? l.value : t(l.value)}
                                </span>
                                {l.print && <span className={styles.sheet__printed}>{l.print}</span>}
                            </a>
                        ))}
                </div>
                <button type="button" data-cursor data-print-hide onClick={print} className={styles.sheet__download}>
                    {t(resume.downloadCta)} ↓︎
                </button>
            </div>
        </header>
    );
}
