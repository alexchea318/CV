"use client";
import { useEffect } from "react";
import { EASE } from "./ease";

/** Magnetic pull on [data-magnet] elements toward the cursor (fine pointer only). */
export function useMagnetic() {
  useEffect(() => {
    const fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    const cleanups: Array<() => void> = [];
    document.querySelectorAll<HTMLElement>("[data-magnet]").forEach((el) => {
      el.style.transition = `transform .35s ${EASE}`;
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${x * 0.28}px, ${y * 0.32}px)`;
      };
      const onLeave = () => { el.style.transform = "translate(0,0)"; };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);
}
