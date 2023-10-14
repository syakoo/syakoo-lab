import type { WritingMeta } from "./types";
import type { WritingContentFrontMatter } from "@/contents/writings/types";

export const getWritingMetaFromFrontMatter = (
  frontMatter: WritingContentFrontMatter,
): WritingMeta => {
  const link = `/writings/${frontMatter.id}`;

  return {
    id: frontMatter.id,
    link,
    title: frontMatter.title,
    type: frontMatter.type,
    tags: frontMatter.tags,
    published: frontMatter.published,
    updated: frontMatter.updated,
    noindex: frontMatter.noindex,
  };
};
