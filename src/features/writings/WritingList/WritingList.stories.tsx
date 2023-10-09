import type { Meta, StoryObj } from "@storybook/react";
import { WritingList } from ".";

const meta = {
  component: WritingList,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof WritingList>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {
  args: {
    type: "all",
  },
};
