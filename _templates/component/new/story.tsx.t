---
to: src/<%= path %>/<%= name %>/<%= name %>.stories.tsx
---
import type { Meta, StoryObj } from "@storybook/react";
import { <%= name %> } from ".";

const meta = {
  component: <%= name %>,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof <%= name %>>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {
  args: {
    children: <div>children</div>,
  },
};
