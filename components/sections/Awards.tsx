import { awards } from "@/content/awards";
import { pick, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Awards({ lang }: { lang: Locale }) {
  return (
    <section id="awards" className="px-6 md:px-16 py-28 border-t border-line">
      <Reveal><SectionHeading>{lang === "ru" ? "Достижения" : "Awards"}</SectionHeading></Reveal>
      <div className="grid gap-6 md:grid-cols-2">
        {awards.map((a, i) => (
          <Reveal key={a.year} delay={i * 0.05}>
            <div className="rounded-2xl border border-line p-6">
              <time className="text-gradient font-display text-2xl">{a.year}</time>
              <h3 className="font-display text-xl mt-2 mb-2">{pick(a.title, lang)}</h3>
              <p className="text-muted text-sm">{pick(a.text, lang)}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
