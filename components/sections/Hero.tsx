import { profile } from "@/content/profile";
import { pick, type Locale } from "@/lib/i18n";
import { LangSwitch } from "@/components/ui/LangSwitch";
import { KineticText } from "@/components/ui/KineticText";

export function Hero({ lang }: { lang: Locale }) {
  const status = pick(profile.status, lang);
  return (
    <section className="gutter relative flex min-h-svh flex-col justify-between pb-10 pt-8 md:pt-10">
      {/* Identity bar */}
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <p className="display text-xl leading-none md:text-2xl">{pick(profile.name, lang)}</p>
          <p className="mono mt-2">{pick(profile.role, lang)}</p>
        </div>
        <div className="flex shrink-0 items-center gap-6">
          <p className="mono hidden max-w-[16rem] text-right normal-case tracking-normal text-[var(--color-muted)] sm:block">
            {pick(profile.tagline, lang)}
          </p>
          <LangSwitch current={lang} />
        </div>
      </div>

      {/* Giant thesis */}
      <div className="relative py-10">
        <KineticText
          as="h1"
          lines={pick(profile.thesis, lang)}
          className="display text-[var(--text-mega)]"
          delay={0.1}
        />
        <p className="mt-10 max-w-md text-base text-[var(--color-fg)] md:absolute md:right-0 md:bottom-12 md:max-w-xs md:text-right md:text-lg">
          {pick(profile.heroBlurb, lang)}
        </p>
      </div>

      {/* Telemetry / scroll cue */}
      <div className="flex items-end justify-between gap-6">
        <ul className="mono flex flex-wrap gap-x-6 gap-y-1">
          {status.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-fg)]" />
              {item}
            </li>
          ))}
        </ul>
        <a href="#about" className="mono link-wipe hidden shrink-0 md:inline-block">
          {lang === "ru" ? "ВНИЗ ↓" : "SCROLL ↓"}
        </a>
      </div>
    </section>
  );
}
