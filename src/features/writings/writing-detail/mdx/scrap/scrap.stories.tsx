import type { Meta, StoryObj } from "@storybook/nextjs";

import { theme } from "@/shared/design-system/theme.css";

import { Scrap } from ".";

const meta = {
  component: Scrap,
  tags: ["autodocs"],
  parameters: {},
} satisfies Meta<typeof Scrap>;

export default meta;

type Story = StoryObj<typeof Scrap>;

export const Sample: Story = {
  args: {
    children: (
      <div
        style={{
          border: `1px solid ${theme.color.brand.primary}`,
          borderRadius: theme.radius[100],
          padding: theme.space[300],
        }}
      >
        Children
      </div>
    ),
    createdAt: "2020-10-23",
  },
};
