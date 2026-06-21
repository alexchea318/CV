"use client";

import { useEffect } from "react";

const EASE = "cubic-bezier(.16,1,.3,1)";

/**
 * Desktop kinetic flourishes from the source design: custom cursor that sticks
 * to and morphs around interactive elements, magnetic elements, parallax
 * watermark, the case-row hover slide and a link underline affordance. All
 * gated behind a fine pointer and prefers-reduced-motion, cleaned up on unmount.
 */
export function Interactions() {
  useEffect(() => {
    const fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];

    /* ---------- parallax watermark ---------- */
    if (!reduced) {
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
      cleanups.push(() => window.removeEventListener("scroll", onScroll));
    }

    /* ---------- case-row hover slide ---------- */
    document.querySelectorAll<HTMLElement>("[data-case]").forEach((el) => {
      const h = el.querySelector("[data-case-title]") as HTMLElement | null;
      if (!h) return;
      h.style.transition = `transform .5s ${EASE}`;
      // Only the title carries the link affordance — not the chips/meta.
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

    /* ---------- link underline affordance ---------- */
    document.querySelectorAll<HTMLAnchorElement>("a").forEach((el) => {
      // data-magnet has its own motion; links inside a work case (title + the
      // project button) are handled by the case hover, not the generic underline.
      if (el.hasAttribute("data-magnet") || el.closest("[data-case]")) return;
      const enter = () => {
        el.style.textDecoration = "underline";
        el.style.textUnderlineOffset = "4px";
        el.style.textDecorationThickness = "1px";
      };
      const leave = () => (el.style.textDecoration = "none");
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      cleanups.push(() => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    });

    if (fine && !reduced) {
      /* ---------- custom cursor (stick + morph) ---------- */
      const ring = document.querySelector<HTMLElement>("[data-cursor-ring]");
      const dot = document.querySelector<HTMLElement>("[data-cursor-dot]");
      let raf = 0;
      if (ring && dot) {
        document.body.style.cursor = "none";
        ring.style.display = "block";
        dot.style.display = "block";
        let mx = window.innerWidth / 2;
        let my = window.innerHeight / 2;
        let rx = mx;
        let ry = my;
        let shown = false;
        let stuck: HTMLElement | null = null;

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
          if (r.width > 460 || r.height > 140) {
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
          ring.style.borderWidth = "1.5px";
          dot.style.opacity = "0";
          stuck = el;
        };
        const leave = () => {
          ring.style.width = "42px";
          ring.style.height = "42px";
          ring.style.borderRadius = "50%";
          ring.style.borderWidth = "1.5px";
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
        cleanups.push(() => {
          cancelAnimationFrame(raf);
          window.removeEventListener("mousemove", onMove);
          document.body.style.cursor = "";
          ring.style.display = "none";
          dot.style.display = "none";
          pairs.forEach(({ el, onEnter }) => {
            el.removeEventListener("mouseenter", onEnter);
            el.removeEventListener("mouseleave", leave);
          });
        });
      }

      /* ---------- magnetic ---------- */
      document.querySelectorAll<HTMLElement>("[data-magnet]").forEach((el) => {
        el.style.transition = `transform .35s ${EASE}`;
        const onMove = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const x = e.clientX - (r.left + r.width / 2);
          const y = e.clientY - (r.top + r.height / 2);
          el.style.transform = `translate(${x * 0.28}px, ${y * 0.32}px)`;
        };
        const onLeave = () => (el.style.transform = "translate(0,0)");
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          el.removeEventListener("mousemove", onMove);
          el.removeEventListener("mouseleave", onLeave);
        });
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
