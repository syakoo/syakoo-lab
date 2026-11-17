import { generateCreationOgImages } from "../src/entities/creation/index.server";

void (async () => {
  console.log("[start] generate OG images");
  await generateCreationOgImages();
  console.log("[end] generate OG images");
})();
