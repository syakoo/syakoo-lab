import type { Meta, StoryObj } from "@storybook/react";

import { AboutMe } from ".";

const meta = {
  component: AboutMe,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AboutMe>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {};
