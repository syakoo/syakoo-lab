import type { Meta, StoryObj } from "@storybook/react";

import { SyakooLabLogoWithAnimation } from ".";

const meta = {
  component: SyakooLabLogoWithAnimation,
  parameters: {
    layout: "centered",
    testLevel: "snapshot",
  },
} satisfies Meta<typeof SyakooLabLogoWithAnimation>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {};
