"use client";

import { useEffect, useState } from "react";
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

  // The capability list is hover-selectable on desktop only. On mobile every
  // row is shown statically (see .cap-row/.cap-stack in globals.css) with no
  // tap-to-select. Starts false so SSR/hydration match, then enables on wide.
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 821px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const s = about.statement;

  return (
    <section
      className="gutter"
      style={{ position: "relative", zIndex: 2, paddingBlock: "16vh" }}
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
            {about.stats.map((st, i) => (
              <div key={i} style={{ flex: "0 0 auto" }}>
                <div className="display" style={statNumber}>{t(st.value)}</div>
                <div className="mono" style={{ ...statLabel, display: "inline-flex", alignItems: "center", gap: 7 }}>
                  {t(st.label)}
                  {st.hint && <StatHint text={t(st.hint)} />}
                </div>
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
            const on = isDesktop && i === active;
            const last = i === about.caps.length - 1;
            return (
              <div
                key={i}
                {...(isDesktop ? { "data-cursor": "" } : {})}
                className="cap-row"
                onMouseEnter={isDesktop ? () => setActive(i) : undefined}
                onClick={isDesktop ? () => setActive(i) : undefined}
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
                  cursor: isDesktop ? "pointer" : "default",
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
                    className="mono cap-stack"
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

/** Small "?" badge that reveals the full degree name on hover (desktop) or
 *  tap (mobile). */
function StatHint({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span style={{ position: "relative", display: "inline-flex" }}>
      <button
        type="button"
        aria-label={text}
        data-cursor
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        style={{
          width: 17,
          height: 17,
          borderRadius: "50%",
          border: `1px solid ${inkMuted(0.3)}`,
          background: "transparent",
          color: inkMuted(0.55),
          font: "inherit",
          fontSize: 10.5,
          lineHeight: 1,
          cursor: "pointer",
          display: "inline-grid",
          placeItems: "center",
          padding: 0,
        }}
      >
        ?
      </button>
      {open && (
        <span
          role="tooltip"
          style={{
            position: "absolute",
            bottom: "calc(100% + 9px)",
            left: 0,
            zIndex: 50,
            width: "max-content",
            maxWidth: 280,
            padding: "10px 13px",
            borderRadius: 10,
            background: "#17150f",
            color: "#f3ebdd",
            fontFamily: "var(--font-sans)",
            fontSize: 12.5,
            lineHeight: 1.45,
            letterSpacing: 0,
            boxShadow: "0 14px 34px rgba(23,21,15,.28)",
          }}
        >
          {text}
        </span>
      )}
    </span>
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
