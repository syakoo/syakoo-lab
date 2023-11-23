import { MDXComponent } from "@/features/mdx/types";

export type ArtHead = {
  id: string;
  title: string;
  published: string;
  imgUrl: string;
  size: { width: number; height: number };
  tags: string[];
};

export type ArtSerializedBody = {
  type: "serialized";
  data: string;
};
export type ArtResolvedBody = {
  type: "resolved";
  data: MDXComponent;
};

export type SerializedArt = {
  head: ArtHead;
  body: ArtSerializedBody;
};
