import { MDXComponent } from "@/features/mdx/types";

export type WritingType = "article" | "note" | "diary";

export type WritingHead = {
  id: string;
  link: string;
  title: string;
  type: WritingType;
  tags: string[];
  published: string;
  updated?: string;
  noindex?: boolean;
};

export type WritingSerializedBody = {
  type: "serialized";
  data: string;
};
export type WritingResolvedBody = {
  type: "resolved";
  data: MDXComponent;
};

export type SerializedWriting = {
  head: WritingHead;
  body: WritingSerializedBody;
};
