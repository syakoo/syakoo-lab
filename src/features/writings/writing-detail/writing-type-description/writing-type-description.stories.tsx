import type { Meta, StoryObj } from "@storybook/nextjs";

import { WritingTypeDescription } from ".";

const meta = {
  component: WritingTypeDescription,
  parameters: {
    layout: "fullscreen",
    testLevel: "snapshot",
  },
} satisfies Meta<typeof WritingTypeDescription>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {
  args: {
    type: "article",
  },
};
