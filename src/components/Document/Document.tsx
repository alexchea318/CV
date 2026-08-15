import type {ReactNode} from "react";
import type {Locale} from "@/lib/i18n";
import {links} from "@/lib/config";
import {personJsonLd} from "@/lib/meta";

/**
 * The document shell. Both root layouts render it with their own locale, so
 * the static HTML of each route already carries the right `lang` instead of
 * having it corrected on the client after hydration.
 */
export function Document({lang, children}: { lang: Locale; children: ReactNode }) {
    const jsonLd = {
        ...personJsonLd(lang),
        email: links.email,
        sameAs: [links.github, links.linkedin, links.telegram, links.vk, links.hh],
    };

    return (
        <html lang={lang}>
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
            <link rel="icon" href="/favicon.png"/>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
            />
        </head>
        <body>{children}</body>
        </html>
    );
}
