export type ArtContentFrontMatter = {
  id: string;
  title: string;
  published: string;
  imgUrl: string;
  tags: string[];
};

export type ArtContent = {
  frontMatter: ArtContentFrontMatter;
  body: string;
};
