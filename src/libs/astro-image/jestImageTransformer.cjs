/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const probe = require("probe-image-size");

const VALID_INPUT_FORMATS = [
  "jpeg",
  "jpg",
  "png",
  "tiff",
  "webp",
  "gif",
  "svg",
  "avif",
];
const assetValidImageRegex = new RegExp(
  `\\.(${VALID_INPUT_FORMATS.join("|")})$`,
  "i",
);

/**
 * astro のような画像の読み込み制御を行う jest transformer
 *
 * 参考: {@link https://jestjs.io/docs/next/code-transformation#writing-custom-transformers}
 */
module.exports = {
  process: (_, sourcePath) => {
    if (assetValidImageRegex.test(sourcePath)) {
      const file = fs.readFileSync(sourcePath);
      const meta = probe.sync(file);
      if (!meta) {
        throw Error("画像サイズ取得に失敗しました。");
      }

      const src = `/mock-dir/${sourcePath.split("/").pop()}`;
      const { width, height, type } = meta;
      const resolvedObject = {
        src,
        width,
        height,
        format: type,
      };

      return { code: `module.exports = ${JSON.stringify(resolvedObject)}` };
    }
  },
};
