"use client";
import { RefObject, useEffect, useRef } from "react";

/**
 * Scrolls the referenced element into view when `open` flips to true after the
 * initial mount. Used by the mobile experience accordion: opening a lower item
 * collapses the one above it, so the layout shifts up and the tapped header ends
 * up above the fold — this pulls it back to the top of the viewport. The first
 * render is skipped so the default-open item doesn't hijack page load, and the
 * scroll waits a frame for siblings to collapse before measuring.
 */
export function useScrollOpenIntoView<T extends HTMLElement>(open: boolean): RefObject<T | null> {
  const ref = useRef<T>(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (!open || !ref.current) return;
    const el = ref.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = requestAnimationFrame(() =>
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }),
    );
    return () => cancelAnimationFrame(id);
  }, [open]);

  return ref;
}
