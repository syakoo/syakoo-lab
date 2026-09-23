/**
 * Primary webfonts for Storybook (`@fontsource/*` in `.storybook/preview.ts`).
 * Keep names in sync with `--font-primary` in `globals.css`.
 *
 * VRT must `document.fonts.load` with the story's real text so CJK
 * unicode-range subsets download (a single "あ" is not enough).
 */
export const primaryWebFontFamilies = ["Roboto", "Noto Sans JP"] as const;

export const primaryWebFontWeights = [400, 700] as const;
