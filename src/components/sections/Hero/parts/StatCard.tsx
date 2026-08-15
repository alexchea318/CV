"use client";

import {useLang, useT} from "@/components/primitives/T";
import {useCountUp} from "@/hooks/useCountUp";
import {useTilt} from "@/hooks/interactions";
import type {I18n} from "@/lib/i18n";
import styles from "../hero.module.scss";

/** One number of the hero: counts up when scrolled into view, tilts under the pointer. */
export function StatCard({value, suffix = "", label}: { value: number; suffix?: string; label: I18n }) {
    const t = useT();
    const {lang} = useLang();
    const tilt = useTilt<HTMLDivElement>();
    const {ref, value: shown} = useCountUp(value);

    // Thousands need a separator: 500000 on a card reads as noise.
    const printed = Math.round(shown).toLocaleString(lang === "ru" ? "ru-RU" : "en-US");

    return (
        <div ref={tilt} data-cursor className={styles.stat}>
            <span ref={ref} className={styles.stat__value}>
                {printed}{suffix}
            </span>
            <span className={styles.stat__label}>{t(label)}</span>
        </div>
    );
}
