import type { MetadataRoute } from "next";

import { readGameContents } from "@/contents/games/reader";
import { readWebappContents } from "@/contents/webapps/reader";
import { readWritingContents } from "@/contents/writings/reader";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const basePath = "https://syakoo-lab.com";

  const writingContents = await readWritingContents();
  // NOTE: Art は二次創作イラストを含むため、意図的にサイトマップから除外している
  const gameContents = await readGameContents();
  const webappContents = readWebappContents();

  return [
    {
      url: basePath,
      lastModified: new Date(),
    },
    ...writingContents
      .filter(({ frontMatter }) => !frontMatter.noindex)
      .map(({ frontMatter }) => ({
        url: `${basePath}/writings/${frontMatter.id}`,
        lastModified: frontMatter.updated ?? frontMatter.published,
      })),
    ...gameContents
      .filter(({ frontMatter }) => !frontMatter.noindex)
      .map(({ frontMatter }) => ({
        url: `${basePath}/creations/${frontMatter.id}`,
        lastModified: frontMatter.updated ?? frontMatter.published,
      })),
    ...webappContents.map((webapp) => ({
      url: `${basePath}/creations/${webapp.id}`,
      lastModified: webapp.releasedAt,
    })),
  ];
};

export default sitemap;
