import { compareDesc } from "date-fns";

import { readWritingContents } from "../../../../contents/writings/reader";
import type { WritingHead } from "../../models/writing";

import { resolveWritingHead } from "./head-resolver";

export const readWritingHeads = async (): Promise<WritingHead[]> => {
  const contents = await readWritingContents();

  return contents
    .map(({ frontMatter }) => resolveWritingHead(frontMatter))
    .sort((left, right) =>
      compareDesc(new Date(left.published), new Date(right.published)),
    );
};
