"use client";

import { useState } from "react";
import { useLang, useT } from "@/components/lang";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { about } from "@/content/site";
import { tenurePhrase, tenureUnit } from "@/lib/tenure";

const inkMuted = (a: number) => `rgba(23,21,15,${a})`;

export function About() {
  const { lang } = useLang();
  const t = useT();
  const [active, setActive] = useState(0);

  const s = about.statement;
  const yearsLabel = lang === "ru" ? `${tenureUnit(lang)} в продакшене` : "years in production";

  return (
    <section
      className="gutter"
      style={{ position: "relative", zIndex: 2, paddingBlock: "16vh", borderTop: `1px solid ${inkMuted(0.1)}` }}
    >
      <Reveal className="mono" style={{ fontSize: 12, letterSpacing: ".14em", color: inkMuted(0.45), marginBottom: 54 }}>
        {about.index} <span>{t(about.label)}</span>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: "56px 90px", alignItems: "start" }}>
        {/* Left: statement + stats */}
        <Reveal delay={40}>
          <p
            className="display"
            style={{ margin: 0, maxWidth: 760, fontWeight: 600, lineHeight: 1.16, letterSpacing: "-.02em", fontSize: "clamp(26px,3vw,46px)" }}
          >
            {t(s.leadA)}
            {tenurePhrase(lang)}
            {t(s.leadB)}
            <span className="grad-text-static">{t(s.accent)}</span>
            {t(s.tail)}
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "28px 52px",
              marginTop: 56,
              borderTop: `1px solid ${inkMuted(0.16)}`,
              paddingTop: 38,
            }}
          >
            <div style={{ flex: "0 0 auto" }}>
              <div className="display" style={statNumber}>
                <CountUp />
              </div>
              <div className="mono" style={statLabel}>{yearsLabel}</div>
            </div>
            {about.stats.map((st) => (
              <div key={st.value} style={{ flex: "0 0 auto" }}>
                <div className="display" style={statNumber}>{st.value}</div>
                <div className="mono" style={statLabel}>{t(st.label)}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Right: interactive capability list */}
        <Reveal delay={120}>
          <div className="mono" style={{ fontSize: 11.5, letterSpacing: ".1em", textTransform: "uppercase", color: inkMuted(0.45), marginBottom: 28 }}>
            {t(about.capsHeading)}
          </div>
          {about.caps.map((cap, i) => {
            const on = i === active;
            const last = i === about.caps.length - 1;
            return (
              <div
                key={i}
                data-cursor
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                style={{
                  position: "relative",
                  display: "flex",
                  gap: 18,
                  alignItems: "baseline",
                  borderTop: `1px solid ${inkMuted(0.16)}`,
                  borderBottom: last ? `1px solid ${inkMuted(0.16)}` : undefined,
                  padding: "19px 0",
                  opacity: on ? 1 : 0.5,
                  transition: "opacity .35s ease",
                  cursor: "pointer",
                }}
              >
                <span className="mono" style={{ fontSize: 12, color: inkMuted(0.4), flex: "0 0 26px" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div style={{ flex: 1 }}>
                  <div
                    className="display"
                    style={{
                      fontWeight: 700,
                      fontSize: "clamp(20px,2.1vw,30px)",
                      letterSpacing: "-.015em",
                      color: on ? "#8e4ec6" : undefined,
                      transform: on ? "translateX(8px)" : undefined,
                      transition: "color .3s ease, transform .4s cubic-bezier(.16,1,.3,1)",
                    }}
                  >
                    {t(cap.name)}
                  </div>
                  <div
                    className="mono"
                    style={{
                      fontSize: 12.5,
                      letterSpacing: ".03em",
                      color: inkMuted(0.5),
                      maxHeight: on ? 60 : 0,
                      overflow: "hidden",
                      opacity: on ? 1 : 0,
                      marginTop: on ? 10 : 0,
                      transition: "max-height .45s cubic-bezier(.16,1,.3,1), opacity .4s ease, margin .4s ease",
                    }}
                  >
                    {t(cap.stack)}
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

const statNumber = {
  fontWeight: 800,
  fontSize: "clamp(40px,4vw,64px)",
  lineHeight: 1,
  letterSpacing: "-.03em",
} as const;

const statLabel = {
  fontSize: 11.5,
  letterSpacing: ".05em",
  color: "rgba(23,21,15,.5)",
  marginTop: 10,
} as const;
