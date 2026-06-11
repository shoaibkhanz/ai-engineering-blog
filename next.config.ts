import type { NextConfig } from "next";

// Base path mirrors the GitHub Pages project URL in production only,
// so local dev serves at http://localhost:3000/ (keep in sync with lib/site.ts)
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/ai-engineering-blog" : "",
  trailingSlash: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  devIndicators: false,
};

export default nextConfig;
