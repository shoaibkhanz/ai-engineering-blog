// Applied in production only, matching basePath in next.config.ts
export const BASE_PATH =
  process.env.NODE_ENV === "production" ? "/ai-engineering-blog" : "";

export const SITE_URL = "https://shoaibkhanz.github.io/ai-engineering-blog";

export const SITE_NAME = "Shoaib Khan — Staff AI Engineer";

export const SITE_DESCRIPTION =
  "Staff AI engineer building agents, ML systems, and the production infrastructure behind them.";

/** Prefix a public-asset path with the GitHub Pages base path. */
export function withBasePath(path: string): string {
  return path.startsWith("/") ? `${BASE_PATH}${path}` : path;
}
