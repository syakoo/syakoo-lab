# デザインシステムのコーディングルール

## 共通モジュールの活用 [SHOULD]

共通モジュールは十分に把握し、使用が可能であれば積極的に利用する。これにより、以下のメリットが得られる：

- コードの重複を防ぐ
- 一貫性のある実装を維持する
- メンテナンス性の向上
- バグ修正の影響範囲を最小限に抑える

### 具体例

```tsx
// 良い例：共通のデザインシステムコンポーネントを使用
import { Text, Row } from "@/shared/design-system/ui";

const Component = () => (
  <Row gap="100">
    <Text size="200">タイトル</Text>
  </Row>
);

// 悪い例：独自のスタイリング
const Component = () => (
  <div style={{ display: "flex", gap: "1rem" }}>
    <span style={{ fontSize: "1.2rem" }}>タイトル</span>
  </div>
);
```

## デザイントークンの使用 [MUST]

色や幅などのデザイントークンは、必ずデザインシステムから参照する。これにより、以下のメリットが得られる：

- デザインの一貫性を保つ
- ダークモードなどのテーマ対応を容易にする
- デザイン変更時の修正範囲を最小限に抑える

### 具体例

```tsx
// 良い例：デザイントークンを使用
import { theme } from "@/shared/design-system/theme.css";

const styles = {
  container: style({
    backgroundColor: theme.color.background.primary,
    padding: theme.space[100],
    borderRadius: theme.radius[200],
  }),
};

// 悪い例：ハードコードされた値
const styles = {
  container: style({
    backgroundColor: "#ffffff",
    padding: "16px",
    borderRadius: "8px",
  }),
};
```

## アイコンの使用 [MUST]

アイコンは icons で定義して、それを使用する

```tsx
// 良い例：アイコンを使用
import { Icon } from "@/shared/design-system/icons";

const Component = () => (
  <Icon name="warn" />;
)

// 悪い例:直接使用する
const Component = () => (
  <svg>
    <path />
  </svg>
)
```
