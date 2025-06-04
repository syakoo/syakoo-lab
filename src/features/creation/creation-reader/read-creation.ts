import { compareDesc } from "date-fns/esm";

import { readArtContents } from "@/contents/arts/reader";
import { readWebappContents } from "@/contents/webapps/reader";
import type { Creation } from "@/entities/creation/models/creation";
import { serializeMDXContent } from "@/features/mdx/serializer";

import type { CreationSummary } from "./creation-summary";
import {
  toCreationIllustSummary,
  toCreationWebappSummary,
} from "./to-creation-summary";

export const readCreationById = async (
  id: string,
): Promise<Creation | null> => {
  const targetArtContent = (await readArtContents()).find(
    ({ frontMatter }) => frontMatter.id === id,
  );
  const targetWebappContent = readWebappContents().find(
    (work) => id === work.id,
  );

  if (targetArtContent) {
    return {
      ...toCreationIllustSummary(targetArtContent),
      content: await serializeMDXContent(targetArtContent.body),
    };
  } else if (targetWebappContent) {
    return {
      ...toCreationWebappSummary(targetWebappContent),
      content: await serializeMDXContent(targetWebappContent.description),
    };
  }

  return null;
};

export const readCreationSummaries = async (): Promise<CreationSummary[]> => {
  const arts = await readArtContents();
  const webapps = readWebappContents();

  const summaries = [
    ...arts.map(toCreationIllustSummary),
    ...webapps.map(toCreationWebappSummary),
  ].sort((a, b) => compareDesc(new Date(a.published), new Date(b.published)));

  return summaries;
};
