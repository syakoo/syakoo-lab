import type { Meta, StoryObj } from "@storybook/react";

import { Big } from ".";

const meta = {
  component: Big,
  parameters: { testLevel: "snapshot" },
} satisfies Meta<typeof Big>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    children: "Sample",
  },
};
