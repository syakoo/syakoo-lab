import { JSDOM } from "jsdom";
import React from "react";

import { resolveMDXContent } from "@/features/mdx/resolver";
import { serializeMDXContent } from "@/features/mdx/serializer";
import type { MDXCustomTextPlugin } from "@/features/mdx/types";

/**
 * 見出し2, 3 (`## xxx`, `### xxx`) を Section, SubSection に変換するプラグイン
 */
export const markupSectionTitlePlugin: MDXCustomTextPlugin = async (mdText) => {
  const { renderToString } = await import("react-dom/server");
  const splittedMdTexts = mdText.split("\n");

  // カウントの仕組み
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

  const resultSplittedTexts = await Promise.all(
    splittedMdTexts.map(async (text) => {
      /**
       * 描画しテキスト部分を取得する関数
       */
      const getInnerTextContent = async (content: string) => {
        // HACK: 見出しが無限に続くことはないため循環が続くことはない
        // NOTE: 見出しにオプションは使用しなくていいだろうと判断
        const serializedMDX = await serializeMDXContent(content);
        const MDXComponent = resolveMDXContent(serializedMDX).data;

        // JSDOM へ描画し、評価後の内部のテキストだけを取得する
        const jsdom = new JSDOM(
          // NOTE: 見出しに使う見込みがないため、現状は内部で用いる components の提供はしていない
          renderToString(React.createElement(MDXComponent)),
        );
        const { textContent } = jsdom.window.document.body;

        return textContent ?? "";
      };

      const h3Regex = /^### .*/;
      if (h3Regex.test(text.trim())) {
        const headingContent = text.replace("###", "");
        const textContent = await getInnerTextContent(headingContent);
        const count = counter.count(textContent);
        // NOTE: 空白は削除
        const id = [textContent.replaceAll(" ", ""), count]
          .filter(Boolean)
          .join("-");

        return `<SubSectionTitle id="${id}">${headingContent}</SubSectionTitle>`;
      }

      const h2Regex = /^## .*/;
      if (h2Regex.test(text.trim())) {
        const headingContent = text.replace("##", "");
        const textContent = await getInnerTextContent(headingContent);
        const count = counter.count(textContent);
        // NOTE: 空白は削除
        const id = [textContent.replaceAll(" ", ""), count]
          .filter(Boolean)
          .join("-");

        return `<SectionTitle id="${id}">${headingContent}</SectionTitle>`;
      }

      return text;
    }),
  );

  return resultSplittedTexts.join("\n");
};
