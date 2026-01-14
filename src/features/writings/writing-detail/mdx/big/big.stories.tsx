import type { Meta, StoryObj } from "@storybook/nextjs";

import { Big } from "./big";

const meta = {
  component: Big,
  parameters: {},
} satisfies Meta<typeof Big>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    children: "Sample",
  },
};
