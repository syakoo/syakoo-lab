/**
 * Browser stub for `sharp` (Node-only). Replaces `sb.mock(import("sharp"))`,
 * which fails on sharp ≥0.35 because Storybook resolves `sharp/package.json`
 * and that subpath is not in sharp's `exports`.
 */
const sharp = () => {
  throw new Error("sharp is not available in Storybook");
};

export default sharp;
