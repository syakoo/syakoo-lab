/**
 * CAUTION: node で使用すること
 */
import fs from "fs";
import path from "path";

import probe from "probe-image-size";

import type { ArtContentFrontMatter } from "@/contents/arts/types";

import type { ArtHead } from "./types";

/**
 * イラストのヘッダーコンテンツを変換する関数
 */
export const resolveArtHead = (frontMatter: ArtContentFrontMatter): ArtHead => {
  const publicDir = path.join(process.cwd(), "public");
  const imgData = fs.readFileSync(path.join(publicDir, frontMatter.imgUrl));

  const imageMeta = probe.sync(imgData);
  if (imageMeta === null) {
    throw new Error("画像サイズを適切に取得することができませんでした");
  }

  return {
    ...frontMatter,
    size: { width: imageMeta.width, height: imageMeta.height },
  };
};
