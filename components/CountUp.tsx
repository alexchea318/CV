"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/lang";
import { TENURE, formatTenureNumber } from "@/lib/tenure";

/** Animated count-up to the tenure figure, triggered when scrolled into view.
 *  Honors reduced-motion (shows the final value immediately). */
export function CountUp({ to = TENURE }: { to?: number }) {
  const { lang } = useLang();
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      setVal(to);
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
            setVal(Number((to * k).toFixed(1)));
            if (p < 1) requestAnimationFrame(step);
            else setVal(to);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return <span ref={ref}>{formatTenureNumber(val, lang)}</span>;
}
