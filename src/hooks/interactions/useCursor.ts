"use client";
import { useEffect } from "react";

/** Custom cursor that sticks to and morphs around interactive elements.
 *  Fine-pointer + non-reduced-motion only; cleans up on unmount. */
export function useCursor() {
  useEffect(() => {
    const fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const ring = document.querySelector<HTMLElement>("[data-cursor-ring]");
    const dot = document.querySelector<HTMLElement>("[data-cursor-dot]");
    if (!ring || !dot) return;

    document.body.style.cursor = "none";
    ring.style.display = "block";
    dot.style.display = "block";
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let shown = false;
    let stuck: HTMLElement | null = null;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
      if (!shown) {
        shown = true;
        ring.style.opacity = "1";
        dot.style.opacity = "1";
      }
    };
    window.addEventListener("mousemove", onMove);

    const loop = () => {
      let tx = mx;
      let ty = my;
      if (stuck) {
        const r = stuck.getBoundingClientRect();
        tx = r.left + r.width / 2;
        ty = r.top + r.height / 2;
      }
      const k = stuck ? 0.3 : 0.16;
      rx += (tx - rx) * k;
      ry += (ty - ry) * k;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const enter = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      // [data-cursor-wrap] opts a big element into the morph instead of the blob.
      const wrap = el.hasAttribute("data-cursor-wrap");
      if (!wrap && (r.width > 460 || r.height > 140)) {
        ring.style.width = "58px";
        ring.style.height = "58px";
        ring.style.borderRadius = "50%";
        dot.style.opacity = "0";
        stuck = null;
        return;
      }
      let br = getComputedStyle(el).borderRadius;
      if (!br || br === "0px") br = "9px";
      ring.style.width = `${r.width + 20}px`;
      ring.style.height = `${r.height + 14}px`;
      ring.style.borderRadius = br;
      ring.style.borderWidth = "2px";
      dot.style.opacity = "0";
      stuck = el;
    };
    const leave = () => {
      ring.style.width = "42px";
      ring.style.height = "42px";
      ring.style.borderRadius = "50%";
      ring.style.borderWidth = "2px";
      dot.style.opacity = "1";
      stuck = null;
    };

    const targets = [...document.querySelectorAll<HTMLElement>("[data-cursor], a, button")];
    const pairs = targets.map((el) => {
      const onEnter = () => enter(el);
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", leave);
      return { el, onEnter };
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.body.style.cursor = "";
      ring.style.display = "none";
      dot.style.display = "none";
      pairs.forEach(({ el, onEnter }) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);
}
