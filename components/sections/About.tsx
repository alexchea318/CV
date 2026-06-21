import { profile } from "@/content/profile";
import { pick, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About({ lang }: { lang: Locale }) {
  const paragraphs = pick(profile.about, lang);
  return (
    <section id="about" className="gutter py-24 md:py-40">
      <SectionHeading index="01" eyebrow="ABOUT" title={lang === "ru" ? "Обо мне" : "About"} />

      <div className="grid items-end gap-12 md:grid-cols-12 md:gap-x-16">
        {/* Editorial portrait — full-height, grayscale, colours on hover, no rounded box. */}
        <div className="order-2 overflow-hidden md:order-1 md:col-span-7">
          <Reveal>
            <img
              src={profile.photo}
              alt={pick(profile.name, lang)}
              className="img-editorial h-[60vh] w-full object-cover md:h-[82vh]"
            />
          </Reveal>
        </div>

        <div className="order-1 space-y-7 md:order-2 md:col-span-5">
          {paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <p
                className={
                  i === 0
                    ? "text-xl leading-snug text-[var(--color-fg)] md:text-2xl"
                    : "text-lg leading-relaxed text-[var(--color-muted)]"
                }
              >
                {p}
              </p>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <a
              href="https://github.com/alexchea318"
              target="_blank"
              rel="noreferrer"
              className="mono link-wipe mt-2 inline-block text-[var(--color-fg)]"
            >
              GITHUB ↗
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
