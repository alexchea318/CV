import { profile } from "@/content/profile";
import { pick, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About({ lang }: { lang: Locale }) {
  return (
    <section id="about" className="px-6 md:px-16 py-28">
      <Reveal><SectionHeading>{lang === "ru" ? "Обо мне" : "About"}</SectionHeading></Reveal>
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] items-start">
        <div className="space-y-5 text-lg text-muted leading-relaxed">
          {pick(profile.about, lang).map((p, i) => (<Reveal key={i} delay={i * 0.05}><p>{p}</p></Reveal>))}
          <Reveal>
            <a href="https://github.com/alexchea318" target="_blank" rel="noreferrer"
               className="inline-block mt-4 border border-line px-6 py-3 rounded-full hover:border-fg transition-colors">
              GitHub →
            </a>
          </Reveal>
        </div>
        <Reveal>
          <img src={profile.photo} alt={pick(profile.name, lang)} className="w-full rounded-2xl object-cover aspect-[4/5]" />
        </Reveal>
      </div>
    </section>
  );
}
