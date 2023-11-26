import sharp from "sharp";

import type { MDXCustomTextPlugin } from "@/features/mdx/types";

// replace の async 版
const asyncReplace = async (
  originalText: string,
  pattern: RegExp,
  replacer: (match: RegExpMatchArray) => Promise<string>,
) => {
  const matchedTexts = [...originalText.matchAll(pattern)];
  if (!matchedTexts) return originalText;

  const replacePatterns = await Promise.all(
    matchedTexts.map(async (match) => {
      match;
      const result = await replacer(match);
      return [match[0], result] as [string, string];
    }),
  );

  const replacedText = replacePatterns.reduce((prev, replacePattern) => {
    return prev.replace(replacePattern[0], replacePattern[1]);
  }, originalText);

  return replacedText;
};

export const imagePlugin: MDXCustomTextPlugin = async (mdxText) => {
  const pattern = /<Image([\s\S]*?)\/>/g;

  return await asyncReplace(mdxText, pattern, async ([match, attributes]) => {
    const srcMatch = attributes.match(/src={?["'](.*?)["']/);
    // NOTE: src がマッチしない或いはこのサイトのものではない場合はそのまま返却する
    if (!srcMatch || !srcMatch[1].startsWith("/")) {
      return match;
    }
    const imageUrl = `${process.cwd()}/public${srcMatch[1]}`;
    const { width, height } = await sharp(imageUrl).metadata();

    return `<Image${attributes}\n width={${width}} height={${height}} \n/>`;
  });
};
