export type ParsedMarkdownHeadingLine = {
  depth: 2 | 3;
  headingContent: string;
};

export const parseMarkdownHeadingLine = (
  line: string,
): ParsedMarkdownHeadingLine | null => {
  const trimmedLine = line.trim();
  const h3Regex = /^### .*/;
  if (h3Regex.test(trimmedLine)) {
    return {
      depth: 3,
      headingContent: line.replace("###", ""),
    };
  }

  const h2Regex = /^## .*/;
  if (h2Regex.test(trimmedLine)) {
    return {
      depth: 2,
      headingContent: line.replace("##", ""),
    };
  }

  return null;
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

const createHeadingId = (textContent: string, count: number): string => {
  return [textContent.replaceAll(" ", ""), count].filter(Boolean).join("-");
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
    resolveHeadingAnchor: async (headingContent: string) => {
      const label = resolveHeadingTextContent(headingContent);
      const count = counter.count(label);

      return {
        id: createHeadingId(label, count),
        label,
      };
    },
  };
};
