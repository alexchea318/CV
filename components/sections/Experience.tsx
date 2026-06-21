import { experience } from "@/content/experience";
import { pick, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Experience({ lang }: { lang: Locale }) {
  return (
    <section id="experience" className="gutter rule py-24 md:py-40">
      <SectionHeading index="03" eyebrow="EXPERIENCE" title={lang === "ru" ? "Опыт" : "Experience"} />

      <div>
        {experience.map((job, i) => (
          <Reveal key={job.company} delay={i * 0.04}>
            <div className="rule grid gap-y-8 py-10 first:border-t-0 md:grid-cols-12 md:gap-x-12 md:py-16">
              <div className="md:col-span-5">
                <h3 className="display text-[var(--text-huge)]">{job.company}</h3>
                <p className="mono mt-4">{pick(job.span, lang)}</p>
              </div>

              {/* Roles within the company — a typed timeline. */}
              <ol className="md:col-span-7">
                {job.roles.map((role, j) => (
                  <li
                    key={j}
                    className="relative border-l border-[var(--color-faint)] pb-10 pl-7 last:pb-0"
                  >
                    <span className="absolute left-0 top-1.5 h-1.5 w-1.5 -translate-x-[3.5px] rounded-full bg-[var(--color-fg)]" />
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h4 className="text-xl md:text-2xl">{pick(role.title, lang)}</h4>
                      <span className="mono">{pick(role.period, lang)}</span>
                    </div>
                    <p className="mt-3 max-w-xl text-base leading-relaxed text-[var(--color-muted)] md:text-lg">
                      {pick(role.text, lang)}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
