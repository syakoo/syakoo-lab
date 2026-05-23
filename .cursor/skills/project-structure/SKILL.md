---
name: project-structure
description: >-
  FSD ベースのプロジェクト構造定義。レイヤー依存・スライス構造・命名規約を規定する。
  Use when creating new directories, moving files between layers, or deciding
  where to place new modules (e.g. "このコンポーネントはどこに置く？",
  "ディレクトリ構造を教えて").
---

# プロジェクト構造

Feature-Sliced Design（FSD）をベースにした構造。
公式: https://feature-sliced.design/

公式 FSD を土台にしつつ、一部独自の判断を加えている。該当箇所には注釈あり。

## レイヤー

上から下へのみ依存できる（逆は禁止）。

```mermaid
graph TD
  app --> widgets & features & entities & shared & contents
  widgets --> features & entities & shared & contents
  features --> entities & shared & contents
  entities --> shared & contents
```

| レイヤー | 役割 |
|----------|------|
| `app/` | エントリポイント（Next.js App Router）、グローバル設定、プロバイダー |
| `widgets/` | まとまりのある UI ブロック（記事一覧、詳細画面、ヘッダーなど） |
| `features/` | 複数の widgets で横断的に再利用される小さな機能パーツ（共通ボタン、共有フォームなど） |
| `entities/` | ビジネスエンティティ、複数機能で共有する型・ルール |
| `shared/` | ドメインに依存しないユーティリティ、UI キット |
| `contents/` | 外部データとの吸収層、DTO、変換（※ 公式 FSD の `shared/api` に相当するが独立レイヤーとして分離） |

### widgets と features の違い

- `widgets` — まとまりのある UI ブロック。ページの一区画を構成する単位（記事一覧、詳細画面、ヘッダー、サイドバーなど）
- `features` — 横断的に再利用される小さな機能パーツ。複数の widgets から共通で使われるもの（共通ボタン、共有フォームなど）

例: 記事一覧（widget）や詳細画面（widget）の中で、共通の「いいねボタン」（feature）を使う。

## スライス内の構造

各スライス（例: `features/login/`）は以下のセグメントを持てる。

| セグメント | 内容 |
|-----------|------|
| `ui/` | コンポーネントと関連フックを機能単位でパッケージング |
| `models/` | 共通の型定義、ヘルパー |
| `helpers/` | その他共通のユーティリティ |

`ui/` 内は機能単位でディレクトリを切り、関連するコンポーネントとフックを一緒に置く（コロケーション）。

```
features/login/
  ui/
    login-button/
      login-button.tsx
      use-login.ts
    confirm-dialog/
      confirm-dialog.tsx
      use-confirm-dialog.ts
  models/
  helpers/
  index.ts          ← Public API
```

## ルール

### [Must] 上位レイヤーは下位にのみ依存

依存の方向を統一し、変更の影響範囲を予測しやすくする。

### [Must] 各スライスは Public API を通じて公開

スライスの外部からは Public API 経由でのみアクセスする。内部のファイル構造を直接参照しない。
Public API を維持すれば内部リファクタリングが呼び出し側に影響しない。

基本は `index.ts` 1 本。Next.js App Router（RSC）で **Server 専用** と **Client 専用** の export が混在するとビルドエラーになるため、必要なスライスだけエントリを分ける。

| ファイル | 用途 | 先頭ディレクティブ |
|----------|------|-------------------|
| `index.ts` | Client / Server 両方から import できるもの（型、両環境で動く関数） | なし |
| `index.server.ts` | Server Component・`models` の reader など Server 専用 | なし |
| `index.client.ts` | Client Component 専用の hook など | `"use client"` 必須 |

**import の使い分け（呼び出し側）**

- Server から Server 専用 API → `from ".../slice/index.server"`
- Client から Client 専用 API → `from ".../slice/index.client"`
- どちらからも使う API → `from ".../slice"`（`index.ts`）

**分け方の目安**

- `useEffect` / ブラウザ API / React hook を export する → `index.client.ts`
- ビルド時・リクエスト時にだけ動く serializer など → `index.server.ts`
- 上記を `index.ts` にまとめると、Server 側の `import` だけで Client 境界が伝播しうるので分離する

**例（`widgets/mdx/`）**

```
widgets/mdx/
  index.ts           # resolveMDXContent, 型
  index.server.ts    # serializeMDXContent, markupMermaid
  index.client.ts    # useMermaid, useTwitter
  models/
  helpers/
```

```ts
// Server（reader）
import { serializeMDXContent } from "../../../mdx/index.server";

// Client（UI）
import { useMermaid } from "../../../mdx/index.client";
import { resolveMDXContent } from "../../../mdx";
```

`index.client.ts` / `index.server.ts` は **必要なスライスにだけ** 追加する。全スライスに必須ではない。

### [Must] ディレクトリ名・ファイル名は kebab-case

### [Should] `index.ts` にコンポーネント本体を書かない

`index.ts` は re-export 専用。コンポーネント本体は別ファイルに書く。
エディタのタブや検索結果で `index.ts` だらけになるのを防ぐ。

### [Must] `shared` にビジネスロジックを入れない

- `shared/` — ドメインに依存しないユーティリティのみ（日付操作、汎用 HTTP クライアントなど）
- `contents/` — 外部との吸収層、DTO、変換（ビジネス知識を含む）

### [Should] `entities` は最初から分けすぎない

- 最初は widgets にまとめる
- 複数の widgets で横断して使うパーツが出てきたら entities に切り出す

entities に置くのは、複数箇所から参照される型・ルール・シンプルな表示コンポーネントに留める。
