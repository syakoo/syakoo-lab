import type { Meta, StoryObj } from "@storybook/react";

import { BadgeLink } from ".";

const meta = {
  component: BadgeLink,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "https://www.figma.com/design/KM3QHHUgriWxt0RJ1MT5SB/syakoo-lab?node-id=543-1302&t=kVsF3rxs1WNK1866-4",
      },
    },
    testLevel: "snapshot",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BadgeLink>;

export default meta;

type Story = StoryObj<typeof meta>;

const getDummyImage = () => "https://picsum.photos/24/24";

export const Sample: Story = {
  args: {
    href: "https://example.com",
    imageUrl: getDummyImage(),
    children: "Example Link",
  },
};
