import { readWritingContents } from "@/contents/writings/reader";
import { serializeWritingBody } from "@/features/writings/models/bodySerializer";
import { resolveWritingHead } from "@/features/writings/models/headResolver";
import { SerializedWriting } from "@/features/writings/models/types";

/**
 * 書き物を取得する関数
 */
export const findWriting = async (id: string): Promise<SerializedWriting> => {
  const writingContent = (await readWritingContents()).find(
    ({ frontMatter }) => frontMatter.id === id,
  );

  if (!writingContent) {
    throw new Error(`id=${id} の記事が見つかりませんでした。`);
  }

  const writing: SerializedWriting = {
    head: resolveWritingHead(writingContent.frontMatter),
    body: await serializeWritingBody(writingContent.body),
  };

  return writing;
};
