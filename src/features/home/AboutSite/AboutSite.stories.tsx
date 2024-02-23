import type { Meta, StoryObj } from "@storybook/react";

import { AboutSite } from ".";

const meta = {
  component: AboutSite,
  parameters: { testLevel: "snapshot", layout: "fullscreen" },
} satisfies Meta<typeof AboutSite>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {};
