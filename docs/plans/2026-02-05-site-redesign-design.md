# ConvergeML Site v3 — Full Redesign

## Vision

Dark-first terminal/hacker aesthetic personal site for Shoaib Khan. Communicates: "This person builds serious ML systems." Think Vercel dashboard meets Linux terminal meets Raycast.

## Core Aesthetic

### Colors
- Background: `#0a0a0a` (near-black)
- Surface/cards: `#141414` with `1px` border `#222`
- Primary accent: `#00ff9f` (electric terminal green)
- Secondary accent: `#00d4ff` (cyan)
- Text primary: `#e0e0e0` (light gray)
- Text headings: `#ffffff` (white)
- Subtle noise texture overlay on background for depth

### Typography
- **One font family: JetBrains Mono** (Google Fonts)
- Weights: 400 (body), 500 (emphasis), 700 (headings)
- Base size: 16px, line-height: 1.7
- Code blocks: same font, syntax highlighted, with filename header + line numbers

### Signature Elements
- Blinking cursor (`_`) after name/tagline
- Command-prompt style section headers (`$ ls ~/projects`)
- Subtle grid lines in background (like graph paper)
- Scanline/CRT subtle overlay on hero section
- Green glow effects on hover/focus states

---

## Pages

### Homepage (`/`)

**Hero Section:**
- Large monospace name: `shoaib khan_` (blinking cursor)
- Typed-out tagline animation: `> ml engineer · healthcare ai · distributed systems`
- Social links as terminal output: `[github]  [linkedin]  [email]`
- Animated particle/grid background (mouse-responsive, low opacity)

**Active Projects Terminal:**
- Faux terminal window with title bar (`~/projects — zsh`) and red/yellow/green dots
- Styled `tree` or `ls -la` output showing active projects
- Each project: name, one-line description, tech tags, status badge (`[active]`, `[shipped]`, `[wip]`)
- Clickable — expands or links out

**Recent Posts:**
- Header: `$ cat ~/writing/recent.md`
- Cards: title, date, tags, 2-line excerpt
- Hover: border glows green
- 3 recent posts + "View all" link

**Experiments:**
- Header: `$ ls ~/experiments/`
- Grid of cards with preview area, title, tech tags
- Hover: glow + subtle scale

**Footer:**
- `© 2026 shoaib khan · built with next.js · source on github`
- Styled as terminal prompt

### Blog Listing (`/blog`)
- All posts with tag filtering
- Same card style as homepage but full grid
- Search/filter styled as terminal input

### Blog Post (`/blog/[slug]`)
- Dark background, full-width monospace content
- Metadata as terminal-style: `published: 2026-01-29 | tags: [ml, tutorial, math]`
- Code blocks: VS Code-style with filename header, line numbers, copy button
- KaTeX math in white on dark
- Callout boxes replace sidenotes: `[NOTE]`, `[WARNING]`, `[TIP]` with colored left borders
- Reading progress bar at top (green)

### Experiments (`/experiments`)
- Grid with terminal-style card headers
- Preview/screenshot area per card
- Monospace tag badges
- Hover: glow + scale

### About (`/about`)
- Styled as `README.md` — header literally says `# README.md`
- Sections: `## About`, `## Stack`, `## Experience`
- Skills/tools as typed lists or icon grid
- Links styled as `[text](url)` visually

---

## Interactive Elements

- **Page transitions:** Fade + slight upward slide (framer-motion)
- **Cursor trail:** Subtle green glow following mouse (toggleable)
- **Scroll animations:** Elements fade in on scroll, staggered
- **Typing effects:** Hero tagline types out on load
- **Navigation:** Fixed header with blur backdrop, glow on hover
- **Command palette:** `Cmd+K` search/navigation (stretch goal)
- **Terminal window:** Reusable chrome component with dots + title bar

---

## Technical Architecture

### Stack
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- MDX with gray-matter, remark-gfm, remark-math, rehype-katex, rehype-pretty-code

### New Dependencies
- `framer-motion` — animations, page transitions, typing effects
- Canvas-based particle grid (custom, no heavy 3D lib)
- `JetBrains Mono` from Google Fonts

### Removed
- `next-themes` (dark only, no toggle)
- IBM Plex fonts
- Tufte sidenote components
- TimeGrid component

### File Structure
```
app/
  layout.tsx
  page.tsx
  globals.css
  blog/
    page.tsx
    [slug]/page.tsx
  experiments/
    page.tsx
  about/
    page.tsx
  components/
    header.tsx
    footer.tsx
    hero.tsx
    terminal-window.tsx
    project-list.tsx
    post-card.tsx
    experiment-card.tsx
    particle-grid.tsx
    cursor-trail.tsx
    typing-effect.tsx
    reading-progress.tsx
    callout.tsx
    mdx-components.tsx
content/
  posts/           (placeholder MDX)
  experiments.json
  projects.json
lib/
  mdx.ts
```

### Content
- Fresh placeholder content throughout
- 2-3 placeholder blog posts matching the technical vibe
- 4-5 placeholder projects
- 3-4 placeholder experiments
