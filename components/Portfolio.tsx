"use client";

import type { Locale } from "@/lib/i18n";
import { LangProvider } from "@/components/lang";
import { Interactions } from "@/components/Interactions";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Achievements } from "@/components/sections/Achievements";
import { Work } from "@/components/sections/Work";
import { Marquee } from "@/components/sections/Marquee";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export function Portfolio({ initialLang }: { initialLang: Locale }) {
  return (
    <LangProvider initial={initialLang}>
      <div style={{ position: "relative" }}>
        {/* custom cursor (desktop, enabled by Interactions) */}
        <div
          data-cursor-ring
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: 42,
            height: 42,
            border: "1.5px solid #17150f",
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 9999,
            transform: "translate(-50%,-50%)",
            transition:
              "width .25s cubic-bezier(.16,1,.3,1),height .25s cubic-bezier(.16,1,.3,1),border-radius .25s cubic-bezier(.16,1,.3,1),border-width .25s,background .25s,opacity .3s",
            mixBlendMode: "difference",
            opacity: 0,
            display: "none",
          }}
        />
        <div
          data-cursor-dot
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: 6,
            height: 6,
            background: "#17150f",
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 10000,
            transform: "translate(-50%,-50%)",
            opacity: 0,
            display: "none",
            mixBlendMode: "difference",
          }}
        />

        {/* parallax watermark */}
        <div
          data-parallax="0.18"
          aria-hidden="true"
          className="display"
          style={{
            position: "absolute",
            top: "78vh",
            left: "-2vw",
            fontWeight: 800,
            fontSize: "34vw",
            lineHeight: 0.8,
            letterSpacing: "-.04em",
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(23,21,15,.07)",
            pointerEvents: "none",
            zIndex: 0,
            whiteSpace: "nowrap",
          }}
        >
          RAG
        </div>

        <Nav />
        <main>
          <Hero />
          <About />
          <Achievements />
          <Work />
          <Marquee />
          <Experience />
          <Skills />
          <Contact />
        </main>
        <Footer />

        <Interactions />
      </div>
    </LangProvider>
  );
}
