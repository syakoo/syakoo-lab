import fs from "fs";
import path from "path";

import sharp from "sharp";

import { readCreationThumbnailPaths } from "./read-creation-thumbnail-paths";

const publicDir = path.join(process.cwd(), "public");
const ogDir = path.join(publicDir, "og", "creations");
const logoPath = path.join(publicDir, "logo.png");

/** OG image size (square for twitter:card=summary) */
const OG_SIZE = 1200;
/** Logo composite size (scaled up from original 120×120) */
const LOGO_SIZE = 400;
const LOGO_CORNER_RADIUS = 12;
/** Padding from the bottom-right edge */
const LOGO_PADDING = 32;

const compositeOgImage = async (
  thumbnailAbsPath: string,
  outputPath: string,
): Promise<void> => {
  const logoMask = Buffer.from(
    `<svg width="${LOGO_SIZE}" height="${LOGO_SIZE}"><rect width="${LOGO_SIZE}" height="${LOGO_SIZE}" rx="${LOGO_CORNER_RADIUS}" ry="${LOGO_CORNER_RADIUS}" fill="#fff"/></svg>`,
  );
  const logoBuffer = await sharp(logoPath)
    .resize(LOGO_SIZE, LOGO_SIZE, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .composite([{ input: logoMask, blend: "dest-in" }])
    .png()
    .toBuffer();

  await sharp(thumbnailAbsPath)
    .resize(OG_SIZE, OG_SIZE, { fit: "cover" })
    .composite([
      {
        input: logoBuffer,
        top: OG_SIZE - LOGO_SIZE - LOGO_PADDING,
        left: OG_SIZE - LOGO_SIZE - LOGO_PADDING,
      },
    ])
    .png()
    .toFile(outputPath);
};

export const generateCreationOgImages = async (): Promise<void> => {
  fs.mkdirSync(ogDir, { recursive: true });

  const thumbnailPaths = await readCreationThumbnailPaths();

  await Promise.all(
    thumbnailPaths.map(async ({ id, thumbnailAbsPath }) => {
      if (!fs.existsSync(thumbnailAbsPath)) {
        return;
      }

      const outputPath = path.join(ogDir, `${id}.png`);
      await compositeOgImage(thumbnailAbsPath, outputPath);
    }),
  );
};
