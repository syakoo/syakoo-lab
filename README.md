# Syakoo Lab

Personal site and lab for writings, creations, and experiments.

## Development

```bash
pnpm install
pnpm dev
```

## Quality checks

`pnpm lint` · `pnpm type-check` · `pnpm test`

Which tool or skill owns each standard is indexed in the `enforcement-inventory` rule under `.cursor/rules/`.

## Visual Regression Testing (VRT)

Story screenshots live in `__snapshots__/vrt/`. The `storybook-test` CI job checks them as an **advisory (non-blocking)** check: mismatches post a PR comment and upload a diff artifact; they do not fail the job. Accessibility checks in that job still fail CI.

Baselines target Linux/Chromium:

- **macOS:** `pnpm storybook:test:vrt:update` (Playwright Docker image; first run is slow)
- **Cursor Automation / Cloud Agent (already Linux):** `pnpm storybook:test:vrt:update:host` — do not nest Docker

Full rules and the CI-artefact fallback live in the `coding-guide` skill.
