"use client";

import {useLang, useT} from "@/components/primitives/T";
import {hero, nav, resume} from "@/content/site";
import {LangToggle} from "./parts/LangToggle";
import styles from "./nav.module.scss";

/** The page is the sheet; the bar carries the name, the language and the PDF. */
export function Nav() {
    const t = useT();
    const {lang} = useLang();

    return (
        <nav className={styles.nav}>
            <div className={styles.nav__inner}>
                <span className={styles.nav__title}>{t(hero.firstName)} {t(hero.lastName)}</span>
                <LangToggle/>
                {/* A file, not window.print(): some browsers have no print dialog.
                    The PDFs are rendered by `npm run pdf` (scripts/pdf.mjs). */}
                <a href={`/cv-${lang}.pdf`} download={`${t(nav.fileName)}.pdf`} data-cursor className={styles.nav__cta}>
                    {t(resume.downloadCta)}
                </a>
            </div>
        </nav>
    );
}
