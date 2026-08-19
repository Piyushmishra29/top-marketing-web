import type { NextConfig } from "next";

// Set NEXT_PUBLIC_BASE_PATH when the site is served under a path prefix
// (the tailnet preview lives at /top). Leave it unset for a root domain.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  basePath,
  turbopack: { root: __dirname },
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
