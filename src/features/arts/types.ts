export type ArtMeta = {
  id: string;
  title: string;
  published: string;
  imgUrl: string;
  size: { width: number; height: number };
  tags: string[];
};

export type Art = {
  meta: ArtMeta;
  serializedBody: string;
};
