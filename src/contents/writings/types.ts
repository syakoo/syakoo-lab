/**
 * Writing の front-matter
 */
export type WritingContentFrontMatter = {
  id: string;
  type: "article" | "note" | "diary";
  title: string;
  published: string;
  updated?: string;
  noindex?: boolean;
  tags: string[];
};

export type WritingContent = {
  frontMatter: WritingContentFrontMatter;
  body: string;
};
