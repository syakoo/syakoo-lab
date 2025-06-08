---
name: "component"
root: "."
output: "./src/**/*"
ignore: []
questions:
  name: "コンポーネント名を入力してください"
---

# `{{ inputs.name | kebab }}/index.ts`

```typescript
export { {{ inputs.name | pascal }} } from "./{{ inputs.name | kebab }}";
```

# `{{ inputs.name | kebab }}/{{ inputs.name | kebab }}.tsx`

```tsx
type {{ inputs.name | pascal }}Props = {
  children: React.ReactNode;
};

export const {{ inputs.name | pascal }}: React.FC<{{ inputs.name | pascal }}Props> = ({ children }) => {
  return <div>{children}</div>;
};

```

# `{{ inputs.name | kebab }}/{{ inputs.name | kebab }}.css.ts`

```typescript

```

# `{{ inputs.name | kebab }}/{{ inputs.name | kebab }}.stories.tsx`

```tsx
import type { Meta, StoryObj } from "@storybook/react";

import { {{ inputs.name | pascal }} } from ".";

const meta = {
  component: {{ inputs.name | pascal }},
  parameters: {
    layout: "fullscreen",
    testLevel: "snapshot",
  },
} satisfies Meta<typeof {{ inputs.name | pascal }}>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {
  args: {
    children: <div>children</div>,
  },
};

```

# `{{ inputs.name | kebab }}/{{ inputs.name | kebab }}.test.tsx`

```tsx
import { testStories } from "@/shared/test-utils/test-stories";

import * as stories from "./{{ inputs.name | kebab }}.stories";

describe("{{ inputs.name | pascal }}", () => {
  testStories(stories);
});
```
