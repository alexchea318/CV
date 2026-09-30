import type {Metadata} from "next";
import {hero, meta} from "@/content/site";
import {SITE_URL} from "@/lib/config";
import type {Locale} from "@/lib/i18n";
import {withTenure} from "@/lib/tenure";

const PATHS: Record<Locale, string> = {en: "/", ru: "/ru/"};

/** Full name in the given locale, assembled from the hero copy. */
export function personName(lang: Locale): string {
    return `${hero.firstName[lang]} ${hero.lastName[lang]}`;
}

/**
 * Page metadata built from the same content the page renders: the role comes
 * from the hero line, the tenure from February 2022. Nothing here is typed a
 * second time, so the tab, the search snippet and the first screen agree.
 */
export function siteMetadata(lang: Locale): Metadata {
    const title = `${personName(lang)} — ${hero.roleLine[lang]}`;
    const description = withTenure(meta.description[lang], lang);

    return {
        metadataBase: new URL(SITE_URL),
        title,
        description,
        alternates: {
            canonical: PATHS[lang],
            languages: {en: PATHS.en, ru: PATHS.ru, "x-default": PATHS.en},
        },
        openGraph: {title, description, type: "profile", images: [meta.ogImage]},
        twitter: {card: "summary_large_image"},
    };
}

/** schema.org Person for the document head. */
export function personJsonLd(lang: Locale) {
    const locality = meta.locality[lang];
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: personName(lang),
        jobTitle: hero.roleLine[lang],
        url: `${SITE_URL}${PATHS[lang]}`,
        address: {
            "@type": "PostalAddress",
            // The English page speaks to remote roles only: country, no city.
            ...(locality ? {addressLocality: locality} : {}),
            addressCountry: meta.country[lang],
        },
    };
}
