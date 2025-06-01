import type { SerializedMDXContent } from "@/features/mdx/types";

export type CreationType = "illust" | "game" | "webapp";
export type Creation = CreationIllust | CreationGame | CreationWebapp;

export type CreationIllust = CreationBase & {
  type: "illust";
  tags: string[];
  content: SerializedMDXContent;
};
export type CreationGame = CreationBase & {
  type: "game";
  tags: string[];
  content: SerializedMDXContent;
};
export type CreationWebapp = CreationBase & {
  type: "webapp";
  tags: string[];
  content: SerializedMDXContent;
};
export type CreationBase = {
  id: string;
  title: string;
  thumbnailImage: {
    src: string;
    width: number;
    height: number;
  };
  published: string;
  updated?: string;
  noindex?: boolean;
};
