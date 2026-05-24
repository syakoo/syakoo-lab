import type { Meta, StoryObj } from "@storybook/nextjs";

import { CodeSandbox } from "./code-sandbox";

const meta = {
  component: CodeSandbox,
  tags: ["test:skip"],
} satisfies Meta<typeof CodeSandbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    src: "https://codesandbox.io/embed/fade-inout-sample-with-visibility-zd015",
    title: "Sample",
  },
};
