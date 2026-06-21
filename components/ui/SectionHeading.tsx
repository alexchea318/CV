import type { ReactNode } from "react";

export function SectionHeading({ children }: { children: ReactNode }) {
  return <h2 className="font-display text-3xl md:text-5xl mb-10 text-fg">{children}</h2>;
}
