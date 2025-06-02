import type { SerializedMDXContent } from "@/features/mdx/types";

export type CreationType = "illust" | "game" | "webapp";
export type Creation = CreationIllust | CreationGame | CreationWebapp;

export type CreationIllust = CreationBase & {
  type: "illust";
  illust: {
    src: string;
    width: number;
    height: number;
  };
  tags: string[];
  content: SerializedMDXContent;
};
export type CreationGame = CreationBase & {
  type: "game";
  gameplayScreen: {
    src: string;
    width: number;
    height: number;
  };
  logo: {
    src: string;
    width: number;
    height: number;
  };
  tags: string[];
  content: SerializedMDXContent;
};
export type CreationWebapp = CreationBase & {
  type: "webapp";
  logo: {
    src: string;
    width: number;
    height: number;
  };
  tags: string[];
  content: SerializedMDXContent;
};
export type CreationBase = {
  id: string;
  title: string;
  published: string;
  publicLinks: {
    title: string;
    href: string;
    color: string;
  }[];
  updated?: string;
  noindex?: boolean;
};
