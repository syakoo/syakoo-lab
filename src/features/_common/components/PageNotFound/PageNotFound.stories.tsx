import type { Meta, StoryObj } from "@storybook/react";

import { PageNotFound } from ".";

const meta = {
  component: PageNotFound,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof PageNotFound>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {
  args: {
    children: <div>children</div>,
  },
};
