import { api } from "@/api";
import { readArtContents } from "@/contents/arts/reader";

/**
 * サイトビルド時に art で必要な処理
 *
 * NOTE: ビルド時のみ実行すること
 */
export const buildArtContents = async () => {
  const artIds = (await readArtContents()).map(
    ({ frontMatter }) => frontMatter.id,
  );

  await api.syncArtsFav({ artIds });
};
