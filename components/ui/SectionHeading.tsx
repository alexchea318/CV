import { KineticText } from "@/components/ui/KineticText";

/**
 * Section header: a monospace eyebrow carrying the section index + label,
 * then the giant kinetic title. The index encodes real reading order.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
}: {
  index: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <header className="mb-12 md:mb-20">
      <div className="mono mb-5 flex items-center gap-4">
        <span>{index}</span>
        <span className="h-px w-8 bg-[var(--color-faint)]" />
        <span>{eyebrow}</span>
      </div>
      <KineticText as="h2" lines={[title]} className="display text-[var(--text-giant)]" />
    </header>
  );
}
