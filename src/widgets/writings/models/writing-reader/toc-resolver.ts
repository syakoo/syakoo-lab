import type { WritingTocItem } from "../../../entities";
import {
  createHeadingAnchorResolver,
  createMarkdownCodeFenceTracker,
  parseMarkdownHeadingLine,
} from "../../ui/writing-detail/mdx/section-title/heading-anchor-resolver";

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
