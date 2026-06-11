export const BASE_PATH = "/ai-engineering-blog";

export const SITE_URL = `https://shoaibkhanz.github.io${BASE_PATH}`;

export const SITE_NAME = "Shoaib Khan — ML Engineer";

export const SITE_DESCRIPTION =
  "ML engineer building healthcare AI systems and distributed infrastructure.";

/** Prefix a public-asset path with the GitHub Pages base path. */
export function withBasePath(path: string): string {
  return path.startsWith("/") ? `${BASE_PATH}${path}` : path;
}
