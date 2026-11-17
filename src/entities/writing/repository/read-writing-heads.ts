import { compareDesc } from "date-fns";

import { readWritingContents } from "../../../contents/writings/reader";
import { resolveWritingHead } from "../model/head-resolver";
import type { WritingHead } from "../model/writing";

export const readWritingHeads = async (): Promise<WritingHead[]> => {
  const contents = await readWritingContents();

  return contents
    .map(({ frontMatter }) => resolveWritingHead(frontMatter))
    .sort((left, right) =>
      compareDesc(new Date(left.published), new Date(right.published)),
    );
};
