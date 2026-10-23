import type { Meta, StoryObj } from "@storybook/react-vite";

import { SyakooLabText } from "./syakoo-lab-text";

const meta = {
  component: SyakooLabText,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof SyakooLabText>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {};
