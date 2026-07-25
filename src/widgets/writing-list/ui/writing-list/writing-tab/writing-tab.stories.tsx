import type { Meta, StoryObj } from "@storybook/nextjs";

import { WritingTab } from "./writing-tab";

const meta = {
  component: WritingTab,
  parameters: {},
  tags: ["vrt"],
} satisfies Meta<typeof WritingTab>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {
  args: {
    selectedType: "all",
  },
};
