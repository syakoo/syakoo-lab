import type { SerializedMDXContent } from "@/features/mdx/types";

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

export type SerializedWriting = {
  head: WritingHead;
  body: SerializedMDXContent;
};
