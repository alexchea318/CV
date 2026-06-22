"use client";

import { useState } from "react";
import { useT } from "@/components/primitives/T";
import { Reveal } from "@/components/primitives/Reveal";
import { cx } from "@/lib/cx";
import { useCarousel } from "@/hooks/useCarousel";
import { achievements } from "@/content/site";
import { AchievementRow } from "./parts/AchievementRow";
import { AchievementCard } from "./parts/AchievementCard";
import styles from "./achievements.module.scss";

export function Achievements() {
  const t = useT();
  const [active, setActive] = useState(0);
  const items = achievements.items;
  const slider = useCarousel(items.length);

  return (
    <section id="achievements" className={styles.ach}>
      <Reveal className={styles.ach__head}>
        {achievements.index} <span>{t(achievements.label)}</span>
        <span className={styles.ach__rule} />
        <span className={styles.ach__hint}>{t(achievements.hint)}</span>
      </Reveal>

      {/* desktop: interactive showcase */}
      <div className={styles.ach__showcase}>
        <Reveal delay={40} className={styles.ach__stage}>
          {items.map((item, i) => (
            <img
              key={item.year}
              src={item.img}
              alt={t(item.title)}
              loading="lazy"
              className={cx(styles.ach__img, i === active && styles["ach__img--active"])}
            />
          ))}
        </Reveal>
        <Reveal delay={120} className={styles.ach__list}>
          {items.map((item, i) => (
            <AchievementRow
              key={item.year}
              item={item}
              active={i === active}
              last={i === items.length - 1}
              onActivate={() => setActive(i)}
            />
          ))}
        </Reveal>
      </div>

      {/* mobile: one-card slider */}
      <div ref={slider.trackRef} className={styles.ach__cards}>
        {items.map((item) => (
          <AchievementCard key={item.year} item={item} />
        ))}
      </div>
      <div className={styles.ach__dots}>
        {items.map((item, i) => (
          <button
            key={item.year}
            type="button"
            aria-label={`${item.year}`}
            aria-current={i === slider.active}
            onClick={() => slider.goTo(i)}
            className={cx(styles.ach__dot, i === slider.active && styles["ach__dot--active"])}
          />
        ))}
      </div>
    </section>
  );
}
