"use client";
import dynamic from "next/dynamic";
import { profile } from "@/content/profile";
import { pick, type Locale } from "@/lib/i18n";
import { useIsDesktop } from "@/lib/useIsDesktop";
import { LangSwitch } from "@/components/ui/LangSwitch";

const HeroBackground = dynamic(() => import("@/components/fx/HeroBackground"), { ssr: false });

export function Hero({ lang }: { lang: Locale }) {
  const desktop = useIsDesktop();
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 md:px-16">
      {desktop && <HeroBackground />}
      <div className="absolute right-6 top-6 md:right-16"><LangSwitch current={lang} /></div>
      <div className="relative z-10 max-w-5xl">
        <h1 className="font-display text-5xl leading-[0.95] md:text-8xl">
          <span className="text-gradient">{pick(profile.role, lang)}</span>
        </h1>
        <p className="mt-6 text-xl text-muted md:text-2xl">{pick(profile.name, lang)}</p>
        <p className="mt-2 max-w-2xl text-base text-muted md:text-lg">{pick(profile.tagline, lang)}</p>
      </div>
      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted text-sm tracking-widest">↓</a>
    </section>
  );
}
