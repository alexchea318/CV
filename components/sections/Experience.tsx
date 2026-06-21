"use client";

import { useState } from "react";
import { useT } from "@/components/lang";
import { Reveal } from "@/components/Reveal";
import { experience } from "@/content/site";

const inkMuted = (a: number) => `rgba(23,21,15,${a})`;

export function Experience() {
  const t = useT();
  const [active, setActive] = useState(0);
  const [openM, setOpenM] = useState(0);
  const roles = experience.roles;

  return (
    <section id="experience" className="gutter" style={{ position: "relative", zIndex: 2, paddingBlock: "16vh" }}>
      <Reveal className="mono" style={{ display: "flex", alignItems: "baseline", gap: 18, fontSize: 12, letterSpacing: ".14em", color: inkMuted(0.45), marginBottom: 56 }}>
        {experience.index} <span>{t(experience.label)}</span>
        <span className="dt-only" style={{ flex: 1, height: 1, background: inkMuted(0.16) }} />
        <span className="dt-only">{t(experience.hint)}</span>
      </Reveal>

      {/* desktop: timeline + cross-fade panels */}
      <div className="dt-only" style={{ display: "flex", flexWrap: "wrap", gap: "48px 80px", alignItems: "flex-start" }}>
        <Reveal delay={40} style={{ flex: "1 1 330px", display: "flex", flexDirection: "column" }}>
          {roles.map((role, i) => {
            const on = i === active;
            const last = i === roles.length - 1;
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
                  padding: "20px 0 20px 22px",
                  opacity: on ? 1 : 0.4,
                  transition: "opacity .35s ease",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{ position: "absolute", left: 0, top: 20, bottom: 20, width: 3, borderRadius: 2, background: "#8e4ec6", transform: on ? "scaleY(1)" : "scaleY(0)", transformOrigin: "top", transition: "transform .45s cubic-bezier(.16,1,.3,1)" }}
                />
                <span className="mono" style={{ fontSize: 12.5, letterSpacing: ".03em", color: inkMuted(0.5), flex: "0 0 96px" }}>{t(role.period)}</span>
                <div style={{ flex: 1 }}>
                  <div
                    className="display"
                    style={{ fontWeight: 700, fontSize: "clamp(18px,1.9vw,27px)", letterSpacing: "-.015em", color: on ? "#8e4ec6" : undefined, transform: on ? "translateX(8px)" : undefined, transition: "color .3s ease, transform .4s cubic-bezier(.16,1,.3,1)" }}
                  >
                    {t(role.title)}
                  </div>
                  <div className="mono" style={{ fontSize: 12, color: inkMuted(0.5), marginTop: 4 }}>{role.company}</div>
                </div>
              </div>
            );
          })}
        </Reveal>

        <Reveal delay={120} style={{ flex: "1.5 1 440px", display: "grid" }}>
          {roles.map((role, i) => {
            const on = i === active;
            return (
              <div key={i} style={{ gridArea: "1 / 1", opacity: on ? 1 : 0, pointerEvents: on ? "auto" : "none", transition: "opacity .5s cubic-bezier(.16,1,.3,1)" }} aria-hidden={!on}>
                <PanelBody role={role} t={t} />
              </div>
            );
          })}
        </Reveal>
      </div>

      {/* mobile: accordion */}
      <div className="mb-only">
        {roles.map((role, i) => {
          const on = i === openM;
          const last = i === roles.length - 1;
          return (
            <div key={i} style={{ borderTop: `1px solid ${inkMuted(0.16)}`, borderBottom: last ? `1px solid ${inkMuted(0.16)}` : undefined }}>
              <button
                type="button"
                onClick={() => setOpenM(on ? -1 : i)}
                aria-expanded={on}
                style={{ width: "100%", textAlign: "left", background: "none", border: 0, padding: "20px 0 20px 16px", position: "relative", cursor: "pointer", display: "flex", flexDirection: "column", gap: 4, font: "inherit", color: "inherit" }}
              >
                <span style={{ position: "absolute", left: 0, top: 20, bottom: 20, width: 3, borderRadius: 2, background: "#8e4ec6", transform: on ? "scaleY(1)" : "scaleY(0)", transformOrigin: "top", transition: "transform .4s cubic-bezier(.16,1,.3,1)" }} />
                <span className="mono" style={{ fontSize: 12, letterSpacing: ".03em", color: inkMuted(0.5) }}>{t(role.period)}</span>
                <span className="display" style={{ fontWeight: 700, fontSize: "clamp(19px,5.4vw,26px)", letterSpacing: "-.015em", color: on ? "#8e4ec6" : undefined, transition: "color .3s ease" }}>
                  {t(role.title)}
                </span>
                <span className="mono" style={{ fontSize: 12, color: inkMuted(0.5) }}>{role.company}</span>
              </button>
              {on && (
                <div style={{ padding: "0 0 26px 16px", animation: "axc-reveal .4s cubic-bezier(.16,1,.3,1) both" }}>
                  <PanelBody role={role} t={t} compact />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function PanelBody({
  role,
  t,
  compact = false,
}: {
  role: (typeof experience.roles)[number];
  t: (v: { ru: string; en: string } | string) => string;
  compact?: boolean;
}) {
  return (
    <>
      <div className="mono" style={{ fontSize: 11.5, letterSpacing: ".06em", color: inkMuted(0.45), marginBottom: compact ? 12 : 14 }}>
        {t(role.dateRange)}
      </div>
      {!compact && (
        <>
          <h3 className="display" style={{ margin: 0, fontWeight: 700, lineHeight: 1.04, letterSpacing: "-.02em", fontSize: "clamp(24px,2.8vw,40px)" }}>{t(role.title)}</h3>
          <div className="mono" style={{ fontSize: 13, color: inkMuted(0.5), marginTop: 7 }}>{role.company}</div>
        </>
      )}
      <p style={{ margin: compact ? "0 0 20px" : "18px 0 26px", maxWidth: 560, fontSize: 15.5, lineHeight: 1.55, color: inkMuted(0.62) }}>{t(role.blurb)}</p>
      {role.groups.map((g, gi) => (
        <div key={gi} style={{ display: "flex", flexWrap: "wrap", gap: "6px 18px", borderTop: `1px solid ${inkMuted(0.12)}`, padding: "13px 0" }}>
          <span className="mono" style={{ fontSize: 11, letterSpacing: ".08em", color: "#8e4ec6", flex: "0 0 132px" }}>{g.label}</span>
          <span style={{ flex: "1 1 220px", fontSize: 14, lineHeight: 1.5, color: inkMuted(0.7) }}>{t(g.value)}</span>
        </div>
      ))}
    </>
  );
}
