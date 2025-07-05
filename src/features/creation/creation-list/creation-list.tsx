import { readCreationSummaries } from "@/features/creation/creation-reader/read-creation";

import { CreationListView } from "./creation-list.view";

export const CreationList = async () => {
  const creationSummaries = await readCreationSummaries();

  return <CreationListView creations={creationSummaries} />;
};
