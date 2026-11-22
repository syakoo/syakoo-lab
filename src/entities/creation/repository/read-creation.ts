import { compareDesc } from "date-fns";

import { readArtContents } from "../../../contents/arts/reader";
import { readGameContents } from "../../../contents/games/reader";
import { readWebappContents } from "../../../contents/webapps/reader";
import { serializeMDXContent } from "../../../shared/mdx/index.server";
import type { Creation, CreationSummary } from "../model/creation";

import {
  resolveCreationGameSummary,
  resolveCreationIllustSummary,
  resolveCreationWebappSummary,
} from "./contents-resolver/creation-summary-resolver";

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
      ...resolveCreationIllustSummary(targetArtContent),
      content: await serializeMDXContent(targetArtContent.body),
    };
  } else if (targetWebappContent) {
    return {
      ...resolveCreationWebappSummary(targetWebappContent),
      content: await serializeMDXContent(targetWebappContent.description),
    };
  } else if (targetGameContent) {
    return {
      ...resolveCreationGameSummary(targetGameContent),
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
    ...arts.map(resolveCreationIllustSummary),
    ...webapps.map(resolveCreationWebappSummary),
    ...games.map(resolveCreationGameSummary),
  ].sort((a, b) => compareDesc(new Date(a.published), new Date(b.published)));

  return summaries;
};
