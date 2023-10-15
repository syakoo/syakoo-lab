import { JSDOM } from "jsdom";

export type LinkCardProps = {
  imgSrc: string;
  title: string;
  url: string;
  description?: string;
  faviconSrc: string;
};

function joinPathRoot(path: string, url: string) {
  if (path.match("https://")) {
    return path;
  }

  const base = url.split("/").slice(0, 3).join("/");
  return `${base}/${path}`;
}

function isExpectImgSrc(content: string): boolean {
  return content.startsWith("http") || content.startsWith("/");
}

async function getLinkCardProps(url: string): Promise<LinkCardProps> {
  const result: LinkCardProps = {
    url,
    imgSrc: "",
    title: "",
    faviconSrc: "",
  };

  const dom = await fetch(url)
    .then((res) => res.text())
    .then((text) => {
      return new JSDOM(text);
    });
  const metaData = dom.window.document.getElementsByTagName("meta");

  for (let i = 0; i < metaData.length; i += 1) {
    const meta = metaData[i];
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
  for (let i = 0; i < linkData.length; i += 1) {
    const link = linkData[i];
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
}

/**
 * 外部リンクのカードを OGP を取得しコンポーネントの引数に渡すプラグイン
 *
 * NOTE: このプラグインを使用する場合は、 {@link LinkCardProps} を props として持つ `LinkCard` コンポーネントを定義する必要がある
 */
export async function markupLinkCard(mdText: string): Promise<string> {
  const splittedMdTexts = mdText.split("\n");

  const resultSplittedTexts = await Promise.all(
    splittedMdTexts.map(async (text) => {
      const regex = new RegExp("^https?://[\\w/:%#\\$&\\?\\(\\)~\\.=\\+\\-]+");

      if (regex.test(text.trim())) {
        const linkCardProps = await getLinkCardProps(text.trim());

        // NOTE: コンポーネント名もここで決定している
        return `<LinkCard {...${JSON.stringify(linkCardProps)}} />`;
      }

      return text;
    }),
  );

  return resultSplittedTexts.join("\n");
}
