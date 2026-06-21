import { projects } from "@/content/projects";
import { pick, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Projects({ lang }: { lang: Locale }) {
  return (
    <section id="projects" className="px-6 md:px-16 py-28 border-t border-line">
      <Reveal><SectionHeading>{lang === "ru" ? "Проекты" : "Projects"}</SectionHeading></Reveal>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.title.en} delay={i * 0.05}>
            <a href={p.href} target={p.href === "#" ? undefined : "_blank"} rel="noreferrer"
               className="group block rounded-2xl border border-line overflow-hidden hover:border-fg/40 transition-colors">
              <img src={p.img} alt={pick(p.title, lang)} className="w-full aspect-video object-cover" />
              <div className="p-6">
                <h3 className="font-display text-xl mb-2">{pick(p.title, lang)}</h3>
                <p className="text-muted text-sm">{pick(p.text, lang)}</p>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
