"use client";

import { useT } from "@/components/lang";
import { Reveal } from "@/components/Reveal";
import { work } from "@/content/site";

const inkMuted = (a: number) => `rgba(23,21,15,${a})`;

export function Work() {
  const t = useT();

  return (
    <section id="work" className="gutter" style={{ position: "relative", zIndex: 2, paddingBlock: "16vh" }}>
      <Reveal className="mono" style={{ fontSize: 12, letterSpacing: ".14em", color: inkMuted(0.45), marginBottom: 54 }}>
        {work.index} <span>{t(work.label)}</span>
      </Reveal>

      {work.cases.map((c, i) => {
        const last = i === work.cases.length - 1;
        const external = c.href.startsWith("http");
        return (
          <Reveal
            key={c.title.ru}
            as="a"
            delay={i * 40}
            data-cursor
            data-case
            href={c.href}
            {...(external ? { target: "_blank", rel: "noopener" } : {})}
            style={{
              display: "block",
              borderTop: `1px solid ${inkMuted(0.16)}`,
              borderBottom: last ? `1px solid ${inkMuted(0.16)}` : undefined,
              padding: "44px 0",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 28 }}>
              <div style={{ flex: "1 1 420px" }}>
                <div
                  className="mono"
                  style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 12, letterSpacing: ".05em", color: inkMuted(0.5), marginBottom: 16 }}
                >
                  <span>{c.company}</span>
                  <span style={{ opacity: 0.4 }}>/</span>
                  <span>{t(c.period)}</span>
                </div>
                <h3
                  className="display"
                  style={{ margin: "0 0 16px", fontWeight: 700, lineHeight: 1.02, letterSpacing: "-.025em", fontSize: "clamp(30px,4.6vw,66px)" }}
                >
                  {t(c.title)}
                </h3>
                <p style={{ margin: 0, maxWidth: 640, fontSize: 16, lineHeight: 1.55, color: inkMuted(0.62) }}>
                  {t(c.text)}
                </p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, maxWidth: 300, justifyContent: "flex-end" }}>
                {c.tags.map((tag, ti) => (
                  <span
                    key={ti}
                    className="mono"
                    style={{ fontSize: 11.5, border: `1px solid ${inkMuted(0.2)}`, borderRadius: 9999, padding: "5px 12px" }}
                  >
                    {t(tag)}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        );
      })}
    </section>
  );
}
