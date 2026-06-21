import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No `output: 'export'` — Vercel hosts Next.js natively and prerenders these
  // static pages itself. Forcing export only causes Output Directory / routes-
  // manifest conflicts on Vercel.
  trailingSlash: true,
  sassOptions: { includePaths: ["src/styles"] },
};

export default nextConfig;
