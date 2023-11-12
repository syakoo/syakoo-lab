import type { Meta, StoryObj } from "@storybook/react";

import { Image } from ".";

const meta = {
  component: Image,
} satisfies Meta<typeof Image>;

export default meta;

type Story = StoryObj<typeof Image>;

export const Sample: Story = {
  args: {
    caption: "Sample Caption",
    src: "https://placehold.jp/3063D4/ffffff/400x300.png",
    width: 400,
    height: 300,
  },
};
