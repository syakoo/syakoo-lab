import { describe, expect, test } from "vitest";

import { resolveWritingToc } from "./toc-resolver";

describe("resolveWritingToc", () => {
  test("h2/h3 を解析し、h2 のみ TOC に含める", async () => {
    const markdown = `
# Title
## 導入
本文
### 導入の補足
## まとめ
`;

    const toc = await resolveWritingToc(markdown);

    expect(toc).toEqual([
      {
        id: "導入",
        label: "導入",
        depth: 2,
      },
      {
        id: "まとめ",
        label: "まとめ",
        depth: 2,
      },
    ]);
  });

  test("同名見出しが重複しても id が衝突しない", async () => {
    const markdown = `
## 同じ見出し
### 同じ見出し
## 同じ見出し
`;

    const toc = await resolveWritingToc(markdown);

    expect(toc).toEqual([
      {
        id: "同じ見出し",
        label: "同じ見出し",
        depth: 2,
      },
      {
        id: "同じ見出し-2",
        label: "同じ見出し",
        depth: 2,
      },
    ]);
  });
});
