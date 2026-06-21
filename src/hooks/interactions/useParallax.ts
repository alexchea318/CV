"use client";
import { useEffect } from "react";

/** Parallax watermark: translate [data-parallax] elements against scroll. */
export function useParallax() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const plx = [...document.querySelectorAll<HTMLElement>("[data-parallax]")];
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        plx.forEach((el) => {
          const f = parseFloat(el.getAttribute("data-parallax") || "0.15") || 0.15;
          el.style.transform = `translateY(${-y * f}px)`;
        });
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}
