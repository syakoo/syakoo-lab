import { notFound } from "next/navigation";

import { readCreationSummaries } from "@/features/creation/creation-reader";

import { getRelatedCreations } from "./get-related-creations";
import { RelatedCreationsView } from "./related-creations.view";

type RelatedCreationsProps = {
  id: string;
};

export const RelatedCreations = async ({ id }: RelatedCreationsProps) => {
  const creationSummaries = await readCreationSummaries();
  const targetCreation = creationSummaries.find((c) => c.id === id);
  if (!targetCreation) notFound();

  const relatedCreations = getRelatedCreations(
    targetCreation,
    creationSummaries,
  );

  if (relatedCreations.length === 0) {
    return null;
  }

  return <RelatedCreationsView relatedCreations={relatedCreations} />;
};
