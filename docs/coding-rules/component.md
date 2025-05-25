# コンポーネントのコーディング規則

コンポーネントは特に指定がない限り React Function Component を指す

## ファイル構造

コンポーネントのディレクトリ構造は、基本的に以下とする。(例として、コンポーネント名を `post-list` とする)

```
post-list/
├── index.ts                # [MUST] コンポーネントのエクスポート
├── post-list.tsx           # [MUST] コンポーネント実装本体
├── post-list.css.ts        # [WANT] スタイル実装
├── post-list.test.tsx      # [MUST] テスト
└── post-list.stories.tsx   # [MUST] ストーリー
```

- [MUST] ディレクトリ名およびファイル名は kebab-case とする
- [MUST] index.ts　をコンポーネントのエクスポートファイルとし、それ以上の実装を index.ts にはしない
- [MUST] テストはスナップショットテストを特に理由がない限りは導入する
- [SHOULD] ストーリーは存在するパターンを網羅する

## scaffold について

- [SHOULD] とくに理由がない限りは scaffold を用いてコンポーネントの雛形を作成する

```bash
pnpm run generate
```
