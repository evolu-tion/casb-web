<!-- Copilot / AI agent instructions for contributors working on casb-web -->

# casb-web — Copilot Instructions

This file contains concise, actionable guidance for AI coding agents and automation working in this repository. Follow these rules and references so suggestions and edits fit the project's structure and conventions.

- Project type: Astro (v4) static site using Tailwind, MDX, and TypeScript. Key entrypoints: `package.json` scripts and `astro.config.mjs`.
- Node requirement: `engines.node >= 18.14.1` (see `package.json`). Use that runtime for builds.

What to read first
- `astro.config.mjs` — integrations (Tailwind, MDX, sitemap, Partytown), image service, and Vite alias (`~` → `src`).
- `src/config.yaml` and `src/utils/config.ts` — canonical site config exposed as `SITE`, `APP_BLOG`, `ANALYTICS`. Changes here affect site URL behavior and permalinks.
- `src/content/config.ts` — Astro Content Collections schema (Zod). Use this to validate frontmatter keys and types.
- `src/utils/permalinks.ts` — permalink helpers and `POST_PERMALINK_PATTERN`. Use these helpers to construct URLs consistently.

Build / local workflow (commands)
- Install deps: `npm install` (or `pnpm install` / `bun` if preferred, but repo scripts assume npm).
- Dev server: `npm run dev` (alias: `npm start`).
- Build: `npm run build` (runs `astro check && astro build`).
- Preview production output: `npm run preview`.
- Lint: `npm run lint:eslint`. Format: `npm run format` (Prettier).

Content & frontmatter conventions
- Content lives under `src/content/`. Blog posts are `src/content/post/*.md` or `.mdx`.
- The content collection schema (see `src/content/config.ts`) expects these common frontmatter keys:
  - `title` (string, required)
  - `publishDate` / `updateDate` (date, optional)
  - `draft` (boolean, optional)
  - `excerpt`, `image`, `category`, `tags` (optional)
  - `metadata` (optional nested object for SEO)
- Example new post frontmatter (use ISO date strings):

  ```yaml
  ---
  publishDate: 2025-11-23T00:00:00Z
  title: "My New Post Title"
  excerpt: "Short summary"
  tags:
    - tag1
    - tag2
  ---
  ```

URLs & permalinks
- The site `base` and `trailingSlash` are driven by `src/config.yaml` and surfaced in code via `SITE` in `src/utils/config.ts`.
- Use `getPermalink`, `getBlogPermalink`, and `getCanonical` from `src/utils/permalinks.ts` when generating links programmatically. Respect `POST_PERMALINK_PATTERN` for post URLs.

Code & patterns
- TypeScript & Astro: prefer `.ts` helpers in `src/utils`, and `.astro` components under `src/components` and `src/layouts`.
- Vite alias: import `~/...` to reference `src` (configured in `astro.config.mjs`).
- Image handling: `squooshImageService()` is used; `sharp` is in devDependencies for local image tasks. Avoid adding a different global image service unless consistent with config.
- Frontmatter plugins: `src/utils/frontmatter.mjs` adds `readingTime` and responsive table handling. Do not remove the remark/rehype plugins without updating `astro.config.mjs`.

Integrations & external behavior
- Analytics integration is controlled in `src/config.yaml` and read via `ANALYTICS` in `src/utils/config.ts`. Partytown is conditionally enabled based on that config.
- Sitemap has a list of custom pages inside `astro.config.mjs` — update with care.

Agent editing rules (must follow)
- Keep changes minimal and scoped — prefer small, focused commits.
- When touching content, follow `src/content/config.ts` schema and the existing frontmatter examples.
- When changing URLs or `SITE` config, update `src/config.yaml`, and check `src/utils/permalinks.ts` + `astro.config.mjs` for side effects (sitemap, canonical URLs).
- Avoid changing build scripts or Node engine without explicit human approval.

If unsure
- Ask for clarification before changing `src/config.yaml`, routing, or integration flags (analytics, partytown, sitemap).
- Prefer proposing PR text that explains why a change is required and where it impacts (content, sitemap, canonical URLs).

Files worth referencing in diffs or PRs
- `package.json`, `astro.config.mjs`, `src/config.yaml`, `src/utils/config.ts`, `src/content/config.ts`, `src/utils/permalinks.ts`, `src/utils/frontmatter.mjs`, `src/content/post/*`, `src/components/*`.

Thanks — ask for clarification if any behavior seems inconsistent with these files.
