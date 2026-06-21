"use client";

import { useState } from "react";
import { useT } from "@/components/primitives/T";
import { Reveal } from "@/components/primitives/Reveal";
import { cx } from "@/lib/cx";
import { experience } from "@/content/site";
import { TimelineRow } from "./parts/TimelineRow";
import { RoleDetail } from "./parts/RoleDetail";
import { RoleAccordion } from "./parts/RoleAccordion";
import styles from "./experience.module.scss";

export function Experience() {
  const t = useT();
  const [active, setActive] = useState(0);
  const [openM, setOpenM] = useState(0);
  const roles = experience.roles;

  return (
    <section id="experience" className={styles.exp}>
      <Reveal className={styles.exp__head}>
        {experience.index} <span>{t(experience.label)}</span>
        <span className={styles.exp__rule} />
        <span className={styles.exp__hint}>{t(experience.hint)}</span>
      </Reveal>

      {/* desktop: timeline + cross-fade panels */}
      <div className={styles.exp__desktop}>
        <Reveal delay={40} className={styles.exp__timeline}>
          {roles.map((role, i) => (
            <TimelineRow
              key={i}
              role={role}
              active={i === active}
              last={i === roles.length - 1}
              onActivate={() => setActive(i)}
            />
          ))}
        </Reveal>
        <Reveal delay={120} className={styles.exp__panels}>
          {roles.map((role, i) => (
            <div
              key={i}
              className={cx(styles.exp__panel, i === active && styles["exp__panel--active"])}
              aria-hidden={i !== active}
            >
              <RoleDetail role={role} />
            </div>
          ))}
        </Reveal>
      </div>

      {/* mobile: accordion */}
      <div className={styles.exp__mobile}>
        {roles.map((role, i) => (
          <RoleAccordion
            key={i}
            role={role}
            open={i === openM}
            last={i === roles.length - 1}
            onToggle={() => setOpenM(i === openM ? -1 : i)}
          />
        ))}
      </div>
    </section>
  );
}
