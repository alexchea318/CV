"use client";

import { useState } from "react";
import { useT } from "@/components/lang";
import { Reveal } from "@/components/Reveal";
import { achievements } from "@/content/site";

const cream = (a: number) => `rgba(243,235,221,${a})`;

export function Achievements() {
  const t = useT();
  const [active, setActive] = useState(0);
  const items = achievements.items;

  return (
    <section
      id="achievements"
      className="gutter"
      style={{ position: "relative", zIndex: 2, paddingBlock: "15vh", background: "#17150f", color: "#f3ebdd", overflow: "hidden" }}
    >
      <Reveal
        className="mono"
        style={{ display: "flex", alignItems: "baseline", gap: 18, fontSize: 12, letterSpacing: ".14em", color: cream(0.5) }}
      >
        {achievements.index} <span>{t(achievements.label)}</span>
        <span style={{ flex: 1, height: 1, background: cream(0.16) }} />
        <span>{t(achievements.hint)}</span>
      </Reveal>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(330px,1fr))",
          gap: "48px 72px",
          alignItems: "center",
          marginTop: 56,
        }}
      >
        {/* image stage */}
        <Reveal delay={40} style={{ position: "relative", width: "100%", height: "clamp(360px,44vw,560px)" }}>
          <div
            aria-hidden="true"
            className="display"
            style={{
              position: "absolute",
              top: "-9vh",
              left: "-2vw",
              fontWeight: 800,
              fontSize: "19vw",
              lineHeight: 0.8,
              letterSpacing: "-.04em",
              color: "transparent",
              WebkitTextStroke: `1.5px ${cream(0.11)}`,
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            {items[active].year}
          </div>
          {items.map((item, i) => (
            <img
              key={item.year}
              src={item.img}
              alt={t(item.title)}
              loading="lazy"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 16,
                boxShadow: "0 30px 70px rgba(0,0,0,.5)",
                opacity: i === active ? 1 : 0,
                transition: "opacity .6s cubic-bezier(.16,1,.3,1)",
              }}
            />
          ))}
        </Reveal>

        {/* rows */}
        <Reveal delay={120} style={{ display: "flex", flexDirection: "column" }}>
          {items.map((item, i) => {
            const on = i === active;
            const last = i === items.length - 1;
            return (
              <div
                key={item.year}
                data-cursor
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                style={{
                  position: "relative",
                  display: "flex",
                  gap: 22,
                  alignItems: "flex-start",
                  borderTop: `1px solid ${cream(0.18)}`,
                  borderBottom: last ? `1px solid ${cream(0.18)}` : undefined,
                  padding: "30px 0 30px 24px",
                  opacity: on ? 1 : 0.42,
                  transition: "opacity .4s ease",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 30,
                    bottom: 30,
                    width: 3,
                    borderRadius: 2,
                    background: item.color === "violet" ? "#a78bfa" : "linear-gradient(#D21306,#FF7543)",
                    transform: on ? "scaleY(1)" : "scaleY(0)",
                    transformOrigin: "top",
                    transition: "transform .45s cubic-bezier(.16,1,.3,1)",
                  }}
                />
                <span
                  className={item.color === "grad" ? "display grad-text-static" : "display"}
                  style={{
                    fontWeight: 800,
                    fontSize: "clamp(26px,2.4vw,40px)",
                    lineHeight: 1,
                    letterSpacing: "-.03em",
                    flex: "0 0 auto",
                    ...(item.color === "violet" ? { color: "#a78bfa" } : {}),
                  }}
                >
                  {item.year}
                </span>
                <div style={{ flex: 1 }}>
                  <div
                    className="mono"
                    style={{ fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: cream(0.5), marginBottom: 9 }}
                  >
                    {t(item.kicker)}
                  </div>
                  <h3
                    className="display"
                    style={{ margin: 0, fontWeight: 700, lineHeight: 1.06, letterSpacing: "-.02em", fontSize: "clamp(21px,2.5vw,36px)" }}
                  >
                    {t(item.title)}
                  </h3>
                  <div
                    style={{
                      maxHeight: on ? 360 : 0,
                      overflow: "hidden",
                      opacity: on ? 1 : 0,
                      marginTop: on ? 18 : 0,
                      transition: "max-height .55s cubic-bezier(.16,1,.3,1), opacity .5s ease, margin .5s ease",
                    }}
                  >
                    <p style={{ margin: 0, maxWidth: 520, fontSize: 15.5, lineHeight: 1.6, color: cream(0.64) }}>
                      {t(item.text)}
                    </p>
                    {item.cta && (
                      <a
                        href={item.cta.href || "#"}
                        target="_blank"
                        rel="noopener"
                        data-cursor
                        className="mono"
                        style={{ marginTop: 16, fontSize: 13, letterSpacing: ".03em", color: "#FF7543", display: "inline-flex", alignItems: "center", gap: 9 }}
                      >
                        {t(item.cta.label)}
                      </a>
                    )}
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
