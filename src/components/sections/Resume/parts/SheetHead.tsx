"use client";

import {useLang, useT} from "@/components/primitives/T";
import {contactLinks, hero} from "@/content/site";
import {cx} from "@/lib/cx";
import styles from "../resume.module.scss";

/** Sheet header: who, for what role, how to reach. The PDF button is in the nav. */
export function SheetHead() {
    const {lang} = useLang();
    const t = useT();

    return (
        <header className={styles.sheet__head}>
            <div className={styles.sheet__id}>
                <h1 className={styles.sheet__name}>
                    {t(hero.firstName)} {t(hero.lastName)}
                </h1>
                <span className={styles.sheet__role}>{t(hero.roleLine)}</span>
            </div>

            <div className={styles.sheet__facts}>
                {t(hero.location)}, {t(hero.english)}
            </div>

            <div className={styles.sheet__contacts}>
                {contactLinks
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
        </header>
    );
}
