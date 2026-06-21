"use client";

import { useT } from "@/components/primitives/T";
import { about } from "@/content/site";
import { StatHint } from "./StatHint";
import styles from "../about.module.scss";

export function StatList() {
  const t = useT();
  return (
    <div className={styles.stats}>
      {about.stats.map((st, i) => (
        <div key={i} className={styles.stat}>
          <div className={styles.stat__value}>{t(st.value)}</div>
          <div className={styles.stat__label}>
            {t(st.label)}
            {st.hint && <StatHint text={t(st.hint)} />}
          </div>
        </div>
      ))}
    </div>
  );
}
