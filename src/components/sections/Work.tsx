"use client";

import type { CSSProperties } from "react";
import { useT } from "@/components/lang";
import { Reveal } from "@/components/Reveal";
import { work } from "@/content/site";

const ink = "#17150f";
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
        const hasLink = c.href.startsWith("http");

        const projectBtn = (className: string, style?: React.CSSProperties) => (
          <a
            href={c.href}
            target="_blank"
            rel="noopener"
            data-cursor
            className={`mono ${className}`}
            style={{
              alignItems: "center",
              gap: 9,
              fontSize: 13,
              letterSpacing: ".03em",
              color: ink,
              border: `1px solid ${inkMuted(0.25)}`,
              borderRadius: 9999,
              padding: "9px 18px",
              whiteSpace: "nowrap",
              ...style,
            }}
          >
            {t(work.cta)}
          </a>
        );

        return (
          <Reveal
            key={c.title.ru}
            delay={i * 40}
            {...(hasLink ? { "data-case": "" } : {})}
            style={{
              display: "block",
              borderTop: `1px solid ${inkMuted(0.16)}`,
              borderBottom: last ? `1px solid ${inkMuted(0.16)}` : undefined,
              padding: "44px 0",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "stretch", gap: 28 }}>
              <div style={{ flex: "1 1 420px" }}>
                <div
                  className="mono"
                  style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 12, letterSpacing: ".05em", color: inkMuted(0.5), marginBottom: 16 }}
                >
                  <span>{c.company}</span>
                  <span style={{ opacity: 0.4 }}>/</span>
                  <span>{t(c.period)}</span>
                </div>
                {hasLink ? (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener"
                    data-cursor
                    data-case-title
                    className="display"
                    style={{
                      display: "block",
                      margin: "0 0 16px",
                      fontWeight: 700,
                      lineHeight: 1.02,
                      letterSpacing: "-.025em",
                      fontSize: "clamp(30px,4.6vw,66px)",
                      color: ink,
                    }}
                  >
                    {t(c.title)}
                  </a>
                ) : (
                  <h3
                    className="display"
                    style={{ margin: "0 0 16px", fontWeight: 700, lineHeight: 1.02, letterSpacing: "-.025em", fontSize: "clamp(30px,4.6vw,66px)" }}
                  >
                    {t(c.title)}
                  </h3>
                )}
                <p style={{ margin: 0, maxWidth: 640, fontSize: 16, lineHeight: 1.55, color: inkMuted(0.62) }}>
                  {t(c.text)}
                </p>
                {/* mobile: project button below the description */}
                {hasLink && projectBtn("mb-only", { display: "inline-flex", marginTop: 24 })}
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "space-between", gap: 24, maxWidth: 300 }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "flex-end" }}>
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
                {/* desktop: project button pinned to the card's bottom-right */}
                {hasLink && projectBtn("dt-only", { display: "inline-flex" })}
              </div>
            </div>
          </Reveal>
        );
      })}
    </section>
  );
}
