import fs from "fs";
import path from "path";

import probe from "probe-image-size";

import type { ArtContent } from "@/contents/arts/types";
import type { GameContent } from "@/contents/games/types";
import type { WebappContent } from "@/contents/webapps/types";
import type {
  CreationIllustSummary,
  CreationWebappSummary,
  CreationGameSummary,
} from "@/entities/creation/models/creation";
import { theme } from "@/shared/design-system/theme.css";

const publicDir = path.join(process.cwd(), "public");

export const toCreationIllustSummary = (
  artContent: ArtContent,
): CreationIllustSummary => {
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

export const toCreationWebappSummary = (
  work: WebappContent,
): CreationWebappSummary => {
  return {
    type: "webapp",
    id: work.id,
    title: work.name,
    published: work.releasedAt,
    publicLinks: [
      {
        title: work.name,
        color: theme.color.brand.primary,
        href: work.siteUrl,
      },
      {
        title: "GitHub",
        color: "#0d1117",
        href: work.repositoryUrl,
      },
    ],
    tags: [],
    logo: {
      src: work.imageSrc.src,
      width: work.imageSrc.width,
      height: work.imageSrc.height,
    },
  };
};

export const toCreationGameSummary = (
  game: GameContent,
): CreationGameSummary => {
  const imgData = fs.readFileSync(
    path.join(publicDir, game.frontMatter.logoSrc),
  );
  const imageMeta = probe.sync(imgData);

  if (imageMeta === null) {
    throw new Error("画像サイズを適切に取得することができませんでした");
  }

  return {
    type: "game",
    id: game.frontMatter.id,
    title: game.frontMatter.title,
    published: game.frontMatter.published,
    publicLinks: game.frontMatter.publicLinks,
    tags: game.frontMatter.tags,
    gameplayScreen: {
      src: game.frontMatter.gameplayScreen.src,
      width: game.frontMatter.gameplayScreen.width,
      height: game.frontMatter.gameplayScreen.height,
    },
    logo: {
      src: game.frontMatter.logoSrc,
      width: imageMeta.width,
      height: imageMeta.height,
    },
  };
};
