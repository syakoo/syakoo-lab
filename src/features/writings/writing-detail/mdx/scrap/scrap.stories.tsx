import type { Meta, StoryObj } from "@storybook/nextjs";

import { Scrap } from "./scrap";

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
          border: "1px solid var(--color-brand-primary)",
          borderRadius: "var(--radius-100)",
          padding: "var(--spacing-300)",
        }}
      >
        Children
      </div>
    ),
    createdAt: "2020-10-23",
  },
};
