"use server";

import { Writing } from "../types";
import { resolveWritingMeta } from "../writingContentResolver";
import { RelatedWritingsNavView } from "./RelatedWritingsNavView";
import { readWritingContents } from "@/contents/writings/reader";
import { isIntersect } from "@/utils/array/isIntersect";

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
    .filter((meta) => isIntersect(meta.tags, tags))
    .slice(0, 5);

  if (relatedWritingMetas.length === 0) {
    return null;
  }

  return <RelatedWritingsNavView metas={relatedWritingMetas} />;
};
