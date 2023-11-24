import type { Meta, StoryObj } from "@storybook/react";

import { WritingTypeDescription } from ".";

const meta = {
  component: WritingTypeDescription,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof WritingTypeDescription>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {
  args: {
    type: "article",
  },
};
