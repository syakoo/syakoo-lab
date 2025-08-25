import type { WritingContentFrontMatter } from "@/contents/writings/types";
import type { WritingHead } from "@/entities/writing/models/writing";

/**
 * 文書のヘッダーコンテンツを変換する関数
 */
export const resolveWritingHead = (
  frontMatter: WritingContentFrontMatter,
): WritingHead => {
  return {
    id: frontMatter.id,
    title: frontMatter.title,
    type: frontMatter.type,
    tags: frontMatter.tags,
    published: frontMatter.published,
    updated: frontMatter.updated,
    noindex: frontMatter.noindex,
  };
};
