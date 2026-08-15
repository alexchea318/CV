"use client";

import type {CSSProperties} from "react";
import type {IconKind} from "@/content/site";
import {ContactIcon} from "./ContactIcon";
import styles from "../contact.module.scss";

type Props = {
    icon: IconKind;
    label: string;
    span: number;
    href?: string;
    onClick?: () => void;
    /** The download card points down, everything else points out. */
    arrow?: string;
};

/** One contact tile: icon and arrow on top, the destination on the bottom. */
export function ContactCard({icon, label, span, href, onClick, arrow = "↗"}: Props) {
    const content = (
        <>
            <span className={styles.card__fill} aria-hidden/>
            <span className={styles.card__top}>
                <ContactIcon kind={icon}/>
                <span className={styles.card__arrow} aria-hidden>{arrow}</span>
            </span>
            <span className={styles.card__value}>{label}</span>
        </>
    );

    const style = {"--span": span} as CSSProperties;

    if (href) {
        const external = href.startsWith("http");
        return (
            <a
                href={href}
                data-cursor
                style={style}
                className={styles.card}
                {...(external ? {target: "_blank", rel: "noopener"} : {})}
            >
                {content}
            </a>
        );
    }

    return (
        <button type="button" data-cursor data-print-hide onClick={onClick} style={style} className={styles.card}>
            {content}
        </button>
    );
}
