/**
 * Canonical production origin, baked into SEO meta, JSON-LD, sitemap and robots
 * at build time (static export — there is no server to infer the host).
 *
 * On Vercel it is derived automatically from the project's production domain,
 * so nothing needs editing. The fallback is used for local builds and only
 * matters if you later attach a custom domain — then set it here.
 */
export const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://alexchea.vercel.app";

export const links = {
  email: "alexchea319@gmail.com",
  telegram: "https://t.me/alexchea318",
  github: "https://github.com/alexchea318",
  linkedin: "https://www.linkedin.com/in/alexander-chechenev",
  vk: "https://vk.me/schechenev",
  hh: "https://hh.ru/resume/393677b8ff0cef9eb60039ed1f794c544b5469",
  interview2021: "https://media.spbstu.ru/news/unicorn_factory/319",
} as const;
