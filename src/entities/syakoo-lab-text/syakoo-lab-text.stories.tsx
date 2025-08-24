import type { Meta, StoryObj } from "@storybook/nextjs";

import { SyakooLabText } from ".";

const meta = {
  component: SyakooLabText,
  parameters: {
    layout: "centered",
    testLevel: "snapshot",
  },
} satisfies Meta<typeof SyakooLabText>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {};
