import { siteConfig } from "../../shared/config/site";

/**
 * タイトル用に「`title` - Syakoo Lab」に変換する関数
 */
export const formatPageTitle = (title: string) =>
  `${title} - ${siteConfig.name}`;
