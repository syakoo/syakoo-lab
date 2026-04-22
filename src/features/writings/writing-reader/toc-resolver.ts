import type { WritingTocItem } from "../../../entities/writing/models/writing";
import {
  createHeadingAnchorResolver,
  parseMarkdownHeadingLine,
} from "../writing-detail/mdx/section-title/heading-anchor-resolver";

export const resolveWritingToc = async (
  markdownText: string,
): Promise<WritingTocItem[]> => {
  const headingAnchorResolver = createHeadingAnchorResolver();
  const lines = markdownText.split("\n");
  const items: WritingTocItem[] = [];

  for (const line of lines) {
    const parsedHeading = parseMarkdownHeadingLine(line);
    if (!parsedHeading) {
      continue;
    }

    const { id, label } = await headingAnchorResolver.resolveHeadingAnchor(
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
