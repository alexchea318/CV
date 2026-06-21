"use client";

import { useEffect, useState } from "react";
import { useLang, T } from "@/components/lang";
import type { Locale } from "@/lib/i18n";
import { nav } from "@/content/site";

const ink = "#17150f";

function LangToggle({ vertical = false }: { vertical?: boolean }) {
  const { lang, setLang } = useLang();
  return (
    <div
      data-cursor
      className="mono"
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontSize: 12,
        letterSpacing: ".05em",
        border: "1px solid rgba(23,21,15,.2)",
        borderRadius: 9999,
        overflow: "hidden",
        alignSelf: vertical ? "flex-start" : "center",
      }}
    >
      {(["ru", "en"] as Locale[]).map((code) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            style={{
              border: 0,
              background: active ? ink : "transparent",
              color: active ? "#f3ebdd" : ink,
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
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);

  // Close the mobile menu on hash navigation (link tap) and on Escape.
  useEffect(() => {
    if (!open) return;
    const onHash = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("hashchange", onHash);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        padding: "18px 6vw",
      }}
    >
      <a
        href="#top"
        data-cursor
        data-magnet
        className="mono nav-pill"
        style={{
          fontWeight: 600,
          fontSize: 13,
          letterSpacing: ".04em",
          color: ink,
          display: "flex",
          alignItems: "center",
          gap: 9,
          padding: "9px 15px",
          borderRadius: 9999,
        }}
      >
        {nav.brand}
      </a>

      {/* desktop links */}
      <div className="dt-only nav-pill" style={{ display: "flex", alignItems: "center", gap: 24, padding: "9px 18px", borderRadius: 9999 }}>
        {nav.links.map((l) => (
          <a key={l.href} href={l.href} data-cursor className="mono" style={{ fontSize: 12, letterSpacing: ".05em", color: ink, opacity: 0.85 }}>
            <T v={l.label} />
          </a>
        ))}
        <LangToggle />
      </div>

      {/* mobile burger */}
      <button
        type="button"
        className="mb-only nav-pill"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        style={{
          border: "1px solid rgba(23,21,15,.08)",
          width: 44,
          height: 44,
          borderRadius: 9999,
          display: "grid",
          placeItems: "center",
          cursor: "pointer",
        }}
      >
        <span style={{ position: "relative", width: 18, height: 12, display: "inline-block" }}>
          {[0, 1, 2].map((n) => (
            <span
              key={n}
              style={{
                position: "absolute",
                left: 0,
                width: 18,
                height: 2,
                borderRadius: 2,
                background: ink,
                top: n === 0 ? 0 : n === 1 ? 5 : 10,
                transition: "transform .3s cubic-bezier(.16,1,.3,1), opacity .2s ease",
                transform: open
                  ? n === 0
                    ? "translateY(5px) rotate(45deg)"
                    : n === 1
                      ? "scaleX(0)"
                      : "translateY(-5px) rotate(-45deg)"
                  : "none",
                opacity: open && n === 1 ? 0 : 1,
              }}
            />
          ))}
        </span>
      </button>

      {/* mobile menu sheet */}
      {open && (
        <>
          <div className="mb-only" onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: -1 }} />
          <div
            className="mb-only nav-pill"
            style={{
              position: "absolute",
              top: 74,
              right: "6vw",
              minWidth: 200,
              padding: "16px 18px",
              borderRadius: 18,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              animation: "axc-reveal .35s cubic-bezier(.16,1,.3,1) both",
            }}
          >
            {nav.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="mono"
                style={{ fontSize: 14, letterSpacing: ".05em", color: ink }}
              >
                <T v={l.label} />
              </a>
            ))}
            <div style={{ borderTop: "1px solid rgba(23,21,15,.12)", paddingTop: 14 }}>
              <LangToggle vertical />
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
