import { optimizeImages } from "../src/widgets/writings/ui/writing-detail/optimize-images";

void (async () => {
  console.log("[start] optimize images");
  await optimizeImages();
  console.log("[end] optimize images");
})();
