"use client";
import { useParallax } from "./useParallax";
import { useHoverAffordance } from "./useHoverAffordance";
import { useMagnetic } from "./useMagnetic";
import { useCursor } from "./useCursor";

/** All desktop kinetic flourishes. Each sub-hook self-gates and self-cleans. */
export function useInteractions(): void {
  useParallax();
  useHoverAffordance();
  useMagnetic();
  useCursor();
}
