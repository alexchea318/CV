import { contacts } from "@/content/contacts";
import type { Locale } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Contacts({ lang }: { lang: Locale }) {
  const visible = contacts.filter((c) => !("ruOnly" in c && c.ruOnly) || lang === "ru");
  return (
    <section id="contacts" className="px-6 md:px-16 py-28 border-t border-line">
      <Reveal><SectionHeading>{lang === "ru" ? "Контакты" : "Contacts"}</SectionHeading></Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((c) => (
          <Reveal key={c.label}>
            <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
               className="block rounded-2xl border border-line p-6 hover:border-fg/40 transition-colors">
              <p className="font-display text-lg">{c.value}</p>
              <p className="text-muted text-sm">{c.label}</p>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
