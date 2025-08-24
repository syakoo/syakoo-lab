import type { Meta, StoryObj } from "@storybook/nextjs";

import { Footer } from ".";

const meta = {
  component: Footer,
  parameters: {
    layout: "fullscreen",
    testLevel: "snapshot",
  },
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {};
