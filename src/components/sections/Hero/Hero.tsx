"use client";

import {useLang, useT} from "@/components/primitives/T";
import {hero} from "@/content/site";
import {links} from "@/lib/config";
import {withTenure} from "@/lib/tenure";
import styles from "./hero.module.scss";

export function Hero() {
    const {lang} = useLang();
    const t = useT();

    return (
        <header id="top" className={styles.hero}>
            <span className={styles.hero__glow} aria-hidden/>

            <div className={styles.hero__body}>
                <div className={styles.hero__status}>
                    {hero.openStatus[lang] && (
                        <span className={styles.hero__live}>
                            <span data-pulse className={styles.hero__dot}/>
                            {hero.openStatus[lang]}
                        </span>
                    )}
                    <span>{t(hero.location)}</span>
                    <span>{t(hero.english)}</span>
                </div>

                <div className={styles.hero__split}>
                    <div className={styles.hero__title}>
                        <h1 className={styles.hero__name}>
                            <span>{t(hero.firstName)}</span>
                            <span>{t(hero.lastName)}</span>
                        </h1>
                        <p className={styles.hero__role}>{t(hero.roleLine)}</p>
                    </div>

                    <div className={styles.hero__pitch}>
                        <p className={styles.hero__tagline}>{withTenure(t(hero.tagline), lang)}</p>
                        <div className={styles.hero__actions}>
                            <a href={`mailto:${links.email}`} data-cursor data-magnet className={styles.hero__mail}>
                                {links.email}
                            </a>
                            <a href="#resume" data-cursor className={styles.hero__ghost}>
                                {t(hero.ctaResume)}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
