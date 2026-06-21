"use client";

import { useLang, useT } from "@/components/lang";
import { hero } from "@/content/site";
import { tenurePhrase } from "@/lib/tenure";

const inkMuted = (a: number) => `rgba(23,21,15,${a})`;

export function Hero() {
  const { lang } = useLang();
  const t = useT();

  return (
    <header
      id="top"
      style={{
        position: "relative",
        zIndex: 2,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "108px 6vw 48px",
      }}
    >
      <div style={{ marginBottom: 18 }}>
        <div
          className="mono"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 13,
            letterSpacing: ".14em",
            textTransform: "uppercase",
            color: inkMuted(0.55),
          }}
        >
          <span>{t(hero.location)}</span>
          <span style={{ flex: "0 0 56px", height: 1, background: inkMuted(0.3) }} />
          <span>{`${tenurePhrase(lang)} ${t(hero.tenureSuffix)}`}</span>
        </div>
      </div>

      <h1
        className="display"
        style={{
          margin: 0,
          fontWeight: 800,
          lineHeight: 0.86,
          letterSpacing: "-.045em",
          fontSize: "clamp(58px,15.5vw,250px)",
        }}
      >
        <span style={{ display: "block", overflow: "hidden" }}>
          <span style={{ display: "block" }}>{t(hero.firstName)}</span>
        </span>
        <span style={{ display: "block", overflow: "hidden" }}>
          <span className="grad-text" style={{ display: "block" }}>
            {t(hero.lastName)}
          </span>
        </span>
      </h1>

      <div style={{ marginTop: 30 }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "10px 18px" }}>
          <span
            className="display"
            style={{ fontWeight: 700, fontSize: "clamp(22px,3vw,42px)", letterSpacing: "-.025em" }}
          >
            {t(hero.role)}
          </span>
          <span
            className="mono"
            style={{ fontSize: "clamp(12px,1.1vw,15px)", letterSpacing: ".04em", color: inkMuted(0.5), paddingBottom: 5 }}
          >
            {t(hero.spec)}
          </span>
        </div>
        <div
          className="mono"
          style={{
            marginTop: 15,
            fontSize: 13,
            letterSpacing: ".04em",
            color: inkMuted(0.55),
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 9,
          }}
        >
          <span>{t(hero.backgroundLabel)}</span>
          <span style={{ color: "#8e4ec6", fontWeight: 600 }}>{hero.backgroundRoles[0]}</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span style={{ color: "#8e4ec6", fontWeight: 600 }}>{hero.backgroundRoles[1]}</span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 32,
          marginTop: 40,
        }}
      >
        <div style={{ maxWidth: 580 }}>
          <p style={{ margin: 0, fontSize: "clamp(17px,1.5vw,21px)", lineHeight: 1.5, color: inkMuted(0.72) }}>
            {t(hero.tagline)}
          </p>
        </div>
        <div>
          <div
            className="mono"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 11,
              fontSize: 13,
              letterSpacing: ".04em",
              border: `1px solid ${inkMuted(0.18)}`,
              borderRadius: 9999,
              padding: "10px 18px",
              background: "rgba(255,253,247,.6)",
            }}
          >
            <span
              data-pulse
              style={{
                display: "inline-block",
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: "#30a46c",
                animation: "axc-pulse 2.2s ease-in-out infinite",
              }}
            />
            <span>{t(hero.status)}</span>
          </div>
        </div>
      </div>

      <div
        className="mono"
        style={{
          position: "absolute",
          bottom: 34,
          left: "6vw",
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontSize: 11,
          letterSpacing: ".12em",
          color: inkMuted(0.45),
        }}
      >
        <span style={{ position: "relative", display: "inline-block", width: 18, height: 26, border: `1px solid ${inkMuted(0.35)}`, borderRadius: 9 }}>
          <span
            data-cue
            style={{
              position: "absolute",
              top: 5,
              left: "50%",
              width: 2,
              height: 6,
              background: inkMuted(0.6),
              transform: "translateX(-50%)",
              animation: "axc-cue 1.8s ease-in-out infinite",
            }}
          />
        </span>
        <span>{t(hero.scroll)}</span>
      </div>
    </header>
  );
}
