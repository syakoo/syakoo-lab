import type { Meta, StoryObj } from "@storybook/nextjs";

import { PageNotFound } from ".";

const meta = {
  component: PageNotFound,
  parameters: {
    layout: "fullscreen",
    testLevel: "snapshot",
  },
} satisfies Meta<typeof PageNotFound>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {
  args: {
    children: <div>children</div>,
  },
};
