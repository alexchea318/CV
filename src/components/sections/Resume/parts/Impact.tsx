"use client";

import {useT} from "@/components/primitives/T";
import {resume} from "@/content/site";
import styles from "../resume.module.scss";

/** Five results: the claim in bold, what stands behind it, the stack under it. */
export function Impact() {
    const t = useT();

    return (
        <ul className={styles.impact}>
            {resume.impact.map((item, i) => (
                <li key={i} className={styles.impact__item}>
                    <span className={styles.impact__claim}>{t(item.claim)}</span>
                    <span className={styles.impact__detail}>{t(item.detail)}</span>
                    <span className={styles.impact__stack}>{item.stack}</span>
                </li>
            ))}
        </ul>
    );
}
