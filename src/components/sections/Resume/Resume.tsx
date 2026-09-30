"use client";

import {useLang, useT} from "@/components/primitives/T";
import {resume} from "@/content/site";
import {withTenure} from "@/lib/tenure";
import {SheetHead} from "./parts/SheetHead";
import {Experience} from "./parts/Experience";
import styles from "./resume.module.scss";

/** The plain CV: the hero above and the contacts below wrap this sheet. */
export function Resume() {
    const {lang} = useLang();
    const t = useT();

    return (
        <section id="resume" className={styles.resume}>
            <article className={styles.sheet}>
                <SheetHead/>

                <div className={styles.row}>
                    <h3 className={styles.row__label}>{t(resume.summaryLabel)}</h3>
                    <p className={styles.row__text}>{withTenure(t(resume.summary), lang)}</p>
                </div>

                <div className={styles.row}>
                    <h3 className={styles.row__label}>{t(resume.experienceLabel)}</h3>
                    <Experience/>
                </div>

                <div className={styles.row}>
                    <h3 className={styles.row__label}>{t(resume.stackLabel)}</h3>
                    <div className={styles.stack}>
                        {resume.stack.map((group, i) => (
                            <p key={i} className={styles.stack__row}>
                                <strong>{t(group.label)}:</strong> {t(group.items)}
                            </p>
                        ))}
                    </div>
                </div>

                <div className={styles.row}>
                    <h3 className={styles.row__label}>{t(resume.metaLabel)}</h3>
                    <div className={styles.meta}>
                        {resume.meta.map((line, i) => (
                            <p key={i}>{t(line)}</p>
                        ))}
                    </div>
                </div>
            </article>
        </section>
    );
}
