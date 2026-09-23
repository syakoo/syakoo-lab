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

Baselines target Linux/Chromium, so they are updated from CI artefacts rather than locally. The `coding-guide` skill has the rules for writing VRT-safe stories and the baseline update procedure.
