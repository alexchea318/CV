import { experience } from "@/content/experience";
import { pick, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Experience({ lang }: { lang: Locale }) {
  return (
    <section id="experience" className="px-6 md:px-16 py-28 border-t border-line">
      <Reveal><SectionHeading>{lang === "ru" ? "Опыт работы" : "Experience"}</SectionHeading></Reveal>
      <div className="space-y-6">
        {experience.map((e, i) => (
          <Reveal key={e.company} delay={i * 0.05}>
            <div className="grid gap-4 md:grid-cols-[200px_1fr] border border-line rounded-2xl p-6">
              <div>
                <p className="font-display text-lg">{e.company}</p>
                <time className="text-muted text-sm">{pick(e.period, lang)}</time>
              </div>
              <div>
                <p className="text-fg mb-1">{pick(e.role, lang)}</p>
                <p className="text-muted">{pick(e.text, lang)}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
