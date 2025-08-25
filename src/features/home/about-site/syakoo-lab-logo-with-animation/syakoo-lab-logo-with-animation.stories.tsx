import type { Meta, StoryObj } from "@storybook/nextjs";

import { SyakooLabLogoWithAnimation } from ".";

const meta = {
  component: SyakooLabLogoWithAnimation,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof SyakooLabLogoWithAnimation>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {};
