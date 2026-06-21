"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Progressive-enhancement scroll reveal. Server-renders visible; on the client
 * it hides, then fades up via CSS when it enters the viewport. Honors
 * prefers-reduced-motion (handled in globals.css) and degrades to plain content
 * if IntersectionObserver is unavailable.
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
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.setAttribute("data-reveal", "");
    if (delay) el.style.animationDelay = `${delay}ms`;

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            io.unobserve(el);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <Tag ref={ref} className={`reveal ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
