import type { Meta, StoryObj } from "@storybook/nextjs";

import { SyakooLabText } from "./syakoo-lab-text";

const meta = {
  component: SyakooLabText,
  parameters: {
    layout: "centered",
  },
  tags: ["vrt"],
} satisfies Meta<typeof SyakooLabText>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {};
