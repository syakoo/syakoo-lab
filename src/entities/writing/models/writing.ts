import type { SerializedMDXContent } from "../../mdx-content";

export type WritingType = "article" | "note" | "diary";

export type WritingHead = {
  id: string;
  title: string;
  type: WritingType;
  tags: string[];
  published: string;
  updated?: string;
  noindex?: boolean;
};

export type WritingTocItem = {
  id: string;
  label: string;
  depth: 2 | 3;
};

export type SerializedWriting = {
  head: WritingHead;
  toc: WritingTocItem[];
  body: SerializedMDXContent;
};
