export type ParsedMarkdownHeadingLine = {
  depth: 2 | 3;
  headingContent: string;
};

const markdownCodeFenceRegex = /^(```|~~~)/;

export const parseMarkdownHeadingLine = (
  line: string,
): ParsedMarkdownHeadingLine | null => {
  const trimmedLine = line.trim();
  const h3Match = trimmedLine.match(/^###\s+(.*)$/);
  if (h3Match) {
    return {
      depth: 3,
      headingContent: h3Match[1],
    };
  }

  const h2Match = trimmedLine.match(/^##\s+(.*)$/);
  if (h2Match) {
    return {
      depth: 2,
      headingContent: h2Match[1],
    };
  }

  return null;
};

export const createMarkdownCodeFenceTracker = () => {
  let inCodeFence = false;

  return {
    shouldSkipLine: (line: string) => {
      if (markdownCodeFenceRegex.test(line.trim())) {
        inCodeFence = !inCodeFence;
        return true;
      }

      return inCodeFence;
    },
  };
};

const resolveHeadingTextContent = (content: string): string => {
  return content
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/<\/?[^>]+>/g, "")
    .replace(/[*_~]/g, "")
    .replace(/\\([\\`*_{[\]()#+\-.!>])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
};

const createHeadingId = (idBase: string, count: number): string => {
  return [idBase, count].filter(Boolean).join("-");
};

export const createHeadingAnchorResolver = () => {
  const counter = {
    data: {} as Record<string, number>,
    count: function (key: string) {
      if (key in this.data) {
        this.data[key] += 1;
      } else {
        this.data[key] = 0;
      }

      return this.data[key];
    },
  };

  return {
    resolveHeadingAnchor: (headingContent: string) => {
      const normalizedLabel = resolveHeadingTextContent(headingContent);
      const label = normalizedLabel || headingContent.trim();
      const idBase = normalizedLabel.replaceAll(" ", "") || "section";
      const count = counter.count(idBase);

      return {
        id: createHeadingId(idBase, count),
        label,
      };
    },
  };
};
