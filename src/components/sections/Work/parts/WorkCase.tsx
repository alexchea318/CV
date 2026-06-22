"use client";

import { useT } from "@/components/primitives/T";
import { Reveal } from "@/components/primitives/Reveal";
import { cx } from "@/lib/cx";
import { work } from "@/content/site";
import styles from "../work.module.scss";

type Case = (typeof work.cases)[number];

const pad = (n: number) => String(n).padStart(2, "0");

export function WorkCase({ c, index, last }: { c: Case; index: number; last: boolean }) {
  const t = useT();
  const hasLink = c.href.startsWith("http");
  const id = `${pad(index + 1)} / ${pad(work.cases.length)}`;
  const linkProps = hasLink
    ? { as: "a" as const, href: c.href, target: "_blank", rel: "noopener", "data-cursor": "", "data-case": "" }
    : {};

  return (
    <Reveal delay={index * 40} {...linkProps} className={cx(styles.case, last && styles["case--last"])}>
      <div className={styles.case__top}>
        <div className={styles.case__meta}>
          <span>{c.company}</span>
          <span className={styles["case__meta-sep"]}>/</span>
          <span>{t(c.period)}</span>
        </div>
        <span className={styles.case__id}>{id}</span>
      </div>

      <div className={styles.case__grid}>
        <div>
          <h3 className={styles.case__title}>{t(c.title)}</h3>
          <p className={styles.case__what}>{t(c.what)}</p>
        </div>

        <div className={styles.case__body}>
          <p className={styles.case__text}>{t(c.text)}</p>
          <div className={styles.case__tags}>
            {c.tags.map((tag, ti) => (
              <span key={ti} className={styles.case__tag}>{t(tag)}</span>
            ))}
          </div>
          {hasLink && (
            <span data-cursor className={styles.case__btn}>
              {t(work.cta)}
              <span className={styles.case__arrow} aria-hidden>→</span>
            </span>
          )}
        </div>
      </div>
    </Reveal>
  );
}
