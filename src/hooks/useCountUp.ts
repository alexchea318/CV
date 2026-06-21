"use client";
import { useEffect, useRef, useState, type RefObject } from "react";

/** Animated count-up to `to`, triggered when scrolled into view.
 *  Honors reduced-motion (jumps to final value). */
export function useCountUp(to: number): {
  ref: RefObject<HTMLSpanElement | null>;
  value: number;
} {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      setValue(to);
      return;
    }
    let done = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting || done) continue;
          done = true;
          io.disconnect();
          const dur = 1100;
          const t0 = performance.now();
          const step = (t: number) => {
            const p = Math.min(1, (t - t0) / dur);
            const k = 1 - Math.pow(1 - p, 3);
            setValue(Number((to * k).toFixed(1)));
            if (p < 1) requestAnimationFrame(step);
            else setValue(to);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return { ref, value };
}
