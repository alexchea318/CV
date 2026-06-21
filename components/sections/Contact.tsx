"use client";

import { useLang, useT } from "@/components/lang";
import { Reveal } from "@/components/Reveal";
import { contact } from "@/content/site";

const inkMuted = (a: number) => `rgba(23,21,15,${a})`;

export function Contact() {
  const t = useT();
  const { lang } = useLang();

  // VK is RU-only — drop it from the English contact row.
  const contactLinks = contact.links.filter((l) => !(l.kind === "VK" && lang === "en"));

  return (
    <section id="contact" className="gutter" style={{ position: "relative", zIndex: 2, padding: "18vh 6vw 8vh" }}>
      <Reveal className="mono" style={{ fontSize: 12, letterSpacing: ".14em", color: inkMuted(0.45), marginBottom: 34 }}>
        {contact.index} <span>{t(contact.label)}</span>
      </Reveal>

      <a
        href={contact.headlineHref}
        target="_blank"
        rel="noopener"
        data-cursor
        data-magnet
        className="display"
        style={{
          display: "inline-block",
          fontWeight: 800,
          lineHeight: 0.9,
          letterSpacing: "-.04em",
          fontSize: "clamp(46px,11vw,180px)",
          background: "linear-gradient(110deg,#17150f 60%,#8e4ec6)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {t(contact.headline)}
      </a>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "18px 44px",
          marginTop: 64,
          borderTop: `1px solid ${inkMuted(0.14)}`,
          paddingTop: 40,
        }}
      >
        {contactLinks.map((l) => {
          const external = l.href.startsWith("http");
          return (
            <a
              key={l.kind}
              href={l.href}
              data-cursor
              {...(external ? { target: "_blank", rel: "noopener" } : {})}
              className="mono"
              style={{ fontSize: 14, letterSpacing: ".03em", display: "flex", alignItems: "center", gap: 9 }}
            >
              <span style={{ color: inkMuted(0.4) }}>↳</span> {l.value}
            </a>
          );
        })}
      </div>
    </section>
  );
}
