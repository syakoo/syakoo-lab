import type { Meta, StoryObj } from "@storybook/react";
import { WritingListPage } from ".";

const meta = {
  component: WritingListPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof WritingListPage>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {
  args: {
    children: <div>children</div>,
  },
};
