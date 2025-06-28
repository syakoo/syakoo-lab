# Gemini 用ルール

## このプロジェクトにおける開発の進め方

### 全般的な注意

- 調査と実装を必ず把握して作業を行い、指示内容以上の作業は行わない。
- 必ず最初に `/docs` ディレクトリを参照し、質問との関連性を検討する。
- 関連する `docs` の内容を引用しながら返答する。

### Figma を用いた UI の実装

Figma を用いてコンポーネントの実装を追加・更新する際は、以下の手順で行う。

#### 1. 実装コンポーネントの確認

指定された Figma の UI に対応する実装コンポーネントが既に存在するか確認する。
以下の対応表を参考に、適切なディレクトリを探すこと。

| Figma ページ      | 実装ディレクトリ                  |
| :---------------- | :-------------------------------- |
| Pages             | `src/app`                         |
| Features          | `src/features`                    |
| Entities          | `src/entities`                    |
| Utility Component | `src/shared/design-system/ui`     |
| Design System     | `src/shared/design-system/tokens` |

存在しない場合は、`.scaffdog/component.md` のテンプレートを参考に新しいコンポーネントを作成する。

#### 2. Figma の忠実な再現

Figma のデザインを忠実に再現して UI を実装する。`docs/coding-rules/design-system.md` の規則にも従うこと。
