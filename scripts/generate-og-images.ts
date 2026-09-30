import { generateCreationOgImages } from "../src/features/creation/og-image/index.server";

void (async () => {
  console.log("[start] generate OG images");
  await generateCreationOgImages();
  console.log("[end] generate OG images");
})();
