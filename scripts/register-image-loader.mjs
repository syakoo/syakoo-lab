import { readFileSync } from "node:fs";
import { registerHooks } from "node:module";
import { fileURLToPath } from "node:url";
import probe from "probe-image-size";

// NOTE: ビルド用スクリプトを tsx で実行する際、画像 import を
// `vite-plugins/static-image.ts` と同じ形 ({ src, width, height }) にする
registerHooks({
  load(url, context, nextLoad) {
    if (!/\.(png|jpe?g|webp|gif)$/.test(url)) return nextLoad(url, context);

    const { width, height } = probe.sync(readFileSync(fileURLToPath(url)));
    return {
      format: "module",
      shortCircuit: true,
      source: `export default ${JSON.stringify({ src: url, width, height })};`,
    };
  },
});
