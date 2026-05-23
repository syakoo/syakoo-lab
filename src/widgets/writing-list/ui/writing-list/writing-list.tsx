import { readWritingHeads } from "../../../../entities/writing/index.server";

import { WritingListView } from "./writing-list-view";

export const WritingList = async () => {
  const heads = await readWritingHeads();

  return <WritingListView heads={heads} />;
};
