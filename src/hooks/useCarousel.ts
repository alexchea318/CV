"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const DURATION = 520;
const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3);

/** Distance between two consecutive slides (card width + gap), gap-agnostic. */
function slideStep(track: HTMLDivElement) {
  const a = track.children[0] as HTMLElement | undefined;
  const b = track.children[1] as HTMLElement | undefined;
  return a && b ? b.offsetLeft - a.offsetLeft : track.clientWidth;
}

/**
 * Horizontal scroll-snap slider: tracks the active slide and jumps to one with
 * an ease-out animation (snap is muted during the tween so it can't fight it).
 */
export function useCarousel(count: number) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const step = slideStep(track);
        const i = step ? Math.round(track.scrollLeft / step) : 0;
        setActive(Math.max(0, Math.min(count - 1, i)));
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
    };
  }, [count]);

  const goTo = useCallback((i: number) => {
    const track = trackRef.current;
    const card = track?.children[i] as HTMLElement | undefined;
    if (!track || !card) return;
    const start = track.scrollLeft;
    const dist = card.offsetLeft - track.offsetLeft - start;
    if (!dist) return;
    track.style.scrollSnapType = "none";
    let t0 = 0;
    const tick = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min(1, (ts - t0) / DURATION);
      track.scrollLeft = start + dist * easeOutCubic(p);
      if (p < 1) requestAnimationFrame(tick);
      else track.style.scrollSnapType = "";
    };
    requestAnimationFrame(tick);
  }, []);

  return { trackRef, active, goTo };
}
