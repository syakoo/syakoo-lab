import type { StaticImageData } from "next/image";

export type WebappContent = {
  id: string;
  name: string;
  imageSrc: StaticImageData;
  releasedAt: string;
  siteUrl: string;
  repositoryUrl: string;
  /**
   * コンテンツの説明文
   *
   * - MDX 形式で記載する
   */
  description: string;
};
