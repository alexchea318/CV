"use client";
import { useEffect, useRef, type RefObject } from "react";

/** Scroll-reveal: hides element, fades it up when it enters the viewport.
 *  Degrades to visible if IntersectionObserver is unavailable. */
export function useReveal<T extends HTMLElement>(delay = 0): RefObject<T | null> {
  const ref = useRef<T | null>(null);
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
  return ref;
}
