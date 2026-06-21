import { marquee } from "@/content/site";

const STARS = ["#8e4ec6", "#D21306"];

function Row({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      aria-hidden={ariaHidden || undefined}
      className="display"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 34,
        paddingRight: 34,
        fontWeight: 700,
        fontSize: "clamp(22px,3vw,40px)",
        letterSpacing: "-.02em",
        whiteSpace: "nowrap",
      }}
    >
      {marquee.map((phrase, i) => (
        <span key={i} style={{ display: "contents" }}>
          <span>{phrase}</span>
          <span style={{ color: STARS[i % STARS.length] }}>✳</span>
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div
      style={{
        position: "relative",
        zIndex: 2,
        overflow: "hidden",
        borderTop: "1px solid rgba(23,21,15,.12)",
        borderBottom: "1px solid rgba(23,21,15,.12)",
        padding: "26px 0",
        background: "#ece2d0",
      }}
    >
      <div className="marquee-track">
        <Row />
        <Row ariaHidden />
      </div>
    </div>
  );
}
