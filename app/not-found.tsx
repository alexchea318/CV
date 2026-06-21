import Link from "next/link";

// Explicit app-router 404 so static export never falls back to the
// pages-router error page (which intermittently breaks `output: export`).
export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        textAlign: "center",
        padding: "6vw",
      }}
    >
      <div className="display" style={{ fontWeight: 800, fontSize: "clamp(64px,18vw,220px)", letterSpacing: "-.04em", lineHeight: 0.9 }}>
        404
      </div>
      <p className="mono" style={{ fontSize: 13, letterSpacing: ".1em", color: "rgba(23,21,15,.55)", margin: 0 }}>
        СТРАНИЦА НЕ НАЙДЕНА · PAGE NOT FOUND
      </p>
      <Link
        href="/"
        className="mono"
        style={{ fontSize: 14, border: "1px solid rgba(23,21,15,.25)", borderRadius: 9999, padding: "10px 20px" }}
      >
        ↳ На главную / Home
      </Link>
    </main>
  );
}
