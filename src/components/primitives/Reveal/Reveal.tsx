"use client";

import { type ElementType, type ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";

/**
 * Progressive-enhancement scroll reveal. Server-renders visible; on the client
 * it hides, then fades up via CSS (see .reveal in globals.css) when it enters
 * the viewport. Honors prefers-reduced-motion.
 */
export function Reveal({
  as,
  children,
  className = "",
  delay = 0,
  ...rest
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  [key: string]: unknown;
}) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useReveal<HTMLElement>(delay);
  return (
    <Tag ref={ref} className={`reveal ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
