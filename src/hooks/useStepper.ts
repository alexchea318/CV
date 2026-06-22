"use client";
import { useCallback, useEffect, useState } from "react";

/**
 * Auto-advancing stepper for the "full cycle" pipeline. Cycles through `count`
 * steps every `intervalMs`; pauses while the user hovers and resumes on leave.
 * Disable (e.g. for prefers-reduced-motion) via `enabled: false`.
 */
export function useStepper(count: number, opts: { intervalMs?: number; enabled?: boolean } = {}) {
  const { intervalMs = 2400, enabled = true } = opts;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!enabled || paused || count < 2) return;
    const id = setInterval(() => setActive((a) => (a + 1) % count), intervalMs);
    return () => clearInterval(id);
  }, [count, intervalMs, enabled, paused]);

  const select = useCallback((i: number) => setActive(i), []);
  const pause = useCallback(() => setPaused(true), []);
  const resume = useCallback(() => setPaused(false), []);
  return { active, select, pause, resume };
}
