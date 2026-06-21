"use client";

import { useT } from "@/components/primitives/T";
import { Reveal } from "@/components/primitives/Reveal";
import { work } from "@/content/site";
import { WorkCase } from "./parts/WorkCase";
import styles from "./work.module.scss";

export function Work() {
  const t = useT();
  return (
    <section id="work" className={styles.work}>
      <Reveal className={styles.work__head}>
        {work.index} <span>{t(work.label)}</span>
      </Reveal>

      {work.cases.map((c, i) => (
        <WorkCase key={c.title.ru} c={c} index={i} last={i === work.cases.length - 1} />
      ))}
    </section>
  );
}
