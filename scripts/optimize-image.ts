import { optimizeImages } from "@/features/writings/writing-detail/optimize-images";

void (async () => {
  console.log("[start] optimize images");
  await optimizeImages();
  console.log("[end] optimize images");
})();
