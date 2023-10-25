/**
 * src/contents/writings 以下のコンテンツにアクセスしてよしなに処理してくれるやつ。
 *
 * CAUTION: node で使用すること
 */
import type { WritingMeta } from "./types";
import type { WritingContentFrontMatter } from "@/contents/writings/types";

type ResolveWritingMeta = (arg: {
  frontMatter: WritingContentFrontMatter;
}) => WritingMeta;
export const resolveWritingMeta: ResolveWritingMeta = ({ frontMatter }) => {
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
