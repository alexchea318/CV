import { projects } from "@/content/projects";
import { pick, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Projects({ lang }: { lang: Locale }) {
  return (
    <section id="projects" className="gutter rule py-24 md:py-40">
      <SectionHeading index="04" eyebrow="SELECTED WORK" title={lang === "ru" ? "Проекты" : "Projects"} />

      <div>
        {projects.map((p, i) => {
          const external = p.href !== "#";
          return (
            <Reveal key={p.title.en} delay={i * 0.04}>
              <a
                href={p.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="group rule grid items-center gap-6 py-8 first:border-t-0 md:grid-cols-12 md:py-10"
              >
                <div className="mono md:col-span-1">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="display text-[var(--text-huge)] transition-transform duration-500 ease-out group-hover:translate-x-2 md:col-span-5">
                  {pick(p.title, lang)}
                </h3>
                <p className="text-base text-[var(--color-muted)] md:col-span-4 md:text-lg">
                  {pick(p.text, lang)}
                </p>
                <div className="overflow-hidden md:col-span-2">
                  <img
                    src={p.img}
                    alt={pick(p.title, lang)}
                    className="img-editorial aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <span className="mono shrink-0 self-start text-[var(--color-fg)] md:col-span-12 md:hidden">
                  {external ? "VIEW ↗" : ""}
                </span>
              </a>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
