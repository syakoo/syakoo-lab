import { JSDOM } from "jsdom";

import type { MDXCustomTextPlugin } from "@/features/mdx/types";

import type { LinkCardProps } from "./LinkCard";

const joinPathRoot = (path: string, url: string) => {
  if (path.match("https://")) {
    return path;
  }

  const base = url.split("/").slice(0, 3).join("/");
  return `${base}/${path}`;
};

const isExpectImgSrc = (content: string): boolean => {
  return content.startsWith("http") || content.startsWith("/");
};

const getLinkCardProps = async (url: string): Promise<LinkCardProps> => {
  const result: LinkCardProps = {
    url,
    imgSrc: "",
    title: "",
    faviconSrc: "",
  };

  const dom = await fetch(url)
    .then((res) => res.text())
    .then((text: string) => {
      return new JSDOM(text);
    });
  const metaData = dom.window.document.getElementsByTagName("meta");

  for (const meta of metaData) {
    const propOrName =
      meta.getAttribute("property") || meta.getAttribute("name");
    const content = meta.getAttribute("content");

    if (propOrName && content) {
      if (propOrName.match("title")) {
        result.title = content;
      }
      if (propOrName.match("image") && isExpectImgSrc(content)) {
        result.imgSrc = joinPathRoot(content, url);
      }
      if (propOrName.match("description")) {
        result.description = content;
      }
    }
  }

  const linkData = dom.window.document.getElementsByTagName("link");
  for (const link of linkData) {
    const rel = link.getAttribute("rel");
    const content = link.getAttribute("href");

    if (rel && content) {
      if (rel.match("icon")) {
        result.faviconSrc = joinPathRoot(content, url);
      }
    }
  }

  if (!result.imgSrc) {
    result.imgSrc = result.faviconSrc;
  }

  return result;
};

/**
 * 外部リンクのカードを OGP を取得し LinkCard に変換するプラグイン
 */
export const markupLinkCardPlugin: MDXCustomTextPlugin = async (mdText) => {
  const splittedMdTexts = mdText.split("\n");

  const resultSplittedTexts = await Promise.all(
    splittedMdTexts.map(async (text) => {
      const regex = new RegExp("^https?://[\\w/:%#\\$&\\?\\(\\)~\\.=\\+\\-]+");

      if (regex.test(text.trim())) {
        const linkCardProps = await getLinkCardProps(text.trim());

        return `<LinkCard {...${JSON.stringify(linkCardProps)}} />`;
      }

      return text;
    }),
  );

  return resultSplittedTexts.join("\n");
};
