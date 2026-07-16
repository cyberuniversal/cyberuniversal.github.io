import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Note: Next may warn that it inferred the workspace root from a stray
     package-lock.json in the home directory. Setting `turbopack.root` here
     breaks the React Client Manifest resolution (global-error.js not found),
     so the warning is left alone deliberately — it is cosmetic and does not
     affect dev, build, or output. */
};

export default nextConfig;
