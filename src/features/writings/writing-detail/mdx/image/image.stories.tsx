import type { Meta, StoryObj } from "@storybook/nextjs";

import { Image } from ".";

const meta = {
  component: Image,
  parameters: {},
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
