import type { WritingContentFrontMatter } from "@/contents/writings/types";

import type { WritingHead } from "./types";

/**
 * 文書のヘッダーコンテンツを変換する関数
 */
export const resolveWritingHead = (
  frontMatter: WritingContentFrontMatter,
): WritingHead => {
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
