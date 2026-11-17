import {
  createHeadingAnchorResolver,
  createMarkdownCodeFenceTracker,
  parseMarkdownHeadingLine,
} from "../../helpers/mdx-plugins/heading-anchor-resolver";
import type { WritingTocItem } from "../writing";

export const resolveWritingToc = async (
  markdownText: string,
): Promise<WritingTocItem[]> => {
  const headingAnchorResolver = createHeadingAnchorResolver();
  const codeFenceTracker = createMarkdownCodeFenceTracker();
  const lines = markdownText.split("\n");
  const items: WritingTocItem[] = [];

  for (const line of lines) {
    if (codeFenceTracker.shouldSkipLine(line)) {
      continue;
    }

    const parsedHeading = parseMarkdownHeadingLine(line);
    if (!parsedHeading) {
      continue;
    }

    const { id, label } = headingAnchorResolver.resolveHeadingAnchor(
      parsedHeading.headingContent,
    );
    if (parsedHeading.depth === 2) {
      items.push({
        id,
        label,
        depth: 2,
      });
    }
  }

  return items;
};
