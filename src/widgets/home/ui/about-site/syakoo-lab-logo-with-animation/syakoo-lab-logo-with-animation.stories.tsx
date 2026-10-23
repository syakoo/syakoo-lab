import type { Meta, StoryObj } from "@storybook/react-vite";

import { SyakooLabLogoWithAnimation } from "./syakoo-lab-logo-with-animation";

const meta = {
  component: SyakooLabLogoWithAnimation,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof SyakooLabLogoWithAnimation>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {};
