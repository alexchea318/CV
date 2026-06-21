import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Capabilities } from "@/components/sections/Capabilities";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Awards } from "@/components/sections/Awards";
import { Contacts } from "@/components/sections/Contacts";

export function generateStaticParams() {
  return [{ lang: "ru" }, { lang: "en" }];
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const l = lang as Locale;
  return (
    <SmoothScroll>
      <main>
        <Hero lang={l} />
        <About lang={l} />
        <Capabilities lang={l} />
        <Experience lang={l} />
        <Projects lang={l} />
        <Awards lang={l} />
        <Contacts lang={l} />
        <footer className="gutter rule mono flex flex-wrap items-center justify-between gap-3 py-10">
          <span>© {l === "ru" ? "Чеченев Александр" : "Alexander Chechenev"} — 2026</span>
          <span>{l === "ru" ? "СПБ · NEXT.JS · СОБРАНО ВРУЧНУЮ" : "SPB · NEXT.JS · HAND-BUILT"}</span>
        </footer>
      </main>
    </SmoothScroll>
  );
}
