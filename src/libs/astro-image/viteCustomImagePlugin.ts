import type * as vite from "vite";
import fs from "node:fs";
import probe from "probe-image-size";

export const VALID_INPUT_FORMATS = [
  "jpeg",
  "jpg",
  "png",
  "tiff",
  "webp",
  "gif",
  "svg",
  "avif",
] as const;
const assetRegex = new RegExp(`\\.(${VALID_INPUT_FORMATS.join("|")})$`, "i");

/**
 * astro のような画像の読み込み制御を行う vite プラグイン。
 *
 * Storybook だと astro 独自の振る舞いがデフォルトで反映できないため追加。
 * 参考: {@link https://github.com/withastro/astro/blob/main/packages/astro/src/assets/vite-plugin-assets.ts#L128-L153}
 */
export const viteCustomImagePlugin = (): vite.Plugin => ({
  name: "vite-custom-image-plugin",
  transform: (code, id) => {
    if (assetRegex.test(id)) {
      const file = fs.readFileSync(id);
      const meta = probe.sync(file);
      if (!meta) {
        throw Error("画像サイズ取得に失敗しました。");
      }

      // NOTE: 超雑。`export default "xxx"` の形式から xxx を取り出す。
      const src = code.match(/"(.*?)"/)?.[1] as string;

      const { width, height, type } = meta;
      const resolvedObject: ImageMetadata = {
        src,
        width,
        height,
        format: type as ImageMetadata["format"],
      };

      return `export default ${JSON.stringify(resolvedObject)}`;
    }
  },
});
