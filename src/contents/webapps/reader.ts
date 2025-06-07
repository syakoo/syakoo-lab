import type { WebappContent } from "./types";
import { webapps } from "./webapps";

/**
 * Webapp contents を取得する関数
 */
export const readWebappContents = (): WebappContent[] => {
  return webapps;
};
