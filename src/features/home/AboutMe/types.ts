export type UserLink = {
  name: string;
  url: string;
  /**
   * アイコンなどの画像の URL
   *
   * できるだけ正方形である必要がある。
   */
  imageSrc: ImageMetadata;
};

export type AboutMeConfig = {
  name: string;
  bio: string;
  imageSrc: ImageMetadata;
  links: UserLink[];
};
