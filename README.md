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

Story-based VRT catches spacing, typography, and layout regressions against committed baseline screenshots.

### How it works

- Stories tagged with `"vrt"` are captured as PNG baselines stored in `__snapshots__/vrt/`.
- The `storybook-vrt` CI job compares every PR against those baselines using [`jest-image-snapshot`](https://github.com/americanexpress/jest-image-snapshot).
- Animations are neutralised before capture via `page.emulateMedia({ reducedMotion: "reduce" })` and a CSS injection that snaps all animation durations to 0.001 ms, so animated stories (e.g. `FadeIn`, `SyakooLabLogoWithAnimation`) produce stable snapshots.
- Up to 2 % pixel-level difference is allowed (`failureThreshold: 0.02`) to absorb sub-pixel rendering variation across Linux/Chromium environments.

### Updating baselines

When an intentional visual change is made:

1. Build Storybook and start the static server:

   ```bash
   pnpm storybook:build
   pnpm storybook:serve   # keep this running in a separate terminal
   ```

2. Regenerate baselines:

   ```bash
   pnpm storybook:test:vrt:update
   ```

3. Review the changed PNG files in `__snapshots__/vrt/`, commit them, and push.

### Adding a story to VRT coverage

Add `"vrt"` to the story's `tags` array in the meta object:

```tsx
const meta = {
  component: MyComponent,
  tags: ["vrt"],          // opt-in to VRT
} satisfies Meta<typeof MyComponent>;
```

Avoid tagging stories whose output is content-driven (e.g. MDX renderers, stories that fetch remote assets), as those tend to produce noisy diffs.
