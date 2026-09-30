import { glob } from "glob";
import matter from "gray-matter";
import path from "path";

import type { ArtContentFrontMatter } from "../../../contents/arts/types";
import type { GameContentFrontMatter } from "../../../contents/games/types";

const publicDir = path.join(process.cwd(), "public");
const cwd = process.cwd();

type CreationThumbnailPath = {
  id: string;
  /** Absolute path to the thumbnail image file */
  thumbnailAbsPath: string;
};

const readArtThumbnailPaths = async (): Promise<CreationThumbnailPath[]> => {
  const mdxFilePaths = await glob("**/contents/arts/**/index.mdx");

  return mdxFilePaths.map((filePath) => {
    const matterFile = matter.read(filePath);
    const { id, imgUrl } = matterFile.data as ArtContentFrontMatter;

    return { id, thumbnailAbsPath: path.join(publicDir, imgUrl) };
  });
};

const readGameThumbnailPaths = async (): Promise<CreationThumbnailPath[]> => {
  const mdxFilePaths = await glob("**/contents/games/**/index.mdx");

  return mdxFilePaths.map((filePath) => {
    const matterFile = matter.read(filePath);
    const { id, logoSrc } = matterFile.data as GameContentFrontMatter;

    return { id, thumbnailAbsPath: path.join(publicDir, logoSrc) };
  });
};

/**
 * Webapp images live in `src/contents/webapps/images/` and are processed by
 * Next.js at build time. For OG image generation we read them directly from
 * the source directory rather than going through the Next.js image pipeline.
 */
const readWebappThumbnailPaths = async (): Promise<CreationThumbnailPath[]> => {
  const webappImagePaths = await glob(
    "src/contents/webapps/images/*.{png,jpg,jpeg,webp}",
  );

  return webappImagePaths.map((filePath) => {
    const basename = path.basename(filePath, path.extname(filePath));

    return {
      id: basename,
      thumbnailAbsPath: path.join(cwd, filePath),
    };
  });
};

export const readCreationThumbnailPaths = async (): Promise<
  CreationThumbnailPath[]
> => {
  const [arts, games, webapps] = await Promise.all([
    readArtThumbnailPaths(),
    readGameThumbnailPaths(),
    readWebappThumbnailPaths(),
  ]);

  return [...arts, ...games, ...webapps];
};
