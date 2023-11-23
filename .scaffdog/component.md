---
name: "component"
root: "."
output: "./src/**/*"
ignore: []
questions:
  name: "コンポーネント名を入力してください"
---

# `{{ inputs.name | pascal }}/index.ts`

```typescript
export { {{ inputs.name | pascal }} } from "./{{ inputs.name | pascal }}";
```

# `{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.tsx`

```tsx
type {{ inputs.name | pascal }}Props = {
  children: React.ReactNode;
};

export const {{ inputs.name | pascal }}: React.FC<{{ inputs.name | pascal }}Props> = ({ children }) => {
  return <div>{children}</div>;
};

```

# `{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.css.ts`

```typescript

```

# `{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.stories.tsx`

```tsx
import type { Meta, StoryObj } from "@storybook/react";

import { {{ inputs.name | pascal }} } from ".";

const meta = {
  component: {{ inputs.name | pascal }},
  parameters: {
    layout: "fullscreen",
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

# `{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.test.tsx`

```tsx
import { composeStories } from "@storybook/react";
import { act, render } from "@testing-library/react";

import * as stories from "./{{ inputs.name | pascal }}.stories";

const { ...otherStories } = composeStories(stories);

describe("{{ inputs.name | pascal }}", () => {
  const testCases = Object.values(otherStories).map(
    (Story) => [Story.storyName, Story] as const,
  );
  test.each(testCases)("renders %s", async (_, Story) => {
    const tree = render(<Story />);
    await act(async () => {
      if (Story.play) {
        await Story.play({ canvasElement: tree.container });
      }
    });

    expect(tree.baseElement).toMatchSnapshot();
  });
});
```
