---
name: coding-guide
description: >-
  プロジェクトのコーディング規約とアーキテクチャ制約をまとめたガイド。
  Use when implementing, creating, or modifying components and modules
  (e.g. "コンポーネントを作って", "この機能を実装して").
---

# コーディングガイド

## ディレクトリ構造・依存関係

`project-structure` スキルに従う。

## コンポーネント規則

### ファイル構造

```
post-list/
├── post-list.tsx           # コンポーネント実装本体
├── post-list.css.ts        # スタイル実装（必要な場合）
└── post-list.stories.tsx   # ストーリー
```

- ディレクトリ名・ファイル名は **kebab-case**
- スライスの外部からは **`index.ts`（Public API）経由** でのみアクセスする
- `index.ts` には re-export のみ書き、コンポーネント本体は置かない
- ストーリーは存在するパターンを網羅する

### デザインシステムの活用

- アイコンは `design-system/icons` に定義してそれを使う
- レイアウト・テキスト・リンクなどの汎用 UI は `design-system` を利用する
- 色・幅などの値は **Tailwind のデザイントークン**（`globals.css` の `@theme` で定義）を使い、ハードコードしない

```tsx
// Good
<div className="bg-background-primary text-text-primary" />

// Bad
<div className="bg-[#15212c] text-[#babec3ee]" />
```
