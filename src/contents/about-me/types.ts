import type { StaticImage } from "../../shared/types/static-image";

export type UserLink = {
  name: string;
  url: string;
  /**
   * アイコンなどの画像の URL
   *
   * できるだけ正方形である必要がある。
   */
  imageSrc: StaticImage;
};

export type AboutMeConfig = {
  name: string;
  bio: string;
  imageSrc: StaticImage;
  links: UserLink[];
};
