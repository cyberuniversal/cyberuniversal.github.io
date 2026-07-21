import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export → GitHub Pages serves the `out/` folder as plain files.
  output: "export",
  // Pages serves /research/ as /research/index.html; trailing slash makes the
  // clean URLs resolve without a server.
  trailingSlash: true,
  // No image optimizer on static hosting (the site has no <Image> anyway).
  images: { unoptimized: true },
};

export default nextConfig;
