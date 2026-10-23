import { readFileSync } from "node:fs";
import probe from "probe-image-size";
import type { Plugin } from "vite";

const IMAGE_RE = /\.(png|jpe?g|webp|gif)$/;

/**
 * 画像の import を `{ src, width, height }` に変換する
 *
 * Vite 標準では URL 文字列になってしまい、`<img>` の寸法指定に必要な
 * width / height が失われるため。
 */
export const staticImage = (): Plugin => ({
  name: "static-image",
  enforce: "pre",
  load(id) {
    if (!IMAGE_RE.test(id)) return null;

    const size = probe.sync(readFileSync(id));
    if (size === null) {
      throw new Error(`Unsupported image: ${id}`);
    }

    return [
      `import src from ${JSON.stringify(`${id}?url`)};`,
      `export default { src, width: ${size.width}, height: ${size.height} };`,
    ].join("\n");
  },
});
