"use client";
import { useEffect } from "react";
import { EASE } from "./ease";

/** Case-row hover slide (title only) + generic link underline affordance. */
export function useHoverAffordance() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    document.querySelectorAll<HTMLElement>("[data-case]").forEach((el) => {
      const h = el.querySelector("[data-case-title]") as HTMLElement | null;
      if (!h) return;
      h.style.transition = `transform .5s ${EASE}`;
      const enter = () => {
        h.style.transform = "translateX(18px)";
        h.style.textDecoration = "underline";
        h.style.textUnderlineOffset = "6px";
        h.style.textDecorationThickness = "2px";
      };
      const leave = () => {
        h.style.transform = "translateX(0)";
        h.style.textDecoration = "none";
      };
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      cleanups.push(() => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    });

    document.querySelectorAll<HTMLAnchorElement>("a").forEach((el) => {
      // data-magnet has its own motion; links inside a work case are handled there.
      if (el.hasAttribute("data-magnet") || el.closest("[data-case]")) return;
      const enter = () => {
        el.style.textDecoration = "underline";
        el.style.textUnderlineOffset = "4px";
        el.style.textDecorationThickness = "1px";
      };
      const leave = () => { el.style.textDecoration = "none"; };
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      cleanups.push(() => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);
}
