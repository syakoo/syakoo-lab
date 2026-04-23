import type { Meta, StoryObj } from "@storybook/nextjs";

import { BadgeLink } from "./badge-link";

const meta = {
  component: BadgeLink,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BadgeLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    href: "https://syakoo-lab.com",
    color: "rgb(48, 99, 212)",
    children: "Syakoo Lab",
  },
};
