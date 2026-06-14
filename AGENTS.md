# AGENTS.md

## Cursor Cloud specific instructions

Syakoo Lab is a single **Next.js 16 (App Router) + React 19** statically-exported
personal website. Content is local MDX/markdown under `src/contents/` — there is
no backend, database, or external service to run. All commands live in
`package.json` `scripts`; use those rather than duplicating them here.

### Runtime / toolchain

- The repo pins Node `24.16.0` (`.node-version`) with `engine-strict=true`
  (`.npmrc`), and pnpm `10.34.1` (`packageManager`). Node <24 fails `pnpm install`.
- The base VM ships a Node 22 binary at `/exec-daemon/node` that sits early in
  `PATH`. To make the project's Node 24 win everywhere (including the startup
  update script and non-interactive shells), Node 24's `node`/`pnpm`/`npm`/`npx`/
  `corepack` are symlinked into `/usr/local/cargo/bin` (the first, writable `PATH`
  entry). This is a persisted one-time setup; you should not need to touch nvm.
  If `node --version` ever shows v22, the symlinks are missing — recreate them
  from `~/.nvm/versions/node/v24.16.0/bin`.

### Required env var

- Both `pnpm dev` and `pnpm build` require `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`
  (validated by `env.ts` via `@t3-oss/env-nextjs`). Use any string; a value not
  starting with `G-` disables real tracking. `.env.test` already sets
  `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=dummy-ga-id`. Export it inline when running,
  e.g. `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=dummy-ga-id pnpm dev`.

### Running / checks

- Dev server: `pnpm dev` (Next dev on port 3000).
- Static build: `pnpm build` → `out/`. The build dumps large CSS strings to
  stderr while jsdom parses Mermaid/MDX HTML — this is harmless noise, not a
  failure; rely on the exit code and the route table at the end.
- Checks: `pnpm lint` (Biome), `pnpm type-check` (tsc), `pnpm test` (Vitest).
- Storybook (optional, component catalog/a11y): `pnpm storybook`, or
  `pnpm storybook:build` + `pnpm storybook:serve` (port 6006). A11y test runner
  (`pnpm storybook:test:ci`) additionally needs `pnpm exec playwright install chromium`.

### Git hooks

- `pnpm install` runs `prepare`, which wires `.githooks` (pre-push runs lint +
  tests, commit-msg runs commitlint). Commit messages must follow Conventional
  Commits.
