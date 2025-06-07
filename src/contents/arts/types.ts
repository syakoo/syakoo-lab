export type ArtContentFrontMatter = {
  id: string;
  title: string;
  published: string;
  updated?: string;
  noindex?: boolean;
  imgUrl: string;
  tags: string[];
};

export type ArtContent = {
  frontMatter: ArtContentFrontMatter;
  body: string;
};
