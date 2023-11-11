import type { Meta, StoryObj } from "@storybook/react";

import { Home } from ".";

const meta = {
  component: Home,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Home>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {};
