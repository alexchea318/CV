"use client";

import type { CSSProperties } from "react";
import { useT } from "@/components/primitives/T";
import { cx } from "@/lib/cx";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useStepper } from "@/hooks/useStepper";
import { about } from "@/content/site";
import styles from "../about.module.scss";

export function CapabilityList() {
  const t = useT();
  const steps = about.caps;
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const { active, select, pause, resume } = useStepper(steps.length, { enabled: !reduce });
  const progress = reduce ? 1 : steps.length > 1 ? active / (steps.length - 1) : 0;

  return (
    <div className={styles.cycle}>
      <div className={styles.caps__heading}>{t(about.capsHeading)}</div>
      <ol
        className={cx(styles.cycle__steps, reduce && styles["cycle__steps--static"])}
        style={{ "--p": progress } as CSSProperties}
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        <span className={styles.cycle__rail} aria-hidden />
        <span className={styles.cycle__fill} aria-hidden />
        {steps.map((step, i) => (
          <li
            key={i}
            data-cursor
            onMouseEnter={() => select(i)}
            onClick={() => select(i)}
            className={cx(
              styles.cycle__step,
              i <= active && styles["cycle__step--done"],
              i === active && styles["cycle__step--active"],
            )}
          >
            <span className={styles.cycle__node} aria-hidden />
            <span className={styles.cycle__num}>{String(i + 1).padStart(2, "0")}</span>
            <span className={styles.cycle__name}>{t(step.name)}</span>
            <span className={styles.cycle__note}>{t(step.note)}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
