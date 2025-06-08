# コンポーネントのコーディング規則

コンポーネントは特に指定がない限り React Function Component を指す

## ファイル構造

コンポーネントのディレクトリ構造は、基本的に以下とする。(例として、コンポーネント名を `post-list` とする)

```
post-list/
├── index.ts                # [MUST] コンポーネントのエクスポート
├── post-list.tsx           # [MUST] コンポーネント実装本体
├── post-list.css.ts        # [IF NEED] スタイル実装
├── post-list.test.tsx      # [MUST] テスト
└── post-list.stories.tsx   # [MUST] ストーリー
```

- [MUST] ディレクトリ名およびファイル名は kebab-case とする
- [MUST] index.ts をコンポーネントのエクスポートファイルとし、それ以上の実装を index.ts にはしない
- [MUST] テストはスナップショットテストを特に理由がない限りは導入する
- [MUST] story の parameters.docs.description.component に Figma リンクがある場合、リンク先のデータをマスターデータとして同期を行う
- [MUST] アイコンを利用する際には design-system/icons に定義してそれを用いる
- [SHOULD] アイコンやレイアウト、テキストやリンクなどの一般的な UI は design-system を利用する
- [SHOULD] ストーリーは存在するパターンを網羅する

## テストについて

- [MUST] テストファイルは testStories を使用する

```tsx
import { testStories } from "@/shared/test-utils/test-stories";
import * as stories from "./component-name.stories";

describe("ComponentName", () => {
  testStories(stories);
});
```

- [MUST] Story の parameters に testLevel: "snapshot" を指定する

```tsx
const meta = {
  component: ComponentName,
  parameters: {
    layout: "fullscreen",
    testLevel: "snapshot",
  },
} satisfies Meta<typeof ComponentName>;
```

- [MUST NOT] Story を参照せずに独自のテストを記述しない
- [MUST NOT] testLevel プロパティを変更・削除しない

## scaffold について

- [MUST] 以下のコマンドを用いてコンポーネントの雛形を作成する

```bash
# 例: src/shared/design-system/ui に button コンポーネントを作成
pnpm run generate component --output src/shared/design-system/ui --answer "name:button"
```
