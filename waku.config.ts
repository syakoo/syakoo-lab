import { defineConfig } from "waku/config";
import { staticImage } from "./vite-plugins/static-image";

// NOTE: CommonJS で `require` を使う Node 専用パッケージはバンドルせず外部化する
const nodeOnlyPackages = ["jsdom", "sharp", "probe-image-size"];

export default defineConfig({
  vite: {
    plugins: [staticImage()],
    environments: {
      rsc: { resolve: { external: nodeOnlyPackages } },
      ssr: { resolve: { external: nodeOnlyPackages } },
    },
  },
});
