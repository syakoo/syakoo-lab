import fs from "fs";
import path from "path";

import probe from "probe-image-size";

import type { ArtContent } from "@/contents/arts/types";
import type { Work } from "@/contents/works/types";

import type {
  CreationGameSummary,
  CreationIllustSummary,
  CreationWebappSummary,
} from "./creation-summary";

export const toCreationIllustSummary = (
  artContent: ArtContent,
): CreationIllustSummary => {
  const publicDir = path.join(process.cwd(), "public");
  const imgData = fs.readFileSync(
    path.join(publicDir, artContent.frontMatter.imgUrl),
  );
  const imageMeta = probe.sync(imgData);

  if (imageMeta === null) {
    throw new Error("画像サイズを適切に取得することができませんでした");
  }

  return {
    type: "illust",
    id: artContent.frontMatter.id,
    title: artContent.frontMatter.title,
    illust: {
      width: imageMeta.width,
      height: imageMeta.height,
      src: artContent.frontMatter.imgUrl,
    },
    tags: artContent.frontMatter.tags,
    // NOTE: イラストは外部公開することはないかな
    publicLinks: [],
    published: artContent.frontMatter.published,
    updated: artContent.frontMatter.updated,
    noindex: artContent.frontMatter.noindex,
  };
};

export const toCreationWebappSummary = (work: Work): CreationWebappSummary => {
  return {
    type: "webapp",
    id: work.id,
    title: work.name,
    published: work.releasedAt,
    publicLinks: [],
    tags: [],
    logo: {
      src: work.imageSrc.src,
      width: work.imageSrc.width,
      height: work.imageSrc.height,
    },
  };
};

export const toCreationGameSummary = (work: Work): CreationGameSummary => {
  return {
    type: "game",
    id: work.id,
    title: work.name,
    published: work.releasedAt,
    publicLinks: [],
    tags: [],
    gameplayScreen: {
      src: work.imageSrc.src,
      width: work.imageSrc.width,
      height: work.imageSrc.height,
    },
    logo: {
      src: work.imageSrc.src,
      width: work.imageSrc.width,
      height: work.imageSrc.height,
    },
  };
};
