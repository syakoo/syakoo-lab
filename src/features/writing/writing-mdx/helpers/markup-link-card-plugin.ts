import { JSDOM } from "jsdom";

import type { MDXCustomTextPlugin } from "../../../../entities/mdx-content";

type LinkCardProps = {
  title: string;
  url: string;
  description?: string;
};

const FETCH_TIMEOUT_MS = 8_000;

const TITLE_META_KEYS = ["og:title", "twitter:title", "title"] as const;

const DESCRIPTION_META_KEYS = [
  "og:description",
  "twitter:description",
  "description",
] as const;

const getDomain = (url: string): string => {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
};

const fallbackLinkCardProps = (url: string): LinkCardProps => ({
  url,
  title: getDomain(url),
});

const getMetaContent = (
  document: Document,
  keys: readonly string[],
): string | undefined => {
  for (const key of keys) {
    for (const meta of document.getElementsByTagName("meta")) {
      const propOrName =
        meta.getAttribute("property") || meta.getAttribute("name");
      const content = meta.getAttribute("content");

      if (propOrName === key && content) {
        return content;
      }
    }
  }

  return undefined;
};

const getLinkCardProps = async (url: string): Promise<LinkCardProps> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, { signal: controller.signal });

    if (!response.ok) {
      return fallbackLinkCardProps(url);
    }

    const html = await response.text();
    const document = new JSDOM(html).window.document;
    const title = getMetaContent(document, TITLE_META_KEYS);
    const description = getMetaContent(document, DESCRIPTION_META_KEYS);

    return {
      url,
      title: title?.trim() || getDomain(url),
      ...(description?.trim() ? { description: description.trim() } : {}),
    };
  } catch {
    return fallbackLinkCardProps(url);
  } finally {
    clearTimeout(timeoutId);
  }
};

/**
 * 外部リンクのカードを OGP を取得し LinkCard に変換するプラグイン
 */
export const markupLinkCardPlugin: MDXCustomTextPlugin = async (mdText) => {
  const splittedMdTexts = mdText.split("\n");

  const resultSplittedTexts = await Promise.all(
    splittedMdTexts.map(async (text) => {
      const regex = /^https?:\/\/[\w/:%#$&?()~.=+-]+/;

      if (regex.test(text.trim())) {
        const linkCardProps = await getLinkCardProps(text.trim());

        return `<LinkCard {...${JSON.stringify(linkCardProps)}} />`;
      }

      return text;
    }),
  );

  return resultSplittedTexts.join("\n");
};
