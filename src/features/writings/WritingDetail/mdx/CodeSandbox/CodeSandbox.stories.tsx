import type { Meta, StoryObj } from "@storybook/react";

import { CodeSandbox } from ".";

const meta = {
  component: CodeSandbox,
  parameters: { testLevel: "snapshot" },
} satisfies Meta<typeof CodeSandbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    src: "https://codesandbox.io/embed/fade-inout-sample-with-visibility-zd015",
    title: "Sample",
  },
};
