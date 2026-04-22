import { JSDOM } from "jsdom";
import React from "react";

import { resolveMDXContent } from "../../../../mdx/resolver";
import { serializeMDXContent } from "../../../../mdx/serializer";

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

const resolveHeadingTextContent = async (content: string): Promise<string> => {
  const { renderToString } = await import("react-dom/server");
  const serializedMDX = await serializeMDXContent(content);
  const MDXComponent = resolveMDXContent(serializedMDX).data;
  const jsdom = new JSDOM(renderToString(React.createElement(MDXComponent)));
  const { textContent } = jsdom.window.document.body;

  return textContent ?? "";
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
      const label = await resolveHeadingTextContent(headingContent);
      const count = counter.count(label);

      return {
        id: createHeadingId(label, count),
        label,
      };
    },
  };
};
