"use client";

import { useLang, T } from "@/components/lang";
import { nav } from "@/content/site";

export function Nav() {
  const { lang, setLang } = useLang();

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "22px 6vw",
        mixBlendMode: "difference",
      }}
    >
      <a
        href="#top"
        data-cursor
        data-magnet
        className="mono"
        style={{
          fontWeight: 600,
          fontSize: 13,
          letterSpacing: ".04em",
          color: "#f3ebdd",
          display: "flex",
          alignItems: "center",
          gap: 9,
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 9,
            height: 9,
            borderRadius: "50%",
            background: "linear-gradient(127deg,#D21306,#FF7543)",
          }}
        />
        {nav.brand}
      </a>

      <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
        {nav.links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            data-cursor
            className="mono nav-link"
            style={{ fontSize: 12, letterSpacing: ".05em", color: "#f3ebdd", opacity: 0.85 }}
          >
            <T v={l.label} />
          </a>
        ))}

        <div
          data-cursor
          className="mono"
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 12,
            letterSpacing: ".05em",
            border: "1px solid rgba(243,235,221,.4)",
            borderRadius: 9999,
            overflow: "hidden",
          }}
        >
          {(["ru", "en"] as const).map((code) => {
            const active = lang === code;
            return (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-pressed={active}
                style={{
                  border: 0,
                  background: active ? "#f3ebdd" : "transparent",
                  color: active ? "#17150f" : "#f3ebdd",
                  padding: "5px 11px",
                  font: "inherit",
                  cursor: "pointer",
                }}
              >
                {code.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
