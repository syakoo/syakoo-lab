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

- VRT is **default-on** for Storybook stories. Screenshots land in `__snapshots__/vrt/`.
- Opt out with the `"skip-vrt"` tag (design-system galleries, remote/random/content-heavy stories).
- Focus is compositional UI in `widgets/` and `features/`; design-system stories are skipped.
- The `storybook-vrt` CI job runs stories without `skip-vrt` via [`jest-image-snapshot`](https://github.com/americanexpress/jest-image-snapshot).
- Animations are neutralised before capture via `page.emulateMedia({ reducedMotion: "reduce" })` and a CSS injection that snaps all animation durations to 0.001 ms.
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

### Skipping VRT for a story

Add `"skip-vrt"` to the story's `tags` array in the meta object:

```tsx
const meta = {
  component: MyComponent,
  tags: ["skip-vrt"],     // opt out of VRT
} satisfies Meta<typeof MyComponent>;
```

Use this for content-driven or flaky output (remote assets, random mocks, full MDX pages, design-system token galleries).
