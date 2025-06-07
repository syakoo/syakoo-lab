export type GameContentFrontMatter = {
  id: string;
  title: string;
  published: string;
  tags: string[];
  gameplayScreen: {
    src: string;
    width: number;
    height: number;
  };
  logoSrc: string;
  publicLinks: {
    title: string;
    href: string;
    color: string;
  }[];
  updated?: string;
  noindex?: boolean;
  archived?: boolean;
};

export type GameContent = {
  frontMatter: GameContentFrontMatter;
  body: string;
};
