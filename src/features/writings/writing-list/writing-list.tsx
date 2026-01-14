import { readWritingHeads } from "@/features/writings/writing-reader/read-writing";

import { WritingListView } from "./writing-list-view";

export const WritingList = async () => {
  const heads = await readWritingHeads();

  return <WritingListView heads={heads} />;
};
