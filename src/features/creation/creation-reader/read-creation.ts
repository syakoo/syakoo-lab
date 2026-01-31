import { compareDesc } from "date-fns/esm";

import { readArtContents } from "../../../contents/arts/reader";
import { readGameContents } from "../../../contents/games/reader";
import { readWebappContents } from "../../../contents/webapps/reader";
import type {
  Creation,
  CreationSummary,
} from "../../../entities/creation/models/creation";
import { serializeMDXContent } from "../../mdx/serializer";

import {
  toCreationGameSummary,
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
  const targetGameContent = (await readGameContents()).find(
    (game) => id === game.frontMatter.id,
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
  } else if (targetGameContent) {
    return {
      ...toCreationGameSummary(targetGameContent),
      content: await serializeMDXContent(targetGameContent.body),
    };
  }

  return null;
};

export const readCreationSummaries = async (): Promise<CreationSummary[]> => {
  const arts = await readArtContents();
  const webapps = readWebappContents();
  const games = await readGameContents();

  const summaries = [
    ...arts.map(toCreationIllustSummary),
    ...webapps.map(toCreationWebappSummary),
    ...games.map(toCreationGameSummary),
  ].sort((a, b) => compareDesc(new Date(a.published), new Date(b.published)));

  return summaries;
};
