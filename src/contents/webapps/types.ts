import type { StaticImage } from "../../shared/types/static-image";

export type WebappContent = {
  id: string;
  name: string;
  imageSrc: StaticImage;
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
