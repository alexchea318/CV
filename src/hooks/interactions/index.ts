"use client";
import { useCursor } from "./useCursor";

/**
 * Desktop pointer behaviour. Each sub-hook self-gates and self-cleans.
 * Hover affordance is left to CSS: links carry their own colour shift, and a
 * generic underline used to double up with the one a link already draws.
 */
export function useInteractions(): void {
  useCursor();
}
