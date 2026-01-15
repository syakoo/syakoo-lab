"use server";

import { readFileSync } from "node:fs";

import { glob } from "glob";
import type { Sharp } from "sharp";
import sharp from "sharp";

export const optimizeImages = async () => {
  const imagePaths = await glob("**/public/img/writings/**/*.{png,jpg,jpeg}");

  for (const imagePath of imagePaths) {
    const image = sharp(readFileSync(imagePath));
    const optimizedImage = await optimizeImage(image);
    if (optimizedImage) {
      await optimizedImage.toFile(imagePath);
    }
  }
};

const MAX_WIDTH = 2048;

const optimizeImage = async (image: Sharp): Promise<Sharp | undefined> => {
  const metadata = await image.metadata();
  if (!metadata.width || metadata.width <= MAX_WIDTH) return;

  return image.resize({ width: MAX_WIDTH });
};
