import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true }, // required for static export
  trailingSlash: true,
  sassOptions: { includePaths: ["src/styles"] },
};

export default nextConfig;
