# ai-engineering-blog

**[shoaibkhanz.github.io/ai-engineering-blog](https://shoaibkhanz.github.io/ai-engineering-blog/)**

Personal site and blog — AI Engineering, Agents & LLMs, Production Infrastructure. Built with a terminal/code-editor aesthetic — the hero section renders as a Pydantic model, section headers use shell commands, and the writing timeline mimics `git log`.

## Stack

- **Framework**: Next.js 16 (App Router, static export)
- **Styling**: Tailwind CSS v4 + CSS custom properties
- **Animation**: Framer Motion
- **Content**: MDX with KaTeX math + syntax highlighting (shiki)
- **Font**: Space Mono

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build (static generation) |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, writing timeline, major projects, recent posts, experiments |
| `/blog` | Blog listing with tag filters |
| `/blog/[slug]` | Individual post with TOC, reading progress, navigation |
| `/experiments` | Experiments showcase |
| `/about` | About page |

## Writing a Post

Create a `.mdx` file in `content/posts/`:

```yaml
---
title: "Your Post Title"
date: "2026-01-15"
description: "A short description for the card."
tags: ["ml", "python"]
---

Your content here. Supports GFM tables, LaTeX math ($x^2$), and syntax highlighting.
```

The post automatically appears in the blog listing, writing timeline, and tag filters on the next build.

### MDX Features

- **Math**: Inline `$x^2$` or display `$$\sum_{i=1}^n x_i$$`
- **Syntax highlighting**: Fenced code blocks with language tags. Dual theme (dark/light) with copy button.
- **Callouts**: `<Callout type="info">Note text</Callout>` or `type="warning"`
- **GFM**: Tables, strikethrough, task lists

## Themes

Toggle between dark and light mode via the header button. Dark is default.

- **Dark**: Terminal green (`#00ff9f`) accent on near-black background. Noise texture and grid overlay.
- **Light**: Deep emerald (`#00875a`) accent on polished grey (`#f4f4f5`). Clean, minimal.

Theme preference is saved in localStorage.

## Project Structure

```
content/
  posts/          # MDX blog posts
  projects.json   # Major project data (sorted active → shipped in UI)
  experiments.json
app/
  components/     # All React components (17 files)
  globals.css     # Theme system, all CSS custom properties
  layout.tsx      # Root layout, font, providers
  page.tsx        # Homepage
  blog/           # Blog listing + post pages
lib/
  mdx.ts          # Content pipeline (reading, parsing, TOC)
  utils.ts        # Shared utilities
public/images/    # Blog post images
```

## License

Personal project. All rights reserved.
