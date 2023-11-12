import { MetadataRoute } from "next";

import { readWritingContents } from "@/contents/writings/reader";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  // TODO: まとめる
  const basePath = "https://syakoo-lab.com";

  const writingContents = await readWritingContents();

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
  ];
};

export default sitemap;
