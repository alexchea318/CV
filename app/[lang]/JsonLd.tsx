import { profile } from "@/content/profile";
import { pick, type Locale } from "@/lib/i18n";

export function JsonLd({ lang }: { lang: Locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: pick(profile.name, lang),
    jobTitle: pick(profile.role, lang),
    url: "https://alexchea318.github.io/CV/",
    sameAs: ["https://github.com/alexchea318", "https://t.me/alexchea318"],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
