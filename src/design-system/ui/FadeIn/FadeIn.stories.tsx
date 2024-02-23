import type { Meta, StoryObj } from "@storybook/react";

import { tokens } from "@/design-system/tokens";

import { FadeIn } from ".";

const meta = {
  component: FadeIn,
  tags: ["autodocs"],
  parameters: { testLevel: "snapshot" },
} satisfies Meta<typeof FadeIn>;

export default meta;

const SampleInnerContent = () => (
  <div
    style={{
      borderRadius: tokens.radii[100],
      background: tokens.colors.palette.gray[100],
      padding: "50px",
      textAlign: "center",
    }}
  >
    Children
  </div>
);

type Story = StoryObj<typeof meta>;
export const Sample: Story = {
  args: {
    children: <SampleInnerContent />,
  },
};
