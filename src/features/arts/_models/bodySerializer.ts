import { serializeMDX } from "@/features/mdx/serializeMDX";

import { ArtSerializedBody } from "./types";

/**
 * 文書の本文 MDX 文字列をシリアライズする関数
 */
export const serializeArtBody = async (
  bodyContent: string,
): Promise<ArtSerializedBody> => {
  const serializedContent = await serializeMDX(bodyContent);

  return {
    type: "serialized",
    data: serializedContent,
  };
};
