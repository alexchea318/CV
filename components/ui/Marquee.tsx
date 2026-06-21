/**
 * Infinite horizontal ticker. The track holds two copies of the items so the
 * CSS animation can translate by -50% for a seamless loop. Decorative — the
 * same keywords appear as real text in the Capabilities list, so it's hidden
 * from assistive tech.
 */
export function Marquee({
  items,
  className = "",
  separator = "/",
}: {
  items: string[];
  className?: string;
  separator?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden>
      <span className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="px-6 md:px-10">{item}</span>
            <span className="text-[var(--color-muted)]">{separator}</span>
          </span>
        ))}
      </span>
    </div>
  );
}
