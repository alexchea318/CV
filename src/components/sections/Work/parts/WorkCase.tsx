"use client";

import { useT } from "@/components/primitives/T";
import { Reveal } from "@/components/primitives/Reveal";
import { cx } from "@/lib/cx";
import { work } from "@/content/site";
import styles from "../work.module.scss";

type Case = (typeof work.cases)[number];

export function WorkCase({ c, index, last }: { c: Case; index: number; last: boolean }) {
  const t = useT();
  const hasLink = c.href.startsWith("http");

  const btn = (variant: "mobile" | "desktop") => (
    <a
      href={c.href}
      target="_blank"
      rel="noopener"
      data-cursor
      className={cx(
        styles.case__btn,
        variant === "mobile" ? styles["case__btn--mobile"] : styles["case__btn--desktop"],
      )}
    >
      {t(work.cta)}
    </a>
  );

  return (
    <Reveal
      delay={index * 40}
      {...(hasLink ? { "data-case": "" } : {})}
      className={cx(styles.case, last && styles["case--last"])}
    >
      <div className={styles.case__inner}>
        <div className={styles.case__main}>
          <div className={styles.case__meta}>
            <span>{c.company}</span>
            <span className={styles["case__meta-sep"]}>/</span>
            <span>{t(c.period)}</span>
          </div>
          {hasLink ? (
            <a href={c.href} target="_blank" rel="noopener" data-cursor data-case-title className={styles.case__title}>
              {t(c.title)}
            </a>
          ) : (
            <h3 className={styles.case__title}>{t(c.title)}</h3>
          )}
          <p className={styles.case__text}>{t(c.text)}</p>
        </div>
        <div className={styles.case__aside}>
          <div className={styles.case__tags}>
            {c.tags.map((tag, ti) => (
              <span key={ti} className={styles.case__tag}>{t(tag)}</span>
            ))}
          </div>
          {hasLink && btn("desktop")}
        </div>
        {hasLink && btn("mobile")}
      </div>
    </Reveal>
  );
}
