import type { Meta, StoryObj } from "@storybook/nextjs";

import { Header } from "./header";

const meta = {
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {};
