"use client";

import { useT } from "@/components/lang";
import { Reveal } from "@/components/Reveal";
import { skills } from "@/content/site";

const cream = (a: number) => `rgba(243,235,221,${a})`;

export function Skills() {
  const t = useT();

  return (
    <section
      className="gutter"
      style={{ position: "relative", zIndex: 2, paddingBlock: "14vh", background: "#17150f", color: "#f3ebdd" }}
    >
      <Reveal className="mono" style={{ fontSize: 12, letterSpacing: ".14em", color: cream(0.5), marginBottom: 54 }}>
        {skills.index} <span>{t(skills.label)}</span>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "48px 56px" }}>
        {skills.groups.map((g, gi) => (
          <Reveal key={gi} delay={gi * 30}>
            <div className="mono" style={{ fontSize: 12, letterSpacing: ".08em", color: "#FF7543", marginBottom: 18 }}>
              {t(g.title)}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
              {g.items.map((item, ii) => (
                <span key={ii} style={{ display: "contents" }}>
                  <span style={{ fontWeight: 500, fontSize: 16, color: cream(0.85) }}>{t(item)}</span>
                  {ii < g.items.length - 1 && <span style={{ opacity: 0.3 }}>·</span>}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
