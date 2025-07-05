import { notFound } from "next/navigation";

import { readCreationById } from "@/features/creation/creation-reader";

import { CreationDetailView } from "./creation-detail.view";

type CreationDetailProps = {
  id: string;
};

export const CreationDetail = async ({ id }: CreationDetailProps) => {
  const creation = await readCreationById(id);
  if (!creation) notFound();

  return <CreationDetailView creation={creation} />;
};
