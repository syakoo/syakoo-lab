"use server";

import { Writing } from "../types";
import { resolveWritingMeta } from "../writingContentResolver";
import { RelatedWritingsNavView } from "./RelatedWritingsNavView";
import { readWritingContents } from "@/contents/writings/reader";

type RelatedWritingsNavProps = {
  tags: Writing["meta"]["tags"];
};
/**
 * 関連文書表示サーバーコンポーネント
 */
export const RelatedWritingsNav: React.FC<RelatedWritingsNavProps> = async ({
  tags,
}) => {
  const relatedWritingMetas = (await readWritingContents())
    .map(({ frontMatter }) => resolveWritingMeta({ frontMatter }))
    .filter((meta) => tags.some((tag) => meta.tags.includes(tag)))
    .slice(0, 5);

  if (relatedWritingMetas.length === 0) {
    return null;
  }

  return <RelatedWritingsNavView metas={relatedWritingMetas} />;
};
