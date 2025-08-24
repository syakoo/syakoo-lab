import type { Meta, StoryObj } from "@storybook/nextjs";

import { Header } from ".";

const meta = {
  component: Header,
  parameters: {
    layout: "fullscreen",
    testLevel: "snapshot",
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {};
