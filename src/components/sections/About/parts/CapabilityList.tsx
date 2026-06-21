"use client";

import { useState } from "react";
import { useT } from "@/components/primitives/T";
import { cx } from "@/lib/cx";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { about } from "@/content/site";
import styles from "../about.module.scss";

export function CapabilityList() {
  const t = useT();
  const [active, setActive] = useState(0);
  // Hover-selectable on desktop only; mobile shows every stack (see scss).
  const isDesktop = useMediaQuery("(min-width: 821px)");

  return (
    <div>
      <div className={styles.caps__heading}>{t(about.capsHeading)}</div>
      {about.caps.map((cap, i) => {
        const on = isDesktop && i === active;
        const last = i === about.caps.length - 1;
        return (
          <div
            key={i}
            {...(isDesktop ? { "data-cursor": "" } : {})}
            onMouseEnter={isDesktop ? () => setActive(i) : undefined}
            onClick={isDesktop ? () => setActive(i) : undefined}
            className={cx(
              styles.cap,
              isDesktop && styles["cap--interactive"],
              on && styles["cap--active"],
              last && styles["cap--last"],
            )}
          >
            <span className={styles.cap__num}>{String(i + 1).padStart(2, "0")}</span>
            <div className={styles.cap__body}>
              <div className={styles.cap__name}>{t(cap.name)}</div>
              <div className={styles.cap__stack}>{t(cap.stack)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
