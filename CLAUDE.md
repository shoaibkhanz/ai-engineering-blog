# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Build & Run

```bash
npm run dev      # Local dev server (http://localhost:3000)
npm run build    # Production build — all pages statically generated
npm run lint     # ESLint with Next.js/TypeScript rules
```

Build must pass cleanly before considering work complete.

## Architecture

Next.js 16 App Router, Tailwind CSS v4, Framer Motion, Space Mono. Terminal/code-editor aesthetic with dark/light theme toggle.

### Content Pipeline

Blog posts are `.mdx` files in `content/posts/` with YAML frontmatter:

```yaml
---
title: "Post Title"
date: "YYYY-MM-DD"
description: "Short description"
tags: ["tag1", "tag2"]
---
```

`lib/mdx.ts` handles all content operations — reading posts, parsing frontmatter (gray-matter), extracting TOC headings (h2/h3 via regex), slug generation, and tag aggregation. Posts sorted by date descending.

Rendering chain in `app/blog/[slug]/page.tsx` uses `next-mdx-remote/rsc` (server components):
- Remark: `remark-gfm` → `remark-math`
- Rehype: `rehype-katex` → `rehype-pretty-code` (dual theme via `--shiki-dark` / `--shiki-light` CSS variables)

KaTeX CSS is imported globally in `layout.tsx` — removing this breaks all math rendering.

### Key Patterns

- **Client vs Server split**: Interactive components (`"use client"`) handle animations, scroll tracking, filtering. Data fetching stays server-side.
- **Shared utilities**: `lib/utils.ts` exports `getAccentRgb()` (CSS variable → RGB string). `lib/mdx.ts` exports `slugify()`. Do not duplicate these.
- **MDX components** (`mdx-components.tsx`): Custom renderers for all elements. Headings get auto-generated `id` attributes via `slugify()` for TOC links.
- **Theme system**: `theme-provider.tsx` provides `useTheme()` context. Inline `<script>` in `layout.tsx` sets `data-theme` on `<html>` before first paint (no flash). Persists in localStorage, defaults to dark.
- **Canvas animations**: `particle-grid.tsx` and `cursor-trail.tsx` use requestAnimationFrame + devicePixelRatio. Both watch `data-theme` changes via MutationObserver to adapt accent colors.
- **Code blocks**: `code-block.tsx` wraps `<pre>` with copy-to-clipboard button. `globals.css` maps `--shiki-dark`/`--shiki-light` to `color` based on active theme.
- **Hero**: Pydantic `BaseModel` style code editor window with line numbers, drifting glow orbs, and clickable social fields (type annotations as links with `# ↗` hover hint).

### File Structure

```
app/
  layout.tsx              # Root layout, font, KaTeX CSS, ThemeProvider
  page.tsx                # Homepage: Hero → WritingMap → Major Projects → Experiments
  globals.css             # Theme variables, light overrides, code/KaTeX/prose styles
  blog/
    page.tsx              # Blog listing with tag filters (?tag= URL param)
    blog-list.tsx          # Client-side filtering via useSearchParams
    [slug]/page.tsx        # Post page: progress bar, TOC, MDX, prev/next, related
  about/page.tsx
  experiments/page.tsx
  components/
    hero.tsx              # Code editor window with Pydantic model + glow animation
    header.tsx            # Fixed nav, theme toggle (sun/moon SVG), scroll-to-top
    footer.tsx            # Nav links + social links
    particle-grid.tsx     # Canvas dot grid with mouse repulsion
    cursor-trail.tsx      # Mouse-following glow
    writing-map.tsx       # Git log timeline, collapsible by year
    table-of-contents.tsx # Collapsible TOC with IntersectionObserver
    reading-progress.tsx  # Neovim-style bottom status bar
    code-block.tsx        # Pre wrapper with copy button
    mdx-components.tsx    # All MDX element overrides
    theme-provider.tsx    # Dark/light context + localStorage
    section.tsx           # Scroll-reveal section wrapper
    terminal-window.tsx   # Reusable terminal chrome
    post-card.tsx         # Blog post card
    project-list.tsx      # Major project list with status badges, sorted active → wip → shipped
    experiment-card.tsx   # Experiment card
    callout.tsx           # MDX callout box
lib/
  mdx.ts                  # Content reading, frontmatter, TOC extraction, slugify
  utils.ts                # getAccentRgb() shared utility
content/
  posts/                  # 8 MDX blog posts
  projects.json           # Project data (needs `as Project[]` cast)
  experiments.json        # Experiment data
public/images/            # Blog post SVGs
```

### Blog Post Page Structure

Reading progress (Neovim bottom bar) → back link → title/metadata (clickable tags → `/blog?tag=X`) → collapsible TOC → MDX content → prev/next navigation → related posts (by shared tags).

## Theme System

Two themes controlled by `data-theme` attribute on `<html>`:

| Token | Dark (default) | Light |
|-------|---------------|-------|
| `--color-bg` | `#0a0a0a` | `#f4f4f5` |
| `--color-surface` | `#141414` | `#ffffff` |
| `--color-text` | `#e0e0e0` | `#27272a` |
| `--color-text-heading` | `#ffffff` | `#09090b` |
| `--color-accent` | `#00ff9f` | `#00875a` |
| `--color-cyan` | `#00d4ff` | `#0e7490` |

Dark mode has noise texture + grid overlay. Light mode disables noise and uses dark grid lines. Code blocks use `#f0f0f2` background in light mode.

`--glow-rgb` (defined in `:root` and `[data-theme="light"]`) provides RGB values for `rgba()` box-shadows.

## Customization Guide

### Changing colors
Edit `globals.css` `@theme` block (dark) and `[data-theme="light"]` block (light). All components reference CSS variables — no hardcoded colors except `--glow-rgb` in `:root` which must be updated to match `--color-accent`.

### Changing the font
In `layout.tsx`, replace `JetBrains_Mono` import from `next/font/google`. Update the `@theme` `--font-mono` fallback stack in `globals.css`. Good alternatives: Fira Code, IBM Plex Mono, Source Code Pro, Space Mono.

### Changing hero content
Edit `hero.tsx`: the `socials` array defines the Pydantic fields (key, type, href). The class name, base class, role, and docstring are inline in the JSX. Glow intensity/speed is controlled by the two `motion.div` elements with `animate` props.

### Changing the code syntax theme
In `app/blog/[slug]/page.tsx`, update the `theme` object passed to `rehype-pretty-code`. Any shiki theme pair works. The CSS in `globals.css` maps `--shiki-dark`/`--shiki-light` to `color`.

### Adding a blog post
Drop a `.mdx` file in `content/posts/` with the frontmatter format above. It auto-appears in blog listing, writing timeline, tag filters, and generates a static route on build. Use `<Callout type="info|warning">` for callout boxes.

### Adding a project or experiment
Edit `content/projects.json` or `content/experiments.json`. Projects need `status: "active" | "shipped" | "wip"`. Projects are sorted by status in the UI (active first, shipped last) so JSON order within the same status group determines display order.

### Adjusting visual effects
- **Particle grid density**: `spacing` variable in `particle-grid.tsx` (lower = denser)
- **Cursor glow size/opacity**: width/height classes and `radial-gradient` stops in `cursor-trail.tsx`
- **Hero glow drift**: `animate` keyframe arrays and `transition.duration` on the two glow `motion.div` elements in `hero.tsx`
- **Noise texture**: `body::before` opacity in `globals.css`
- **Grid lines**: `body::after` background-size in `globals.css`
- **Reading progress**: line height estimate (`25.5px`) and WPM (`230`) in `reading-progress.tsx`

## Common Mistakes — Do Not Repeat

### Keep interfaces in sync
When adding a field to `PostMeta` (e.g. `readingTime`), update BOTH `getAllPosts()` AND `getPostBySlug()`. The `as PostMeta` cast in `getPostBySlug` hides missing fields from TypeScript — always verify both functions return all required fields.

### Framer Motion glow/drift animations
- **Use `x`/`y` transforms**, never `top`/`left` — CSS layout properties trigger reflows and look jerky.
- For slow organic drift: use 6-7 waypoints with varied distances, `easeInOut` easing, 20-25s duration. Avoid symmetrical corner-to-corner paths — they look robotic.
- Two counter-rotating orbs starting from opposite corners provides balanced coverage.
- Keep orbs sized 250-300px with `blur(40-45px)` and `opacity(0.14-0.18)` — too large/blurred makes movement invisible.

### rehype-pretty-code dual themes
v0.14+ generates a SINGLE `<pre>` with `--shiki-dark`/`--shiki-light` CSS variables per `<span>`. Do NOT attempt two separate `<pre>` blocks with show/hide. Map the variables to `color` via CSS in `globals.css`.

### `useSearchParams()` requires `<Suspense>`
Any client component using `useSearchParams()` must be wrapped in `<Suspense>` in its parent — otherwise static generation fails at build time.

### Theme transitions need flash prevention
The `no-transitions` class on `<html>` disables all CSS transitions during initial page load. It's added by the inline theme script and removed after two `requestAnimationFrame` ticks. Without this, the page flashes as it transitions from default to stored theme.

### Sort order conventions
- `getAllPosts()`: newest first (date descending) — this is the canonical order
- `WritingMap`: also newest first — years descending, posts within year descending
- Blog listing: inherits from `getAllPosts()` order
- `ProjectList`: sorted by status — active → wip → shipped

### Canvas components and theme changes
`particle-grid.tsx` and `cursor-trail.tsx` use MutationObserver watching `data-theme` attribute changes. The accent color is read via `getAccentRgb()` from `lib/utils.ts`. Do not duplicate this function.
