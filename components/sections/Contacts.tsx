import { contacts } from "@/content/contacts";
import type { Locale } from "@/lib/i18n";
import { KineticText } from "@/components/ui/KineticText";

export function Contacts({ lang }: { lang: Locale }) {
  const visible = contacts.filter((c) => !("ruOnly" in c && c.ruOnly) || lang === "ru");
  return (
    <section id="contacts" className="gutter rule py-24 md:py-40">
      <div className="mono mb-5 flex items-center gap-4">
        <span>06</span>
        <span className="h-px w-8 bg-[var(--color-faint)]" />
        <span>CONTACT</span>
      </div>

      <KineticText
        as="h2"
        lines={lang === "ru" ? ["Давай", "поговорим."] : ["Let's", "talk."]}
        className="display mb-16 text-[var(--text-giant)] md:mb-24"
      />

      <div>
        {visible.map((c) => {
          const external = c.href.startsWith("http");
          return (
            <a
              key={c.label}
              href={c.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              className="group rule flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-6 first:border-t-0 md:py-8"
            >
              <span className="display text-[var(--text-huge)] transition-transform duration-500 ease-out group-hover:translate-x-2">
                {c.label}
              </span>
              <span className="mono normal-case tracking-normal text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-fg)]">
                {c.value}
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
