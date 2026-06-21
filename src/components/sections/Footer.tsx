"use client";

import { useT } from "@/components/lang";
import { footer } from "@/content/site";

const inkMuted = (a: number) => `rgba(23,21,15,${a})`;

export function Footer() {
  const t = useT();
  return (
    <footer
      className="gutter mono"
      style={{
        position: "relative",
        zIndex: 2,
        padding: "30px 6vw 36px",
        borderTop: `1px solid ${inkMuted(0.12)}`,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 14,
        fontSize: 11.5,
        letterSpacing: ".05em",
        color: inkMuted(0.5),
      }}
    >
      <span>{t(footer.left)}</span>
    </footer>
  );
}
