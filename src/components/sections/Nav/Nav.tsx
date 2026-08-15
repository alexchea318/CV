"use client";

import {T} from "@/components/primitives/T";
import {nav} from "@/content/site";
import {useScrollProgress} from "@/hooks/useScrollProgress";
import {LangToggle} from "./parts/LangToggle";
import styles from "./nav.module.scss";

export function Nav() {
    const progress = useScrollProgress();

    return (
        <nav className={styles.nav}>
            <div className={styles.nav__inner}>
                <a href="#top" data-cursor className={styles.nav__brand}>
                    <T v={nav.brand}/>
                </a>

                <LangToggle/>

                <div className={styles.nav__right}>
                    {nav.links.map((l) => (
                        <a key={l.href} href={l.href} data-cursor className={styles.nav__link}>
                            <T v={l.label}/>
                        </a>
                    ))}
                    <a href={nav.ctaHref} data-cursor className={styles.nav__cta}>
                        <T v={nav.cta}/>
                    </a>
                </div>
            </div>

            <div className={styles.nav__track}>
                <div className={styles.nav__progress} style={progress}/>
            </div>
        </nav>
    );
}
