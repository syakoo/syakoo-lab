import type { Meta, StoryObj } from "@storybook/nextjs";

import { Footer } from "./footer";

const meta = {
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {};
