import { api } from "@/api/reaction-system";
import { readArtContents } from "@/contents/arts/reader";

import { convertArtIdToReactionId } from "./_shared/art-id-to-reaction-id";

/**
 * サイトビルド時に art で必要な処理
 *
 * NOTE: ビルド時のみ実行すること
 */
export const buildArtContents = async () => {
  const artIds = (await readArtContents()).map(
    ({ frontMatter }) => frontMatter.id,
  );

  await api.syncReaction(artIds.map(convertArtIdToReactionId));
};
