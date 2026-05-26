# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CASB (Center for Agricultural Systems Biology) profile website for KMUTT. Built on the **AstroWind** template, using Astro (v6), Tailwind CSS v4, MDX, and TypeScript 6. Deployed at `https://bml.kmutt.ac.th/v2` with a base path of `v2/`.

## Commands

```bash
npm run dev          # Dev server at http://localhost:4321/v2
npm run build        # astro check + astro build (type-check before building)
npm run preview      # Preview production build locally
npm run lint:eslint  # ESLint
npm run format       # Prettier (formats all files in place)
```

No test suite is configured.

## Architecture

### Configuration cascade

All site behavior flows through one canonical chain:

1. **`src/config.yaml`** — source of truth for site URL, blog settings, analytics, UI theme/colors
2. **`src/utils/config.ts`** — parses the YAML and exports typed constants: `SITE`, `I18N`, `METADATA`, `APP_BLOG`, `UI`, `ANALYTICS`
3. **`astro.config.mjs`** — reads `SITE` and `ANALYTICS` at build time to configure integrations (sitemap, Partytown)

Changing site URL, base path, trailing-slash behavior, or analytics requires editing `src/config.yaml`, then verifying ripple effects in `astro.config.mjs` and `src/utils/permalinks.ts`.

### URL / permalink handling

Because the site lives under the `v2/` base path, **never hardcode `/path` URLs**. Always use helpers from `src/utils/permalinks.ts`:

- `getPermalink(slug, type?)` — general pages, posts, categories, tags
- `getBlogPermalink()` — blog index
- `getCanonical(path)` — canonical `<link>` URLs
- `getAsset(path)` — public assets (e.g., RSS feed)

`POST_PERMALINK_PATTERN` (defined in `permalinks.ts` from `APP_BLOG.post.permalink`) controls post URL shape; currently `/%slug%`.

Navigation links are centralized in **`src/navigation.js`** (header + footer). Update here when adding pages.

### Content

**Blog posts** use Astro v6 Content Collections (loader-based API):
- Files: `src/content/post/*.md` or `.mdx`
- Schema config: `src/content.config.ts` (uses `glob` loader + Zod imported directly from `zod`, not `astro:content`). Required field: `title`. Optional: `publishDate`, `updateDate`, `draft`, `excerpt`, `image`, `category`, `tags`, `author`, `metadata`.
- Date strings must be ISO format (e.g., `2025-11-23T00:00:00Z`).
- In `src/utils/blog.ts`, use `render(post)` (imported from `astro:content`) and `post.id` as the slug — the old `post.render()` and `post.slug` APIs were removed in Astro v6.

**People pages** are plain Markdown files under `src/pages/people/` (not content collections), rendered by `src/layouts/MarkdownMemberLayout.astro` or `src/layouts/MarkdownLayout.astro`.

### Component layers

```
src/layouts/        — page shells (PageLayout, LandingLayout, MarkdownLayout, MarkdownMemberLayout)
src/components/
  widgets/          — full-section page blocks (Hero, Features, BlogLatestPosts, Header, Footer, …)
  ui/               — atomic UI elements (Button, Headline, ItemGrid, Timeline, …)
  common/           — cross-cutting concerns (Metadata, Analytics, Image, SocialShare, …)
src/pages/          — Astro file-based routing; blog uses dynamic [...blog]/ routes
```

### Tailwind v4

Tailwind is configured entirely through CSS (no `tailwind.config.cjs`):
- Entry point: `src/assets/styles/tailwind.css` — uses `@import "tailwindcss"`, `@theme` for custom design tokens, `@plugin "@tailwindcss/typography"`, and `@custom-variant dark` for class-based dark mode.
- Loaded via `@tailwindcss/vite` Vite plugin (not the old `@astrojs/tailwind` integration).
- **Both `@tailwindcss/vite` and `tailwindcss` are pinned to `^4.2.4`**, and **Vite is pinned to `^7.x`** via `overrides` in `package.json`. Do not bump these — `@tailwindcss/vite >=4.3.0` bundles Vite 8 (Rolldown) which conflicts with Astro 6's Vite 7.

### Build-time integrations

- **`src/utils/frontmatter.mjs`** — remark plugin (`readingTimeRemarkPlugin`) + rehype plugin (`responsiveTablesRehypePlugin`). Both are registered in `astro.config.mjs`; do not remove without updating that file.
- **`src/utils/tasks.mjs`** — custom Astro integration that appends the generated sitemap URL to `robots.txt` after each production build.
- **`astro-compress`** — compresses CSS, HTML, and JS during build (Image and SVG compression are disabled).
- **Icons** — provided by `astro-icon` with `tabler` and `flat-color-icons` icon sets; `~` alias maps to `src/`.

### Image handling

The `image: {}` config in `astro.config.mjs` is intentionally minimal (the old `squooshImageService` was removed in Astro v5+). Use the `<Image>` component from `src/components/common/Image.astro` for consistent image handling. The `unpic` package (v3) provides `transformUrl`/`parseUrl` for external CDN image optimization.

### Dependency constraints

| Package | Pinned version | Reason |
|---|---|---|
| `tailwindcss` | `^4.2.4` | v4.3+ brings Vite 8 conflict |
| `@tailwindcss/vite` | `^4.2.4` | same |
| `vite` (override) | `^7.x` | Astro 6 requires Vite 7 |
| `unpic` | `^3.x` | v4 changed `transformUrl`/`parseUrl` API — needs audit before upgrading |
| `eslint` | `^9.x` | v10 drops `.eslintrc.js` legacy config; upgrading requires migrating to `eslint.config.mjs` flat config |
