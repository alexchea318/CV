"use client";
import { useEffect, useState } from "react";

/** Mobile-menu open state, auto-closing on hash navigation and Escape. */
export function useMobileMenu() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onHash = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("hashchange", onHash);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);
  return { open, toggle: () => setOpen((v) => !v), close: () => setOpen(false) };
}
