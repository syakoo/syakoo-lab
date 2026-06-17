import type { MDXCustomTextPlugin } from "../../../../entities/mdx-content";
import {
  createHeadingAnchorResolver,
  createMarkdownCodeFenceTracker,
  parseMarkdownHeadingLine,
} from "./heading-anchor-resolver";

/**
 * 見出し2, 3 (`## xxx`, `### xxx`) を Section, SubSection に変換するプラグイン
 */
export const markupSectionTitlePlugin: MDXCustomTextPlugin = async (mdText) => {
  const splittedMdTexts = mdText.split("\n");
  const headingAnchorResolver = createHeadingAnchorResolver();
  const markdownCodeFenceTracker = createMarkdownCodeFenceTracker();

  const resultSplittedTexts = splittedMdTexts.map((text) => {
    if (markdownCodeFenceTracker.shouldSkipLine(text)) {
      return text;
    }

    const parsedHeading = parseMarkdownHeadingLine(text);
    if (parsedHeading) {
      const { id } = headingAnchorResolver.resolveHeadingAnchor(
        parsedHeading.headingContent,
      );

      if (parsedHeading.depth === 3) {
        return `<SubSectionTitle id="${id}">${parsedHeading.headingContent}</SubSectionTitle>`;
      }
      if (parsedHeading.depth === 2) {
        return `<SectionTitle id="${id}">${parsedHeading.headingContent}</SectionTitle>`;
      }
    }
    return text;
  });

  return resultSplittedTexts.join("\n");
};
