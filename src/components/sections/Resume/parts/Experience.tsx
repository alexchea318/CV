"use client";

import {useT} from "@/components/primitives/T";
import {resume} from "@/content/site";
import type {I18n} from "@/lib/i18n";
import styles from "../resume.module.scss";

function Bullets({items}: { items: { text: I18n; stack?: string }[] }) {
    const t = useT();
    return (
        <ul className={styles.job__items}>
            {items.map((it, i) => (
                <li key={i}>
                    {t(it.text)}
                    {it.stack && <span className={styles.job__stack}>{it.stack}</span>}
                </li>
            ))}
        </ul>
    );
}

/** Companies, the roles inside them, then the early years in two lines. */
export function Experience() {
    const t = useT();

    return (
        <div className={styles.exp}>
            {resume.companies.map((company, i) => (
                <article key={i} className={styles.company}>
                    <div className={styles.company__head}>
                        <h4 className={styles.company__name}>{t(company.name)}</h4>
                        <span className={styles.company__period}>{t(company.period)}</span>
                    </div>
                    <p className={styles.company__blurb}>{t(company.blurb)}</p>

                    {company.items && <Bullets items={company.items}/>}

                    {company.roles?.map((role, ri) => (
                        <div key={ri} className={styles.job}>
                            <div className={styles.job__head}>
                                <span className={styles.job__title}>{t(role.title)}</span>
                                <span className={styles.job__period}>{t(role.period)}</span>
                            </div>
                            <Bullets items={role.items}/>
                        </div>
                    ))}
                </article>
            ))}

            <article className={styles.company}>
                <h4 className={styles.company__name}>{t(resume.earlierLabel)}</h4>
                {resume.earlier.map((e, i) => (
                    <p key={i} className={styles.company__earlier}>
                        <strong>{t(e.lead)}</strong>, {t(e.text)}
                    </p>
                ))}
            </article>
        </div>
    );
}
