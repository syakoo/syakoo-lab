import type { Meta, StoryObj } from "@storybook/react";

import { WorkList } from ".";

const meta = {
  component: WorkList,
  parameters: {
    layout: "fullscreen",
    testLevel: "snapshot",
  },
} satisfies Meta<typeof WorkList>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {};
