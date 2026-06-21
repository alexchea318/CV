import { awards } from "@/content/awards";
import { pick, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Awards({ lang }: { lang: Locale }) {
  return (
    <section id="awards" className="gutter rule py-24 md:py-40">
      <SectionHeading index="05" eyebrow="RECOGNITION" title={lang === "ru" ? "Достижения" : "Awards"} />

      <div>
        {awards.map((a, i) => (
          <Reveal key={a.year} delay={i * 0.04}>
            <div className="rule grid gap-y-4 py-10 first:border-t-0 md:grid-cols-12 md:gap-x-12 md:py-14">
              <time className="display text-[var(--text-huge)] md:col-span-4">{a.year}</time>
              <div className="md:col-span-8">
                <h3 className="text-2xl md:text-3xl">{pick(a.title, lang)}</h3>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-muted)] md:text-lg">
                  {pick(a.text, lang)}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
