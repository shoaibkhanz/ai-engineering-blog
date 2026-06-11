import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}/`,
    lastModified: new Date(post.date),
  }));

  const pages = ["", "/blog", "/about", "/experiments"].map((path) => ({
    url: `${SITE_URL}${path}/`,
    lastModified: new Date(),
  }));

  return [...pages, ...posts];
}
