import type { Meta, StoryObj } from "@storybook/react";

import { tokens } from "@/design-system/tokens";

import { Scrap } from ".";

const meta = {
  component: Scrap,
  tags: ["autodocs"],
} satisfies Meta<typeof Scrap>;

export default meta;

type Story = StoryObj<typeof Scrap>;

export const Sample: Story = {
  args: {
    children: (
      <div
        style={{
          border: `1px solid ${tokens.colors.brand.primary}`,
          borderRadius: tokens.radii[100],
          padding: tokens.spaces[300],
        }}
      >
        Children
      </div>
    ),
    createdAt: "2020-10-23",
  },
};
