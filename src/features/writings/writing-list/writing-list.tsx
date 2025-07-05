import { compareDesc } from "date-fns";

import { readWritingContents } from "@/contents/writings/reader";
import { resolveWritingHead } from "@/features/writings/_models/head-resolver";

import { WritingListView } from "./writing-list.view";

export const WritingList = async () => {
  const metas = (await readWritingContents())
    .map(({ frontMatter }) => resolveWritingHead(frontMatter))
    .sort((left, right) =>
      compareDesc(new Date(left.published), new Date(right.published)),
    );

  return <WritingListView heads={metas} />;
};
