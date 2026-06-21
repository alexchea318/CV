"use client";
import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { useIsDesktop } from "@/lib/useIsDesktop";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const desktop = useIsDesktop();
  useEffect(() => {
    if (!desktop) return;
    const lenis = new Lenis({ duration: 1.1 });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [desktop]);
  return <>{children}</>;
}
