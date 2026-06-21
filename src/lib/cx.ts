/** Join truthy class names. Tiny clsx for conditional/BEM modifiers. */
export function cx(...args: Array<string | false | null | undefined>): string {
  return args.filter(Boolean).join(" ");
}
