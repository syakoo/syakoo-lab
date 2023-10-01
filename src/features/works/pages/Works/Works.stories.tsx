import type { Meta, StoryObj } from "@storybook/react";
import { Works } from ".";

const meta = {
  component: Works,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Works>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {};
