import type { StaticImageData } from "next/image";

export type UserLink = {
  name: string;
  url: string;
  /**
   * アイコンなどの画像の URL
   *
   * できるだけ正方形である必要がある。
   */
  imageSrc: StaticImageData;
};

export type AboutMeConfig = {
  name: string;
  bio: string;
  imageSrc: StaticImageData;
  links: UserLink[];
};
