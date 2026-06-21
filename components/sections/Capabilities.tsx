import { capabilities } from "@/content/capabilities";
import { pick, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Marquee } from "@/components/ui/Marquee";

// Curated keyword ticker — the working vocabulary, drawn from the stack.
const TICKER = [
  "RAG",
  "LLM",
  "AI Agents",
  "Java · Spring",
  "Python",
  "React · TypeScript",
  "Elasticsearch",
  "PostgreSQL",
  "lakeFS",
  "Docker",
  "Jenkins",
  "Playwright",
  "Graylog",
  "Grafana",
  "Sentry",
  "MCP",
  "Claude Code",
];

export function Capabilities({ lang }: { lang: Locale }) {
  return (
    <section id="stack" className="gutter rule py-24 md:py-40">
      <SectionHeading index="02" eyebrow="CAPABILITIES" title={lang === "ru" ? "Компетенции" : "Capabilities"} />

      <p className="mb-16 max-w-2xl text-lg text-[var(--color-muted)] md:text-xl">
        {lang === "ru"
          ? "Полный цикл разработки и внедрения production-систем, включая RAG (Retrieval-Augmented Generation)."
          : "Full-cycle development and delivery of production systems, including RAG (Retrieval-Augmented Generation)."}
      </p>

      <div>
        {capabilities.map((c, i) => (
          <Reveal key={c.category.en} delay={i * 0.04}>
            <div className="rule grid items-start gap-x-8 gap-y-4 py-9 first:border-t-0 md:grid-cols-12 md:py-12">
              <div className="mono pt-2 md:col-span-1">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="display text-[var(--text-huge)] md:col-span-4">{pick(c.category, lang)}</h3>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-1 md:col-span-7 md:pt-3">
                {c.items.map((it, j) => (
                  <li
                    key={j}
                    className="text-base leading-snug text-[var(--color-muted)] md:text-lg"
                  >
                    {pick(it, lang)}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Marquee items={TICKER} className="mono rule mt-20 py-7 text-base text-[var(--color-fg)] md:text-lg" />
    </section>
  );
}
