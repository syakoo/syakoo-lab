import { readArtContents } from "@/contents/arts/reader";
import { resolveArtHead } from "@/features/arts/_models/headResolver";
import { SerializedArt } from "@/features/arts/_models/types";
import { serializeMDXContent } from "@/features/mdx/serializer";

/**
 * イラストを取得する関数
 */
export const findArt = async (id: string): Promise<SerializedArt> => {
  const artContent = (await readArtContents()).find(
    ({ frontMatter }) => frontMatter.id === id,
  );

  if (!artContent) {
    throw new Error(`id=${id} のイラストが見つかりませんでした。`);
  }

  const art: SerializedArt = {
    head: resolveArtHead(artContent.frontMatter),
    body: await serializeMDXContent(artContent.body),
  };

  return art;
};
