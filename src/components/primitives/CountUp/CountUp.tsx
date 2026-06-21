"use client";

import { useLang } from "@/components/primitives/T";
import { useCountUp } from "@/hooks/useCountUp";
import { TENURE, formatTenureNumber } from "@/lib/tenure";

/** Animated count-up to the tenure figure, triggered when scrolled into view. */
export function CountUp({ to = TENURE }: { to?: number }) {
  const { lang } = useLang();
  const { ref, value } = useCountUp(to);
  return <span ref={ref}>{formatTenureNumber(value, lang)}</span>;
}
