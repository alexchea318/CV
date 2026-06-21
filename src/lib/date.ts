/** Current calendar year. Evaluated at render time — build time during the
 *  static export, runtime in the browser — so the footer never goes stale. */
export function getCurrentYear(): number {
  return new Date().getFullYear();
}
