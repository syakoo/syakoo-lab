import type { MDXComponent } from "../mdx/resolveMDXAsComponent";

export type WritingType = "article" | "note" | "diary";

export type WritingMeta = {
  id: string;
  link: string;
  title: string;
  type: WritingType;
  tags: string[];
  published: string;
  updated?: string;
  noindex?: boolean;
};

export type Writing = {
  meta: WritingMeta;
  content: MDXComponent;
};
