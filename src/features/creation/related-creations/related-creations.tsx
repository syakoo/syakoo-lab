import { notFound } from "next/navigation";

import {
  readCreationById,
  readCreationSummaries,
} from "@/features/creation/creation-reader";

import { getRelatedCreations } from "./get-related-creations";
import { RelatedCreationsView } from "./related-creations.view";

type RelatedCreationsProps = {
  id: string;
};

export const RelatedCreations = async ({ id }: RelatedCreationsProps) => {
  const targetCreation = await readCreationById(id);
  if (!targetCreation) notFound();

  const relatedCreations = getRelatedCreations(
    targetCreation,
    await readCreationSummaries(),
  );

  if (relatedCreations.length === 0) {
    return null;
  }

  return <RelatedCreationsView relatedCreations={relatedCreations} />;
};
