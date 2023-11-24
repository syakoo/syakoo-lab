import { SerializedMDXContent } from "@/features/mdx/types";

export type ArtHead = {
  id: string;
  title: string;
  published: string;
  imgUrl: string;
  size: { width: number; height: number };
  tags: string[];
};

export type SerializedArt = {
  head: ArtHead;
  body: SerializedMDXContent;
};
