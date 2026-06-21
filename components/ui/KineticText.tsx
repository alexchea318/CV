"use client";
import { motion } from "motion/react";
import type { ElementType } from "react";
import { useIsDesktop } from "@/lib/useIsDesktop";

/**
 * Renders lines of giant type that mask-reveal (slide up from a clipped band)
 * when scrolled into view. On mobile / reduced-motion it renders the lines
 * plainly so content is always present in static HTML for SEO.
 */
export function KineticText({
  lines,
  className = "",
  as: Tag = "div",
  delay = 0,
}: {
  lines: string[];
  className?: string;
  as?: ElementType;
  delay?: number;
}) {
  const desktop = useIsDesktop();

  if (!desktop) {
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            initial={{ y: "115%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
