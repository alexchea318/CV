import { capabilities } from "@/content/capabilities";
import { pick, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Capabilities({ lang }: { lang: Locale }) {
  return (
    <section id="stack" className="px-6 md:px-16 py-28 border-t border-line">
      <Reveal><SectionHeading>{lang === "ru" ? "Компетенции" : "Capabilities"}</SectionHeading></Reveal>
      <p className="text-muted max-w-2xl mb-12">
        {lang === "ru"
          ? "Полный цикл разработки и внедрения production-систем, включая RAG."
          : "Full-cycle development and delivery of production systems, including RAG."}
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((c, i) => (
          <Reveal key={c.category.en} delay={i * 0.05}>
            <div className="h-full rounded-2xl border border-line p-6 hover:border-fg/40 transition-colors">
              <h3 className="font-display text-xl mb-4 text-gradient">{pick(c.category, lang)}</h3>
              <ul className="space-y-2 text-muted text-sm leading-relaxed">
                {c.items.map((it, j) => (<li key={j}>{pick(it, lang)}</li>))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
