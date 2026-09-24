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

Story screenshots live in `__snapshots__/vrt/` and are checked by the `storybook-test` CI job.

Baselines target Linux/Chromium. Update them with Docker so local screenshots match CI:

```bash
pnpm storybook:test:vrt:update
```

Rules and the CI-artefact fallback live in the `coding-guide` skill.
