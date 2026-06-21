import { profile } from "@/content/profile";
import { pick, type Locale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/config";

export function JsonLd({ lang }: { lang: Locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: pick(profile.name, lang),
    jobTitle: pick(profile.role, lang),
    url: `${SITE_URL}/`,
    sameAs: ["https://github.com/alexchea318", "https://t.me/alexchea318"],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
