import { generateCreationOgImages } from "./og-images/generate-creation-og-images";

void (async () => {
  console.log("[start] generate OG images");
  await generateCreationOgImages();
  console.log("[end] generate OG images");
})();
